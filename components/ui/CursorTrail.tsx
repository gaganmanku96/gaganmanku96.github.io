import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface CursorTrailProps {
  enabled?: boolean;
  maxPoints?: number;
  fadeTime?: number;
  size?: number;
  color?: string;
}

const CursorTrail: React.FC<CursorTrailProps> = ({
  enabled = true,
  maxPoints = 20,
  fadeTime = 1000,
  size = 4,
  color = '#028090'
}) => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const idCounter = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    let animationFrame: number;
    let lastTime = 0;
    const throttleTime = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      
      if (currentTime - lastTime < throttleTime) return;
      lastTime = currentTime;

      setIsVisible(true);
      
      const newPoint: TrailPoint = {
        id: idCounter.current++,
        x: e.clientX,
        y: e.clientY,
        timestamp: currentTime
      };

      setTrail(prev => {
        const filtered = prev.filter(point => 
          currentTime - point.timestamp < fadeTime
        );
        return [...filtered, newPoint].slice(-maxPoints);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Cleanup old points periodically
    const cleanup = () => {
      const currentTime = Date.now();
      setTrail(prev => 
        prev.filter(point => currentTime - point.timestamp < fadeTime)
      );
      animationFrame = requestAnimationFrame(cleanup);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animationFrame = requestAnimationFrame(cleanup);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [enabled, maxPoints, fadeTime]);

  if (!enabled || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((point, index) => {
          const age = Date.now() - point.timestamp;
          const progress = Math.max(0, 1 - age / fadeTime);
          const scale = progress * (0.5 + (index / trail.length) * 0.5);
          
          return (
            <motion.div
              key={point.id}
              className="absolute rounded-full"
              style={{
                left: point.x - size / 2,
                top: point.y - size / 2,
                width: size,
                height: size,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 2}px ${color}40`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale,
                opacity: progress * 0.8,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.1,
                ease: "easeOut"
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;