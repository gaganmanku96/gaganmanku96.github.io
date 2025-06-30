import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  scrollProgress: number;
}

const Navbar: React.FC<NavbarProps> = ({ scrollProgress }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Portfolio', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className={`mx-auto border-b border-light-neutral/30 ${
        isScrolled ? 'shadow-lg bg-warm-ivory' : 'bg-warm-ivory/95'
      } transition-all duration-300`}
      >
        <div className="container-custom flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform duration-300">
            <span className="text-muted-gold">GS</span>
            <span className="text-charcoal-gray">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="relative text-charcoal-gray hover:text-muted-gold transition-colors font-medium px-1 py-2 group"
              >
                {item.name}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-muted-gold group-hover:w-full transition-all duration-300"
                ></span>
              </Link>
            ))}
            
            {/* Search Bar */}
            <div className="relative flex items-center">
              <motion.div
                className="flex items-center bg-soft-cream rounded-full overflow-hidden shadow-sm border border-light-neutral/40"
                animate={{
                  width: isSearchExpanded ? 260 : 36,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <button
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="p-1.5 text-charcoal-gray hover:text-muted-gold transition-colors duration-300 flex-shrink-0"
                  aria-label="Toggle search"
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </button>
                
                {isSearchExpanded && (
                  <motion.input
                    type="text"
                    placeholder="Search portfolio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent text-charcoal-gray placeholder-stone-gray/60 outline-none px-2 py-1 text-sm h-7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    autoFocus
                    onBlur={() => {
                      if (!searchTerm) {
                        setIsSearchExpanded(false);
                      }
                    }}
                  />
                )}
              </motion.div>
            </div>
            
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-soft-cream hover:bg-light-neutral/30 shadow-sm border border-light-neutral/40 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md bg-dark-teal/10 hover:bg-dark-teal/20 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span 
                className={`w-full h-0.5 bg-deep-teal rounded-full transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span 
                className={`w-full h-0.5 bg-deep-teal rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span 
                className={`w-full h-0.5 bg-deep-teal rounded-full transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 py-4 border-t border-dark-teal/10"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    className="text-deep-teal hover:text-mustard transition-colors flex items-center py-2 px-3 rounded-lg hover:bg-dark-teal/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-deep-teal hover:text-mustard transition-colors py-2 px-3"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </nav>
          </motion.div>
        )}
      </div>
      
      {/* Scroll Progress Indicator */}
      <div className="h-1 bg-gray-200 dark:bg-gray-800 w-full overflow-hidden">
        <motion.div 
          className="h-full"
          style={{ 
            width: `${scrollProgress}%`,
            background: 'var(--gradient-primary)'
          }}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
      </div>
    </header>
  );
};

export default Navbar;
