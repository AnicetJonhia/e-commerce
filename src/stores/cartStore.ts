import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../data/mockData';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const itemIndex = items.findIndex(item => item.id === product.id);
        
        if (itemIndex >= 0) {
          // Item exists, update quantity
          const newItems = [...items];
          newItems[itemIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          // Item doesn't exist, add new item
          const discountedPrice = product.discount > 0 
            ? product.price * (1 - product.discount / 100) 
            : product.price;
            
          set({
            items: [
              ...items,
              {
                id: product.id,
                name: product.name,
                price: discountedPrice,
                image: product.image,
                quantity
              }
            ]
          });
        }
      },
      
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.id !== productId)
        });
      },
      
      updateQuantity: (productId, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          // If quantity is zero or negative, remove the item
          return get().removeItem(productId);
        }
        
        const newItems = items.map(item => 
          item.id === productId ? { ...item, quantity } : item
        );
        
        set({ items: newItems });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);