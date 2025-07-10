import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  color: string;
  level: number;
}

interface FloatingSkillBadgesProps {
  skills?: Skill[];
  mousePosition?: { x: number; y: number };
}

const defaultSkills: Skill[] = [
  { name: 'Python', icon: '🐍', color: '#FFD43B', level: 95 },
  { name: 'PyTorch', icon: '🔥', color: '#EE4C2C', level: 90 },
  { name: 'TensorFlow', icon: '🧠', color: '#FF6B35', level: 90 },
  { name: 'OpenAI', icon: '🤖', color: '#00D4FF', level: 95 },
  { name: 'LangChain', icon: '⛓️', color: '#9333EA', level: 85 },
  { name: 'AWS', icon: '☁️', color: '#FF9900', level: 80 },
];

const FloatingSkillBadges: React.FC<FloatingSkillBadgesProps> = ({
  skills = defaultSkills,
  mousePosition = { x: 0, y: 0 }
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerBounds, setContainerBounds] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerBounds({ width: rect.width, height: rect.height });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden floating-skill-badges"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {skills.map((skill, index) => (
        <FloatingSkillBadge
          key={skill.name}
          skill={skill}
          index={index}
          total={skills.length}
          containerBounds={containerBounds}
          mousePosition={mousePosition}
          isHovered={isHovered}
        />
      ))}
    </div>
  );
};

interface FloatingSkillBadgeProps {
  skill: Skill;
  index: number;
  total: number;
  containerBounds: { width: number; height: number };
  mousePosition: { x: number; y: number };
  isHovered: boolean;
}

const FloatingSkillBadge: React.FC<FloatingSkillBadgeProps> = ({
  skill,
  index,
  total,
  containerBounds,
  mousePosition,
  isHovered
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, { damping: 20, stiffness: 300 });

  // Calculate initial position in a circle
  const angle = (index / total) * Math.PI * 2;
  const radius = Math.min(containerBounds.width, containerBounds.height) * 0.3;
  const centerX = containerBounds.width / 2;
  const centerY = containerBounds.height / 2;
  
  const baseX = centerX + Math.cos(angle) * radius;
  const baseY = centerY + Math.sin(angle) * radius;

  useEffect(() => {
    if (!containerBounds.width) return;

    // Mouse attraction effect
    const mouseInfluence = 0.1;
    const mouseDistanceX = mousePosition.x - baseX;
    const mouseDistanceY = mousePosition.y - baseY;
    const mouseDistance = Math.sqrt(mouseDistanceX ** 2 + mouseDistanceY ** 2);
    
    if (mouseDistance < 200 && isHovered) {
      const force = Math.max(0, 1 - mouseDistance / 200);
      x.set(mouseDistanceX * force * mouseInfluence);
      y.set(mouseDistanceY * force * mouseInfluence);
      scale.set(1 + force * 0.2);
    } else {
      x.set(0);
      y.set(0);
      scale.set(1);
    }
  }, [mousePosition, baseX, baseY, isHovered, x, y, scale]);

  // Floating animation
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        left: baseX - 40,
        top: baseY - 20,
        x: springX,
        y: springY,
        scale: springScale,
      }}
      variants={floatingVariants}
      animate="animate"
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className="relative group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Skill Badge */}
        <div 
          className="flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
          style={{
            backgroundColor: `${skill.color}20`,
            borderColor: `${skill.color}40`,
          }}
        >
          <span className="text-lg">{skill.icon}</span>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {skill.name}
          </span>
        </div>

        {/* Skill Level Indicator */}
        <motion.div
          className="absolute -bottom-1 left-2 right-2 h-1 bg-white/20 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
            initial={{ width: '0%' }}
            whileHover={{ width: `${skill.level}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md -z-10"
          style={{
            backgroundColor: skill.color,
            opacity: 0.3,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Tooltip */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ pointerEvents: 'none' }}
        >
          {skill.level}% Proficiency
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800 dark:border-t-slate-200" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingSkillBadges;