import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock, Award } from 'lucide-react';
import FeaturedProducts from '../components/products/FeaturedProducts';
import CategoryGrid from '../components/category/CategoryGrid';
import Newsletter from '../components/common/Newsletter';
import { useProductsStore } from '../stores/productsStore';

const HomePage: React.FC = () => {
  const { fetchFeaturedProducts, fetchCategories } = useProductsStore();

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, [fetchFeaturedProducts, fetchCategories]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Discover Your Style with <span className="text-primary-400">ModernShop</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our premium collection of fashion, home goods, and accessories 
              curated for the modern lifestyle.
            </p>
            <div className="space-x-4">
              <Link 
                to="/products" 
                className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
              >
                Shop Now
              </Link>
              <Link 
                to="/products?featured=true" 
                className="inline-block bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-gray-900 transition duration-200"
              >
                Featured Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="mt-4 text-lg text-gray-600">Explore our wide range of products</p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link 
              to="/products" 
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold">Summer Sale Is On!</h2>
              <p className="mt-2 text-primary-100">Get up to 50% off on selected items.</p>
            </div>
            <Link 
              to="/products?sale=true" 
              className="bg-white text-primary-600 hover:bg-primary-50 font-semibold px-6 py-3 rounded-md transition duration-200"
            >
              Shop the Sale
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600">Trusted by thousands of satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The quality of the products exceeded my expectations. Fast shipping and excellent customer service too!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                  SM
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-semibold text-gray-900">Sarah M.</h4>
                  <p className="text-sm text-gray-500">Loyal Customer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "ModernShop has become my go-to for everything. Their attention to detail and product selection is unmatched."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                  JD
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-semibold text-gray-900">James D.</h4>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "I appreciate the easy returns process and how well everything is packaged. Will definitely shop here again!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                  AL
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-semibold text-gray-900">Anna L.</h4>
                  <p className="text-sm text-gray-500">New Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Shop With Us</h2>
            <p className="mt-4 text-lg text-gray-600">We're committed to providing the best shopping experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $50</p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">100% protected transactions</p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery on all items</p>
            </div>
            
            {/* Feature 4 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">30-day money back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default HomePage;