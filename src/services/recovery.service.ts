import { logger } from '../config/logger.js';
import { HealthService, HealthStatus } from './health.service.js';
import { PortManager } from '../utils/port-manager.js';
import { supabase } from '../lib/supabase/config';
import { DatabaseError } from '../middleware/error-handler.js';

export interface RecoveryAction {
  type: 'restart' | 'reconnect' | 'failover' | 'cleanup';
  service: 'database' | 'server' | 'all';
  timestamp: string;
  success: boolean;
  error?: string;
}

export class RecoveryService {
  private healthService: HealthService;
  private recoveryAttempts: Map<string, number>;
  private readonly MAX_ATTEMPTS = 3;
  private readonly RECOVERY_COOLDOWN = 5000; // 5 seconds

  constructor() {
    this.healthService = new HealthService();
    this.recoveryAttempts = new Map();
  }

  /**
   * Attempt to recover a degraded or unhealthy service
   */
  async attemptRecovery(status: HealthStatus): Promise<RecoveryAction[]> {
    const actions: RecoveryAction[] = [];
    const timestamp = new Date().toISOString();

    if (status.services.database.status === 'unhealthy') {
      const dbAction = await this.recoverDatabase();
      actions.push({ ...dbAction, timestamp });
    }

    if (status.services.server.status === 'unhealthy') {
      const serverAction = await this.recoverServer(status.services.server.port);
      actions.push({ ...serverAction, timestamp });
    }

    if (status.services.memory.status === 'unhealthy' || status.services.memory.status === 'degraded') {
      const memoryAction = await this.performMemoryCleanup();
      actions.push({ ...memoryAction, timestamp });
    }

    return actions;
  }

  /**
   * Attempt to recover database connection
   */
  private async recoverDatabase(): Promise<RecoveryAction> {
    const serviceKey = 'database';
    const attempts = this.getAttempts(serviceKey);

    if (attempts >= this.MAX_ATTEMPTS) {
      return {
        type: 'failover',
        service: 'database',
        timestamp: new Date().toISOString(),
        success: false,
        error: 'Max recovery attempts reached'
      };
    }

    try {
      // Attempt to reconnect to database
      await supabase.auth.getSession();
      
      this.resetAttempts(serviceKey);
      return {
        type: 'reconnect',
        service: 'database',
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      this.incrementAttempts(serviceKey);
      return {
        type: 'reconnect',
        service: 'database',
        timestamp: new Date().toISOString(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Attempt to recover server
   */
  private async recoverServer(currentPort: number): Promise<RecoveryAction> {
    const serviceKey = 'server';
    const attempts = this.getAttempts(serviceKey);

    if (attempts >= this.MAX_ATTEMPTS) {
      return {
        type: 'failover',
        service: 'server',
        timestamp: new Date().toISOString(),
        success: false,
        error: 'Max recovery attempts reached'
      };
    }

    try {
      // Attempt to find a new port
      const newPort = await PortManager.findAvailablePort(currentPort + 1);
      
      this.resetAttempts(serviceKey);
      return {
        type: 'restart',
        service: 'server',
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      this.incrementAttempts(serviceKey);
      return {
        type: 'restart',
        service: 'server',
        timestamp: new Date().toISOString(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Perform memory cleanup
   */
  private async performMemoryCleanup(): Promise<RecoveryAction> {
    try {
      if (global.gc) {
        global.gc();
      }
      
      return {
        type: 'cleanup',
        service: 'all',
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      return {
        type: 'cleanup',
        service: 'all',
        timestamp: new Date().toISOString(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get number of recovery attempts for a service
   */
  private getAttempts(service: string): number {
    return this.recoveryAttempts.get(service) || 0;
  }

  /**
   * Increment recovery attempts for a service
   */
  private incrementAttempts(service: string): void {
    const attempts = this.getAttempts(service);
    this.recoveryAttempts.set(service, attempts + 1);
  }

  /**
   * Reset recovery attempts for a service
   */
  private resetAttempts(service: string): void {
    this.recoveryAttempts.delete(service);
  }

  /**
   * Check if recovery is needed and attempt it
   */
  async checkAndRecover(port: number): Promise<void> {
    try {
      const status = await this.healthService.getStatus(port);

      if (status.status === 'unhealthy' || status.status === 'degraded') {
        logger.warn(`System status is ${status.status}, attempting recovery...`);
        const actions = await this.attemptRecovery(status);
        
        actions.forEach(action => {
          if (action.success) {
            logger.info(`Recovery action ${action.type} for ${action.service} succeeded`);
          } else {
            logger.error(`Recovery action ${action.type} for ${action.service} failed: ${action.error}`);
          }
        });
      }
    } catch (error) {
      logger.error('Error during recovery check:', error);
    }
  }
} 