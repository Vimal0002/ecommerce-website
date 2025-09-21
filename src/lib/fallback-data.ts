// Fallback data when database is not available (e.g., in serverless environments)

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  images?: string
  isFeatured?: boolean
  originalPrice?: number
  discount?: number
  brand?: string
  categoryId: string
  category: {
    id: string
    name: string
  }
}

export interface Category {
  id: string
  name: string
  _count?: {
    products: number
  }
}

export const fallbackCategories: Category[] = [
  { id: '1', name: 'Electronics', _count: { products: 4 } },
  { id: '2', name: 'Clothing', _count: { products: 4 } },
  { id: '3', name: 'Books', _count: { products: 4 } },
  { id: '4', name: 'Home & Garden', _count: { products: 4 } },
  { id: '5', name: 'Sports & Outdoors', _count: { products: 4 } }
]

export const fallbackProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    images: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    isFeatured: true,
    brand: 'SoundMax',
    categoryId: '1',
    category: { id: '1', name: 'Electronics' }
  },
  {
    id: '2',
    name: 'Smart Phone Stand',
    description: 'Adjustable phone stand compatible with all smartphones and tablets.',
    price: 29.99,
    images: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=500',
    brand: 'TechStand',
    categoryId: '1',
    category: { id: '1', name: 'Electronics' }
  },
  {
    id: '3',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card slots.',
    price: 79.99,
    images: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500',
    brand: 'HubTech',
    categoryId: '1',
    category: { id: '1', name: 'Electronics' }
  },
  {
    id: '4',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with Qi-enabled devices.',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    images: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500',
    brand: 'ChargeTech',
    categoryId: '1',
    category: { id: '1', name: 'Electronics' }
  },
  {
    id: '5',
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable 100% organic cotton t-shirt available in multiple colors.',
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    images: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    isFeatured: true,
    brand: 'EcoWear',
    categoryId: '2',
    category: { id: '2', name: 'Clothing' }
  },
  {
    id: '6',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with a modern fit, perfect for casual wear.',
    price: 89.99,
    images: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    brand: 'StyleCraft',
    categoryId: '2',
    category: { id: '2', name: 'Clothing' }
  },
  {
    id: '7',
    name: 'Modern Table Lamp',
    description: 'Stylish LED table lamp perfect for home or office use.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    images: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    brand: 'LightCraft',
    categoryId: '4',
    category: { id: '4', name: 'Home & Garden' }
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    description: 'High-quality yoga mat made from eco-friendly materials.',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    images: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    isFeatured: true,
    brand: 'ZenFit',
    categoryId: '5',
    category: { id: '5', name: 'Sports & Outdoors' }
  }
]