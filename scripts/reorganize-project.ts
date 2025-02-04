import { promises as fs } from 'fs';
import { join, dirname } from 'path';

interface FileMove {
  from: string;
  to: string;
}

const PROJECT_ROOT = process.cwd();
const SRC_DIR = join(PROJECT_ROOT, 'src');

// Directory structure definition
const DIRECTORIES = [
  // Components
  'src/components/common',
  'src/components/forms',
  'src/components/layout',
  'src/components/features',
  
  // Hooks
  'src/hooks/forms',
  'src/hooks/auth',
  'src/hooks/data',
  
  // Library
  'src/lib/database',
  'src/lib/api',
  'src/lib/validation',
  
  // Types
  'src/types/database',
  'src/types/api',
  'src/types/models',
  
  // Utils
  'src/utils/formatting',
  'src/utils/validation',
  'src/utils/testing',
  
  // Features
  'src/features/models',
  'src/features/events',
  'src/features/applications',
  
  // Config and constants
  'src/config',
  'src/constants',
];

// File moves definition
const FILE_MOVES: FileMove[] = [
  // Database files
  {
    from: 'src/lib/database/schema.ts',
    to: 'src/types/database/schema.ts',
  },
  {
    from: 'src/lib/database/migrations.ts',
    to: 'src/lib/database/migrations/index.ts',
  },
  
  // Hook files
  {
    from: 'src/hooks/useFormSubmission.ts',
    to: 'src/hooks/forms/useFormSubmission.ts',
  },
  {
    from: 'src/hooks/useFormValidation.ts',
    to: 'src/hooks/forms/useFormValidation.ts',
  },
  {
    from: 'src/hooks/useFormError.ts',
    to: 'src/hooks/forms/useFormError.ts',
  },
  
  // Type files
  {
    from: 'src/types/models.ts',
    to: 'src/types/models/index.ts',
  },
  {
    from: 'src/types/api/responses.ts',
    to: 'src/types/api/responses/index.ts',
  },
];

async function createDirectories() {
  for (const dir of DIRECTORIES) {
    const fullPath = join(PROJECT_ROOT, dir);
    await fs.mkdir(fullPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

async function moveFiles() {
  for (const move of FILE_MOVES) {
    const fromPath = join(PROJECT_ROOT, move.from);
    const toPath = join(PROJECT_ROOT, move.to);
    
    try {
      // Create target directory if it doesn't exist
      await fs.mkdir(dirname(toPath), { recursive: true });
      
      // Move file
      await fs.rename(fromPath, toPath);
      console.log(`Moved: ${move.from} -> ${move.to}`);
    } catch (error) {
      console.error(`Error moving ${move.from}:`, error);
    }
  }
}

async function createIndexFiles() {
  for (const dir of DIRECTORIES) {
    const indexPath = join(PROJECT_ROOT, dir, 'index.ts');
    try {
      await fs.writeFile(indexPath, '// Export all components/utilities from this directory\n');
      console.log(`Created index file: ${dir}/index.ts`);
    } catch (error) {
      console.error(`Error creating index file for ${dir}:`, error);
    }
  }
}

async function updateImports() {
  // This would need to be implemented to update import paths in all files
  console.log('Note: You will need to update import paths manually or use a codemod');
}

async function main() {
  try {
    console.log('Starting project reorganization...');
    
    // Create new directory structure
    await createDirectories();
    
    // Move files to new locations
    await moveFiles();
    
    // Create index files
    await createIndexFiles();
    
    console.log('\nProject reorganization completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update import paths in your files');
    console.log('2. Update build configuration if needed');
    console.log('3. Run tests to ensure everything works');
    console.log('4. Commit changes to version control');
  } catch (error) {
    console.error('Error during reorganization:', error);
  }
}

main(); 