import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Award, Leaf } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    rest: { scale: 1, rotateZ: 0 },
    hover: { 
      scale: 1.1, 
      rotateZ: 5,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const overlayVariants = {
    rest: { opacity: 0, scale: 0.8 },
    hover: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -10 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000"
    >
      <Link to={`/product/${product._id}`} className="block">
        <motion.div
          className="relative glass-card p-6 h-full overflow-hidden"
          animate={isHovered ? "hover" : "rest"}
        >
          {/* Background gradient overlay */}
          <motion.div
            variants={overlayVariants}
            className="absolute inset-0 bg-gradient-to-br from-sage-100/50 to-earth-100/30 rounded-2xl"
          />

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-sage-300/30 rounded-full"
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`
                }}
              />
            ))}
          </div>

          {/* Product Image */}
          <div className="relative mb-4 overflow-hidden rounded-xl">
            <motion.img
              variants={imageVariants}
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
              style={{ transformStyle: "preserve-3d" }}
            />
            
            {/* Image overlay with certification badge */}
            <motion.div
              variants={overlayVariants}
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            />
            
            {product.certification && (
              <motion.div
                variants={overlayVariants}
                className="absolute top-3 right-3 glass-card px-2 py-1 flex items-center space-x-1"
              >
                <Award className="w-3 h-3 text-honey-500" />
                <span className="text-xs font-medium text-sage-700">Certified</span>
              </motion.div>
            )}
          </div>

          {/* Product Info */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <motion.h3
                  className="font-semibold text-sage-800 text-lg leading-tight mb-1"
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {product.name}
                </motion.h3>
                
                <motion.p
                  className="text-sage-600 text-sm font-medium"
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  {product.brand}
                </motion.p>
              </div>
              
              <motion.div
                animate={isHovered ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-2 rounded-full bg-sage-100"
              >
                <Leaf className="w-4 h-4 text-sage-600" />
              </motion.div>
            </div>

            {/* Category Tag */}
            <motion.div
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-earth-100 to-earth-200 text-earth-700 text-xs font-medium"
            >
              {product.category}
            </motion.div>

            {/* Description Preview */}
            <motion.p
              className="text-sage-600 text-sm line-clamp-2 leading-relaxed"
              animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
            >
              {product.description}
            </motion.p>

            {/* Rating Stars (mock data) */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Star className="w-4 h-4 text-honey-400 fill-current" />
                </motion.div>
              ))}
              <span className="text-xs text-sage-500 ml-2">(4.8)</span>
            </div>
          </div>

          {/* Hover Action Button */}
          <motion.div
            variants={overlayVariants}
            className="absolute bottom-4 left-4 right-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary w-full text-sm py-2"
            >
              View Details
            </motion.div>
          </motion.div>

          {/* 3D depth layers */}
          <div 
            className="absolute inset-0 rounded-2xl border border-white/20"
            style={{ transform: "translateZ(1px)" }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;