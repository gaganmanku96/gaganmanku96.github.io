import React from 'react';
import { motion } from 'framer-motion';

interface TechBadgeProps {
  tech: string;
  index: number;
}

const TechBadge: React.FC<TechBadgeProps> = ({ tech, index }) => {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Main Badge */}
      <motion.div
        className="px-4 py-2 bg-dark-teal text-cream rounded-full font-medium text-sm border border-dark-teal/20 shadow-sm"
        whileHover={{
          backgroundColor: '#F4B63C',
          color: '#243A3A',
          borderColor: '#F4B63C',
        }}
        transition={{ duration: 0.2 }}
      >
        {tech}
      </motion.div>

      {/* Hover particle effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {/* Subtle particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-mustard rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 10}%`,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: 0,
              y: 0
            }}
            whileHover={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              x: [0, (i - 1) * 15, (i - 1) * 25],
              y: [0, -10 - i * 5, -20 - i * 8],
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* 3D tilt effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-mustard/10 to-transparent opacity-0"
        whileHover={{ 
          opacity: 1,
          rotateX: 5,
          rotateY: 5
        }}
        transition={{ duration: 0.2 }}
        style={{ 
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
      />
    </motion.div>
  );
};

export default TechBadge;