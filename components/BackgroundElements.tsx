import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundElementsProps {
  variant?: 'hero' | 'section' | 'minimal';
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ variant = 'hero' }) => {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs - Contained, not full screen */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #028090 0%, #4D96FF 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-32 right-16 w-72 h-72 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #FF6F61 0%, #FFA500 50%, transparent 70%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Geometric SVG Shapes */}
        <motion.svg
          className="absolute top-1/4 left-1/3 w-32 h-32 opacity-10"
          viewBox="0 0 100 100"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <polygon
            points="50,5 90,25 90,75 50,95 10,75 10,25"
            fill="url(#primaryGradient)"
            stroke="none"
          />
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#028090" />
              <stop offset="100%" stopColor="#4D96FF" />
            </linearGradient>
          </defs>
        </motion.svg>

        <motion.svg
          className="absolute bottom-1/4 right-1/4 w-24 h-24 opacity-8"
          viewBox="0 0 100 100"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="40" fill="none" stroke="#FF6F61" strokeWidth="2" opacity="0.3" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#FFA500" strokeWidth="1.5" opacity="0.4" />
          <circle cx="50" cy="50" r="10" fill="#028090" opacity="0.2" />
        </motion.svg>

        {/* Floating Dots Pattern */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              background: i % 3 === 0 ? '#028090' : i % 3 === 1 ? '#4D96FF' : '#FF6F61',
              top: `${20 + (i * 6)}%`,
              left: `${10 + (i * 7)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}

        {/* Wave Pattern SVG */}
        <motion.svg
          className="absolute bottom-0 left-0 w-full h-32 opacity-5"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M0,60 C150,100 350,0 500,60 C650,120 850,0 1000,60 C1150,100 1200,40 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#028090" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#4D96FF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FF6F61" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    );
  }

  if (variant === 'section') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Minimal geometric accents for other sections */}
        <motion.div
          className="absolute top-10 right-10 w-24 h-24 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(45deg, #028090, #4D96FF)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.svg
          className="absolute bottom-10 left-10 w-16 h-16 opacity-8"
          viewBox="0 0 50 50"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <rect x="10" y="10" width="30" height="30" fill="none" stroke="#FF6F61" strokeWidth="1" opacity="0.3" />
          <circle cx="25" cy="25" r="8" fill="#028090" opacity="0.2" />
        </motion.svg>
      </div>
    );
  }

  // Minimal variant
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full opacity-3 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, #4D96FF 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default BackgroundElements;