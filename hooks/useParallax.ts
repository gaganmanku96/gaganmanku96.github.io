import { useEffect, useState } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxOptions {
  speed?: number;
  offset?: number;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0 } = options;
  const { scrollY } = useScroll();
  
  // Transform scroll position to parallax offset
  const y = useTransform(scrollY, [0, 1000], [0, 0]); // Force y to 0
  const opacity = useTransform(scrollY, [0, 300, 600], [1, 0.5, 0]);
  
  return { y, opacity };
};

export const useScrollAnimation = () => {
  const { scrollY } = useScroll();
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const updateCurrentSection = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.pageYOffset + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setCurrentSection(index);
        }
      });
    };

    const unsubscribe = scrollY.on('change', updateCurrentSection);
    updateCurrentSection(); // Initialize

    return () => unsubscribe();
  }, [scrollY]);

  return { currentSection };
};

export const useSectionTransition = () => {
  const { scrollY } = useScroll();
  
  // Hero section fade out
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 0]); // Force heroY to 0
  
  // Projects section fade in
  const projectsOpacity = useTransform(scrollY, [200, 500], [0, 1]);
  const projectsY = useTransform(scrollY, [200, 500], [0, 0]); // Force projectsY to 0
  
  return {
    hero: { opacity: heroOpacity, y: heroY },
    projects: { opacity: projectsOpacity, y: projectsY }
  };
};

export default useParallax;