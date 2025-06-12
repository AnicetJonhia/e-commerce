import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
// import { Product } from '../products/entities/product.entity';
// import { Order } from '../orders/entities/order.entity';
// import { OrderItem } from '../orders/entities/order-item.entity';
// import { Category } from '../products/entities/category.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true, // Set to false in production
  logging: true,
  // entities: [User, Product, Order, OrderItem, Category],
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: ['src/database/subscribers/*.ts'],
});