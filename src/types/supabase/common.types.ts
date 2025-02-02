export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: Record<string, any>;
    Views: Record<string, any>;
    Functions: Record<string, any>;
    Enums: Record<string, any>;
    CompositeTypes: {
      [_ in never]: never;
    }
  }
}

export type PublicSchema = Database[Extract<keyof Database, "public">]