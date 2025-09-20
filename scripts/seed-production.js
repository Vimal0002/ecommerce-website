const axios = require('axios');

const SITE_URL = 'https://vimal-ecommerce-website.netlify.app';

async function seedProduction() {
  console.log('🌱 Starting production database seed...');
  
  try {
    // First, let's test if the site is responding
    const response = await axios.get(`${SITE_URL}/api/products`);
    console.log('✅ Products API is accessible');
    console.log('Products found:', response.data.products?.length || 0);
    
    // Check categories
    const categoriesResponse = await axios.get(`${SITE_URL}/api/categories`);
    console.log('✅ Categories API is accessible');
    console.log('Categories found:', categoriesResponse.data.categories?.length || 0);
    
    if (categoriesResponse.data.categories?.length === 0) {
      console.log('🔄 Database appears to be empty, need to seed...');
      console.log('❌ Cannot seed via API - need to fix the production deployment');
    } else {
      console.log('✅ Database already has data');
    }
    
  } catch (error) {
    console.error('❌ Error testing production APIs:', error.response?.status, error.response?.statusText);
    console.error('Error details:', error.message);
  }
}

seedProduction();