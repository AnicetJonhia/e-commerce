import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
// import { Product } from '../products/entities/product.entity';
// import { Order } from '../orders/entities/order.entity';
// import { OrderItem } from '../orders/entities/order-item.entity';
// import { Category } from '../products/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DATABASE_PATH', 'database.sqlite'),
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
        // entities: [User, Product, Order, OrderItem, Category],
        entities: [User],
        migrations: ['dist/database/migrations/*.js'],
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}