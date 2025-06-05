import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

const CategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link 
          key={category.id}
          to={`/products?category=${category.id}`}
          className="group relative overflow-hidden rounded-lg"
        >
          {/* Background Image */}
          <div className="aspect-w-3 aspect-h-2">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent opacity-80" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
            <p className="text-sm text-gray-200 mb-4">{category.itemCount} Products</p>
            <span className="inline-block bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors border border-white border-opacity-40">
              Browse Collection
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;