import { useState } from 'react';
import { EventDetails } from '../types/event.types';
import { EVENT_DETAILS } from '@/constants/event-content';

export const useEventDetails = () => {
  const [eventDetails] = useState<EventDetails>(EVENT_DETAILS);

  return {
    eventDetails,
  };
};


