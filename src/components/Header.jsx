import React, { useState } from 'react';
import { FiShoppingCart, FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar (Logo + Icons) */}
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button (Hidden on desktop) */}
          <button 
            className="md:hidden text-dark hover:text-[#4F46E5]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#4F46E5]">LUMINA</span>
            <span className="text-[#10B981] font-medium hidden sm:inline">STYLE</span>
          </div>

          {/* Desktop Search (Hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Desktop Icons (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-[#1F2937] hover:text-[#4F46E5]">
              <FiUser size={20} />
            </button>
            <button className="relative text-[#1F2937] hover:text-[#4F46E5]">
              <FiShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
          </div>

          {/* Mobile Search & Cart (Hidden on desktop) */}
          <div className="flex md:hidden items-center space-x-4">
            <button className="text-[#1F2937] hover:text-[#4F46E5]">
              <FiSearch size={20} />
            </button>
            <button className="relative text-[#1F2937] hover:text-[#4F46E5]">
              <FiShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Appears when search icon clicked) */}
        {searchQuery !== '' && (
          <div className="mt-2 md:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu (Slide-down animation) */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300`}>
          <nav className="flex flex-col space-y-4 mt-4 pb-4 border-t border-gray-100">
            <a href="#" className="text-[#1F2937] hover:text-[#4F46E5] font-medium py-2">Home</a>
            <a href="#" className="text-[#1F2937] hover:text-[#4F46E5] font-medium py-2">Shop</a>
            <a href="#" className="text-[#1F2937] hover:text-[#4F46E5] font-medium py-2">Collections</a>
            <a href="#" className="text-[#1F2937] hover:text-[#4F46E5] font-medium py-2">About</a>
            <a href="#" className="text-[#1F2937] hover:text-[#4F46E5] font-medium py-2">Account</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;