import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <Search className="mx-auto h-16 w-16 text-primary-500 mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page not found</h2>
        <p className="text-lg text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;