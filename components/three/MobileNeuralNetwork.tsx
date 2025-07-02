import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Professional input features that will appear sequentially
const INPUT_SKILLS = [
  { id: 'ml-engineering', label: 'Machine Learning Engineering', color: '#4B8BBE' },
  { id: 'genai-architect', label: 'Generative AI & LLM Architect', color: '#FF6B6B' },
  { id: 'strategic-data', label: 'Strategic Data Science', color: '#4ECDC4' },
  { id: 'ai-product', label: 'AI Product Leadership', color: '#45B7D1' },
  { id: 'applied-research', label: 'Applied AI Research', color: '#FFA07A' },
];

interface MobileNeuralNetworkProps {
  scrollProgress: any; // MotionValue from useScroll
}

// Simple, reliable ConnectionLine component
interface ConnectionLineProps {
  isVisible: boolean;
  gradientId: string;
  delay?: number;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ isVisible, gradientId, delay = 0.2 }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="w-full h-24 relative -my-4" // Negative margin to slightly overlap content
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 50 5 L 50 95" // Static vertical path with padding
              stroke={`url(#${gradientId})`}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MobileNeuralNetwork: React.FC<MobileNeuralNetworkProps> = ({ scrollProgress }) => {
  // Simplified state - no more refs or dynamic paths needed!
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);
  const [showConnection1, setShowConnection1] = useState(false);
  const [showHiddenLayers, setShowHiddenLayers] = useState(false);
  const [showConnection2, setShowConnection2] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [pulsingSkill, setPulsingSkill] = useState<string | null>(null);

  // Track scroll progress and update animation states (simplified)
  useEffect(() => {
    const unsubscribe = scrollProgress.onChange((latest: number) => {
      // Skills appear one by one: each skill gets 8% scroll range
      const newVisibleSkills: number[] = [];
      for (let i = 0; i < INPUT_SKILLS.length; i++) {
        const skillThreshold = 0.15 + (i * 0.08); // 15%, 23%, 31%, 39%, 47%
        if (latest >= skillThreshold) {
          newVisibleSkills.push(i);
        }
      }
      setVisibleSkills(newVisibleSkills);
      
      // Connection and layer visibility thresholds
      setShowConnection1(latest >= 0.55);
      setShowHiddenLayers(latest >= 0.60);
      setShowConnection2(latest >= 0.70);
      setShowOutput(latest >= 0.80);
    });
    
    return () => unsubscribe();
  }, [scrollProgress]);
  
  // Handle touch interactions
  const handleSkillTap = (skillId: string) => {
    setPulsingSkill(skillId);
    setTimeout(() => setPulsingSkill(null), 600);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 relative min-h-screen">
      
      {/* Hidden SVG definitions for gradients and filters */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="mobileGlow1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.2 }} />
            <stop offset="50%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.2 }} />
          </linearGradient>
          <linearGradient id="mobileGlow2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#EC4899', stopOpacity: 0.2 }} />
            <stop offset="50%" style={{ stopColor: '#EC4899', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#EC4899', stopOpacity: 0.2 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Content layers with inline connection components */}
      <div className="relative z-10 flex flex-col items-center w-full space-y-8">
        
        {/* Input Layer - Core Competencies */}
        <motion.div 
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-center mb-6 text-slate-700 dark:text-slate-300">
            Core Competencies
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {INPUT_SKILLS.map((skill, index) => {
              const isVisible = visibleSkills.includes(index);
              const isPulsing = pulsingSkill === skill.id;
              
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                    y: isVisible ? 0 : 20
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "backOut",
                    delay: isVisible ? index * 0.1 : 0
                  }}
                  onClick={() => handleSkillTap(skill.id)}
                  className={`relative cursor-pointer ${index === 4 ? 'col-span-2' : ''}`}
                >
                  <div 
                    className={`px-4 py-3 rounded-lg border-2 font-medium text-white text-center text-sm shadow-lg backdrop-blur-sm relative z-20 transition-all duration-300 ${
                      isPulsing ? 'animate-pulse scale-105' : ''
                    }`}
                    style={{ 
                      backgroundColor: skill.color,
                      borderColor: skill.color,
                      boxShadow: `0 0 15px ${skill.color}40`
                    }}
                  >
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {skill.label}
                    </div>
                  </div>
                  
                  {/* Skill node glow effect */}
                  {isVisible && (
                    <motion.div
                      className="absolute inset-0 rounded-lg blur-sm -z-10"
                      style={{ backgroundColor: skill.color }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Connection 1: Skills to Hidden Layers */}
        <ConnectionLine isVisible={showConnection1} gradientId="mobileGlow1" />

        {/* Hidden Layers - Conceptual Representation */}
        <AnimatePresence>
          {showHiddenLayers && (
            <motion.div 
              className="flex flex-col items-center space-y-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Processing Layers
              </p>
              
              {/* Layer 1: 3 nodes representing the 6 actual nodes */}
              <motion.div 
                className="flex space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.div
                    key={`layer1-${index}`}
                    className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg border-2 border-white/30 relative"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 blur-sm absolute" />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Layer 2: 2 nodes representing the 4 actual nodes */}
              <motion.div 
                className="flex space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {Array.from({ length: 2 }).map((_, index) => (
                  <motion.div
                    key={`layer2-${index}`}
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 shadow-lg border-2 border-white/30 relative"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400/50 to-teal-400/50 blur-sm absolute" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Connection 2: Hidden Layers to Output */}
        <ConnectionLine isVisible={showConnection2} gradientId="mobileGlow2" />

        {/* Output Layer - Professional Profile */}
        <AnimatePresence>
          {showOutput && (
            <motion.div 
              className="w-full max-w-sm"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              <h3 className="text-lg font-semibold text-center mb-6 text-slate-700 dark:text-slate-300">
                Output
              </h3>
              
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-6 shadow-2xl text-center backdrop-blur-sm relative overflow-hidden">
                
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10 rounded-2xl"></div>
                </div>
                
                {/* Profile Initials */}
                <div className="relative mx-auto w-16 h-16 mb-4 z-10">
                  <div className="w-full h-full rounded-full bg-white text-purple-700 font-bold text-2xl flex items-center justify-center border-3 border-white shadow-lg">
                    GS
                  </div>
                  
                  {/* Animated glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white blur-md opacity-30"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Name */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    Gagandeep Singh
                  </h3>
                </div>

                {/* Professional tagline */}
                <div className="relative z-10">
                  <p className="text-sm text-white/90 mb-3 font-medium">
                    AI Engineer with 6+ years of experience
                  </p>
                </div>

                {/* Specialization */}
                <div className="relative z-10">
                  <p className="text-xs text-white/80 font-medium">
                    Transforming Ideas into AI-Powered Solutions
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll progress indicator */}
        <motion.div
          className="text-center pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="text-sm text-slate-500 dark:text-slate-400 mb-2"
            animate={{ opacity: showOutput ? 0 : [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {!showOutput ? "Scroll to see my journey" : "Ready to connect!"}
          </motion.div>
          <motion.div
            className="w-1 h-6 bg-gradient-to-b from-primary-500 to-transparent mx-auto rounded-full"
            style={{ scaleY: showOutput ? 0 : 1 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MobileNeuralNetwork;