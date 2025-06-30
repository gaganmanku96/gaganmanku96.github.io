import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let scrollTimeout: NodeJS.Timeout;

    const updateScrollProgress = () => {
      const currentScrollY = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (currentScrollY / scrollHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setIsScrolling(true);
      
      lastScrollY = currentScrollY;

      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set new timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initialize

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return {
    scrollProgress,
    scrollDirection,
    isScrolling
  };
};

export default useScrollProgress;