import { supabase } from '../lib/supabase/config';
import { logger } from '../config/logger.js';
import { 
  ValidationError, 
  NotFoundError, 
  ConflictError,
  DatabaseError
} from '../middleware/error-handler.js';
import type { Database } from '../types/database.types.js';
import { env } from '../config/env.js';
import { Redis } from 'ioredis';
import { SupabaseClient, PostgrestResponse } from '@supabase/supabase-js';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;
type Row<T extends TableName> = Tables[T]['Row'];
type Insert<T extends TableName> = Tables[T]['Insert'];
type Update<T extends TableName> = Tables[T]['Update'];

interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

interface PaginationParams {
  page?: number;
  limit?: number;
}

type FilterValue = {
  gt?: string | number | boolean | null;
  lt?: string | number | boolean | null;
  gte?: string | number | boolean | null;
  lte?: string | number | boolean | null;
  not?: string | number | boolean | null;
  like?: string;
}

type FilterParams<T extends TableName> = {
  [K in keyof Row<T>]?: Row<T>[K] | Row<T>[K][] | FilterValue;
}

interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

interface QueryOptions<T extends TableName> {
  pagination?: PaginationParams;
  filters?: FilterParams<T>;
  sort?: SortParams;
  search?: string;
  includes?: string[];
}

export abstract class ApiService<T extends TableName> {
  protected readonly table: T;
  protected readonly searchFields: string[];
  protected readonly defaultSort: { field: keyof Row<T>; direction: 'asc' | 'desc' };
  private redis: Redis | null = null;

  constructor(
    table: T,
    options: {
      searchFields: string[];
      defaultSort: { field: keyof Row<T>; direction: 'asc' | 'desc' };
    }
  ) {
    this.table = table;
    this.searchFields = options.searchFields;
    this.defaultSort = options.defaultSort;
    
    // Redis is disabled for now
    logger.info('Redis is temporarily disabled. Running without cache.');
  }

  protected buildBaseQuery() {
    return supabase
      .from(this.table)
      .select('*') as PostgrestFilterBuilder<Database['public'], Row<T>, Row<T>>;
  }

  protected async buildQuery(options?: QueryOptions<T>) {
    let query = this.buildBaseQuery();

    if (options?.includes?.length) {
      const select = ['*', ...options.includes.map(include => `${include}(*)`)].join(',');
      query = supabase
        .from(this.table)
        .select(select) as PostgrestFilterBuilder<Database['public'], Row<T>, Row<T>>;
    }

    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        const typedKey = key as keyof Row<T>;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          const filterValue = value as FilterValue;
          if ('gt' in filterValue && filterValue.gt !== undefined) query = query.gt(typedKey, filterValue.gt);
          if ('lt' in filterValue && filterValue.lt !== undefined) query = query.lt(typedKey, filterValue.lt);
          if ('gte' in filterValue && filterValue.gte !== undefined) query = query.gte(typedKey, filterValue.gte);
          if ('lte' in filterValue && filterValue.lte !== undefined) query = query.lte(typedKey, filterValue.lte);
          if ('not' in filterValue && filterValue.not !== undefined) query = query.not(typedKey, 'eq', filterValue.not);
          if ('like' in filterValue && filterValue.like !== undefined) query = query.ilike(typedKey, `%${filterValue.like}%`);
        } else if (Array.isArray(value)) {
          query = query.in(typedKey, value);
        } else {
          query = query.eq(typedKey, value);
        }
      });
    }

    if (options?.sort) {
      query = query.order(options.sort.field, { ascending: options.sort.direction === 'asc' });
    }

    if (options?.search && this.searchFields.length > 0) {
      const conditions = this.searchFields.map(field => 
        `${field}.ilike.%${options.search}%`
      );
      query = query.or(conditions.join(','));
    }

    if (options?.pagination) {
      const { page = 1, limit = 10 } = options.pagination;
      const start = (page - 1) * limit;
      query = query.range(start, start + limit - 1);
    }

    return query;
  }

  async list(options: QueryOptions<T> = {}): Promise<PaginationResult<Row<T>>> {
    const query = await this.buildQuery(options);
    const { data, error, count } = await query;

    if (error) throw new DatabaseError(error.message);
    if (!data) throw new DatabaseError('No data returned from query');

    return {
      data: data as Row<T>[],
      total: count || 0,
      page: options.pagination?.page || 1,
      limit: options.pagination?.limit || 10
    };
  }

  async get(id: string, options: Omit<QueryOptions<T>, 'pagination'> = {}): Promise<Row<T>> {
    const query = await this.buildQuery(options);
    const { data, error } = await query.eq('id', id).single();

    if (error) throw new DatabaseError(error.message);
    if (!data) throw new NotFoundError(`Record not found in ${this.table}`);

    return data as Row<T>;
  }

  async create(data: Insert<T>): Promise<Row<T>> {
    const { data: created, error } = await supabase
      .from(this.table)
      .insert(data)
      .select()
      .single();

    if (error) throw new DatabaseError(error.message);
    if (!created) throw new DatabaseError('Failed to create record');

    return created as Row<T>;
  }

  async update(id: string, data: Partial<Row<T>>): Promise<Row<T>> {
    const { data: updated, error } = await supabase
      .from(this.table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new DatabaseError(error.message);
    if (!updated) throw new NotFoundError(`Record not found in ${this.table}`);

    return updated as Row<T>;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw new DatabaseError(error.message);
  }
} 


