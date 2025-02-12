import { Migration } from '../utils/database/migrations';
import initialSetup from './20240203_initial_setup';

export const migrations: Migration[] = [
  initialSetup,
];

export function listMigrations(): Migration[] {
  return migrations;
} 


