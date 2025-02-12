import { logger } from '../config/logger.js';

export interface ErrorReport {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  metadata: {
    environment: string;
    version: string;
    node_version: string;
    memory_usage: NodeJS.MemoryUsage;
    uptime: number;
  };
}

export interface ErrorMetrics {
  total: number;
  byType: Record<string, number>;
  byHour: Record<string, number>;
  averageResponseTime: number;
}

export class ErrorReportingService {
  private errors: ErrorReport[] = [];
  private readonly MAX_ERRORS = 1000;
  private readonly RETENTION_PERIOD = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    // Clean up old errors periodically
    setInterval(() => this.cleanup(), this.RETENTION_PERIOD);
  }

  /**
   * Report a new error
   */
  public report(
    error: Error,
    context?: Record<string, unknown>
  ): ErrorReport {
    const report: ErrorReport = {
      id: this.generateErrorId(),
      timestamp: new Date().toISOString(),
      type: error.constructor.name,
      message: error.message,
      stack: error.stack,
      context,
      metadata: {
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0',
        node_version: process.version,
        memory_usage: process.memoryUsage(),
        uptime: process.uptime()
      }
    };

    this.errors.push(report);
    this.truncateErrors();
    this.logError(report);

    return report;
  }

  /**
   * Get error metrics for analysis
   */
  public getMetrics(timeframe: number = 3600000): ErrorMetrics {
    const now = Date.now();
    const relevantErrors = this.errors.filter(
      error => now - new Date(error.timestamp).getTime() <= timeframe
    );

    const byType: Record<string, number> = {};
    const byHour: Record<string, number> = {};
    let totalResponseTime = 0;

    relevantErrors.forEach(error => {
      // Count by type
      byType[error.type] = (byType[error.type] || 0) + 1;

      // Count by hour
      const hour = new Date(error.timestamp).getHours();
      byHour[hour] = (byHour[hour] || 0) + 1;

      // Calculate response time if available
      if (error.context?.responseTime) {
        totalResponseTime += Number(error.context.responseTime);
      }
    });

    return {
      total: relevantErrors.length,
      byType,
      byHour,
      averageResponseTime: totalResponseTime / relevantErrors.length || 0
    };
  }

  /**
   * Get recent errors
   */
  public getRecentErrors(limit: number = 100): ErrorReport[] {
    return this.errors
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  /**
   * Get error by ID
   */
  public getErrorById(id: string): ErrorReport | undefined {
    return this.errors.find(error => error.id === id);
  }

  /**
   * Search errors by criteria
   */
  public searchErrors(criteria: {
    type?: string;
    message?: string;
    startTime?: string;
    endTime?: string;
  }): ErrorReport[] {
    return this.errors.filter(error => {
      if (criteria.type && error.type !== criteria.type) return false;
      if (criteria.message && !error.message.includes(criteria.message)) return false;
      if (criteria.startTime && error.timestamp < criteria.startTime) return false;
      if (criteria.endTime && error.timestamp > criteria.endTime) return false;
      return true;
    });
  }

  /**
   * Generate unique error ID
   */
  private generateErrorId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Keep error list within size limits
   */
  private truncateErrors(): void {
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors = this.errors
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, this.MAX_ERRORS);
    }
  }

  /**
   * Clean up old errors
   */
  private cleanup(): void {
    const cutoff = Date.now() - this.RETENTION_PERIOD;
    this.errors = this.errors.filter(
      error => new Date(error.timestamp).getTime() > cutoff
    );
  }

  /**
   * Log error with appropriate level and format
   */
  private logError(report: ErrorReport): void {
    const logData = {
      error_id: report.id,
      type: report.type,
      message: report.message,
      context: report.context,
      metadata: report.metadata
    };

    switch (report.type) {
      case 'ValidationError':
        logger.warn('Validation Error:', logData);
        break;
      case 'NotFoundError':
        logger.info('Not Found Error:', logData);
        break;
      case 'DatabaseError':
        logger.error('Database Error:', logData);
        break;
      default:
        logger.error('Unhandled Error:', logData);
    }
  }
} 