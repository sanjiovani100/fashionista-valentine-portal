import { config } from 'dotenv';
import { DatabaseSetup } from '../utils/database/setup';
import chalk from 'chalk';
import { formatDistanceToNow } from 'date-fns';

// Load environment variables
config();

async function monitorDatabase() {
  try {
    console.log(chalk.blue('Database Monitoring\n'));

    // Initialize database setup
    const setup = new DatabaseSetup({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      verbose: true,
    });

    // Step 1: Check table sizes and row counts
    console.log(chalk.yellow('Step 1: Checking table sizes and row counts...'));
    const tableSizesResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT
          schemaname,
          relname as table_name,
          pg_size_pretty(pg_total_relation_size(relid)) as total_size,
          pg_size_pretty(pg_relation_size(relid)) as table_size,
          pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) as index_size,
          reltuples::bigint as row_count
        FROM pg_catalog.pg_statio_user_tables
        WHERE schemaname = 'public'
        ORDER BY pg_total_relation_size(relid) DESC;
      `,
    });

    if (tableSizesResult.error) {
      throw new Error(`Failed to get table sizes: ${tableSizesResult.error.message}`);
    }

    console.log('\nTable Statistics:');
    tableSizesResult.data?.forEach((table: any) => {
      console.log(chalk.cyan(`\n${table.table_name}:`));
      console.log(`- Total Size: ${table.total_size}`);
      console.log(`- Table Size: ${table.table_size}`);
      console.log(`- Index Size: ${table.index_size}`);
      console.log(`- Row Count: ${table.row_count.toLocaleString()}`);
    });

    // Step 2: Check index usage
    console.log(chalk.yellow('\nStep 2: Checking index usage...'));
    const indexUsageResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT
          schemaname,
          tablename,
          indexname,
          idx_scan as number_of_scans,
          idx_tup_read as tuples_read,
          idx_tup_fetch as tuples_fetched,
          pg_size_pretty(pg_relation_size(indexrelid::regclass)) as index_size
        FROM pg_catalog.pg_stat_user_indexes
        WHERE schemaname = 'public'
        ORDER BY idx_scan DESC;
      `,
    });

    if (indexUsageResult.error) {
      throw new Error(`Failed to get index usage: ${indexUsageResult.error.message}`);
    }

    console.log('\nIndex Usage Statistics:');
    indexUsageResult.data?.forEach((index: any) => {
      console.log(chalk.cyan(`\n${index.tablename}.${index.indexname}:`));
      console.log(`- Number of Scans: ${index.number_of_scans.toLocaleString()}`);
      console.log(`- Tuples Read: ${index.tuples_read.toLocaleString()}`);
      console.log(`- Tuples Fetched: ${index.tuples_fetched.toLocaleString()}`);
      console.log(`- Index Size: ${index.index_size}`);
    });

    // Step 3: Check active sessions
    console.log(chalk.yellow('\nStep 3: Checking active sessions...'));
    const sessionsResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT
          pid,
          usename,
          application_name,
          client_addr,
          backend_start,
          state,
          wait_event_type,
          wait_event,
          query
        FROM pg_stat_activity
        WHERE state IS NOT NULL
          AND pid <> pg_backend_pid()
          AND usename IS NOT NULL;
      `,
    });

    if (sessionsResult.error) {
      throw new Error(`Failed to get active sessions: ${sessionsResult.error.message}`);
    }

    console.log('\nActive Sessions:');
    if (sessionsResult.data?.length === 0) {
      console.log('No active sessions found');
    } else {
      sessionsResult.data?.forEach((session: any) => {
        console.log(chalk.cyan(`\nSession PID ${session.pid}:`));
        console.log(`- User: ${session.usename}`);
        console.log(`- Application: ${session.application_name || 'N/A'}`);
        console.log(`- Client: ${session.client_addr || 'N/A'}`);
        console.log(`- Started: ${formatDistanceToNow(new Date(session.backend_start))} ago`);
        console.log(`- State: ${session.state}`);
        if (session.wait_event_type) {
          console.log(`- Waiting: ${session.wait_event_type} (${session.wait_event})`);
        }
        if (session.query) {
          console.log(`- Query: ${session.query.substring(0, 100)}${session.query.length > 100 ? '...' : ''}`);
        }
      });
    }

    // Step 4: Check table bloat
    console.log(chalk.yellow('\nStep 4: Checking table bloat...'));
    const bloatResult = await setup.client.rpc('execute_sql', {
      sql: `
        WITH constants AS (
          SELECT current_setting('block_size')::numeric AS bs, 23 AS hdr, 8 AS ma
        ),
        no_stats AS (
          SELECT table_schema, table_name, 
                 n_live_tup::numeric as est_rows,
                 pg_table_size(relid)::numeric as table_size
          FROM information_schema.columns
                 JOIN pg_stat_user_tables as psut
                   ON table_schema = psut.schemaname
                   AND table_name = psut.relname
          WHERE table_schema = 'public'
          GROUP BY table_schema, table_name, relid, n_live_tup
        ),
        null_headers AS (
          SELECT
            hdr+1+(sum(case when null_frac <> 0 THEN 1 else 0 END)/8) as nullhdr,
            SUM((1-null_frac)*avg_width) as datawidth,
            MAX(null_frac) as maxfrac,
            table_schema,
            table_name,
            est_rows,
            table_size
          FROM no_stats as ns
                 JOIN pg_stats as ps
                   ON ns.table_schema = ps.schemaname
                   AND ns.table_name = ps.tablename
          GROUP BY table_schema, table_name, est_rows, table_size, hdr
        )
        SELECT
          table_schema as schema,
          table_name as table_name,
          pg_size_pretty(table_size) as table_size,
          pg_size_pretty(CASE WHEN bloat_size < 0 THEN 0 ELSE bloat_size END) as bloat_size,
          CASE WHEN table_size = 0 THEN 0
               ELSE ROUND(100 * bloat_size::numeric / table_size, 1)
          END as bloat_ratio
        FROM (
          SELECT
            table_schema, table_name, table_size,
            (table_size - ((est_rows * (datawidth + nullhdr + 4 + ma -
              (CASE WHEN nullhdr%ma=0 THEN ma ELSE nullhdr%ma END)
            ))::bigint & ~7)) as bloat_size
          FROM null_headers
        ) bloat_table
        WHERE table_schema = 'public'
        ORDER BY table_size DESC;
      `,
    });

    if (bloatResult.error) {
      throw new Error(`Failed to get table bloat: ${bloatResult.error.message}`);
    }

    console.log('\nTable Bloat Analysis:');
    bloatResult.data?.forEach((table: any) => {
      console.log(chalk.cyan(`\n${table.table_name}:`));
      console.log(`- Table Size: ${table.table_size}`);
      console.log(`- Bloat Size: ${table.bloat_size}`);
      console.log(`- Bloat Ratio: ${table.bloat_ratio}%`);

      if (table.bloat_ratio > 20) {
        console.log(chalk.yellow('⚠️  High bloat detected - consider running VACUUM FULL'));
      }
    });

    console.log(chalk.green('\n✓ Database monitoring completed!'));
    console.log(chalk.blue('\nRecommendations:'));
    console.log('1. Regularly monitor table and index sizes');
    console.log('2. Review unused indexes for potential removal');
    console.log('3. Analyze tables with high bloat ratio');
    console.log('4. Monitor active sessions for long-running queries');
    console.log('5. Schedule regular maintenance (VACUUM, ANALYZE)');
  } catch (error) {
    console.error(chalk.red('\nMonitoring failed:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run monitoring
monitorDatabase(); 