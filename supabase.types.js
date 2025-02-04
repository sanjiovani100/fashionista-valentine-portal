/**
 * Standard column definitions that should be present in all tables
 */
export const standardColumns = {
  id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
  created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  created_by: 'uuid REFERENCES auth.users(id)',
  updated_by: 'uuid REFERENCES auth.users(id)'
};

/**
 * Common column types with validation rules
 */
export const commonTypes = {
  // Text types
  email: 'TEXT CHECK (email ~* \'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$\')',
  url: 'TEXT CHECK (url ~* \'^https?://[^\\s/$.?#].[^\\s]*$\')',
  phone: 'TEXT CHECK (phone ~* \'^\\+?[1-9]\\d{1,14}$\')',
  
  // JSON types
  json: 'JSONB',
  jsonArray: 'JSONB CHECK (jsonb_typeof(value) = \'array\')',
  jsonObject: 'JSONB CHECK (jsonb_typeof(value) = \'object\')',
  
  // Numeric types with validation
  positiveInt: 'INTEGER CHECK (value > 0)',
  nonNegativeInt: 'INTEGER CHECK (value >= 0)',
  percentage: 'NUMERIC(5,2) CHECK (value >= 0 AND value <= 100)',
  money: 'NUMERIC(10,2) CHECK (value >= 0)',
  
  // Status and state types
  status: 'TEXT CHECK (value IN (\'active\', \'inactive\', \'pending\', \'archived\'))',
  visibility: 'TEXT CHECK (value IN (\'public\', \'private\', \'draft\'))',
  priority: 'TEXT CHECK (value IN (\'low\', \'medium\', \'high\', \'urgent\'))',
  
  // Date and time types
  futureDate: 'TIMESTAMP WITH TIME ZONE CHECK (value > NOW())',
  pastDate: 'TIMESTAMP WITH TIME ZONE CHECK (value <= NOW())',
  dateRange: 'DATERANGE CHECK (lower(value) <= upper(value))',
  
  // Array types
  textArray: 'TEXT[]',
  intArray: 'INTEGER[]',
  uuidArray: 'UUID[]',
  
  // Specialized types
  color: 'TEXT CHECK (value ~* \'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$\')',
  ipAddress: 'INET',
  macAddress: 'MACADDR',
  
  // Geographic types
  point: 'POINT',
  polygon: 'POLYGON',
  
  // Full-text search
  searchVector: 'tsvector',
  
  // Cryptographic types
  hash: 'TEXT CHECK (value ~* \'^[A-Fa-f0-9]{64}$\')',
  encryptedText: 'TEXT'
};

/**
 * Common table constraints
 */
export const tableConstraints = {
  uniqueEmail: 'UNIQUE(email)',
  uniqueUsername: 'UNIQUE(username)',
  uniqueSlug: 'UNIQUE(slug)',
  timestampTrigger: `
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE ON :tableName
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();
  `,
  softDelete: 'deleted_at TIMESTAMP WITH TIME ZONE',
  version: 'version INTEGER DEFAULT 1',
  tenant: 'tenant_id UUID NOT NULL REFERENCES tenants(id)'
};

/**
 * Common index definitions
 */
export const indexTypes = {
  btree: 'USING btree',
  hash: 'USING hash',
  gist: 'USING gist',
  gin: 'USING gin',
  spgist: 'USING spgist',
  brin: 'USING brin'
};

/**
 * Common RLS policies
 */
export const rlsPolicies = {
  selectAll: {
    name: 'Allow select for all',
    using: 'true'
  },
  selectAuthenticated: {
    name: 'Allow select for authenticated users',
    using: 'auth.role() = \'authenticated\''
  },
  selectOwn: {
    name: 'Allow select own records',
    using: 'auth.uid() = created_by'
  },
  insertAuthenticated: {
    name: 'Allow insert for authenticated users',
    check: 'auth.role() = \'authenticated\''
  },
  updateOwn: {
    name: 'Allow update own records',
    using: 'auth.uid() = created_by'
  },
  deleteOwn: {
    name: 'Allow delete own records',
    using: 'auth.uid() = created_by'
  }
};

/**
 * Common validation patterns
 */
export const validationPatterns = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  url: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
  phone: /^\+?[1-9]\d{1,14}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  username: /^[a-zA-Z0-9_-]{3,16}$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  ipv6: /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i
}; 