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

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Main content */}
        <div className="flex-grow">
          {children}
        </div>
        
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
