import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    console.log(response.data)
    return response.data;
  },
  
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async (params?: { categoryId?: string; search?: string }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  getFeatured: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },
  
  getByCategory: async (categoryId: string) => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },
  
  create: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  update: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    // For now, return mock data since categories endpoint might not be implemented
    return [
      { id: 'electronics', name: 'Electronics', itemCount: 42 },
      { id: 'clothing', name: 'Clothing', itemCount: 56 },
      { id: 'home', name: 'Home & Kitchen', itemCount: 38 },
      { id: 'beauty', name: 'Beauty & Personal Care', itemCount: 24 },
      { id: 'sports', name: 'Sports & Outdoors', itemCount: 31 },
      { id: 'books', name: 'Books & Media', itemCount: 47 },
    ];
  },
};

// Orders API
export const ordersAPI = {
  create: async (orderData: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  
  getProcessStatus: async (id: string) => {
    const response = await api.get(`/orders/${id}/process-status`);
    return response.data;
  },
  
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
  
  addTracking: async (id: string, trackingNumber: string) => {
    const response = await api.patch(`/orders/${id}/tracking`, { trackingNumber });
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  updateProfile: async (userData: any) => {
    const response = await api.patch('/users/me', userData);
    return response.data;
  },
};

export default api;