import React, { useState, useEffect } from 'react';
import { 
  FiShoppingCart, 
  FiSearch, 
  FiUser, 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiSun,
  FiMoon
} from 'react-icons/fi';

const Header = () => {
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sample cart items
  const cartItems = [
    { id: 1, name: 'Premium T-Shirt', price: 29.99, quantity: 2 },
    { id: 2, name: 'Designer Jeans', price: 59.99, quantity: 1 }
  ];

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-dark dark:text-white hover:text-primary dark:hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary dark:text-primary-light">LUMINA</span>
            <span className="text-secondary dark:text-secondary-light font-medium hidden sm:inline">STYLE</span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="text-dark dark:text-white hover:text-primary dark:hover:text-primary-light"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center text-dark dark:text-white hover:text-primary dark:hover:text-primary-light"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <FiUser size={20} />
                <FiChevronDown className={`ml-1 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-600">
                  <a href="#" className="block px-4 py-2 text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">My Account</a>
                  <a href="#" className="block px-4 py-2 text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">Orders</a>
                  <a href="#" className="block px-4 py-2 text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">Wishlist</a>
                  <div className="border-t border-gray-200 dark:border-gray-600"></div>
                  <a href="#" className="block px-4 py-2 text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">Sign Out</a>
                </div>
              )}
            </div>

            {/* Cart with counter */}
            <button 
              className="relative text-dark dark:text-white hover:text-primary dark:hover:text-primary-light"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-accent dark:bg-accent-dark text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              className="text-dark dark:text-white hover:text-primary dark:hover:text-primary-light"
              onClick={() => setSearchQuery(searchQuery ? '' : ' ')}
            >
              <FiSearch size={20} />
            </button>
            
            <button 
              className="relative text-dark dark:text-white hover:text-primary dark:hover:text-primary-light"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-accent dark:bg-accent-dark text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchQuery !== undefined && (
          <div className={`mt-2 md:hidden ${searchQuery !== '' ? 'block' : 'hidden'}`}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300`}>
          <nav className="flex flex-col space-y-4 mt-4 pb-4 border-t border-gray-200 dark:border-gray-600">
            <a href="#" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary-light font-medium py-2">Home</a>
            <a href="#" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary-light font-medium py-2">Shop</a>
            <a href="#" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary-light font-medium py-2">Collections</a>
            <a href="#" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary-light font-medium py-2">About</a>
            <div className="flex items-center justify-between pt-2">
              <span className="text-dark dark:text-white">Theme:</span>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="ml-2 p-1 rounded-full bg-gray-200 dark:bg-gray-600"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl">
                <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 dark:border-gray-600">
                  <h2 className="text-lg font-medium text-dark dark:text-white">Your Cart</h2>
                  <button 
                    className="text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">Your cart is empty</p>
                  ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                      {cartItems.map((item) => (
                        <li key={item.id} className="py-4 flex">
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                            {/* Product image placeholder */}
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              Image
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between text-base font-medium text-dark dark:text-white">
                              <h3>{item.name}</h3>
                              <p>${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center mt-2">
                              <button className="text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white">
                                -
                              </button>
                              <span className="mx-2 text-dark dark:text-white">{item.quantity}</span>
                              <button className="text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white">
                                +
                              </button>
                              <button className="ml-auto text-red-500 hover:text-red-700">
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 p-4">
                  <div className="flex justify-between text-lg font-medium text-dark dark:text-white mb-4">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-primary dark:bg-primary-light hover:bg-primary-dark dark:hover:bg-primary text-white py-2 px-4 rounded-md">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;