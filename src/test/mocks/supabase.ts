import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

type Tables = Database['public']['Tables'];
type EventRow = Tables['events']['Row'];
type TicketRow = Tables['tickets']['Row'];

// Mock data store
const mockDataStore = {
  events: [] as EventRow[],
  tickets: [] as TicketRow[],
  users: [] as Tables['users']['Row'][],
  registrations: [] as Tables['event_registrations']['Row'][]
};

type MockTableName = keyof typeof mockDataStore;

// Mock query builder
class QueryBuilder {
  private table: MockTableName;
  private filters: any[] = [];
  private selectedFields: string[] = ['*'];
  private limitValue: number | null = null;
  private offsetValue: number | null = null;
  private orderByField: string | null = null;
  private orderDirection: 'asc' | 'desc' = 'asc';

  constructor(table: MockTableName) {
    this.table = table;
  }

  select(fields: string = '*') {
    this.selectedFields = fields === '*' ? ['*'] : fields.split(',');
    return this;
  }

  insert(data: any) {
    const newData = Array.isArray(data) ? data : [data];
    mockDataStore[this.table].push(...newData);
    return {
      select: () => this,
      single: () => ({ data: newData[0], error: null }),
      then: (cb: any) => Promise.resolve(cb({ data: newData[0], error: null }))
    };
  }

  update(data: any) {
    const results = this.executeQuery();
    results.forEach(item => Object.assign(item, data));
    return {
      select: () => this,
      single: () => ({ data: results[0], error: null }),
      then: (cb: any) => Promise.resolve(cb({ data: results[0], error: null }))
    };
  }

  delete() {
    const results = this.executeQuery();
    mockDataStore[this.table] = mockDataStore[this.table].filter(item => !results.includes(item));
    return {
      select: () => this,
      single: () => ({ data: results[0], error: null }),
      then: (cb: any) => Promise.resolve(cb({ data: results[0], error: null }))
    };
  }

  eq(field: string, value: any) {
    this.filters.push((item: any) => item[field] === value);
    return this;
  }

  gt(field: string, value: any) {
    this.filters.push((item: any) => item[field] > value);
    return this;
  }

  lt(field: string, value: any) {
    this.filters.push((item: any) => item[field] < value);
    return this;
  }

  limit(n: number) {
    this.limitValue = n;
    return this;
  }

  offset(n: number) {
    this.offsetValue = n;
    return this;
  }

  order(field: string, { ascending = true } = {}) {
    this.orderByField = field;
    this.orderDirection = ascending ? 'asc' : 'desc';
    return this;
  }

  single() {
    const results = this.executeQuery();
    return {
      data: results[0] || null,
      error: null
    };
  }

  then(cb: any) {
    const results = this.executeQuery();
    return Promise.resolve(cb({
      data: results,
      error: null,
      count: results.length
    }));
  }

  private executeQuery() {
    let results = [...mockDataStore[this.table]];
    
    // Apply filters
    this.filters.forEach(filter => {
      results = results.filter(filter);
    });

    // Apply ordering
    if (this.orderByField) {
      results.sort((a, b) => {
        const aVal = a[this.orderByField!];
        const bVal = b[this.orderByField!];
        return this.orderDirection === 'asc' ? 
          (aVal > bVal ? 1 : -1) : 
          (aVal < bVal ? 1 : -1);
      });
    }

    // Apply pagination
    if (this.offsetValue !== null) {
      results = results.slice(this.offsetValue);
    }
    if (this.limitValue !== null) {
      results = results.slice(0, this.limitValue);
    }

    return results;
  }
}

// Mock Supabase client
export const supabase = {
  from: (table: MockTableName) => new QueryBuilder(table),
  auth: {
    signUp: jest.fn().mockResolvedValue({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@example.com'
        }
      },
      error: null
    }),
    signIn: jest.fn().mockResolvedValue({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@example.com'
        }
      },
      error: null
    })
  }
} as unknown as SupabaseClient<Database>;

// Helper to reset mock data
export const resetMockData = () => {
  mockDataStore.events = [];
  mockDataStore.tickets = [];
  
  Object.values(mockDataStore).forEach(table => {
    table.length = 0;
  });
};

// Helper to seed mock data for events
export const seedEvents = (events: EventRow[]) => {
  mockDataStore.events = [...events];
};

// Helper to seed mock data for tickets
export const seedTickets = (tickets: TicketRow[]) => {
  mockDataStore.tickets = [...tickets];
};

// Helper function to ensure records is always an array
const ensureArray = <T>(records: T | T[]): T[] => {
  return Array.isArray(records) ? records : [records];
};

export const mockSupabaseClient = {
  from: jest.fn((table: keyof typeof mockDataStore) => {
    let queryResult = null as typeof mockDataStore[typeof mockDataStore[table]][number] | null;
    let filters: { column: string; operator: string; value: any }[] = [];
    
    const queryBuilder = {
      select: jest.fn().mockImplementation(() => {
        if (!queryResult) {
          queryResult = mockDataStore[table][0];
          // Apply filters if any
          filters.forEach(filter => {
            if (filter.operator === 'eq') {
              queryResult = (queryResult as any)[filter.column] === filter.value ? queryResult : null;
            } else if (filter.operator === 'neq') {
              queryResult = (queryResult as any)[filter.column] !== filter.value ? queryResult : null;
            }
          });
        }
        return queryBuilder;
      }),
      insert: jest.fn().mockImplementation((records: any) => {
        const recordsArray = ensureArray(records);
        const data = recordsArray.map(record => {
          const id = record.id || `test-${table}-${Date.now()}`;
          const fullRecord = {
            id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...record
          };
          mockDataStore[table].push(fullRecord);
          return fullRecord;
        });
        queryResult = data[0];
        return queryBuilder;
      }),
      update: jest.fn().mockImplementation((updates: any) => {
        if (!queryResult) {
          queryResult = mockDataStore[table][0];
        }
        const updatedData = mockDataStore[table].map(record => ({
          ...record,
          ...updates,
          updated_at: new Date().toISOString()
        }));
        queryResult = updatedData[0];
        return queryBuilder;
      }),
      delete: jest.fn().mockImplementation(() => {
        queryResult = null;
        return queryBuilder;
      }),
      eq: jest.fn().mockImplementation((column: string, value: any) => {
        filters.push({ column, operator: 'eq', value });
        if (queryResult) {
          queryResult = (queryResult as any)[column] === value ? queryResult : null;
        }
        return queryBuilder;
      }),
      neq: jest.fn().mockImplementation((column: string, value: any) => {
        filters.push({ column, operator: 'neq', value });
        if (queryResult) {
          queryResult = (queryResult as any)[column] !== value ? queryResult : null;
        }
        return queryBuilder;
      }),
      single: jest.fn().mockImplementation(() => {
        if (!queryResult) {
          queryResult = mockDataStore[table][0];
          // Apply filters if any
          filters.forEach(filter => {
            if (filter.operator === 'eq') {
              queryResult = (queryResult as any)[filter.column] === filter.value ? queryResult : null;
            } else if (filter.operator === 'neq') {
              queryResult = (queryResult as any)[filter.column] !== filter.value ? queryResult : null;
            }
          });
        }
        return Promise.resolve({ data: queryResult, error: null });
      }),
      match: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
      then: jest.fn().mockImplementation((resolve) => {
        if (!queryResult) {
          queryResult = mockDataStore[table][0];
          // Apply filters if any
          filters.forEach(filter => {
            if (filter.operator === 'eq') {
              queryResult = (queryResult as any)[filter.column] === filter.value ? queryResult : null;
            } else if (filter.operator === 'neq') {
              queryResult = (queryResult as any)[filter.column] !== filter.value ? queryResult : null;
            }
          });
        }
        return Promise.resolve({ data: queryResult, error: null }).then(resolve);
      })
    };
    
    return queryBuilder;
  }),
  rpc: jest.fn((procedure: string, params?: any) => {
    if (procedure === 'check_allocation_availability') {
      return Promise.resolve({ data: true, error: null });
    }
    return Promise.resolve({ data: null, error: null });
  }),
  auth: {
    getUser: jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            role: 'authenticated'
          }
        },
        error: null
      })
    ),
    signIn: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
    getSession: jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
            expires_in: 3600,
            expires_at: Date.now() + 3600000,
            user: {
              id: 'test-user-id',
              email: 'test@example.com',
              role: 'authenticated'
            }
          }
        },
        error: null
      })
    )
  },
  storage: {
    from: jest.fn(() => ({
      upload: jest.fn().mockResolvedValue({ data: { path: 'test-path' }, error: null }),
      download: jest.fn().mockResolvedValue({ data: new Blob(), error: null }),
      remove: jest.fn().mockResolvedValue({ error: null }),
      list: jest.fn().mockResolvedValue({ data: [], error: null }),
      createSignedUrl: jest.fn().mockResolvedValue({ data: { signedUrl: 'test-url' }, error: null }),
      getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'test-url' } })
    }))
  }
} as unknown as SupabaseClient<Database>;

// Helper functions to reset and populate mock data
export const resetMockDataStore = () => {
  mockDataStore.events = [];
  mockDataStore.tickets = [];
}; 


