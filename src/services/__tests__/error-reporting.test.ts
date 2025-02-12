import { ErrorReportingService } from '../error-reporting.service';
import { ValidationError, NotFoundError, DatabaseError } from '../../middleware/error-handler';
import { logger } from '../../config/logger';

// Mock logger
jest.mock('../../config/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn()
  }
}));

describe('ErrorReportingService', () => {
  let service: ErrorReportingService;
  let originalEnv: string | undefined;
  let originalVersion: string | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    originalEnv = process.env.NODE_ENV;
    originalVersion = process.env.npm_package_version;
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'test' });
    Object.defineProperty(process.env, 'npm_package_version', { value: '1.0.0' });
    service = new ErrorReportingService();
  });

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv });
    Object.defineProperty(process.env, 'npm_package_version', { value: originalVersion });
    jest.useRealTimers();
  });

  describe('report', () => {
    it('should create error report with correct structure', () => {
      const error = new Error('Test error');
      const context = { userId: '123' };

      const report = service.report(error, context);

      expect(report).toEqual({
        id: expect.any(String),
        timestamp: expect.any(String),
        type: 'Error',
        message: 'Test error',
        stack: expect.any(String),
        context: context,
        metadata: {
          environment: 'test',
          version: '1.0.0',
          node_version: expect.any(String),
          memory_usage: expect.any(Object),
          uptime: expect.any(Number)
        }
      });
    });

    it('should log different error types appropriately', () => {
      service.report(new ValidationError('Invalid input'));
      service.report(new NotFoundError('Resource not found'));
      service.report(new DatabaseError('Connection failed'));
      service.report(new Error('Unknown error'));

      expect(logger.warn).toHaveBeenCalledWith(
        'Validation Error:',
        expect.any(Object)
      );
      expect(logger.info).toHaveBeenCalledWith(
        'Not Found Error:',
        expect.any(Object)
      );
      expect(logger.error).toHaveBeenCalledWith(
        'Database Error:',
        expect.any(Object)
      );
      expect(logger.error).toHaveBeenCalledWith(
        'Unhandled Error:',
        expect.any(Object)
      );
    });
  });

  describe('getMetrics', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      const now = new Date('2024-01-01T12:00:00Z');
      jest.setSystemTime(now);
    });

    it('should calculate metrics correctly', () => {
      // Add errors at different times
      service.report(new ValidationError('Error 1'), { responseTime: 100 });
      service.report(new NotFoundError('Error 2'), { responseTime: 200 });
      service.report(new DatabaseError('Error 3'), { responseTime: 300 });

      const metrics = service.getMetrics();

      expect(metrics).toEqual({
        total: 3,
        byType: {
          ValidationError: 1,
          NotFoundError: 1,
          DatabaseError: 1
        },
        byHour: {
          12: 3 // All errors are in the same hour
        },
        averageResponseTime: 200 // (100 + 200 + 300) / 3
      });
    });

    it('should respect timeframe parameter', () => {
      // Add an old error
      jest.setSystemTime(new Date('2024-01-01T10:00:00Z'));
      service.report(new Error('Old error'));

      // Add recent errors
      jest.setSystemTime(new Date('2024-01-01T12:00:00Z'));
      service.report(new Error('Recent error 1'));
      service.report(new Error('Recent error 2'));

      const metrics = service.getMetrics(3600000); // 1 hour timeframe

      expect(metrics.total).toBe(2); // Only recent errors
    });
  });

  describe('getRecentErrors', () => {
    it('should return most recent errors with limit', () => {
      const errors = Array.from({ length: 150 }, (_, i) => 
        service.report(new Error(`Error ${i}`))
      );

      const recentErrors = service.getRecentErrors(50);

      expect(recentErrors).toHaveLength(50);
      expect(recentErrors[0].message).toBe('Error 149'); // Most recent first
    });
  });

  describe('searchErrors', () => {
    beforeEach(() => {
      service.report(new ValidationError('Invalid input'));
      service.report(new NotFoundError('User not found'));
      service.report(new DatabaseError('Connection error'));
    });

    it('should filter by type', () => {
      const results = service.searchErrors({ type: 'ValidationError' });
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('ValidationError');
    });

    it('should filter by message', () => {
      const results = service.searchErrors({ message: 'not found' });
      expect(results).toHaveLength(1);
      expect(results[0].message).toBe('User not found');
    });

    it('should filter by time range', () => {
      const startTime = new Date(Date.now() - 1000).toISOString();
      const endTime = new Date().toISOString();

      const results = service.searchErrors({ startTime, endTime });
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('error retention', () => {
    it('should truncate errors when exceeding MAX_ERRORS', () => {
      const MAX_ERRORS = 1000;
      
      // Add more than MAX_ERRORS
      Array.from({ length: MAX_ERRORS + 100 }, (_, i) =>
        service.report(new Error(`Error ${i}`))
      );

      const recentErrors = service.getRecentErrors(MAX_ERRORS + 100);
      expect(recentErrors).toHaveLength(MAX_ERRORS);
    });

    it('should clean up old errors', () => {
      jest.useFakeTimers();
      
      // Add some old errors
      jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
      service.report(new Error('Old error'));

      // Add some recent errors
      jest.setSystemTime(new Date('2024-01-02T00:00:00Z'));
      service.report(new Error('Recent error'));

      // Trigger cleanup
      jest.advanceTimersByTime(24 * 60 * 60 * 1000);

      const allErrors = service.getRecentErrors(100);
      expect(allErrors).toHaveLength(1);
      expect(allErrors[0].message).toBe('Recent error');
    });
  });
}); 