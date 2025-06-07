import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically call an API to register the email
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-secondary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-12 w-12 text-white opacity-75 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-secondary-200 mb-8">
            Subscribe to our newsletter for exclusive offers, product launches, and style tips.
          </p>
          
          {isSubscribed ? (
            <div className="bg-secondary-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-xl font-medium">Thanks for subscribing!</p>
              <p className="mt-2 text-secondary-300">
                You'll receive our next newsletter in your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 px-6 py-3 text-white font-semibold rounded-r-md transition duration-200"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-secondary-300 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;