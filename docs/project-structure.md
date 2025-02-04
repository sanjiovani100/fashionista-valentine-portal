# Project Structure Documentation

## Overview

This document outlines the organization of the project's codebase, explaining the purpose of each directory and the conventions to follow when adding new code.

## Directory Structure

### `src/components/`
Component organization follows a hierarchical structure to maintain clarity and reusability.

- `common/`: Reusable UI components
  - Buttons, inputs, cards, etc.
  - Each component should be self-contained
  - Include component-specific types and tests
  
- `forms/`: Form-related components
  - Form fields, validation displays
  - Form containers and layouts
  
- `layout/`: Layout components
  - Page layouts
  - Navigation components
  - Header/footer components
  
- `features/`: Feature-specific components
  - Components tied to specific business features
  - Organized by feature domain

### `src/hooks/`
Custom React hooks organized by functionality.

- `forms/`: Form-related hooks
  - Form submission
  - Form validation
  - Form state management
  
- `auth/`: Authentication hooks
  - User authentication
  - Permission checking
  - Session management
  
- `data/`: Data fetching hooks
  - API integration
  - Cache management
  - Real-time updates

### `src/lib/`
Core utilities and integrations.

- `database/`: Database utilities
  - Schema management
  - Migrations
  - Query builders
  
- `api/`: API utilities
  - API client configuration
  - Request/response handling
  - Error management
  
- `validation/`: Validation utilities
  - Schema validation
  - Input validation
  - Type guards

### `src/types/`
TypeScript type definitions.

- `database/`: Database-related types
  - Table schemas
  - Query results
  - Database models
  
- `api/`: API-related types
  - Request/response types
  - API client types
  - Error types
  
- `models/`: Domain model types
  - Business logic types
  - Feature-specific types
  - Shared interfaces

### `src/utils/`
Helper functions and utilities.

- `formatting/`: Data formatting utilities
  - Date formatting
  - Number formatting
  - Text formatting
  
- `validation/`: Validation utilities
  - Input validation
  - Data sanitization
  - Type checking
  
- `testing/`: Test utilities
  - Test helpers
  - Mock data generators
  - Test setup utilities

### `src/features/`
Feature modules organized by domain.

- `models/`: Model management feature
  - Model registration
  - Profile management
  - Model search
  
- `events/`: Event management feature
  - Event creation
  - Event scheduling
  - Event registration
  
- `applications/`: Application management feature
  - Application submission
  - Application review
  - Application tracking

## File Naming Conventions

1. **Components**
   - PascalCase for component files: `Button.tsx`
   - Component types in same file: `Button.types.ts`
   - Component tests: `Button.test.tsx`

2. **Hooks**
   - camelCase with 'use' prefix: `useFormSubmission.ts`
   - Hook tests: `useFormSubmission.test.ts`

3. **Utilities**
   - camelCase: `formatDate.ts`
   - Utility tests: `formatDate.test.ts`

4. **Types**
   - PascalCase: `ApiResponse.ts`
   - Type groups: `models.types.ts`

## Import/Export Patterns

1. **Barrel Exports**
   Each directory should have an `index.ts` file that exports its contents:
   ```typescript
   export * from './Button';
   export * from './Input';
   ```

2. **Named Exports**
   Prefer named exports over default exports:
   ```typescript
   export function Button() { ... }
   ```

3. **Type Exports**
   Export types and interfaces separately:
   ```typescript
   export type { ButtonProps } from './Button.types';
   ```

## Best Practices

1. **Component Organization**
   - One component per file
   - Co-locate related files (styles, tests, types)
   - Use index files for cleaner imports

2. **Type Safety**
   - Use TypeScript strictly
   - Define proper interfaces
   - Avoid `any` types
   - Use type guards where necessary

3. **Code Splitting**
   - Lazy load routes
   - Split large components
   - Use dynamic imports for heavy features

4. **Testing**
   - Co-locate tests with components
   - Use testing utilities
   - Maintain test data separately

## Adding New Code

When adding new code:

1. Identify the appropriate directory based on the code's purpose
2. Follow the established naming conventions
3. Create necessary test files
4. Update barrel exports
5. Document any new patterns or utilities

## Build and Deployment

The project uses:
- Vite for development and building
- TypeScript for type checking
- ESLint for code linting
- Prettier for code formatting

## Configuration Files

Important configuration files:
- `vite.config.ts`: Build configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.js`: Linting rules
- `.env`: Environment variables 