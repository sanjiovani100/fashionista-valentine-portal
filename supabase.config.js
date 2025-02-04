/**
 * Supabase Configuration and Best Practices for Cursor
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// Create Supabase client with admin privileges
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  }
);

export const supabaseConfig = {
  // Connection Configuration
  connection: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    options: {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      db: {
        schema: 'public'
      }
    }
  },

  // Database Schema Rules
  schema: {
    // Required columns for all tables
    requiredColumns: {
      id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
      created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      created_by: 'uuid REFERENCES auth.users(id)',
      updated_by: 'uuid REFERENCES auth.users(id)'
    },
    
    // Naming conventions
    naming: {
      tables: '^[a-z][a-z0-9_]*$',
      columns: '^[a-z][a-z0-9_]*$',
      functions: '^[a-z][a-z0-9_]*$',
      indexes: '^idx_[a-z0-9_]+$',
      triggers: '^trg_[a-z0-9_]+$',
      views: '^vw_[a-z0-9_]+$'
    },

    // Validation rules
    validation: {
      maxColumnNameLength: 63,
      maxTableNameLength: 63,
      reservedWords: ['user', 'group', 'order', 'limit', 'offset', 'true', 'false', 'null'],
      forbiddenPrefixes: ['pg_', 'sql_', 'supabase_']
    }
  },

  // Security Rules
  security: {
    // RLS policies to be enabled by default
    defaultPolicies: {
      select: true,
      insert: 'auth.role() = \'authenticated\'',
      update: 'auth.uid() = created_by',
      delete: 'auth.uid() = created_by'
    },
    
    // Required security features
    required: {
      rls: true,
      roleValidation: true,
      inputSanitization: true,
      passwordHashing: true,
      sqlInjectionPrevention: true
    },

    // Authentication rules
    auth: {
      passwordMinLength: 8,
      passwordRequirements: {
        uppercase: true,
        lowercase: true,
        numbers: true,
        specialChars: true
      },
      sessionDuration: 3600,
      maxLoginAttempts: 5
    }
  },

  // Performance Rules
  performance: {
    // Required indexes
    requiredIndexes: {
      foreignKeys: true,
      uniqueConstraints: true,
      searchColumns: true,
      sortColumns: true
    },

    // Query optimization
    queryOptimization: {
      maxJoins: 3,
      maxUnionAll: 2,
      useViewsForComplexQueries: true,
      paginationRequired: true,
      maxRowsPerPage: 100
    },

    // Caching rules
    caching: {
      enableQueryCaching: true,
      cacheDuration: 300,
      invalidationRules: ['on_update', 'on_insert', 'on_delete']
    }
  },

  // Error Handling
  errorHandling: {
    required: {
      connectionErrors: true,
      queryErrors: true,
      authErrors: true,
      validationErrors: true,
      constraintErrors: true
    },
    
    // Error reporting
    reporting: {
      logErrors: true,
      notifyOnCritical: true,
      errorFormat: {
        code: true,
        message: true,
        stack: process.env.NODE_ENV === 'development',
        context: true
      }
    }
  },

  // Development Rules
  development: {
    required: {
      typeChecking: true,
      inputValidation: true,
      errorBoundaries: true,
      loadingStates: true,
      optimisticUpdates: true
    },
    
    // Code organization
    organization: {
      useHooks: true,
      separateQueries: true,
      modelBasedStructure: true,
      featureBasedFolders: true
    },

    // Documentation
    documentation: {
      requireComments: true,
      requireTypes: true,
      requireExamples: true,
      apiDocs: true
    }
  },

  // Testing Requirements
  testing: {
    required: {
      unitTests: true,
      integrationTests: true,
      e2eTests: true,
      securityTests: true,
      performanceTests: true
    },
    
    // Coverage requirements
    coverage: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    },

    // Test environment
    environment: {
      useMocks: true,
      isolatedDatabase: true,
      seedTestData: true
    }
  },

  // Monitoring and Logging
  monitoring: {
    required: {
      queryPerformance: true,
      errorRates: true,
      authAttempts: true,
      apiUsage: true,
      resourceUsage: true
    },

    // Alerts
    alerts: {
      errorThreshold: 5,
      performanceThreshold: 1000,
      storageThreshold: 90,
      concurrentConnections: 100
    },

    // Logging
    logging: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: 'json',
      includeMetadata: true,
      rotationPeriod: '1d'
    }
  },

  // Deployment Rules
  deployment: {
    required: {
      versionControl: true,
      cicdPipeline: true,
      environmentVariables: true,
      backupStrategy: true,
      rollbackPlan: true
    },

    // Migration rules
    migrations: {
      useVersioning: true,
      requireDownMigrations: true,
      transactional: true,
      backupBeforeMigrate: true
    },

    // Environment specific
    environments: {
      development: {
        debugMode: true,
        mockServices: true
      },
      staging: {
        replicateProduction: true,
        sanitizeData: true
      },
      production: {
        requireApproval: true,
        maintenanceWindow: true
      }
    }
  },

  // API Design Rules
  api: {
    required: {
      versioning: true,
      documentation: true,
      rateLimit: true,
      authentication: true,
      validation: true
    },

    // REST conventions
    rest: {
      useStandardMethods: true,
      requirePagination: true,
      enableFiltering: true,
      enableSorting: true,
      maxPageSize: 100
    },

    // Response format
    response: {
      standardizeFormat: true,
      includeMetadata: true,
      handleErrors: true,
      validateSchema: true
    }
  }
};

export default supabaseConfig;

/**
 * Utility Functions for Supabase Integration
 */
export const supabaseUtils = {
  // Create standard table columns
  createStandardColumns: () => `
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  `,

  // Create standard RLS policies
  createStandardPolicies: (tableName) => `
    ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Allow select for authenticated users" ON ${tableName}
      FOR SELECT USING (auth.role() = 'authenticated');
      
    CREATE POLICY "Allow insert for authenticated users" ON ${tableName}
      FOR INSERT WITH CHECK (auth.role() = 'authenticated');
      
    CREATE POLICY "Allow update for owners" ON ${tableName}
      FOR UPDATE USING (auth.uid() = created_by);
      
    CREATE POLICY "Allow delete for owners" ON ${tableName}
      FOR DELETE USING (auth.uid() = created_by);
  `,

  // Create standard indexes
  createStandardIndexes: (tableName, columns) => `
    CREATE INDEX IF NOT EXISTS ${tableName}_created_by_idx ON ${tableName}(created_by);
    CREATE INDEX IF NOT EXISTS ${tableName}_created_at_idx ON ${tableName}(created_at);
    ${columns.map(col => `CREATE INDEX IF NOT EXISTS ${tableName}_${col}_idx ON ${tableName}(${col});`).join('\n')}
  `
};

/**
 * Type Definitions for Supabase Tables
 */
export const supabaseTypes = {
  // Standard column types
  standardColumns: {
    id: 'UUID',
    created_at: 'TIMESTAMP WITH TIME ZONE',
    updated_at: 'TIMESTAMP WITH TIME ZONE',
    created_by: 'UUID REFERENCES auth.users(id)'
  },

  // Common column types
  commonTypes: {
    status: 'TEXT CHECK (status IN (\'active\', \'inactive\', \'pending\', \'archived\'))',
    email: 'TEXT CHECK (email ~* \'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$\')',
    phone: 'TEXT CHECK (phone ~* \'^\+?[1-9][0-9]{7,14}$\')',
    url: 'TEXT CHECK (url ~* \'^https?://.*$\')',
    json: 'JSONB DEFAULT \'{}\' NOT NULL'
  }
}; 