import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiShoppingBag, FiX, FiClock } from "react-icons/fi";
import ShopTheLookModal from "./ShopTheLook";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showShopTheLook, setShowShopTheLook] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const controls = useAnimation();
  const videoRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 30,
    seconds: 0,
  });

  // Featured collections
  const slides = [
    {
      title: "Summer Collection",
      subtitle: "Fresh Styles for Warm Days",
      description:
        "Discover lightweight fabrics and vibrant designs perfect for your summer adventures",
      cta: "Shop Now",
      bgColor: "from-amber-100 to-pink-100",
      textColor: "text-amber-900",
      media: {
        type: "video",
        src: "/summer-bg.mp4",
        poster: "/summer-poster.jpg",
      },
      products: [
        {
          id: 1,
          name: "Linen Shirt",
          price: 49.99,
          position: "left-1/4 top-1/3",
        },
        {
          id: 2,
          name: "Straw Hat",
          price: 34.99,
          position: "right-1/4 top-1/4",
        },
        {
          id: 3,
          name: "Canvas Shoes",
          price: 59.99,
          position: "left-1/3 bottom-1/4",
        },
      ],
      discount: "30% OFF",
      expiresIn: 6, // hours
    },
    {
      title: "Premium Essentials",
      subtitle: "Timeless Quality",
      description:
        "Elevate your everyday with our signature collection of wardrobe staples",
      cta: "Explore",
      bgColor: "from-gray-100 to-blue-50",
      textColor: "text-gray-900",
      media: {
        type: "image",
        src: "/premium-essentials.jpg",
      },
      products: [
        {
          id: 4,
          name: "Cashmere Sweater",
          price: 129.99,
          position: "right-1/4 top-1/3",
        },
        {
          id: 5,
          name: "Leather Belt",
          price: 79.99,
          position: "left-1/4 bottom-1/3",
        },
      ],
      badge: "BESTSELLER",
    },
    {
      title: "Eco Collection",
      subtitle: "Sustainable Fashion",
      description:
        "Ethically crafted pieces that look good and do good for the planet",
      cta: "Discover",
      bgColor: "from-emerald-50 to-teal-100",
      textColor: "text-emerald-900",
      media: {
        type: "video",
        src: "/eco-bg.mp4",
        poster: "/eco-poster.jpg",
      },
      products: [
        {
          id: 6,
          name: "Organic Cotton Dress",
          price: 89.99,
          position: "left-1/3 top-1/4",
        },
        {
          id: 7,
          name: "Recycled Sunglasses",
          price: 45.99,
          position: "right-1/4 bottom-1/3",
        },
        {
          id: 8,
          name: "Hemp Tote Bag",
          price: 29.99,
          position: "center bottom-1/4",
        },
      ],
      tag: "NEW",
    },
  ];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1;
        const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes;
        const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours;

        return {
          hours: newHours < 0 ? 0 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Video play/pause on slide change
  useEffect(() => {
    if (slides[currentSlide].media.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  }, [currentSlide]);

  const handleSlideChange = (index) => {
    controls.start({
      opacity: [0, 1],
      x: [50, 0],
      transition: { duration: 0.8 },
    });
    setCurrentSlide(index);
    setTimeLeft({
      hours: slides[index].expiresIn || 0,
      minutes: 30,
      seconds: 0,
    });
  };

  // Animation variants
  const slideVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 },
  };

  const productDotHover = {
    scale: 1.5,
    backgroundColor: "rgba(255,255,255,0.8)",
    transition: { duration: 0.2 },
  };

  return (
    <section
      className={`relative overflow-hidden bg-linear-to-r ${slides[currentSlide].bgColor} transition-colors duration-1000 min-h-screen`}
    >
      {/* Media Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides[currentSlide].media.type === "video" ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              muted
              loop
              playsInline
              poster={slides[currentSlide].media.poster}
            >
              <source src={slides[currentSlide].media.src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </>
        ) : (
          <img
            src={slides[currentSlide].media.src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center min-h-[70vh]">
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
                {/* Promotional Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {slides[currentSlide].discount && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                    >
                      {slides[currentSlide].discount}
                      {slides[currentSlide].expiresIn && (
                        <span className="ml-2 flex items-center">
                          <FiClock className="mr-1" />
                          {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
                        </span>
                      )}
                    </motion.span>
                  )}
                  {slides[currentSlide].badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold"
                    >
                      {slides[currentSlide].badge}
                    </motion.span>
                  )}
                  {slides[currentSlide].tag && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                    >
                      {slides[currentSlide].tag}
                    </motion.span>
                  )}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <h2 className="text-xl md:text-2xl font-medium mb-6">
                  {slides[currentSlide].subtitle}
                </h2>
                <p className="text-lg mb-8 max-w-lg">
                  {slides[currentSlide].description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.98 }}
                    className={`px-8 py-3 rounded-full font-bold ${slides[currentSlide].textColor} bg-white hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center`}
                  >
                    {slides[currentSlide].cta}
                    <FiArrowRight className="ml-2" />
                  </motion.button>

                  {slides[currentSlide].products.length > 0 && (
                    <motion.button
                      whileHover={buttonHover}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowShopTheLook(true)}
                      className="px-6 py-3 rounded-full font-bold bg-black bg-opacity-70 text-white hover:bg-opacity-90 transition-all duration-300 shadow-md"
                    >
                      Shop the Look
                    </motion.button>
                  )}
                </div>

                <div className="mt-10 flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentSlide === index
                          ? "bg-current scale-125"
                          : "bg-gray-300"
                      } ${slides[currentSlide].textColor} opacity-${
                        currentSlide === index ? "100" : "50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Area with Shop the Look Hotspots */}
          <div className="md:w-1/2 relative h-full min-h-[400px]">
            <div className="relative w-full h-full">
              {slides[currentSlide].media.type === "image" ? (
                <img
                  src={slides[currentSlide].media.src}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-contain object-center rounded-lg shadow-xl"
                />
              ) : (
                <video
                  className="w-full h-full object-contain object-center rounded-lg shadow-xl"
                  muted
                  loop
                  autoPlay
                  playsInline
                >
                  <source
                    src={slides[currentSlide].media.src}
                    type="video/mp4"
                  />
                </video>
              )}

              {/* Product Hotspots */}
              {slides[currentSlide].products.map((product) => (
                <motion.div
                  key={product.id}
                  className={`absolute ${product.position} transform -translate-x-1/2 -translate-y-1/2`}
                  whileHover="hover"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full bg-white bg-opacity-50 border-2 border-white cursor-pointer flex items-center justify-center"
                    variants={{
                      hover: productDotHover,
                    }}
                    onHoverStart={() => setHoveredItem(product)}
                    onHoverEnd={() => setHoveredItem(null)}
                    onClick={() => setShowShopTheLook(true)}
                  >
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                  </motion.div>

                  {hoveredItem?.id === product.id && (
                    <motion.div
                      className="absolute left-full ml-2 w-48 bg-white rounded-lg shadow-lg p-3 z-50"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <p className="font-bold">{product.name}</p>
                      <p className="text-gray-600">
                        ${product.price.toFixed(2)}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop the Look Modal */}
      <AnimatePresence>
        {showShopTheLook && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-70 z-50"
              onClick={() => setShowShopTheLook(false)}
            />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Shop This Look</h3>
                  <button
                    onClick={() => setShowShopTheLook(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                    {slides[currentSlide].media.type === "image" ? (
                      <img
                        src={slides[currentSlide].media.src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        className="w-full h-full object-cover"
                        muted
                        loop
                        autoPlay
                        playsInline
                      >
                        <source
                          src={slides[currentSlide].media.src}
                          type="video/mp4"
                        />
                      </video>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4">
                      Featured Products
                    </h4>
                    <div className="space-y-4">
                      {slides[currentSlide].products.map((product) => (
                        <div
                          key={product.id}
                          className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0"></div>
                          <div className="flex-1">
                            <h5 className="font-medium">{product.name}</h5>
                            <p className="text-gray-600">
                              ${product.price.toFixed(2)}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <button className="px-3 py-1 bg-black text-white text-sm rounded-full">
                                Add to Cart
                              </button>
                              <button className="px-3 py-1 border border-gray-300 text-sm rounded-full">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {showShopTheLook && (
                      <ShopTheLookModal
                        isOpen={showShopTheLook}
                        onClose={() => setShowShopTheLook(false)}
                        media={slides[currentSlide].media}
                        products={slides[currentSlide].products}
                        discount={slides[currentSlide].discount}
                        timeLeft={timeLeft}
                        collectionTitle={slides[currentSlide].title}
                      />
                    )}

                    {slides[currentSlide].discount && (
                      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                        <p className="font-bold text-amber-800">
                          {slides[currentSlide].discount} OFF - Ends in{" "}
                          {timeLeft.hours}h {timeLeft.minutes}m
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
