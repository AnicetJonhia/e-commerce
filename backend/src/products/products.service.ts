import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';

// Mock data for development purposes
const mockProducts: Product[] = [
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
    brand: 'SoundMaster',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    brand: 'TechFit',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    brand: 'StyleCoast',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

@Injectable()
export class ProductsService {
  private products: Product[] = [...mockProducts];

  findAll(category?: string, search?: string): Product[] {
    let filteredProducts = [...this.products];
    
    // Apply category filter
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredProducts;
  }

  findOne(id: number): Product {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  findByCategory(categoryId: string): Product[] {
    return this.products.filter(product => product.category === categoryId);
  }

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.getNextId(),
      ...createProductDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const index = this.products.findIndex(product => product.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    const updatedProduct = {
      ...this.products[index],
      ...updateProductDto,
      updatedAt: new Date().toISOString(),
    };
    
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  remove(id: number): { success: boolean; message: string } {
    const index = this.products.findIndex(product => product.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    this.products.splice(index, 1);
    return { 
      success: true,
      message: `Product with ID ${id} successfully deleted`
    };
  }

  private getNextId(): number {
    return Math.max(0, ...this.products.map(p => p.id)) + 1;
  }
}