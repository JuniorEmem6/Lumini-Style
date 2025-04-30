import React, { useState, useEffect } from 'react';
import { FiFilter, FiX, FiStar, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';

const ShopPage = () => {
  // Sample product data
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Premium Linen Shirt', 
      price: 59.99,
      salePrice: 49.99,
      colors: ['#4F46E5', '#10B981', '#F59E0B'],
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'shirts',
      rating: 4.5,
      reviewCount: 24,
      isNew: true,
      isBestSeller: false,
      image: '/linen-shirt.jpg'
    },
    { 
      id: 2, 
      name: 'Slim Fit Jeans', 
      price: 89.99,
      colors: ['#1F2937', '#6B7280'],
      sizes: ['28', '30', '32', '34'],
      category: 'pants',
      rating: 4.2,
      reviewCount: 18,
      isNew: false,
      isBestSeller: true,
      image: '/slim-jeans.jpg'
    },
    // Add more products...
  ]);

  // Filter states
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 200],
    colors: [],
    sizes: [],
    sortBy: 'featured'
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Available filter options
  const categories = ['all', 'shirts', 'pants', 'dresses', 'accessories'];
  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#1F2937', '#6B7280', '#EC4899'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Avg. Rating' }
  ];

  // Apply filters
  const filteredProducts = products.filter(product => {
    return (
      (filters.category === 'all' || product.category === filters.category) &&
      (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
      (filters.colors.length === 0 || filters.colors.some(color => product.colors?.includes(color))) &&
      (filters.sizes.length === 0 || filters.sizes.some(size => product.sizes?.includes(size)))
    );
  }).sort((a, b) => {
    switch(filters.sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.isNew - a.isNew;
      default: return a.id - b.id; // featured
    }
  });

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 200],
      colors: [],
      sizes: [],
      sortBy: 'featured'
    });
  };

  // Toggle color filter
  const toggleColorFilter = (color) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color) 
        : [...prev.colors, color]
    }));
  };

  // Toggle size filter
  const toggleSizeFilter = (size) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size) 
        : [...prev.sizes, size]
    }));
  };

  return (
    <>
    <Header />
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Category filter */}
                  <div>
                    <h3 className="font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category} className="flex items-center">
                          <input
                            type="radio"
                            checked={filters.category === category}
                            onChange={() => setFilters({...filters, category})}
                            className="mr-2"
                          />
                          <span className="capitalize">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price filter */}
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({
                        ...filters,
                        priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                      })}
                      className="w-full"
                    />
                  </div>

                  {/* Color filter */}
                  <div>
                    <h3 className="font-medium mb-3">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {colors.map(color => (
                        <button
                          key={color}
                          onClick={() => toggleColorFilter(color)}
                          className={`w-8 h-8 rounded-full border-2 ${filters.colors.includes(color) ? 'border-black' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                          aria-label={`Filter by ${color} color`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size filter */}
                  <div>
                    <h3 className="font-medium mb-3">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleSizeFilter(size)}
                          className={`w-10 h-10 flex items-center justify-center border rounded-md ${filters.sizes.includes(size) ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 border border-black rounded-md flex-1"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="px-4 py-2 bg-black text-white rounded-md flex-1"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 py-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shop</h1>
        </div>

        <div className="pt-6 pb-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className="hidden lg:block">
              <div className="sticky top-4 space-y-8">
                {/* Category filter */}
                <div>
                  <h2 className="font-bold mb-4">Category</h2>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          checked={filters.category === category}
                          onChange={() => setFilters({...filters, category})}
                          className="mr-2"
                        />
                        <span className="capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price filter */}
                <div>
                  <h2 className="font-bold mb-4">Price Range</h2>
                  <div className="flex items-center justify-between mb-2">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                    })}
                    className="w-full"
                  />
                </div>

                {/* Color filter */}
                <div>
                  <h2 className="font-bold mb-4">Colors</h2>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColorFilter(color)}
                        className={`w-8 h-8 rounded-full border-2 ${filters.colors.includes(color) ? 'border-black' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                        aria-label={`Filter by ${color} color`}
                      />
                    ))}
                  </div>
                </div>

                {/* Size filter */}
                <div>
                  <h2 className="font-bold mb-4">Sizes</h2>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSizeFilter(size)}
                        className={`w-10 h-10 flex items-center justify-center border rounded-md ${filters.sizes.includes(size) ? 'bg-black text-white' : 'bg-white text-black'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={resetFilters}
                  className="mt-4 text-sm underline"
                >
                  Reset all filters
                </button>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {/* Sort and filter bar */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 border px-4 py-2 rounded-md"
                >
                  <FiFilter />
                  <span>Filters</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {filteredProducts.length} products
                  </span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="border p-2 rounded-md text-sm"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-black text-white rounded-md"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="group relative">
                      {/* Badges */}
                      <div className="absolute top-2 left-2 z-10 flex gap-2">
                        {product.isNew && (
                          <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                            Bestseller
                          </span>
                        )}
                        {product.salePrice && (
                          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Wishlist button */}
                      <button className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all">
                        <FiHeart className="text-gray-700" />
                      </button>

                      {/* Product image */}
                      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-90">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Product info */}
                      <div className="mt-4">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            <a href={`/product/${product.id}`}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.name}
                            </a>
                          </h3>
                          <div className="flex items-center">
                            {product.salePrice ? (
                              <>
                                <p className="text-sm text-gray-900 font-bold">
                                  ${product.salePrice.toFixed(2)}
                                </p>
                                <p className="ml-2 text-sm text-gray-500 line-through">
                                  ${product.price.toFixed(2)}
                                </p>
                              </>
                            ) : (
                              <p className="text-sm text-gray-900 font-bold">
                                ${product.price.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="mt-1 flex items-center">
                          <div className="flex">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <FiStar
                                key={rating}
                                className={`h-4 w-4 ${product.rating > rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-xs text-gray-500">
                            ({product.reviewCount})
                          </span>
                        </div>

                        {/* Color options */}
                        {product.colors && (
                          <div className="mt-2 flex gap-1">
                            {product.colors.map(color => (
                              <span
                                key={color}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Quick add to cart */}
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="mt-4 w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setQuickViewProduct(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div 
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold">{quickViewProduct.name}</h2>
                    <button 
                      onClick={() => setQuickViewProduct(null)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={quickViewProduct.image}
                        alt={quickViewProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <FiStar
                              key={rating}
                              className={`h-5 w-5 ${quickViewProduct.rating > rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-500">
                            ({quickViewProduct.reviewCount} reviews)
                          </span>
                        </div>

                        {quickViewProduct.salePrice ? (
                          <div className="text-right">
                            <span className="text-2xl font-bold text-red-600">
                              ${quickViewProduct.salePrice.toFixed(2)}
                            </span>
                            <span className="ml-2 text-lg text-gray-500 line-through">
                              ${quickViewProduct.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold">
                            ${quickViewProduct.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <p className="mt-4 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>

                      {/* Color selection */}
                      {quickViewProduct.colors && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium">Color</h3>
                          <div className="mt-2 flex gap-3">
                            {quickViewProduct.colors.map(color => (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select ${color} color`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Size selection */}
                      {quickViewProduct.sizes && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium">Size</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {quickViewProduct.sizes.map(size => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-12 h-10 flex items-center justify-center border rounded-md ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-8 flex gap-4">
                        <div className="flex border rounded-md overflow-hidden">
                          <button className="px-3 py-2 bg-gray-100">-</button>
                          <span className="px-4 py-2 flex items-center justify-center">1</span>
                          <button className="px-3 py-2 bg-gray-100">+</button>
                        </div>
                        <button className="flex-1 bg-black text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                          <FiShoppingCart />
                          Add to Cart
                        </button>
                      </div>

                      <button className="mt-4 w-full py-2 border border-black rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                        <FiHeart />
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default ShopPage;