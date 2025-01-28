import type { Json } from "./common.types";
import type {
  ApplicationRow,
  DesignerApplicationRow,
  ModelApplicationRow,
  SponsorApplicationRow,
} from "./tables/applications.types";
import type {
  EventContentRow,
  EventTicketRow,
  FashionEventRow,
  FashionImageRow,
} from "./tables/events.types";
import type {
  DesignerProfileRow,
  SponsorProfileRow,
} from "./tables/profiles.types";
import type { EventName, EventSubtype, ImageCategory } from "./enums.types";

export interface DatabaseTables {
  applications: {
    Row: ApplicationRow;
    Insert: Omit<ApplicationRow, "id" | "created_at" | "updated_at" | "status"> & {
      id?: string;
      created_at?: string | null;
      updated_at?: string | null;
      status?: string | null;
    };
    Update: Partial<ApplicationRow>;
    Relationships: [];
  };
  designer_applications: {
    Row: DesignerApplicationRow;
    Insert: Omit<DesignerApplicationRow, "id" | "collection_files"> & {
      id?: string;
      collection_files?: Json | null;
    };
    Update: Partial<DesignerApplicationRow>;
    Relationships: [
      {
        foreignKeyName: "designer_applications_application_id_fkey";
        columns: ["application_id"];
        isOneToOne: true;
        referencedRelation: "applications";
        referencedColumns: ["id"];
      }
    ];
  };
  designer_profiles: {
    Row: DesignerProfileRow;
    Insert: Omit<DesignerProfileRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string | null;
      updated_at?: string | null;
    };
    Update: Partial<DesignerProfileRow>;
    Relationships: [];
  };
  event_content: {
    Row: EventContentRow;
    Insert: Omit<EventContentRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string | null;
      updated_at?: string | null;
    };
    Update: Partial<EventContentRow>;
    Relationships: [
      {
        foreignKeyName: "event_content_event_id_fkey";
        columns: ["event_id"];
        isOneToOne: false;
        referencedRelation: "fashion_events";
        referencedColumns: ["id"];
      }
    ];
  };
  event_tickets: {
    Row: EventTicketRow;
    Insert: Omit<EventTicketRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string | null;
      updated_at?: string | null;
    };
    Update: Partial<EventTicketRow>;
    Relationships: [
      {
        foreignKeyName: "event_tickets_event_id_fkey";
        columns: ["event_id"];
        isOneToOne: false;
        referencedRelation: "fashion_events";
        referencedColumns: ["id"];
      }
    ];
  };
  fashion_events: {
    Row: FashionEventRow;
    Insert: Omit<FashionEventRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string | null;
      updated_at?: string | null;
    };
    Update: Partial<FashionEventRow>;
    Relationships: [];
  };
  fashion_images: {
    Row: FashionImageRow;
    Insert: Omit<FashionImageRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string | null;
      updated_at?: string | null;
    };
    Update: Partial<FashionImageRow>;
    Relationships: [
      {
        foreignKeyName: "fashion_images_event_id_fkey";
        columns: ["event_id"];
        isOneToOne: false;
        referencedRelation: "fashion_events";
        referencedColumns: ["id"];
      }
    ];
  };
  model_applications: {
    Row: ModelApplicationRow;
    Insert: Omit<ModelApplicationRow, "id" | "portfolio_files"> & {
      id?: string;
      portfolio_files?: Json | null;
    };
    Update: Partial<ModelApplicationRow>;
    Relationships: [
      {
        foreignKeyName: "model_applications_application_id_fkey";
        columns: ["application_id"];
        isOneToOne: true;
        referencedRelation: "applications";
        referencedColumns: ["id"];
      }
    ];
  };
  sponsor_applications: {
    Row: SponsorApplicationRow;
    Insert: Omit<SponsorApplicationRow, "id" | "company_files"> & {
      id?: string;
      company_files?: Json | null;
    };
    Update: Partial<SponsorApplicationRow>;
    Relationships: [
      {
        foreignKeyName: "sponsor_applications_application_id_fkey";
        columns: ["application_id"];
        isOneToOne: true;
        referencedRelation: "applications";
        referencedColumns: ["id"];
      }
    ];
  };
  sponsor_profiles: {
    Row: SponsorProfileRow;
    Insert: Omit<SponsorProfileRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string | null;
      updated_at?: string | null;
    };
    Update: Partial<SponsorProfileRow>;
    Relationships: [];
  };
}

export interface DatabaseViews {
  active_fashion_events: {
    Row: {
      capacity: number | null;
      content: Json | null;
      created_at: string | null;
      description: string | null;
      designers: Json | null;
      end_time: string | null;
      id: string | null;
      meta_description: string | null;
      meta_keywords: string[] | null;
      name: EventName | null;
      registration_deadline: string | null;
      start_time: string | null;
      subtype: EventSubtype | null;
      theme: string | null;
      tickets: Json | null;
      title: string | null;
      updated_at: string | null;
      venue: string | null;
    };
    Relationships: [];
  };
}

export interface DatabaseFunctions {
  track_uploaded_image: {
    Args: {
      p_bucket_id: string;
      p_file_path: string;
      p_event_id: string;
      p_category: ImageCategory;
      p_alt_text?: string;
      p_credits?: string;
    };
    Returns: string;
  };
}

export interface DatabaseEnums {
  event_name: EventName;
  event_subtype: EventSubtype;
  image_category: ImageCategory;
}

export type { Json } from "./common.types";
export type { Database } from "./common.types";