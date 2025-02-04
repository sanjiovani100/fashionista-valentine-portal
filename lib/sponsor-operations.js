import { db } from './supabase-client.js'
import { dbOps } from './database-operations.js'

/**
 * Sponsor Portal specific database operations
 */
export const sponsorOps = {
  /**
   * Initialize all required tables for sponsor management
   */
  async initializeTables() {
    try {
      // Sponsors table
      const sponsorsSchema = {
        id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
        company_name: 'text NOT NULL',
        industry: 'text NOT NULL',
        website_url: 'text',
        logo_url: 'text',
        description: 'text',
        sponsorship_level: 'text', // Platinum, Gold, Silver, etc.
        sponsorship_amount: 'decimal',
        status: 'sponsor_status DEFAULT \'pending\'::sponsor_status',
        created_by: 'uuid DEFAULT auth.uid()',
        created_at: 'timestamp with time zone DEFAULT now()',
        updated_at: 'timestamp with time zone DEFAULT now()'
      }

      // Sponsor Contacts table
      const sponsorContactsSchema = {
        id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
        sponsor_id: 'uuid REFERENCES sponsors(id)',
        first_name: 'text NOT NULL',
        last_name: 'text NOT NULL',
        email: 'text NOT NULL',
        phone: 'text',
        position: 'text',
        is_primary: 'boolean DEFAULT false',
        created_at: 'timestamp with time zone DEFAULT now()',
        updated_at: 'timestamp with time zone DEFAULT now()'
      }

      // Sponsorship Packages table
      const sponsorshipPackagesSchema = {
        id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
        name: 'text NOT NULL',
        level: 'text NOT NULL', // Platinum, Gold, Silver, etc.
        price: 'decimal NOT NULL',
        description: 'text',
        benefits: 'jsonb[]', // Array of benefits
        max_sponsors: 'integer',
        is_active: 'boolean DEFAULT true',
        created_at: 'timestamp with time zone DEFAULT now()',
        updated_at: 'timestamp with time zone DEFAULT now()'
      }

      // Sponsorship Benefits table
      const sponsorshipBenefitsSchema = {
        id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
        sponsor_id: 'uuid REFERENCES sponsors(id)',
        package_id: 'uuid REFERENCES sponsorship_packages(id)',
        benefit_name: 'text NOT NULL',
        benefit_description: 'text',
        status: 'benefit_status DEFAULT \'pending\'::benefit_status',
        fulfillment_date: 'timestamp with time zone',
        notes: 'text',
        created_at: 'timestamp with time zone DEFAULT now()',
        updated_at: 'timestamp with time zone DEFAULT now()'
      }

      // Create tables
      const tables = [
        { 
          name: 'sponsors', 
          schema: sponsorsSchema,
          preCreate: `
            DO $$ 
            BEGIN
              IF NOT EXISTS (
                SELECT 1 FROM pg_type WHERE typname = 'sponsor_status'
              ) THEN
                CREATE TYPE sponsor_status AS ENUM ('pending', 'approved', 'rejected');
              END IF;
            END $$;
          `
        },
        { 
          name: 'sponsor_contacts', 
          schema: sponsorContactsSchema,
          postCreate: `
            DO $$ 
            BEGIN
              IF NOT EXISTS (
                SELECT 1 FROM pg_constraint WHERE conname = 'sponsor_contacts_email_check'
              ) THEN
                ALTER TABLE sponsor_contacts 
                ADD CONSTRAINT sponsor_contacts_email_check 
                CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');
              END IF;
            END $$;
          `
        },
        { 
          name: 'sponsorship_packages', 
          schema: sponsorshipPackagesSchema
        },
        { 
          name: 'sponsorship_benefits', 
          schema: sponsorshipBenefitsSchema,
          preCreate: `
            DO $$ 
            BEGIN
              IF NOT EXISTS (
                SELECT 1 FROM pg_type WHERE typname = 'benefit_status'
              ) THEN
                CREATE TYPE benefit_status AS ENUM ('pending', 'fulfilled', 'cancelled');
              END IF;
            END $$;
          `
        }
      ]

      for (const table of tables) {
        // Execute pre-create SQL if any
        if (table.preCreate) {
          const { error: preError } = await db.executeSQL(table.preCreate)
          if (preError) throw preError
        }

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
          table.name === 'sponsors' ? 'sponsorship_level' : null,
          table.name === 'sponsors' ? 'status' : null,
          table.name === 'sponsor_contacts' ? 'sponsor_id' : null,
          table.name === 'sponsor_contacts' ? 'email' : null,
          table.name === 'sponsorship_packages' ? 'level' : null,
          table.name === 'sponsorship_benefits' ? 'sponsor_id' : null,
          table.name === 'sponsorship_benefits' ? 'package_id' : null,
          table.name === 'sponsorship_benefits' ? 'status' : null
        ].filter(Boolean))
        if (indexError) throw indexError
      }

      return { success: true }
    } catch (error) {
      console.error('Error initializing sponsor tables:', error)
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
   * Create a new sponsor application
   * @param {Object} sponsorData - Sponsor application data
   * @param {Object} contactData - Primary contact data
   */
  async createSponsorApplication(sponsorData, contactData) {
    try {
      // Create sponsor record
      const { data: sponsor, error: sponsorError } = await db.insert('sponsors', {
        ...sponsorData,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      if (sponsorError) throw sponsorError

      if (!sponsor || sponsor.length === 0) {
        throw new Error('Failed to create sponsor record')
      }

      // Add primary contact
      const { error: contactError } = await db.insert('sponsor_contacts', {
        ...contactData,
        sponsor_id: sponsor[0].id,
        is_primary: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      if (contactError) throw contactError

      return { success: true, data: sponsor[0] }
    } catch (error) {
      console.error('Error creating sponsor application:', error)
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
   * Update sponsor application status
   * @param {string} sponsorId - Sponsor ID
   * @param {string} status - New status
   * @param {string} packageId - Optional sponsorship package ID
   */
  async updateSponsorStatus(sponsorId, status, packageId = null) {
    try {
      if (!sponsorId) {
        throw new Error('Sponsor ID is required')
      }

      const updates = {
        status,
        updated_at: new Date().toISOString()
      }

      if (packageId && status === 'approved') {
        // Get package details
        const { data: package_data, error: packageError } = await db.get(
          'sponsorship_packages',
          {
            filter: 'id',
            value: packageId
          }
        )
        if (packageError) throw packageError
        if (!package_data || package_data.length === 0) {
          throw new Error('Sponsorship package not found')
        }

        // Add sponsorship level and amount from package
        updates.sponsorship_level = package_data[0].level
        updates.sponsorship_amount = package_data[0].price

        // Create benefits
        const benefits = package_data[0].benefits || []
        for (const benefit of benefits) {
          const { error: benefitError } = await db.insert('sponsorship_benefits', {
            sponsor_id: sponsorId,
            package_id: packageId,
            benefit_name: benefit.name,
            benefit_description: benefit.description,
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          if (benefitError) throw benefitError
        }
      }

      const { data, error } = await db.update('sponsors', sponsorId, updates)
      if (error) throw error

      return { success: true, data }
    } catch (error) {
      console.error('Error updating sponsor status:', error)
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
   * Get sponsor details with contacts and benefits
   * @param {string} sponsorId - Sponsor ID
   */
  async getSponsorDetails(sponsorId) {
    try {
      const { data: sponsor, error: sponsorError } = await db.get('sponsors', {
        filter: 'id',
        value: sponsorId
      });
      if (sponsorError) throw sponsorError
      if (!sponsor || sponsor.length === 0) {
        throw new Error('Sponsor not found');
      }

      const { data: contacts, error: contactsError } = await db.get('sponsor_contacts', {
        filter: 'sponsor_id',
        value: sponsorId
      });
      if (contactsError) throw contactsError

      const { data: benefits, error: benefitsError } = await db.get('sponsorship_benefits', {
        filter: 'sponsor_id',
        value: sponsorId
      });
      if (benefitsError) throw benefitsError

      return {
        success: true,
        data: {
          ...sponsor[0],
          contacts: contacts || [],
          benefits: benefits || []
        }
      }
    } catch (error) {
      console.error('Error getting sponsor details:', error)
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
   * Payment Operations
   */

  async createPayment(sponsorId, packageId, paymentData) {
    try {
      if (!sponsorId || !packageId) {
        throw new Error('Sponsor ID and Package ID are required')
      }

      const payment = {
        sponsor_id: sponsorId,
        package_id: packageId,
        amount: paymentData.amount,
        payment_method: paymentData.paymentMethod,
        status: 'pending',
        notes: paymentData.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await db.insert('sponsor_payments', payment)
      if (error) throw error

      // Log the activity
      await this.logActivity(sponsorId, 'payment_created', 'Payment created', {
        payment_id: data[0].id,
        amount: paymentData.amount
      })

      return { success: true, data: data[0] }
    } catch (error) {
      console.error('Error creating payment:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  async updatePaymentStatus(paymentId, status, notes = '') {
    try {
      if (!paymentId) {
        throw new Error('Payment ID is required')
      }

      const { data: payment, error: fetchError } = await db.get('sponsor_payments', {
        filter: 'id',
        value: paymentId
      })
      if (fetchError) throw fetchError
      if (!payment || payment.length === 0) {
        throw new Error('Payment not found')
      }

      const updates = {
        status,
        notes: notes ? notes : payment[0].notes,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await db.update('sponsor_payments', paymentId, updates)
      if (error) throw error

      // Log the activity
      await this.logActivity(payment[0].sponsor_id, 'payment_status_updated', 
        `Payment status updated to ${status}`, {
          payment_id: paymentId,
          old_status: payment[0].status,
          new_status: status
        }
      )

      return { success: true, data }
    } catch (error) {
      console.error('Error updating payment status:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  async getPaymentHistory(sponsorId) {
    try {
      if (!sponsorId) {
        throw new Error('Sponsor ID is required')
      }

      const { data, error } = await db.get('sponsor_payments', {
        filter: 'sponsor_id',
        value: sponsorId
      })
      if (error) throw error

      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error getting payment history:', error)
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
   * Document Operations
   */

  async uploadDocument(sponsorId, documentData) {
    try {
      if (!sponsorId || !documentData.documentUrl) {
        throw new Error('Sponsor ID and document URL are required')
      }

      const document = {
        sponsor_id: sponsorId,
        document_type: documentData.documentType,
        document_url: documentData.documentUrl,
        file_name: documentData.fileName,
        file_size: documentData.fileSize,
        mime_type: documentData.mimeType,
        notes: documentData.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await db.insert('sponsor_documents', document)
      if (error) throw error

      // Log the activity
      await this.logActivity(sponsorId, 'document_uploaded', 
        `Document uploaded: ${documentData.fileName}`, {
          document_id: data[0].id,
          document_type: documentData.documentType
        }
      )

      return { success: true, data: data[0] }
    } catch (error) {
      console.error('Error uploading document:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  async verifyDocument(documentId, verifiedBy) {
    try {
      if (!documentId) {
        throw new Error('Document ID is required')
      }

      const { data: document, error: fetchError } = await db.get('sponsor_documents', {
        filter: 'id',
        value: documentId
      })
      if (fetchError) throw fetchError
      if (!document || document.length === 0) {
        throw new Error('Document not found')
      }

      const updates = {
        is_verified: true,
        verification_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await db.update('sponsor_documents', documentId, updates)
      if (error) throw error

      // Log the activity
      await this.logActivity(document[0].sponsor_id, 'document_verified', 
        `Document verified: ${document[0].file_name}`, {
          document_id: documentId,
          verified_by: verifiedBy
        }
      )

      return { success: true, data }
    } catch (error) {
      console.error('Error verifying document:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  async getDocuments(sponsorId, documentType = null) {
    try {
      if (!sponsorId) {
        throw new Error('Sponsor ID is required')
      }

      let query = {
        filter: 'sponsor_id',
        value: sponsorId
      }

      if (documentType) {
        query.additionalFilters = {
          document_type: documentType
        }
      }

      const { data, error } = await db.get('sponsor_documents', query)
      if (error) throw error

      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error getting documents:', error)
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
   * Activity Logging Operations
   */

  async logActivity(sponsorId, activityType, description, metadata = {}) {
    try {
      if (!sponsorId || !activityType) {
        throw new Error('Sponsor ID and activity type are required')
      }

      const activity = {
        sponsor_id: sponsorId,
        activity_type: activityType,
        description,
        metadata,
        performed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await db.insert('sponsor_activities', activity)
      if (error) throw error

      return { success: true, data: data[0] }
    } catch (error) {
      console.error('Error logging activity:', error)
      return {
        success: false,
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  async getActivityLog(sponsorId, limit = 50) {
    try {
      if (!sponsorId) {
        throw new Error('Sponsor ID is required')
      }

      const { data, error } = await db.get('sponsor_activities', {
        filter: 'sponsor_id',
        value: sponsorId,
        orderBy: 'performed_at',
        orderDirection: 'desc',
        limit
      })
      if (error) throw error

      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error getting activity log:', error)
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