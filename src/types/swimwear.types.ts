import type { Json } from './database';

export interface SwimwearEventDetails {
  id: string;
  event_id: string | null;
  beach_party_details: {
    location: string;
    time: string;
    activities: string[];
    amenities: string[];
  } | null;
  pool_access_info: {
    hours: string;
    restrictions: string[];
    facilities: string[];
  } | null;
  fitting_sessions: Array<{
    date: string;
    time: string;
    location: string;
    designer: string;
  }> | null;
  beauty_workshops: Array<{
    title: string;
    instructor: string;
    description: string;
    time: string;
    location: string;
  }> | null;
  created_at: string | null;
  updated_at: string | null;
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
  theme: string | null;
  details: SwimwearEventDetails;
}