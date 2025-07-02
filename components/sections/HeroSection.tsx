import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import BackgroundElements from '../BackgroundElements';
import FigmaStyleCanvas from '../FigmaStyleCanvas';
import ErrorBoundary from '../ErrorBoundary';

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  const scrollToSection = (sectionId: string) => {
    console.log(`Attempting to scroll to section: ${sectionId}`);
    
    const element = document.getElementById(sectionId);
    console.log(`Element found:`, element);
    
    if (element) {
      // Calculate offset to account for fixed navbar
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      console.log(`Scrolling to ${sectionId} completed`);
    } else {
      console.error(`Element with id "${sectionId}" not found`);
      // Fallback: try to find section by data attribute or class
      const fallbackElement = document.querySelector(`[data-section="${sectionId}"], .${sectionId}-section`);
      if (fallbackElement) {
        console.log(`Found fallback element for ${sectionId}`);
        const elementPosition = (fallbackElement as HTMLElement).offsetTop - 80;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      } else {
        // Ultimate fallback - just scroll down one viewport
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    }
  };
  
  const roles = [
    'GenAI Expert',
    'LLM Architect', 
    'NLP Specialist',
    'ML Engineer',
    'Data Scientist'
  ];

  const skills = [
    { name: 'Python', icon: '🐍' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'PyTorch', icon: '🔥' },
    { name: 'OpenAI', icon: '🤖' },
    { name: 'LangChain', icon: '⛓️' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'MLflow', icon: '📊' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Add keyboard support for arrow down key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection('about');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Figma-style WebGL Canvas Background */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
          }
        >
          <FigmaStyleCanvas className="w-full h-full" />
        </ErrorBoundary>
      </div>
      
      {/* Fallback/Additional Background Elements */}
      <BackgroundElements variant="hero" />
      <div className="absolute inset-0 z-0 opacity-20">
        <ParticleBackground theme={theme} />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="heading-primary leading-tight">
                <span className="block text-slate-800 dark:text-slate-100">Transforming Ideas into</span>
                <span className="text-gradient-hero">Intelligent Solutions</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-12 mb-6"
            >
              <div className="relative h-full flex items-center">
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
                    <span className="text-gradient-animated">{role}</span>
                  </motion.h2>
                ))}
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-body-large text-slate-600 dark:text-slate-300"
            >
              I'm Gagandeep Singh, a Data Scientist with a passion for building innovative AI solutions. With over 6 years of experience, I specialize in Generative AI, Large Language Models, and Natural Language Processing.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center"
            >
              <button 
                onClick={() => scrollToSection('projects')}
                className="btn-vibrant text-lg w-full sm:w-auto text-center"
              >
                Explore My Work
              </button>
              <a 
                href="/resume.pdf" 
                download="Gagandeep_Singh_Resume.pdf"
                className="btn-secondary text-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download Resume
              </a>
              <a 
                href="/contact"
                className="btn-outline text-lg w-full sm:w-auto text-center inline-flex items-center justify-center"
              >
                Connect With Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="flex space-x-6 pt-4"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-500 dark:text-slate-400 transition-colors duration-300 transform hover:scale-110 ${link.hoverColor}`}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="lg:col-span-2 flex items-center justify-center h-[400px]"
          >
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Animated Background Circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600/20 to-primary-400/20 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-primary-500/30 to-primary-300/30 animate-ping animation-delay-1000"></div>
              
              {/* Main AI Brain SVG */}
              <motion.svg
                className="w-48 h-48 text-primary-600 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </motion.svg>
              
              {/* Floating Tech Icons */}
              <motion.div
                className="absolute top-8 left-8 w-8 h-8 text-primary-500"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute top-8 right-8 w-8 h-8 text-primary-500"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute bottom-8 left-12 w-6 h-6 text-primary-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute bottom-8 right-12 w-6 h-6 text-primary-400"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-40">
        <motion.button
          onClick={() => scrollToSection('about')}
          className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors duration-300 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to next section"
        >
          <svg className="w-8 h-8 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
      </div>

    </section>
  );
};

const getSkillPosition = (index: number, total: number, radius: number) => {
  const angle = (index / total) * 2 * Math.PI;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
};

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/gaganmanku96',
    hoverColor: 'hover:scale-110',
    icon: (
      <svg className="h-7 w-7" fill="#333" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/gaganmanku96',
    hoverColor: 'hover:scale-110',
    icon: (
      <svg className="h-7 w-7" fill="#0077B5" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@gaganmanku96',
    hoverColor: 'hover:scale-110',
    icon: (
      <svg className="h-7 w-7" fill="#00AB6C" viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    name: 'HuggingFace',
    url: 'https://huggingface.co/gaganmanku96',
    hoverColor: 'hover:scale-110',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="#FFD21E"/>
        <circle cx="12.5" cy="12.5" r="2" fill="#FF9D0B"/>
        <circle cx="19.5" cy="12.5" r="2" fill="#FF9D0B"/>
        <path d="M10 18c1 3 4 5 6 5s5-2 6-5" fill="none" stroke="#FF323D" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="12" fill="none" stroke="#3A3B45" strokeWidth="1" opacity="0.3"/>
      </svg>
    ),
  },
];

const ParticleBackground: React.FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const animationDuration = Math.random() * 15 + 20;
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${theme === 'dark' ? 'bg-white/40' : 'bg-white/60'}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              x: `${Math.random() * 100 - 50}px`,
              y: `${Math.random() * 100 - 50}px`,
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 5,
            }}
          />
        );
      })}
    </div>
  );
};


export default HeroSection;
