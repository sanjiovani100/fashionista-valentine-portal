# Cursor Development Guidelines

## IDE Configuration

### Extensions & Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

## Code Organization

### File Structure
```typescript
// Component file structure
import { dependencies } from '@/lib';
import { types } from '@/types';
import { utils } from '@/utils';

// Types at the top
interface ComponentProps {
  // Props interface
}

// Component implementation
export const Component: React.FC<ComponentProps> = ({ props }) => {
  // Implementation
};
```

### Import Order
1. React and framework imports
2. Third-party libraries
3. Project imports (using @ alias)
4. Component-level imports
5. Style imports

## Cursor-Specific Best Practices

### Code Navigation
- Use `Cmd/Ctrl + Click` for quick navigation
- Utilize breadcrumbs for file hierarchy
- Leverage outline view for component structure
- Use workspace symbols for quick jumps

### Code Generation
- Use snippets for common patterns
- Leverage AI suggestions thoughtfully
- Review and customize generated code
- Document complex generations

### Code Reviews
- Use inline comments for specific feedback
- Leverage diff view for changes
- Use workspace bookmarks for complex reviews
- Document review decisions

## TypeScript Guidelines

### Type Definitions
```typescript
// Use explicit types
type EventStatus = 'draft' | 'published' | 'cancelled';

// Use interfaces for objects
interface Event {
  id: string;
  status: EventStatus;
  // ...other properties
}

// Use generics appropriately
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

### Error Handling
```typescript
// Use custom error classes
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Use try-catch with specific errors
try {
  await processEvent(eventData);
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  } else {
    // Handle other errors
  }
}
```

## Component Development

### Component Structure
```typescript
// Component folder structure
ComponentName/
  ├── index.ts
  ├── ComponentName.tsx
  ├── ComponentName.test.tsx
  ├── ComponentName.styles.ts
  └── types.ts

// Component implementation
import { useState, useEffect } from 'react';
import { styled } from '@/styles';
import { ComponentProps } from './types';

export const ComponentName: React.FC<ComponentProps> = ({ prop }) => {
  // Implementation
};
```

### State Management
```typescript
// Use appropriate hooks
const [state, setState] = useState<StateType>(initialState);

// Use reducers for complex state
const [state, dispatch] = useReducer(reducer, initialState);

// Use context for shared state
const value = useContext(MyContext);
```

## Testing Guidelines

### Test Structure
```typescript
// Test file organization
describe('ComponentName', () => {
  describe('rendering', () => {
    it('should render correctly', () => {
      // Test implementation
    });
  });

  describe('interactions', () => {
    it('should handle user input', () => {
      // Test implementation
    });
  });
});
```

### Test Coverage
- Unit tests for business logic
- Integration tests for components
- E2E tests for critical paths
- Performance tests for optimization

## Documentation

### Code Comments
```typescript
/**
 * Component description
 * @param props - Component props
 * @returns JSX element
 */
export const Component = (props: Props): JSX.Element => {
  // Implementation
};

// Use TODO comments with tickets
// TODO(TICKET-123): Implement feature X
```

### Component Documentation
```typescript
/**
 * @component ComponentName
 * @description Brief description of the component
 * 
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 * 
 * @prop {string} prop - Description of prop
 */
```

## Performance Optimization

### Code Splitting
```typescript
// Use lazy loading for routes
const LazyComponent = lazy(() => import('./Component'));

// Use Suspense boundaries
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### Memoization
```typescript
// Memoize expensive computations
const memoizedValue = useMemo(() => compute(value), [value]);

// Memoize callbacks
const memoizedCallback = useCallback(() => {
  // Implementation
}, [dependencies]);
```

## Error Boundaries

### Implementation
```typescript
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## Accessibility

### Guidelines
- Use semantic HTML
- Implement ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast
- Provide text alternatives

## Version Control

### Commit Messages
```bash
# Format: <type>(<scope>): <description>
feat(auth): implement OAuth2 login
fix(events): resolve date formatting issue
docs(readme): update installation steps
```

### Branch Strategy
```bash
# Feature branches
feature/TICKET-123-feature-name

# Bug fixes
fix/TICKET-123-bug-description

# Releases
release/v1.2.3
```

## Code Review Checklist

### Before Submission
- [ ] Code follows style guide
- [ ] Tests are passing
- [ ] Documentation is updated
- [ ] No console errors
- [ ] Performance is optimized
- [ ] Accessibility is considered

### Review Process
- [ ] Review code changes
- [ ] Test functionality
- [ ] Check performance
- [ ] Verify documentation
- [ ] Validate accessibility
- [ ] Approve or request changes 