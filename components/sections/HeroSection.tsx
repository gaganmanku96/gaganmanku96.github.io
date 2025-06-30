import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSectionTransition } from '@/hooks/useParallax';

const HeroSection: React.FC = () => {
  const { hero } = useSectionTransition();
  
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const nameVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const professionalTitles = [
    'AI Product Manager',
    'ML Engineer', 
    'Data Scientist',
    'LLM Engineer'
  ];

  const keyDetails = [
    '6+ Years Experience',
    'Delivered End-to-End Products',
    'AI/ML Innovation Leader'
  ];

  const name = "GAGANDEEP SINGH";
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const navbarHeight = 80; // Account for navbar height
      const elementPosition = projectsSection.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.section 
      className="relative min-h-screen bg-warm-ivory text-charcoal-gray overflow-hidden"
      style={hero}
    >
      {/* Main Content */}
      <motion.div 
        className="relative z-10 min-h-screen flex items-center justify-center px-6 lg:px-12"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
            
            {/* Left Side - Profile Picture */}
            <motion.div 
              className="flex justify-center lg:justify-center"
              variants={itemVariants}
            >
              <div className="relative">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/15 to-soft-cream/20 rounded-full blur-2xl scale-110"></div>
                
                {/* Circular profile container */}
                <motion.div
                  className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-muted-gold/40 bg-soft-cream shadow-xl"
                  animate={{
                    borderColor: ['#B4886B40', '#EDEAE340', '#B4886B40'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full bg-gradient-to-br from-muted-gold/5 to-soft-cream/10 flex items-center justify-center">
                    <div className="text-6xl text-charcoal-gray/40 font-bold">
                      GS
                    </div>
                  </div>
                </motion.div>

                {/* Floating particles around profile */}
                <motion.div
                  className="absolute -top-4 -right-4 w-3 h-3 bg-muted-gold rounded-full shadow-md"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-2 h-2 bg-antique-copper rounded-full shadow-md"
                  animate={{
                    x: [0, 10, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </motion.div>

            {/* Right Side - Professional Info */}
            <div className="space-y-8 text-center lg:text-left">
              
              {/* Name */}
              <motion.div variants={nameVariants}>
                <motion.h1 
                  className="text-4xl lg:text-6xl font-bold leading-tight"
                  variants={nameVariants}
                >
                  {name.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      className={letter === ' ' ? 'inline-block w-4' : 'inline-block'}
                      variants={letterVariants}
                      style={{
                        color: index < 9 ? '#B4886B' : '#3D3D3D' // First name muted gold, last name charcoal
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>

              {/* Professional Titles */}
              <motion.div 
                className="space-y-3"
                variants={itemVariants}
              >
                {professionalTitles.map((title, index) => (
                  <motion.div
                    key={title}
                    className="text-xl lg:text-2xl font-semibold text-charcoal-gray/90"
                    variants={{
                      initial: { opacity: 0, x: -30 },
                      animate: { opacity: 1, x: 0 }
                    }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {title}
                  </motion.div>
                ))}
              </motion.div>

              {/* Key Details */}
              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                {keyDetails.map((detail, index) => (
                  <motion.div
                    key={detail}
                    className="text-lg text-stone-gray flex items-center justify-center lg:justify-start"
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 }
                    }}
                    transition={{ delay: index * 0.1 + 1 }}
                  >
                    <span className="w-2 h-2 bg-muted-gold rounded-full mr-3 shadow-sm"></span>
                    {detail}
                  </motion.div>
                ))}
              </motion.div>

              {/* Animated Scroll Down Button */}
              <motion.div 
                className="pt-8"
                variants={itemVariants}
              >
                <motion.button
                  onClick={scrollToProjects}
                  className="group flex items-center justify-center lg:justify-start space-x-2 text-charcoal-gray hover:text-muted-gold transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg font-medium">Explore My Work</span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="group-hover:text-muted-gold transition-colors duration-300"
                  >
                    <ChevronDownIcon className="w-6 h-6" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
