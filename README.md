# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9b442949-8e5f-4be2-9d05-a4a4a64bc1ee

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9b442949-8e5f-4be2-9d05-a4a4a64bc1ee) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9b442949-8e5f-4be2-9d05-a4a4a64bc1ee) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

# Global Rules for Cursor AI

## Change Management Rules
1. Pre-Change Verification:
   - Validate all schema changes before execution
   - Check for dependent components
   - Verify data integrity constraints
   - Test backward compatibility
   - Document potential impact

2. Change Implementation:
   - Use versioned migrations
   - Implement rollback procedures
   - Follow atomic change patterns
   - Log all modifications
   - Include change metadata

3. Testing Requirements:
   - Create pre-change test cases
   - Validate post-change functionality
   - Test rollback procedures
   - Verify data consistency
   - Check performance impact

4. Documentation Standards:
   - Document change purpose
   - List affected components
   - Include rollback instructions
   - Update API documentation
   - Record testing results

5. Safety Protocols:
   - Use change verification decorators
   - Implement staged rollouts
   - Monitor system metrics
   - Set up alerts
   - Create recovery points

6. Code Quality Checks:
   - Run static analysis
   - Check type safety
   - Validate dependencies
   - Review error handling
   - Test edge cases

7. Performance Considerations:
   - Measure before/after metrics
   - Check query performance
   - Monitor memory usage
   - Validate response times
   - Test under load

8. Security Measures:
   - Audit permission changes
   - Verify access controls
   - Check data encryption
   - Validate input handling
   - Test security boundaries

9. Deployment Process:
   - Use staged deployments
   - Implement feature flags
   - Monitor deployment metrics
   - Enable quick rollback
   - Verify in staging first

10. Monitoring Requirements:
    - Track error rates
    - Monitor performance metrics
    - Log system changes
    - Alert on anomalies
    - Maintain audit trail

11. Change Validation:
    - Verify business logic
    - Test data migrations
    - Check API contracts
    - Validate UI components
    - Test integrations

12. Recovery Procedures:
    - Document rollback steps
    - Create recovery scripts
    - Test backup systems
    - Verify data restoration
    - Plan contingencies

# Fashionista Valentine Portal

A modern web application for managing fashion events and model registrations.

## Database Management Scripts

The project includes several scripts for managing the database:

### Database Setup and Migration

```bash
# Initialize the database with schema and initial setup
npm run db:init

# Run pending migrations
npm run db:migrate

# Generate a new migration file
npm run db:generate

# Roll back the last batch of migrations
npm run db:rollback

# Verify database setup and migrations
npm run db:verify

# Clean up the database (removes all tables, functions, triggers, and policies)
npm run db:cleanup

# Monitor database performance and health
npm run db:monitor

# Perform database maintenance tasks
npm run db:maintain

# Backup and restore database
npm run db:backup

# Generate database schema documentation
npm run db:docs

# Validate database schema against definitions
npm run db:validate

# Synchronize database schema with definitions
npm run db:sync
```

### Script Details

1. `db:init`
   - Initializes the database with the base schema
   - Creates tables with proper constraints
   - Sets up indexes for performance
   - Enables Row Level Security (RLS)
   - Creates triggers for automated updates

2. `db:migrate`
   - Runs all pending migrations
   - Handles dependencies between migrations
   - Maintains migration history
   - Provides detailed execution logs

3. `db:generate`
   - Interactive migration file generator
   - Creates timestamped migration files
   - Supports migration dependencies
   - Includes rollback SQL templates

4. `db:rollback`
   - Rolls back the last batch of migrations
   - Shows affected migrations before execution
   - Requires confirmation for safety
   - Maintains migration history

5. `db:verify`
   - Verifies database schema integrity
   - Checks table structures
   - Validates constraints and indexes
   - Confirms RLS policies
   - Reviews migration status

6. `db:cleanup`
   - Removes all database objects
   - Drops tables, functions, triggers
   - Cleans up RLS policies
   - Requires explicit confirmation
   - Provides rebuild instructions

7. `db:monitor`
   - Monitors database performance
   - Tracks table and index sizes
   - Analyzes index usage statistics
   - Checks active sessions
   - Detects table bloat
   - Provides maintenance recommendations

8. `db:maintain`
   - Interactive maintenance interface
   - VACUUM tables to reclaim space
   - ANALYZE tables to update statistics
   - VACUUM FULL for complete compaction
   - REINDEX tables and indexes
   - Shows table statistics after maintenance

9. `db:backup`
   - Interactive backup and restore interface
   - Full database backups
   - Schema-only backups
   - Data-only backups
   - Restore from backup files
   - Backup file management
   - Verification after restore

10. `db:docs`
    - Generates comprehensive schema documentation
    - Creates detailed table documentation
    - Generates entity relationship diagrams
    - Documents constraints and indexes
    - Documents RLS policies and triggers
    - Provides markdown-formatted output
    - Includes usage recommendations

11. `db:validate`
    - Validates schema against definitions
    - Checks table structures and columns
    - Verifies constraints and indexes
    - Validates RLS policies
    - Detects schema drift
    - Reports validation issues
    - Provides fix recommendations

12. `db:sync`
    - Synchronizes database with schema definitions
    - Detects schema differences
    - Generates synchronization plan
    - Shows SQL operations before execution
    - Requires confirmation for changes
    - Handles table creation and updates
    - Manages column modifications
    - Applies missing constraints
    - Creates required indexes
    - Sets up RLS policies
    - Verifies changes after sync
    - Provides detailed execution logs

### Usage Examples

1. Creating a New Migration:
   ```bash
   npm run db:generate
   # Follow the prompts to specify:
   # - Migration name
   # - Description
   # - Dependencies (if any)
   ```

2. Running Migrations:
   ```bash
   # First, initialize the database
   npm run db:init

   # Then run migrations
   npm run db:migrate

   # Verify the setup
   npm run db:verify
   ```

3. Rolling Back Changes:
   ```bash
   # View current migration status
   npm run db:verify

   # Roll back last batch
   npm run db:rollback
   ```

4. Database Cleanup:
   ```bash
   # Clean up database (use with caution)
   npm run db:cleanup

   # Rebuild after cleanup
   npm run db:init
   npm run db:migrate
   npm run db:verify
   ```

5. Database Monitoring:
   ```bash
   # Monitor database performance
   npm run db:monitor

   # Review the output for:
   # - Table sizes and row counts
   # - Index usage statistics
   # - Active sessions
   # - Table bloat analysis
   # - Performance recommendations
   ```

6. Database Maintenance:
   ```bash
   # Start maintenance interface
   npm run db:maintain

   # Available operations:
   # - VACUUM (reclaim storage)
   # - ANALYZE (update statistics)
   # - VACUUM FULL (compact tables)
   # - REINDEX (rebuild indexes)
   ```

7. Database Backup and Restore:
   ```bash
   # Start backup/restore interface
   npm run db:backup

   # Available operations:
   # - Create full backup
   # - Create schema-only backup
   # - Create data-only backup
   # - Restore from backup
   # - List available backups
   ```

8. Schema Documentation:
   ```bash
   # Generate schema documentation
   npm run db:docs

   # Generated files:
   # - README.md (Overview)
   # - schema-diagram.md (ER Diagram)
   # - tables/*.md (Table details)
   ```

9. Schema Validation:
   ```bash
   # Validate database schema
   npm run db:validate

   # Validation checks:
   # - Table structures
   # - Column definitions
   # - Constraints and indexes
   # - RLS policies
   # - Schema drift detection
   ```

10. Schema Synchronization:
    ```bash
    # Synchronize database schema
    npm run db:sync

    # Synchronization steps:
    # 1. Analyze current schema
    # 2. Generate sync plan
    # 3. Show proposed changes
    # 4. Confirm execution
    # 5. Apply changes
    # 6. Verify results
    ```

### Best Practices

1. Migration Files
   - Use descriptive names
   - Include clear descriptions
   - Specify dependencies
   - Always include rollback SQL
   - Test migrations locally

2. Database Management
   - Regularly verify database state
   - Back up before major changes
   - Use cleanup with caution
   - Follow migration order
   - Monitor migration logs

3. Security
   - Keep credentials secure
   - Review RLS policies
   - Validate constraints
   - Monitor access logs
   - Regular security audits

4. Performance Monitoring
   - Regular health checks
   - Review index usage
   - Analyze query patterns
   - Monitor table growth
   - Schedule maintenance

5. Database Maintenance
   - Regular VACUUM operations
   - Update statistics with ANALYZE
   - Careful use of VACUUM FULL
   - Monitor table bloat
   - Schedule maintenance windows

6. Backup and Recovery
   - Regular automated backups
   - Multiple backup types
   - Secure backup storage
   - Test restore procedures
   - Backup retention policy

7. Documentation
   - Keep docs in sync with schema
   - Include diagrams and examples
   - Document security policies
   - Maintain version history
   - Review and update regularly

8. Schema Validation
   - Regular validation checks
   - Monitor schema drift
   - Fix validation issues promptly
   - Test after schema changes
   - Document deviations

9. Schema Synchronization
   - Review sync plan carefully
   - Back up before syncing
   - Test in development first
   - Monitor sync performance
   - Document manual changes

### Troubleshooting

1. Migration Failures
   - Check migration logs
   - Verify dependencies
   - Review SQL syntax
   - Check constraints
   - Use rollback if needed

2. Database Verification
   - Run verify command
   - Check table structures
   - Validate indexes
   - Review RLS policies
   - Monitor performance

3. Cleanup Issues
   - Ensure no connections
   - Check permissions
   - Review error logs
   - Follow rebuild steps
   - Backup before cleanup

4. Performance Issues
   - Run monitoring script
   - Review table bloat
   - Check index usage
   - Analyze active sessions
   - Follow recommendations

5. Maintenance Issues
   - Check lock conflicts
   - Monitor operation progress
   - Review error messages
   - Verify space requirements
   - Schedule during low usage

6. Backup/Restore Issues
   - Verify backup integrity
   - Check disk space
   - Monitor restore progress
   - Validate after restore
   - Test recovery procedures

7. Documentation Issues
   - Verify schema accuracy
   - Check diagram generation
   - Update after changes
   - Review formatting
   - Track documentation versions

8. Validation Issues
   - Review validation errors
   - Check schema definitions
   - Fix schema drift
   - Test after fixes
   - Document exceptions

9. Synchronization Issues
   - Review error messages
   - Check dependencies
   - Verify permissions
   - Monitor locks
   - Handle data conflicts

## License

MIT License - see LICENSE file for details
