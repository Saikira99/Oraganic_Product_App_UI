import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Clock } from 'lucide-react';
import { Feedback } from '../../types';

interface FeedbackListProps {
  feedbacks: Feedback[];
  loading: boolean;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks, loading }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: 20, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    
    return date.toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-sage-200 rounded-full loading-skeleton" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-sage-200 rounded loading-skeleton w-1/4" />
                <div className="h-4 bg-sage-200 rounded loading-skeleton w-3/4" />
                <div className="h-4 bg-sage-200 rounded loading-skeleton w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-sage-400 to-sage-500 rounded-full flex items-center justify-center"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-lg font-semibold text-sage-800 mb-2">
          No feedback yet
        </h3>
        <p className="text-sage-600">
          Be the first to share your experience with this product!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <AnimatePresence>
        {feedbacks.map((feedback, index) => (
          <motion.div
            key={feedback._id || index}
            variants={itemVariants}
            layout
            className="glass-card p-6 hover:bg-white/20 transition-colors duration-300"
          >
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sage-400 to-sage-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg"
              >
                {getInitials(feedback.name)}
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <motion.h4
                    whileHover={{ x: 5 }}
                    className="font-semibold text-sage-800 flex items-center space-x-2"
                  >
                    <span>{feedback.name}</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                  </motion.h4>
                  
                  <div className="flex items-center space-x-1 text-sage-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(feedback.createdAt)}</span>
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  className="text-sage-700 leading-relaxed"
                >
                  {feedback.message}
                </motion.p>

                {/* Interaction indicators */}
                <div className="flex items-center space-x-4 mt-3 text-sage-500">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-1 text-sm hover:text-sage-700 transition-colors"
                  >
                    <span>👍</span>
                    <span>Helpful</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-1 text-sm hover:text-sage-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Reply</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 right-2 opacity-10">
              <MessageCircle className="w-6 h-6 text-sage-400" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default FeedbackList;