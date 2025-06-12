import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Package, CreditCard, LogOut, User as UserIcon, ShoppingBag } from 'lucide-react';

// Mock order history data
const mockOrders = [
  {
    id: '#ORD12345',
    date: '2023-04-15',
    total: 129.99,
    status: 'Delivered',
    items: 3
  },
  {
    id: '#ORD12346',
    date: '2023-03-22',
    total: 89.95,
    status: 'Shipped',
    items: 2
  },
  {
    id: '#ORD12347',
    date: '2023-02-10',
    total: 234.50,
    status: 'Delivered',
    items: 4
  }
];

// Mock user data
const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zip: '10001',
  country: 'United States'
};

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Orders</h3>
            {mockOrders.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {mockOrders.map((order) => (
                    <li key={order.id}>
                      <Link to={`/orders/${order.id}`} className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-primary-600 truncate">{order.id}</p>
                              <p className={`ml-4 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'Delivered' 
                                  ? 'bg-success-100 text-success-800'
                                  : order.status === 'Shipped' 
                                  ? 'bg-secondary-100 text-secondary-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="text-sm text-gray-700 font-medium">${order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <ShoppingBag className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {order.items} {order.items === 1 ? 'item' : 'items'}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <time dateTime={order.date}>{new Date(order.date).toLocaleDateString()}</time>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-base font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  When you place your first order, it will appear here.
                </p>
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'account':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Account Information</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={mockUser.firstName}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue={mockUser.lastName}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={mockUser.email}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue={mockUser.phone}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-3">Shipping Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      defaultValue={mockUser.address}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      defaultValue={mockUser.city}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      defaultValue={mockUser.state}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      defaultValue={mockUser.zip}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      defaultValue={mockUser.country}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
      
      case 'payments':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Payment Methods</h3>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Visa ending in 4242</h4>
                    <p className="text-sm text-gray-500">Expires 12/2024</p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                    Default
                  </span>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  Edit
                </button>
                <span className="text-gray-300">|</span>
                <button className="text-sm font-medium text-error-600 hover:text-error-500">
                  Remove
                </button>
              </div>
            </div>
            
            <button className="mt-6 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Payment Method
            </button>
          </div>
        );
        
      case 'settings':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Account Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-3">Email Preferences</h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="order-updates"
                        name="order-updates"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="order-updates" className="text-sm font-medium text-gray-700">
                        Order Updates
                      </label>
                      <p className="text-xs text-gray-500">
                        Receive emails about your orders and shipping status
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="promotions"
                        name="promotions"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="promotions" className="text-sm font-medium text-gray-700">
                        Promotions and Sales
                      </label>
                      <p className="text-xs text-gray-500">
                        Receive emails about promotions, sales, and new products
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="newsletter" className="text-sm font-medium text-gray-700">
                        Newsletter
                      </label>
                      <p className="text-xs text-gray-500">
                        Receive our weekly newsletter with tips and trends
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-base font-medium text-gray-900 mb-3">Password</h4>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Change Password
                </button>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-base font-medium text-error-600 mb-3">Danger Zone</h4>
                <button className="inline-flex items-center px-4 py-2 border border-error-300 shadow-sm text-sm font-medium rounded-md text-error-700 bg-white hover:bg-error-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-500">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-600 mb-8">
          Welcome back, {mockUser.firstName}! Manage your orders, account information, and preferences.
        </p>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-8 text-center border-b border-gray-200">
                <div className="mx-auto h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-primary-600" />
                </div>
                <h2 className="mt-4 text-xl font-medium text-gray-900">
                  {mockUser.firstName} {mockUser.lastName}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {mockUser.email}
                </p>
              </div>
              
              <nav className="px-4 py-4 space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                    activeTab === 'orders' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5 mr-3" />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                    activeTab === 'account' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <UserIcon className="h-5 w-5 mr-3" />
                  Account Information
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                    activeTab === 'payments' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Payment Methods
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                    activeTab === 'settings' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </button>
                
                <button
                  onClick={() => console.log('Logging out...')}
                  className="flex items-center px-3 py-2 w-full rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 mt-4"
                >
                  <LogOut className="h-5 w-5 mr-3 text-gray-600" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="mt-8 lg:mt-0 lg:col-span-9">
            <div className="bg-white rounded-lg shadow px-6 py-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;