import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  disabled?: boolean;
  href?: string;
  target?: string;
  style?: React.CSSProperties;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 0.4,
  disabled = false,
  href,
  target,
  style
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const currentRef = href ? linkRef.current : buttonRef.current;
    if (!currentRef || disabled) return;
    
    const rect = currentRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseClasses = `
    relative inline-block cursor-pointer transition-all duration-200
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  if (href) {
    return (
      <motion.a
        ref={linkRef}
        href={href}
        target={target}
        style={{ x: springX, y: springY, ...style }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={baseClasses}
        whileTap={disabled ? {} : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
        {/* Magnetic field indicator */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-primary-500/20 pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={disabled ? undefined : onClick}
      className={baseClasses}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
      {/* Magnetic field indicator */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-primary-500/20 pointer-events-none"
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default MagneticButton;