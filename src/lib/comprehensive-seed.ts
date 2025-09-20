import { prisma } from './db'
import { hashPassword } from './auth'

async function main() {
  console.log('🌱 Starting comprehensive database seeding...')

  try {
    // Clear existing data in correct order
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.review.deleteMany()
    await prisma.wishlist.deleteMany()
    await prisma.cartItem.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()

    console.log('🗑️ Cleared existing data')

  // Create Admin User
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.create({
    data: {
      email: 'admin@shopeasy.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      phone: '+1-555-0001',
      address: '123 Admin Street',
      city: 'New York',
      postalCode: '10001',
      country: 'USA'
    }
  })

  // Create Demo Users
  const demoPassword = await hashPassword('demo123')
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'demo@example.com',
        password: demoPassword,
        name: 'Demo User',
        role: 'USER',
        phone: '+1-555-0100',
        address: '456 Demo Lane',
        city: 'Los Angeles',
        postalCode: '90210',
        country: 'USA'
      }
    }),
    prisma.user.create({
      data: {
        email: 'john@example.com',
        password: demoPassword,
        name: 'John Smith',
        role: 'USER',
        phone: '+1-555-0101',
        address: '789 Oak Street',
        city: 'Chicago',
        postalCode: '60601',
        country: 'USA'
      }
    }),
    prisma.user.create({
      data: {
        email: 'sarah@example.com',
        password: demoPassword,
        name: 'Sarah Johnson',
        role: 'USER',
        phone: '+1-555-0102',
        address: '321 Pine Avenue',
        city: 'Miami',
        postalCode: '33101',
        country: 'USA'
      }
    })
  ])

  console.log('👥 Created users')

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest electronic gadgets and devices',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing and accessories',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Home decor and gardening essentials',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Sports & Fitness',
        slug: 'sports-fitness',
        description: 'Sports equipment and fitness gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Books & Media',
        slug: 'books-media',
        description: 'Books, movies, and educational content',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Health & Beauty',
        slug: 'health-beauty',
        description: 'Personal care and wellness products',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
      }
    })
  ])

  console.log('📁 Created categories')

  // Create Products
  const products = await Promise.all([
    // Electronics
    prisma.product.create({
      data: {
        name: 'Wireless Bluetooth Headphones',
        slug: 'wireless-bluetooth-headphones',
        shortDesc: 'Premium quality wireless headphones with noise cancellation',
        description: 'Experience superior sound quality with these premium wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, gamers, and professionals.',
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        sku: 'ELEC-HEAD-001',
        stock: 50,
        isFeatured: true,
        brand: 'SoundMax',
        tags: JSON.stringify(['wireless', 'bluetooth', 'noise-cancelling', 'premium']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
        ]),
        weight: 0.3,
        dimensions: '20cm x 15cm x 8cm',
        categoryId: categories[0].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Smart Watch Series X',
        slug: 'smart-watch-series-x',
        shortDesc: 'Advanced fitness tracking with heart rate monitoring',
        description: 'Stay connected and track your health with this advanced smartwatch. Features include GPS tracking, heart rate monitoring, sleep analysis, water resistance, and 7-day battery life.',
        price: 299.99,
        originalPrice: 399.99,
        discount: 25,
        sku: 'ELEC-WATCH-001',
        stock: 30,
        isFeatured: true,
        brand: 'TechWear',
        tags: JSON.stringify(['smartwatch', 'fitness', 'gps', 'health']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop'
        ]),
        weight: 0.05,
        dimensions: '4cm x 4cm x 1cm',
        categoryId: categories[0].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Wireless Charging Pad',
        slug: 'wireless-charging-pad',
        shortDesc: 'Fast wireless charging for all compatible devices',
        description: 'Convenient wireless charging solution for your smartphones and earbuds. Features fast 15W charging, LED indicators, and sleek design that complements any workspace.',
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        sku: 'ELEC-CHARGE-001',
        stock: 100,
        brand: 'ChargeTech',
        tags: ['wireless', 'charging', 'fast', 'convenient'],
        images: [
          'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=500&fit=crop'
        ],
        weight: 0.2,
        dimensions: '10cm x 10cm x 2cm',
        categoryId: categories[0].id
      }
    }),

    // Fashion
    prisma.product.create({
      data: {
        name: 'Premium Cotton T-Shirt',
        slug: 'premium-cotton-t-shirt',
        shortDesc: 'Comfortable 100% organic cotton t-shirt',
        description: 'Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. Available in multiple colors with a perfect fit for everyday wear.',
        price: 24.99,
        originalPrice: 34.99,
        discount: 29,
        sku: 'FASH-SHIRT-001',
        stock: 200,
        isFeatured: true,
        brand: 'EcoWear',
        tags: ['organic', 'cotton', 'comfortable', 'eco-friendly'],
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1583743814966-8936f37f4036?w=500&h=500&fit=crop'
        ],
        weight: 0.2,
        dimensions: 'Size: S-XXL',
        categoryId: categories[1].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Designer Leather Jacket',
        slug: 'designer-leather-jacket',
        shortDesc: 'Genuine leather jacket with modern design',
        description: 'Premium genuine leather jacket crafted with attention to detail. Features classic design with modern touches, perfect for casual and semi-formal occasions.',
        price: 199.99,
        originalPrice: 299.99,
        discount: 33,
        sku: 'FASH-JACKET-001',
        stock: 25,
        isFeatured: true,
        brand: 'StyleCraft',
        tags: ['leather', 'designer', 'premium', 'jacket'],
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop'
        ],
        weight: 1.5,
        dimensions: 'Size: S-XXL',
        categoryId: categories[1].id
      }
    }),

    // Home & Garden
    prisma.product.create({
      data: {
        name: 'Modern Table Lamp',
        slug: 'modern-table-lamp',
        shortDesc: 'Elegant LED table lamp with adjustable brightness',
        description: 'Stylish LED table lamp perfect for home or office. Features touch controls, adjustable brightness levels, and energy-efficient LED technology.',
        price: 89.99,
        originalPrice: 119.99,
        discount: 25,
        sku: 'HOME-LAMP-001',
        stock: 40,
        brand: 'LightCraft',
        tags: ['led', 'adjustable', 'modern', 'energy-efficient'],
        images: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop'
        ],
        weight: 2.0,
        dimensions: '30cm x 15cm x 15cm',
        categoryId: categories[2].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Plant Care Kit',
        slug: 'plant-care-kit',
        shortDesc: 'Complete kit for indoor plant care and maintenance',
        description: 'Everything you need to keep your indoor plants healthy and thriving. Includes watering tools, plant food, soil tester, and comprehensive care guide.',
        price: 34.99,
        originalPrice: 49.99,
        discount: 30,
        sku: 'HOME-PLANT-001',
        stock: 60,
        brand: 'GreenThumb',
        tags: ['plants', 'gardening', 'indoor', 'care'],
        images: [
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop'
        ],
        weight: 1.2,
        dimensions: '25cm x 20cm x 15cm',
        categoryId: categories[2].id
      }
    }),

    // Sports & Fitness
    prisma.product.create({
      data: {
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        shortDesc: 'Non-slip yoga mat with alignment lines',
        description: 'High-quality yoga mat made from eco-friendly materials. Features non-slip surface, alignment lines, and comes with a carrying strap for portability.',
        price: 49.99,
        originalPrice: 69.99,
        discount: 29,
        sku: 'SPORT-YOGA-001',
        stock: 80,
        isFeatured: true,
        brand: 'ZenFit',
        tags: ['yoga', 'eco-friendly', 'non-slip', 'fitness'],
        images: [
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop'
        ],
        weight: 1.8,
        dimensions: '183cm x 61cm x 6mm',
        categoryId: categories[3].id
      }
    }),

    // Books & Media
    prisma.product.create({
      data: {
        name: 'Web Development Masterclass',
        slug: 'web-development-masterclass',
        shortDesc: 'Complete guide to modern web development',
        description: 'Comprehensive book covering HTML, CSS, JavaScript, React, Node.js, and database management. Perfect for beginners and intermediate developers.',
        price: 29.99,
        originalPrice: 39.99,
        discount: 25,
        sku: 'BOOK-WEB-001',
        stock: 120,
        brand: 'TechBooks',
        tags: ['programming', 'web-development', 'javascript', 'react'],
        images: [
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop'
        ],
        weight: 0.8,
        dimensions: '24cm x 18cm x 3cm',
        categoryId: categories[4].id
      }
    }),

    // Health & Beauty
    prisma.product.create({
      data: {
        name: 'Skincare Routine Set',
        slug: 'skincare-routine-set',
        shortDesc: 'Complete 4-step skincare routine for healthy skin',
        description: 'Professional skincare set including cleanser, toner, serum, and moisturizer. Suitable for all skin types with natural ingredients.',
        price: 79.99,
        originalPrice: 99.99,
        discount: 20,
        sku: 'BEAUTY-SKIN-001',
        stock: 45,
        isFeatured: true,
        brand: 'GlowCare',
        tags: ['skincare', 'natural', 'routine', 'healthy'],
        images: [
          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop'
        ],
        weight: 0.6,
        dimensions: '20cm x 15cm x 8cm',
        categoryId: categories[5].id
      }
    })
  ])

  console.log('🛍️ Created products')

  // Add some cart items for demo user
  await Promise.all([
    prisma.cartItem.create({
      data: {
        userId: users[0].id,
        productId: products[0].id,
        quantity: 1
      }
    }),
    prisma.cartItem.create({
      data: {
        userId: users[0].id,
        productId: products[3].id,
        quantity: 2
      }
    })
  ])

  // Add wishlist items
  await Promise.all([
    prisma.wishlist.create({
      data: {
        userId: users[0].id,
        productId: products[1].id
      }
    }),
    prisma.wishlist.create({
      data: {
        userId: users[0].id,
        productId: products[7].id
      }
    })
  ])

  // Add sample reviews
  await Promise.all([
    prisma.review.create({
      data: {
        userId: users[1].id,
        productId: products[0].id,
        rating: 5,
        title: 'Excellent sound quality!',
        comment: 'These headphones exceeded my expectations. The noise cancellation is amazing and battery life is great.',
        isVerified: true
      }
    }),
    prisma.review.create({
      data: {
        userId: users[2].id,
        productId: products[0].id,
        rating: 4,
        title: 'Great value for money',
        comment: 'Good headphones overall, very comfortable for long use. Highly recommend!',
        isVerified: true
      }
    }),
    prisma.review.create({
      data: {
        userId: users[1].id,
        productId: products[3].id,
        rating: 5,
        title: 'Perfect fit and quality',
        comment: 'Love this t-shirt! The organic cotton feels great and the fit is perfect.',
        isVerified: true
      }
    })
  ])

  // Create sample orders
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2024-001',
      userId: users[0].id,
      status: 'DELIVERED',
      subtotal: 224.98,
      tax: 22.50,
      shipping: 9.99,
      total: 257.47,
      shippingName: users[0].name!,
      shippingEmail: users[0].email,
      shippingPhone: users[0].phone,
      shippingAddress: users[0].address!,
      shippingCity: users[0].city!,
      shippingPostal: users[0].postalCode!,
      shippingCountry: users[0].country!,
      paymentMethod: 'Credit Card',
      paymentStatus: 'PAID',
      paidAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      shippedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      deliveredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    }
  })

  await Promise.all([
    prisma.orderItem.create({
      data: {
        orderId: order1.id,
        productId: products[0].id,
        quantity: 1,
        price: products[0].price,
        total: products[0].price
      }
    }),
    prisma.orderItem.create({
      data: {
        orderId: order1.id,
        productId: products[3].id,
        quantity: 1,
        price: products[3].price,
        total: products[3].price
      }
    })
  ])

  console.log('📦 Created orders and reviews')
  console.log('✅ Comprehensive database seeding completed!')
  console.log(`
📊 Database Summary:
- Users: ${users.length + 1} (including 1 admin)
- Categories: ${categories.length}
- Products: ${products.length}
- Cart Items: 2
- Wishlist Items: 2
- Reviews: 3
- Orders: 1

🔐 Test Accounts:
Admin: admin@shopeasy.com / admin123
Demo: demo@example.com / demo123
User1: john@example.com / demo123
User2: sarah@example.com / demo123
  `)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })