import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart, LogOut } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const { items } = useCartStore();
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
  
  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900">ModernShop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-500'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({isActive}) => 
                `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-500'}`
              }
            >
              Products
            </NavLink>
            {isAuthenticated && user?.roles.includes('admin') && (
              <NavLink 
                to="/admin" 
                className={({isActive}) => 
                  `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-500'}`
                }
              >
                Admin
              </NavLink>
            )}
          </nav>

          {/* Right Navigation - User, Search, Cart */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="p-1 rounded-full text-gray-600 hover:text-primary-500 focus:outline-none"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>

            <Link 
              to="/favorites" 
              className="p-1 rounded-full text-gray-600 hover:text-primary-500 focus:outline-none hidden sm:block"
              aria-label="Favorites"
            >
              <Heart className="h-6 w-6" />
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-1 rounded-full text-gray-600 hover:text-primary-500 focus:outline-none"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.firstName}
                  </span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="inline h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="p-1 rounded-full text-gray-600 hover:text-primary-500 focus:outline-none"
                aria-label="Sign in"
              >
                <User className="h-6 w-6" />
              </Link>
            )}

            <Link 
              to="/cart" 
              className="p-1 rounded-full text-gray-600 hover:text-primary-500 focus:outline-none relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-primary-500 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-1 rounded-full text-gray-600 hover:text-primary-500 focus:outline-none"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="py-3 px-4 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              <button 
                onClick={toggleSearch}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
            >
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                >
                  Profile
                </Link>
                <Link 
                  to="/orders" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                >
                  My Orders
                </Link>
                {user?.roles.includes('admin') && (
                  <Link 
                    to="/admin" 
                    onClick={toggleMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link 
              to="/favorites" 
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
            >
              Favorites
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;