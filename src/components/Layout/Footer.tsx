import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative mt-20 glass-card"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-earth-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-full bg-gradient-to-r from-sage-400 to-sage-500"
              >
                <Leaf className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sage-600 to-sage-800 bg-clip-text text-transparent">
                OrganicLife
              </h3>
            </div>
            <p className="text-sage-600 mb-6 max-w-md leading-relaxed">
              Discover the finest organic products sourced directly from sustainable farms. 
              We're committed to bringing you pure, natural goodness that nourishes both 
              body and soul.
            </p>
            <div className="flex items-center space-x-2 text-sage-500">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              </motion.div>
              <span>for a sustainable future</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-sage-800 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['All Products', 'Honey & Sweeteners', 'Organic Oils', 'Dairy Products', 'Certifications'].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-sage-600 hover:text-sage-800 transition-colors flex items-center group"
                  >
                    <span className="w-1 h-1 bg-sage-400 rounded-full mr-3 group-hover:bg-sage-600 transition-colors" />
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-sage-800 mb-4">Get in Touch</h4>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-sage-600"
              >
                <div className="p-2 rounded-lg glass-card">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@organiclife.com</span>
              </motion.div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-sage-600"
              >
                <div className="p-2 rounded-lg glass-card">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (555) 123-4567</span>
              </motion.div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-sage-600"
              >
                <div className="p-2 rounded-lg glass-card">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>123 Organic Valley, CA 90210</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-sage-200/50 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sage-500 text-sm mb-4 md:mb-0">
            © 2025 OrganicLife. All rights reserved. Sustainably crafted with care.
          </p>
          
          <div className="flex space-x-6 text-sm text-sage-500">
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="hover:text-sage-700 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="hover:text-sage-700 transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="hover:text-sage-700 transition-colors"
            >
              Sustainability
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;