import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiHeart } from 'react-icons/fi';
import { SiMedium } from 'react-icons/si';

const SocialLinks: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/gaganmanku96',
      icon: FiGithub,
      color: '#243A3A'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/gaganmanku96',
      icon: FiLinkedin,
      color: '#0077B5'
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@gaganmanku96',
      icon: SiMedium,
      color: '#00AB6C'
    },
    {
      name: 'HuggingFace',
      url: 'https://huggingface.co/gaganmanku96',
      icon: FiHeart,
      color: '#FF9D00'
    },
    {
      name: 'Email',
      url: 'mailto:gaganmanku96@gmail.com',
      icon: FiMail,
      color: '#F4B63C'
    }
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-deep-teal/80">Connect With Me</h3>
      
      <motion.div 
        className="flex flex-wrap gap-4 justify-center lg:justify-start"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {socialLinks.map((link) => {
          const IconComponent = link.icon;
          
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background circle */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-br from-mustard/20 to-dark-teal/20 opacity-0 blur-sm"
                whileHover={{ 
                  opacity: 1,
                  scale: 1.2
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Icon container */}
              <motion.div
                className="relative p-3 rounded-full bg-cream border-2 border-dark-teal/20 text-deep-teal shadow-sm"
                whileHover={{
                  borderColor: '#F4B63C',
                  backgroundColor: '#F4B63C',
                  color: '#FAF9F6',
                  boxShadow: '0 8px 25px -5px rgba(244, 182, 60, 0.3)'
                }}
                transition={{ duration: 0.2 }}
              >
                <IconComponent className="w-5 h-5" />
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-deep-teal text-cream px-2 py-1 rounded text-xs font-medium opacity-0 pointer-events-none whitespace-nowrap"
                whileHover={{ 
                  opacity: 1,
                  y: 2
                }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
                
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-deep-teal"></div>
              </motion.div>

              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 rounded-full bg-mustard opacity-0"
                whileTap={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0]
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SocialLinks;