import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Leaf, Star, Share2, Heart, ShoppingCart } from 'lucide-react';
import { getProductById, getFeedbackByProduct, submitFeedback } from '../services/api';
import { Product, Feedback } from '../types';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import FeedbackList from '../components/Feedback/FeedbackList';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productRes, feedbackRes] = await Promise.all([
          getProductById(id),
          getFeedbackByProduct(id)
        ]);
        
        setProduct(productRes.data);
        setFeedbacks(feedbackRes.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product details.');
        
        // Fallback sample data
        setProduct({
          _id: id,
          name: 'Organic Wildflower Honey',
          brand: 'Nature\'s Best',
          image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Our premium wildflower honey is harvested from sustainable beehives located in pristine meadows. This raw, unfiltered honey contains natural enzymes, antioxidants, and minerals that support your health and well-being. Each jar represents the hard work of thousands of bees and our commitment to sustainable beekeeping practices.',
          certification: 'USDA Organic',
          category: 'Honey'
        });
        
        setFeedbacks([
          {
            _id: '1',
            productId: id,
            name: 'Sarah Johnson',
            message: 'Absolutely love this honey! The taste is incredible and you can really tell the difference in quality.',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            _id: '2',
            productId: id,
            name: 'Mike Chen',
            message: 'Great product, fast shipping. Will definitely order again!',
            createdAt: new Date(Date.now() - 172800000).toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFeedbackSubmit = async (feedback: { name: string; message: string }) => {
    if (!id) return;
    
    setFeedbackLoading(true);
    try {
      await submitFeedback({ productId: id, ...feedback });
      const response = await getFeedbackByProduct(id);
      setFeedbacks(response.data);
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      throw err;
    } finally {
      setFeedbackLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner size="lg" text="Loading product details..." />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-sage-800 mb-4">Product not found</h2>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      <Navbar />
      
      {/* Back Button */}
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </motion.button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 border-l-4 border-yellow-400"
          >
            <div className="flex items-center space-x-3">
              <div className="text-yellow-500 text-xl">⚠️</div>
              <div>
                <p className="text-yellow-800 font-medium">Connection Issue</p>
                <p className="text-yellow-600 text-sm">{error} Showing sample data.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Product Details */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              variants={imageVariants}
              className="relative"
            >
              <div className="sticky top-24">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl glass-card p-8"
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Floating action buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-3 rounded-full glass-card ${
                        isLiked ? 'text-red-500' : 'text-sage-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full glass-card text-sage-600"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Certification Badge */}
                  {product.certification && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute bottom-4 left-4 glass-card px-3 py-2 flex items-center space-x-2"
                    >
                      <Award className="w-4 h-4 text-honey-500" />
                      <span className="text-sm font-medium text-sage-700">
                        {product.certification}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              variants={contentVariants}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 mb-4"
                >
                  <div className="p-2 rounded-full bg-sage-100">
                    <Leaf className="w-5 h-5 text-sage-600" />
                  </div>
                  <span className="text-sage-600 font-medium">{product.brand}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-sage-800 mb-4"
                >
                  {product.name}
                </motion.h1>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-4 mb-6"
                >
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-honey-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sage-600">4.8 (127 reviews)</span>
                </motion.div>

                {/* Category */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-earth-100 to-earth-200 text-earth-700 font-medium mb-6"
                >
                  {product.category}
                </motion.div>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-sage-800 mb-3">
                  About This Product
                </h3>
                <p className="text-sage-700 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-secondary flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>Save for Later</span>
                </motion.button>
              </motion.div>

              {/* Product Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-sage-800 mb-4">
                  Why Choose This Product
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: '🌱', title: '100% Organic', desc: 'Certified organic ingredients' },
                    { icon: '🚚', title: 'Fast Shipping', desc: 'Free delivery on orders over $50' },
                    { icon: '♻️', title: 'Sustainable', desc: 'Eco-friendly packaging' },
                    { icon: '✅', title: 'Quality Tested', desc: 'Lab tested for purity' }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h4 className="font-medium text-sage-800">{feature.title}</h4>
                        <p className="text-sm text-sage-600">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-sage-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-sage-800 mb-4">
              Customer Feedback
            </h2>
            <p className="text-sage-600 max-w-2xl mx-auto">
              Share your experience and help others discover great organic products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feedback Form */}
            <div>
              <FeedbackForm
                productId={product._id}
                onSubmit={handleFeedbackSubmit}
              />
            </div>

            {/* Feedback List */}
            <div>
              <FeedbackList
                feedbacks={feedbacks}
                loading={feedbackLoading}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default ProductDetail;