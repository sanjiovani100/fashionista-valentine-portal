import { Request, Response } from 'express';
import { GlobalErrorHandler } from '../global-error-handler';
import { ValidationError, NotFoundError, DatabaseError } from '../error-handler';
import { logger } from '../../config/logger';

// Mock logger
jest.mock('../../config/logger', () => ({
  logger: {
    error: jest.fn()
  }
}));

describe('GlobalErrorHandler', () => {
  let errorHandler: GlobalErrorHandler;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;
  let originalEnv: string | undefined;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'test' });

    errorHandler = new GlobalErrorHandler();
    mockRequest = {
      path: '/test',
      method: 'GET'
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv });
  });

  describe('handleError', () => {
    it('should handle ValidationError correctly', () => {
      const error = new ValidationError('Invalid input');
      
      errorHandler.handleError(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
          message: 'Invalid input',
          code: 'ValidationError'
        })
      );
      expect(logger.error).toHaveBeenCalled();
    });

    it('should handle NotFoundError correctly', () => {
      const error = new NotFoundError('Resource not found');
      
      errorHandler.handleError(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
          message: 'Resource not found',
          code: 'NotFoundError'
        })
      );
      expect(logger.error).toHaveBeenCalled();
    });

    it('should handle DatabaseError correctly', () => {
      const error = new DatabaseError('Database connection failed');
      
      errorHandler.handleError(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(503);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
          message: 'Database connection failed',
          code: 'DatabaseError'
        })
      );
      expect(logger.error).toHaveBeenCalled();
    });

    it('should handle unknown errors correctly', () => {
      const error = new Error('Unknown error');
      
      errorHandler.handleError(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
          message: 'An unexpected error occurred'
        })
      );
      expect(logger.error).toHaveBeenCalled();
    });

    it('should include stack trace in development mode', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });
      const errorHandler = new GlobalErrorHandler();
      const error = new Error('Test error');
      
      errorHandler.handleError(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          stack: expect.any(String)
        })
      );
    });

    it('should not include stack trace in production mode', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });
      const errorHandler = new GlobalErrorHandler();
      const error = new Error('Test error');
      
      errorHandler.handleError(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.not.objectContaining({
          stack: expect.any(String)
        })
      );
    });
  });

  describe('handleUncaughtException', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    it('should log error and exit process', () => {
      const error = new Error('Uncaught error');
      
      errorHandler.handleUncaughtException(error);

      expect(logger.error).toHaveBeenCalledWith(
        'Uncaught Exception:',
        expect.objectContaining({
          message: 'Uncaught error',
          stack: expect.any(String)
        })
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    });
  });

  describe('handleUnhandledRejection', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    it('should log rejection and exit process', () => {
      const reason = new Error('Promise rejection');
      const promise = Promise.reject(reason);
      
      errorHandler.handleUnhandledRejection(reason, promise);

      expect(logger.error).toHaveBeenCalledWith(
        'Unhandled Rejection:',
        expect.objectContaining({
          reason,
          promise
        })
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    });
  });
}); 