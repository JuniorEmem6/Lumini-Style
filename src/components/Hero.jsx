import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Featured collections
  const slides = [
    {
      title: "Summer Collection",
      subtitle: "Fresh Styles for Warm Days",
      description: "Discover lightweight fabrics and vibrant designs perfect for your summer adventures",
      cta: "Shop Now",
      bgColor: "bg-gradient-to-r from-amber-100 to-pink-100",
      textColor: "text-amber-900",
      image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600",
      discount: "30% OFF"
    },
    {
      title: "Premium Essentials",
      subtitle: "Timeless Quality",
      description: "Elevate your everyday with our signature collection of wardrobe staples",
      cta: "Explore",
      bgColor: "bg-gradient-to-r from-gray-100 to-blue-50",
      textColor: "text-gray-900",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600",
      badge: "BESTSELLER"
    },
    {
      title: "Eco Collection",
      subtitle: "Sustainable Fashion",
      description: "Ethically crafted pieces that look good and do good for the planet",
      cta: "Discover",
      bgColor: "bg-gradient-to-r from-emerald-50 to-teal-100",
      textColor: "text-emerald-900",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600",
      tag: "NEW"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      controls.start({
        opacity: [0, 1],
        x: [50, 0],
        transition: { duration: 0.8 }
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [controls, slides.length]);

  // Animation variants
  const slideVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  };

  const buttonTap = {
    scale: 0.98,
    transition: { duration: 0.2 }
  };

  return (
    <section className={`relative overflow-hidden ${slides[currentSlide].bgColor} transition-colors duration-1000`}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 z-10 mb-10 md:mb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial="enter"
                animate="center"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.8 }}
                className={`${slides[currentSlide].textColor}`}
              >
                {slides[currentSlide].discount && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4"
                  >
                    {slides[currentSlide].discount}
                  </motion.span>
                )}
                {slides[currentSlide].badge && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold mb-4"
                  >
                    {slides[currentSlide].badge}
                  </motion.span>
                )}
                {slides[currentSlide].tag && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4"
                  >
                    {slides[currentSlide].tag}
                  </motion.span>
                )}
                
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <h2 className="text-xl md:text-2xl font-medium mb-6">
                  {slides[currentSlide].subtitle}
                </h2>
                <p className="text-lg mb-8 max-w-lg">
                  {slides[currentSlide].description}
                </p>
                
                <motion.div
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="inline-block"
                >
                  <a 
                    href="/shop" 
                    className={`flex items-center justify-center px-8 py-3 rounded-full font-bold ${slides[currentSlide].textColor} bg-white hover:bg-opacity-90 transition-all duration-300 shadow-md`}
                  >
                    {slides[currentSlide].cta}
                    <motion.span
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2"
                    >
                      <FiArrowRight />
                    </motion.span>
                  </a>
                </motion.div>
                
                <div className="mt-10 flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-current' : 'bg-gray-300'} ${slides[currentSlide].textColor} opacity-${currentSlide === index ? '100' : '50'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image */}
          <div className="md:w-1/2 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Product image placeholder - replace with actual image */}
                <div className="relative w-full h-80 md:h-96">
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="absolute h-full w-full object-contain object-center"
                  />
                </div>
                
                {/* Floating shopping button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute bottom-0 right-0 md:right-10 p-4 rounded-full shadow-xl ${slides[currentSlide].textColor.replace('text', 'bg')} bg-opacity-90 text-white`}
                >
                  <FiShoppingBag size={24} />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full ${slides[currentSlide].textColor.replace('text', 'bg')} bg-opacity-10`}></div>
        <div className={`absolute -left-10 -bottom-10 w-40 h-40 rounded-full ${slides[currentSlide].textColor.replace('text', 'bg')} bg-opacity-10`}></div>
      </div>
    </section>
  );
};

export default HeroSection;