export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about_page_content: {
        Row: {
          content: Json
          created_at: string | null
          description: string
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: Json
          created_at?: string | null
          description: string
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          description?: string
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          created_at: string | null
          email: string
          experience: string
          first_name: string
          id: string
          last_name: string
          phone: string
          reference_info: string | null
          role: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          experience: string
          first_name: string
          id?: string
          last_name: string
          phone: string
          reference_info?: string | null
          role: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          experience?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          reference_info?: string | null
          role?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      designer_applications: {
        Row: {
          application_id: string
          brand_name: string
          collection_description: string
          collection_files: Json | null
          id: string
          max_collection_files: number | null
          max_file_size_mb: number | null
          number_of_pieces: number
          space_requirements: string
          website: string | null
        }
        Insert: {
          application_id: string
          brand_name: string
          collection_description: string
          collection_files?: Json | null
          id?: string
          max_collection_files?: number | null
          max_file_size_mb?: number | null
          number_of_pieces: number
          space_requirements: string
          website?: string | null
        }
        Update: {
          application_id?: string
          brand_name?: string
          collection_description?: string
          collection_files?: Json | null
          id?: string
          max_collection_files?: number | null
          max_file_size_mb?: number | null
          number_of_pieces?: number
          space_requirements?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "designer_applications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      designer_profiles: {
        Row: {
          achievements: string[] | null
          bio: string
          brand_name: string
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          designer_name: string
          id: string
          social_media: Json | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          achievements?: string[] | null
          bio: string
          brand_name: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          designer_name: string
          id?: string
          social_media?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          achievements?: string[] | null
          bio?: string
          brand_name?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          designer_name?: string
          id?: string
          social_media?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      event_content: {
        Row: {
          content: string
          content_type: string
          created_at: string | null
          engagement_metrics: Json | null
          event_id: string | null
          id: string
          media_urls: string[] | null
          publish_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string | null
          engagement_metrics?: Json | null
          event_id?: string | null
          id?: string
          media_urls?: string[] | null
          publish_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string | null
          engagement_metrics?: Json | null
          event_id?: string | null
          id?: string
          media_urls?: string[] | null
          publish_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_content_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "active_fashion_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_content_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "fashion_events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_content_backup_20240128: {
        Row: {
          content: string | null
          content_type: string | null
          created_at: string | null
          engagement_metrics: Json | null
          event_id: string | null
          id: string | null
          media_urls: string[] | null
          publish_date: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          content_type?: string | null
          created_at?: string | null
          engagement_metrics?: Json | null
          event_id?: string | null
          id?: string | null
          media_urls?: string[] | null
          publish_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          content_type?: string | null
          created_at?: string | null
          engagement_metrics?: Json | null
          event_id?: string | null
          id?: string | null
          media_urls?: string[] | null
          publish_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      event_tickets: {
        Row: {
          benefits: string[] | null
          created_at: string | null
          early_bird_deadline: string | null
          early_bird_price: number | null
          event_id: string | null
          group_discount_percentage: number | null
          group_discount_threshold: number | null
          id: string
          price: number
          quantity_available: number
          ticket_type: string
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string | null
          early_bird_deadline?: string | null
          early_bird_price?: number | null
          event_id?: string | null
          group_discount_percentage?: number | null
          group_discount_threshold?: number | null
          id?: string
          price: number
          quantity_available: number
          ticket_type: string
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          created_at?: string | null
          early_bird_deadline?: string | null
          early_bird_price?: number | null
          event_id?: string | null
          group_discount_percentage?: number | null
          group_discount_threshold?: number | null
          id?: string
          price?: number
          quantity_available?: number
          ticket_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "active_fashion_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "fashion_events"
            referencedColumns: ["id"]
          },
        ]
      }
      fashion_collections: {
        Row: {
          collection_name: string
          created_at: string | null
          description: string
          designer_id: string | null
          event_id: string | null
          id: string
          piece_count: number
          sustainability_info: string | null
          technical_requirements: string | null
          updated_at: string | null
        }
        Insert: {
          collection_name: string
          created_at?: string | null
          description: string
          designer_id?: string | null
          event_id?: string | null
          id?: string
          piece_count: number
          sustainability_info?: string | null
          technical_requirements?: string | null
          updated_at?: string | null
        }
        Update: {
          collection_name?: string
          created_at?: string | null
          description?: string
          designer_id?: string | null
          event_id?: string | null
          id?: string
          piece_count?: number
          sustainability_info?: string | null
          technical_requirements?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fashion_collections_designer_id_fkey"
            columns: ["designer_id"]
            isOneToOne: false
            referencedRelation: "designer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fashion_collections_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "active_fashion_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fashion_collections_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "fashion_events"
            referencedColumns: ["id"]
          },
        ]
      }
      fashion_events: {
        Row: {
          capacity: number
          created_at: string | null
          description: string
          end_time: string
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          name: Database["public"]["Enums"]["event_name"]
          registration_deadline: string
          start_time: string
          subtype: Database["public"]["Enums"]["event_subtype"]
          theme: string | null
          title: string
          updated_at: string | null
          venue: string
        }
        Insert: {
          capacity: number
          created_at?: string | null
          description: string
          end_time: string
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          name: Database["public"]["Enums"]["event_name"]
          registration_deadline: string
          start_time: string
          subtype: Database["public"]["Enums"]["event_subtype"]
          theme?: string | null
          title: string
          updated_at?: string | null
          venue: string
        }
        Update: {
          capacity?: number
          created_at?: string | null
          description?: string
          end_time?: string
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          name?: Database["public"]["Enums"]["event_name"]
          registration_deadline?: string
          start_time?: string
          subtype?: Database["public"]["Enums"]["event_subtype"]
          theme?: string | null
          title?: string
          updated_at?: string | null
          venue?: string
        }
        Relationships: []
      }
      fashion_images: {
        Row: {
          alt_text: string
          category: Database["public"]["Enums"]["image_category"]
          created_at: string | null
          credits: string | null
          description: string | null
          dimensions: Json | null
          event_id: string | null
          formats: Json | null
          id: string
          metadata: Json | null
          thumbnail_url: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          alt_text: string
          category: Database["public"]["Enums"]["image_category"]
          created_at?: string | null
          credits?: string | null
          description?: string | null
          dimensions?: Json | null
          event_id?: string | null
          formats?: Json | null
          id?: string
          metadata?: Json | null
          thumbnail_url?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          alt_text?: string
          category?: Database["public"]["Enums"]["image_category"]
          created_at?: string | null
          credits?: string | null
          description?: string | null
          dimensions?: Json | null
          event_id?: string | null
          formats?: Json | null
          id?: string
          metadata?: Json | null
          thumbnail_url?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "fashion_images_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "active_fashion_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fashion_images_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "fashion_events"
            referencedColumns: ["id"]
          },
        ]
      }
      model_applications: {
        Row: {
          application_id: string
          bust: number
          height: number
          id: string
          instagram_handle: string | null
          max_file_size_mb: number | null
          max_portfolio_files: number | null
          portfolio_files: Json | null
          portfolio_link: string | null
          waist: number
        }
        Insert: {
          application_id: string
          bust: number
          height: number
          id?: string
          instagram_handle?: string | null
          max_file_size_mb?: number | null
          max_portfolio_files?: number | null
          portfolio_files?: Json | null
          portfolio_link?: string | null
          waist: number
        }
        Update: {
          application_id?: string
          bust?: number
          height?: number
          id?: string
          instagram_handle?: string | null
          max_file_size_mb?: number | null
          max_portfolio_files?: number | null
          portfolio_files?: Json | null
          portfolio_link?: string | null
          waist?: number
        }
        Relationships: [
          {
            foreignKeyName: "model_applications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsor_applications: {
        Row: {
          application_id: string
          company_description: string
          company_files: Json | null
          company_name: string
          id: string
          industry: string
          marketing_goals: string
          max_company_files: number | null
          max_file_size_mb: number | null
          partnership_preferences: string
        }
        Insert: {
          application_id: string
          company_description: string
          company_files?: Json | null
          company_name: string
          id?: string
          industry: string
          marketing_goals: string
          max_company_files?: number | null
          max_file_size_mb?: number | null
          partnership_preferences: string
        }
        Update: {
          application_id?: string
          company_description?: string
          company_files?: Json | null
          company_name?: string
          id?: string
          industry?: string
          marketing_goals?: string
          max_company_files?: number | null
          max_file_size_mb?: number | null
          partnership_preferences?: string
        }
        Relationships: [
          {
            foreignKeyName: "sponsor_applications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsor_profiles: {
        Row: {
          company_name: string
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          description: string
          id: string
          logo_url: string | null
          marketing_materials: Json | null
          sponsorship_level: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company_name: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          description: string
          id?: string
          logo_url?: string | null
          marketing_materials?: Json | null
          sponsorship_level: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          description?: string
          id?: string
          logo_url?: string | null
          marketing_materials?: Json | null
          sponsorship_level?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      active_fashion_events: {
        Row: {
          capacity: number | null
          content: Json | null
          created_at: string | null
          description: string | null
          designers: Json | null
          end_time: string | null
          id: string | null
          meta_description: string | null
          meta_keywords: string[] | null
          name: Database["public"]["Enums"]["event_name"] | null
          registration_deadline: string | null
          start_time: string | null
          subtype: Database["public"]["Enums"]["event_subtype"] | null
          theme: string | null
          tickets: Json | null
          title: string | null
          updated_at: string | null
          venue: string | null
        }
        Relationships: []
      }
      untracked_storage_files: {
        Row: {
          bucket_name: string | null
          created_at: string | null
          file_path: string | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      track_uploaded_image: {
        Args: {
          p_bucket_id: string
          p_file_path: string
          p_event_id: string
          p_category: Database["public"]["Enums"]["image_category"]
          p_alt_text?: string
          p_credits?: string
        }
        Returns: string
      }
    }
    Enums: {
      event_image_category:
        | "event_hero"
        | "event_gallery"
        | "backstage"
        | "designer_profile"
        | "model_profile"
        | "promotional"
        | "press_kit"
      event_name:
        | "valentines_fashion_show"
        | "spring_fling_fashion_show"
        | "summer_splash_fashion_show"
        | "fall_fantasy_fashion_show"
        | "swim_paradise_show"
      event_subtype:
        | "main_show"
        | "vip_session"
        | "workshop"
        | "networking"
        | "photo_session"
        | "after_party"
      image_category:
        | "event_hero"
        | "event_gallery"
        | "backstage"
        | "designer_profile"
        | "model_profile"
        | "promotional"
        | "press_kit"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
