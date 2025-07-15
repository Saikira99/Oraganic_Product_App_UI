import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface FeedbackFormProps {
  productId: string;
  onSubmit: (feedback: { name: string; message: string }) => Promise<void>;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ productId, onSubmit }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit({ name: name.trim(), message: message.trim() });
      setSubmitStatus('success');
      setName('');
      setMessage('');
      
      // Reset success status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const fieldVariants = {
    rest: { scale: 1, y: 0 },
    focus: { 
      scale: 1.02, 
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    loading: { scale: 0.95 },
    success: { scale: 1.05 },
    error: { scale: 0.95 }
  };

  const getButtonContent = () => {
    switch (submitStatus) {
      case 'success':
        return (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Feedback Sent!</span>
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-5 h-5" />
            <span>Try Again</span>
          </>
        );
      default:
        return (
          <>
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>{isSubmitting ? 'Sending...' : 'Share Feedback'}</span>
          </>
        );
    }
  };

  const getButtonClass = () => {
    switch (submitStatus) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      default:
        return 'btn-primary';
    }
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="glass-card p-6 md:p-8"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-sage-800 mb-2">
          Share Your Experience
        </h3>
        <p className="text-sage-600">
          Help others discover great organic products by sharing your thoughts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <motion.div
          variants={fieldVariants}
          animate={focusedField === 'name' ? 'focus' : 'rest'}
          className="relative"
        >
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sage-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="Your name"
              required
              className="input pl-12 pr-4"
              maxLength={50}
            />
          </div>
          
          {/* Character count */}
          <motion.div
            animate={{ opacity: focusedField === 'name' ? 1 : 0 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-sage-500"
          >
            {name.length}/50
          </motion.div>
        </motion.div>

        {/* Message Field */}
        <motion.div
          variants={fieldVariants}
          animate={focusedField === 'message' ? 'focus' : 'rest'}
          className="relative"
        >
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-sage-500" />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              placeholder="Share your thoughts about this product..."
              required
              rows={4}
              className="input pl-12 pr-4 resize-none"
              maxLength={500}
            />
          </div>
          
          {/* Character count */}
          <motion.div
            animate={{ opacity: focusedField === 'message' ? 1 : 0 }}
            className="absolute right-3 bottom-3 text-xs text-sage-500"
          >
            {message.length}/500
          </motion.div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          variants={buttonVariants}
          animate={submitStatus}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting || !name.trim() || !message.trim()}
          className={`btn w-full ${getButtonClass()} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={submitStatus}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-2"
            >
              {getButtonContent()}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                Thank you for your feedback! It helps our community grow.
              </span>
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
            >
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                Something went wrong. Please try again.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;