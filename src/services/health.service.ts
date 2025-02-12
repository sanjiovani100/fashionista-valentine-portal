import { logger } from '../config/logger.js';
import { PortManager } from '../utils/port-manager.js';
import { supabase } from '../lib/supabase/config';
import os from 'os';

export interface SystemMetrics {
  cpu: {
    usage: number;
    loadAverage: number[];
    cores: number;
  };
  memory: {
    used: number;
    total: number;
    free: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    free: number;
    percentage: number;
  };
  process: {
    uptime: number;
    memoryUsage: NodeJS.MemoryUsage;
    cpuUsage: NodeJS.CpuUsage;
  };
}

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  services: {
    database: {
      status: 'healthy' | 'unhealthy';
      latency?: number;
      message?: string;
      connections?: number;
    };
    server: {
      status: 'healthy' | 'unhealthy';
      port: number;
      uptime: number;
      message?: string;
    };
    memory: {
      status: 'healthy' | 'unhealthy' | 'degraded';
      used: number;
      total: number;
      percentage: number;
    };
    system: SystemMetrics;
  };
}

export class HealthService {
  private startTime: number;
  private lastCpuUsage: NodeJS.CpuUsage;
  private lastCpuCheck: number;

  constructor() {
    this.startTime = Date.now();
    this.lastCpuUsage = process.cpuUsage();
    this.lastCpuCheck = Date.now();
  }

  /**
   * Get CPU usage as a percentage
   */
  private async getCpuUsage(): Promise<number> {
    const currentCpuUsage = process.cpuUsage();
    const currentTime = Date.now();
    
    const userDiff = currentCpuUsage.user - this.lastCpuUsage.user;
    const systemDiff = currentCpuUsage.system - this.lastCpuUsage.system;
    const timeDiff = currentTime - this.lastCpuCheck;
    
    this.lastCpuUsage = currentCpuUsage;
    this.lastCpuCheck = currentTime;
    
    return (userDiff + systemDiff) / (timeDiff * 1000) * 100;
  }

  /**
   * Get disk usage statistics
   */
  private async getDiskUsage(): Promise<{ used: number; total: number; free: number; percentage: number }> {
    // This is a simplified version. In production, you'd want to use a package like 'disk-space' 
    // or make system calls to get actual disk usage
    return {
      used: 0,
      total: 0,
      free: 0,
      percentage: 0
    };
  }

  /**
   * Check database connectivity and performance
   */
  private async checkDatabase(): Promise<HealthStatus['services']['database']> {
    try {
      const start = Date.now();
      const { data, error } = await supabase
        .from('health_check')
        .select('status')
        .single();

      if (error) throw error;

      const latency = Date.now() - start;

      // Get active connections (this would need to be implemented based on your database setup)
      const connections = 0; // Placeholder for actual implementation

      return {
        status: 'healthy',
        latency,
        connections,
        message: `Database responded in ${latency}ms with ${connections} active connections`
      };
    } catch (error) {
      logger.error('Database health check failed:', error);
      return {
        status: 'unhealthy',
        message: 'Database connection failed'
      };
    }
  }

  /**
   * Check server status with enhanced metrics
   */
  private async checkServer(port: number): Promise<HealthStatus['services']['server']> {
    try {
      const uptime = Date.now() - this.startTime;
      const isPortAvailable = await PortManager.isPortAvailable(port);

      if (!isPortAvailable) {
        return {
          status: 'healthy',
          port,
          uptime,
          message: `Server running on port ${port} for ${Math.floor(uptime / 1000 / 60)} minutes`
        };
      }

      return {
        status: 'unhealthy',
        port,
        uptime,
        message: `Port ${port} is not in use by the server`
      };
    } catch (error) {
      logger.error('Server health check failed:', error);
      return {
        status: 'unhealthy',
        port,
        uptime: Date.now() - this.startTime,
        message: 'Server health check failed'
      };
    }
  }

  /**
   * Check memory usage with enhanced metrics
   */
  private checkMemory(): HealthStatus['services']['memory'] {
    const used = process.memoryUsage().heapUsed;
    const total = process.memoryUsage().heapTotal;
    const percentage = (used / total) * 100;

    return {
      status: percentage > 90 ? 'degraded' : percentage > 95 ? 'unhealthy' : 'healthy',
      used,
      total,
      percentage
    };
  }

  /**
   * Get system metrics
   */
  private async getSystemMetrics(): Promise<SystemMetrics> {
    const cpuUsage = await this.getCpuUsage();
    const diskUsage = await this.getDiskUsage();
    
    return {
      cpu: {
        usage: cpuUsage,
        loadAverage: os.loadavg(),
        cores: os.cpus().length
      },
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        used: os.totalmem() - os.freemem(),
        percentage: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
      },
      disk: diskUsage,
      process: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage()
      }
    };
  }

  /**
   * Get complete health status with enhanced metrics
   */
  async getStatus(port: number): Promise<HealthStatus> {
    const [database, server, systemMetrics] = await Promise.all([
      this.checkDatabase(),
      this.checkServer(port),
      this.getSystemMetrics()
    ]);

    const memory = this.checkMemory();
    
    // Determine overall status based on all metrics
    const status = this.determineOverallStatus(database, server, memory, systemMetrics);

    return {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database,
        server,
        memory,
        system: systemMetrics
      }
    };
  }

  /**
   * Determine overall system status based on all metrics
   */
  private determineOverallStatus(
    database: HealthStatus['services']['database'],
    server: HealthStatus['services']['server'],
    memory: HealthStatus['services']['memory'],
    metrics: SystemMetrics
  ): HealthStatus['status'] {
    if (database.status === 'unhealthy' || server.status === 'unhealthy') {
      return 'unhealthy';
    }

    if (memory.status === 'unhealthy' || 
        metrics.cpu.usage > 90 || 
        metrics.memory.percentage > 90) {
      return 'unhealthy';
    }

    if (memory.status === 'degraded' || 
        metrics.cpu.usage > 70 || 
        metrics.memory.percentage > 80) {
      return 'degraded';
    }

    return 'healthy';
  }
} 