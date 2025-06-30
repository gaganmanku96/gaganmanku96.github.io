import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface ScrollIndicatorProps {
  targetSection?: string;
  onClick?: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ 
  targetSection = 'projects',
  onClick 
}) => {
  const { scrollToProjects } = useSmoothScroll();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      scrollToProjects();
    }
  };

  return (
    <motion.div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.button
        onClick={handleClick}
        className="group flex flex-col items-center space-y-2 text-deep-teal/60 hover:text-mustard transition-colors duration-300 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to projects section"
      >
        {/* Text */}
        <motion.span 
          className="text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          Explore My Work
        </motion.span>

        {/* Animated arrow container */}
        <motion.div
          className="relative flex flex-col items-center"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Primary arrow */}
          <motion.div
            className="p-2 rounded-full border-2 border-current group-hover:border-mustard group-hover:bg-mustard/10 transition-all duration-300"
            whileHover={{
              boxShadow: '0 8px 25px -5px rgba(244, 182, 60, 0.3)'
            }}
          >
            <FiChevronDown className="w-6 h-6" />
          </motion.div>

          {/* Secondary trailing arrows */}
          <motion.div
            className="absolute top-1"
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, 12, 24]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            <FiChevronDown className="w-4 h-4 opacity-60" />
          </motion.div>

          <motion.div
            className="absolute top-1"
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, 12, 24]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
          >
            <FiChevronDown className="w-3 h-3 opacity-30" />
          </motion.div>
        </motion.div>

        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-mustard/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Progress indicator dots */}
      <motion.div 
        className="flex items-center justify-center space-x-1 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <div className="w-2 h-2 bg-mustard rounded-full"></div>
        <div className="w-1 h-1 bg-deep-teal/40 rounded-full"></div>
        <div className="w-1 h-1 bg-deep-teal/20 rounded-full"></div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;