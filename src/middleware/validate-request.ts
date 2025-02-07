import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

interface ValidationError {
  errors?: Array<{ message: string }>;
  message?: string;
}

export const validateRequest = (schema: { body?: AnyZodObject; query?: AnyZodObject; params?: AnyZodObject }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      const validationError: ValidationError = {};
      
      if (error instanceof ZodError) {
        validationError.errors = error.errors.map(err => ({ message: err.message }));
      } else if (error instanceof Error) {
        validationError.errors = [{ message: error.message }];
      } else {
        validationError.errors = [{ message: 'An unknown validation error occurred' }];
      }

      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        ...validationError
      });
    }
  };
}; 