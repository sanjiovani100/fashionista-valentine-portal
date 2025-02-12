export const API_ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
} as const;

export type ApiErrorCode = typeof API_ERROR_CODES[keyof typeof API_ERROR_CODES];

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  details?: unknown;
  stack?: string;
}

export interface ApiResponse<T = unknown> {
  data: T | null;
  error: ApiError | null;
  status: 'success' | 'error';
  metadata?: {
    requestId: string;
    [key: string]: unknown;
  };
  timestamp: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  metadata: {
    requestId: string;
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
    [key: string]: unknown;
  };
}

export interface ApiResponseWithCount<T> extends ApiResponse<T> {
  metadata: {
    requestId: string;
    count: number;
    [key: string]: unknown;
  };
}

// Helper function to create a successful API response
export function createSuccessResponse<T>(
  data: T,
  metadata?: ApiResponse<T>['metadata']
): ApiResponse<T> {
  return {
    data,
    error: null,
    status: 'success',
    metadata: metadata ?? {
      requestId: crypto.randomUUID(),
    },
    timestamp: new Date().toISOString(),
  };
}

// Helper function to create an error API response
export function createErrorResponse<T = never>(
  error: ApiError,
  metadata?: ApiResponse<T>['metadata']
): ApiResponse<T> {
  return {
    data: null,
    error,
    status: 'error',
    metadata: metadata ?? {
      requestId: crypto.randomUUID(),
    },
    timestamp: new Date().toISOString(),
  };
}

// Helper function to create a paginated API response
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number
): PaginatedApiResponse<T> {
  return {
    data,
    error: null,
    status: 'success',
    metadata: {
      requestId: crypto.randomUUID(),
      total,
      page,
      pageSize,
      hasMore: total > page * pageSize,
    },
    timestamp: new Date().toISOString(),
  };
}

// Helper function to create an API response with count
export function createResponseWithCount<T>(
  data: T,
  count: number
): ApiResponseWithCount<T> {
  return {
    data,
    error: null,
    status: 'success',
    metadata: {
      requestId: crypto.randomUUID(),
      count,
    },
    timestamp: new Date().toISOString(),
  };
}

export interface ApiMetadata {
  requestId: string;
  processingTime?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  metadata: {
    requestId: string;
    pagination: {
      page: number;
      limit: number;
      total: number;
      hasMore: boolean;
    };
    [key: string]: unknown;
  };
}

// Helper function to create a list response
export function createListResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): ApiListResponse<T> {
  return {
    data,
    error: null,
    status: 'success',
    metadata: {
      requestId: crypto.randomUUID(),
      pagination: {
        page,
        limit,
        total,
        hasMore: total > page * limit,
      },
    },
    timestamp: new Date().toISOString(),
  };
}

export type ApiErrorResponse = ApiResponse<null>; 


