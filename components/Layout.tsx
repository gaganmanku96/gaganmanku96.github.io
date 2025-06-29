import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import Footer from './Footer';
import CommandPalette from './CommandPalette';
import { useTheme } from '@/context/ThemeContext';

// Dynamically import the Chatbot component with SSR disabled
const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette shortcut (Cmd+K or Ctrl+K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar scrollProgress={scrollProgress} />
        
        {/* Main content */}
        <div className="flex-grow">
          {children}
        </div>
        
        {/* Back to top button - positioned to not conflict with chatbot */}
        {scrollProgress > 20 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-20 left-4 sm:bottom-24 sm:left-8 p-3 rounded-full bg-primary text-white shadow-lg z-45"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
        
        {/* Command palette */}
        {showCommandPalette && (
          <CommandPalette onClose={() => setShowCommandPalette(false)} />
        )}
        
        <Footer />
      </div>
      
      {/* Chatbot - rendered outside main layout container */}
      <Chatbot 
        isOpen={showChatbot} 
        onToggle={() => setShowChatbot(prev => !prev)} 
      />
    </>
  );
};

export default Layout;
