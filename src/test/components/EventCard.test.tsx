import React from 'react';
import { render, screen } from '@testing-library/react';
import { EventCard } from '@/components/cards/EventCard';
import { BrowserRouter } from 'react-router-dom';

const mockEvent = {
  id: '123',
  title: 'Test Fashion Show',
  description: 'A test fashion show event',
  imageUrl: 'https://example.com/image.jpg',
  venue: 'Test Venue',
  startTime: new Date().toISOString(),
  capacity: 100,
  eventType: 'fashion_show',
  registrationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
};

describe('EventCard', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  test('renders event details correctly', () => {
    renderWithRouter(<EventCard {...mockEvent} />);
    
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.venue)).toBeInTheDocument();
    expect(screen.getByText(`${mockEvent.capacity} attendees`)).toBeInTheDocument();
  });

  test('displays early bird badge when registration deadline is in the future', () => {
    renderWithRouter(<EventCard {...mockEvent} />);
    expect(screen.getByText('Early Bird')).toBeInTheDocument();
  });

  test('formats date correctly', () => {
    renderWithRouter(<EventCard {...mockEvent} />);
    const date = new Date(mockEvent.startTime);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  test('links to correct event details page', () => {
    renderWithRouter(<EventCard {...mockEvent} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/events/${mockEvent.id}`);
  });
}); 


