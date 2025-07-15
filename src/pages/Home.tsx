import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles } from 'lucide-react';
import { getAllProducts } from '../services/api';
import { Product } from '../types';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ProductGrid from '../components/Products/ProductGrid';
import CategoryFilter from '../components/UI/CategoryFilter';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [error, setError] = useState<string | null>(null);

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.filter(Boolean);
  }, [products]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        
        // Fallback sample data
        setProducts([
          {
            _id: '1',
            name: 'Organic Wildflower Honey',
            brand: 'Nature\'s Best',
            image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'Pure, raw wildflower honey harvested from sustainable beehives.',
            certification: 'USDA Organic',
            category: 'Honey'
          },
          {
            _id: '2',
            name: 'Cold-Pressed Olive Oil',
            brand: 'Mediterranean Gold',
            image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400',
            description: 'Extra virgin olive oil from century-old olive groves.',
            certification: 'Organic Certified',
            category: 'Oils'
          },
          {
            _id: '3',
            name: 'Grass-Fed Organic Milk',
            brand: 'Farm Fresh',
            image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'Fresh organic milk from grass-fed cows.',
            certification: 'USDA Organic',
            category: 'Dairy'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      <Navbar onSearchChange={setSearchQuery} searchQuery={searchQuery} />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl floating-animation" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-earth-200/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-honey-200/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-sage-400 to-sage-500 rounded-full flex items-center justify-center shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-6 leading-tight">
              Discover Pure
              <span className="block bg-gradient-to-r from-sage-600 to-earth-600 bg-clip-text text-transparent">
                Organic Goodness
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-sage-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Explore our curated collection of premium organic products, 
              sourced directly from sustainable farms and trusted producers.
            </motion.p>

            {/* Mobile Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="md:hidden max-w-md mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sage-500" />
                <input
                  type="text"
                  placeholder="Search organic products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-12 pr-4 w-full"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              { number: '500+', label: 'Organic Products', icon: '🌱' },
              { number: '100%', label: 'Certified Organic', icon: '✅' },
              { number: '50K+', label: 'Happy Customers', icon: '😊' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statItemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-sage-800 mb-1">{stat.number}</div>
                <div className="text-sage-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sage-800 mb-4">
              Our Organic Collection
            </h2>
            <p className="text-sage-600 max-w-2xl mx-auto">
              Each product is carefully selected and certified to meet the highest 
              organic standards, ensuring quality and sustainability.
            </p>
          </motion.div>

          {/* Category Filters */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Results Summary */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between mb-8"
            >
              <p className="text-sage-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
                {activeCategory !== 'All' && ` in ${activeCategory}`}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </motion.button>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 mb-8 border-l-4 border-red-400"
            >
              <div className="flex items-center space-x-3">
                <div className="text-red-500 text-xl">⚠️</div>
                <div>
                  <h3 className="font-semibold text-red-800">Connection Issue</h3>
                  <p className="text-red-600 text-sm">{error}</p>
                  <p className="text-red-500 text-xs mt-1">Showing sample products below.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} loading={loading} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;