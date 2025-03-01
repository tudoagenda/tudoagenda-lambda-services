import { handleCreateShortUrl } from '../handlers/handleCreateShortUrl';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testCreateShortUrl() {
  try {
    // Create a mock event
    const event = {
      body: JSON.stringify({
        url: 'https://www.example.com',
      }),
    };

    // Call the handler
    const result = await handleCreateShortUrl(event as any);

    // Log the result
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the test
testCreateShortUrl(); 