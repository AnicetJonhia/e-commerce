import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { mockProducts } from '../../data/mockData';

const FeaturedProducts: React.FC = () => {
  const { addItem } = useCartStore();
  
  const featuredProducts = mockProducts.filter(product => product.featured).slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <Link to={`/products/${product.id}`} className="block relative">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover object-center"
              />
            </div>
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-accent-500 text-white px-2 py-1 text-xs font-semibold rounded">
                {product.discount}% OFF
              </div>
            )}
          </Link>
          
          <div className="p-4">
            <Link to={`/products/${product.id}`}>
              <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            
            <div className="mt-1 flex items-center">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                  />
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-500">
                ({product.reviewCount} reviews)
              </span>
            </div>
            
            <div className="mt-2 flex items-center justify-between">
              <div>
                {product.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <button
                onClick={() => addItem(product)}
                className="flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full transition-colors"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;