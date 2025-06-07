import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: any, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Item exists, update quantity
          const newItems = [...items];
          const newQuantity = newItems[existingItemIndex].quantity + quantity;
          
          // Check stock limit
          if (newQuantity <= product.stock) {
            newItems[existingItemIndex].quantity = newQuantity;
            set({ items: newItems });
          }
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
                quantity,
                stock: product.stock,
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
          return get().removeItem(productId);
        }
        
        const newItems = items.map(item => {
          if (item.id === productId) {
            // Check stock limit
            const newQuantity = Math.min(quantity, item.stock);
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        
        set({ items: newItems });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getCartItemsCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage'
    }
  )
);