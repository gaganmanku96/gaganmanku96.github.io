import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  tags?: string[];
}

interface CarouselProps {
  items: CarouselItem[];
  title: string;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  title,
  autoPlay = true,
  autoPlayDelay = 5000,
  showDots = true,
  showArrows = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-4">{title}</h3>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 pl-24 pr-16 md:pl-16 md:pr-12">
              {/* Content */}
              <div className="flex flex-col justify-center space-y-4">
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                  {items[currentIndex].title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {items[currentIndex].description}
                </p>
                
                {/* Tags */}
                {items[currentIndex].tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {items[currentIndex].tags.map((tag, index) => (
                      <span
                        key={index}
                        className="tech-chip text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link Button */}
                {items[currentIndex].link && (
                  <a
                    href={items[currentIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-fit mt-4"
                  >
                    Learn More
                  </a>
                )}
              </div>

              {/* Image */}
              <div className="flex items-center justify-center">
                <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl flex items-center justify-center">
                  {items[currentIndex].image ? (
                    <img
                      src={items[currentIndex].image}
                      alt={items[currentIndex].title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-primary-600 dark:text-primary-400">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-0.5 top-1/2 transform -translate-y-1/2 w-9 h-9 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 border border-slate-200/50 dark:border-slate-700/50"
              style={{ zIndex: 10 }}
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0.5 top-1/2 transform -translate-y-1/2 w-9 h-9 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 border border-slate-200/50 dark:border-slate-700/50"
              style={{ zIndex: 10 }}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Navigation */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary-600 scale-125'
                  : 'bg-slate-300 dark:bg-slate-600 hover:bg-primary-400 dark:hover:bg-primary-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;