import { ApiError, ApiErrorCode, API_ERROR_CODES } from '@/types/api/responses';
import { toast } from 'sonner';

export class AppError extends Error {
  constructor(
    public code: ApiErrorCode,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, AppError.prototype);
  }

  toApiError(): ApiError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public validationDetails?: Record<string, string> | string[]
  ) {
    super(API_ERROR_CODES.VALIDATION_ERROR, message, validationDetails);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(API_ERROR_CODES.AUTHENTICATION_ERROR, message);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(API_ERROR_CODES.AUTHORIZATION_ERROR, message);
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export function handleApiError(error: unknown): ApiError {
  // Handle AppError instances
  if (error instanceof AppError) {
    return error.toApiError();
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    return {
      code: API_ERROR_CODES.INTERNAL_ERROR,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  // Handle string errors
  if (typeof error === 'string') {
    return {
      code: API_ERROR_CODES.INTERNAL_ERROR,
      message: error,
    };
  }

  // Handle unknown errors
  return {
    code: API_ERROR_CODES.INTERNAL_ERROR,
    message: 'An unexpected error occurred',
  };
}

export function showErrorToast(error: unknown) {
  const apiError = handleApiError(error);
  
  toast.error(apiError.message, {
    description: apiError.details
      ? typeof apiError.details === 'string'
        ? apiError.details
        : JSON.stringify(apiError.details)
      : undefined,
    duration: 5000,
  });
}

export function createErrorHandler(context: string) {
  return (error: unknown) => {
    console.error(`Error in ${context}:`, error);
    showErrorToast(error);
    return handleApiError(error);
  };
}

// Utility to handle form validation errors
export function handleFormError(error: unknown): string[] {
  if (error instanceof ValidationError) {
    if (Array.isArray(error.validationDetails)) {
      return error.validationDetails as string[];
    }
    if (typeof error.validationDetails === 'object' && error.validationDetails !== null) {
      return Object.values(error.validationDetails);
    }
    return [error.message];
  }
  
  const apiError = handleApiError(error);
  return [apiError.message];
}

// Type guard to check if an error is an instance of AppError
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

// Type guard to check if an error is a validation error
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

// Utility to create a validation error with multiple validation messages
export function createValidationError(
  messages: string[] | Record<string, string>,
  summary: string = 'Validation failed'
): ValidationError {
  return new ValidationError(summary, messages);
}

// Type guard to check if an object is an ApiError
export function isApiError(obj: unknown): obj is ApiError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'code' in obj &&
    'message' in obj &&
    typeof (obj as ApiError).code === 'string' &&
    typeof (obj as ApiError).message === 'string'
  );
} 


