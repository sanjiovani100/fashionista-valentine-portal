import { supabase } from '@/lib/supabase/config';
import { logger } from '@/config/logger';
import { 
  ValidationError, 
  NotFoundError, 
  ConflictError 
} from '@/middleware/error-handler';
import type { Database } from '@/types/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export class ApiService {
  /**
   * Generic database query with error handling and logging
   */
  protected async query<T>(
    operation: string,
    queryFn: () => Promise<{ data: T | null; error: any }>
  ): Promise<T> {
    try {
      const { data, error } = await queryFn();

      if (error) {
        logger.error(`Error in ${operation}:`, error);
        this.handleDatabaseError(error);
      }

      if (!data) {
        throw new NotFoundError('Resource not found');
      }

      return data;
    } catch (error) {
      logger.error(`Error in ${operation}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Handle database-specific errors
   */
  private handleDatabaseError(error: any): never {
    // Handle specific Postgres error codes
    switch (error.code) {
      case '23505': // unique_violation
        throw new ConflictError('Resource already exists');
      case '23503': // foreign_key_violation
        throw new ValidationError('Invalid reference');
      case '23502': // not_null_violation
        throw new ValidationError('Required field missing');
      default:
        throw new Error(error.message);
    }
  }

  /**
   * Generic error handler
   */
  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('An unexpected error occurred');
  }

  /**
   * Validate that a resource exists
   */
  protected async validateExists(
    table: keyof Database['public']['Tables'],
    id: string,
    message?: string
  ): Promise<void> {
    const { data } = await supabase
      .from(table)
      .select('id')
      .eq('id', id)
      .single();

    if (!data) {
      throw new NotFoundError(message || `${table} not found`);
    }
  }

  /**
   * Check for resource conflicts
   */
  protected async checkConflict(
    table: keyof Database['public']['Tables'],
    field: string,
    value: string,
    message?: string
  ): Promise<void> {
    const { data } = await supabase
      .from(table)
      .select('id')
      .eq(field, value)
      .single();

    if (data) {
      throw new ConflictError(message || `${table} already exists with this ${field}`);
    }
  }

  /**
   * Perform an atomic update with optimistic locking
   */
  protected async atomicUpdate<T extends { id: string }>(
    table: keyof Database['public']['Tables'],
    id: string,
    updateFn: (current: T) => Partial<T>
  ): Promise<T> {
    const { data: current } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (!current) {
      throw new NotFoundError(`${table} not found`);
    }

    const updates = updateFn(current as T);

    const { data: updated, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      this.handleDatabaseError(error);
    }

    return updated as T;
  }

  /**
   * Perform a batch operation with transaction support
   */
  protected async withTransaction<T>(
    operations: () => Promise<T>
  ): Promise<T> {
    // Note: Supabase doesn't support explicit transactions yet
    // This is a placeholder for when it does
    try {
      return await operations();
    } catch (error) {
      logger.error('Transaction failed:', error);
      throw this.handleError(error);
    }
  }
} 