import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/context/ThemeContext';

// Neural Network Background Component
const NeuralNetworkBackground: React.FC<{ scrollProgress: number; mousePosition: { x: number; y: number }; isDark: boolean }> = ({ scrollProgress, mousePosition, isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Neural network nodes
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = [];
    const connections: Array<{ from: number; to: number; strength: number }> = [];
    
    // Initialize nodes (reduced for mobile)
    const nodeCount = window.innerWidth < 768 ? 25 : 50;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
    
    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          connections.push({
            from: i,
            to: j,
            strength: 1 - distance / 150
          });
        }
      }
    }
    
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Mouse influence
      const mouseInfluence = 100;
      
      // Theme-based colors
      const primaryColor = isDark ? '2, 128, 144' : '2, 128, 144';
      const secondaryColor = isDark ? '77, 150, 255' : '77, 150, 255';
      const accentColor = isDark ? '255, 111, 97' : '255, 111, 97';
      
      // Update nodes
      nodes.forEach((node, index) => {
        // Mouse attraction
        const dx = mousePosition.x - node.x;
        const dy = mousePosition.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          node.vx += dx * force * 0.001;
          node.vy += dy * force * 0.001;
        }
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary check
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;
        
        // Scroll-based evolution
        const evolution = scrollProgress * 2;
        const dynamicSize = node.size * (1 + evolution);
        const dynamicAlpha = node.alpha * (isDark ? 0.5 + evolution * 0.5 : 0.3 + evolution * 0.3);
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, dynamicSize, 0, Math.PI * 2);
        
        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, dynamicSize * 3);
        gradient.addColorStop(0, `rgba(${primaryColor}, ${dynamicAlpha})`);
        gradient.addColorStop(0.5, `rgba(${secondaryColor}, ${dynamicAlpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${accentColor}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, dynamicSize * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha * (isDark ? 0.8 : 0.6)})`;
        ctx.fill();
      });
      
      // Draw connections
      connections.forEach(connection => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        const dx = fromNode.x - toNode.x;
        const dy = fromNode.y - toNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const evolution = scrollProgress * 2;
          const alpha = connection.strength * (isDark ? 0.2 + evolution * 0.3 : 0.1 + evolution * 0.2);
          
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          
          // Flowing gradient
          const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y);
          gradient.addColorStop(0, `rgba(${primaryColor}, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(${secondaryColor}, ${alpha * 0.8})`);
          gradient.addColorStop(1, `rgba(${accentColor}, ${alpha * 0.6})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1 + evolution;
          ctx.stroke();
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [scrollProgress, mousePosition, isDark]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: isDark ? 'screen' : 'multiply', opacity: isDark ? 1 : 0.6 }}
    />
  );
};

// Expertise Orb Component
const ExpertiseOrb: React.FC<{ 
  skill: string; 
  category: string;
  level: number; 
  technologies: string[];
  delay: number;
  position: { x: number; y: number };
  isMobile: boolean;
}> = ({ skill, category, level, technologies, delay, position, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y
      }}
      transition={{ 
        duration: 0.8,
        delay: delay,
        type: "spring",
        stiffness: 80
      }}
      className="absolute"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        animate={{ 
          y: [0, -8, 0],
          rotateZ: [0, 1, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          delay: delay
        }}
      >
        {/* Orb */}
        <div className="w-20 h-20 md:w-24 md:h-24 glass-vibrant rounded-full flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full" />
          <div className="text-xs md:text-sm font-bold text-white relative z-10 text-center">
            <div className="text-lg md:text-xl">{level}%</div>
            <div className="text-xs opacity-80">{skill}</div>
          </div>
        </div>
        
        {/* Category label */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
          {category}
        </div>
        
        {/* Hover tooltip */}
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 p-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-lg shadow-xl z-20 max-w-48"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="font-semibold mb-2">{category}</div>
          <div className="text-xs opacity-80">
            {technologies.join(', ')}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Project Card Component
const ProjectCard: React.FC<{
  title: string;
  description: string;
  impact: string;
  technologies: string[];
  delay: number;
}> = ({ title, description, impact, technologies, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-vibrant p-6 rounded-2xl relative overflow-hidden group"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-3 relative z-10">
        {title}
      </h4>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 relative z-10">
        {description}
      </p>
      
      <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-4 relative z-10">
        {impact}
      </div>
      
      <div className="flex flex-wrap gap-1 relative z-10">
        {technologies.slice(0, 4).map((tech, index) => (
          <span key={index} className="tech-chip text-xs">
            {tech}
          </span>
        ))}
        {technologies.length > 4 && (
          <span className="tech-chip text-xs">
            +{technologies.length - 4} more
          </span>
        )}
      </div>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [scrollValue, setScrollValue] = useState(0);
  
  const isDark = theme === 'dark';
  
  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (latest) => {
      setScrollValue(latest);
    });
    return unsubscribe;
  }, [scrollProgress]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const expertiseAreas = [
    { 
      skill: 'GenAI',
      category: 'Generative AI',
      level: 95, 
      technologies: ['LLMs', 'Multi-Agent Systems', 'Prompt Engineering', 'RLHF'],
      position: { x: 0, y: 0 } 
    },
    { 
      skill: 'ML/DL',
      category: 'Machine Learning',
      level: 95, 
      technologies: ['PyTorch', 'TensorFlow', 'Transformers', 'BERT', 'DistilBERT'],
      position: { x: isMobile ? 140 : 160, y: isMobile ? 90 : -30 } 
    },
    { 
      skill: 'Backend',
      category: 'Backend Systems',
      level: 90, 
      technologies: ['Python', 'FastAPI', 'Node.js', 'MongoDB', 'PostgreSQL'],
      position: { x: isMobile ? 280 : 320, y: isMobile ? 180 : 20 } 
    },
    { 
      skill: 'Cloud',
      category: 'Cloud & MLOps',
      level: 85, 
      technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'MLOps'],
      position: { x: isMobile ? 70 : 80, y: isMobile ? 270 : 120 } 
    },
    { 
      skill: 'Vector',
      category: 'Vector DBs',
      level: 80, 
      technologies: ['Qdrant', 'Chroma', 'Pinecone', 'Milvus'],
      position: { x: isMobile ? 210 : 240, y: isMobile ? 360 : 140 } 
    },
    { 
      skill: 'NLP',
      category: 'Specialized AI',
      level: 90, 
      technologies: ['Speech Analytics', 'Computer Vision', 'MediaPipe', 'Whisper'],
      position: { x: isMobile ? 350 : 400, y: isMobile ? 450 : 80 } 
    },
  ];
  
  const signatureProjects = [
    {
      title: "Missing Person AI System",
      description: "AI-powered facial recognition system using MediaPipe that helps reunite families with missing loved ones.",
      impact: "80% faster search times",
      technologies: ["MediaPipe", "Computer Vision", "SQLite", "Streamlit", "Machine Learning"]
    },
    {
      title: "CHAOS Framework", 
      description: "Revolutionary AI training methodology that teaches models adaptive reasoning through progressive difficulty scenarios.",
      impact: "Novel training approach for AI reasoning",
      technologies: ["PEFT", "Gemini AI", "Synthetic Data", "PyTorch", "AI Training"]
    },
    {
      title: "Multi-Agent Chatbot",
      description: "Sophisticated 4-agent system with Router, Data Analyst, Code, and Reviewer agents enhanced with RLHF.",
      impact: "Advanced conversational AI with feedback loops",
      technologies: ["Multi-Agent Systems", "RLHF", "Qdrant", "LLMs", "ReAct Prompting"]
    },
    {
      title: "Call Analytics Platform",
      description: "Comprehensive platform for audio processing with noise isolation, speaker diarization, and sentiment analysis.",
      impact: "Reduced validation time from 3 hours to 30 minutes",
      technologies: ["Whisper", "Speech Analytics", "LLMs", "Audio Processing", "GPU Computing"]
    }
  ];
  
  const achievements = [
    "40% user engagement increase through interactive AI systems",
    "70% model accuracy improvement via advanced feature engineering", 
    "10,000+ monthly calls processed for real-time analytics",
    "Custom sentiment algorithms with 80%+ accuracy",
    "Led strategic GenAI migration from traditional ML systems"
  ];
  
  return (
    <section 
      ref={sectionRef}
      id="about" 
      className={`min-h-screen relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }`}
    >
      {/* Neural Network Background - Optimized for both themes */}
      {!isMobile && <NeuralNetworkBackground scrollProgress={scrollValue} mousePosition={mousePosition} isDark={isDark} />}
      {isMobile && (
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-primary-900/20 via-secondary-900/10 to-accent-900/20 opacity-30' 
            : 'bg-gradient-to-br from-primary-100/40 via-secondary-100/20 to-accent-100/30 opacity-50'
        }`} />
      )}
      
      {/* Main Content */}
      <div className="relative z-10 container-custom py-16 md:py-20">
        {/* Hero Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
              isDark ? 'text-gradient-hero' : 'text-gradient'
            }`}
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Hi, I'm Gagan.
          </motion.h1>
          <motion.p 
            className={`text-lg md:text-xl max-w-4xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I'm on a mission to transform complex data into intelligent, impactful AI solutions that truly make a difference.
          </motion.p>
        </motion.div>
        
        {/* Personal Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="glass-vibrant p-8 md:p-12 rounded-3xl mb-16 md:mb-20 max-w-5xl mx-auto"
        >
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            My Journey in AI
          </h2>
          <div className={`space-y-4 text-base md:text-lg leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <p>
              With over <span className="font-semibold text-primary-600 dark:text-primary-400">six years of experience</span>, my journey in AI has been a dynamic evolution—from an early adopter of groundbreaking NLP models like <span className="font-semibold text-secondary-600 dark:text-secondary-400">BERT (back in 2018!)</span> to specializing in the cutting-edge of <span className="font-semibold text-accent-600 dark:text-accent-400">Generative AI and multi-agent systems</span> today.
            </p>
            <p>
              I've had the privilege of growing from an intern to an <span className="font-semibold text-primary-600 dark:text-primary-400">AVP</span>, leading teams and architecting end-to-end AI solutions that solve real-world problems. My passion lies at the intersection of deep technical expertise and strategic leadership—building robust, scalable AI systems that deliver exceptional performance and drive significant business value.
            </p>
          </div>
        </motion.div>
        
        {/* Technical Expertise Constellation */}
        <div className="mb-16 md:mb-20">
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold text-center mb-12 text-gradient`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            My Toolkit & Expertise
          </motion.h2>
          <div className={`relative ${isMobile ? 'h-[500px]' : 'h-80'} max-w-5xl mx-auto`}>
            {expertiseAreas.map((area, index) => (
              <ExpertiseOrb
                key={index}
                skill={area.skill}
                category={area.category}
                level={area.level}
                technologies={area.technologies}
                delay={2 + index * 0.2}
                position={area.position}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
        
        {/* Signature Projects */}
        <div className="mb-16 md:mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            Signature Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {signatureProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                impact={project.impact}
                technologies={project.technologies}
                delay={3 + index * 0.2}
              />
            ))}
          </div>
        </div>
        
        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="glass-vibrant p-8 md:p-12 rounded-3xl mb-16 max-w-4xl mx-auto"
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-6 text-center text-gradient`}>
            Impact & Achievements
          </h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 4 + index * 0.1 }}
                className={`flex items-center space-x-3 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                <span className="text-primary-500 text-lg">✦</span>
                <span>{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Current Focus & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.5 }}
          className="text-center"
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            Current Focus
          </h3>
          <p className={`text-lg mb-8 max-w-3xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Today, my focus is on architecting advanced <span className="font-semibold text-primary-600 dark:text-primary-400">multi-agent AI systems</span> and sophisticated <span className="font-semibold text-secondary-600 dark:text-secondary-400">LLM architectures</span>, driving successful GenAI migration strategies, and continuing to lead and mentor the next generation of AI talent.
          </p>
          
          <motion.button
            className="btn-vibrant px-8 py-4 text-lg font-semibold rounded-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Let's Build Something Amazing
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;