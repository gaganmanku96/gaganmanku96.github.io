import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import MobileNeuralNetwork from './MobileNeuralNetwork';

// Helper for debouncing resize events
const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// SVG Path Generation with proper Bezier curves
const generatePath = (startX: number, startY: number, endX: number, endY: number): string => {
  const controlX1 = startX + (endX - startX) * 0.3;
  const controlX2 = endX - (endX - startX) * 0.3;
  return `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`;
};

// Professional input features that will appear sequentially
const INPUT_SKILLS = [
  { id: 'ml-engineering', label: 'Machine Learning Engineering', color: '#4B8BBE' },
  { id: 'genai-architect', label: 'Generative AI & LLM Architect', color: '#FF6B6B' },
  { id: 'strategic-data', label: 'Strategic Data Science', color: '#4ECDC4' },
  { id: 'ai-product', label: 'AI Product Leadership', color: '#45B7D1' },
  { id: 'applied-research', label: 'Applied AI Research', color: '#FFA07A' },
];

// Animation variants
const typewriterVariants = {
  hidden: { 
    width: 0, 
    opacity: 0,
    scale: 0.8
  },
  visible: {
    width: "auto",
    opacity: 1,
    scale: 1,
    transition: { 
      width: { duration: 0.8, ease: "easeOut" },
      opacity: { duration: 0.4, ease: "easeOut" },
      scale: { duration: 0.6, ease: "backOut" }
    }
  },
};

const nodeGlowVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.6, ease: "backOut" }
  },
  processing: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const profileCardVariants = {
  hidden: { 
    opacity: 0, 
    y: 100, 
    scale: 0.8,
    rotateY: -15 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1.2,
      ease: "backOut",
      staggerChildren: 0.2
    },
  },
};

const profileItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const SequentialNeuralNetwork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkContainerRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef(new Map<string, HTMLDivElement>());
  const hidden1Refs = useRef(new Map<string, HTMLDivElement>());
  const hidden2Refs = useRef(new Map<string, HTMLDivElement>());
  const outputRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Separate connection paths for each layer
  const [pathsLayer1, setPathsLayer1] = useState<string[]>([]); // Input -> H1
  const [pathsLayer2, setPathsLayer2] = useState<string[]>([]); // H1 -> H2
  const [pathsLayer3, setPathsLayer3] = useState<string[]>([]); // H2 -> Output
  
  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-based animation states
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);
  const [showHidden1Nodes, setShowHidden1Nodes] = useState(false);
  const [showHidden2Nodes, setShowHidden2Nodes] = useState(false);
  // Granular connection layer visibility
  const [showConnectionsL1, setShowConnectionsL1] = useState(false); // Input -> H1
  const [showConnectionsL2, setShowConnectionsL2] = useState(false); // H1 -> H2
  const [showOutput, setShowOutput] = useState(false);
  // Final connections appear AFTER output card settles
  const [showConnectionsL3, setShowConnectionsL3] = useState(false); // H2 -> Output

  // Track scroll progress and update animation states
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Skills appear one by one: each skill gets 10% scroll range
      const newVisibleSkills: number[] = [];
      for (let i = 0; i < INPUT_SKILLS.length; i++) {
        const skillThreshold = 0.1 + (i * 0.1); // 10%, 20%, 30%, 40%, 50%
        if (latest >= skillThreshold) {
          newVisibleSkills.push(i);
        }
      }
      setVisibleSkills(newVisibleSkills);
      
      // Hidden layer 1 appears after all skills are visible
      setShowHidden1Nodes(latest >= 0.5);
      
      // Hidden layer 2 appears shortly after
      setShowHidden2Nodes(latest >= 0.55);
      
      // Staggered connection animations for sequential flow
      setShowConnectionsL1(latest >= 0.6);  // Input -> H1
      setShowConnectionsL2(latest >= 0.65); // H1 -> H2
      
      // Output card appears and settles earlier for better UX
      setShowOutput(latest >= 0.7);
      
      // Final connections draw AFTER output card is settled (fixes race condition)
      setShowConnectionsL3(latest >= 0.75); // H2 -> Output
      
      // Animation progression based on scroll
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Calculate Node Positions
  const calculatePositions = useCallback(() => {
    if (!networkContainerRef.current) return;

    const containerRect = networkContainerRef.current.getBoundingClientRect();
    if (containerRect.width === 0) return; // Don't calculate if container isn't rendered
    
    // Separate path arrays for each layer
    const newPathsL1: string[] = [];
    const newPathsL2: string[] = [];
    const newPathsL3: string[] = [];
    const scaleX = 1200 / containerRect.width;
    const scaleY = 800 / containerRect.height;

    // Input to Hidden Layer 1 connections
    INPUT_SKILLS.forEach((skill, inputIndex) => {
      const inputNode = inputRefs.current.get(skill.id);
      if (inputNode) {
        const inputRect = inputNode.getBoundingClientRect();
        const screenX = inputRect.right; // Connect from right edge instead of center
        const screenY = inputRect.top + inputRect.height / 2;
        const startX = (screenX - containerRect.left) * scaleX;
        const startY = (screenY - containerRect.top) * scaleY;

        // Input to Hidden Layer 1 connections

        for (let hiddenIndex = 0; hiddenIndex < 6; hiddenIndex++) {
          const hiddenNode = hidden1Refs.current.get(`hidden1-${hiddenIndex}`);
          if (hiddenNode) {
            const hiddenRect = hiddenNode.getBoundingClientRect();
            const hiddenScreenX = hiddenRect.left; // Connect to left edge instead of center
            const hiddenScreenY = hiddenRect.top + hiddenRect.height / 2;
            const endX = (hiddenScreenX - containerRect.left) * scaleX;
            const endY = (hiddenScreenY - containerRect.top) * scaleY;

            // Generate path for Input -> Hidden Layer 1 connection
            newPathsL1.push(generatePath(startX, startY, endX, endY));
          }
        }
      }
    });

    // Hidden Layer 1 to Hidden Layer 2 connections
    for (let hidden1Index = 0; hidden1Index < 6; hidden1Index++) {
      const hidden1Node = hidden1Refs.current.get(`hidden1-${hidden1Index}`);
      if (hidden1Node) {
        const hidden1Rect = hidden1Node.getBoundingClientRect();
        const startX = (hidden1Rect.right - containerRect.left) * scaleX; // Connect from right edge
        const startY = (hidden1Rect.top + hidden1Rect.height / 2 - containerRect.top) * scaleY;

        for (let hidden2Index = 0; hidden2Index < 4; hidden2Index++) {
          const hidden2Node = hidden2Refs.current.get(`hidden2-${hidden2Index}`);
          if (hidden2Node) {
            const hidden2Rect = hidden2Node.getBoundingClientRect();
            const endX = (hidden2Rect.left - containerRect.left) * scaleX; // Connect to left edge
            const endY = (hidden2Rect.top + hidden2Rect.height / 2 - containerRect.top) * scaleY;

            // Generate path for Hidden Layer 1 -> Hidden Layer 2 connection
            newPathsL2.push(generatePath(startX, startY, endX, endY));
          }
        }
      }
    }

    // Hidden Layer 2 to Output connections
    if (outputRef.current) {
      const outputRect = outputRef.current.getBoundingClientRect();
      const outputScreenX = outputRect.left; // Connect to left edge instead of center
      const outputScreenY = outputRect.top + outputRect.height / 2;
      const outputX = (outputScreenX - containerRect.left) * scaleX;
      const outputY = (outputScreenY - containerRect.top) * scaleY;

      for (let hidden2Index = 0; hidden2Index < 4; hidden2Index++) {
        const hidden2Node = hidden2Refs.current.get(`hidden2-${hidden2Index}`);
        if (hidden2Node) {
          const hidden2Rect = hidden2Node.getBoundingClientRect();
          const startX = (hidden2Rect.right - containerRect.left) * scaleX; // Connect from right edge
          const startY = (hidden2Rect.top + hidden2Rect.height / 2 - containerRect.top) * scaleY;
          // Generate path for Hidden Layer 2 -> Output connection
          newPathsL3.push(generatePath(startX, startY, outputX, outputY));
        }
      }
    }

    // Update all three path arrays
    setPathsLayer1(newPathsL1);
    setPathsLayer2(newPathsL2);
    setPathsLayer3(newPathsL3);
  }, []);

  // Calculate positions at the right time - when nodes are visible
  useLayoutEffect(() => {
    // Add timeout to ensure nodes have completed their animations
    const timer = setTimeout(() => {
      calculatePositions();
    }, 100);

    return () => clearTimeout(timer);
  }, [calculatePositions, showConnectionsL1, showConnectionsL2, showConnectionsL3, showOutput]);

  // Recalculate on resize
  useEffect(() => {
    const debouncedCalculatePositions = debounce(calculatePositions, 150);
    window.addEventListener('resize', debouncedCalculatePositions);
    return () => window.removeEventListener('resize', debouncedCalculatePositions);
  }, [calculatePositions]);

  return (
    <div className="relative w-full">
      {/* Scroll container - this provides the scrollable height */}
      <div ref={containerRef} className="h-[400vh] relative">
        
        {/* Sticky animation container */}
        <div className="sticky top-20 h-screen flex items-center justify-center px-4">
          <div ref={networkContainerRef} className="w-full max-w-6xl mx-auto relative">
            
            {/* Section title */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                  The AI Talent Engine: Predicting Your Next Innovator
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Watch my expertise synthesize into innovative AI solutions that drive business impact
              </p>
            </motion.div>

            {/* Component Swapping: Mobile vs Desktop */}
            {isMobile ? (
              <MobileNeuralNetwork scrollProgress={scrollYProgress} />
            ) : (
              <>
                {/* SVG Overlay for connections - behind content */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                  viewBox="0 0 1200 800"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Enhanced gradient definition */}
                  <defs>
                    <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.8 }} />
                      <stop offset="50%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#F59E0B', stopOpacity: 0.8 }} />
                    </linearGradient>
                  </defs>
                  
                  {/* Sequential connection layer rendering */}
                  <g>
                    {/* Layer 1: Input -> Hidden Layer 1 */}
                    {showConnectionsL1 && pathsLayer1.map((d, index) => (
                      <motion.path
                        key={`l1-${index}`}
                        d={d}
                        stroke="url(#neuralGradient)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: "easeInOut", 
                          delay: index * 0.005 
                        }}
                      />
                    ))}
                    
                    {/* Layer 2: Hidden Layer 1 -> Hidden Layer 2 */}
                    {showConnectionsL2 && pathsLayer2.map((d, index) => (
                      <motion.path
                        key={`l2-${index}`}
                        d={d}
                        stroke="url(#neuralGradient)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: "easeInOut", 
                          delay: index * 0.01 
                        }}
                      />
                    ))}
                    
                    {/* Layer 3: Hidden Layer 2 -> Output */}
                    {showConnectionsL3 && pathsLayer3.map((d, index) => (
                      <motion.path
                        key={`l3-${index}`}
                        d={d}
                        stroke="url(#neuralGradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.7 }}
                        transition={{ 
                          duration: 0.5, 
                          ease: "easeInOut", 
                          delay: index * 0.05 
                        }}
                      />
                    ))}
                  </g>
                </svg>

                {/* Desktop Neural Network Layout */}
                <div className="relative z-20">
                  
                  {/* Grid layout for network */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 items-center min-h-[500px]">
                    
                    {/* Input Layer */}
                    <div className="md:col-span-2 flex flex-col">
                      <h3 className="text-lg font-semibold text-center mb-6 text-slate-700 dark:text-slate-300 h-8 flex items-center justify-center">
                        Core Competencies
                      </h3>
                      <div className="flex flex-col space-y-6">
                      {INPUT_SKILLS.map((skill, index) => {
                        const isVisible = visibleSkills.includes(index);
                        return (
                          <motion.div
                            key={skill.id}
                            ref={(el: HTMLDivElement | null) => {
                              if (el) inputRefs.current.set(skill.id, el);
                            }}
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
                            className="relative"
                          >
                            <div 
                              className="px-6 py-3 rounded-full border-2 font-semibold text-white shadow-lg backdrop-blur-sm relative z-30"
                              style={{ 
                                backgroundColor: skill.color,
                                borderColor: skill.color,
                                boxShadow: `0 0 20px ${skill.color}40`
                              }}
                            >
                              <div className="text-center whitespace-nowrap">
                                {skill.label}
                              </div>
                            </div>
                            
                            {/* Skill node glow effect */}
                            {isVisible && (
                              <motion.div
                                className="absolute inset-0 rounded-full blur-md -z-10"
                                style={{ backgroundColor: skill.color }}
                                animate={{
                                  scale: [1, 1.2, 1],
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
                        );
                      })}
                      </div>
                    </div>

                    {/* Hidden Layer 1 */}
                    <div className="md:col-span-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-center mb-6 text-slate-700 dark:text-slate-300 h-8 flex items-center justify-center">
                        Layer 1
                      </h3>
                      <div className="flex flex-col space-y-4 z-10 flex-1 justify-center items-center">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <motion.div
                            key={`hidden1-${index}`}
                            ref={(el: HTMLDivElement | null) => {
                              if (el) hidden1Refs.current.set(`hidden1-${index}`, el);
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: showHidden1Nodes ? 1 : 0,
                              scale: showHidden1Nodes ? 1 : 0
                            }}
                            transition={{ 
                              delay: showHidden1Nodes ? index * 0.1 : 0,
                              duration: 0.5,
                              ease: "backOut"
                            }}
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg border-2 border-white/30 relative">
                              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 blur-sm absolute" />
                              
                              {/* Pulsing effect when visible */}
                              {showHidden1Nodes && (
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-blue-400/30"
                                  animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2
                                  }}
                                />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Hidden Layer 2 */}
                    <div className="md:col-span-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-center mb-6 text-slate-700 dark:text-slate-300 h-8 flex items-center justify-center">
                        Layer 2
                      </h3>
                      <div className="flex flex-col space-y-6 z-10 flex-1 justify-center items-center">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <motion.div
                            key={`hidden2-${index}`}
                            ref={(el: HTMLDivElement | null) => {
                              if (el) hidden2Refs.current.set(`hidden2-${index}`, el);
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: showHidden2Nodes ? 1 : 0,
                              scale: showHidden2Nodes ? 1 : 0
                            }}
                            transition={{ 
                              delay: showHidden2Nodes ? index * 0.1 : 0,
                              duration: 0.5,
                              ease: "backOut"
                            }}
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 shadow-lg border-2 border-white/30 relative">
                              <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400/50 to-teal-400/50 blur-sm absolute" />
                              
                              {/* Pulsing effect when visible */}
                              {showHidden2Nodes && (
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-green-400/30"
                                  animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.3
                                  }}
                                />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Output Layer - Simplified Profile Card */}
                    <div className="md:col-span-2 flex flex-col">
                      <h3 className="text-lg font-semibold text-center mb-6 text-slate-700 dark:text-slate-300 h-8 flex items-center justify-center">
                        Output
                      </h3>
                      <div className="flex justify-center flex-1 items-center">
                        <AnimatePresence>
                          {showOutput && (
                            <motion.div
                              ref={outputRef}
                              initial={{ opacity: 0, y: 50, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 30, scale: 0.8 }}
                              transition={{ duration: 0.8, ease: "backOut" }}
                              className="relative max-w-sm w-full"
                            >
                          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-8 shadow-2xl text-center backdrop-blur-sm relative overflow-hidden">
                            
                            {/* Subtle neural network background pattern */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10 rounded-2xl"></div>
                            </div>
                            
                            {/* Profile Initials with enhanced design */}
                            <div className="relative mx-auto w-24 h-24 mb-6 z-10">
                              <div className="w-full h-full rounded-full bg-white text-purple-700 font-bold text-5xl flex items-center justify-center border-4 border-white shadow-lg">
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
                              <h3 className="text-3xl font-extrabold text-white mb-3">
                                Gagandeep Singh
                              </h3>
                            </div>

                            {/* Professional tagline */}
                            <div className="relative z-10">
                              <p className="text-lg text-white/90 mb-4 font-medium">
                                AI Engineer with 6+ years of experience
                              </p>
                            </div>


                            {/* Specialization badges */}
                            <div className="relative z-10 mt-4">
                              <p className="text-sm text-white/80 font-medium">
                                Transforming Ideas into AI-Powered Solutions
                              </p>
                            </div>
                          </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Scroll progress indicator */}
                  <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
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
                      className="w-1 h-8 bg-gradient-to-b from-primary-500 to-transparent mx-auto rounded-full"
                      style={{ scaleY: showOutput ? 0 : 1 }}
                    />
                  </motion.div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SequentialNeuralNetwork;