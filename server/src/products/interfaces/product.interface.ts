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
  createdAt: string;
  updatedAt: string;
}