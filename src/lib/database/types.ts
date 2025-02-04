/**
 * Database setup options
 */
export interface DatabaseSetupOptions {
  /**
   * Whether to run migrations during setup
   * @default true
   */
  runMigrations?: boolean;

  /**
   * Whether to validate schema during setup
   * @default true
   */
  validateSchema?: boolean;
}

/**
 * Database operation result
 */
export interface DatabaseResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: string;
    code?: string;
  };
}

/**
 * Database query options
 */
export interface QueryOptions {
  /**
   * Whether to throw on error instead of returning error object
   * @default false
   */
  throwOnError?: boolean;

  /**
   * Request timeout in milliseconds
   * @default 30000
   */
  timeout?: number;

  /**
   * Whether to use prepared statement
   * @default true
   */
  prepare?: boolean;
}

/**
 * Database transaction options
 */
export interface TransactionOptions extends QueryOptions {
  /**
   * Isolation level for transaction
   * @default 'read committed'
   */
  isolationLevel?: 'read uncommitted' | 'read committed' | 'repeatable read' | 'serializable';
}

/**
 * Database migration
 */
export interface Migration {
  /**
   * Unique migration ID
   */
  id: string;

  /**
   * Migration name
   */
  name: string;

  /**
   * Migration SQL
   */
  sql: string;

  /**
   * Migration description
   */
  description: string;

  /**
   * Migration dependencies
   */
  dependencies?: string[];
}

/**
 * Database schema validation result
 */
export interface SchemaValidationResult {
  /**
   * Whether validation passed
   */
  valid: boolean;

  /**
   * Validation errors if any
   */
  errors?: Array<{
    table: string;
    column?: string;
    message: string;
  }>;
} 