import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bone as Honey, Droplets, Milk, Wheat, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'All': <Sparkles className="w-4 h-4" />,
      'Honey': <Honey className="w-4 h-4" />,
      'Oils': <Droplets className="w-4 h-4" />,
      'Dairy': <Milk className="w-4 h-4" />,
      'Grains': <Wheat className="w-4 h-4" />
    };
    return iconMap[category] || <Sparkles className="w-4 h-4" />;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { 
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-3 justify-center mb-8"
    >
      <AnimatePresence>
        {['All', ...categories].map((category) => (
          <motion.button
            key={category}
            variants={chipVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onCategoryChange(category)}
            className={`
              relative flex items-center space-x-2 px-6 py-3 rounded-full
              font-medium text-sm transition-all duration-300
              ${activeCategory === category
                ? 'bg-gradient-to-r from-sage-500 to-sage-600 text-white shadow-lg'
                : 'glass-card text-sage-700 hover:bg-white/30'
              }
            `}
          >
            {/* Background glow effect for active category */}
            {activeCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-gradient-to-r from-sage-500 to-sage-600 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Content */}
            <span className="relative z-10 flex items-center space-x-2">
              {getCategoryIcon(category)}
              <span>{category}</span>
            </span>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              whileTap={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)"
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CategoryFilter;