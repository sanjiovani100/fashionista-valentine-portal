export interface CoreValue {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  social_media: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface MissionVision {
  mission: string;
  vision: string;
}

export interface AboutPageContent {
  id: string;
  title: string;
  description: string;
  content: {
    overview: {
      title: string;
      description: string;
      image_url: string;
    };
  };
  mission_vision: MissionVision;
  core_values: CoreValue[];
  team_members: TeamMember[];
  contact_info: ContactInfo;
  meta_description?: string | null;
  meta_keywords?: string[] | null;
  created_at?: string | null;
  updated_at?: string | null;
}