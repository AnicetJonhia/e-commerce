import { create } from 'zustand';
import { ordersAPI } from '../services/api';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  id: string;
  total: number;
  status: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
  processInstanceId?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createOrder: (orderData: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: any;
  }) => Promise<Order>;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
  getProcessStatus: (id: string) => Promise<any>;
  clearCurrentOrder: () => void;
  clearError: () => void;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,

  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const order = await ordersAPI.create(orderData);
      set({ 
        currentOrder: order,
        isLoading: false 
      });
      
      // Refresh orders list
      get().fetchOrders();
      
      return order;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to create order',
        isLoading: false 
      });
      throw error;
    }
  },

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const orders = await ordersAPI.getAll();
      set({ orders, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch orders',
        isLoading: false 
      });
    }
  },

  fetchOrderById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const order = await ordersAPI.getById(id);
      set({ currentOrder: order, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch order',
        isLoading: false 
      });
    }
  },

  getProcessStatus: async (id: string) => {
    try {
      const status = await ordersAPI.getProcessStatus(id);
      return status;
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to get process status' });
      throw error;
    }
  },

  clearCurrentOrder: () => {
    set({ currentOrder: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));