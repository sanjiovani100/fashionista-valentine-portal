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
      model_applications: {
        Row: {
          application_id: string
          bust: number
          height: number
          id: string
          instagram_handle: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
