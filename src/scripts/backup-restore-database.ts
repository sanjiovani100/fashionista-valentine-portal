import { config } from 'dotenv';
import { DatabaseSetup } from '../utils/database/setup';
import chalk from 'chalk';
import readline from 'readline';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

// Load environment variables
config();

const execAsync = promisify(exec);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function backupRestoreDatabase() {
  try {
    console.log(chalk.blue('Database Backup and Restore\n'));

    // Initialize database setup
    const setup = new DatabaseSetup({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      verbose: true,
    });

    // Create backups directory if it doesn't exist
    const backupsDir = path.join(process.cwd(), 'backups');
    await fs.mkdir(backupsDir, { recursive: true });

    while (true) {
      console.log(chalk.yellow('\nBackup and Restore Options:'));
      console.log('1. Create full database backup');
      console.log('2. Create schema-only backup');
      console.log('3. Create data-only backup');
      console.log('4. Restore from backup');
      console.log('5. List available backups');
      console.log('6. Exit');

      const choice = await question('\nSelect an option (1-6): ');

      if (choice === '6') {
        break;
      }

      switch (choice) {
        case '1':
        case '2':
        case '3': {
          const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
          const backupType = choice === '1' ? 'full' : choice === '2' ? 'schema' : 'data';
          const filename = `backup_${backupType}_${timestamp}.sql`;
          const filePath = path.join(backupsDir, filename);

          console.log(chalk.yellow(`\nCreating ${backupType} backup...`));

          try {
            const command = [
              'pg_dump',
              `-h ${process.env.DB_HOST}`,
              `-p ${process.env.DB_PORT}`,
              `-U ${process.env.DB_USER}`,
              `-d ${process.env.DB_NAME}`,
              choice === '2' ? '--schema-only' : '',
              choice === '3' ? '--data-only' : '',
              '--clean',
              '--if-exists',
              '--no-owner',
              '--no-privileges',
              `--file="${filePath}"`,
            ].filter(Boolean).join(' ');

            const { stdout, stderr } = await execAsync(command, {
              env: { ...process.env, PGPASSWORD: process.env.DB_PASSWORD },
            });

            if (stderr) {
              console.error(chalk.red('Backup warnings:'), stderr);
            }

            console.log(chalk.green('✓ Backup completed successfully'));
            console.log(`Backup saved to: ${filePath}`);

            // Get backup size
            const stats = await fs.stat(filePath);
            console.log(`Backup size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
          } catch (error) {
            console.error(chalk.red('Backup failed:'), error instanceof Error ? error.message : error);
          }
          break;
        }

        case '4': {
          // List available backups
          const backups = await fs.readdir(backupsDir);
          if (backups.length === 0) {
            console.log(chalk.yellow('No backups available'));
            break;
          }

          console.log(chalk.yellow('\nAvailable backups:'));
          backups.forEach((backup, index) => {
            console.log(`${index + 1}. ${backup}`);
          });

          const backupChoice = await question(`\nSelect backup to restore (1-${backups.length}): `);
          const selectedBackup = backups[parseInt(backupChoice) - 1];

          if (!selectedBackup) {
            console.log(chalk.red('Invalid backup selection'));
            break;
          }

          const confirm = await question(
            chalk.red('\n⚠️  This will overwrite the current database. Are you sure? (yes/NO): ')
          );

          if (confirm.toLowerCase() !== 'yes') {
            console.log('Restore cancelled');
            break;
          }

          console.log(chalk.yellow('\nRestoring backup...'));

          try {
            const command = [
              'psql',
              `-h ${process.env.DB_HOST}`,
              `-p ${process.env.DB_PORT}`,
              `-U ${process.env.DB_USER}`,
              `-d ${process.env.DB_NAME}`,
              `-f "${path.join(backupsDir, selectedBackup)}"`,
            ].join(' ');

            const { stdout, stderr } = await execAsync(command, {
              env: { ...process.env, PGPASSWORD: process.env.DB_PASSWORD },
            });

            if (stderr) {
              console.error(chalk.yellow('Restore warnings:'), stderr);
            }

            console.log(chalk.green('✓ Restore completed successfully'));

            // Verify database state
            console.log(chalk.yellow('\nVerifying database state...'));
            const verifyResult = await setup.verify();
            
            if (verifyResult.success) {
              console.log(chalk.green('✓ Database verification passed'));
              console.log('Details:', verifyResult.details);
            } else {
              console.log(chalk.red('✗ Database verification failed'));
              console.error('Error:', verifyResult.error);
            }
          } catch (error) {
            console.error(chalk.red('Restore failed:'), error instanceof Error ? error.message : error);
          }
          break;
        }

        case '5': {
          console.log(chalk.yellow('\nAvailable backups:'));
          const backups = await fs.readdir(backupsDir);

          if (backups.length === 0) {
            console.log('No backups available');
            break;
          }

          for (const backup of backups) {
            const stats = await fs.stat(path.join(backupsDir, backup));
            console.log(`\n${backup}:`);
            console.log(`- Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
            console.log(`- Created: ${stats.birthtime.toLocaleString()}`);
          }
          break;
        }
      }
    }

    console.log(chalk.green('\n✓ Backup and restore operations completed!'));
    console.log(chalk.blue('\nRecommendations:'));
    console.log('1. Regularly schedule automated backups');
    console.log('2. Store backups in a secure location');
    console.log('3. Test restore procedures periodically');
    console.log('4. Monitor backup size and growth');
    console.log('5. Maintain backup retention policy');
  } catch (error) {
    console.error(chalk.red('\nBackup/restore failed:'), error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run backup/restore
backupRestoreDatabase(); 