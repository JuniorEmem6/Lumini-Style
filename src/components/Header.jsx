import React, { useState, useEffect, useRef } from "react";
import {
  FiShoppingCart,
  FiSearch,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiSun,
  FiMoon,
  FiHeart,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext"; // Custom hook for cart management
import { Link } from "react-router-dom";

const Header = () => {
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    return (
      localStorage.getItem("darkMode") === "true" ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches &&
        localStorage.getItem("darkMode") !== "false")
    );
  });

  // Cart functionality
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Refs for closing dropdowns when clicking outside
  const userDropdownRef = useRef(null);
  const cartRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !event.target.closest("[data-cart-button]")
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dark mode and persist to localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  // Animation variants
  const mobileMenuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  const cartDrawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a
              href="/"
              className="text-2xl font-bold text-[#4F46E5] dark:text-[#4F46E5]-300"
            >
              LUMINA
            </a>
            <span className="text-[#10B981] dark:text-[#10B981]-300 font-medium hidden sm:inline">
              STYLE
            </span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] dark:focus:ring-[#4F46E5]-300 focus:border-transparent bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Wishlist */}
            <a
              href="/wishlist"
              className="text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300 transition-colors"
            >
              <FiHeart size={20} />
            </a>

            {/* User Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300 transition-colors"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                aria-expanded={isUserDropdownOpen}
              >
                <FiUser size={20} />
                <motion.span
                  className="ml-1"
                  animate={{ rotate: isUserDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
                  >
                    <a
                      href="/account"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      My Account
                    </a>
                    <a
                      href="/orders"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Orders
                    </a>
                    <a
                      href="/wishlist"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Wishlist
                    </a>
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    <a
                      href="/logout"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Sign Out
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart with counter */}
            <button
              className="relative text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300 transition-colors"
              onClick={() => setIsCartOpen(true)}
              data-cart-button
              aria-label={`Cart (${cartItems.reduce(
                (total, item) => total + item.quantity,
                0
              )} items)`}
            >
              <FiShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] dark:bg-[#F59E0B]-dark text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              className="text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300 transition-colors"
              onClick={() => setSearchQuery(searchQuery ? "" : " ")}
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>

            <button
              className="relative text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300 transition-colors"
              onClick={() => setIsCartOpen(true)}
              data-cart-button
              aria-label={`Cart (${cartItems.reduce(
                (total, item) => total + item.quantity,
                0
              )} items)`}
            >
              <FiShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] dark:bg-[#F59E0B]-dark text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {searchQuery !== undefined && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: searchQuery !== "" ? "auto" : 0,
                opacity: searchQuery !== "" ? 1 : 0,
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`mt-2 md:hidden overflow-hidden ${
                searchQuery !== "" ? "block" : "hidden"
              }`}
            >
              <div className="relative pb-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] dark:focus:ring-[#4F46E5]-300 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                />
                <FiSearch className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                <Link to="/">
                  <p className="text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300 font-medium py-2 transition-colors">
                    Home
                  </p>
                </Link>
                <Link to="/shop">
                  <p className="text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300 font-medium py-2 transition-colors">
                    Shop
                  </p>
                </Link>
                <Link to="/collections">
                  <p className="text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]-300 font-medium py-2 transition-colors">
                    Collections
                  </p>
                </Link>
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={toggleDarkMode}
                    className="ml-2 p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    aria-label={
                      darkMode ? "Switch to light mode" : "Switch to dark mode"
                    }
                  >
                    {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              ref={cartRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cartDrawerVariants}
              className="fixed inset-y-0 right-0 max-w-full flex z-50"
            >
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl">
                  <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Your Cart
                    </h2>
                    <button
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                      onClick={() => setIsCartOpen(false)}
                      aria-label="Close cart"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          Your cart is empty
                        </p>
                        <a
                          href="/shop"
                          className="inline-block bg-[#4F46E5] dark:bg-[#4F46E5]-300 hover:bg-[#4F46E5]-600 dark:hover:bg-[#4F46E5]-400 text-white py-2 px-4 rounded-md transition-colors"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Continue Shopping
                        </a>
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {cartItems.map((item) => (
                          <motion.li
                            key={item.id}
                            className="py-4 flex"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex-shrink-0 w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                              <img
                                src={item.image || "/placeholder-product.jpg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                <h3>{item.name}</h3>
                                <p>${item.price.toFixed(2)}</p>
                              </div>
                              <div className="flex items-center mt-2">
                                <button
                                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="mx-2 text-gray-700 dark:text-gray-300">
                                  {item.quantity}
                                </span>
                                <button
                                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                                <button
                                  className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                                  onClick={() => removeFromCart(item.id)}
                                  aria-label="Remove item"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex justify-between text-lg font-medium text-gray-900 dark:text-white mb-4">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span>Shipping calculated at checkout</span>
                      </div>
                      <a
                        href="/checkout"
                        className="block w-full bg-[#4F46E5] dark:bg-[#4F46E5]-300 hover:bg-[#4F46E5]-600 dark:hover:bg-[#4F46E5]-400 text-white py-2 px-4 rounded-md text-center transition-colors"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Proceed to Checkout
                      </a>
                      <a
                        href="/shop"
                        className="block w-full mt-2 text-center text-[#4F46E5] dark:text-[#4F46E5]-300 hover:text-[#4F46E5]-600 dark:hover:text-[#4F46E5]-400 transition-colors"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Continue Shopping
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
