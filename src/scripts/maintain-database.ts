import { config } from 'dotenv';
import { DatabaseSetup } from '../utils/database/setup';
import chalk from 'chalk';
import readline from 'readline';

// Load environment variables
config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function maintainDatabase() {
  try {
    console.log(chalk.blue('Database Maintenance\n'));

    // Initialize database setup
    const setup = new DatabaseSetup({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      verbose: true,
    });

    // Get list of tables
    const tablesResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY tablename;
      `,
    });

    if (tablesResult.error) {
      throw new Error(`Failed to get tables: ${tablesResult.error.message}`);
    }

    const tables = tablesResult.data?.map((t: any) => t.tablename);

    // Show maintenance menu
    while (true) {
      console.log(chalk.yellow('\nMaintenance Options:'));
      console.log('1. VACUUM (reclaim storage and update statistics)');
      console.log('2. ANALYZE (update statistics only)');
      console.log('3. VACUUM FULL (compact tables - requires exclusive lock)');
      console.log('4. REINDEX (rebuild indexes)');
      console.log('5. Exit');

      const choice = await question('\nSelect an option (1-5): ');

      if (choice === '5') {
        break;
      }

      // Select tables
      console.log(chalk.yellow('\nAvailable Tables:'));
      tables.forEach((table: string, index: number) => {
        console.log(`${index + 1}. ${table}`);
      });
      console.log(`${tables.length + 1}. All tables`);

      const tableChoice = await question(`\nSelect table (1-${tables.length + 1}): `);
      const selectedTables = tableChoice === `${tables.length + 1}`
        ? tables
        : [tables[parseInt(tableChoice) - 1]];

      // Execute maintenance
      for (const table of selectedTables) {
        try {
          switch (choice) {
            case '1': {
              console.log(chalk.yellow(`\nVacuuming table ${table}...`));
              const result = await setup.client.rpc('execute_sql', {
                sql: `VACUUM VERBOSE ${table};`,
              });
              if (result.error) throw result.error;
              console.log(chalk.green('✓ Vacuum completed'));
              break;
            }

            case '2': {
              console.log(chalk.yellow(`\nAnalyzing table ${table}...`));
              const result = await setup.client.rpc('execute_sql', {
                sql: `ANALYZE VERBOSE ${table};`,
              });
              if (result.error) throw result.error;
              console.log(chalk.green('✓ Analyze completed'));
              break;
            }

            case '3': {
              const confirm = await question(
                chalk.red(`\n⚠️  VACUUM FULL will lock table ${table}. Are you sure? (yes/NO): `)
              );
              if (confirm.toLowerCase() !== 'yes') {
                console.log('Skipping VACUUM FULL');
                continue;
              }

              console.log(chalk.yellow(`\nPerforming VACUUM FULL on table ${table}...`));
              const result = await setup.client.rpc('execute_sql', {
                sql: `VACUUM FULL VERBOSE ${table};`,
              });
              if (result.error) throw result.error;
              console.log(chalk.green('✓ Vacuum Full completed'));
              break;
            }

            case '4': {
              console.log(chalk.yellow(`\nReindexing table ${table}...`));
              const result = await setup.client.rpc('execute_sql', {
                sql: `REINDEX TABLE CONCURRENTLY ${table};`,
              });
              if (result.error) throw result.error;
              console.log(chalk.green('✓ Reindex completed'));
              break;
            }
          }

          // Get table statistics after maintenance
          const statsResult = await setup.client.rpc('execute_sql', {
            sql: `
              SELECT
                pg_size_pretty(pg_total_relation_size($1)) as total_size,
                pg_size_pretty(pg_table_size($1)) as table_size,
                pg_size_pretty(pg_indexes_size($1)) as index_size,
                (SELECT reltuples::bigint FROM pg_class WHERE relname = $1) as estimated_rows
              FROM pg_catalog.pg_tables
              WHERE tablename = $1;
            `,
            params: [table],
          });

          if (!statsResult.error && statsResult.data?.[0]) {
            const stats = statsResult.data[0];
            console.log('\nTable Statistics:');
            console.log(`- Total Size: ${stats.total_size}`);
            console.log(`- Table Size: ${stats.table_size}`);
            console.log(`- Index Size: ${stats.index_size}`);
            console.log(`- Estimated Rows: ${stats.estimated_rows.toLocaleString()}`);
          }
        } catch (error) {
          console.error(chalk.red(`\nError maintaining table ${table}:`), 
            error instanceof Error ? error.message : error
          );
        }
      }
    }

    console.log(chalk.green('\n✓ Database maintenance completed!'));
    console.log(chalk.blue('\nRecommendations:'));
    console.log('1. Run VACUUM regularly to reclaim space');
    console.log('2. Run ANALYZE after large data changes');
    console.log('3. Use VACUUM FULL only during maintenance windows');
    console.log('4. Monitor table statistics after maintenance');
    console.log('5. Schedule regular maintenance tasks');
  } catch (error) {
    console.error(chalk.red('\nMaintenance failed:'), error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run maintenance
maintainDatabase(); 