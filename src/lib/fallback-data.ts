// Fallback data when database is not available (e.g., in serverless environments)

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
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
    categoryId: '1',
    category: { id: '1', name: 'Electronics' }
  },
  {
    id: '2',
    name: 'Smart Phone Stand',
    description: 'Adjustable phone stand compatible with all smartphones and tablets.',
    price: 29.99,
    categoryId: '1',
    category: { id: '1', name: 'Electronics' }
  },
  {
    id: '3',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card slots.',
    price: 79.99,
    categoryId: '1',
    category: { id: '1', name: 'Electronics' }
  },
  {
    id: '4',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with Qi-enabled devices.',
    price: 39.99,
    categoryId: '1',
    category: { id: '1', name: 'Electronics' }
  },
  {
    id: '5',
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable 100% organic cotton t-shirt available in multiple colors.',
    price: 24.99,
    categoryId: '2',
    category: { id: '2', name: 'Clothing' }
  },
  {
    id: '6',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with a modern fit, perfect for casual wear.',
    price: 89.99,
    categoryId: '2',
    category: { id: '2', name: 'Clothing' }
  },
  {
    id: '7',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with breathable mesh and cushioned sole.',
    price: 149.99,
    categoryId: '2',
    category: { id: '2', name: 'Clothing' }
  },
  {
    id: '8',
    name: 'Winter Scarf',
    description: 'Warm and soft winter scarf made from premium wool blend.',
    price: 34.99,
    categoryId: '2',
    category: { id: '2', name: 'Clothing' }
  },
  {
    id: '9',
    name: 'The Complete Guide to Web Development',
    description: 'Comprehensive guide covering HTML, CSS, JavaScript, and modern frameworks.',
    price: 49.99,
    categoryId: '3',
    category: { id: '3', name: 'Books' }
  },
  {
    id: '10',
    name: 'Mystery Novel: The Silent Observer',
    description: 'A gripping mystery novel that will keep you on the edge of your seat.',
    price: 16.99,
    categoryId: '3',
    category: { id: '3', name: 'Books' }
  },
  {
    id: '11',
    name: 'Cookbook: Healthy Meals',
    description: '100 delicious and healthy recipes for everyday cooking.',
    price: 27.99,
    categoryId: '3',
    category: { id: '3', name: 'Books' }
  },
  {
    id: '12',
    name: 'Mindfulness and Meditation',
    description: 'A practical guide to mindfulness and meditation techniques.',
    price: 19.99,
    categoryId: '3',
    category: { id: '3', name: 'Books' }
  },
  {
    id: '13',
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels and USB charging port.',
    price: 59.99,
    categoryId: '4',
    category: { id: '4', name: 'Home & Garden' }
  },
  {
    id: '14',
    name: 'Succulent Plant Set',
    description: 'Set of 6 beautiful succulent plants in decorative pots.',
    price: 44.99,
    categoryId: '4',
    category: { id: '4', name: 'Home & Garden' }
  },
  {
    id: '15',
    name: 'Aromatherapy Diffuser',
    description: 'Ultrasonic essential oil diffuser with LED lights and timer function.',
    price: 69.99,
    categoryId: '4',
    category: { id: '4', name: 'Home & Garden' }
  },
  {
    id: '16',
    name: 'Bamboo Cutting Board Set',
    description: 'Set of 3 eco-friendly bamboo cutting boards in different sizes.',
    price: 39.99,
    categoryId: '4',
    category: { id: '4', name: 'Home & Garden' }
  },
  {
    id: '17',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with excellent cushioning and carrying strap.',
    price: 49.99,
    categoryId: '5',
    category: { id: '5', name: 'Sports & Outdoors' }
  },
  {
    id: '18',
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
    price: 29.99,
    categoryId: '5',
    category: { id: '5', name: 'Sports & Outdoors' }
  },
  {
    id: '19',
    name: 'Resistance Bands Set',
    description: 'Set of 5 resistance bands with different resistance levels and accessories.',
    price: 34.99,
    categoryId: '5',
    category: { id: '5', name: 'Sports & Outdoors' }
  },
  {
    id: '20',
    name: 'Camping Tent',
    description: '3-person waterproof camping tent with easy setup and carry bag.',
    price: 199.99,
    categoryId: '5',
    category: { id: '5', name: 'Sports & Outdoors' }
  }
]