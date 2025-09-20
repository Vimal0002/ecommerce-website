const axios = require('axios');

const SITE_URL = 'https://vimal-ecommerce-website.netlify.app';

async function callSeedAPI() {
  console.log('🌱 Calling seed API endpoint...');
  
  try {
    const response = await axios.post(`${SITE_URL}/api/seed`);
    console.log('✅ Seed API call successful!');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ Error calling seed API:', error.response?.status, error.response?.statusText);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
  }
}

callSeedAPI();