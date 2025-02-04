import { supabaseConfig } from './supabase.config.js';
import { standardColumns, commonTypes, tableConstraints, indexTypes, rlsPolicies } from './supabase.types.js';

/**
 * Creates standard columns SQL for table creation
 * @returns {string} SQL for standard columns
 */
export function createStandardColumns() {
  return Object.entries(standardColumns)
    .map(([column, type]) => `${column} ${type}`)
    .join(',\n  ');
}

/**
 * Creates standard indexes for a table
 * @param {string} tableName - Name of the table
 * @param {string[]} columns - Columns to create indexes for
 * @returns {string} SQL for creating indexes
 */
export function createStandardIndexes(tableName, columns) {
  const indexes = [];

  // Add btree index for id and foreign keys
  indexes.push(`CREATE INDEX IF NOT EXISTS ${tableName}_id_idx ON ${tableName} ${indexTypes.btree}(id);`);

  // Add indexes for foreign key columns
  columns.forEach(column => {
    if (column.toLowerCase().endsWith('_id')) {
      indexes.push(
        `CREATE INDEX IF NOT EXISTS ${tableName}_${column}_idx ON ${tableName} ${indexTypes.btree}(${column});`
      );
    }
  });

  // Add gin index for jsonb columns
  columns.forEach(column => {
    if (column.includes('JSONB')) {
      indexes.push(
        `CREATE INDEX IF NOT EXISTS ${tableName}_${column}_gin_idx ON ${tableName} ${indexTypes.gin}(${column});`
      );
    }
  });

  // Add timestamp indexes
  indexes.push(
    `CREATE INDEX IF NOT EXISTS ${tableName}_created_at_idx ON ${tableName} ${indexTypes.btree}(created_at);`,
    `CREATE INDEX IF NOT EXISTS ${tableName}_updated_at_idx ON ${tableName} ${indexTypes.btree}(updated_at);`
  );

  return indexes.join('\n');
}

/**
 * Creates standard RLS policies for a table
 * @param {string} tableName - Name of the table
 * @param {Object} customPolicies - Custom policies to override defaults
 * @returns {string} SQL for creating RLS policies
 */
export function createStandardPolicies(tableName, customPolicies = {}) {
  const policies = [];

  // Enable RLS
  policies.push(`ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;`);

  // Merge default policies with custom ones
  const finalPolicies = {
    ...rlsPolicies,
    ...customPolicies
  };

  // Create policies
  Object.entries(finalPolicies).forEach(([key, policy]) => {
    const policyName = policy.name.replace(/\s+/g, '_').toLowerCase();
    if (policy.using) {
      policies.push(
        `CREATE POLICY "${policy.name}" ON ${tableName}
         FOR ${key.replace(/^(select|insert|update|delete).*$/i, '$1').toUpperCase()}
         USING (${policy.using});`
      );
    }
    if (policy.check) {
      policies.push(
        `CREATE POLICY "${policy.name}" ON ${tableName}
         FOR ${key.replace(/^(select|insert|update|delete).*$/i, '$1').toUpperCase()}
         WITH CHECK (${policy.check});`
      );
    }
  });

  return policies.join('\n');
}

/**
 * Creates a function to update timestamps
 * @returns {string} SQL for creating timestamp update function
 */
export function createTimestampFunction() {
  return `
    CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;
}

/**
 * Creates standard triggers for a table
 * @param {string} tableName - Name of the table
 * @returns {string} SQL for creating triggers
 */
export function createStandardTriggers(tableName) {
  return `
    DROP TRIGGER IF EXISTS update_timestamp ON ${tableName};
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();
  `;
}

/**
 * Creates a function to handle soft deletes
 * @returns {string} SQL for creating soft delete function
 */
export function createSoftDeleteFunction() {
  return `
    CREATE OR REPLACE FUNCTION soft_delete()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.deleted_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;
}

/**
 * Creates audit trail triggers for a table
 * @param {string} tableName - Name of the table
 * @returns {string} SQL for creating audit trail
 */
export function createAuditTrail(tableName) {
  return `
    CREATE TABLE IF NOT EXISTS ${tableName}_audit (
      id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
      table_name TEXT NOT NULL,
      record_id uuid NOT NULL,
      operation TEXT NOT NULL,
      old_data JSONB,
      new_data JSONB,
      changed_by uuid REFERENCES auth.users(id),
      changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE OR REPLACE FUNCTION audit_${tableName}_changes()
    RETURNS TRIGGER AS $$
    BEGIN
      IF TG_OP = 'INSERT' THEN
        INSERT INTO ${tableName}_audit (
          table_name, record_id, operation, new_data, changed_by
        ) VALUES (
          '${tableName}',
          NEW.id,
          TG_OP,
          to_jsonb(NEW),
          auth.uid()
        );
        RETURN NEW;
      ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO ${tableName}_audit (
          table_name, record_id, operation, old_data, new_data, changed_by
        ) VALUES (
          '${tableName}',
          NEW.id,
          TG_OP,
          to_jsonb(OLD),
          to_jsonb(NEW),
          auth.uid()
        );
        RETURN NEW;
      ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO ${tableName}_audit (
          table_name, record_id, operation, old_data, changed_by
        ) VALUES (
          '${tableName}',
          OLD.id,
          TG_OP,
          to_jsonb(OLD),
          auth.uid()
        );
        RETURN OLD;
      END IF;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS audit_${tableName}_trigger ON ${tableName};
    CREATE TRIGGER audit_${tableName}_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ${tableName}
    FOR EACH ROW EXECUTE FUNCTION audit_${tableName}_changes();
  `;
}

/**
 * Creates a function to generate slugs
 * @returns {string} SQL for creating slug generation function
 */
export function createSlugFunction() {
  return `
    CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
    RETURNS TEXT AS $$
    DECLARE
      slug TEXT;
    BEGIN
      -- Convert to lowercase and replace spaces with hyphens
      slug := lower(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'));
      slug := regexp_replace(slug, '\s+', '-', 'g');
      RETURN slug;
    END;
    $$ LANGUAGE plpgsql;
  `;
}

/**
 * Creates a function to validate email addresses
 * @returns {string} SQL for creating email validation function
 */
export function createEmailValidationFunction() {
  return `
    CREATE OR REPLACE FUNCTION is_valid_email(email TEXT)
    RETURNS BOOLEAN AS $$
    BEGIN
      RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
    END;
    $$ LANGUAGE plpgsql;
  `;
}

/**
 * Creates a function to handle versioning
 * @returns {string} SQL for creating versioning function
 */
export function createVersioningFunction() {
  return `
    CREATE OR REPLACE FUNCTION increment_version()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.version := OLD.version + 1;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;
}

/**
 * Creates standard database functions
 * @returns {string} SQL for creating all standard functions
 */
export function createStandardFunctions() {
  return `
    ${createTimestampFunction()}
    ${createSoftDeleteFunction()}
    ${createSlugFunction()}
    ${createEmailValidationFunction()}
    ${createVersioningFunction()}
  `;
}

/**
 * Creates standard extensions
 * @returns {string} SQL for creating standard extensions
 */
export function createStandardExtensions() {
  return `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE EXTENSION IF NOT EXISTS "citext";
    CREATE EXTENSION IF NOT EXISTS "pg_trgm";
  `;
}

/**
 * Generates a secure random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
export function generateSecureString(length = 32) {
  return `
    SELECT encode(gen_random_bytes(${Math.ceil(length / 2)}), 'hex');
  `;
}

/**
 * Creates a function to handle full-text search
 * @param {string} tableName - Name of the table
 * @param {string[]} searchColumns - Columns to include in search
 * @returns {string} SQL for creating search functionality
 */
export function createSearchFunction(tableName, searchColumns) {
  const columnList = searchColumns.join(' || \' \' || ');
  return `
    ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS search_vector tsvector;
    
    CREATE OR REPLACE FUNCTION ${tableName}_search_vector_update() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('english', ${columnList});
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
    
    DROP TRIGGER IF EXISTS ${tableName}_search_vector_update ON ${tableName};
    CREATE TRIGGER ${tableName}_search_vector_update
    BEFORE INSERT OR UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE FUNCTION ${tableName}_search_vector_update();
    
    CREATE INDEX IF NOT EXISTS ${tableName}_search_idx ON ${tableName} USING gin(search_vector);
  `;
} 