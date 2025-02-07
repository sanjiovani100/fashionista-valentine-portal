export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          location: string;
          capacity: number;
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'>;
      };
      tickets: {
        Row: {
          id: string;
          event_id: string;
          type: 'regular' | 'vip' | 'early_bird';
          price: number;
          quantity: number;
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['tickets']['Row'], 'id' | 'created_at' | 'updated_at'>;
      };
      transactions: {
        Row: {
          id: string;
          ticket_id: string;
          user_id: string;
          quantity: number;
          total_amount: number;
          payment_intent_id: string;
          created_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at'>;
      };
      sponsors: {
        Row: {
          id: string;
          name: string;
          level: 'gold' | 'silver' | 'bronze';
          benefits: string[];
          contact_email: string;
          created_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['sponsors']['Row'], 'id' | 'created_at'>;
      };
      sponsor_analytics: {
        Row: {
          id: string;
          sponsor_id: string;
          views: number;
          clicks: number;
          conversions: number;
          created_at?: string;
        };
      };
    };
  };
}; 