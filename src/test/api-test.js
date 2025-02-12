import fetch from 'node-fetch';

async function testEndpoints() {
  const baseUrl = 'http://localhost:8081';
  
  try {
    // Test root endpoint
    const rootResponse = await fetch(baseUrl);
    const rootData = await rootResponse.json();
    console.log('Root endpoint:', rootData);

    // Test health endpoint
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log('Health endpoint:', healthData);

    // Test events endpoint
    const eventsResponse = await fetch(`${baseUrl}/api/events`);
    const eventsData = await eventsResponse.json();
    console.log('Events endpoint:', eventsData);

  } catch (error) {
    console.error('Error testing endpoints:', error);
  }
}

testEndpoints(); 