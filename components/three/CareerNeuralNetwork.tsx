import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerRole, NEURAL_NETWORK_CONFIG } from '@/data/workExperience';

interface CareerNeuralNetworkProps {
  roles: CareerRole[];
  selectedRole: CareerRole;
  scrollBasedRole: CareerRole;
  scrollProgress: any; // MotionValue from useScroll
  onRoleSelect: (role: CareerRole) => void;
  isTransitioning: boolean;
}

interface RoleNode {
  id: string;
  title: string;
  color: string;
  size: number;
  duration: string;
  x: number;
  y: number;
}

// Helper for debouncing resize events
const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// SVG Path Generation for neural connections
const generatePath = (startX: number, startY: number, endX: number, endY: number): string => {
  const controlX1 = startX + (endX - startX) * 0.3;
  const controlX2 = endX - (endX - startX) * 0.3;
  return `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`;
};

const CareerNeuralNetwork: React.FC<CareerNeuralNetworkProps> = ({
  roles,
  selectedRole,
  scrollBasedRole,
  scrollProgress,
  onRoleSelect,
  isTransitioning
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const [roleNodes, setRoleNodes] = useState<RoleNode[]>([]);
  const [connectionPaths, setConnectionPaths] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0);
  const [visibleRoles, setVisibleRoles] = useState<number[]>([]);
  const [visibleConnections, setVisibleConnections] = useState<number[]>([]);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress and update animations
  useEffect(() => {
    const unsubscribe = scrollProgress.onChange((latest: number) => {
      setCurrentScrollProgress(latest);

      // Progressive role visibility based on scroll
      const newVisibleRoles: number[] = [];
      const newVisibleConnections: number[] = [];
      
      // Each role gets roughly 15% of scroll range (6 roles across 90% of scroll)
      for (let i = 0; i < roles.length; i++) {
        const roleThreshold = i * 0.15; // 0%, 15%, 30%, 45%, 60%, 75%
        if (latest >= roleThreshold) {
          newVisibleRoles.push(i);
          
          // Show connection after role appears (with small delay)
          if (i > 0 && latest >= roleThreshold + 0.05) {
            newVisibleConnections.push(i - 1); // Connection from previous role
          }
        }
      }

      setVisibleRoles(newVisibleRoles);
      setVisibleConnections(newVisibleConnections);
    });

    return () => unsubscribe();
  }, [scrollProgress, roles.length]);

  // Initialize role nodes with calculated positions
  useEffect(() => {
    const initializeNodes = () => {
      const nodes: RoleNode[] = roles.map((role, index) => {
        // Vertical layout for career progression
        const totalRoles = roles.length;
        const spacing = 1 / (totalRoles - 1);
        const y = index * spacing;
        
        return {
          id: role.id,
          title: role.title,
          color: role.nodeColor,
          size: role.nodeSize,
          duration: role.duration,
          x: 0.5, // Center horizontally
          y: y    // Distribute vertically
        };
      });
      
      setRoleNodes(nodes);
    };

    initializeNodes();
  }, [roles]);

  // Calculate connection paths between nodes
  const calculateConnections = useCallback(() => {
    if (!containerRef.current || roleNodes.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    if (containerRect.width === 0) return;

    const paths: string[] = [];
    
    // Create connections between consecutive roles
    for (let i = 0; i < roleNodes.length - 1; i++) {
      const currentNode = nodeRefs.current.get(roleNodes[i].id);
      const nextNode = nodeRefs.current.get(roleNodes[i + 1].id);
      
      if (currentNode && nextNode) {
        const currentRect = currentNode.getBoundingClientRect();
        const nextRect = nextNode.getBoundingClientRect();
        
        const startX = (currentRect.left + currentRect.width / 2 - containerRect.left);
        const startY = (currentRect.top + currentRect.height / 2 - containerRect.top);
        const endX = (nextRect.left + nextRect.width / 2 - containerRect.left);
        const endY = (nextRect.top + nextRect.height / 2 - containerRect.top);
        
        paths.push(generatePath(startX, startY, endX, endY));
      }
    }
    
    setConnectionPaths(paths);
  }, [roleNodes]);

  // Calculate positions when nodes are rendered
  useEffect(() => {
    const timer = setTimeout(calculateConnections, 100);
    return () => clearTimeout(timer);
  }, [calculateConnections, selectedRole]);

  // Recalculate on resize
  useEffect(() => {
    const debouncedCalculate = debounce(calculateConnections, 150);
    window.addEventListener('resize', debouncedCalculate);
    return () => window.removeEventListener('resize', debouncedCalculate);
  }, [calculateConnections]);

  const handleRoleClick = (role: CareerRole) => {
    if (!isTransitioning) {
      onRoleSelect(role);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] lg:min-h-[600px] flex flex-col justify-center">
      
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Career Progression
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          6+ Years at Zykrr Technologies
        </p>
      </motion.div>

      {/* SVG Overlay for connections */}
      {!isMobile && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#F59E0B', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          
          {connectionPaths.map((path, index) => {
            const isConnectionVisible = visibleConnections.includes(index);
            return (
              <motion.path
                key={index}
                d={path}
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isConnectionVisible ? 1 : 0, 
                  opacity: isConnectionVisible ? 0.6 : 0 
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeInOut", 
                  delay: 0.2 
                }}
              />
            );
          })}
        </svg>
      )}

      {/* Role Nodes */}
      <div className="relative z-20 flex-1 flex flex-col justify-center space-y-6 px-4">
        <AnimatePresence>
          {roleNodes.map((node, index) => {
            const role = roles.find(r => r.id === node.id)!;
            const isSelected = selectedRole.id === node.id;
            const isScrollBased = scrollBasedRole.id === node.id;
            const isAboveSelected = roles.findIndex(r => r.id === selectedRole.id) > index;
            const isBelowSelected = roles.findIndex(r => r.id === selectedRole.id) < index;
            const isVisible = visibleRoles.includes(index);
            
            return (
              <motion.div
                key={node.id}
                ref={(el: HTMLDivElement | null) => {
                  if (el) nodeRefs.current.set(node.id, el);
                }}
                className="flex items-center cursor-pointer group"
                onClick={() => handleRoleClick(role)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0.3, 
                  x: 0,
                  scale: isScrollBased && !isSelected ? 1.05 : 1
                }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Role Node Circle */}
                <div className="relative">
                  <motion.div
                    className={`relative rounded-full border-4 flex items-center justify-center font-bold text-white shadow-lg transition-all duration-300 ${
                      isSelected 
                        ? 'border-white shadow-2xl' 
                        : 'border-white/50 shadow-md hover:border-white/80'
                    }`}
                    style={{ 
                      backgroundColor: node.color,
                      width: `${2 + node.size * 0.5}rem`,
                      height: `${2 + node.size * 0.5}rem`,
                      boxShadow: isSelected 
                        ? `0 0 30px ${node.color}60, 0 0 60px ${node.color}30` 
                        : `0 0 15px ${node.color}40`
                    }}
                    animate={{
                      scale: isSelected ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Role index/number */}
                    <span className="text-lg font-black">
                      {index + 1}
                    </span>
                    
                    {/* Pulsing effect for selected node */}
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: node.color }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute -inset-2 rounded-full border-2 border-white/50"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>

                {/* Role Information */}
                <div className="ml-4 flex-1">
                  <motion.h4 
                    className={`font-bold transition-colors duration-300 ${
                      isSelected 
                        ? 'text-lg text-slate-900 dark:text-white' 
                        : 'text-base text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}
                    style={{ color: isSelected ? node.color : undefined }}
                  >
                    {node.title}
                  </motion.h4>
                  <p className={`text-sm transition-colors duration-300 ${
                    isSelected 
                      ? 'text-slate-600 dark:text-slate-400' 
                      : 'text-slate-500 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400'
                  }`}>
                    {node.duration}
                  </p>
                  
                  {/* Progress indicator */}
                  <motion.div 
                    className="mt-2 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                    layout
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: node.color }}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: isSelected ? '100%' : isAboveSelected ? '100%' : '20%',
                        opacity: isSelected ? 1 : isAboveSelected ? 0.8 : 0.4
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>

                {/* Active indicator arrow */}
                {isSelected && (
                  <motion.div
                    className="ml-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg 
                      className="w-6 h-6 text-slate-600 dark:text-slate-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer stats */}
      <motion.div 
        className="text-center mt-8 pt-4 border-t border-slate-200 dark:border-slate-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">6+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Years</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">25+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">5</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Promotions</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CareerNeuralNetwork;