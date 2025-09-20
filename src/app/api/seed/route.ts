import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    console.log('🌱 Starting database seed via API...')

    // Create categories first
    const electronics = await prisma.category.upsert({
      where: { name: 'Electronics' },
      update: {},
      create: { name: 'Electronics' }
    })

    const clothing = await prisma.category.upsert({
      where: { name: 'Clothing' },
      update: {},
      create: { name: 'Clothing' }
    })

    const books = await prisma.category.upsert({
      where: { name: 'Books' },
      update: {},
      create: { name: 'Books' }
    })

    const homeGarden = await prisma.category.upsert({
      where: { name: 'Home & Garden' },
      update: {},
      create: { name: 'Home & Garden' }
    })

    const sports = await prisma.category.upsert({
      where: { name: 'Sports & Outdoors' },
      update: {},
      create: { name: 'Sports & Outdoors' }
    })

    // Sample products
    const sampleProducts = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium quality wireless headphones with noise cancellation.',
        price: 199.99,
        categoryId: electronics.id,
      },
      {
        name: 'Smart Phone Stand',
        description: 'Adjustable phone stand compatible with all smartphones.',
        price: 29.99,
        categoryId: electronics.id,
      },
      {
        name: 'Premium Cotton T-Shirt',
        description: 'Comfortable 100% organic cotton t-shirt.',
        price: 24.99,
        categoryId: clothing.id,
      },
      {
        name: 'Denim Jacket',
        description: 'Classic denim jacket with a modern fit.',
        price: 89.99,
        categoryId: clothing.id,
      },
      {
        name: 'Web Development Guide',
        description: 'Comprehensive guide covering modern web development.',
        price: 49.99,
        categoryId: books.id,
      },
      {
        name: 'Mystery Novel',
        description: 'A gripping mystery novel.',
        price: 16.99,
        categoryId: books.id,
      },
      {
        name: 'LED Desk Lamp',
        description: 'Adjustable LED desk lamp with USB charging port.',
        price: 59.99,
        categoryId: homeGarden.id,
      },
      {
        name: 'Plant Set',
        description: 'Set of beautiful plants in decorative pots.',
        price: 44.99,
        categoryId: homeGarden.id,
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with excellent cushioning.',
        price: 49.99,
        categoryId: sports.id,
      },
      {
        name: 'Water Bottle',
        description: 'Insulated stainless steel water bottle.',
        price: 29.99,
        categoryId: sports.id,
      }
    ]

    // Insert products
    let createdCount = 0
    for (const product of sampleProducts) {
      const existingProduct = await prisma.product.findFirst({
        where: { name: product.name }
      })
      
      if (!existingProduct) {
        await prisma.product.create({ data: product })
        createdCount++
      }
    }

    console.log('✅ Database seeding completed via API!')
    
    return NextResponse.json({
      message: 'Database seeded successfully',
      categoriesCreated: 5,
      productsCreated: createdCount,
      totalProducts: sampleProducts.length
    })

  } catch (error) {
    console.error('❌ Error seeding database via API:', error)
    return NextResponse.json(
      { 
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}