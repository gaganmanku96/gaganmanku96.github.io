import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

interface CommandPaletteProps {
  onClose: () => void;
}

interface CommandItem {
  id: string;
  name: string;
  shortcut?: string;
  action: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Command items
  const commandItems: CommandItem[] = [
    {
      id: 'home',
      name: 'Home',
      action: () => {
        router.push('/');
        onClose();
      }
    },
    {
      id: 'about',
      name: 'About',
      action: () => {
        router.push('/#about');
        onClose();
      }
    },
    {
      id: 'projects',
      name: 'Projects',
      action: () => {
        router.push('/#projects');
        onClose();
      }
    },
    {
      id: 'experience',
      name: 'Experience',
      action: () => {
        router.push('/#experience');
        onClose();
      }
    },
    {
      id: 'blog',
      name: 'Blog',
      action: () => {
        router.push('/#blog');
        onClose();
      }
    },
    {
      id: 'resume',
      name: 'Resume',
      action: () => {
        router.push('/#resume');
        onClose();
      }
    },
    {
      id: 'contact',
      name: 'Contact',
      action: () => {
        router.push('/#contact');
        onClose();
      }
    },
    {
      id: 'toggle-theme',
      name: 'Toggle Theme',
      shortcut: '⌘+D',
      action: () => {
        // Theme toggle is handled in the Layout component
        // This is just a placeholder
        document.documentElement.classList.toggle('dark');
        onClose();
      }
    },
    {
      id: 'github',
      name: 'Visit GitHub',
      action: () => {
        window.open('https://github.com/gaganmanku96', '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      name: 'Visit LinkedIn',
      action: () => {
        window.open('https://linkedin.com/in/gaganmanku96', '_blank');
        onClose();
      }
    }
  ];

  // Filter commands based on search query
  const filteredCommands = commandItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
        break;
      default:
        break;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden"
        >
          {/* Search input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400 mr-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands..."
                className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
              />
              <kbd className="hidden sm:flex items-center justify-center h-6 px-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400">
                ESC
              </kbd>
            </div>
          </div>

          {/* Command list */}
          <div className="max-h-80 overflow-y-auto">
            {filteredCommands.length > 0 ? (
              <ul>
                {filteredCommands.map((item, index) => (
                  <li 
                    key={item.id}
                    className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span className="text-gray-800 dark:text-gray-200">{item.name}</span>
                    {item.shortcut && (
                      <kbd className="flex items-center justify-center h-6 px-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400">
                        {item.shortcut}
                      </kbd>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                No commands found
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <span>Press ↑↓ to navigate</span>
              <span>Press Enter to select</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
