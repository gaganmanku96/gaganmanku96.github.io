import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileOptimizationsProps {
  children: React.ReactNode;
}

const MobileOptimizations: React.FC<MobileOptimizationsProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const landscape = window.innerWidth > window.innerHeight && mobile;
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(mobile);
      setIsLandscape(landscape);
      setTouchDevice(touch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  // Mobile-specific optimizations
  useEffect(() => {
    if (isMobile) {
      // Prevent zoom on double tap
      let lastTouchEnd = 0;
      const preventZoom = (e: TouchEvent) => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      };

      document.addEventListener('touchend', preventZoom, { passive: false });
      
      // Optimize scroll performance
      document.body.style.overscrollBehavior = 'none';
      
      return () => {
        document.removeEventListener('touchend', preventZoom);
        document.body.style.overscrollBehavior = 'auto';
      };
    }
  }, [isMobile]);

  return (
    <div 
      className={`
        ${isMobile ? 'mobile-optimized' : ''}
        ${isLandscape ? 'landscape-mode' : ''}
        ${touchDevice ? 'touch-device' : ''}
      `}
    >
      {children}
      
      {/* Mobile Performance Indicator */}
      {isMobile && process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
          📱 Mobile Mode {isLandscape && '🔄'}
        </div>
      )}
    </div>
  );
};

export default MobileOptimizations;