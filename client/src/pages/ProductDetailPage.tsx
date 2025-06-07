import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, Heart, ShoppingBag, ArrowRight, Truck, Shield, Clock } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { getProductById, getRelatedProducts, Product } from '../data/mockData';
import ProductCard from '../components/products/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 0;
  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(productId);

  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setActiveImageIndex(0);
  }, [productId]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/products" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          Browse all products <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    );
  }

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-8">
          <ol className="list-none p-0 flex flex-wrap">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-800">{product.name}</span>
            </li>
          </ol>
        </nav>

        {/* Product details */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product images */}
          <div className="mb-8 lg:mb-0">
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-96 object-contain bg-gray-100"
              />
            </div>
            
            {/* Thumbnail gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded border-2 ${
                    activeImageIndex === index 
                      ? 'border-primary-500' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-gray-500">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900 mr-2">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-accent-100 text-accent-800">
                    Save {product.discount}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm text-gray-700 mb-6">
              <p>{product.description}</p>
            </div>

            {/* Availability */}
            <div className="flex items-center mb-6">
              <div className={`h-3 w-3 rounded-full ${product.stock > 0 ? 'bg-success-500' : 'bg-error-500'} mr-2`}></div>
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-success-700' : 'text-error-700'}`}>
                {product.stock > 0 
                  ? product.stock > 10 
                    ? 'In Stock' 
                    : `Only ${product.stock} left in stock!` 
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className={`p-2 border border-gray-300 rounded-l-md ${
                    quantity <= 1 ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="p-2 w-16 text-center border-t border-b border-gray-300"
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className={`p-2 border border-gray-300 rounded-r-md ${
                    quantity >= product.stock ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Add to cart & Wishlist buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <button
                onClick={() => addItem(product, quantity)}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  product.stock === 0 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                }`}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button 
                className="flex-1 sm:flex-none flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </button>
            </div>

            {/* Product highlights */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Free shipping</h4>
                  <p className="mt-1 text-xs text-gray-500">On orders over $50. Get it within 2-5 business days.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Warranty</h4>
                  <p className="mt-1 text-xs text-gray-500">1 year limited warranty. Learn more about our return policy.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Secure checkout</h4>
                  <p className="mt-1 text-xs text-gray-500">We use industry standard encryption to protect your data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;