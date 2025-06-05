import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShoppingBag, CheckCircle } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [orderComplete, setOrderComplete] = useState(false);
  
  const cartTotal = getCartTotal();
  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const taxAmount = cartTotal * 0.07; // 7% tax
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    setCurrentStep('confirmation');
    setOrderComplete(true);
    clearCart();
    window.scrollTo(0, 0);
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // If cart is empty and order is not complete, redirect to cart
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">
            You can't proceed to checkout with an empty cart.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Order confirmation screen
  if (currentStep === 'confirmation') {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100">
              <CheckCircle className="h-10 w-10 text-success-600" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Thank You!</h1>
            <p className="mt-4 text-lg text-gray-600">
              Your order has been placed successfully.
            </p>
            <p className="mt-2 text-gray-600">
              Order #: <span className="font-medium">ORD-{Math.floor(Math.random() * 10000000)}</span>
            </p>
            <p className="mt-2 text-gray-600">
              A confirmation has been sent to your email.
            </p>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order total:</span>
                  <span className="font-medium">${orderTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping address:</span>
                  <span className="text-right">
                    {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated delivery:</span>
                  <span className="font-medium">
                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
        
        {/* Checkout steps indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center relative">
              <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
                currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'confirmation' 
                  ? 'bg-primary-600' 
                  : 'bg-gray-300'
              } text-white font-medium text-lg`}>
                1
              </div>
              <div className="ml-3 font-medium text-sm text-gray-900">Shipping</div>
            </div>
            <div className={`w-24 h-1 mx-2 ${
              currentStep === 'payment' || currentStep === 'confirmation' 
                ? 'bg-primary-600' 
                : 'bg-gray-300'
            }`} />
            <div className="flex items-center relative">
              <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
                currentStep === 'payment' || currentStep === 'confirmation' 
                  ? 'bg-primary-600' 
                  : 'bg-gray-300'
              } text-white font-medium text-lg`}>
                2
              </div>
              <div className="ml-3 font-medium text-sm text-gray-900">Payment</div>
            </div>
            <div className={`w-24 h-1 mx-2 ${
              currentStep === 'confirmation' 
                ? 'bg-primary-600' 
                : 'bg-gray-300'
            }`} />
            <div className="flex items-center relative">
              <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
                currentStep === 'confirmation' 
                  ? 'bg-primary-600' 
                  : 'bg-gray-300'
              } text-white font-medium text-lg`}>
                3
              </div>
              <div className="ml-3 font-medium text-sm text-gray-900">Confirmation</div>
            </div>
          </div>
        </div>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Shipping information form */}
              {currentStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleShippingChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}
              
              {/* Payment information form */}
              {currentStep === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Information</h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Credit Card</h3>
                      <div className="flex space-x-2">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="h-8" />
                        <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" className="h-8" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={paymentInfo.cardName}
                          onChange={handlePaymentChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentChange}
                            placeholder="1234 5678 9012 3456"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                          <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="expMonth" className="block text-sm font-medium text-gray-700 mb-1">
                            Month
                          </label>
                          <select
                            id="expMonth"
                            name="expMonth"
                            value={paymentInfo.expMonth}
                            onChange={handlePaymentChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <option key={month} value={month.toString().padStart(2, '0')}>
                                {month.toString().padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="expYear" className="block text-sm font-medium text-gray-700 mb-1">
                            Year
                          </label>
                          <select
                            id="expYear"
                            name="expYear"
                            value={paymentInfo.expYear}
                            onChange={handlePaymentChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="">YYYY</option>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                              <option key={year} value={year.toString()}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentChange}
                            placeholder="123"
                            required
                            maxLength={4}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
                    
                    <div className="flex items-center mb-4">
                      <input
                        id="same-address"
                        name="sameAddress"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="same-address" className="ml-2 block text-sm text-gray-700">
                        Same as shipping address
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      className="sm:w-1/2 bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="sm:w-1/2 bg-primary-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="max-h-64 overflow-y-auto mb-4">
                  <ul className="divide-y divide-gray-200">
                    {items.map(item => (
                      <li key={item.id} className="py-4 flex">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <div className="text-gray-600">Subtotal</div>
                    <div className="text-gray-900 font-medium">${cartTotal.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-600">Shipping</div>
                    <div className="text-gray-900 font-medium">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-600">Tax</div>
                    <div className="text-gray-900 font-medium">${taxAmount.toFixed(2)}</div>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <div className="text-lg font-medium text-gray-900">Total</div>
                    <div className="text-lg font-medium text-gray-900">
                      ${orderTotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;