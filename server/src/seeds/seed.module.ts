import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../users/entities/user.entity';
// import { Category } from '../products/entities/category.entity';
// import { Product } from '../products/entities/product.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([User, Category, Product])],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}