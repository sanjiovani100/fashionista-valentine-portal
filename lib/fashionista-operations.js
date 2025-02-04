import { db } from './supabase-client.js'
import { dbOps } from './database-operations.js'

/**
 * Fashionista Portal specific database operations
 */
export const fashionistaOps = {
  /**
   * Initialize all required tables for the Fashionista Portal
   */
  async initializeTables() {
    try {
      // Events table
      const eventsSchema = {
        id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
        title: 'text NOT NULL',
        description: 'text',
        event_date: 'timestamp with time zone NOT NULL',
        location: 'text NOT NULL',
        category: 'text NOT NULL', // Fashion show, workshop, meetup, etc.
        max_participants: 'integer NOT NULL',
        registration_deadline: 'timestamp with time zone NOT NULL',
        ticket_price: 'decimal DEFAULT 0',
        status: 'text DEFAULT \'upcoming\'',
        featured_image_url: 'text',
        created_by: 'uuid DEFAULT auth.uid()',
        created_at: 'timestamp with time zone DEFAULT now()',
        updated_at: 'timestamp with time zone DEFAULT now()'
      }

      // Profiles table (Fashion Professionals & Enthusiasts)
      const profilesSchema = {
        id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
        user_id: 'uuid REFERENCES auth.users(id) UNIQUE',
        first_name: 'text NOT NULL',
        last_name: 'text NOT NULL',
        email: 'text NOT NULL',
        phone: 'text',
        bio: 'text',
        profession: 'text', // Designer, Model, Photographer, etc.
        expertise_level: 'text', // Beginner, Intermediate, Professional
        specialties: 'text[]', // Array of fashion specialties
        portfolio_url: 'text',
        social_media: 'jsonb', // Social media links
        achievements: 'jsonb[]', // Array of fashion-related achievements
        avatar_url: 'text',
        created_at: 'timestamp with time zone DEFAULT now()',
        updated_at: 'timestamp with time zone DEFAULT now()'
      }

      // Registrations table
      const registrationsSchema = {
        id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
        event_id: 'uuid REFERENCES events(id)',
        user_id: 'uuid REFERENCES auth.users(id)',
        registration_type: 'text NOT NULL', // Attendee, Presenter, Staff
        ticket_number: 'text',
        payment_status: 'text DEFAULT \'pending\'',
        payment_amount: 'decimal',
        special_requirements: 'text',
        check_in_status: 'boolean DEFAULT false',
        created_at: 'timestamp with time zone DEFAULT now()',
        updated_at: 'timestamp with time zone DEFAULT now()'
      }

      // Collections table (Fashion Collections/Showcases)
      const collectionsSchema = {
        id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
        user_id: 'uuid REFERENCES auth.users(id)',
        title: 'text NOT NULL',
        description: 'text',
        category: 'text NOT NULL',
        season: 'text',
        year: 'integer',
        status: 'text DEFAULT \'draft\'',
        featured_image_url: 'text',
        images: 'jsonb[]',
        tags: 'text[]',
        created_at: 'timestamp with time zone DEFAULT now()',
        updated_at: 'timestamp with time zone DEFAULT now()'
      }

      // Create tables
      const tables = [
        { 
          name: 'events', 
          schema: eventsSchema
        },
        { 
          name: 'profiles', 
          schema: profilesSchema,
          postCreate: `
            DO $$ 
            BEGIN
              IF NOT EXISTS (
                SELECT 1 FROM pg_constraint WHERE conname = 'email_check'
              ) THEN
                ALTER TABLE profiles ADD CONSTRAINT email_check 
                CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');
              END IF;
            END $$;
          `
        },
        { 
          name: 'registrations', 
          schema: registrationsSchema,
          postCreate: `
            DO $$ 
            BEGIN
              IF NOT EXISTS (
                SELECT 1 FROM pg_constraint WHERE conname = 'registrations_event_user_key'
              ) THEN
                ALTER TABLE registrations 
                ADD CONSTRAINT registrations_event_user_key 
                UNIQUE (event_id, user_id);
              END IF;
            END $$;
          `
        },
        { 
          name: 'collections', 
          schema: collectionsSchema
        }
      ]

      for (const table of tables) {
        // Create table
        const { error } = await dbOps.createTable(table.name, table.schema)
        if (error) throw error

        // Execute post-create SQL if any
        if (table.postCreate) {
          const { error: postError } = await db.executeSQL(table.postCreate)
          if (postError) throw postError
        }

        // Enable RLS
        const { error: rlsError } = await dbOps.enableRLS(table.name)
        if (rlsError) throw rlsError

        // Create indexes
        const { error: indexError } = await dbOps.createIndexes(table.name, [
          'created_at',
          'updated_at',
          table.name === 'events' ? 'event_date' : null,
          table.name === 'events' ? 'category' : null,
          table.name === 'registrations' ? 'user_id' : null,
          table.name === 'registrations' ? 'event_id' : null,
          table.name === 'profiles' ? 'user_id' : null,
          table.name === 'profiles' ? 'profession' : null,
          table.name === 'collections' ? 'user_id' : null,
          table.name === 'collections' ? 'category' : null
        ].filter(Boolean))
        if (indexError) throw indexError
      }

      return { success: true }
    } catch (error) {
      console.error('Error initializing tables:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  /**
   * Create or update a fashion professional profile
   * @param {Object} profile - Profile data
   */
  async upsertProfile(profile) {
    try {
      const { data, error } = await db.insert('profiles', {
        ...profile,
        updated_at: new Date().toISOString()
      })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error upserting profile:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  /**
   * Create a new fashion event
   * @param {Object} event - Event data
   */
  async createEvent(event) {
    try {
      const { data, error } = await db.insert('events', {
        ...event,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error creating event:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  /**
   * Register for a fashion event
   * @param {string} eventId - Event ID
   * @param {string} userId - User ID
   * @param {Object} registrationDetails - Registration details
   */
  async registerForEvent(eventId, userId, registrationDetails) {
    try {
      const { data, error } = await db.insert('registrations', {
        event_id: eventId,
        user_id: userId,
        ...registrationDetails,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error registering for event:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  /**
   * Create or update a fashion collection
   * @param {Object} collection - Collection data
   */
  async upsertCollection(collection) {
    try {
      const { data, error } = await db.insert('collections', {
        ...collection,
        updated_at: new Date().toISOString()
      })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error upserting collection:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  }
} 