import { create } from 'zustand';
import { productsAPI, categoriesAPI } from '../services/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  images: string[];
  categoryId: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  discountedPrice: number;
}

interface Category {
  id: string;
  name: string;
  itemCount: number;
}

interface ProductsState {
  products: Product[];
  featuredProducts: Product[];
  categories: Category[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: (params?: { categoryId?: string; search?: string }) => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  clearCurrentProduct: () => void;
  clearError: () => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,
  isLoading: false,
  error: null,

  fetchProducts: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const products = await productsAPI.getAll(params);
      set({ products, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch products',
        isLoading: false 
      });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const featuredProducts = await productsAPI.getFeatured();
      set({ featuredProducts, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch featured products',
        isLoading: false 
      });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await categoriesAPI.getAll();
      set({ categories });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch categories' });
    }
  },

  fetchProductById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const product = await productsAPI.getById(id);
      set({ currentProduct: product, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch product',
        isLoading: false 
      });
    }
  },

  clearCurrentProduct: () => {
    set({ currentProduct: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));