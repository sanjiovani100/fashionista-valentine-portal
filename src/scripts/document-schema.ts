import { config } from 'dotenv';
import { DatabaseSetup } from '../utils/database/setup';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

// Load environment variables
config();

async function documentSchema() {
  try {
    console.log(chalk.blue('Generating Database Schema Documentation\n'));

    // Initialize database setup
    const setup = new DatabaseSetup({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      verbose: true,
    });

    // Create docs directory if it doesn't exist
    const docsDir = path.join(process.cwd(), 'docs', 'database');
    await fs.mkdir(docsDir, { recursive: true });

    // Step 1: Get table information
    console.log(chalk.yellow('Step 1: Gathering table information...'));
    const tablesResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT 
          t.table_name,
          obj_description(pgc.oid, 'pg_class') as table_description,
          t.table_type,
          t.is_insertable_into,
          t.is_typed
        FROM information_schema.tables t
        JOIN pg_class pgc ON t.table_name = pgc.relname
        WHERE t.table_schema = 'public'
        ORDER BY t.table_name;
      `,
    });

    if (tablesResult.error) {
      throw new Error(`Failed to get table information: ${tablesResult.error.message}`);
    }

    // Step 2: Get column information for each table
    console.log(chalk.yellow('\nStep 2: Gathering column information...'));
    const columnsResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT 
          c.table_name,
          c.column_name,
          c.data_type,
          c.column_default,
          c.is_nullable,
          c.character_maximum_length,
          c.numeric_precision,
          c.numeric_scale,
          col_description(pgc.oid, c.ordinal_position) as column_description,
          c.ordinal_position
        FROM information_schema.columns c
        JOIN pg_class pgc ON c.table_name = pgc.relname
        WHERE c.table_schema = 'public'
        ORDER BY c.table_name, c.ordinal_position;
      `,
    });

    if (columnsResult.error) {
      throw new Error(`Failed to get column information: ${columnsResult.error.message}`);
    }

    // Step 3: Get constraint information
    console.log(chalk.yellow('\nStep 3: Gathering constraint information...'));
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
      throw new Error(`Failed to get constraint information: ${constraintsResult.error.message}`);
    }

    // Step 4: Get index information
    console.log(chalk.yellow('\nStep 4: Gathering index information...'));
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
      throw new Error(`Failed to get index information: ${indexesResult.error.message}`);
    }

    // Step 5: Get RLS policy information
    console.log(chalk.yellow('\nStep 5: Gathering RLS policy information...'));
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
      throw new Error(`Failed to get RLS policy information: ${policiesResult.error.message}`);
    }

    // Step 6: Get trigger information
    console.log(chalk.yellow('\nStep 6: Gathering trigger information...'));
    const triggersResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT
          event_object_table as table_name,
          trigger_name,
          event_manipulation,
          action_timing,
          action_statement,
          action_orientation,
          action_condition
        FROM information_schema.triggers
        WHERE trigger_schema = 'public'
        ORDER BY event_object_table, trigger_name;
      `,
    });

    if (triggersResult.error) {
      throw new Error(`Failed to get trigger information: ${triggersResult.error.message}`);
    }

    // Generate documentation
    console.log(chalk.yellow('\nGenerating documentation...'));

    // Generate main README
    const mainReadme = [
      '# Database Schema Documentation',
      '',
      '## Overview',
      '',
      'This documentation provides a comprehensive overview of the database schema, including tables, columns, constraints, indexes, and security policies.',
      '',
      '## Tables',
      '',
      tablesResult.data?.map((table: any) => {
        return `- [${table.table_name}](./tables/${table.table_name}.md)${
          table.table_description ? ` - ${table.table_description}` : ''
        }`;
      }).join('\n'),
      '',
      '## Security',
      '',
      '### Row Level Security (RLS) Policies',
      '',
      policiesResult.data?.map((policy: any) => {
        return `- ${policy.tablename}.${policy.policyname}`;
      }).join('\n'),
      '',
      '## Maintenance',
      '',
      '### Triggers',
      '',
      triggersResult.data?.map((trigger: any) => {
        return `- ${trigger.table_name}.${trigger.trigger_name}`;
      }).join('\n'),
      '',
    ].join('\n');

    await fs.writeFile(path.join(docsDir, 'README.md'), mainReadme);

    // Create tables directory
    const tablesDir = path.join(docsDir, 'tables');
    await fs.mkdir(tablesDir, { recursive: true });

    // Generate documentation for each table
    for (const table of tablesResult.data || []) {
      const tableDoc = [
        `# ${table.table_name}`,
        '',
        table.table_description ? `${table.table_description}\n` : '',
        '## Columns',
        '',
        '| Name | Type | Default | Nullable | Description |',
        '|------|------|---------|-----------|-------------|',
        columnsResult.data
          ?.filter((col: any) => col.table_name === table.table_name)
          .map((col: any) => {
            return [
              col.column_name,
              col.data_type,
              col.column_default || 'NULL',
              col.is_nullable === 'YES' ? '✓' : '✗',
              col.column_description || '',
            ].map(v => v.toString().replace(/\|/g, '\\|')).join(' | ');
          })
          .join('\n'),
        '',
        '## Constraints',
        '',
        constraintsResult.data
          ?.filter((con: any) => con.table_name === table.table_name)
          .map((con: any) => {
            let description = `### ${con.constraint_name} (${con.constraint_type})`;
            if (con.constraint_type === 'FOREIGN KEY') {
              description += `\nReferences ${con.foreign_table_name}(${con.foreign_column_name})`;
            } else if (con.constraint_type === 'CHECK') {
              description += `\n\`${con.check_clause}\``;
            }
            return description;
          })
          .join('\n\n'),
        '',
        '## Indexes',
        '',
        indexesResult.data
          ?.filter((idx: any) => idx.tablename === table.table_name)
          .map((idx: any) => `### ${idx.indexname}\n\`\`\`sql\n${idx.indexdef}\n\`\`\``)
          .join('\n\n'),
        '',
        '## Security',
        '',
        '### RLS Policies',
        '',
        policiesResult.data
          ?.filter((pol: any) => pol.tablename === table.table_name)
          .map((pol: any) => {
            return [
              `### ${pol.policyname}`,
              `- Command: ${pol.cmd}`,
              `- Roles: ${pol.roles.join(', ')}`,
              pol.qual ? `- Using: \`${pol.qual}\`` : '',
              pol.with_check ? `- With Check: \`${pol.with_check}\`` : '',
            ].filter(Boolean).join('\n');
          })
          .join('\n\n'),
        '',
        '## Triggers',
        '',
        triggersResult.data
          ?.filter((trig: any) => trig.table_name === table.table_name)
          .map((trig: any) => {
            return [
              `### ${trig.trigger_name}`,
              `- Timing: ${trig.action_timing} ${trig.event_manipulation}`,
              `- Orientation: ${trig.action_orientation}`,
              trig.action_condition ? `- Condition: \`${trig.action_condition}\`` : '',
              '```sql',
              trig.action_statement,
              '```',
            ].filter(Boolean).join('\n');
          })
          .join('\n\n'),
        '',
      ].join('\n');

      await fs.writeFile(path.join(tablesDir, `${table.table_name}.md`), tableDoc);
    }

    // Generate diagrams
    console.log(chalk.yellow('\nGenerating schema diagrams...'));
    const mermaidDiagram = [
      '```mermaid',
      'erDiagram',
      tablesResult.data?.map((table: any) => {
        const columns = columnsResult.data
          ?.filter((col: any) => col.table_name === table.table_name)
          .map((col: any) => `    ${col.column_name} ${col.data_type}`)
          .join('\n');
        
        return `    ${table.table_name} {\n${columns}\n    }`;
      }).join('\n\n'),
      constraintsResult.data
        ?.filter((con: any) => con.constraint_type === 'FOREIGN KEY')
        .map((con: any) => {
          return `    ${con.table_name} }|--|| ${con.foreign_table_name} : "${con.constraint_name}"`;
        })
        .join('\n'),
      '```',
    ].join('\n');

    await fs.writeFile(path.join(docsDir, 'schema-diagram.md'), mermaidDiagram);

    console.log(chalk.green('\n✓ Documentation generated successfully!'));
    console.log(`Documentation saved to: ${docsDir}`);
    console.log('\nFiles generated:');
    console.log('- README.md (Overview)');
    console.log('- schema-diagram.md (Entity Relationship Diagram)');
    console.log('- tables/*.md (Detailed table documentation)');

    console.log(chalk.blue('\nRecommendations:'));
    console.log('1. Keep documentation up to date with schema changes');
    console.log('2. Include documentation updates in migrations');
    console.log('3. Review and verify generated diagrams');
    console.log('4. Add custom sections for specific requirements');
    console.log('5. Use version control for documentation');
  } catch (error) {
    console.error(chalk.red('\nDocumentation generation failed:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Generate documentation
documentSchema(); 