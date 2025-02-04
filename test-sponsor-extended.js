import { verifyConnection, db } from './lib/supabase-client.js'
import { sponsorOps } from './lib/sponsor-operations.js'

async function testExtendedSponsorFeatures() {
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

    // Create a test sponsorship package
    console.log('\nCreating test sponsorship package...')
    const packageData = {
      name: 'Test Package',
      level: 'Gold',
      price: 5000.00,
      description: 'Test sponsorship package',
      benefits: [
        {
          name: 'Logo Display',
          description: 'Logo displayed on event materials'
        },
        {
          name: 'Event Passes',
          description: '2 VIP event passes'
        }
      ],
      max_sponsors: 5,
      is_active: true
    }

    const { data: sponsorshipPackage, error: packageError } = await db.insert('sponsorship_packages', packageData)
    if (packageError) throw packageError
    console.log('Test sponsorship package created successfully')

    // Create a test sponsor
    console.log('\nCreating test sponsor...')
    const sponsorData = {
      company_name: 'Test Fashion Corp',
      industry: 'Fashion',
      website_url: 'https://testfashion.example.com',
      logo_url: 'https://testfashion.example.com/logo.png',
      description: 'Test fashion company',
      created_by: testUserId
    }

    const contactData = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@testfashion.example.com',
      phone: '1234567890',
      position: 'Test Manager'
    }

    const { data: sponsor, error: sponsorError } = await sponsorOps.createSponsorApplication(
      sponsorData,
      contactData
    )
    if (sponsorError) throw sponsorError
    console.log('Test sponsor created successfully')

    // Test payment operations
    console.log('\nTesting payment operations...')
    const paymentData = {
      amount: 5000.00,
      paymentMethod: 'credit_card',
      notes: 'Test payment'
    }

    const { data: payment, error: paymentError } = await sponsorOps.createPayment(
      sponsor.id,
      sponsorshipPackage[0].id,
      paymentData
    )
    if (paymentError) throw paymentError
    console.log('Payment created successfully')

    // Update payment status
    const { error: statusError } = await sponsorOps.updatePaymentStatus(
      payment.id,
      'completed',
      'Payment processed successfully'
    )
    if (statusError) throw statusError
    console.log('Payment status updated successfully')

    // Get payment history
    const { data: payments, error: historyError } = await sponsorOps.getPaymentHistory(sponsor.id)
    if (historyError) throw historyError
    console.log('Payment history retrieved successfully')
    console.log(`Found ${payments.length} payment(s)`)

    // Test document operations
    console.log('\nTesting document operations...')
    const documentData = {
      documentType: 'contract',
      documentUrl: 'https://example.com/test-contract.pdf',
      fileName: 'test-contract.pdf',
      fileSize: 1024,
      mimeType: 'application/pdf',
      notes: 'Test contract document'
    }

    const { data: document, error: documentError } = await sponsorOps.uploadDocument(
      sponsor.id,
      documentData
    )
    if (documentError) throw documentError
    console.log('Document uploaded successfully')

    // Verify document
    const { error: verifyError } = await sponsorOps.verifyDocument(
      document.id,
      testUserId
    )
    if (verifyError) throw verifyError
    console.log('Document verified successfully')

    // Get documents
    const { data: documents, error: docsError } = await sponsorOps.getDocuments(sponsor.id)
    if (docsError) throw docsError
    console.log('Documents retrieved successfully')
    console.log(`Found ${documents.length} document(s)`)

    // Test activity log
    console.log('\nTesting activity log...')
    const { data: activities, error: activitiesError } = await sponsorOps.getActivityLog(sponsor.id)
    if (activitiesError) throw activitiesError
    console.log('Activity log retrieved successfully')
    console.log(`Found ${activities.length} activity entries`)

    // Print summary
    console.log('\nTest Summary:')
    console.log('- Sponsorship package created')
    console.log('- Sponsor created')
    console.log('- Payment created and updated')
    console.log('- Document uploaded and verified')
    console.log('- Activities logged')

    console.log('\nAll extended tests completed successfully!')
  } catch (error) {
    console.error('Test failed:', error)
    process.exit(1)
  }
}

testExtendedSponsorFeatures() 