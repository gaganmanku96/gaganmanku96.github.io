import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import BackgroundElements from '../BackgroundElements';
import FigmaStyleCanvas from '../FigmaStyleCanvas';
import ErrorBoundary from '../ErrorBoundary';
import MagneticButton from '../ui/MagneticButton';
import CursorTrail from '../ui/CursorTrail';
import FloatingSkillBadges from '../ui/FloatingSkillBadges';

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
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

  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-24 lg:pt-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Cursor Trail Effect (Desktop Only) */}
      {!isMobile && <CursorTrail enabled={true} />}
      
      {/* Figma-style WebGL Canvas Background - Heavily Reduced on Mobile */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
          }
        >
          <div className={`w-full h-full transition-all duration-300 ${isMobile ? 'opacity-5 scale-50 pointer-events-none' : ''}`}>
            <FigmaStyleCanvas className="w-full h-full" />
          </div>
        </ErrorBoundary>
      </div>

      {/* Floating Skill Badges (Desktop Only - Completely Hidden on Mobile) */}
      <div className="absolute inset-0 z-10 hidden lg:block pointer-events-none">
        {!isMobile && (
          <FloatingSkillBadges mousePosition={mousePosition} />
        )}
      </div>

      {/* Background Elements */}
      <BackgroundElements variant="hero" />

      {/* Main Content - Clean Design without Shadows */}
      <div className="relative z-50 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 md:space-y-8"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block relative z-50"
          >
            <span className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-medium px-4 py-2 rounded-full bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name - Clean Design without Shadow */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight relative z-50"
          >
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Gagandeep
            </span>
            <br />
            <span className="text-slate-800 dark:text-slate-200">Singh</span>
          </motion.h1>

          {/* Dynamic Role - Clean without Shadow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="h-12 md:h-16 flex items-center justify-center relative z-50"
          >
            <motion.h2
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 90 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-slate-700 dark:text-slate-300"
            >
              {roles[currentRoleIndex]}
            </motion.h2>
          </motion.div>

          {/* Description - Clean without Shadow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4 relative z-50"
          >
            <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed px-6 py-4 rounded-xl bg-white/5 dark:bg-slate-900/5 backdrop-blur-sm border border-white/10 dark:border-slate-700/10">
              Senior Data Scientist with 6+ years at Zykrr, specializing in{' '}
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                Generative AI
              </span>{' '}
              and{' '}
              <span className="font-semibold text-secondary-600 dark:text-secondary-400">
                Multi-Agent Systems
              </span>
              . Building the future of AI-powered solutions.
            </p>
          </motion.div>

          {/* CTA Buttons with Magnetic Effect - Even Lower positioning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center px-4 relative z-50 ${isMobile ? 'pt-32' : 'pt-24 md:pt-28'}`}
          >
            <MagneticButton
              onClick={() => scrollToSection('projects')}
              className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px]"
              strength={isMobile ? 0 : 0.3}
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 min-h-[44px] bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm"
              strength={isMobile ? 0 : 0.2}
            >
              <span className="relative z-10">Get In Touch</span>
            </MagneticButton>
          </motion.div>

          {/* Skills Preview (Mobile Only) */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="pt-8 md:pt-12 relative z-50"
            >
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
                {skills.slice(0, 6).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-slate-200 dark:border-slate-700 min-h-[32px] bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm"
                  >
                    <span className="text-xs sm:text-sm">{skill.icon}</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block relative z-50"
          >
            <MagneticButton
              onClick={() => scrollToSection('about')}
              className="group flex flex-col items-center space-y-2 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 rounded-xl p-3 bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm"
              strength={isMobile ? 0 : 0.1}
            >
              <span className="text-xs md:text-sm font-medium">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 md:w-6 h-8 md:h-10 border-2 border-current rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-2 md:h-3 bg-current rounded-full mt-1 md:mt-2"
                />
              </motion.div>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;