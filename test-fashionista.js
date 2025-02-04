import { verifyConnection, db, supabase } from './lib/supabase-client.js'
import { fashionistaOps } from './lib/fashionista-operations.js'

async function testFashionistaSetup() {
  try {
    console.log('Testing Supabase connection...')
    const isConnected = await verifyConnection()
    if (!isConnected) {
      throw new Error('Failed to connect to Supabase')
    }
    console.log('Successfully connected to Supabase')

    // Create test user
    console.log('\nCreating test user...')
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email: 'test@fashionista.com',
      password: 'testpassword123',
      options: {
        data: {
          first_name: 'Test',
          last_name: 'User'
        }
      }
    })
    if (userError) throw userError
    
    const testUserId = userData.user.id
    console.log('Test user created successfully')

    // Initialize tables
    console.log('\nInitializing Fashionista Portal tables...')
    const { error: initError } = await fashionistaOps.initializeTables()
    if (initError) throw initError
    console.log('Tables initialized successfully')

    // Test profile creation
    console.log('\nTesting fashion professional profile creation...')
    const testProfile = {
      user_id: testUserId,
      first_name: 'Jane',
      last_name: 'Designer',
      email: 'jane@fashionista.com',
      phone: '1234567890',
      bio: 'Fashion designer with 5 years of experience',
      profession: 'Fashion Designer',
      expertise_level: 'Professional',
      specialties: ['Evening Wear', 'Sustainable Fashion', 'Haute Couture'],
      portfolio_url: 'https://portfolio.jane-designer.com',
      social_media: {
        instagram: '@jane_designs',
        linkedin: 'jane-designer'
      },
      achievements: [
        {
          title: 'Best New Designer 2023',
          organization: 'Fashion Week NYC'
        }
      ]
    }

    const { error: profileError } = await fashionistaOps.upsertProfile(testProfile)
    if (profileError) throw profileError
    console.log('Profile created successfully')

    // Test event creation
    console.log('\nTesting fashion event creation...')
    const testEvent = {
      title: 'Summer Fashion Week 2024',
      description: 'Showcasing the latest summer collections',
      event_date: new Date('2024-06-15T18:00:00Z').toISOString(),
      location: 'Fashion Center',
      category: 'Fashion Show',
      max_participants: 200,
      registration_deadline: new Date('2024-06-01T00:00:00Z').toISOString(),
      ticket_price: 150.00,
      status: 'upcoming',
      featured_image_url: 'https://example.com/event-cover.jpg'
    }

    const { data: eventData, error: eventError } = await fashionistaOps.createEvent(testEvent)
    if (eventError) throw eventError
    console.log('Event created successfully')

    // Test event registration
    console.log('\nTesting event registration...')
    const registrationDetails = {
      registration_type: 'Presenter',
      ticket_number: 'FWEEK-2024-001',
      payment_status: 'confirmed',
      payment_amount: 150.00,
      special_requirements: 'Backstage access needed'
    }

    const { error: regError } = await fashionistaOps.registerForEvent(
      eventData[0].id, // Use the created event ID
      testUserId,      // Use the test user ID
      registrationDetails
    )
    if (regError) throw regError
    console.log('Event registration completed successfully')

    // Test collection creation
    console.log('\nTesting fashion collection creation...')
    const testCollection = {
      user_id: testUserId, // Use the test user ID
      title: 'Summer Breeze 2024',
      description: 'A sustainable summer collection inspired by nature',
      category: 'Ready-to-Wear',
      season: 'Summer',
      year: 2024,
      status: 'published',
      featured_image_url: 'https://example.com/collection-cover.jpg',
      images: [
        {
          url: 'https://example.com/design1.jpg',
          caption: 'Organic Cotton Dress'
        },
        {
          url: 'https://example.com/design2.jpg',
          caption: 'Recycled Fabric Blazer'
        }
      ],
      tags: ['sustainable', 'summer', 'organic']
    }

    const { error: collectionError } = await fashionistaOps.upsertCollection(testCollection)
    if (collectionError) throw collectionError
    console.log('Collection created successfully')

    console.log('\nAll tests completed successfully!')
  } catch (error) {
    console.error('Test failed:', error)
    process.exit(1)
  }
}

testFashionistaSetup() 