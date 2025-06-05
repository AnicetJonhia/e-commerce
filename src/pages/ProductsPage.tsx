import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { mockProducts, categories } from '../data/mockData';
import { useCartStore } from '../stores/cartStore';
import ProductCard from '../components/products/ProductCard';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { addItem } = useCartStore();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(queryParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState(mockProducts);

  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...mockProducts];
    
    // Apply category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        product => product.category === selectedCategory
      );
    }
    
    // Apply price range filter
    filteredProducts = filteredProducts.filter(
      product => {
        const effectivePrice = product.discount > 0 
          ? product.price * (1 - product.discount / 100)
          : product.price;
          
        return effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
      }
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, this would sort by date added
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        // Featured products first, then others
        filteredProducts.sort((a, b) => {
          if (a.featured === b.featured) return 0;
          return a.featured ? -1 : 1;
        });
    }
    
    setProducts(filteredProducts);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy !== 'featured') params.set('sort', sortBy);
    
    const newSearch = params.toString();
    const newPath = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
    navigate(newPath, { replace: true });
    
  }, [selectedCategory, priceRange, sortBy, navigate, location.pathname]);

  // Handle category filter
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };

  // Handle price range filter
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseFloat(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-600">
            Explore our collection of high-quality products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row">
          {/* Mobile filters toggle */}
          <button
            className="md:hidden flex items-center justify-center w-full bg-white p-3 rounded-md shadow-sm mb-4"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter className="h-5 w-5 mr-2 text-gray-500" />
            <span className="text-gray-700 font-medium">Filters</span>
          </button>

          {/* Filters sidebar - Mobile */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 flex z-40 md:hidden">
              {/* Overlay */}
              <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMobileFilterOpen(false)} />
              
              {/* Sidebar panel */}
              <div className="relative max-w-xs w-full h-full bg-white shadow-xl flex flex-col">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="p-4 flex-grow overflow-y-auto">
                  {/* Category filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <input
                            id={`mobile-category-${category.id}`}
                            type="checkbox"
                            checked={selectedCategory === category.id}
                            onChange={() => handleCategoryChange(category.id)}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor={`mobile-category-${category.id}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price range filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Min: ${priceRange[0]}</span>
                        <span className="text-sm text-gray-600">Max: ${priceRange[1]}</span>
                      </div>
                      <div>
                        <label htmlFor="mobile-price-min" className="text-sm text-gray-600 block mb-1">
                          Minimum ($0 - ${priceRange[1]})
                        </label>
                        <input
                          type="range"
                          id="mobile-price-min"
                          min="0"
                          max="2000"
                          step="10"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label htmlFor="mobile-price-max" className="text-sm text-gray-600 block mb-1">
                          Maximum (${priceRange[0]} - $2000)
                        </label>
                        <input
                          type="range"
                          id="mobile-price-max"
                          min="0"
                          max="2000"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      setSelectedCategory('');
                      setPriceRange([0, 2000]);
                      setSortBy('featured');
                    }}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters sidebar - Desktop */}
          <div className="hidden md:block w-64 mr-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
              
              {/* Category filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={`category-${category.id}`}
                        type="checkbox"
                        checked={selectedCategory === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Min: ${priceRange[0]}</span>
                    <span className="text-sm text-gray-600">Max: ${priceRange[1]}</span>
                  </div>
                  <div>
                    <label htmlFor="price-min" className="text-sm text-gray-600 block mb-1">
                      Minimum ($0 - ${priceRange[1]})
                    </label>
                    <input
                      type="range"
                      id="price-min"
                      min="0"
                      max="2000"
                      step="10"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="price-max" className="text-sm text-gray-600 block mb-1">
                      Maximum (${priceRange[0]} - $2000)
                    </label>
                    <input
                      type="range"
                      id="price-max"
                      min="0"
                      max="2000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange([0, 2000]);
                  setSortBy('featured');
                }}
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products section */}
          <div className="flex-grow">
            {/* Sort options */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center">
                <SlidersHorizontal className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Products grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">
                  Try changing your filters or search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;