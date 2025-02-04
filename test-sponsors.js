import { verifyConnection, db, supabase } from './lib/supabase-client.js'
import { sponsorOps } from './lib/sponsor-operations.js'

async function testSponsorSetup() {
  try {
    console.log('Testing Supabase connection...')
    const isConnected = await verifyConnection()
    if (!isConnected) {
      throw new Error('Failed to connect to Supabase')
    }
    console.log('Successfully connected to Supabase')

    // Use a mock user ID for testing
    const testUserId = '00000000-0000-0000-0000-000000000000'
    console.log('Using mock user ID for testing')

    // Initialize tables
    console.log('\nInitializing sponsor tables...')
    const { error: initError } = await sponsorOps.initializeTables()
    if (initError) throw initError
    console.log('Tables initialized successfully')

    // Create sponsorship package
    console.log('\nCreating sponsorship package...')
    const testPackage = {
      name: 'Platinum Sponsor Package',
      level: 'Platinum',
      price: 5000.00,
      description: 'Premium sponsorship package with maximum visibility',
      benefits: [
        {
          name: 'Logo on Main Stage',
          description: 'Prominent logo placement on the main stage'
        },
        {
          name: 'VIP Passes',
          description: '5 VIP passes to all events'
        },
        {
          name: 'Speaking Slot',
          description: '30-minute speaking slot during main event'
        }
      ],
      max_sponsors: 3,
      is_active: true
    }

    const { error: packageError } = await db.insert('sponsorship_packages', testPackage)
    if (packageError) throw packageError
    console.log('Sponsorship package created successfully')

    // Test sponsor application
    console.log('\nTesting sponsor application...')
    const sponsorData = {
      company_name: 'Fashion Tech Innovations',
      industry: 'Technology',
      website_url: 'https://fashiontech.example.com',
      logo_url: 'https://fashiontech.example.com/logo.png',
      description: 'Leading provider of fashion technology solutions',
      created_by: testUserId
    }

    const contactData = {
      first_name: 'John',
      last_name: 'Smith',
      email: 'john@fashiontech.example.com',
      phone: '1234567890',
      position: 'Marketing Director'
    }

    const { data: sponsorApp, error: appError } = await sponsorOps.createSponsorApplication(
      sponsorData,
      contactData
    )
    if (appError) throw appError
    console.log('Sponsor application created successfully')

    // Test sponsor status update
    console.log('\nTesting sponsor status update...')
    const { data: packages, error: packageQueryError } = await db.get('sponsorship_packages', {
      filter: 'level',
      value: 'Platinum'
    })
    if (packageQueryError) throw packageQueryError
    if (!packages || packages.length === 0) {
      throw new Error('No sponsorship package found')
    }

    const { error: statusError } = await sponsorOps.updateSponsorStatus(
      sponsorApp.id,
      'approved',
      packages[0].id
    )
    if (statusError) throw statusError
    console.log('Sponsor status updated successfully')

    // Test getting sponsor details
    console.log('\nTesting sponsor details retrieval...')
    const { data: sponsorDetails, error: detailsError } = await sponsorOps.getSponsorDetails(
      sponsorApp.id
    )
    if (detailsError) throw detailsError

    console.log('Sponsor details retrieved successfully:')
    console.log('- Company:', sponsorDetails.company_name)
    console.log('- Status:', sponsorDetails.status)
    console.log('- Level:', sponsorDetails.sponsorship_level)
    console.log('- Contacts:', sponsorDetails.contacts.length)
    console.log('- Benefits:', sponsorDetails.benefits.length)

    console.log('\nAll tests completed successfully!')
  } catch (error) {
    console.error('Test failed:', error)
    process.exit(1)
  }
}

testSponsorSetup() 