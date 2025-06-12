import {

  PrimaryGeneratedColumn,

} from 'typeorm';



export class CreateProductDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  name: string;
  description: string;
  price: number;
  image: string;
}
