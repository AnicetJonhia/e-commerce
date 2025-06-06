import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsNumber, 
  IsArray, 
  IsBoolean, 
  IsOptional,
  IsNotEmpty, 
  Min, 
  Max, 
  IsUrl,
  ArrayMinSize,
  IsUUID
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @Min(0.01)
  price: number;

  @ApiProperty({ description: 'Discount percentage', default: 0 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discount: number = 0;

  @ApiProperty({ description: 'Main product image URL' })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Array of product image URLs' })
  @IsArray()
  @ArrayMinSize(1)
  @IsUrl({}, { each: true })
  images: string[];

  @ApiProperty({ description: 'Product category ID' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: 'Whether the product is featured', default: false })
  @IsBoolean()
  @IsOptional()
  featured: boolean = false;

  @ApiProperty({ description: 'Product rating', default: 0 })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating: number = 0;

  @ApiProperty({ description: 'Number of reviews', default: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  reviewCount: number = 0;

  @ApiProperty({ description: 'Number of items in stock' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'Product brand name' })
  @IsString()
  @IsNotEmpty()
  brand: string;
}