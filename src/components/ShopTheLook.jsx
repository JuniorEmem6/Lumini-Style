import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart, FiShare2, FiMessageSquare, FiStar } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaPinterest, FaWhatsapp } from 'react-icons/fa';

const ShopTheLookModal = ({ 
  isOpen, 
  onClose, 
  media, 
  products, 
  discount, 
  timeLeft,
  collectionTitle 
}) => {
  const [activeTab, setActiveTab] = useState('products');
  const [isWishlistHovered, setIsWishlistHovered] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  
  // Sample reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'Alex Johnson',
      rating: 5,
      date: '2023-05-15',
      comment: 'Absolutely love this collection! The quality is amazing and it looks even better in person.',
      productId: 4 // matches cashmere sweater
    },
    {
      id: 2,
      user: 'Sam Wilson',
      rating: 4,
      date: '2023-04-22',
      comment: 'Great style but runs a bit large. Would recommend sizing down.',
      productId: 1 // matches linen shirt
    },
    {
      id: 3,
      user: 'Taylor Smith',
      rating: 5,
      date: '2023-06-10',
      comment: 'My go-to summer outfit now! So comfortable and stylish.',
      productId: 6 // matches organic cotton dress
    }
  ]);

  // Generate share URL when modal opens
  useEffect(() => {
    if (isOpen) {
      const url = `${window.location.origin}/collections/${collectionTitle.toLowerCase().replace(/ /g, '-')}`;
      setShareUrl(url);
    }
  }, [isOpen, collectionTitle]);

  const handleShare = (platform) => {
    let shareLink = '';
    const text = `Check out this ${collectionTitle} collection at LuminaStyle!`;
    
    switch(platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'pinterest':
        shareLink = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(media.src)}&description=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(`${text} ${shareUrl}`);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
        return;
    }
    
    window.open(shareLink, '_blank', 'noopener,noreferrer');
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FiStar 
        key={i} 
        className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Shop This Look</h3>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleShare()}
                    onMouseEnter={() => setIsWishlistHovered(true)}
                    onMouseLeave={() => setIsWishlistHovered(false)}
                    className="p-2 rounded-full hover:bg-gray-100 relative"
                  >
                    <FiShare2 size={20} />
                    {isShared && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                      >
                        Link copied!
                      </motion.span>
                    )}
                  </button>
                  <button 
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FiHeart size={20} />
                  </button>
                  <button 
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Social Sharing Buttons */}
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isWishlistHovered ? 'auto' : 0, opacity: isWishlistHovered ? 1 : 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="flex space-x-2 pb-2">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebook size={16} />
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter size={16} />
                  </button>
                  <button 
                    onClick={() => handleShare('pinterest')}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    aria-label="Share on Pinterest"
                  >
                    <FaPinterest size={16} />
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp size={16} />
                  </button>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="flex border-b mb-6">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'products' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('products')}
                >
                  Products
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>

              {activeTab === 'products' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100">
                    {media.type === 'image' ? (
                      <img 
                        src={media.src} 
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
                        <source src={media.src} type="video/mp4" />
                      </video>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4">Featured Products</h4>
                    <div className="space-y-4">
                      {products.map(product => {
                        const productReviews = reviews.filter(r => r.productId === product.id);
                        const averageRating = productReviews.length > 0 
                          ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
                          : 0;
                        
                        return (
                          <div key={product.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                              <span className="text-gray-400 text-sm">Image</span>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium">{product.name}</h5>
                              <p className="text-gray-600">${product.price.toFixed(2)}</p>
                              
                              {productReviews.length > 0 && (
                                <div className="flex items-center mt-1">
                                  <div className="flex mr-1">
                                    {renderStars(Math.round(averageRating))}
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    ({productReviews.length})
                                  </span>
                                </div>
                              )}

                              <div className="flex gap-2 mt-2">
                                <button className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors">
                                  Add to Cart
                                </button>
                                <button className="px-3 py-1 border border-gray-300 text-sm rounded-full hover:bg-gray-100 transition-colors">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {discount && (
                      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                        <p className="font-bold text-amber-800">
                          {discount} OFF - Ends in {timeLeft.hours}h {timeLeft.minutes}m
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold">Customer Reviews</h4>
                  
                  {reviews.length === 0 ? (
                    <p className="text-gray-500 py-4">No reviews yet for this collection.</p>
                  ) : (
                    <>
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-4 last:border-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{review.user}</p>
                              <div className="flex items-center mt-1">
                                <div className="flex mr-2">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {products.find(p => p.id === review.productId)?.name || 'Unknown Product'}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium mb-2">Write a Review</h5>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded mb-2" 
                      rows="3" 
                      placeholder="Share your thoughts about this collection..."
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} className="mr-1">
                            <FiStar className="text-gray-300 hover:text-yellow-400" />
                          </button>
                        ))}
                      </div>
                      <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShopTheLookModal;