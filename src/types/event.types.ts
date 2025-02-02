export type SwimwearEventDetails = {
  id: string;
  event_id: string;
  beach_party_details: {
    time: string;
    location: string;
    features: string[];
    dress_code: string;
  };
  pool_access_info: Record<string, unknown>;
  fitting_sessions: Array<{
    date: string;
    slots: Array<{
      time: string;
      designer: string;
    }>;
    location: string;
  }>;
  beauty_workshops: Array<{
    time: string;
    title: string;
    location: string;
    instructor: string;
    description: string;
  }>;
  created_at: string;
  updated_at: string;
};

export interface FashionEvent {
  id: string;
  name: string;
  subtype: string;
  title: string;
  description: string;
  venue: string;
  capacity: number;
  start_time: string;
  end_time: string;
  registration_deadline: string;
  theme?: string;
  meta_description?: string;
  meta_keywords?: string[];
  created_at?: string;
  updated_at?: string;
  swimwear_specific_requirements?: string;
  venue_features?: string[];
  event_highlights?: string[];
  swimwear_event_details?: SwimwearEventDetails;
}