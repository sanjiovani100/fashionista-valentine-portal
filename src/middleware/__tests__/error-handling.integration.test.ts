import request from 'supertest';
import express from 'express';
import { GlobalErrorHandler } from '../global-error-handler';
import { ValidationError, NotFoundError, DatabaseError } from '../error-handler';

describe('Error Handling Integration', () => {
  let app: express.Application;
  let errorHandler: GlobalErrorHandler;

  beforeEach(() => {
    app = express();
    errorHandler = new GlobalErrorHandler();
    
    // Add test routes that throw different types of errors
    app.get('/validation-error', () => {
      throw new ValidationError('Invalid request data');
    });

    app.get('/not-found-error', () => {
      throw new NotFoundError('Resource not found');
    });

    app.get('/database-error', () => {
      throw new DatabaseError('Database connection failed');
    });

    app.get('/unknown-error', () => {
      throw new Error('Unknown error occurred');
    });

    // Add error handling middleware
    app.use(errorHandler.handleError);
  });

  describe('Error Response Format', () => {
    it('should handle ValidationError with 400 status', async () => {
      const response = await request(app)
        .get('/validation-error')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          status: 'error',
          message: 'Invalid request data',
          code: 'ValidationError'
        })
      );
    });

    it('should handle NotFoundError with 404 status', async () => {
      const response = await request(app)
        .get('/not-found-error')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toEqual(
        expect.objectContaining({
          status: 'error',
          message: 'Resource not found',
          code: 'NotFoundError'
        })
      );
    });

    it('should handle DatabaseError with 503 status', async () => {
      const response = await request(app)
        .get('/database-error')
        .expect('Content-Type', /json/)
        .expect(503);

      expect(response.body).toEqual(
        expect.objectContaining({
          status: 'error',
          message: 'Database connection failed',
          code: 'DatabaseError'
        })
      );
    });

    it('should handle unknown errors with 500 status', async () => {
      const response = await request(app)
        .get('/unknown-error')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toEqual(
        expect.objectContaining({
          status: 'error',
          message: 'An unexpected error occurred'
        })
      );
    });
  });

  describe('Environment-specific Behavior', () => {
    let originalEnv: string | undefined;

    beforeEach(() => {
      originalEnv = process.env.NODE_ENV;
    });

    afterEach(() => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv });
    });

    it('should include stack trace in development mode', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });
      app = express();
      errorHandler = new GlobalErrorHandler();
      
      app.get('/error', () => {
        throw new Error('Test error');
      });
      
      app.use(errorHandler.handleError);

      const response = await request(app)
        .get('/error')
        .expect(500);

      expect(response.body).toHaveProperty('stack');
    });

    it('should not include stack trace in production mode', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });
      app = express();
      errorHandler = new GlobalErrorHandler();
      
      app.get('/error', () => {
        throw new Error('Test error');
      });
      
      app.use(errorHandler.handleError);

      const response = await request(app)
        .get('/error')
        .expect(500);

      expect(response.body).not.toHaveProperty('stack');
    });
  });

  describe('Error Handler Chain', () => {
    it('should pass through multiple error handlers', async () => {
      const intermediateHandler = jest.fn((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(err);
      });

      app.use(intermediateHandler);
      app.use(errorHandler.handleError);

      await request(app)
        .get('/validation-error')
        .expect(400);

      expect(intermediateHandler).toHaveBeenCalled();
    });
  });
}); 