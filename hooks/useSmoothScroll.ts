import { useCallback } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
}

export const useSmoothScroll = () => {
  const scrollTo = useCallback((
    target: string | HTMLElement,
    options: SmoothScrollOptions = {}
  ) => {
    const {
      duration = 1000,
      easing = (t: number) => t * (2 - t), // ease-out
      offset = 0
    } = options;

    let targetElement: HTMLElement | null = null;

    if (typeof target === 'string') {
      targetElement = document.getElementById(target);
    } else {
      targetElement = target;
    }

    if (!targetElement) {
      console.warn(`Target element not found: ${target}`);
      return;
    }

    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop - offset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easing(progress);
      
      window.scrollTo(0, startPosition + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }, []);

  const scrollToProjects = useCallback(() => {
    scrollTo('projects', { 
      duration: 800, 
      offset: 80,
      easing: (t: number) => 1 - Math.cos((t * Math.PI) / 2) // ease-out-sine
    });
  }, [scrollTo]);

  const scrollToTop = useCallback(() => {
    scrollTo(document.body, { 
      duration: 600,
      easing: (t: number) => 1 - Math.pow(1 - t, 3) // ease-out-cubic
    });
  }, [scrollTo]);

  return {
    scrollTo,
    scrollToProjects,
    scrollToTop
  };
};

export default useSmoothScroll;