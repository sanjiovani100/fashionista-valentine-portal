# Use Cases and Implementation Examples

## 1. Event Creation and Management

### Use Case: Creating a New Fashion Show Event
```typescript
// Example: Creating a Valentine's Fashion Show Event
import { EventService } from '@/services';
import { useEventCreation } from '@/hooks';

const createValentinesFashionShow = async () => {
  const event = {
    name: 'valentines_fashion_show',
    title: "Valentine's Fashion Extravaganza 2024",
    description: "Join us for an evening of romantic fashion and luxury designs",
    venue: "Grand Plaza Hotel",
    capacity: 500,
    start_time: "2024-02-14T19:00:00Z",
    end_time: "2024-02-14T22:00:00Z",
    registration_deadline: "2024-02-07T23:59:59Z",
    theme: "Romance in Rouge",
    venue_features: {
      runway_specs: {
        length: "30m",
        width: "5m",
        lighting: "LED programmable"
      },
      seating_layout: {
        vip_seats: 100,
        regular_seats: 400,
        press_area: true
      }
    },
    meta_description: "Valentine's Day Fashion Show featuring top designers",
    meta_keywords: ["valentine", "fashion", "luxury", "runway", "2024"]
  };

  try {
    const createdEvent = await EventService.createEvent(event);
    return createdEvent;
  } catch (error) {
    handleEventCreationError(error);
  }
};

// Usage Example
function EventCreationComponent() {
  const { createEvent, isLoading, error } = useEventCreation();

  const handleSubmit = async (formData) => {
    const result = await createEvent({
      ...formData,
      validation: {
        requireVenue: true,
        requireCapacity: true,
        requireSchedule: true
      }
    });
    
    if (result.success) {
      // Handle success
      notifySuccess("Event created successfully");
      router.push(`/events/${result.eventId}`);
    }
  };

  return (
    <EventForm 
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}
```

### Use Case: Managing Ticket Tiers
```typescript
// Example: Setting up different ticket tiers for an event
const setupTicketTiers = async (eventId: string) => {
  const ticketTiers = [
    {
      type: "vip",
      price: 299.99,
      quantity: 50,
      benefits: [
        "Front row seating",
        "Meet & greet with designers",
        "Exclusive gift bag",
        "Access to after-party"
      ],
      early_bird_price: 249.99,
      early_bird_deadline: "2024-01-14T23:59:59Z"
    },
    {
      type: "premium",
      price: 199.99,
      quantity: 150,
      benefits: [
        "Priority seating",
        "Complimentary drinks",
        "Event program"
      ],
      group_discount_threshold: 5,
      group_discount_percentage: 15
    },
    {
      type: "standard",
      price: 99.99,
      quantity: 300,
      benefits: [
        "General admission",
        "Event program"
      ]
    }
  ];

  return await Promise.all(
    ticketTiers.map(tier => 
      TicketService.createTicketTier(eventId, tier)
    )
  );
};
```

## 2. User Registration and Authentication

### Use Case: User Registration Flow
```typescript
// Example: Complete registration flow with validation
interface RegistrationData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
  };
}

const useRegistration = () => {
  const [step, setStep] = useState<'details' | 'verification' | 'preferences'>('details');
  
  const registerUser = async (data: RegistrationData) => {
    try {
      // 1. Validate email uniqueness
      const isEmailAvailable = await AuthService.checkEmailAvailability(data.email);
      if (!isEmailAvailable) {
        throw new Error('Email already in use');
      }

      // 2. Create user account
      const user = await AuthService.register(data);

      // 3. Send verification email
      await AuthService.sendVerificationEmail(user.email);

      // 4. Create user preferences
      if (data.preferences) {
        await UserService.setPreferences(user.id, data.preferences);
      }

      return user;
    } catch (error) {
      handleRegistrationError(error);
    }
  };

  return {
    step,
    setStep,
    registerUser
  };
};

// Usage Example
function RegistrationForm() {
  const { registerUser, step, setStep } = useRegistration();
  const form = useForm<RegistrationData>();

  const onSubmit = async (data: RegistrationData) => {
    try {
      const user = await registerUser(data);
      showSuccessMessage('Registration successful!');
      router.push('/verify-email');
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      {step === 'details' && <UserDetailsStep form={form} />}
      {step === 'verification' && <VerificationStep form={form} />}
      {step === 'preferences' && <PreferencesStep form={form} />}
    </Form>
  );
}
```

## 3. Ticket Purchase Flow

### Use Case: Complete Ticket Purchase Process
```typescript
// Example: Multi-step ticket purchase with validation and payment
interface PurchaseContext {
  eventId: string;
  tickets: TicketSelection[];
  attendees: AttendeeInfo[];
  paymentMethod: PaymentMethod;
}

const useTicketPurchase = (eventId: string) => {
  const [context, setContext] = useState<PurchaseContext>({
    eventId,
    tickets: [],
    attendees: [],
    paymentMethod: null
  });

  const validateAvailability = async (tickets: TicketSelection[]) => {
    const availability = await TicketService.checkAvailability(
      eventId,
      tickets
    );
    
    if (!availability.available) {
      throw new Error('Selected tickets are no longer available');
    }
    
    return availability;
  };

  const processPayment = async (paymentDetails: PaymentDetails) => {
    // 1. Create payment intent
    const paymentIntent = await PaymentService.createIntent({
      amount: calculateTotal(context.tickets),
      currency: 'usd',
      payment_method: context.paymentMethod
    });

    // 2. Process payment
    const payment = await PaymentService.processPayment(paymentIntent.id);

    // 3. Create tickets
    const tickets = await TicketService.createTickets({
      eventId,
      tickets: context.tickets,
      attendees: context.attendees,
      paymentId: payment.id
    });

    // 4. Send confirmation emails
    await NotificationService.sendTicketConfirmation({
      tickets,
      recipients: context.attendees.map(a => a.email)
    });

    return tickets;
  };

  return {
    context,
    setContext,
    validateAvailability,
    processPayment
  };
};

// Usage Example
function TicketPurchaseFlow() {
  const { context, processPayment } = useTicketPurchase(eventId);
  const [step, setStep] = useState<PurchaseStep>('selection');

  const handlePurchase = async () => {
    try {
      // Show loading state
      setIsProcessing(true);

      // Process payment
      const tickets = await processPayment(paymentDetails);

      // Show success
      showSuccessMessage('Purchase successful!');
      
      // Navigate to tickets page
      router.push(`/tickets/${tickets[0].id}`);
    } catch (error) {
      handlePurchaseError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="purchase-flow">
      <PurchaseSteps currentStep={step} />
      
      {step === 'selection' && (
        <TicketSelection 
          event={event}
          onSelect={(tickets) => {
            setContext(prev => ({ ...prev, tickets }));
            setStep('details');
          }}
        />
      )}
      
      {step === 'details' && (
        <AttendeeDetails
          tickets={context.tickets}
          onSubmit={(attendees) => {
            setContext(prev => ({ ...prev, attendees }));
            setStep('payment');
          }}
        />
      )}
      
      {step === 'payment' && (
        <PaymentForm
          amount={calculateTotal(context.tickets)}
          onSubmit={handlePurchase}
        />
      )}
    </div>
  );
}
```

## 4. Real-time Event Updates

### Use Case: Live Ticket Availability Updates
```typescript
// Example: Real-time ticket availability monitoring
const useTicketAvailability = (eventId: string) => {
  const [availability, setAvailability] = useState<TicketAvailability>({});
  const realtimeService = useRef(RealtimeService.getInstance());

  useEffect(() => {
    // Initial fetch
    fetchAvailability();

    // Subscribe to updates
    realtimeService.current.subscribeToEvent(eventId);
    
    // Listen for updates
    const handleUpdate = (data: TicketUpdateData) => {
      if (data.eventId === eventId) {
        setAvailability(prev => ({
          ...prev,
          [data.ticketType]: data.available
        }));
      }
    };

    realtimeService.current.on('ticketUpdate', handleUpdate);

    return () => {
      realtimeService.current.off('ticketUpdate', handleUpdate);
      realtimeService.current.unsubscribeFromEvent(eventId);
    };
  }, [eventId]);

  const fetchAvailability = async () => {
    const data = await TicketService.getAvailability(eventId);
    setAvailability(data);
  };

  return {
    availability,
    refresh: fetchAvailability
  };
};

// Usage Example
function TicketAvailabilityDisplay({ eventId }: { eventId: string }) {
  const { availability } = useTicketAvailability(eventId);

  return (
    <div className="availability-display">
      {Object.entries(availability).map(([type, count]) => (
        <div key={type} className="ticket-type">
          <span>{type}</span>
          <span className={count < 10 ? 'low-availability' : ''}>
            {count} tickets remaining
          </span>
        </div>
      ))}
    </div>
  );
}
```

## 5. Analytics and Reporting

### Use Case: Event Performance Dashboard
```typescript
// Example: Comprehensive event analytics dashboard
const useEventAnalytics = (eventId: string) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [metrics, setMetrics] = useState<EventMetrics | null>(null);

  const fetchMetrics = async () => {
    const data = await Promise.all([
      AnalyticsService.getTicketSales(eventId, timeRange),
      AnalyticsService.getVisitorStats(eventId, timeRange),
      AnalyticsService.getConversionRates(eventId, timeRange)
    ]);

    setMetrics({
      sales: data[0],
      visitors: data[1],
      conversion: data[2]
    });
  };

  useEffect(() => {
    fetchMetrics();
  }, [eventId, timeRange]);

  return {
    metrics,
    timeRange,
    setTimeRange,
    refresh: fetchMetrics
  };
};

// Usage Example
function EventAnalyticsDashboard({ eventId }: { eventId: string }) {
  const { metrics, timeRange, setTimeRange } = useEventAnalytics(eventId);

  if (!metrics) return <LoadingSpinner />;

  return (
    <div className="analytics-dashboard">
      <TimeRangeSelector
        value={timeRange}
        onChange={setTimeRange}
      />
      
      <div className="metrics-grid">
        <SalesMetrics data={metrics.sales} />
        <VisitorMetrics data={metrics.visitors} />
        <ConversionMetrics data={metrics.conversion} />
      </div>

      <div className="charts">
        <SalesChart data={metrics.sales.history} />
        <VisitorChart data={metrics.visitors.history} />
      </div>
    </div>
  );
}
```

Each of these use cases includes:
- Complete implementation details
- Error handling
- Real-world scenarios
- TypeScript types and interfaces
- Component integration examples
- Best practices for state management
- API integration patterns
- Real-time updates where applicable

Would you like me to:
1. Add more specific use cases?
2. Expand on any particular implementation?
3. Add more error handling scenarios?
4. Include additional integration examples? 