import { prisma } from './db'
import { hashPassword } from './auth'

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Clear existing data
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
    const demoUser = await prisma.user.create({
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
    })

    const johnUser = await prisma.user.create({
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
    })

    console.log('👥 Created users')

    // Create Categories
    const electronics = await prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest electronic gadgets and devices',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
      }
    })

    const fashion = await prisma.category.create({
      data: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing and accessories',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
      }
    })

    const homeGarden = await prisma.category.create({
      data: {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Home decor and gardening essentials',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
      }
    })

    const sports = await prisma.category.create({
      data: {
        name: 'Sports & Fitness',
        slug: 'sports-fitness',
        description: 'Sports equipment and fitness gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
      }
    })

    const beauty = await prisma.category.create({
      data: {
        name: 'Health & Beauty',
        slug: 'health-beauty',
        description: 'Personal care and wellness products',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
      }
    })

    console.log('📁 Created categories')

    // Create Products
    const headphones = await prisma.product.create({
      data: {
        name: 'Wireless Bluetooth Headphones',
        slug: 'wireless-bluetooth-headphones',
        shortDesc: 'Premium quality wireless headphones with noise cancellation',
        description: 'Experience superior sound quality with these premium wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        sku: 'ELEC-HEAD-001',
        stock: 50,
        isFeatured: true,
        brand: 'SoundMax',
        tags: 'wireless,bluetooth,noise-cancelling,premium',
        images: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        weight: 0.3,
        dimensions: '20cm x 15cm x 8cm',
        categoryId: electronics.id
      }
    })

    const smartwatch = await prisma.product.create({
      data: {
        name: 'Smart Watch Series X',
        slug: 'smart-watch-series-x',
        shortDesc: 'Advanced fitness tracking with heart rate monitoring',
        description: 'Stay connected and track your health with this advanced smartwatch. Features GPS tracking, heart rate monitoring, sleep analysis, and 7-day battery life.',
        price: 299.99,
        originalPrice: 399.99,
        discount: 25,
        sku: 'ELEC-WATCH-001',
        stock: 30,
        isFeatured: true,
        brand: 'TechWear',
        tags: 'smartwatch,fitness,gps,health',
        images: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        weight: 0.05,
        dimensions: '4cm x 4cm x 1cm',
        categoryId: electronics.id
      }
    })

    const charger = await prisma.product.create({
      data: {
        name: 'Wireless Charging Pad',
        slug: 'wireless-charging-pad',
        shortDesc: 'Fast wireless charging for all compatible devices',
        description: 'Convenient wireless charging solution for smartphones and earbuds. Features fast 15W charging and LED indicators.',
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        sku: 'ELEC-CHARGE-001',
        stock: 100,
        brand: 'ChargeTech',
        tags: 'wireless,charging,fast,convenient',
        images: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500',
        weight: 0.2,
        dimensions: '10cm x 10cm x 2cm',
        categoryId: electronics.id
      }
    })

    const tshirt = await prisma.product.create({
      data: {
        name: 'Premium Cotton T-Shirt',
        slug: 'premium-cotton-t-shirt',
        shortDesc: 'Comfortable 100% organic cotton t-shirt',
        description: 'Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. Perfect for everyday wear.',
        price: 24.99,
        originalPrice: 34.99,
        discount: 29,
        sku: 'FASH-SHIRT-001',
        stock: 200,
        isFeatured: true,
        brand: 'EcoWear',
        tags: 'organic,cotton,comfortable,eco-friendly',
        images: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        weight: 0.2,
        dimensions: 'Size: S-XXL',
        categoryId: fashion.id
      }
    })

    const jacket = await prisma.product.create({
      data: {
        name: 'Designer Leather Jacket',
        slug: 'designer-leather-jacket',
        shortDesc: 'Genuine leather jacket with modern design',
        description: 'Premium genuine leather jacket crafted with attention to detail. Features classic design with modern touches.',
        price: 199.99,
        originalPrice: 299.99,
        discount: 33,
        sku: 'FASH-JACKET-001',
        stock: 25,
        isFeatured: true,
        brand: 'StyleCraft',
        tags: 'leather,designer,premium,jacket',
        images: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        weight: 1.5,
        dimensions: 'Size: S-XXL',
        categoryId: fashion.id
      }
    })

    const lamp = await prisma.product.create({
      data: {
        name: 'Modern Table Lamp',
        slug: 'modern-table-lamp',
        shortDesc: 'Elegant LED table lamp with adjustable brightness',
        description: 'Stylish LED table lamp perfect for home or office. Features touch controls and energy-efficient LED technology.',
        price: 89.99,
        originalPrice: 119.99,
        discount: 25,
        sku: 'HOME-LAMP-001',
        stock: 40,
        brand: 'LightCraft',
        tags: 'led,adjustable,modern,energy-efficient',
        images: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
        weight: 2.0,
        dimensions: '30cm x 15cm x 15cm',
        categoryId: homeGarden.id
      }
    })

    const yoga = await prisma.product.create({
      data: {
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        shortDesc: 'Non-slip yoga mat with alignment lines',
        description: 'High-quality yoga mat made from eco-friendly materials. Features non-slip surface and alignment lines.',
        price: 49.99,
        originalPrice: 69.99,
        discount: 29,
        sku: 'SPORT-YOGA-001',
        stock: 80,
        isFeatured: true,
        brand: 'ZenFit',
        tags: 'yoga,eco-friendly,non-slip,fitness',
        images: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
        weight: 1.8,
        dimensions: '183cm x 61cm x 6mm',
        categoryId: sports.id
      }
    })

    const skincare = await prisma.product.create({
      data: {
        name: 'Skincare Routine Set',
        slug: 'skincare-routine-set',
        shortDesc: 'Complete 4-step skincare routine for healthy skin',
        description: 'Professional skincare set including cleanser, toner, serum, and moisturizer. Suitable for all skin types.',
        price: 79.99,
        originalPrice: 99.99,
        discount: 20,
        sku: 'BEAUTY-SKIN-001',
        stock: 45,
        isFeatured: true,
        brand: 'GlowCare',
        tags: 'skincare,natural,routine,healthy',
        images: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
        weight: 0.6,
        dimensions: '20cm x 15cm x 8cm',
        categoryId: beauty.id
      }
    })

    console.log('🛍️ Created products')

    // Add cart items for demo user
    await prisma.cartItem.create({
      data: {
        userId: demoUser.id,
        productId: headphones.id,
        quantity: 1
      }
    })

    await prisma.cartItem.create({
      data: {
        userId: demoUser.id,
        productId: tshirt.id,
        quantity: 2
      }
    })

    // Add wishlist items
    await prisma.wishlist.create({
      data: {
        userId: demoUser.id,
        productId: smartwatch.id
      }
    })

    // Add sample reviews
    await prisma.review.create({
      data: {
        userId: johnUser.id,
        productId: headphones.id,
        rating: 5,
        title: 'Excellent sound quality!',
        comment: 'These headphones exceeded my expectations. The noise cancellation is amazing!',
        isVerified: true
      }
    })

    await prisma.review.create({
      data: {
        userId: johnUser.id,
        productId: tshirt.id,
        rating: 5,
        title: 'Perfect fit and quality',
        comment: 'Love this t-shirt! The organic cotton feels great and the fit is perfect.',
        isVerified: true
      }
    })

    // Create sample order
    const order = await prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-001',
        userId: demoUser.id,
        status: 'DELIVERED',
        subtotal: 224.98,
        tax: 22.50,
        shipping: 9.99,
        total: 257.47,
        shippingName: demoUser.name!,
        shippingEmail: demoUser.email,
        shippingPhone: demoUser.phone!,
        shippingAddress: demoUser.address!,
        shippingCity: demoUser.city!,
        shippingPostal: demoUser.postalCode!,
        shippingCountry: demoUser.country!,
        paymentMethod: 'Credit Card',
        paymentStatus: 'PAID',
        paidAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        shippedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        deliveredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    })

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: headphones.id,
        quantity: 1,
        price: headphones.price,
        total: headphones.price
      }
    })

    console.log('✅ Database seeding completed successfully!')
    console.log(`
📊 Database Summary:
- Users: 3 (1 admin + 2 regular users)
- Categories: 5
- Products: 8
- Cart Items: 2
- Wishlist Items: 1
- Reviews: 2
- Orders: 1

🔐 Test Accounts:
Admin: admin@shopeasy.com / admin123
Demo: demo@example.com / demo123
User: john@example.com / demo123
    `)

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })