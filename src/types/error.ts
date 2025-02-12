export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    this.status = statusCode >= 500 ? 'error' : 'fail';
  }

  public status: string;
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Not authenticated') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Not authorized') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database error occurred') {
    super(message, 500);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = 'External service error') {
    super(message, 502);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(message, 503);
  }
}

export interface DatabaseError {
  code: string;
  message: string;
  details?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  status: 'error';
  message: string;
  details?: string | ValidationError[];
  code?: string;
} 


