import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from '@/context/ThemeContext';

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  // List of roles to cycle through based on actual resume
  const roles = [
    'GenAI Expert',
    'LLM Architect', 
    'NLP Specialist',
    'ML Engineer',
    'Data Scientist'
  ];

  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
        <ParticleBackground theme={theme} />
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Gagandeep Singh</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-12 mb-8"
          >
            <div className="relative h-full flex items-center justify-center">
              {roles.map((role, index) => (
                <motion.h2
                  key={role}
                  className="text-xl md:text-2xl lg:text-3xl font-semibold absolute"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: currentRoleIndex === index ? 1 : 0,
                    y: currentRoleIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">{role}</span>
                </motion.h2>
              ))}
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg md:text-xl max-w-3xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            AVP Data Scientist with <span className="font-semibold text-blue-600 dark:text-blue-400">6+ years</span> of experience specializing in 
            <span className="font-semibold text-purple-600 dark:text-purple-400"> Generative AI</span> and 
            <span className="font-semibold text-green-600 dark:text-green-400"> Natural Language Processing</span>.
            <span className="block mt-3">
              Built <span className="font-semibold">multi-agent GenAI chatbots</span> that increased user engagement by 
              <span className="font-bold text-orange-600 dark:text-orange-400"> 40%</span> and developed 
              <span className="font-semibold">LLM Telemetry Frameworks</span> tracking costs across 
              <span className="font-bold text-blue-600 dark:text-blue-400">10+ projects</span>.
            </span>
            <span className="block mt-3 text-gradient font-medium">Let's innovate with AI together.</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/projects">
              <button className="btn-primary px-8 py-3 rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1">
                View Projects
              </button>
            </Link>
            <Link href="/case-studies">
              <button className="btn-outline px-8 py-3 rounded-lg border-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Case Studies
              </button>
            </Link>
          </motion.div>
          
          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">6+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">40%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Engagement Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-1">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Calls/Month Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-1">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">GenAI Projects</div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-12 flex space-x-6"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium tracking-wider">Scroll Down</span>
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }
          }}
          className="flex flex-col items-center space-y-1"
        >
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-full" />
          <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-full opacity-70" />
          <div className="w-1 h-1 bg-gradient-to-b from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-full opacity-40" />
        </motion.div>
      </div>
    </section>
  );
};

// Social media links
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/gaganmanku96',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/gaganmanku96',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@gaganmanku96',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
];

// Particle background component
const ParticleBackground: React.FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className="absolute inset-0">
      {/* Enhanced particle effect */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 80 }).map((_, i) => {
          const size = Math.random() * 8 + 2;
          const isLarge = Math.random() > 0.8;
          return (
            <div
              key={i}
              className={`absolute rounded-full ${isLarge ? 'blur-sm' : ''} ${
                theme === 'dark' 
                  ? isLarge ? 'bg-blue-300' : 'bg-blue-400' 
                  : isLarge ? 'bg-blue-500' : 'bg-blue-600'
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `${isLarge ? 'pulse' : 'float'} ${Math.random() * 10 + 10}s ${isLarge ? 'ease-in-out' : 'linear'} infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          );
        })}
      </div>
      {/* Add subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

export default HeroSection;
