// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  images: string[];
  category: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

// Mock categories
export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
    itemCount: 42
  },
  {
    id: 'clothing',
    name: 'Clothing',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    itemCount: 56
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    itemCount: 38
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    image: 'https://images.pexels.com/photos/2253834/pexels-photo-2253834.jpeg',
    itemCount: 24
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    image: 'https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg',
    itemCount: 31
  },
  {
    id: 'books',
    name: 'Books & Media',
    image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg',
    itemCount: 47
  }
];

// Mock products
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Experience premium sound quality with these wireless noise-cancelling headphones. Perfect for music lovers and professionals alike.',
    price: 249.99,
    discount: 15,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
      'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
    ],
    category: 'electronics',
    featured: true,
    rating: 4.7,
    reviewCount: 128,
    stock: 15,
    brand: 'SoundMaster'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness goals with this advanced smart watch. Features heart rate monitoring, sleep tracking, and more.',
    price: 199.99,
    discount: 0,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg',
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'
    ],
    category: 'electronics',
    featured: true,
    rating: 4.5,
    reviewCount: 89,
    stock: 22,
    brand: 'TechFit'
  },
  {
    id: 3,
    name: 'Designer Cotton Casual Shirt',
    description: 'A premium casual shirt made from 100% organic cotton. Comfortable, stylish, and perfect for any occasion.',
    price: 59.99,
    discount: 20,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      'https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg',
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg'
    ],
    category: 'clothing',
    featured: true,
    rating: 4.3,
    reviewCount: 62,
    stock: 38,
    brand: 'StyleCoast'
  },
  {
    id: 4,
    name: 'Modern Coffee Table',
    description: 'Elevate your living room with this sleek, modern coffee table. Features a tempered glass top and sturdy wooden legs.',
    price: 149.99,
    discount: 0,
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
    images: [
      'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
      'https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg'
    ],
    category: 'home',
    featured: true,
    rating: 4.6,
    reviewCount: 45,
    stock: 12,
    brand: 'HomeElegance'
  },
  {
    id: 5,
    name: 'Professional DSLR Camera',
    description: 'Capture stunning photos and videos with this high-performance DSLR camera. Includes multiple lenses and accessories.',
    price: 1299.99,
    discount: 10,
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
    images: [
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
      'https://images.pexels.com/photos/821652/pexels-photo-821652.jpeg',
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg'
    ],
    category: 'electronics',
    featured: false,
    rating: 4.8,
    reviewCount: 112,
    stock: 7,
    brand: 'ProCapture'
  },
  {
    id: 6,
    name: 'Luxury Scented Candle Set',
    description: 'Set of 3 premium scented candles in elegant glass jars. Fragrances include vanilla, lavender, and sandalwood.',
    price: 49.99,
    discount: 0,
    image: 'https://images.pexels.com/photos/278550/pexels-photo-278550.jpeg',
    images: [
      'https://images.pexels.com/photos/278550/pexels-photo-278550.jpeg',
      'https://images.pexels.com/photos/4195509/pexels-photo-4195509.jpeg',
      'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg'
    ],
    category: 'home',
    featured: false,
    rating: 4.4,
    reviewCount: 38,
    stock: 28,
    brand: 'AromaLux'
  },
  {
    id: 7,
    name: 'Organic Skincare Gift Set',
    description: 'Complete skincare routine with cleanser, toner, moisturizer, and serum. Made with natural and organic ingredients.',
    price: 89.99,
    discount: 15,
    image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg',
    images: [
      'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg',
      'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg',
      'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg'
    ],
    category: 'beauty',
    featured: false,
    rating: 4.2,
    reviewCount: 75,
    stock: 32,
    brand: 'NatureBounty'
  },
  {
    id: 8,
    name: 'Ergonomic Office Chair',
    description: 'Premium office chair with lumbar support, adjustable height, and breathable mesh back. Perfect for long work days.',
    price: 229.99,
    discount: 0,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg',
    images: [
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg',
      'https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'
    ],
    category: 'home',
    featured: false,
    rating: 4.6,
    reviewCount: 92,
    stock: 18,
    brand: 'ComfortPro'
  }
];

export const getProductById = (id: number): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return mockProducts.filter(product => product.category === categoryId);
};

export const getRelatedProducts = (productId: number, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return mockProducts
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};