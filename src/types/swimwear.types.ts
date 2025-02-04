import type { Json } from './database';

export interface SwimwearEventDetails {
  id: string;
  event_id: string;
  beach_party_details: {
    location: string;
    time: string;
    activities: string[];
    amenities: string[];
  };
  pool_access_info: {
    hours: string;
    restrictions: string[];
    facilities: string[];
  };
  fitting_sessions: Array<{
    date: string;
    time: string;
    location: string;
    designer: string;
  }>;
  beauty_workshops: Array<{
    title: string;
    instructor: string;
    description: string;
    time: string;
    location: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface SwimwearEvent {
  id: string;
  title: string;
  description: string;
  venue: string;
  start_time: string;
  end_time: string;
  registration_deadline: string;
  capacity: number;
  theme: string;
  details: SwimwearEventDetails;
}