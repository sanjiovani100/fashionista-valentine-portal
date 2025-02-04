import { config } from 'dotenv';
import { DatabaseSetup } from '../utils/database/setup';
import chalk from 'chalk';
import { TableSchemas, TableConstraints, TableIndexes, RLSPolicies, TableSchema } from '../types/database/schema';

// Load environment variables
config();

async function validateSchema() {
  try {
    console.log(chalk.blue('Database Schema Validation\n'));

    // Initialize database setup
    const setup = new DatabaseSetup({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      verbose: true,
    });

    // Step 1: Validate table structures
    console.log(chalk.yellow('Step 1: Validating table structures...'));
    const tablesResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT 
          c.table_name,
          c.column_name,
          c.data_type,
          c.column_default,
          c.is_nullable,
          c.character_maximum_length,
          c.numeric_precision,
          c.numeric_scale
        FROM information_schema.columns c
        WHERE c.table_schema = 'public'
        ORDER BY c.table_name, c.ordinal_position;
      `,
    });

    if (tablesResult.error) {
      throw new Error(`Failed to get table structures: ${tablesResult.error.message}`);
    }

    const tableValidation = new Map<string, { valid: boolean; issues: string[] }>();

    // Compare actual tables with schema definition
    for (const [tableName, schema] of Object.entries(TableSchemas)) {
      const tableColumns = tablesResult.data?.filter(
        (col: any) => col.table_name === tableName
      );

      const issues: string[] = [];

      // Check if table exists
      if (!tableColumns?.length) {
        issues.push(`Table ${tableName} does not exist in database`);
        tableValidation.set(tableName, { valid: false, issues });
        continue;
      }

      // Check each column
      for (const [columnName, columnDef] of Object.entries(schema as TableSchema)) {
        const actualColumn = tableColumns.find(
          (col: any) => col.column_name === columnName
        );

        if (!actualColumn) {
          issues.push(`Column ${columnName} does not exist in table ${tableName}`);
          continue;
        }

        // Extract data type from column definition
        const expectedType = (columnDef as string).split(' ')[0].toLowerCase();
        const actualType = actualColumn.data_type.toLowerCase();

        if (!actualType.includes(expectedType)) {
          issues.push(
            `Column ${columnName} has type ${actualType}, expected ${expectedType}`
          );
        }

        // Check nullability
        const expectedNullable = !(columnDef as string).includes('NOT NULL');
        const actualNullable = actualColumn.is_nullable === 'YES';

        if (expectedNullable !== actualNullable) {
          issues.push(
            `Column ${columnName} nullability mismatch: expected ${expectedNullable}, got ${actualNullable}`
          );
        }
      }

      tableValidation.set(tableName, {
        valid: issues.length === 0,
        issues,
      });
    }

    // Step 2: Validate constraints
    console.log(chalk.yellow('\nStep 2: Validating constraints...'));
    const constraintsResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT 
          tc.table_name,
          tc.constraint_name,
          tc.constraint_type,
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name,
          cc.check_clause
        FROM information_schema.table_constraints tc
        LEFT JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        LEFT JOIN information_schema.constraint_column_usage ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
        LEFT JOIN information_schema.check_constraints cc
          ON cc.constraint_name = tc.constraint_name
        WHERE tc.table_schema = 'public'
        ORDER BY tc.table_name, tc.constraint_name;
      `,
    });

    if (constraintsResult.error) {
      throw new Error(`Failed to get constraints: ${constraintsResult.error.message}`);
    }

    // Compare actual constraints with schema definition
    for (const [tableName, constraints] of Object.entries(TableConstraints)) {
      const tableValidationData = tableValidation.get(tableName) || {
        valid: true,
        issues: [],
      };

      const actualConstraints = constraintsResult.data?.filter(
        (con: any) => con.table_name === tableName
      );

      for (const constraint of constraints as string[]) {
        const constraintExists = actualConstraints?.some(
          (con: any) =>
            con.constraint_type === 'CHECK' &&
            con.check_clause?.replace(/\s+/g, ' ').trim() ===
              constraint.replace(/\s+/g, ' ').trim()
        );

        if (!constraintExists) {
          tableValidationData.valid = false;
          tableValidationData.issues.push(
            `Missing constraint in table ${tableName}: ${constraint}`
          );
        }
      }

      tableValidation.set(tableName, tableValidationData);
    }

    // Step 3: Validate indexes
    console.log(chalk.yellow('\nStep 3: Validating indexes...'));
    const indexesResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT
          schemaname,
          tablename,
          indexname,
          indexdef
        FROM pg_indexes
        WHERE schemaname = 'public'
        ORDER BY tablename, indexname;
      `,
    });

    if (indexesResult.error) {
      throw new Error(`Failed to get indexes: ${indexesResult.error.message}`);
    }

    // Compare actual indexes with schema definition
    for (const [tableName, indexes] of Object.entries(TableIndexes)) {
      const tableValidationData = tableValidation.get(tableName) || {
        valid: true,
        issues: [],
      };

      const actualIndexes = indexesResult.data?.filter(
        (idx: any) => idx.tablename === tableName
      );

      for (const index of indexes as string[]) {
        const indexExists = actualIndexes?.some(
          (idx: any) =>
            idx.indexdef.replace(/\s+/g, ' ').trim() ===
            index.replace(/\s+/g, ' ').trim()
        );

        if (!indexExists) {
          tableValidationData.valid = false;
          tableValidationData.issues.push(
            `Missing index in table ${tableName}: ${index}`
          );
        }
      }

      tableValidation.set(tableName, tableValidationData);
    }

    // Step 4: Validate RLS policies
    console.log(chalk.yellow('\nStep 4: Validating RLS policies...'));
    const policiesResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT
          schemaname,
          tablename,
          policyname,
          permissive,
          roles,
          cmd,
          qual,
          with_check
        FROM pg_policies
        WHERE schemaname = 'public'
        ORDER BY tablename, policyname;
      `,
    });

    if (policiesResult.error) {
      throw new Error(`Failed to get RLS policies: ${policiesResult.error.message}`);
    }

    // Compare actual policies with schema definition
    for (const [tableName, policies] of Object.entries(RLSPolicies)) {
      const tableValidationData = tableValidation.get(tableName) || {
        valid: true,
        issues: [],
      };

      const actualPolicies = policiesResult.data?.filter(
        (pol: any) => pol.tablename === tableName
      );

      for (const policy of policies as string[]) {
        const policyExists = actualPolicies?.some(
          (pol: any) =>
            pol.qual?.replace(/\s+/g, ' ').trim() ===
            policy.replace(/\s+/g, ' ').trim()
        );

        if (!policyExists) {
          tableValidationData.valid = false;
          tableValidationData.issues.push(
            `Missing RLS policy in table ${tableName}: ${policy}`
          );
        }
      }

      tableValidation.set(tableName, tableValidationData);
    }

    // Output validation results
    console.log(chalk.yellow('\nValidation Results:'));
    let hasIssues = false;

    for (const [tableName, validation] of tableValidation.entries()) {
      if (validation.valid) {
        console.log(chalk.green(`✓ ${tableName}: Valid`));
      } else {
        hasIssues = true;
        console.log(chalk.red(`✗ ${tableName}: Invalid`));
        validation.issues.forEach((issue) => {
          console.log(chalk.red(`  - ${issue}`));
        });
      }
    }

    if (hasIssues) {
      console.log(chalk.red('\n✗ Schema validation failed!'));
      console.log(chalk.blue('\nRecommendations:'));
      console.log('1. Review and fix reported issues');
      console.log('2. Run migrations to update schema');
      console.log('3. Verify changes with db:verify');
      console.log('4. Update schema documentation');
      console.log('5. Test affected functionality');
      process.exit(1);
    } else {
      console.log(chalk.green('\n✓ Schema validation passed!'));
      console.log(chalk.blue('\nRecommendations:'));
      console.log('1. Regularly run schema validation');
      console.log('2. Monitor for schema drift');
      console.log('3. Keep schema documentation updated');
      console.log('4. Review security policies');
      console.log('5. Test database performance');
    }
  } catch (error) {
    console.error(chalk.red('\nValidation failed:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run validation
validateSchema(); 