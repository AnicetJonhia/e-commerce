import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../products/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async seedDatabase() {
    await this.seedUsers();
    await this.seedCategories();
    await this.seedProducts();
  }

  private async seedUsers() {
    const userCount = await this.userRepository.count();
    if (userCount > 0) return;

    const adminUser = this.userRepository.create({
      email: 'admin@modernshop.com',
      password: await bcrypt.hash('admin123', 12),
      firstName: 'Admin',
      lastName: 'User',
      roles: ['admin', 'user'],
    });

    const testUser = this.userRepository.create({
      email: 'user@modernshop.com',
      password: await bcrypt.hash('user123', 12),
      firstName: 'Test',
      lastName: 'User',
      roles: ['user'],
    });

    await this.userRepository.save([adminUser, testUser]);
    console.log('Users seeded successfully');
  }

  private async seedCategories() {
    const categoryCount = await this.categoryRepository.count();
    if (categoryCount > 0) return;

    const categories = [
      {
        name: 'Electronics',
        description: 'Latest electronic devices and gadgets',
        image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
      },
      {
        name: 'Clothing',
        description: 'Fashion and apparel for all occasions',
        image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
      },
      {
        name: 'Home & Kitchen',
        description: 'Everything for your home and kitchen needs',
        image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      },
      {
        name: 'Beauty & Personal Care',
        description: 'Beauty products and personal care items',
        image: 'https://images.pexels.com/photos/2253834/pexels-photo-2253834.jpeg',
      },
      {
        name: 'Sports & Outdoors',
        description: 'Sports equipment and outdoor gear',
        image: 'https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg',
      },
      {
        name: 'Books & Media',
        description: 'Books, movies, music and more',
        image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg',
      },
    ];

    const categoryEntities = categories.map(cat => this.categoryRepository.create(cat));
    await this.categoryRepository.save(categoryEntities);
    console.log('Categories seeded successfully');
  }

  private async seedProducts() {
    const productCount = await this.productRepository.count();
    if (productCount > 0) return;

    const categories = await this.categoryRepository.find();
    const electronicsCategory = categories.find(c => c.name === 'Electronics');
    const clothingCategory = categories.find(c => c.name === 'Clothing');
    const homeCategory = categories.find(c => c.name === 'Home & Kitchen');

    const products = [
      {
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
        categoryId: electronicsCategory.id,
        featured: true,
        rating: 4.7,
        reviewCount: 128,
        stock: 15,
        brand: 'SoundMaster'
      },
      {
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
        categoryId: electronicsCategory.id,
        featured: true,
        rating: 4.5,
        reviewCount: 89,
        stock: 22,
        brand: 'TechFit'
      },
      {
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
        categoryId: clothingCategory.id,
        featured: true,
        rating: 4.3,
        reviewCount: 62,
        stock: 38,
        brand: 'StyleCoast'
      },
      {
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
        categoryId: homeCategory.id,
        featured: true,
        rating: 4.6,
        reviewCount: 45,
        stock: 12,
        brand: 'HomeElegance'
      },
    ];

    const productEntities = products.map(product => this.productRepository.create(product));
    await this.productRepository.save(productEntities);
    console.log('Products seeded successfully');
  }
}