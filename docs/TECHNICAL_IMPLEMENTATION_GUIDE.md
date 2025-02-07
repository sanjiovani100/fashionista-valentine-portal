# Technical Implementation Guide

## Core Components Implementation

### Event Management Component
```typescript
// src/components/EventManagement/EventManager.tsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Event, EventFilters, PaginationParams } from '@/types';
import { EventService } from '@/services';
import { useErrorBoundary } from '@/hooks';

interface EventManagerProps {
  initialFilters?: EventFilters;
  pageSize?: number;
}

export const EventManager: React.FC<EventManagerProps> = ({
  initialFilters = {},
  pageSize = 10
}) => {
  const [filters, setFilters] = useState<EventFilters>(initialFilters);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['events', filters, pagination],
    queryFn: () => EventService.getEvents(filters, pagination),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  const { mutate: updateEvent } = useMutation({
    mutationFn: EventService.updateEvent,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  // Error handling using custom hook
  useErrorBoundary(error);

  return (
    <div className="event-manager">
      <EventFilters current={filters} onChange={setFilters} />
      <EventList 
        events={data?.events} 
        isLoading={isLoading}
        onUpdate={updateEvent}
      />
      <Pagination
        {...pagination}
        total={data?.total}
        onChange={setPagination}
      />
    </div>
  );
}
```

### Ticket Management System
```typescript
// src/components/TicketManagement/TicketSystem.tsx
import { TicketService, PaymentService } from '@/services';
import { useTicketValidation } from '@/hooks';
import { TicketType, PaymentDetails } from '@/types';

interface TicketSystemProps {
  eventId: string;
  onPurchaseComplete: (ticketId: string) => void;
}

export const TicketSystem: React.FC<TicketSystemProps> = ({
  eventId,
  onPurchaseComplete
}) => {
  const [selectedTickets, setSelectedTickets] = useState<Map<TicketType, number>>(
    new Map()
  );
  
  const { validateTicketSelection } = useTicketValidation();

  const purchaseTickets = async (paymentDetails: PaymentDetails) => {
    try {
      // Validate ticket selection
      validateTicketSelection(selectedTickets);

      // Process payment
      const paymentIntent = await PaymentService.createPaymentIntent({
        tickets: Array.from(selectedTickets.entries()),
        eventId
      });

      // Create tickets
      const tickets = await TicketService.createTickets({
        paymentIntentId: paymentIntent.id,
        tickets: selectedTickets,
        eventId
      });

      onPurchaseComplete(tickets[0].id);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="ticket-system">
      <TicketSelector
        eventId={eventId}
        onSelectionChange={setSelectedTickets}
      />
      <PurchaseForm onSubmit={purchaseTickets} />
    </div>
  );
}
```

## Advanced Features Implementation

### Real-time Updates System
```typescript
// src/services/RealtimeService.ts
import { io, Socket } from 'socket.io-client';
import { EventEmitter } from 'events';

export class RealtimeService extends EventEmitter {
  private socket: Socket;
  private static instance: RealtimeService;

  private constructor() {
    super();
    this.socket = io(process.env.NEXT_PUBLIC_WS_URL, {
      transports: ['websocket'],
      autoConnect: false
    });

    this.setupListeners();
  }

  static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
    }
    return RealtimeService.instance;
  }

  private setupListeners(): void {
    this.socket.on('ticketUpdate', (data) => {
      this.emit('ticketUpdate', data);
    });

    this.socket.on('eventUpdate', (data) => {
      this.emit('eventUpdate', data);
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    });
  }

  connect(userId: string): void {
    this.socket.auth = { userId };
    this.socket.connect();
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  subscribeToEvent(eventId: string): void {
    this.socket.emit('subscribeToEvent', { eventId });
  }

  unsubscribeFromEvent(eventId: string): void {
    this.socket.emit('unsubscribeFromEvent', { eventId });
  }
}
```

### Analytics Integration
```typescript
// src/services/AnalyticsService.ts
import { Analytics } from '@/types';
import { api } from '@/lib/axios';

export class AnalyticsService {
  static async getEventAnalytics(eventId: string, timeRange: TimeRange): Promise<Analytics> {
    const response = await api.get(`/analytics/events/${eventId}`, {
      params: { timeRange }
    });
    return response.data;
  }

  static async getTicketSalesAnalytics(
    eventId: string,
    filters: AnalyticsFilters
  ): Promise<TicketSalesAnalytics> {
    const response = await api.get(`/analytics/ticket-sales/${eventId}`, {
      params: filters
    });
    return response.data;
  }

  static trackEvent(eventName: string, properties: Record<string, any>): void {
    // Integration with analytics provider (e.g., Segment, Mixpanel)
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString()
      });
    }
  }
}
```

## Performance Optimization Examples

### Virtualized List Implementation
```typescript
// src/components/common/VirtualizedList.tsx
import { useVirtual } from '@tanstack/react-virtual';
import { useResizeObserver } from '@/hooks';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
}

export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { height: parentHeight } = useResizeObserver(parentRef);

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: useCallback(() => itemHeight, [itemHeight]),
    overscan: 5
  });

  return (
    <div
      ref={parentRef}
      className="virtualized-list"
      style={{ height: '100%', overflow: 'auto' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${itemHeight}px`,
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            {renderItem(items[virtualRow.index], virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Image Optimization Component
```typescript
// src/components/common/OptimizedImage.tsx
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px 0px'
  });

  const [blurUrl, setBlurUrl] = useState<string | null>(null);

  useEffect(() => {
    if (inView && !blurUrl) {
      generateBlurDataUrl(src).then(setBlurUrl);
    }
  }, [inView, src]);

  return (
    <div
      ref={ref}
      className={`image-wrapper ${isLoaded ? 'loaded' : ''}`}
      style={{ position: 'relative', width, height }}
    >
      {(inView || priority) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          placeholder={blurUrl ? 'blur' : 'empty'}
          blurDataURL={blurUrl || undefined}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};
```

## Testing Examples

### Component Testing
```typescript
// src/components/EventCard/EventCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { EventCard } from './EventCard';
import { mockEvent } from '@/mocks/events';

describe('EventCard', () => {
  it('renders event details correctly', () => {
    render(<EventCard event={mockEvent} />);

    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
    expect(screen.getByText(formatDate(mockEvent.date))).toBeInTheDocument();
  });

  it('handles ticket purchase click', () => {
    const onPurchase = jest.fn();
    render(<EventCard event={mockEvent} onPurchase={onPurchase} />);

    fireEvent.click(screen.getByText(/buy tickets/i));
    expect(onPurchase).toHaveBeenCalledWith(mockEvent.id);
  });

  it('shows sold out state correctly', () => {
    const soldOutEvent = { ...mockEvent, availableTickets: 0 };
    render(<EventCard event={soldOutEvent} />);

    expect(screen.getByText(/sold out/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Integration Testing
```typescript
// src/tests/integration/ticketPurchase.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { TicketPurchaseFlow } from '@/components/TicketPurchase';
import { mockEvent, mockTicketTypes } from '@/mocks';

const server = setupServer(
  rest.get('/api/events/:eventId', (req, res, ctx) => {
    return res(ctx.json(mockEvent));
  }),
  rest.get('/api/events/:eventId/ticket-types', (req, res, ctx) => {
    return res(ctx.json(mockTicketTypes));
  }),
  rest.post('/api/purchases', (req, res, ctx) => {
    return res(ctx.json({ purchaseId: 'mock-purchase-id' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Ticket Purchase Flow', () => {
  it('completes full purchase flow successfully', async () => {
    render(<TicketPurchaseFlow eventId="mock-event-id" />);

    // Wait for event details to load
    await screen.findByText(mockEvent.title);

    // Select tickets
    const ticketInput = screen.getByLabelText(/number of tickets/i);
    fireEvent.change(ticketInput, { target: { value: '2' } });

    // Fill payment details
    fireEvent.change(screen.getByLabelText(/card number/i), {
      target: { value: '4242424242424242' }
    });
    fireEvent.change(screen.getByLabelText(/expiry/i), {
      target: { value: '12/25' }
    });
    fireEvent.change(screen.getByLabelText(/cvc/i), {
      target: { value: '123' }
    });

    // Submit purchase
    fireEvent.click(screen.getByRole('button', { name: /purchase/i }));

    // Verify success
    await waitFor(() => {
      expect(screen.getByText(/purchase successful/i)).toBeInTheDocument();
    });
  });
});
```

## Error Handling and Monitoring

### Error Boundary Implementation
```typescript
// src/components/common/ErrorBoundary.tsx
import React from 'react';
import * as Sentry from '@sentry/react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log to error reporting service
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### API Error Handling
```typescript
// src/lib/api/errorHandler.ts
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'An unexpected error occurred';
    const code = error.response?.data?.code || 'UNKNOWN_ERROR';

    // Show user-friendly error message
    toast.error(message);

    // Log error to monitoring service
    Sentry.captureException(error, {
      extra: {
        status,
        code,
        message
      }
    });

    throw new ApiError(message, status, code);
  }

  throw error;
};
```

## Security Implementation

### Authentication Hook
```typescript
// src/hooks/useAuth.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services';
import { User } from '@/types';

export const useAuth = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: AuthService.getCurrentUser,
    staleTime: Infinity
  });

  const login = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
    }
  });

  const logout = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
    }
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: login.mutate,
    logout: logout.mutate
  };
};
```

### Protected Route Component
```typescript
// src/components/common/ProtectedRoute.tsx
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole
}) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/login?redirect=${router.asPath}`);
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.push('/unauthorized');
    }
  }, [isLoading, user, router, requiredRole]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};
``` 