import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import LoadingSpinner from '../UI/LoadingSpinner';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
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

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Discovering organic treasures..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        variants={emptyStateVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center min-h-[400px] text-center"
      >
        <div className="glass-card p-12 max-w-md">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-sage-400 to-sage-500 rounded-full flex items-center justify-center"
          >
            <span className="text-2xl">🌱</span>
          </motion.div>
          <h3 className="text-xl font-semibold text-sage-800 mb-3">
            No products found
          </h3>
          <p className="text-sage-600 leading-relaxed">
            We couldn't find any organic products matching your search. 
            Try adjusting your filters or search terms.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ProductGrid;