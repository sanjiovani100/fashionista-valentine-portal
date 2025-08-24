export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          company_id: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          direction: string | null
          duration_minutes: number | null
          event_id: string | null
          id: string
          opportunity_id: string | null
          organization_id: string
          outcome: string | null
          owner_id: string | null
          payload: Json | null
          scheduled_at: string | null
          subject: string
          type: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: string | null
          id?: string
          opportunity_id?: string | null
          organization_id: string
          outcome?: string | null
          owner_id?: string | null
          payload?: Json | null
          scheduled_at?: string | null
          subject: string
          type: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: string | null
          id?: string
          opportunity_id?: string | null
          organization_id?: string
          outcome?: string | null
          owner_id?: string | null
          payload?: Json | null
          scheduled_at?: string | null
          subject?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "activities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "activities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      activities_2025_01: {
        Row: {
          company_id: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          direction: string | null
          duration_minutes: number | null
          event_id: string | null
          id: string
          opportunity_id: string | null
          organization_id: string
          outcome: string | null
          owner_id: string | null
          payload: Json | null
          scheduled_at: string | null
          subject: string
          type: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: string | null
          id?: string
          opportunity_id?: string | null
          organization_id: string
          outcome?: string | null
          owner_id?: string | null
          payload?: Json | null
          scheduled_at?: string | null
          subject: string
          type: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: string | null
          id?: string
          opportunity_id?: string | null
          organization_id?: string
          outcome?: string | null
          owner_id?: string | null
          payload?: Json | null
          scheduled_at?: string | null
          subject?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      activities_2025_02: {
        Row: {
          company_id: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          direction: string | null
          duration_minutes: number | null
          event_id: string | null
          id: string
          opportunity_id: string | null
          organization_id: string
          outcome: string | null
          owner_id: string | null
          payload: Json | null
          scheduled_at: string | null
          subject: string
          type: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: string | null
          id?: string
          opportunity_id?: string | null
          organization_id: string
          outcome?: string | null
          owner_id?: string | null
          payload?: Json | null
          scheduled_at?: string | null
          subject: string
          type: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: string | null
          id?: string
          opportunity_id?: string | null
          organization_id?: string
          outcome?: string | null
          owner_id?: string | null
          payload?: Json | null
          scheduled_at?: string | null
          subject?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      activities_2025_03: {
        Row: {
          company_id: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          direction: string | null
          duration_minutes: number | null
          event_id: string | null
          id: string
          opportunity_id: string | null
          organization_id: string
          outcome: string | null
          owner_id: string | null
          payload: Json | null
          scheduled_at: string | null
          subject: string
          type: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: string | null
          id?: string
          opportunity_id?: string | null
          organization_id: string
          outcome?: string | null
          owner_id?: string | null
          payload?: Json | null
          scheduled_at?: string | null
          subject: string
          type: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: string | null
          id?: string
          opportunity_id?: string | null
          organization_id?: string
          outcome?: string | null
          owner_id?: string | null
          payload?: Json | null
          scheduled_at?: string | null
          subject?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      api_rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          identifier: string
          identifier_type: string
          request_count: number | null
          window_start: string
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          identifier: string
          identifier_type: string
          request_count?: number | null
          window_start: string
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          identifier?: string
          identifier_type?: string
          request_count?: number | null
          window_start?: string
        }
        Relationships: []
      }
      attendee_experiences: {
        Row: {
          accessibility_needs: string[] | null
          app_version: string | null
          attendee_id: string
          badge_scans: Json | null
          connections_made: number | null
          created_at: string | null
          device_type: string | null
          dietary_preferences: string[] | null
          digital_badge_id: string | null
          event_id: string
          id: string
          journey_stage: string | null
          language_preference: string | null
          metadata: Json | null
          opt_in_notifications: boolean | null
          preferred_channel: string | null
          registration_id: string | null
          satisfaction_score: number | null
          sessions_attended: Json | null
          updated_at: string | null
        }
        Insert: {
          accessibility_needs?: string[] | null
          app_version?: string | null
          attendee_id: string
          badge_scans?: Json | null
          connections_made?: number | null
          created_at?: string | null
          device_type?: string | null
          dietary_preferences?: string[] | null
          digital_badge_id?: string | null
          event_id: string
          id?: string
          journey_stage?: string | null
          language_preference?: string | null
          metadata?: Json | null
          opt_in_notifications?: boolean | null
          preferred_channel?: string | null
          registration_id?: string | null
          satisfaction_score?: number | null
          sessions_attended?: Json | null
          updated_at?: string | null
        }
        Update: {
          accessibility_needs?: string[] | null
          app_version?: string | null
          attendee_id?: string
          badge_scans?: Json | null
          connections_made?: number | null
          created_at?: string | null
          device_type?: string | null
          dietary_preferences?: string[] | null
          digital_badge_id?: string | null
          event_id?: string
          id?: string
          journey_stage?: string | null
          language_preference?: string | null
          metadata?: Json | null
          opt_in_notifications?: boolean | null
          preferred_channel?: string | null
          registration_id?: string | null
          satisfaction_score?: number | null
          sessions_attended?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendee_experiences_attendee_id_fkey"
            columns: ["attendee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendee_experiences_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendee_experiences_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "attendee_experiences_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          organization_id: string | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          organization_id?: string | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          organization_id?: string | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_channel_event_associations: {
        Row: {
          calendar_channel_id: string
          calendar_event_id: string
          created_at: string | null
          event_external_id: string
          external_event_id: string
          id: string
          updated_at: string | null
        }
        Insert: {
          calendar_channel_id: string
          calendar_event_id: string
          created_at?: string | null
          event_external_id: string
          external_event_id: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          calendar_channel_id?: string
          calendar_event_id?: string
          created_at?: string | null
          event_external_id?: string
          external_event_id?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_channel_event_associations_calendar_channel_id_fkey"
            columns: ["calendar_channel_id"]
            isOneToOne: false
            referencedRelation: "calendar_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_channel_event_associations_calendar_event_id_fkey"
            columns: ["calendar_event_id"]
            isOneToOne: false
            referencedRelation: "calendar_events"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_channels: {
        Row: {
          connected_account_id: string
          contact_auto_creation_policy: string | null
          created_at: string | null
          handle: string
          id: string
          is_contact_auto_creation_enabled: boolean | null
          is_sync_enabled: boolean | null
          last_sync_history_event_received: string | null
          sync_cursor: string | null
          sync_stage: string | null
          sync_status: string | null
          throttle_failure_count: number | null
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          connected_account_id: string
          contact_auto_creation_policy?: string | null
          created_at?: string | null
          handle: string
          id?: string
          is_contact_auto_creation_enabled?: boolean | null
          is_sync_enabled?: boolean | null
          last_sync_history_event_received?: string | null
          sync_cursor?: string | null
          sync_stage?: string | null
          sync_status?: string | null
          throttle_failure_count?: number | null
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          connected_account_id?: string
          contact_auto_creation_policy?: string | null
          created_at?: string | null
          handle?: string
          id?: string
          is_contact_auto_creation_enabled?: boolean | null
          is_sync_enabled?: boolean | null
          last_sync_history_event_received?: string | null
          sync_cursor?: string | null
          sync_stage?: string | null
          sync_status?: string | null
          throttle_failure_count?: number | null
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_channels_connected_account_id_fkey"
            columns: ["connected_account_id"]
            isOneToOne: false
            referencedRelation: "connected_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_event_participants: {
        Row: {
          calendar_event_id: string
          comment: string | null
          contact_id: string | null
          created_at: string | null
          display_name: string | null
          handle: string
          id: string
          is_organizer: boolean | null
          responded_at: string | null
          response_status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          calendar_event_id: string
          comment?: string | null
          contact_id?: string | null
          created_at?: string | null
          display_name?: string | null
          handle: string
          id?: string
          is_organizer?: boolean | null
          responded_at?: string | null
          response_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          calendar_event_id?: string
          comment?: string | null
          contact_id?: string | null
          created_at?: string | null
          display_name?: string | null
          handle?: string
          id?: string
          is_organizer?: boolean | null
          responded_at?: string | null
          response_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_event_participants_calendar_event_id_fkey"
            columns: ["calendar_event_id"]
            isOneToOne: false
            referencedRelation: "calendar_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_event_participants_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_event_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          conference_id: string | null
          conference_link_label: string | null
          conference_phone: string | null
          conference_solution: string | null
          conference_url: string | null
          created_at: string | null
          created_by: string
          custom_fields: Json | null
          deleted_at: string | null
          description: string | null
          ends_at: string
          event_id: string | null
          external_created_at: string | null
          external_updated_at: string | null
          ical_uid: string | null
          id: string
          is_canceled: boolean | null
          is_full_day: boolean | null
          location: string | null
          organization_id: string
          organizer_id: string
          recurring_event_id: string | null
          reminders: Json | null
          starts_at: string
          timezone: string | null
          title: string
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          conference_id?: string | null
          conference_link_label?: string | null
          conference_phone?: string | null
          conference_solution?: string | null
          conference_url?: string | null
          created_at?: string | null
          created_by: string
          custom_fields?: Json | null
          deleted_at?: string | null
          description?: string | null
          ends_at: string
          event_id?: string | null
          external_created_at?: string | null
          external_updated_at?: string | null
          ical_uid?: string | null
          id?: string
          is_canceled?: boolean | null
          is_full_day?: boolean | null
          location?: string | null
          organization_id: string
          organizer_id: string
          recurring_event_id?: string | null
          reminders?: Json | null
          starts_at: string
          timezone?: string | null
          title?: string
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          conference_id?: string | null
          conference_link_label?: string | null
          conference_phone?: string | null
          conference_solution?: string | null
          conference_url?: string | null
          created_at?: string | null
          created_by?: string
          custom_fields?: Json | null
          deleted_at?: string | null
          description?: string | null
          ends_at?: string
          event_id?: string | null
          external_created_at?: string | null
          external_updated_at?: string | null
          ical_uid?: string | null
          id?: string
          is_canceled?: boolean | null
          is_full_day?: boolean | null
          location?: string | null
          organization_id?: string
          organizer_id?: string
          recurring_event_id?: string | null
          reminders?: Json | null
          starts_at?: string
          timezone?: string | null
          title?: string
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "calendar_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "calendar_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          account_score: number | null
          account_status: string | null
          address: string | null
          annual_revenue: number | null
          brand_colors: Json | null
          city: string | null
          company_type: string[] | null
          country: string | null
          created_at: string | null
          currency: string | null
          custom_fields: Json | null
          deleted_at: string | null
          domain: string | null
          email: string | null
          employees_count: number | null
          facebook_url: string | null
          id: string
          ideal_customer_profile: boolean | null
          industry: string | null
          instagram_url: string | null
          legal_name: string | null
          linkedin_url: string | null
          logo_url: string | null
          name: string
          organization_id: string
          owner_id: string | null
          parent_company_id: string | null
          phone: string | null
          postal_code: string | null
          size: string | null
          state: string | null
          tags: string[] | null
          tax_id: string | null
          twitter_handle: string | null
          updated_at: string | null
          website: string | null
          xtwitter_url: string | null
          youtube_url: string | null
        }
        Insert: {
          account_score?: number | null
          account_status?: string | null
          address?: string | null
          annual_revenue?: number | null
          brand_colors?: Json | null
          city?: string | null
          company_type?: string[] | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          deleted_at?: string | null
          domain?: string | null
          email?: string | null
          employees_count?: number | null
          facebook_url?: string | null
          id?: string
          ideal_customer_profile?: boolean | null
          industry?: string | null
          instagram_url?: string | null
          legal_name?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          name: string
          organization_id: string
          owner_id?: string | null
          parent_company_id?: string | null
          phone?: string | null
          postal_code?: string | null
          size?: string | null
          state?: string | null
          tags?: string[] | null
          tax_id?: string | null
          twitter_handle?: string | null
          updated_at?: string | null
          website?: string | null
          xtwitter_url?: string | null
          youtube_url?: string | null
        }
        Update: {
          account_score?: number | null
          account_status?: string | null
          address?: string | null
          annual_revenue?: number | null
          brand_colors?: Json | null
          city?: string | null
          company_type?: string[] | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          deleted_at?: string | null
          domain?: string | null
          email?: string | null
          employees_count?: number | null
          facebook_url?: string | null
          id?: string
          ideal_customer_profile?: boolean | null
          industry?: string | null
          instagram_url?: string | null
          legal_name?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          name?: string
          organization_id?: string
          owner_id?: string | null
          parent_company_id?: string | null
          phone?: string | null
          postal_code?: string | null
          size?: string | null
          state?: string | null
          tags?: string[] | null
          tax_id?: string | null
          twitter_handle?: string | null
          updated_at?: string | null
          website?: string | null
          xtwitter_url?: string | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "companies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_parent_company_id_fkey"
            columns: ["parent_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      connected_accounts: {
        Row: {
          access_token: string | null
          created_at: string | null
          email: string
          handle: string | null
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          provider: string
          provider_account_id: string
          refresh_token: string | null
          scope: string | null
          sync_error: string | null
          sync_status: string | null
          token_expires_at: string | null
          token_type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          email: string
          handle?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          provider: string
          provider_account_id: string
          refresh_token?: string | null
          scope?: string | null
          sync_error?: string | null
          sync_status?: string | null
          token_expires_at?: string | null
          token_type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          email?: string
          handle?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          provider?: string
          provider_account_id?: string
          refresh_token?: string | null
          scope?: string | null
          sync_error?: string | null
          sync_status?: string | null
          token_expires_at?: string | null
          token_type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connected_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          address_city: string | null
          address_country: string | null
          address_postal_code: string | null
          address_state: string | null
          address_street: string | null
          avatar_url: string | null
          birth_date: string | null
          communication_preferences: Json | null
          company_id: string | null
          contact_type: string[] | null
          created_at: string | null
          custom_fields: Json | null
          deleted_at: string | null
          deleted_by: string | null
          department: string | null
          email: string
          first_name: string
          id: string
          is_deleted: boolean | null
          job_title: string | null
          last_activity_at: string | null
          last_name: string
          lead_score: number | null
          lifecycle_stage: string | null
          linkedin_url: string | null
          mobile: string | null
          notes: string | null
          organization_id: string
          owner_id: string | null
          phone: string | null
          preferred_language: string | null
          social_profiles: Json | null
          tags: string[] | null
          updated_at: string | null
          work_phone: string | null
        }
        Insert: {
          address_city?: string | null
          address_country?: string | null
          address_postal_code?: string | null
          address_state?: string | null
          address_street?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          communication_preferences?: Json | null
          company_id?: string | null
          contact_type?: string[] | null
          created_at?: string | null
          custom_fields?: Json | null
          deleted_at?: string | null
          deleted_by?: string | null
          department?: string | null
          email: string
          first_name: string
          id?: string
          is_deleted?: boolean | null
          job_title?: string | null
          last_activity_at?: string | null
          last_name: string
          lead_score?: number | null
          lifecycle_stage?: string | null
          linkedin_url?: string | null
          mobile?: string | null
          notes?: string | null
          organization_id: string
          owner_id?: string | null
          phone?: string | null
          preferred_language?: string | null
          social_profiles?: Json | null
          tags?: string[] | null
          updated_at?: string | null
          work_phone?: string | null
        }
        Update: {
          address_city?: string | null
          address_country?: string | null
          address_postal_code?: string | null
          address_state?: string | null
          address_street?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          communication_preferences?: Json | null
          company_id?: string | null
          contact_type?: string[] | null
          created_at?: string | null
          custom_fields?: Json | null
          deleted_at?: string | null
          deleted_by?: string | null
          department?: string | null
          email?: string
          first_name?: string
          id?: string
          is_deleted?: boolean | null
          job_title?: string | null
          last_activity_at?: string | null
          last_name?: string
          lead_score?: number | null
          lifecycle_stage?: string | null
          linkedin_url?: string | null
          mobile?: string | null
          notes?: string | null
          organization_id?: string
          owner_id?: string | null
          phone?: string | null
          preferred_language?: string | null
          social_profiles?: Json | null
          tags?: string[] | null
          updated_at?: string | null
          work_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contacttags: {
        Row: {
          contact_id: string
          created_at: string | null
          created_by: string | null
          id: string
          tag_id: string
          updated_at: string | null
        }
        Insert: {
          contact_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          tag_id: string
          updated_at?: string | null
        }
        Update: {
          contact_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          tag_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacttags_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacttags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      dealtags: {
        Row: {
          created_at: string | null
          created_by: string | null
          deal_id: string
          id: string
          tag_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deal_id: string
          id?: string
          tag_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deal_id?: string
          id?: string
          tag_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dealtags_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dealtags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body_html: string | null
          body_text: string | null
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          event_type: string | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          name: string
          subject: string
          times_used: number | null
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          body_html?: string | null
          body_text?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          event_type?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name: string
          subject: string
          times_used?: number | null
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          body_html?: string | null
          body_text?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          event_type?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name?: string
          subject?: string
          times_used?: number | null
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      equipment_bookings: {
        Row: {
          actual_return: string | null
          booked_by: string
          booked_from: string
          booked_until: string
          booking_cost: number | null
          booking_status: string | null
          checked_out_at: string | null
          created_at: string | null
          equipment_id: string
          event_id: string
          id: string
          location: string | null
          notes: string | null
          purpose: string | null
          responsible_person: string | null
          updated_at: string | null
        }
        Insert: {
          actual_return?: string | null
          booked_by: string
          booked_from: string
          booked_until: string
          booking_cost?: number | null
          booking_status?: string | null
          checked_out_at?: string | null
          created_at?: string | null
          equipment_id: string
          event_id: string
          id?: string
          location?: string | null
          notes?: string | null
          purpose?: string | null
          responsible_person?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_return?: string | null
          booked_by?: string
          booked_from?: string
          booked_until?: string
          booking_cost?: number | null
          booking_status?: string | null
          checked_out_at?: string | null
          created_at?: string | null
          equipment_id?: string
          event_id?: string
          id?: string
          location?: string | null
          notes?: string | null
          purpose?: string | null
          responsible_person?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_bookings_booked_by_fkey"
            columns: ["booked_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_bookings_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment_inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "equipment_bookings_responsible_person_fkey"
            columns: ["responsible_person"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_inventory: {
        Row: {
          brand: string | null
          condition: string | null
          created_at: string | null
          current_location: string | null
          daily_rate: number | null
          equipment_name: string
          equipment_type: string
          hourly_rate: number | null
          id: string
          images: Json | null
          is_bookable: boolean | null
          last_maintenance_date: string | null
          manual_url: string | null
          metadata: Json | null
          model: string | null
          next_maintenance_due: string | null
          notes: string | null
          organization_id: string
          serial_number: string | null
          status: string | null
          storage_location: string
          updated_at: string | null
        }
        Insert: {
          brand?: string | null
          condition?: string | null
          created_at?: string | null
          current_location?: string | null
          daily_rate?: number | null
          equipment_name: string
          equipment_type: string
          hourly_rate?: number | null
          id?: string
          images?: Json | null
          is_bookable?: boolean | null
          last_maintenance_date?: string | null
          manual_url?: string | null
          metadata?: Json | null
          model?: string | null
          next_maintenance_due?: string | null
          notes?: string | null
          organization_id: string
          serial_number?: string | null
          status?: string | null
          storage_location: string
          updated_at?: string | null
        }
        Update: {
          brand?: string | null
          condition?: string | null
          created_at?: string | null
          current_location?: string | null
          daily_rate?: number | null
          equipment_name?: string
          equipment_type?: string
          hourly_rate?: number | null
          id?: string
          images?: Json | null
          is_bookable?: boolean | null
          last_maintenance_date?: string | null
          manual_url?: string | null
          metadata?: Json | null
          model?: string | null
          next_maintenance_due?: string | null
          notes?: string | null
          organization_id?: string
          serial_number?: string | null
          status?: string | null
          storage_location?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_inventory_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "equipment_inventory_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      error_logs: {
        Row: {
          context: Json | null
          created_at: string | null
          endpoint: string | null
          error_message: string
          error_stack: string | null
          error_type: string
          http_method: string | null
          id: string
          ip_address: unknown | null
          organization_id: string | null
          request_id: string | null
          status_code: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          endpoint?: string | null
          error_message: string
          error_stack?: string | null
          error_type: string
          http_method?: string | null
          id?: string
          ip_address?: unknown | null
          organization_id?: string | null
          request_id?: string | null
          status_code?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          endpoint?: string | null
          error_message?: string
          error_stack?: string | null
          error_type?: string
          http_method?: string | null
          id?: string
          ip_address?: unknown | null
          organization_id?: string | null
          request_id?: string | null
          status_code?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "error_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "error_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "error_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_analytics: {
        Row: {
          created_at: string | null
          data_source: string | null
          dimensions: Json | null
          event_id: string
          granularity: string | null
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
          previous_period_value: number | null
          target_value: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data_source?: string | null
          dimensions?: Json | null
          event_id: string
          granularity?: string | null
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
          previous_period_value?: number | null
          target_value?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data_source?: string | null
          dimensions?: Json | null
          event_id?: string
          granularity?: string | null
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          period_end?: string
          period_start?: string
          previous_period_value?: number | null
          target_value?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_analytics_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_analytics_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
        ]
      }
      event_budgets: {
        Row: {
          actual_amount: number | null
          approved_at: string | null
          approved_by: string | null
          budgeted_amount: number
          category: string
          committed_amount: number | null
          created_at: string | null
          event_id: string
          id: string
          invoice_number: string | null
          line_item: string
          metadata: Json | null
          notes: string | null
          paid_amount: number | null
          payment_due_date: string | null
          payment_method: string | null
          requires_approval: boolean | null
          subcategory: string | null
          updated_at: string | null
          variance_amount: number | null
          variance_percentage: number | null
          vendor_id: string | null
        }
        Insert: {
          actual_amount?: number | null
          approved_at?: string | null
          approved_by?: string | null
          budgeted_amount?: number
          category: string
          committed_amount?: number | null
          created_at?: string | null
          event_id: string
          id?: string
          invoice_number?: string | null
          line_item: string
          metadata?: Json | null
          notes?: string | null
          paid_amount?: number | null
          payment_due_date?: string | null
          payment_method?: string | null
          requires_approval?: boolean | null
          subcategory?: string | null
          updated_at?: string | null
          variance_amount?: number | null
          variance_percentage?: number | null
          vendor_id?: string | null
        }
        Update: {
          actual_amount?: number | null
          approved_at?: string | null
          approved_by?: string | null
          budgeted_amount?: number
          category?: string
          committed_amount?: number | null
          created_at?: string | null
          event_id?: string
          id?: string
          invoice_number?: string | null
          line_item?: string
          metadata?: Json | null
          notes?: string | null
          paid_amount?: number | null
          payment_due_date?: string | null
          payment_method?: string | null
          requires_approval?: boolean | null
          subcategory?: string | null
          updated_at?: string | null
          variance_amount?: number | null
          variance_percentage?: number | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_budgets_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_budgets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_budgets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
        ]
      }
      event_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "event_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      event_communication_logs: {
        Row: {
          chat_id: string | null
          created_at: string | null
          direction: string
          event_id: string | null
          id: string
          media_type: string | null
          media_url: string | null
          message_content: string | null
          message_id: string
          message_type: string
          phone_number: string | null
          processed: boolean | null
          response: string | null
          timestamp_event: string | null
          updated_at: string | null
          user_id: string | null
          webhook_data: Json | null
        }
        Insert: {
          chat_id?: string | null
          created_at?: string | null
          direction: string
          event_id?: string | null
          id?: string
          media_type?: string | null
          media_url?: string | null
          message_content?: string | null
          message_id: string
          message_type: string
          phone_number?: string | null
          processed?: boolean | null
          response?: string | null
          timestamp_event?: string | null
          updated_at?: string | null
          user_id?: string | null
          webhook_data?: Json | null
        }
        Update: {
          chat_id?: string | null
          created_at?: string | null
          direction?: string
          event_id?: string | null
          id?: string
          media_type?: string | null
          media_url?: string | null
          message_content?: string | null
          message_id?: string
          message_type?: string
          phone_number?: string | null
          processed?: boolean | null
          response?: string | null
          timestamp_event?: string | null
          updated_at?: string | null
          user_id?: string | null
          webhook_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "event_communication_logs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_communication_logs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_communication_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_communications: {
        Row: {
          attachments: Json | null
          category: string | null
          clicked_count: number | null
          communication_type: string
          content: string
          created_at: string | null
          created_by: string
          delivered_count: number | null
          delivery_rate: number | null
          delivery_status: string | null
          escalation_level: number | null
          event_id: string
          id: string
          legacy_source_id: string | null
          legacy_source_table: string | null
          message_category: string | null
          metadata: Json | null
          opened_count: number | null
          purpose: string
          recipient_count: number
          recipient_list: Json | null
          recipient_type: string
          reminder_offset: unknown | null
          reminder_status: string | null
          reminder_time: string | null
          reminder_type: string | null
          response_received_count: number | null
          scheduled_for: string | null
          sent_at: string | null
          sent_count: number | null
          specific_user_id: string | null
          subject: string | null
          target_audience: string | null
          template_used: string | null
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          category?: string | null
          clicked_count?: number | null
          communication_type: string
          content: string
          created_at?: string | null
          created_by: string
          delivered_count?: number | null
          delivery_rate?: number | null
          delivery_status?: string | null
          escalation_level?: number | null
          event_id: string
          id?: string
          legacy_source_id?: string | null
          legacy_source_table?: string | null
          message_category?: string | null
          metadata?: Json | null
          opened_count?: number | null
          purpose: string
          recipient_count?: number
          recipient_list?: Json | null
          recipient_type: string
          reminder_offset?: unknown | null
          reminder_status?: string | null
          reminder_time?: string | null
          reminder_type?: string | null
          response_received_count?: number | null
          scheduled_for?: string | null
          sent_at?: string | null
          sent_count?: number | null
          specific_user_id?: string | null
          subject?: string | null
          target_audience?: string | null
          template_used?: string | null
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          category?: string | null
          clicked_count?: number | null
          communication_type?: string
          content?: string
          created_at?: string | null
          created_by?: string
          delivered_count?: number | null
          delivery_rate?: number | null
          delivery_status?: string | null
          escalation_level?: number | null
          event_id?: string
          id?: string
          legacy_source_id?: string | null
          legacy_source_table?: string | null
          message_category?: string | null
          metadata?: Json | null
          opened_count?: number | null
          purpose?: string
          recipient_count?: number
          recipient_list?: Json | null
          recipient_type?: string
          reminder_offset?: unknown | null
          reminder_status?: string | null
          reminder_time?: string | null
          reminder_type?: string | null
          response_received_count?: number | null
          scheduled_for?: string | null
          sent_at?: string | null
          sent_count?: number | null
          specific_user_id?: string | null
          subject?: string | null
          target_audience?: string | null
          template_used?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_communications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_communications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_communications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_communications_specific_user_id_fkey"
            columns: ["specific_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_documents: {
        Row: {
          access_level: string | null
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          description: string | null
          document_name: string
          document_type: string
          event_id: string
          file_size_bytes: number | null
          file_type: string | null
          file_url: string
          id: string
          is_latest: boolean | null
          metadata: Json | null
          previous_version_id: string | null
          requires_approval: boolean | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
          uploaded_by: string
          valid_from: string | null
          valid_until: string | null
          version: number | null
        }
        Insert: {
          access_level?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          description?: string | null
          document_name: string
          document_type: string
          event_id: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          is_latest?: boolean | null
          metadata?: Json | null
          previous_version_id?: string | null
          requires_approval?: boolean | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uploaded_by: string
          valid_from?: string | null
          valid_until?: string | null
          version?: number | null
        }
        Update: {
          access_level?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          description?: string | null
          document_name?: string
          document_type?: string
          event_id?: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          is_latest?: boolean | null
          metadata?: Json | null
          previous_version_id?: string | null
          requires_approval?: boolean | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uploaded_by?: string
          valid_from?: string | null
          valid_until?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_documents_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_documents_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_documents_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_documents_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "event_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_feedback: {
        Row: {
          check_in_experience: string | null
          content_rating: number | null
          created_at: string | null
          event_id: string
          feedback_source: string | null
          id: string
          liked_least: string | null
          liked_most: string | null
          metadata: Json | null
          organization_rating: number | null
          overall_rating: number
          recommend_likelihood: number | null
          registration_experience: string | null
          respondent_id: string | null
          respondent_type: string
          return_likelihood: number | null
          submitted_at: string | null
          suggestions: string | null
          updated_at: string | null
          value_rating: number | null
          venue_rating: number | null
        }
        Insert: {
          check_in_experience?: string | null
          content_rating?: number | null
          created_at?: string | null
          event_id: string
          feedback_source?: string | null
          id?: string
          liked_least?: string | null
          liked_most?: string | null
          metadata?: Json | null
          organization_rating?: number | null
          overall_rating: number
          recommend_likelihood?: number | null
          registration_experience?: string | null
          respondent_id?: string | null
          respondent_type: string
          return_likelihood?: number | null
          submitted_at?: string | null
          suggestions?: string | null
          updated_at?: string | null
          value_rating?: number | null
          venue_rating?: number | null
        }
        Update: {
          check_in_experience?: string | null
          content_rating?: number | null
          created_at?: string | null
          event_id?: string
          feedback_source?: string | null
          id?: string
          liked_least?: string | null
          liked_most?: string | null
          metadata?: Json | null
          organization_rating?: number | null
          overall_rating?: number
          recommend_likelihood?: number | null
          registration_experience?: string | null
          respondent_id?: string | null
          respondent_type?: string
          return_likelihood?: number | null
          submitted_at?: string | null
          suggestions?: string | null
          updated_at?: string | null
          value_rating?: number | null
          venue_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_feedback_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_feedback_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_feedback_respondent_id_fkey"
            columns: ["respondent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_kpis: {
        Row: {
          achievement_percentage: number | null
          actual_value: number | null
          created_at: string | null
          description: string | null
          event_id: string
          id: string
          kpi_category: string
          kpi_name: string
          measured_at: string | null
          measurement_unit: string
          owner_id: string | null
          performance_status: string | null
          target_value: number
          updated_at: string | null
        }
        Insert: {
          achievement_percentage?: number | null
          actual_value?: number | null
          created_at?: string | null
          description?: string | null
          event_id: string
          id?: string
          kpi_category: string
          kpi_name: string
          measured_at?: string | null
          measurement_unit: string
          owner_id?: string | null
          performance_status?: string | null
          target_value: number
          updated_at?: string | null
        }
        Update: {
          achievement_percentage?: number | null
          actual_value?: number | null
          created_at?: string | null
          description?: string | null
          event_id?: string
          id?: string
          kpi_category?: string
          kpi_name?: string
          measured_at?: string | null
          measurement_unit?: string
          owner_id?: string | null
          performance_status?: string | null
          target_value?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_kpis_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_kpis_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_kpis_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_logistics: {
        Row: {
          actual_arrival_time: string | null
          actual_completion_time: string | null
          actual_cost: number | null
          contact_person: string
          contact_phone: string
          created_at: string | null
          delay_reason: string | null
          delivery_location: string
          description: string
          estimated_cost: number | null
          event_id: string
          id: string
          item_count: number | null
          item_type: string
          notes: string | null
          pickup_location: string | null
          priority: string | null
          scheduled_date: string
          scheduled_time: string
          status: string | null
          tracking_number: string | null
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          actual_arrival_time?: string | null
          actual_completion_time?: string | null
          actual_cost?: number | null
          contact_person: string
          contact_phone: string
          created_at?: string | null
          delay_reason?: string | null
          delivery_location: string
          description: string
          estimated_cost?: number | null
          event_id: string
          id?: string
          item_count?: number | null
          item_type: string
          notes?: string | null
          pickup_location?: string | null
          priority?: string | null
          scheduled_date: string
          scheduled_time: string
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          actual_arrival_time?: string | null
          actual_completion_time?: string | null
          actual_cost?: number | null
          contact_person?: string
          contact_phone?: string
          created_at?: string | null
          delay_reason?: string | null
          delivery_location?: string
          description?: string
          estimated_cost?: number | null
          event_id?: string
          id?: string
          item_count?: number | null
          item_type?: string
          notes?: string | null
          pickup_location?: string | null
          priority?: string | null
          scheduled_date?: string
          scheduled_time?: string
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_logistics_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_logistics_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_logistics_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      event_marketing_campaigns: {
        Row: {
          ab_test_variants: Json | null
          actual_end_date: string | null
          actual_start_date: string | null
          ad_spend: number | null
          brand_mentions: number | null
          campaign_insights: string | null
          campaign_manager_id: string | null
          campaign_name: string
          campaign_objective: string
          campaign_type: string | null
          campaign_urls: string[] | null
          click_through_rate: number | null
          comments_count: number | null
          content_themes: string[] | null
          conversion_rate: number | null
          cost_per_acquisition: number | null
          cost_per_click: number | null
          cost_per_impression: number | null
          created_at: string | null
          creative_assets: Json | null
          email_click_rate: number | null
          email_list_growth: number | null
          email_open_rate: number | null
          end_date: string
          engagement_rate: number | null
          estimated_reach: number | null
          event_id: string
          hashtags: string[] | null
          id: string
          impressions: number | null
          influencer_total_reach: number | null
          influencers_count: number | null
          key_messages: string[] | null
          landing_page_url: string | null
          launch_date: string
          leads_generated: number | null
          lessons_learned: string | null
          likes_count: number | null
          marketing_channels: string[]
          organization_id: string
          primary_platforms: string[] | null
          progress_percentage: number | null
          reach: number | null
          recommendations: string | null
          return_on_investment: number | null
          revenue_generated: number | null
          saves_count: number | null
          shares_count: number | null
          spent_budget: number | null
          status: string | null
          target_demographics: Json | null
          target_interests: string[] | null
          target_locations: string[] | null
          team_members: Json | null
          tickets_sold: number | null
          total_budget: number
          updated_at: string | null
          user_generated_content_count: number | null
          visual_style_guide: string | null
          winning_variant: string | null
        }
        Insert: {
          ab_test_variants?: Json | null
          actual_end_date?: string | null
          actual_start_date?: string | null
          ad_spend?: number | null
          brand_mentions?: number | null
          campaign_insights?: string | null
          campaign_manager_id?: string | null
          campaign_name: string
          campaign_objective: string
          campaign_type?: string | null
          campaign_urls?: string[] | null
          click_through_rate?: number | null
          comments_count?: number | null
          content_themes?: string[] | null
          conversion_rate?: number | null
          cost_per_acquisition?: number | null
          cost_per_click?: number | null
          cost_per_impression?: number | null
          created_at?: string | null
          creative_assets?: Json | null
          email_click_rate?: number | null
          email_list_growth?: number | null
          email_open_rate?: number | null
          end_date: string
          engagement_rate?: number | null
          estimated_reach?: number | null
          event_id: string
          hashtags?: string[] | null
          id?: string
          impressions?: number | null
          influencer_total_reach?: number | null
          influencers_count?: number | null
          key_messages?: string[] | null
          landing_page_url?: string | null
          launch_date: string
          leads_generated?: number | null
          lessons_learned?: string | null
          likes_count?: number | null
          marketing_channels: string[]
          organization_id: string
          primary_platforms?: string[] | null
          progress_percentage?: number | null
          reach?: number | null
          recommendations?: string | null
          return_on_investment?: number | null
          revenue_generated?: number | null
          saves_count?: number | null
          shares_count?: number | null
          spent_budget?: number | null
          status?: string | null
          target_demographics?: Json | null
          target_interests?: string[] | null
          target_locations?: string[] | null
          team_members?: Json | null
          tickets_sold?: number | null
          total_budget: number
          updated_at?: string | null
          user_generated_content_count?: number | null
          visual_style_guide?: string | null
          winning_variant?: string | null
        }
        Update: {
          ab_test_variants?: Json | null
          actual_end_date?: string | null
          actual_start_date?: string | null
          ad_spend?: number | null
          brand_mentions?: number | null
          campaign_insights?: string | null
          campaign_manager_id?: string | null
          campaign_name?: string
          campaign_objective?: string
          campaign_type?: string | null
          campaign_urls?: string[] | null
          click_through_rate?: number | null
          comments_count?: number | null
          content_themes?: string[] | null
          conversion_rate?: number | null
          cost_per_acquisition?: number | null
          cost_per_click?: number | null
          cost_per_impression?: number | null
          created_at?: string | null
          creative_assets?: Json | null
          email_click_rate?: number | null
          email_list_growth?: number | null
          email_open_rate?: number | null
          end_date?: string
          engagement_rate?: number | null
          estimated_reach?: number | null
          event_id?: string
          hashtags?: string[] | null
          id?: string
          impressions?: number | null
          influencer_total_reach?: number | null
          influencers_count?: number | null
          key_messages?: string[] | null
          landing_page_url?: string | null
          launch_date?: string
          leads_generated?: number | null
          lessons_learned?: string | null
          likes_count?: number | null
          marketing_channels?: string[]
          organization_id?: string
          primary_platforms?: string[] | null
          progress_percentage?: number | null
          reach?: number | null
          recommendations?: string | null
          return_on_investment?: number | null
          revenue_generated?: number | null
          saves_count?: number | null
          shares_count?: number | null
          spent_budget?: number | null
          status?: string | null
          target_demographics?: Json | null
          target_interests?: string[] | null
          target_locations?: string[] | null
          team_members?: Json | null
          tickets_sold?: number | null
          total_budget?: number
          updated_at?: string | null
          user_generated_content_count?: number | null
          visual_style_guide?: string | null
          winning_variant?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_marketing_campaigns_campaign_manager_id_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_marketing_campaigns_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_marketing_campaigns_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_marketing_campaigns_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "event_marketing_campaigns_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      event_planning: {
        Row: {
          actual_end_date: string | null
          actual_start_date: string | null
          approved_budget: number | null
          completion_percentage: number | null
          created_at: string | null
          deliverables: Json | null
          equipment_requirements: Json | null
          estimated_budget: number | null
          event_id: string
          id: string
          identified_risks: Json | null
          lessons_learned: string | null
          meeting_schedule: Json | null
          milestones: Json | null
          mitigation_strategies: Json | null
          overall_status: string | null
          phase: string
          phase_end_date: string
          phase_notes: string | null
          phase_start_date: string
          phase_status: string | null
          project_manager_id: string | null
          spent_budget: number | null
          staffing_requirements: Json | null
          stakeholder_updates: Json | null
          team_members: Json | null
          updated_at: string | null
          vendor_requirements: Json | null
          venue_requirements: Json | null
        }
        Insert: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          approved_budget?: number | null
          completion_percentage?: number | null
          created_at?: string | null
          deliverables?: Json | null
          equipment_requirements?: Json | null
          estimated_budget?: number | null
          event_id: string
          id?: string
          identified_risks?: Json | null
          lessons_learned?: string | null
          meeting_schedule?: Json | null
          milestones?: Json | null
          mitigation_strategies?: Json | null
          overall_status?: string | null
          phase: string
          phase_end_date: string
          phase_notes?: string | null
          phase_start_date: string
          phase_status?: string | null
          project_manager_id?: string | null
          spent_budget?: number | null
          staffing_requirements?: Json | null
          stakeholder_updates?: Json | null
          team_members?: Json | null
          updated_at?: string | null
          vendor_requirements?: Json | null
          venue_requirements?: Json | null
        }
        Update: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          approved_budget?: number | null
          completion_percentage?: number | null
          created_at?: string | null
          deliverables?: Json | null
          equipment_requirements?: Json | null
          estimated_budget?: number | null
          event_id?: string
          id?: string
          identified_risks?: Json | null
          lessons_learned?: string | null
          meeting_schedule?: Json | null
          milestones?: Json | null
          mitigation_strategies?: Json | null
          overall_status?: string | null
          phase?: string
          phase_end_date?: string
          phase_notes?: string | null
          phase_start_date?: string
          phase_status?: string | null
          project_manager_id?: string | null
          spent_budget?: number | null
          staffing_requirements?: Json | null
          stakeholder_updates?: Json | null
          team_members?: Json | null
          updated_at?: string | null
          vendor_requirements?: Json | null
          venue_requirements?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "event_planning_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_planning_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_planning_project_manager_id_fkey"
            columns: ["project_manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_risks: {
        Row: {
          contingency_plan: string | null
          created_at: string | null
          created_by: string
          description: string
          event_id: string
          id: string
          identified_date: string | null
          impact: string
          incident_date: string | null
          incident_impact: string | null
          incident_occurred: boolean | null
          likelihood: string
          mitigation_cost: number | null
          mitigation_strategy: string
          potential_loss: number | null
          resolution_deadline: string | null
          review_date: string | null
          risk_category: string
          risk_name: string
          risk_owner_id: string | null
          risk_score: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          contingency_plan?: string | null
          created_at?: string | null
          created_by: string
          description: string
          event_id: string
          id?: string
          identified_date?: string | null
          impact: string
          incident_date?: string | null
          incident_impact?: string | null
          incident_occurred?: boolean | null
          likelihood: string
          mitigation_cost?: number | null
          mitigation_strategy: string
          potential_loss?: number | null
          resolution_deadline?: string | null
          review_date?: string | null
          risk_category: string
          risk_name: string
          risk_owner_id?: string | null
          risk_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          contingency_plan?: string | null
          created_at?: string | null
          created_by?: string
          description?: string
          event_id?: string
          id?: string
          identified_date?: string | null
          impact?: string
          incident_date?: string | null
          incident_impact?: string | null
          incident_occurred?: boolean | null
          likelihood?: string
          mitigation_cost?: number | null
          mitigation_strategy?: string
          potential_loss?: number | null
          resolution_deadline?: string | null
          review_date?: string | null
          risk_category?: string
          risk_name?: string
          risk_owner_id?: string | null
          risk_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_risks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_risks_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_risks_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_risks_risk_owner_id_fkey"
            columns: ["risk_owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_roi: {
        Row: {
          actual_attendance: number | null
          analysis_notes: string | null
          calculated_by: string | null
          calculation_status: string | null
          created_at: string | null
          equipment_costs: number | null
          event_id: string
          id: string
          marketing_costs: number | null
          other_costs: number | null
          other_revenue: number | null
          sponsorship_revenue: number | null
          staffing_costs: number | null
          ticket_revenue: number | null
          updated_at: string | null
          vendor_fees: number | null
          venue_costs: number | null
        }
        Insert: {
          actual_attendance?: number | null
          analysis_notes?: string | null
          calculated_by?: string | null
          calculation_status?: string | null
          created_at?: string | null
          equipment_costs?: number | null
          event_id: string
          id?: string
          marketing_costs?: number | null
          other_costs?: number | null
          other_revenue?: number | null
          sponsorship_revenue?: number | null
          staffing_costs?: number | null
          ticket_revenue?: number | null
          updated_at?: string | null
          vendor_fees?: number | null
          venue_costs?: number | null
        }
        Update: {
          actual_attendance?: number | null
          analysis_notes?: string | null
          calculated_by?: string | null
          calculation_status?: string | null
          created_at?: string | null
          equipment_costs?: number | null
          event_id?: string
          id?: string
          marketing_costs?: number | null
          other_costs?: number | null
          other_revenue?: number | null
          sponsorship_revenue?: number | null
          staffing_costs?: number | null
          ticket_revenue?: number | null
          updated_at?: string | null
          vendor_fees?: number | null
          venue_costs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_roi_calculated_by_fkey"
            columns: ["calculated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_roi_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_roi_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
        ]
      }
      event_schedules: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          created_at: string | null
          depends_on: string | null
          description: string | null
          duration_minutes: number | null
          event_id: string
          id: string
          internal_notes: string | null
          item_name: string
          item_type: string
          location: string | null
          metadata: Json | null
          public_notes: string | null
          responsible_team_id: string | null
          responsible_user_id: string | null
          scheduled_end: string
          scheduled_start: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          created_at?: string | null
          depends_on?: string | null
          description?: string | null
          duration_minutes?: number | null
          event_id: string
          id?: string
          internal_notes?: string | null
          item_name: string
          item_type: string
          location?: string | null
          metadata?: Json | null
          public_notes?: string | null
          responsible_team_id?: string | null
          responsible_user_id?: string | null
          scheduled_end: string
          scheduled_start: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          created_at?: string | null
          depends_on?: string | null
          description?: string | null
          duration_minutes?: number | null
          event_id?: string
          id?: string
          internal_notes?: string | null
          item_name?: string
          item_type?: string
          location?: string | null
          metadata?: Json | null
          public_notes?: string | null
          responsible_team_id?: string | null
          responsible_user_id?: string | null
          scheduled_end?: string
          scheduled_start?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_schedules_depends_on_fkey"
            columns: ["depends_on"]
            isOneToOne: false
            referencedRelation: "event_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_schedules_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_schedules_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_schedules_responsible_user_id_fkey"
            columns: ["responsible_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_sponsors: {
        Row: {
          amount_paid: number | null
          benefits: Json | null
          booth_number: string | null
          booth_size: string | null
          booth_visitors: number | null
          complimentary_tickets: number | null
          contract_signed_date: string | null
          contract_status: string | null
          contract_url: string | null
          created_at: string | null
          discount_percentage: number | null
          event_id: string
          id: string
          in_kind_value: number | null
          leads_collected: number | null
          logo_placements: string[] | null
          metadata: Json | null
          payment_due_date: string | null
          payment_status: string | null
          roi_percentage: number | null
          satisfaction_score: number | null
          speaking_slots: number | null
          sponsor_id: string
          sponsorship_amount: number
          sponsorship_tier: string
          testimonial: string | null
          updated_at: string | null
        }
        Insert: {
          amount_paid?: number | null
          benefits?: Json | null
          booth_number?: string | null
          booth_size?: string | null
          booth_visitors?: number | null
          complimentary_tickets?: number | null
          contract_signed_date?: string | null
          contract_status?: string | null
          contract_url?: string | null
          created_at?: string | null
          discount_percentage?: number | null
          event_id: string
          id?: string
          in_kind_value?: number | null
          leads_collected?: number | null
          logo_placements?: string[] | null
          metadata?: Json | null
          payment_due_date?: string | null
          payment_status?: string | null
          roi_percentage?: number | null
          satisfaction_score?: number | null
          speaking_slots?: number | null
          sponsor_id: string
          sponsorship_amount?: number
          sponsorship_tier: string
          testimonial?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_paid?: number | null
          benefits?: Json | null
          booth_number?: string | null
          booth_size?: string | null
          booth_visitors?: number | null
          complimentary_tickets?: number | null
          contract_signed_date?: string | null
          contract_status?: string | null
          contract_url?: string | null
          created_at?: string | null
          discount_percentage?: number | null
          event_id?: string
          id?: string
          in_kind_value?: number | null
          leads_collected?: number | null
          logo_placements?: string[] | null
          metadata?: Json | null
          payment_due_date?: string | null
          payment_status?: string | null
          roi_percentage?: number | null
          satisfaction_score?: number | null
          speaking_slots?: number | null
          sponsor_id?: string
          sponsorship_amount?: number
          sponsorship_tier?: string
          testimonial?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_sponsors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_sponsors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_sponsors_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      event_staff: {
        Row: {
          break_minutes: number | null
          checked_in: boolean | null
          checked_in_at: string | null
          checked_out_at: string | null
          communication_preferences: Json | null
          compensation_type: string | null
          created_at: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          event_id: string
          flat_fee: number | null
          hourly_rate: number | null
          id: string
          metadata: Json | null
          performance_notes: string | null
          performance_rating: number | null
          responsibilities: string[] | null
          role: string
          shift_end: string
          shift_start: string
          status: string | null
          tasks_assigned: number | null
          tasks_completed: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          break_minutes?: number | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          checked_out_at?: string | null
          communication_preferences?: Json | null
          compensation_type?: string | null
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          event_id: string
          flat_fee?: number | null
          hourly_rate?: number | null
          id?: string
          metadata?: Json | null
          performance_notes?: string | null
          performance_rating?: number | null
          responsibilities?: string[] | null
          role: string
          shift_end: string
          shift_start: string
          status?: string | null
          tasks_assigned?: number | null
          tasks_completed?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          break_minutes?: number | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          checked_out_at?: string | null
          communication_preferences?: Json | null
          compensation_type?: string | null
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          event_id?: string
          flat_fee?: number | null
          hourly_rate?: number | null
          id?: string
          metadata?: Json | null
          performance_notes?: string | null
          performance_rating?: number | null
          responsibilities?: string[] | null
          role?: string
          shift_end?: string
          shift_start?: string
          status?: string | null
          tasks_assigned?: number | null
          tasks_completed?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_staff_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_staff_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_updates: {
        Row: {
          affected_attendees: number | null
          created_at: string | null
          created_by: string | null
          event_id: string | null
          id: string
          new_values: Json | null
          notification_sent: boolean | null
          previous_values: Json | null
          update_details: string
          update_status: string | null
          update_time: string | null
          update_type: string
          updated_at: string | null
        }
        Insert: {
          affected_attendees?: number | null
          created_at?: string | null
          created_by?: string | null
          event_id?: string | null
          id?: string
          new_values?: Json | null
          notification_sent?: boolean | null
          previous_values?: Json | null
          update_details: string
          update_status?: string | null
          update_time?: string | null
          update_type: string
          updated_at?: string | null
        }
        Update: {
          affected_attendees?: number | null
          created_at?: string | null
          created_by?: string | null
          event_id?: string | null
          id?: string
          new_values?: Json | null
          notification_sent?: boolean | null
          previous_values?: Json | null
          update_details?: string
          update_status?: string | null
          update_time?: string | null
          update_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_updates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_updates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_updates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
        ]
      }
      events: {
        Row: {
          allow_waitlist: boolean | null
          capacity: number
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          end_date: string
          event_type: string | null
          format: string | null
          id: string
          is_deleted: boolean | null
          max_waitlist_size: number | null
          metadata: Json | null
          name: string
          organization_id: string
          organizer_user_id: string
          registered_count: number | null
          slug: string
          start_date: string
          status: string | null
          ticket_revenue: number | null
          timezone: string | null
          updated_at: string | null
          venue_id: string | null
          visibility: string | null
        }
        Insert: {
          allow_waitlist?: boolean | null
          capacity: number
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          end_date: string
          event_type?: string | null
          format?: string | null
          id?: string
          is_deleted?: boolean | null
          max_waitlist_size?: number | null
          metadata?: Json | null
          name: string
          organization_id: string
          organizer_user_id: string
          registered_count?: number | null
          slug: string
          start_date: string
          status?: string | null
          ticket_revenue?: number | null
          timezone?: string | null
          updated_at?: string | null
          venue_id?: string | null
          visibility?: string | null
        }
        Update: {
          allow_waitlist?: boolean | null
          capacity?: number
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          end_date?: string
          event_type?: string | null
          format?: string | null
          id?: string
          is_deleted?: boolean | null
          max_waitlist_size?: number | null
          metadata?: Json | null
          name?: string
          organization_id?: string
          organizer_user_id?: string
          registered_count?: number | null
          slug?: string
          start_date?: string
          status?: string | null
          ticket_revenue?: number | null
          timezone?: string | null
          updated_at?: string | null
          venue_id?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organizer_user_id_fkey"
            columns: ["organizer_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      fashion_designers: {
        Row: {
          availability_schedule: Json | null
          awards: Json | null
          booking_rate: number | null
          brand_description: string | null
          brand_name: string
          brand_story: string | null
          business_model: string | null
          celebrity_endorsements: string[] | null
          collaboration_interests: string[] | null
          collection_showcase_fee: number | null
          created_at: string | null
          designer_name: string
          education: string | null
          founding_year: number | null
          id: string
          lookbook_url: string | null
          media_kit_url: string | null
          media_mentions_count: number | null
          organization_id: string
          origin_country: string | null
          portfolio_url: string | null
          preferred_event_types: string[] | null
          press_mentions: Json | null
          price_range: string | null
          production_capacity: number | null
          runway_shows_count: number | null
          seasonal_collections: Json | null
          signature_pieces: string[] | null
          social_media_following: number | null
          stage_name: string | null
          stakeholder_id: string | null
          status: string | null
          style_category: string[] | null
          sustainability_practices: string[] | null
          target_demographic: string[] | null
          updated_at: string | null
          verification_status: string | null
          years_experience: number | null
        }
        Insert: {
          availability_schedule?: Json | null
          awards?: Json | null
          booking_rate?: number | null
          brand_description?: string | null
          brand_name: string
          brand_story?: string | null
          business_model?: string | null
          celebrity_endorsements?: string[] | null
          collaboration_interests?: string[] | null
          collection_showcase_fee?: number | null
          created_at?: string | null
          designer_name: string
          education?: string | null
          founding_year?: number | null
          id?: string
          lookbook_url?: string | null
          media_kit_url?: string | null
          media_mentions_count?: number | null
          organization_id: string
          origin_country?: string | null
          portfolio_url?: string | null
          preferred_event_types?: string[] | null
          press_mentions?: Json | null
          price_range?: string | null
          production_capacity?: number | null
          runway_shows_count?: number | null
          seasonal_collections?: Json | null
          signature_pieces?: string[] | null
          social_media_following?: number | null
          stage_name?: string | null
          stakeholder_id?: string | null
          status?: string | null
          style_category?: string[] | null
          sustainability_practices?: string[] | null
          target_demographic?: string[] | null
          updated_at?: string | null
          verification_status?: string | null
          years_experience?: number | null
        }
        Update: {
          availability_schedule?: Json | null
          awards?: Json | null
          booking_rate?: number | null
          brand_description?: string | null
          brand_name?: string
          brand_story?: string | null
          business_model?: string | null
          celebrity_endorsements?: string[] | null
          collaboration_interests?: string[] | null
          collection_showcase_fee?: number | null
          created_at?: string | null
          designer_name?: string
          education?: string | null
          founding_year?: number | null
          id?: string
          lookbook_url?: string | null
          media_kit_url?: string | null
          media_mentions_count?: number | null
          organization_id?: string
          origin_country?: string | null
          portfolio_url?: string | null
          preferred_event_types?: string[] | null
          press_mentions?: Json | null
          price_range?: string | null
          production_capacity?: number | null
          runway_shows_count?: number | null
          seasonal_collections?: Json | null
          signature_pieces?: string[] | null
          social_media_following?: number | null
          stage_name?: string | null
          stakeholder_id?: string | null
          status?: string | null
          style_category?: string[] | null
          sustainability_practices?: string[] | null
          target_demographic?: string[] | null
          updated_at?: string | null
          verification_status?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fashion_designers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "fashion_designers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fashion_designers_stakeholder_id_fkey"
            columns: ["stakeholder_id"]
            isOneToOne: false
            referencedRelation: "stakeholders"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comments: string | null
          content_rating: number | null
          created_at: string | null
          event_id: string | null
          favorite_aspects: string[] | null
          id: string
          improvement_areas: string[] | null
          is_anonymous: boolean | null
          metadata: Json | null
          organization_id: string | null
          organization_rating: number | null
          overall_experience: number | null
          rating: number | null
          registration_id: string | null
          suggestions: string | null
          updated_at: string | null
          user_id: string | null
          venue_rating: number | null
          would_attend_again: boolean | null
          would_recommend: boolean | null
        }
        Insert: {
          comments?: string | null
          content_rating?: number | null
          created_at?: string | null
          event_id?: string | null
          favorite_aspects?: string[] | null
          id?: string
          improvement_areas?: string[] | null
          is_anonymous?: boolean | null
          metadata?: Json | null
          organization_id?: string | null
          organization_rating?: number | null
          overall_experience?: number | null
          rating?: number | null
          registration_id?: string | null
          suggestions?: string | null
          updated_at?: string | null
          user_id?: string | null
          venue_rating?: number | null
          would_attend_again?: boolean | null
          would_recommend?: boolean | null
        }
        Update: {
          comments?: string | null
          content_rating?: number | null
          created_at?: string | null
          event_id?: string | null
          favorite_aspects?: string[] | null
          id?: string
          improvement_areas?: string[] | null
          is_anonymous?: boolean | null
          metadata?: Json | null
          organization_id?: string | null
          organization_rating?: number | null
          overall_experience?: number | null
          rating?: number | null
          registration_id?: string | null
          suggestions?: string | null
          updated_at?: string | null
          user_id?: string | null
          venue_rating?: number | null
          would_attend_again?: boolean | null
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "feedback_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "feedback_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      influencers: {
        Row: {
          availability_status: string | null
          average_campaign_performance: number | null
          average_comments_per_post: number | null
          average_engagement_rate: number | null
          average_likes_per_post: number | null
          average_shares_per_post: number | null
          booking_calendar: Json | null
          brand_alignment_score: number | null
          brand_partnerships_count: number | null
          brand_safety_score: number | null
          campaigns_completed: number | null
          collaboration_types: string[] | null
          content_categories: string[] | null
          content_guidelines_adherence: number | null
          content_quality_score: number | null
          content_style: string[] | null
          content_usage_rights: string | null
          created_at: string | null
          display_name: string
          event_attendance_rate: number | null
          exclusivity_requirements: string | null
          facebook_followers: number | null
          fcc_disclosure_compliant: boolean | null
          gender_split: Json | null
          handle_name: string
          id: string
          instagram_followers: number | null
          location_demographics: Json | null
          niche_focus: string[] | null
          organization_id: string
          package_deal_rate: number | null
          platform_handles: Json
          post_rate: number | null
          preferred_brands: string[] | null
          preferred_contract_length: string | null
          pricing_model: string | null
          primary_age_group: string | null
          primary_platform: string
          professionalism_score: number | null
          real_name: string | null
          reel_rate: number | null
          stakeholder_id: string | null
          status: string | null
          story_rate: number | null
          tier_level: string | null
          tiktok_followers: number | null
          total_followers: number | null
          updated_at: string | null
          verification_status: string | null
          youtube_subscribers: number | null
        }
        Insert: {
          availability_status?: string | null
          average_campaign_performance?: number | null
          average_comments_per_post?: number | null
          average_engagement_rate?: number | null
          average_likes_per_post?: number | null
          average_shares_per_post?: number | null
          booking_calendar?: Json | null
          brand_alignment_score?: number | null
          brand_partnerships_count?: number | null
          brand_safety_score?: number | null
          campaigns_completed?: number | null
          collaboration_types?: string[] | null
          content_categories?: string[] | null
          content_guidelines_adherence?: number | null
          content_quality_score?: number | null
          content_style?: string[] | null
          content_usage_rights?: string | null
          created_at?: string | null
          display_name: string
          event_attendance_rate?: number | null
          exclusivity_requirements?: string | null
          facebook_followers?: number | null
          fcc_disclosure_compliant?: boolean | null
          gender_split?: Json | null
          handle_name: string
          id?: string
          instagram_followers?: number | null
          location_demographics?: Json | null
          niche_focus?: string[] | null
          organization_id: string
          package_deal_rate?: number | null
          platform_handles?: Json
          post_rate?: number | null
          preferred_brands?: string[] | null
          preferred_contract_length?: string | null
          pricing_model?: string | null
          primary_age_group?: string | null
          primary_platform: string
          professionalism_score?: number | null
          real_name?: string | null
          reel_rate?: number | null
          stakeholder_id?: string | null
          status?: string | null
          story_rate?: number | null
          tier_level?: string | null
          tiktok_followers?: number | null
          total_followers?: number | null
          updated_at?: string | null
          verification_status?: string | null
          youtube_subscribers?: number | null
        }
        Update: {
          availability_status?: string | null
          average_campaign_performance?: number | null
          average_comments_per_post?: number | null
          average_engagement_rate?: number | null
          average_likes_per_post?: number | null
          average_shares_per_post?: number | null
          booking_calendar?: Json | null
          brand_alignment_score?: number | null
          brand_partnerships_count?: number | null
          brand_safety_score?: number | null
          campaigns_completed?: number | null
          collaboration_types?: string[] | null
          content_categories?: string[] | null
          content_guidelines_adherence?: number | null
          content_quality_score?: number | null
          content_style?: string[] | null
          content_usage_rights?: string | null
          created_at?: string | null
          display_name?: string
          event_attendance_rate?: number | null
          exclusivity_requirements?: string | null
          facebook_followers?: number | null
          fcc_disclosure_compliant?: boolean | null
          gender_split?: Json | null
          handle_name?: string
          id?: string
          instagram_followers?: number | null
          location_demographics?: Json | null
          niche_focus?: string[] | null
          organization_id?: string
          package_deal_rate?: number | null
          platform_handles?: Json
          post_rate?: number | null
          preferred_brands?: string[] | null
          preferred_contract_length?: string | null
          pricing_model?: string | null
          primary_age_group?: string | null
          primary_platform?: string
          professionalism_score?: number | null
          real_name?: string | null
          reel_rate?: number | null
          stakeholder_id?: string | null
          status?: string | null
          story_rate?: number | null
          tier_level?: string | null
          tiktok_followers?: number | null
          total_followers?: number | null
          updated_at?: string | null
          verification_status?: string | null
          youtube_subscribers?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "influencers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "influencers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencers_stakeholder_id_fkey"
            columns: ["stakeholder_id"]
            isOneToOne: false
            referencedRelation: "stakeholders"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          bill_to_address: string | null
          bill_to_email: string
          bill_to_name: string
          created_at: string | null
          currency: string | null
          due_date: string | null
          event_id: string | null
          id: string
          invoice_number: string
          invoice_type: string
          issue_date: string | null
          line_items: Json
          metadata: Json | null
          notes: string | null
          organization_id: string
          paid_date: string | null
          payment_method: string | null
          payment_reference: string | null
          sponsor_id: string | null
          status: string | null
          subtotal: number
          tax_amount: number | null
          tax_id: string | null
          tax_rate: number | null
          terms_and_conditions: string | null
          total_amount: number | null
          updated_at: string | null
          user_id: string | null
          vendor_id: string | null
        }
        Insert: {
          bill_to_address?: string | null
          bill_to_email: string
          bill_to_name: string
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          event_id?: string | null
          id?: string
          invoice_number?: string
          invoice_type: string
          issue_date?: string | null
          line_items?: Json
          metadata?: Json | null
          notes?: string | null
          organization_id: string
          paid_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          sponsor_id?: string | null
          status?: string | null
          subtotal: number
          tax_amount?: number | null
          tax_id?: string | null
          tax_rate?: number | null
          terms_and_conditions?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
          vendor_id?: string | null
        }
        Update: {
          bill_to_address?: string | null
          bill_to_email?: string
          bill_to_name?: string
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          event_id?: string | null
          id?: string
          invoice_number?: string
          invoice_type?: string
          issue_date?: string | null
          line_items?: Json
          metadata?: Json | null
          notes?: string | null
          organization_id?: string
          paid_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          sponsor_id?: string | null
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          tax_id?: string | null
          tax_rate?: number | null
          terms_and_conditions?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "invoices_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "invoices_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          alt_text: string | null
          category: string | null
          cdn_url: string | null
          collection_name: string | null
          copyright_owner: string | null
          created_at: string | null
          description: string | null
          designer_name: string | null
          download_count: number | null
          duration_seconds: number | null
          event_id: string | null
          file_name: string
          file_size_bytes: number
          file_type: string
          file_url: string
          height: number | null
          id: string
          is_featured: boolean | null
          last_accessed_at: string | null
          license_type: string | null
          mime_type: string
          model_name: string | null
          organization_id: string
          original_file_name: string
          season: string | null
          stakeholder_id: string | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          upload_source: string | null
          uploaded_by: string
          usage_rights: string | null
          view_count: number | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          category?: string | null
          cdn_url?: string | null
          collection_name?: string | null
          copyright_owner?: string | null
          created_at?: string | null
          description?: string | null
          designer_name?: string | null
          download_count?: number | null
          duration_seconds?: number | null
          event_id?: string | null
          file_name: string
          file_size_bytes: number
          file_type: string
          file_url: string
          height?: number | null
          id?: string
          is_featured?: boolean | null
          last_accessed_at?: string | null
          license_type?: string | null
          mime_type: string
          model_name?: string | null
          organization_id: string
          original_file_name: string
          season?: string | null
          stakeholder_id?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          upload_source?: string | null
          uploaded_by: string
          usage_rights?: string | null
          view_count?: number | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          category?: string | null
          cdn_url?: string | null
          collection_name?: string | null
          copyright_owner?: string | null
          created_at?: string | null
          description?: string | null
          designer_name?: string | null
          download_count?: number | null
          duration_seconds?: number | null
          event_id?: string | null
          file_name?: string
          file_size_bytes?: number
          file_type?: string
          file_url?: string
          height?: number | null
          id?: string
          is_featured?: boolean | null
          last_accessed_at?: string | null
          license_type?: string | null
          mime_type?: string
          model_name?: string | null
          organization_id?: string
          original_file_name?: string
          season?: string | null
          stakeholder_id?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          upload_source?: string | null
          uploaded_by?: string
          usage_rights?: string | null
          view_count?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_assets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "media_assets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "media_assets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_assets_stakeholder_id_fkey"
            columns: ["stakeholder_id"]
            isOneToOne: false
            referencedRelation: "stakeholders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_assets_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      media_partners: {
        Row: {
          accreditation_requirements: string | null
          audience_engagement_rate: number | null
          availability_status: string | null
          circulation_readership: number | null
          content_types: string[] | null
          content_usage_rights: string | null
          contra_value: number | null
          coverage_requirements: string | null
          created_at: string | null
          equipment_needs: string | null
          expected_deliverables: Json | null
          focus_areas: string[] | null
          id: string
          monthly_website_visitors: number | null
          organization_id: string
          outlet_name: string
          outlet_type: string | null
          partnership_tier: string | null
          partnership_type: string | null
          partnership_value: number | null
          past_coverage_quality: number | null
          payment_terms: string | null
          preferred_event_types: string[] | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone: string | null
          primary_contact_title: string | null
          publication_frequency: string | null
          reliability_score: number | null
          social_media_following: number | null
          social_media_handles: Json | null
          special_access_required: boolean | null
          stakeholder_id: string | null
          status: string | null
          target_audience: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          accreditation_requirements?: string | null
          audience_engagement_rate?: number | null
          availability_status?: string | null
          circulation_readership?: number | null
          content_types?: string[] | null
          content_usage_rights?: string | null
          contra_value?: number | null
          coverage_requirements?: string | null
          created_at?: string | null
          equipment_needs?: string | null
          expected_deliverables?: Json | null
          focus_areas?: string[] | null
          id?: string
          monthly_website_visitors?: number | null
          organization_id: string
          outlet_name: string
          outlet_type?: string | null
          partnership_tier?: string | null
          partnership_type?: string | null
          partnership_value?: number | null
          past_coverage_quality?: number | null
          payment_terms?: string | null
          preferred_event_types?: string[] | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone?: string | null
          primary_contact_title?: string | null
          publication_frequency?: string | null
          reliability_score?: number | null
          social_media_following?: number | null
          social_media_handles?: Json | null
          special_access_required?: boolean | null
          stakeholder_id?: string | null
          status?: string | null
          target_audience?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          accreditation_requirements?: string | null
          audience_engagement_rate?: number | null
          availability_status?: string | null
          circulation_readership?: number | null
          content_types?: string[] | null
          content_usage_rights?: string | null
          contra_value?: number | null
          coverage_requirements?: string | null
          created_at?: string | null
          equipment_needs?: string | null
          expected_deliverables?: Json | null
          focus_areas?: string[] | null
          id?: string
          monthly_website_visitors?: number | null
          organization_id?: string
          outlet_name?: string
          outlet_type?: string | null
          partnership_tier?: string | null
          partnership_type?: string | null
          partnership_value?: number | null
          past_coverage_quality?: number | null
          payment_terms?: string | null
          preferred_event_types?: string[] | null
          primary_contact_email?: string
          primary_contact_name?: string
          primary_contact_phone?: string | null
          primary_contact_title?: string | null
          publication_frequency?: string | null
          reliability_score?: number | null
          social_media_following?: number | null
          social_media_handles?: Json | null
          special_access_required?: boolean | null
          stakeholder_id?: string | null
          status?: string | null
          target_audience?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_partners_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "media_partners_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_partners_stakeholder_id_fkey"
            columns: ["stakeholder_id"]
            isOneToOne: false
            referencedRelation: "stakeholders"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_bookings: {
        Row: {
          booking_reference: string | null
          calendar_event_id: string | null
          created_at: string | null
          duration_minutes: number
          guest_company: string | null
          guest_email: string
          guest_name: string
          guest_notes: string | null
          id: string
          meeting_type_id: string
          scheduled_at: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          booking_reference?: string | null
          calendar_event_id?: string | null
          created_at?: string | null
          duration_minutes: number
          guest_company?: string | null
          guest_email: string
          guest_name: string
          guest_notes?: string | null
          id?: string
          meeting_type_id: string
          scheduled_at: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          booking_reference?: string | null
          calendar_event_id?: string | null
          created_at?: string | null
          duration_minutes?: number
          guest_company?: string | null
          guest_email?: string
          guest_name?: string
          guest_notes?: string | null
          id?: string
          meeting_type_id?: string
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_bookings_calendar_event_id_fkey"
            columns: ["calendar_event_id"]
            isOneToOne: false
            referencedRelation: "calendar_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_bookings_meeting_type_id_fkey"
            columns: ["meeting_type_id"]
            isOneToOne: false
            referencedRelation: "meeting_types"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_types: {
        Row: {
          auto_create_conference: boolean | null
          available_days: number[] | null
          available_hours: Json | null
          buffer_after_minutes: number | null
          buffer_before_minutes: number | null
          created_at: string | null
          default_conference_provider: string | null
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          maximum_advance_days: number | null
          minimum_notice_hours: number | null
          name: string
          organization_id: string
          public_slug: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_create_conference?: boolean | null
          available_days?: number[] | null
          available_hours?: Json | null
          buffer_after_minutes?: number | null
          buffer_before_minutes?: number | null
          created_at?: string | null
          default_conference_provider?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          maximum_advance_days?: number | null
          minimum_notice_hours?: number | null
          name: string
          organization_id: string
          public_slug?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_create_conference?: boolean | null
          available_days?: number[] | null
          available_hours?: Json | null
          buffer_after_minutes?: number | null
          buffer_before_minutes?: number | null
          created_at?: string | null
          default_conference_provider?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          maximum_advance_days?: number | null
          minimum_notice_hours?: number | null
          name?: string
          organization_id?: string
          public_slug?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_types_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "meeting_types_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_types_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          agency_contact: string | null
          agency_email: string | null
          agency_name: string | null
          agency_phone: string | null
          availability_calendar: Json | null
          availability_status: string | null
          body_shot_url: string | null
          bust_cm: number | null
          campaigns_count: number | null
          comp_card_url: string | null
          created_at: string | null
          daily_rate: number | null
          date_of_birth: string | null
          dress_size: string | null
          experience_level: string | null
          eye_color: string | null
          hair_color: string | null
          headshot_url: string | null
          height_cm: number | null
          hips_cm: number | null
          hourly_rate: number | null
          id: string
          instagram_followers: number | null
          is_independent: boolean | null
          languages_spoken: string[] | null
          measurements_updated_at: string | null
          modeling_category: string[] | null
          nationality: string | null
          organization_id: string
          overall_rating: number | null
          photoshoot_rate: number | null
          photoshoots_count: number | null
          portfolio_url: string | null
          preferred_styles: string[] | null
          professionalism_score: number | null
          punctuality_score: number | null
          real_name: string | null
          runway_show_rate: number | null
          runway_shows_count: number | null
          shoe_size: string | null
          skin_tone: string | null
          social_media_influence_score: number | null
          special_requirements: string | null
          specializations: string[] | null
          stage_name: string
          stakeholder_id: string | null
          status: string | null
          tiktok_followers: number | null
          total_bookings: number | null
          travel_availability: boolean | null
          updated_at: string | null
          verification_status: string | null
          waist_cm: number | null
          wardrobe_preferences: Json | null
          weight_kg: number | null
          years_experience: number | null
        }
        Insert: {
          agency_contact?: string | null
          agency_email?: string | null
          agency_name?: string | null
          agency_phone?: string | null
          availability_calendar?: Json | null
          availability_status?: string | null
          body_shot_url?: string | null
          bust_cm?: number | null
          campaigns_count?: number | null
          comp_card_url?: string | null
          created_at?: string | null
          daily_rate?: number | null
          date_of_birth?: string | null
          dress_size?: string | null
          experience_level?: string | null
          eye_color?: string | null
          hair_color?: string | null
          headshot_url?: string | null
          height_cm?: number | null
          hips_cm?: number | null
          hourly_rate?: number | null
          id?: string
          instagram_followers?: number | null
          is_independent?: boolean | null
          languages_spoken?: string[] | null
          measurements_updated_at?: string | null
          modeling_category?: string[] | null
          nationality?: string | null
          organization_id: string
          overall_rating?: number | null
          photoshoot_rate?: number | null
          photoshoots_count?: number | null
          portfolio_url?: string | null
          preferred_styles?: string[] | null
          professionalism_score?: number | null
          punctuality_score?: number | null
          real_name?: string | null
          runway_show_rate?: number | null
          runway_shows_count?: number | null
          shoe_size?: string | null
          skin_tone?: string | null
          social_media_influence_score?: number | null
          special_requirements?: string | null
          specializations?: string[] | null
          stage_name: string
          stakeholder_id?: string | null
          status?: string | null
          tiktok_followers?: number | null
          total_bookings?: number | null
          travel_availability?: boolean | null
          updated_at?: string | null
          verification_status?: string | null
          waist_cm?: number | null
          wardrobe_preferences?: Json | null
          weight_kg?: number | null
          years_experience?: number | null
        }
        Update: {
          agency_contact?: string | null
          agency_email?: string | null
          agency_name?: string | null
          agency_phone?: string | null
          availability_calendar?: Json | null
          availability_status?: string | null
          body_shot_url?: string | null
          bust_cm?: number | null
          campaigns_count?: number | null
          comp_card_url?: string | null
          created_at?: string | null
          daily_rate?: number | null
          date_of_birth?: string | null
          dress_size?: string | null
          experience_level?: string | null
          eye_color?: string | null
          hair_color?: string | null
          headshot_url?: string | null
          height_cm?: number | null
          hips_cm?: number | null
          hourly_rate?: number | null
          id?: string
          instagram_followers?: number | null
          is_independent?: boolean | null
          languages_spoken?: string[] | null
          measurements_updated_at?: string | null
          modeling_category?: string[] | null
          nationality?: string | null
          organization_id?: string
          overall_rating?: number | null
          photoshoot_rate?: number | null
          photoshoots_count?: number | null
          portfolio_url?: string | null
          preferred_styles?: string[] | null
          professionalism_score?: number | null
          punctuality_score?: number | null
          real_name?: string | null
          runway_show_rate?: number | null
          runway_shows_count?: number | null
          shoe_size?: string | null
          skin_tone?: string | null
          social_media_influence_score?: number | null
          special_requirements?: string | null
          specializations?: string[] | null
          stage_name?: string
          stakeholder_id?: string | null
          status?: string | null
          tiktok_followers?: number | null
          total_bookings?: number | null
          travel_availability?: boolean | null
          updated_at?: string | null
          verification_status?: string | null
          waist_cm?: number | null
          wardrobe_preferences?: Json | null
          weight_kg?: number | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "models_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "models_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "models_stakeholder_id_fkey"
            columns: ["stakeholder_id"]
            isOneToOne: false
            referencedRelation: "stakeholders"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          company_id: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          custom_fields: Json | null
          deal_id: string | null
          event_id: string | null
          format: string | null
          id: string
          is_pinned: boolean | null
          is_private: boolean | null
          priority: string | null
          text: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_fields?: Json | null
          deal_id?: string | null
          event_id?: string | null
          format?: string | null
          id?: string
          is_pinned?: boolean | null
          is_private?: boolean | null
          priority?: string | null
          text: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_fields?: Json | null
          deal_id?: string | null
          event_id?: string | null
          format?: string | null
          id?: string
          is_pinned?: boolean | null
          is_private?: boolean | null
          priority?: string | null
          text?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
        ]
      }
      notification_queue: {
        Row: {
          attempts: number | null
          channel: string
          content: string
          created_at: string | null
          error_message: string | null
          failed_at: string | null
          id: string
          last_attempt_at: string | null
          max_attempts: number | null
          metadata: Json | null
          organization_id: string | null
          priority: number | null
          provider_response: Json | null
          recipient: string
          recipient_name: string | null
          reference_id: string | null
          reference_type: string | null
          scheduled_for: string | null
          sent_at: string | null
          status: string | null
          subject: string | null
          template_data: Json | null
          template_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          attempts?: number | null
          channel: string
          content: string
          created_at?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          last_attempt_at?: string | null
          max_attempts?: number | null
          metadata?: Json | null
          organization_id?: string | null
          priority?: number | null
          provider_response?: Json | null
          recipient: string
          recipient_name?: string | null
          reference_id?: string | null
          reference_type?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          template_data?: Json | null
          template_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          attempts?: number | null
          channel?: string
          content?: string
          created_at?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          last_attempt_at?: string | null
          max_attempts?: number | null
          metadata?: Json | null
          organization_id?: string | null
          priority?: number | null
          provider_response?: Json | null
          recipient?: string
          recipient_name?: string | null
          reference_id?: string | null
          reference_type?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          template_data?: Json | null
          template_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_queue_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "notification_queue_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          body_template: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          subject: string | null
          type: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          body_template: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subject?: string | null
          type: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          body_template?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string | null
          type?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          amount: number
          close_date: string | null
          closed_at: string | null
          company_id: string | null
          competitor: string | null
          contact_id: string | null
          created_at: string | null
          currency: string | null
          custom_fields: Json | null
          deal_type: string
          deleted_at: string | null
          event_id: string | null
          expected_revenue: number | null
          id: string
          lost_reason: string | null
          name: string
          notes: string | null
          opportunity_number: string
          organization_id: string
          owner_id: string | null
          pipeline_stage_id: string
          probability: number | null
          products: Json | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          close_date?: string | null
          closed_at?: string | null
          company_id?: string | null
          competitor?: string | null
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          deal_type: string
          deleted_at?: string | null
          event_id?: string | null
          expected_revenue?: number | null
          id?: string
          lost_reason?: string | null
          name: string
          notes?: string | null
          opportunity_number?: string
          organization_id: string
          owner_id?: string | null
          pipeline_stage_id: string
          probability?: number | null
          products?: Json | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          close_date?: string | null
          closed_at?: string | null
          company_id?: string | null
          competitor?: string | null
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          deal_type?: string
          deleted_at?: string | null
          event_id?: string | null
          expected_revenue?: number | null
          id?: string
          lost_reason?: string | null
          name?: string
          notes?: string | null
          opportunity_number?: string
          organization_id?: string
          owner_id?: string | null
          pipeline_stage_id?: string
          probability?: number | null
          products?: Json | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "opportunities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "opportunities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_pipeline_stage_id_fkey"
            columns: ["pipeline_stage_id"]
            isOneToOne: false
            referencedRelation: "pipeline_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address_line1: string
          address_line2: string | null
          business_type: string | null
          city: string
          country: string | null
          created_at: string | null
          currency: string | null
          deleted_at: string | null
          deleted_by: string | null
          email: string
          id: string
          is_deleted: boolean | null
          metadata: Json | null
          name: string
          phone: string
          postal_code: string
          province: string
          slug: string
          subscription_status: string | null
          subscription_tier: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          business_type?: string | null
          city: string
          country?: string | null
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email: string
          id?: string
          is_deleted?: boolean | null
          metadata?: Json | null
          name: string
          phone: string
          postal_code: string
          province: string
          slug: string
          subscription_status?: string | null
          subscription_tier?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          business_type?: string | null
          city?: string
          country?: string | null
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string
          id?: string
          is_deleted?: boolean | null
          metadata?: Json | null
          name?: string
          phone?: string
          postal_code?: string
          province?: string
          slug?: string
          subscription_status?: string | null
          subscription_tier?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string
          description: string | null
          failed_at: string | null
          id: string
          initiated_at: string | null
          invoice_id: string | null
          is_refund: boolean | null
          metadata: Json | null
          net_amount: number | null
          organization_id: string
          original_payment_id: string | null
          payment_method: string
          payment_type: string
          paypal_transaction_id: string | null
          processing_fee: number | null
          refund_reason: string | null
          refunded_amount: number | null
          refunded_at: string | null
          registration_id: string | null
          status: string | null
          stripe_charge_id: string | null
          stripe_payment_intent_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          description?: string | null
          failed_at?: string | null
          id?: string
          initiated_at?: string | null
          invoice_id?: string | null
          is_refund?: boolean | null
          metadata?: Json | null
          net_amount?: number | null
          organization_id: string
          original_payment_id?: string | null
          payment_method: string
          payment_type: string
          paypal_transaction_id?: string | null
          processing_fee?: number | null
          refund_reason?: string | null
          refunded_amount?: number | null
          refunded_at?: string | null
          registration_id?: string | null
          status?: string | null
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          description?: string | null
          failed_at?: string | null
          id?: string
          initiated_at?: string | null
          invoice_id?: string | null
          is_refund?: boolean | null
          metadata?: Json | null
          net_amount?: number | null
          organization_id?: string
          original_payment_id?: string | null
          payment_method?: string
          payment_type?: string
          paypal_transaction_id?: string | null
          processing_fee?: number | null
          refund_reason?: string | null
          refunded_amount?: number | null
          refunded_at?: string | null
          registration_id?: string | null
          status?: string | null
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "payments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_original_payment_id_fkey"
            columns: ["original_payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pinned_events: {
        Row: {
          chat_id: string | null
          created_at: string | null
          event_id: string | null
          id: string
          is_active: boolean | null
          pin_reason: string | null
          pinned_at: string | null
          pinned_by: string | null
          unpinned_at: string | null
          updated_at: string | null
        }
        Insert: {
          chat_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          is_active?: boolean | null
          pin_reason?: string | null
          pinned_at?: string | null
          pinned_by?: string | null
          unpinned_at?: string | null
          updated_at?: string | null
        }
        Update: {
          chat_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          is_active?: boolean | null
          pin_reason?: string | null
          pinned_at?: string | null
          pinned_by?: string | null
          unpinned_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pinned_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pinned_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "pinned_events_pinned_by_fkey"
            columns: ["pinned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_stages: {
        Row: {
          color: string | null
          created_at: string | null
          days_to_close: number | null
          default_probability: number | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_closed: boolean | null
          is_won: boolean | null
          name: string
          organization_id: string
          pipeline_type: string | null
          required_fields: string[] | null
          stage_key: string
          stage_order: number
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          days_to_close?: number | null
          default_probability?: number | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_closed?: boolean | null
          is_won?: boolean | null
          name: string
          organization_id: string
          pipeline_type?: string | null
          required_fields?: string[] | null
          stage_key: string
          stage_order: number
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          days_to_close?: number | null
          default_probability?: number | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_closed?: boolean | null
          is_won?: boolean | null
          name?: string
          organization_id?: string
          pipeline_type?: string | null
          required_fields?: string[] | null
          stage_key?: string
          stage_order?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_stages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "pipeline_stages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      production_runs: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          created_at: string | null
          cue_list: Json | null
          current_cue: number | null
          event_id: string
          id: string
          metadata: Json | null
          notes: string | null
          overall_quality_score: number | null
          run_number: number
          run_type: string
          scheduled_end: string
          scheduled_start: string
          stage_manager_id: string | null
          status: string | null
          technical_director_id: string | null
          technical_issues: Json | null
          total_cues: number | null
          updated_at: string | null
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          created_at?: string | null
          cue_list?: Json | null
          current_cue?: number | null
          event_id: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          overall_quality_score?: number | null
          run_number?: number
          run_type: string
          scheduled_end: string
          scheduled_start: string
          stage_manager_id?: string | null
          status?: string | null
          technical_director_id?: string | null
          technical_issues?: Json | null
          total_cues?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          created_at?: string | null
          cue_list?: Json | null
          current_cue?: number | null
          event_id?: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          overall_quality_score?: number | null
          run_number?: number
          run_type?: string
          scheduled_end?: string
          scheduled_start?: string
          stage_manager_id?: string | null
          status?: string | null
          technical_director_id?: string | null
          technical_issues?: Json | null
          total_cues?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "production_runs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "production_runs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "production_runs_stage_manager_id_fkey"
            columns: ["stage_manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "production_runs_technical_director_id_fkey"
            columns: ["technical_director_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          description: string | null
          discount_amount: number | null
          discount_percentage: number | null
          discount_type: string
          event_id: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          max_uses_per_user: number | null
          metadata: Json | null
          ticket_type_ids: string[] | null
          updated_at: string | null
          uses_count: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          discount_type: string
          event_id?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          max_uses_per_user?: number | null
          metadata?: Json | null
          ticket_type_ids?: string[] | null
          updated_at?: string | null
          uses_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          discount_type?: string
          event_id?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          max_uses_per_user?: number | null
          metadata?: Json | null
          ticket_type_ids?: string[] | null
          updated_at?: string | null
          uses_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promo_codes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promo_codes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
        ]
      }
      refund_queue: {
        Row: {
          amount: number
          approved_by: string | null
          created_at: string | null
          currency: string | null
          error_message: string | null
          failed_at: string | null
          id: string
          initiated_by: string | null
          metadata: Json | null
          organization_id: string | null
          payment_id: string | null
          processed_at: string | null
          processor: string | null
          processor_refund_id: string | null
          reason: string
          registration_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          approved_by?: string | null
          created_at?: string | null
          currency?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          initiated_by?: string | null
          metadata?: Json | null
          organization_id?: string | null
          payment_id?: string | null
          processed_at?: string | null
          processor?: string | null
          processor_refund_id?: string | null
          reason: string
          registration_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          approved_by?: string | null
          created_at?: string | null
          currency?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          initiated_by?: string | null
          metadata?: Json | null
          organization_id?: string | null
          payment_id?: string | null
          processed_at?: string | null
          processor?: string | null
          processor_refund_id?: string | null
          reason?: string
          registration_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "refund_queue_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refund_queue_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refund_queue_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "refund_queue_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refund_queue_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refund_queue_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          accessibility_needs: string[] | null
          cancelled_at: string | null
          check_in_method: string | null
          checked_in: boolean | null
          checked_in_at: string | null
          checked_in_by: string | null
          company_name: string | null
          confirmed_at: string | null
          created_at: string | null
          custom_fields: Json | null
          dietary_restrictions: string[] | null
          discount_amount: number | null
          email: string
          event_id: string
          first_name: string
          group_id: string | null
          group_size: number | null
          id: string
          ip_address: unknown | null
          is_group_leader: boolean | null
          job_title: string | null
          last_name: string
          metadata: Json | null
          payment_id: string | null
          payment_status: string | null
          phone: string | null
          promo_code_id: string | null
          qr_code: string | null
          registered_at: string | null
          registration_number: string
          registration_source: string | null
          service_fee: number | null
          status: string | null
          tax_amount: number | null
          ticket_price: number
          ticket_type_id: string
          total_amount: number
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          accessibility_needs?: string[] | null
          cancelled_at?: string | null
          check_in_method?: string | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          checked_in_by?: string | null
          company_name?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          dietary_restrictions?: string[] | null
          discount_amount?: number | null
          email: string
          event_id: string
          first_name: string
          group_id?: string | null
          group_size?: number | null
          id?: string
          ip_address?: unknown | null
          is_group_leader?: boolean | null
          job_title?: string | null
          last_name: string
          metadata?: Json | null
          payment_id?: string | null
          payment_status?: string | null
          phone?: string | null
          promo_code_id?: string | null
          qr_code?: string | null
          registered_at?: string | null
          registration_number?: string
          registration_source?: string | null
          service_fee?: number | null
          status?: string | null
          tax_amount?: number | null
          ticket_price?: number
          ticket_type_id: string
          total_amount?: number
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          accessibility_needs?: string[] | null
          cancelled_at?: string | null
          check_in_method?: string | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          checked_in_by?: string | null
          company_name?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          dietary_restrictions?: string[] | null
          discount_amount?: number | null
          email?: string
          event_id?: string
          first_name?: string
          group_id?: string | null
          group_size?: number | null
          id?: string
          ip_address?: unknown | null
          is_group_leader?: boolean | null
          job_title?: string | null
          last_name?: string
          metadata?: Json | null
          payment_id?: string | null
          payment_status?: string | null
          phone?: string | null
          promo_code_id?: string | null
          qr_code?: string | null
          registered_at?: string | null
          registration_number?: string
          registration_source?: string | null
          service_fee?: number | null
          status?: string | null
          tax_amount?: number | null
          ticket_price?: number
          ticket_type_id?: string
          total_amount?: number
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_checked_in_by_fkey"
            columns: ["checked_in_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "registrations_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_stages: {
        Row: {
          auto_create_tasks: Json | null
          color: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_closed: boolean | null
          is_won: boolean | null
          name: string
          probability: number | null
          required_fields: string[] | null
          stage_order: number
          updated_at: string | null
        }
        Insert: {
          auto_create_tasks?: Json | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_closed?: boolean | null
          is_won?: boolean | null
          name: string
          probability?: number | null
          required_fields?: string[] | null
          stage_order: number
          updated_at?: string | null
        }
        Update: {
          auto_create_tasks?: Json | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_closed?: boolean | null
          is_won?: boolean | null
          name?: string
          probability?: number | null
          required_fields?: string[] | null
          stage_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      scheduled_jobs: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          job_function: string
          job_name: string
          last_result: Json | null
          last_run: string | null
          next_run: string | null
          schedule: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          job_function: string
          job_name: string
          last_result?: Json | null
          last_run?: string | null
          next_run?: string | null
          schedule: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          job_function?: string
          job_name?: string
          last_result?: Json | null
          last_run?: string | null
          next_run?: string | null
          schedule?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      seat_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          checked_in: boolean | null
          checked_in_at: string | null
          guest_company: string | null
          guest_name: string | null
          guest_title: string | null
          id: string
          organization_id: string | null
          registration_id: string | null
          row_number: number
          seat_number: number
          section_id: string | null
          special_requirements: string | null
          updated_at: string | null
          vip_status: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          guest_company?: string | null
          guest_name?: string | null
          guest_title?: string | null
          id?: string
          organization_id?: string | null
          registration_id?: string | null
          row_number: number
          seat_number: number
          section_id?: string | null
          special_requirements?: string | null
          updated_at?: string | null
          vip_status?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          guest_company?: string | null
          guest_name?: string | null
          guest_title?: string | null
          id?: string
          organization_id?: string | null
          registration_id?: string | null
          row_number?: number
          seat_number?: number
          section_id?: string | null
          special_requirements?: string | null
          updated_at?: string | null
          vip_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seat_assignments_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seat_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "seat_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seat_assignments_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: true
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seat_assignments_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "seating_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      seating_sections: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          organization_id: string | null
          pricing_multiplier: number | null
          priority_level: number | null
          row_count: number
          seats_per_row: number
          section_code: string
          section_name: string
          section_type: string | null
          total_capacity: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          organization_id?: string | null
          pricing_multiplier?: number | null
          priority_level?: number | null
          row_count?: number
          seats_per_row: number
          section_code: string
          section_name: string
          section_type?: string | null
          total_capacity?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          organization_id?: string | null
          pricing_multiplier?: number | null
          priority_level?: number | null
          row_count?: number
          seats_per_row?: number
          section_code?: string
          section_name?: string
          section_type?: string | null
          total_capacity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seating_sections_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seating_sections_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "seating_sections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "seating_sections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      social_media_platforms: {
        Row: {
          api_endpoint: string | null
          available_metrics: string[] | null
          brand_color: string | null
          character_limit: number | null
          created_at: string | null
          display_name: string
          hashtag_limit: number | null
          icon_url: string | null
          id: string
          image_limit: number | null
          is_active: boolean | null
          metadata: Json | null
          platform_name: string
          platform_type: string | null
          priority: number | null
          requires_authentication: boolean | null
          supported_content_types: string[] | null
          updated_at: string | null
          video_limit_mb: number | null
        }
        Insert: {
          api_endpoint?: string | null
          available_metrics?: string[] | null
          brand_color?: string | null
          character_limit?: number | null
          created_at?: string | null
          display_name: string
          hashtag_limit?: number | null
          icon_url?: string | null
          id?: string
          image_limit?: number | null
          is_active?: boolean | null
          metadata?: Json | null
          platform_name: string
          platform_type?: string | null
          priority?: number | null
          requires_authentication?: boolean | null
          supported_content_types?: string[] | null
          updated_at?: string | null
          video_limit_mb?: number | null
        }
        Update: {
          api_endpoint?: string | null
          available_metrics?: string[] | null
          brand_color?: string | null
          character_limit?: number | null
          created_at?: string | null
          display_name?: string
          hashtag_limit?: number | null
          icon_url?: string | null
          id?: string
          image_limit?: number | null
          is_active?: boolean | null
          metadata?: Json | null
          platform_name?: string
          platform_type?: string | null
          priority?: number | null
          requires_authentication?: boolean | null
          supported_content_types?: string[] | null
          updated_at?: string | null
          video_limit_mb?: number | null
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          account_manager_id: string | null
          address_line1: string | null
          brand_colors: Json | null
          budget_range: string | null
          city: string | null
          company_name: string
          company_size: string | null
          country: string | null
          created_at: string | null
          facebook_url: string | null
          id: string
          industry: string | null
          instagram_url: string | null
          last_sponsorship_date: string | null
          linkedin_url: string | null
          logo_url: string | null
          metadata: Json | null
          notes: string | null
          organization_id: string
          postal_code: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone: string
          primary_contact_title: string | null
          province: string | null
          sponsor_tier_preference: string | null
          sponsorship_interests: string[] | null
          status: string | null
          tags: string[] | null
          total_events_sponsored: number | null
          total_sponsorship_amount: number | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          account_manager_id?: string | null
          address_line1?: string | null
          brand_colors?: Json | null
          budget_range?: string | null
          city?: string | null
          company_name: string
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          facebook_url?: string | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          last_sponsorship_date?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          metadata?: Json | null
          notes?: string | null
          organization_id: string
          postal_code?: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone: string
          primary_contact_title?: string | null
          province?: string | null
          sponsor_tier_preference?: string | null
          sponsorship_interests?: string[] | null
          status?: string | null
          tags?: string[] | null
          total_events_sponsored?: number | null
          total_sponsorship_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          account_manager_id?: string | null
          address_line1?: string | null
          brand_colors?: Json | null
          budget_range?: string | null
          city?: string | null
          company_name?: string
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          facebook_url?: string | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          last_sponsorship_date?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          metadata?: Json | null
          notes?: string | null
          organization_id?: string
          postal_code?: string | null
          primary_contact_email?: string
          primary_contact_name?: string
          primary_contact_phone?: string
          primary_contact_title?: string | null
          province?: string | null
          sponsor_tier_preference?: string | null
          sponsorship_interests?: string[] | null
          status?: string | null
          tags?: string[] | null
          total_events_sponsored?: number | null
          total_sponsorship_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_account_manager_id_fkey"
            columns: ["account_manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsors_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "sponsors_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stakeholders: {
        Row: {
          address: string | null
          availability: Json | null
          bio: string | null
          brand_name: string | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string | null
          email: string
          facebook_handle: string | null
          first_name: string
          id: string
          instagram_handle: string | null
          language_preference: string | null
          last_name: string
          linkedin_handle: string | null
          metadata: Json | null
          notes: string | null
          organization_id: string
          phone: string | null
          portfolio_url: string | null
          preferred_communication: string | null
          preferred_payment_method: string | null
          rate_daily: number | null
          rate_event: number | null
          rate_hourly: number | null
          rating: number | null
          size_measurements: Json | null
          specialties: string[] | null
          stage_name: string | null
          stakeholder_type: string
          state_province: string | null
          status: string | null
          style_focus: string[] | null
          tags: string[] | null
          tiktok_handle: string | null
          total_events: number | null
          updated_at: string | null
          verified: boolean | null
          website: string | null
          years_experience: number | null
          youtube_handle: string | null
        }
        Insert: {
          address?: string | null
          availability?: Json | null
          bio?: string | null
          brand_name?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          facebook_handle?: string | null
          first_name: string
          id?: string
          instagram_handle?: string | null
          language_preference?: string | null
          last_name: string
          linkedin_handle?: string | null
          metadata?: Json | null
          notes?: string | null
          organization_id: string
          phone?: string | null
          portfolio_url?: string | null
          preferred_communication?: string | null
          preferred_payment_method?: string | null
          rate_daily?: number | null
          rate_event?: number | null
          rate_hourly?: number | null
          rating?: number | null
          size_measurements?: Json | null
          specialties?: string[] | null
          stage_name?: string | null
          stakeholder_type: string
          state_province?: string | null
          status?: string | null
          style_focus?: string[] | null
          tags?: string[] | null
          tiktok_handle?: string | null
          total_events?: number | null
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
          years_experience?: number | null
          youtube_handle?: string | null
        }
        Update: {
          address?: string | null
          availability?: Json | null
          bio?: string | null
          brand_name?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          facebook_handle?: string | null
          first_name?: string
          id?: string
          instagram_handle?: string | null
          language_preference?: string | null
          last_name?: string
          linkedin_handle?: string | null
          metadata?: Json | null
          notes?: string | null
          organization_id?: string
          phone?: string | null
          portfolio_url?: string | null
          preferred_communication?: string | null
          preferred_payment_method?: string | null
          rate_daily?: number | null
          rate_event?: number | null
          rate_hourly?: number | null
          rating?: number | null
          size_measurements?: Json | null
          specialties?: string[] | null
          stage_name?: string | null
          stakeholder_type?: string
          state_province?: string | null
          status?: string | null
          style_focus?: string[] | null
          tags?: string[] | null
          tiktok_handle?: string | null
          total_events?: number | null
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
          years_experience?: number | null
          youtube_handle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stakeholders_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "stakeholders_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          category: string | null
          color: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      task_comments: {
        Row: {
          body: string
          created_at: string | null
          deleted_at: string | null
          id: string
          task_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          task_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          task_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          actual_hours: number | null
          assigned_by: string | null
          assigned_to: string | null
          body: string | null
          checklist: Json | null
          checklist_completed: number | null
          checklist_total: number | null
          completed_at: string | null
          created_at: string | null
          created_by: string
          custom_fields: Json | null
          deleted_at: string | null
          description: string | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          organization_id: string
          position: number | null
          priority: string | null
          related_to_id: string | null
          related_to_type: string | null
          reminder_at: string | null
          start_date: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          actual_hours?: number | null
          assigned_by?: string | null
          assigned_to?: string | null
          body?: string | null
          checklist?: Json | null
          checklist_completed?: number | null
          checklist_total?: number | null
          completed_at?: string | null
          created_at?: string | null
          created_by: string
          custom_fields?: Json | null
          deleted_at?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          organization_id: string
          position?: number | null
          priority?: string | null
          related_to_id?: string | null
          related_to_type?: string | null
          reminder_at?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          actual_hours?: number | null
          assigned_by?: string | null
          assigned_to?: string | null
          body?: string | null
          checklist?: Json | null
          checklist_completed?: number | null
          checklist_total?: number | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string
          custom_fields?: Json | null
          deleted_at?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          organization_id?: string
          position?: number | null
          priority?: string | null
          related_to_id?: string | null
          related_to_type?: string | null
          reminder_at?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_types: {
        Row: {
          benefits: string[] | null
          category: string | null
          color_hex: string | null
          created_at: string | null
          currency: string
          description: string | null
          display_order: number | null
          early_bird_ends_at: string | null
          early_bird_price: number | null
          event_id: string
          fees_included: boolean | null
          group_discount_percentage: number | null
          group_minimum: number | null
          id: string
          includes_food: boolean | null
          includes_merchandise: boolean | null
          is_featured: boolean | null
          is_visible: boolean | null
          max_per_order: number | null
          metadata: Json | null
          min_per_order: number | null
          name: string
          price: number
          processing_fee_percentage: number | null
          quantity_reserved: number | null
          quantity_sold: number | null
          quantity_total: number
          sales_end_at: string | null
          sales_start_at: string | null
          service_fee: number | null
          tax_rate: number | null
          ticket_type: string | null
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          category?: string | null
          color_hex?: string | null
          created_at?: string | null
          currency?: string
          description?: string | null
          display_order?: number | null
          early_bird_ends_at?: string | null
          early_bird_price?: number | null
          event_id: string
          fees_included?: boolean | null
          group_discount_percentage?: number | null
          group_minimum?: number | null
          id?: string
          includes_food?: boolean | null
          includes_merchandise?: boolean | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          max_per_order?: number | null
          metadata?: Json | null
          min_per_order?: number | null
          name: string
          price?: number
          processing_fee_percentage?: number | null
          quantity_reserved?: number | null
          quantity_sold?: number | null
          quantity_total: number
          sales_end_at?: string | null
          sales_start_at?: string | null
          service_fee?: number | null
          tax_rate?: number | null
          ticket_type?: string | null
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          category?: string | null
          color_hex?: string | null
          created_at?: string | null
          currency?: string
          description?: string | null
          display_order?: number | null
          early_bird_ends_at?: string | null
          early_bird_price?: number | null
          event_id?: string
          fees_included?: boolean | null
          group_discount_percentage?: number | null
          group_minimum?: number | null
          id?: string
          includes_food?: boolean | null
          includes_merchandise?: boolean | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          max_per_order?: number | null
          metadata?: Json | null
          min_per_order?: number | null
          name?: string
          price?: number
          processing_fee_percentage?: number | null
          quantity_reserved?: number | null
          quantity_sold?: number | null
          quantity_total?: number
          sales_end_at?: string | null
          sales_start_at?: string | null
          service_fee?: number | null
          tax_rate?: number | null
          ticket_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_types_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_types_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
        ]
      }
      user_relationships: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          organization_id: string
          relationship_type: string
          role: string | null
          start_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          organization_id: string
          relationship_type: string
          role?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          organization_id?: string
          relationship_type?: string
          role?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_relationships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "user_relationships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_relationships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          permissions: Json | null
          slug: string
          type_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          slug: string
          type_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          slug?: string
          type_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_id: string | null
          avatar_url: string | null
          bio: string | null
          brand_name: string | null
          city: string | null
          collections_count: number | null
          company_name: string | null
          country: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          email: string
          engagement_rate: number | null
          follower_count: number | null
          full_name: string
          height_cm: number | null
          id: string
          instagram_url: string | null
          is_active: boolean | null
          is_deleted: boolean | null
          is_verified: boolean | null
          job_title: string | null
          last_login_at: string | null
          linkedin_url: string | null
          marketing_consent: boolean | null
          measurements: Json | null
          media_outlet: string | null
          metadata: Json | null
          mobile: string | null
          notification_email: boolean | null
          notification_sms: boolean | null
          organization_id: string | null
          phone: string | null
          portfolio_url: string | null
          profile_visibility: boolean | null
          province: string | null
          shoe_size: string | null
          tiktok_url: string | null
          timezone: string | null
          twitter_url: string | null
          updated_at: string | null
          user_type_id: string
          username: string | null
          website: string | null
        }
        Insert: {
          auth_id?: string | null
          avatar_url?: string | null
          bio?: string | null
          brand_name?: string | null
          city?: string | null
          collections_count?: number | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email: string
          engagement_rate?: number | null
          follower_count?: number | null
          full_name: string
          height_cm?: number | null
          id?: string
          instagram_url?: string | null
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_verified?: boolean | null
          job_title?: string | null
          last_login_at?: string | null
          linkedin_url?: string | null
          marketing_consent?: boolean | null
          measurements?: Json | null
          media_outlet?: string | null
          metadata?: Json | null
          mobile?: string | null
          notification_email?: boolean | null
          notification_sms?: boolean | null
          organization_id?: string | null
          phone?: string | null
          portfolio_url?: string | null
          profile_visibility?: boolean | null
          province?: string | null
          shoe_size?: string | null
          tiktok_url?: string | null
          timezone?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_type_id: string
          username?: string | null
          website?: string | null
        }
        Update: {
          auth_id?: string | null
          avatar_url?: string | null
          bio?: string | null
          brand_name?: string | null
          city?: string | null
          collections_count?: number | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string
          engagement_rate?: number | null
          follower_count?: number | null
          full_name?: string
          height_cm?: number | null
          id?: string
          instagram_url?: string | null
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_verified?: boolean | null
          job_title?: string | null
          last_login_at?: string | null
          linkedin_url?: string | null
          marketing_consent?: boolean | null
          measurements?: Json | null
          media_outlet?: string | null
          metadata?: Json | null
          mobile?: string | null
          notification_email?: boolean | null
          notification_sms?: boolean | null
          organization_id?: string | null
          phone?: string | null
          portfolio_url?: string | null
          profile_visibility?: boolean | null
          province?: string | null
          shoe_size?: string | null
          tiktok_url?: string | null
          timezone?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_type_id?: string
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_user_type_id_fkey"
            columns: ["user_type_id"]
            isOneToOne: false
            referencedRelation: "user_types"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_types: {
        Row: {
          category: string | null
          color_code: string | null
          created_at: string | null
          description: string
          icon_name: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          color_code?: string | null
          created_at?: string | null
          description: string
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          color_code?: string | null
          created_at?: string | null
          description?: string
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vendors: {
        Row: {
          availability_status: string | null
          base_daily_rate: number | null
          base_hourly_rate: number | null
          business_address: string | null
          certifications: string[] | null
          city: string | null
          contact_info: Json
          contracted_amount: number | null
          country: string | null
          created_at: string | null
          customer_satisfaction_score: number | null
          equipment_owned: string[] | null
          event_id: string | null
          id: string
          insurance_verified: boolean | null
          languages_spoken: string[] | null
          last_booking_date: string | null
          minimum_booking_amount: number | null
          name: string
          on_time_delivery_percentage: number | null
          organization_id: string
          performance_rating: number | null
          preferred_vendor: boolean | null
          pricing_model: string | null
          repeat_client_rate: number | null
          service_type: string
          slug: string
          specialties: string[] | null
          total_events_completed: number | null
          updated_at: string | null
          vendor_status: string | null
          vendor_type_id: string
          website_url: string | null
          years_in_business: number | null
        }
        Insert: {
          availability_status?: string | null
          base_daily_rate?: number | null
          base_hourly_rate?: number | null
          business_address?: string | null
          certifications?: string[] | null
          city?: string | null
          contact_info?: Json
          contracted_amount?: number | null
          country?: string | null
          created_at?: string | null
          customer_satisfaction_score?: number | null
          equipment_owned?: string[] | null
          event_id?: string | null
          id?: string
          insurance_verified?: boolean | null
          languages_spoken?: string[] | null
          last_booking_date?: string | null
          minimum_booking_amount?: number | null
          name: string
          on_time_delivery_percentage?: number | null
          organization_id: string
          performance_rating?: number | null
          preferred_vendor?: boolean | null
          pricing_model?: string | null
          repeat_client_rate?: number | null
          service_type: string
          slug: string
          specialties?: string[] | null
          total_events_completed?: number | null
          updated_at?: string | null
          vendor_status?: string | null
          vendor_type_id: string
          website_url?: string | null
          years_in_business?: number | null
        }
        Update: {
          availability_status?: string | null
          base_daily_rate?: number | null
          base_hourly_rate?: number | null
          business_address?: string | null
          certifications?: string[] | null
          city?: string | null
          contact_info?: Json
          contracted_amount?: number | null
          country?: string | null
          created_at?: string | null
          customer_satisfaction_score?: number | null
          equipment_owned?: string[] | null
          event_id?: string | null
          id?: string
          insurance_verified?: boolean | null
          languages_spoken?: string[] | null
          last_booking_date?: string | null
          minimum_booking_amount?: number | null
          name?: string
          on_time_delivery_percentage?: number | null
          organization_id?: string
          performance_rating?: number | null
          preferred_vendor?: boolean | null
          pricing_model?: string | null
          repeat_client_rate?: number | null
          service_type?: string
          slug?: string
          specialties?: string[] | null
          total_events_completed?: number | null
          updated_at?: string | null
          vendor_status?: string | null
          vendor_type_id?: string
          website_url?: string | null
          years_in_business?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_vendors_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_vendors_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_vendors_organization"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "fk_vendors_organization"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendors_vendor_type_id_fkey"
            columns: ["vendor_type_id"]
            isOneToOne: false
            referencedRelation: "vendor_types"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          about: string | null
          address_line1: string
          address_line2: string | null
          amenities: string[] | null
          capacity_seated: number | null
          capacity_standing: number | null
          city: string
          contact_email: string
          contact_name: string
          contact_phone: string
          country: string | null
          created_at: string | null
          daily_rate: number | null
          description: string | null
          facebook_url: string | null
          hourly_rate: number | null
          id: string
          indoor_space: boolean | null
          instagram_url: string | null
          linkedin_url: string | null
          metadata: Json | null
          name: string
          operating_hours: Json | null
          organization_id: string
          outdoor_space: boolean | null
          owner_user_id: string | null
          parking_available: boolean | null
          postal_code: string
          province: string
          slug: string
          status: string | null
          tiktok_url: string | null
          updated_at: string | null
          venue_type: string | null
          website: string | null
          wheelchair_accessible: boolean | null
          wifi_available: boolean | null
          youtube_url: string | null
        }
        Insert: {
          about?: string | null
          address_line1: string
          address_line2?: string | null
          amenities?: string[] | null
          capacity_seated?: number | null
          capacity_standing?: number | null
          city: string
          contact_email: string
          contact_name: string
          contact_phone: string
          country?: string | null
          created_at?: string | null
          daily_rate?: number | null
          description?: string | null
          facebook_url?: string | null
          hourly_rate?: number | null
          id?: string
          indoor_space?: boolean | null
          instagram_url?: string | null
          linkedin_url?: string | null
          metadata?: Json | null
          name: string
          operating_hours?: Json | null
          organization_id: string
          outdoor_space?: boolean | null
          owner_user_id?: string | null
          parking_available?: boolean | null
          postal_code: string
          province: string
          slug: string
          status?: string | null
          tiktok_url?: string | null
          updated_at?: string | null
          venue_type?: string | null
          website?: string | null
          wheelchair_accessible?: boolean | null
          wifi_available?: boolean | null
          youtube_url?: string | null
        }
        Update: {
          about?: string | null
          address_line1?: string
          address_line2?: string | null
          amenities?: string[] | null
          capacity_seated?: number | null
          capacity_standing?: number | null
          city?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          country?: string | null
          created_at?: string | null
          daily_rate?: number | null
          description?: string | null
          facebook_url?: string | null
          hourly_rate?: number | null
          id?: string
          indoor_space?: boolean | null
          instagram_url?: string | null
          linkedin_url?: string | null
          metadata?: Json | null
          name?: string
          operating_hours?: Json | null
          organization_id?: string
          outdoor_space?: boolean | null
          owner_user_id?: string | null
          parking_available?: boolean | null
          postal_code?: string
          province?: string
          slug?: string
          status?: string | null
          tiktok_url?: string | null
          updated_at?: string | null
          venue_type?: string | null
          website?: string | null
          wheelchair_accessible?: boolean | null
          wifi_available?: boolean | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venues_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "venues_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venues_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_logs: {
        Row: {
          created_at: string | null
          endpoint_url: string
          error_message: string | null
          event_id: string | null
          headers: Json | null
          http_method: string | null
          id: string
          max_retries: number | null
          metadata: Json | null
          next_retry_at: string | null
          organization_id: string | null
          payload: Json | null
          response_body: string | null
          response_status: number | null
          response_time_ms: number | null
          retry_count: number | null
          success: boolean | null
          webhook_type: string
        }
        Insert: {
          created_at?: string | null
          endpoint_url: string
          error_message?: string | null
          event_id?: string | null
          headers?: Json | null
          http_method?: string | null
          id?: string
          max_retries?: number | null
          metadata?: Json | null
          next_retry_at?: string | null
          organization_id?: string | null
          payload?: Json | null
          response_body?: string | null
          response_status?: number | null
          response_time_ms?: number | null
          retry_count?: number | null
          success?: boolean | null
          webhook_type: string
        }
        Update: {
          created_at?: string | null
          endpoint_url?: string
          error_message?: string | null
          event_id?: string | null
          headers?: Json | null
          http_method?: string | null
          id?: string
          max_retries?: number | null
          metadata?: Json | null
          next_retry_at?: string | null
          organization_id?: string | null
          payload?: Json | null
          response_body?: string | null
          response_status?: number | null
          response_time_ms?: number | null
          retry_count?: number | null
          success?: boolean | null
          webhook_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "webhook_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_api_integration: {
        Row: {
          api_key: string
          api_name: string
          api_secret: string | null
          api_url: string
          business_account_id: string | null
          configuration: Json | null
          created_at: string | null
          health_status: string | null
          id: string
          last_health_check: string | null
          organization_id: string | null
          phone_number_id: string | null
          rate_limit_per_hour: number | null
          rate_limit_per_minute: number | null
          status: string | null
          updated_at: string | null
          webhook_url: string | null
          webhook_verification_token: string | null
        }
        Insert: {
          api_key: string
          api_name: string
          api_secret?: string | null
          api_url: string
          business_account_id?: string | null
          configuration?: Json | null
          created_at?: string | null
          health_status?: string | null
          id?: string
          last_health_check?: string | null
          organization_id?: string | null
          phone_number_id?: string | null
          rate_limit_per_hour?: number | null
          rate_limit_per_minute?: number | null
          status?: string | null
          updated_at?: string | null
          webhook_url?: string | null
          webhook_verification_token?: string | null
        }
        Update: {
          api_key?: string
          api_name?: string
          api_secret?: string | null
          api_url?: string
          business_account_id?: string | null
          configuration?: Json | null
          created_at?: string | null
          health_status?: string | null
          id?: string
          last_health_check?: string | null
          organization_id?: string | null
          phone_number_id?: string | null
          rate_limit_per_hour?: number | null
          rate_limit_per_minute?: number | null
          status?: string | null
          updated_at?: string | null
          webhook_url?: string | null
          webhook_verification_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_api_integration_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "mv_organization_metrics"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "whatsapp_api_integration_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_event_notifications: {
        Row: {
          created_at: string | null
          delivered_time: string | null
          error_message: string | null
          event_id: string | null
          id: string
          max_retries: number | null
          message: string
          notification_status: string | null
          notification_type: string
          read_time: string | null
          retry_count: number | null
          scheduled_time: string | null
          sent_time: string | null
          updated_at: string | null
          user_id: string | null
          whatsapp_message_id: string | null
        }
        Insert: {
          created_at?: string | null
          delivered_time?: string | null
          error_message?: string | null
          event_id?: string | null
          id?: string
          max_retries?: number | null
          message: string
          notification_status?: string | null
          notification_type: string
          read_time?: string | null
          retry_count?: number | null
          scheduled_time?: string | null
          sent_time?: string | null
          updated_at?: string | null
          user_id?: string | null
          whatsapp_message_id?: string | null
        }
        Update: {
          created_at?: string | null
          delivered_time?: string | null
          error_message?: string | null
          event_id?: string | null
          id?: string
          max_retries?: number | null
          message?: string
          notification_status?: string | null
          notification_type?: string
          read_time?: string | null
          retry_count?: number | null
          scheduled_time?: string | null
          sent_time?: string | null
          updated_at?: string | null
          user_id?: string | null
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_event_notifications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_event_notifications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "whatsapp_event_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_event_signups: {
        Row: {
          confirmation_sent: boolean | null
          created_at: string | null
          event_id: string | null
          id: string
          payment_status: string | null
          phone_number: string
          quantity: number | null
          signup_source: string | null
          signup_status: string | null
          signup_time: string | null
          ticket_type: string | null
          total_amount: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          confirmation_sent?: boolean | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          payment_status?: string | null
          phone_number: string
          quantity?: number | null
          signup_source?: string | null
          signup_status?: string | null
          signup_time?: string | null
          ticket_type?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          confirmation_sent?: boolean | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          payment_status?: string | null
          phone_number?: string
          quantity?: number | null
          signup_source?: string | null
          signup_status?: string | null
          signup_time?: string | null
          ticket_type?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_event_signups_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_event_signups_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "real_time_event_metrics"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "whatsapp_event_signups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      mv_organization_metrics: {
        Row: {
          active_events: number | null
          last_refreshed: string | null
          organization_id: string | null
          organization_name: string | null
          total_contacts: number | null
          total_events: number | null
          total_registrations: number | null
          total_revenue: number | null
          upcoming_events: number | null
        }
        Relationships: []
      }
      real_time_event_metrics: {
        Row: {
          capacity: number | null
          capacity_percentage: number | null
          checked_in_count: number | null
          confirmed_count: number | null
          event_id: string | null
          event_name: string | null
          metrics: Json | null
          revenue: number | null
          start_date: string | null
          waitlist_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      assign_seat_auto: {
        Args: { p_preferred_section_type?: string; p_registration_id: string }
        Returns: {
          message: string
          row_number: number
          seat_number: number
          section_id: string
          section_name: string
          success: boolean
        }[]
      }
      calculate_contact_score: {
        Args: { p_contact_id: string }
        Returns: {
          activity_score: number
          engagement_score: number
          score_grade: string
          total_score: number
          value_score: number
        }[]
      }
      calculate_event_revenue: {
        Args: { event_id_param: string }
        Returns: {
          sponsorship_revenue: number
          ticket_revenue: number
          total_revenue: number
        }[]
      }
      calculate_event_roi: {
        Args: { p_event_id: string }
        Returns: {
          net_profit: number
          roi_percentage: number
          total_cost: number
          total_revenue: number
        }[]
      }
      calculate_ticket_price: {
        Args: {
          p_promo_code?: string
          p_quantity?: number
          p_ticket_type_id: string
        }
        Returns: {
          base_price: number
          early_bird_discount: number
          final_price: number
          group_discount: number
          promo_discount: number
          savings: number
          total_price: number
        }[]
      }
      check_data_quality: {
        Args: Record<PropertyKey, never>
        Returns: {
          check_name: string
          details: string
          status: string
        }[]
      }
      check_event_capacity: {
        Args: { p_event_id: string }
        Returns: {
          available_spots: number
          confirmed_count: number
          event_id: string
          is_full: boolean
          is_soldout: boolean
          total_capacity: number
          utilization_percentage: number
          waitlist_count: number
        }[]
      }
      check_ticket_availability: {
        Args: { quantity: number; ticket_type_id_param: string }
        Returns: boolean
      }
      check_venue_availability: {
        Args: {
          p_end_time: string
          p_exclude_event_id?: string
          p_start_time: string
          p_venue_id: string
        }
        Returns: {
          conflicting_events: Json
          is_available: boolean
        }[]
      }
      cleanup_old_data: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      create_org_rls_policies: {
        Args: { table_name: string }
        Returns: undefined
      }
      export_attendee_list: {
        Args: { p_event_id: string; p_status?: string[] }
        Returns: {
          checked_in: boolean
          company: string
          email: string
          full_name: string
          job_title: string
          phone: string
          registered_at: string
          registration_number: string
          seat_assignment: string
          status: string
        }[]
      }
      final_system_check: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          score: number
          status: string
        }[]
      }
      generate_invoice: {
        Args: { p_payment_id?: string; p_registration_id: string }
        Returns: string
      }
      get_auth_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_event_rsvp_summary: {
        Args: { event_uuid: string }
        Returns: {
          count: number
          status: string
          total_guests: number
        }[]
      }
      get_event_statistics: {
        Args: { p_event_id: string }
        Returns: Json
      }
      get_organization_metrics: {
        Args: { p_org_id: string }
        Returns: {
          metric_name: string
          metric_unit: string
          metric_value: number
          trend: string
        }[]
      }
      get_user_organizations: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      has_organization_access: {
        Args: { org_id: string }
        Returns: boolean
      }
      migrate_communication_data: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      monitor_data_quality: {
        Args: Record<PropertyKey, never>
        Returns: {
          affected_count: number
          details: string
          issue_type: string
          severity: string
        }[]
      }
      monitor_slow_queries: {
        Args: { p_threshold_ms?: number }
        Returns: {
          calls: number
          mean_time: number
          query_text: string
          query_type: string
          total_time: number
        }[]
      }
      process_all_waitlists: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      process_notification_queue: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      process_refund: {
        Args: {
          p_amount: number
          p_initiated_by: string
          p_payment_id: string
          p_reason: string
        }
        Returns: string
      }
      process_waitlist: {
        Args: { p_event_id: string }
        Returns: {
          new_confirmed: Json
          notifications_sent: number
          processed_count: number
        }[]
      }
      refresh_organization_metrics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      schedule_event_reminder: {
        Args: {
          p_event_id: string
          p_hours_before: number
          p_reminder_type: string
          p_target_audience?: string
        }
        Returns: string
      }
      schedule_rsvp_reminders: {
        Args: { event_uuid: string; reminder_hours_before?: number }
        Returns: number
      }
      send_email: {
        Args: {
          p_content: string
          p_organization_id?: string
          p_subject: string
          p_template_data?: Json
          p_template_id?: string
          p_to: string
        }
        Returns: string
      }
      send_rsvp_reminder: {
        Args: {
          p_escalation_level?: number
          p_event_id: string
          p_user_id: string
        }
        Returns: string
      }
      system_health_check: {
        Args: Record<PropertyKey, never>
        Returns: {
          checked_at: string
          component: string
          details: Json
          status: string
        }[]
      }
      test_communication_performance: {
        Args: Record<PropertyKey, never>
        Returns: {
          execution_time: string
          status: string
          test_name: string
        }[]
      }
      validate_payment: {
        Args: { p_expected_amount?: number; p_payment_id: string }
        Returns: boolean
      }
      verify_consolidation_success: {
        Args: Record<PropertyKey, never>
        Returns: {
          check_name: string
          details: string
          status: string
        }[]
      }
    }
    Enums: {
      event_status:
        | "draft"
        | "published"
        | "ongoing"
        | "completed"
        | "cancelled"
      invoice_status:
        | "draft"
        | "sent"
        | "viewed"
        | "paid"
        | "overdue"
        | "cancelled"
      opportunity_stage:
        | "lead"
        | "qualified"
        | "proposal"
        | "negotiation"
        | "won"
        | "lost"
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "refunded"
      registration_status:
        | "pending"
        | "confirmed"
        | "waitlisted"
        | "cancelled"
        | "no_show"
      task_status: "todo" | "in_progress" | "review" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_status: ["draft", "published", "ongoing", "completed", "cancelled"],
      invoice_status: [
        "draft",
        "sent",
        "viewed",
        "paid",
        "overdue",
        "cancelled",
      ],
      opportunity_stage: [
        "lead",
        "qualified",
        "proposal",
        "negotiation",
        "won",
        "lost",
      ],
      payment_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "refunded",
      ],
      registration_status: [
        "pending",
        "confirmed",
        "waitlisted",
        "cancelled",
        "no_show",
      ],
      task_status: ["todo", "in_progress", "review", "completed", "cancelled"],
    },
  },
} as const
