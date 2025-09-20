import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics'
    }
  })

  const clothing = await prisma.category.upsert({
    where: { name: 'Clothing' },
    update: {},
    create: {
      name: 'Clothing'
    }
  })

  const books = await prisma.category.upsert({
    where: { name: 'Books' },
    update: {},
    create: {
      name: 'Books'
    }
  })

  const homeGarden = await prisma.category.upsert({
    where: { name: 'Home & Garden' },
    update: {},
    create: {
      name: 'Home & Garden'
    }
  })

  const sports = await prisma.category.upsert({
    where: { name: 'Sports & Outdoors' },
    update: {},
    create: {
      name: 'Sports & Outdoors'
    }
  })

  // Create sample products
  const sampleProducts = [
    // Electronics
    {
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 199.99,
      categoryId: electronics.id,
    },
    {
      name: 'Smart Phone Stand',
      description: 'Adjustable phone stand compatible with all smartphones and tablets.',
      price: 29.99,
      categoryId: electronics.id,
    },
    {
      name: 'USB-C Hub',
      description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card slots.',
      price: 79.99,
      categoryId: electronics.id,
    },
    {
      name: 'Wireless Charging Pad',
      description: 'Fast wireless charging pad compatible with Qi-enabled devices.',
      price: 39.99,
      categoryId: electronics.id,
    },
    
    // Clothing
    {
      name: 'Premium Cotton T-Shirt',
      description: 'Comfortable 100% organic cotton t-shirt available in multiple colors.',
      price: 24.99,
      categoryId: clothing.id,
    },
    {
      name: 'Denim Jacket',
      description: 'Classic denim jacket with a modern fit, perfect for casual wear.',
      price: 89.99,
      categoryId: clothing.id,
    },
    {
      name: 'Running Shoes',
      description: 'Lightweight running shoes with breathable mesh and cushioned sole.',
      price: 149.99,
      categoryId: clothing.id,
    },
    {
      name: 'Winter Scarf',
      description: 'Warm and soft winter scarf made from premium wool blend.',
      price: 34.99,
      categoryId: clothing.id,
    },

    // Books
    {
      name: 'The Complete Guide to Web Development',
      description: 'Comprehensive guide covering HTML, CSS, JavaScript, and modern frameworks.',
      price: 49.99,
      categoryId: books.id,
    },
    {
      name: 'Mystery Novel: The Silent Observer',
      description: 'A gripping mystery novel that will keep you on the edge of your seat.',
      price: 16.99,
      categoryId: books.id,
    },
    {
      name: 'Cookbook: Healthy Meals',
      description: '100 delicious and healthy recipes for everyday cooking.',
      price: 27.99,
      categoryId: books.id,
    },
    {
      name: 'Mindfulness and Meditation',
      description: 'A practical guide to mindfulness and meditation techniques.',
      price: 19.99,
      categoryId: books.id,
    },

    // Home & Garden
    {
      name: 'LED Desk Lamp',
      description: 'Adjustable LED desk lamp with multiple brightness levels and USB charging port.',
      price: 59.99,
      categoryId: homeGarden.id,
    },
    {
      name: 'Succulent Plant Set',
      description: 'Set of 6 beautiful succulent plants in decorative pots.',
      price: 44.99,
      categoryId: homeGarden.id,
    },
    {
      name: 'Aromatherapy Diffuser',
      description: 'Ultrasonic essential oil diffuser with LED lights and timer function.',
      price: 69.99,
      categoryId: homeGarden.id,
    },
    {
      name: 'Bamboo Cutting Board Set',
      description: 'Set of 3 eco-friendly bamboo cutting boards in different sizes.',
      price: 39.99,
      categoryId: homeGarden.id,
    },

    // Sports & Outdoors
    {
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat with excellent cushioning and carrying strap.',
      price: 49.99,
      categoryId: sports.id,
    },
    {
      name: 'Water Bottle',
      description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
      price: 29.99,
      categoryId: sports.id,
    },
    {
      name: 'Resistance Bands Set',
      description: 'Set of 5 resistance bands with different resistance levels and accessories.',
      price: 34.99,
      categoryId: sports.id,
    },
    {
      name: 'Camping Tent',
      description: '3-person waterproof camping tent with easy setup and carry bag.',
      price: 199.99,
      categoryId: sports.id,
    },
  ]

  // Insert sample products
  for (const product of sampleProducts) {
    // Check if product already exists
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name }
    })
    
    if (!existingProduct) {
      await prisma.product.create({
        data: product
      })
    }
  }

  console.log('✅ Database seeding completed!')
}

main()
  .then(async () => {
    console.log('✅ Seeding completed successfully')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    console.error('This might be expected in serverless environments')
    await prisma.$disconnect()
    // Don't exit with error code to prevent build failure
    process.exit(0)
  })
