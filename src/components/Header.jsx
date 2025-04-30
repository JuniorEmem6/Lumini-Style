import React from "react";
import { FiShoppingCart, FiSearch, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Brand Name */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">LUMINA</span>
          <span className="text-secondary font-medium">STYLE</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-dark hover:text-primary font-medium">Home</a>
          <a href="#" className="text-dark hover:text-primary font-medium">Shop</a>
          <a href="#" className="text-dark hover:text-primary font-medium">Collections</a>
          <a href="#" className="text-dark hover:text-primary font-medium">About</a>
        </nav>

        {/* Icons (Cart, User) */}
        <div className="flex items-center space-x-6">
          <button className="text-dark hover:text-primary">
            <FiUser size={20} />
          </button>
          <button className="relative text-dark hover:text-primary">
            <FiShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;