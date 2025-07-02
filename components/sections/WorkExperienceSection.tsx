import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import CareerNeuralNetwork from '@/components/three/CareerNeuralNetwork';
import RoleDetailsPanel from '@/components/work/RoleDetailsPanel';
import { careerData, CareerRole } from '@/data/workExperience';

const WorkExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedRole, setSelectedRole] = useState<CareerRole>(careerData[0]); // Start with first role (Intern)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollBasedRole, setScrollBasedRole] = useState<CareerRole>(careerData[0]);
  const [userOverride, setUserOverride] = useState(false); // Track if user manually selected a role
  
  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll-based role progression
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Define scroll thresholds for each role (6 roles = 6 segments)
      const roleThresholds = [
        { threshold: 0.0, role: careerData[0] },   // Intern: 0-15%
        { threshold: 0.15, role: careerData[1] },  // Data Scientist: 15-30%
        { threshold: 0.30, role: careerData[2] },  // Senior Data Scientist: 30-45%
        { threshold: 0.45, role: careerData[3] },  // Manager: 45-60%
        { threshold: 0.60, role: careerData[4] },  // Senior Manager: 60-75%
        { threshold: 0.75, role: careerData[5] },  // AVP: 75-100%
      ];

      // Find the appropriate role based on scroll progress
      let newRole = careerData[0]; // Default to first role
      for (let i = roleThresholds.length - 1; i >= 0; i--) {
        if (latest >= roleThresholds[i].threshold) {
          newRole = roleThresholds[i].role;
          break;
        }
      }

      // Update scroll-based role
      if (newRole.id !== scrollBasedRole.id) {
        setScrollBasedRole(newRole);
        
        // Auto-update selected role only if user hasn't manually overridden
        if (!userOverride) {
          setSelectedRole(newRole);
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, scrollBasedRole, userOverride]);

  const handleRoleSelection = async (role: CareerRole) => {
    if (role.id === selectedRole.id) return; // Don't transition if same role

    setIsTransitioning(true);
    setUserOverride(true); // Mark that user has manually selected
    
    // Small delay to show transition animation
    setTimeout(() => {
      setSelectedRole(role);
      setIsTransitioning(false);
      
      // Reset user override after 3 seconds to allow scroll control again
      setTimeout(() => {
        setUserOverride(false);
      }, 3000);
    }, 300);
  };

  return (
    <div className="relative w-full bg-slate-50 dark:bg-slate-900">
      {/* Scroll container - provides scroll distance for fixed viewport */}
      <div ref={containerRef} className="h-[300vh] relative">
        
        {/* Sticky container - fixed viewport */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 h-full flex flex-col">
            
            {/* Header */}
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                  Career Neural Network
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Interactive journey through 6+ years of AI/ML innovation - from Intern to AVP at Zykrr Technologies
              </p>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-0">
              
              {/* Left Side - Career Neural Network (5 columns on large screens, full width on mobile) */}
              <div className="w-full lg:col-span-5 h-auto lg:h-full flex items-center justify-center">
                <div className="w-full max-w-lg h-auto lg:h-full">
                  <CareerNeuralNetwork
                    roles={careerData}
                    selectedRole={selectedRole}
                    scrollBasedRole={scrollBasedRole}
                    scrollProgress={scrollYProgress}
                    onRoleSelect={handleRoleSelection}
                    isTransitioning={isTransitioning}
                  />
                </div>
              </div>

              {/* Right Side - Role Details (7 columns on large screens, full width on mobile) */}
              <div className="w-full lg:col-span-7 h-auto lg:h-full flex items-center">
                <div className="w-full h-auto lg:h-full max-h-[80vh]">
                  <RoleDetailsPanel
                    role={selectedRole}
                    isTransitioning={isTransitioning}
                  />
                </div>
              </div>
            </div>

            {/* Footer Instructions & Scroll Progress */}
            <motion.div
              className="text-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Scroll to progress through career stages or click any role to explore detailed projects
              </p>
              
              {/* Scroll Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Intern</span>
                  <span>Data Scientist</span>
                  <span>Senior</span>
                  <span>Manager</span>
                  <span>Sr. Manager</span>
                  <span>AVP</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full"
                    style={{ scaleX: scrollYProgress }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  {careerData.map((role, index) => (
                    <motion.span
                      key={role.id}
                      className={`transition-colors duration-300 ${
                        role.id === scrollBasedRole.id 
                          ? 'text-primary-600 dark:text-primary-400 font-semibold' 
                          : ''
                      }`}
                      animate={{
                        scale: role.id === scrollBasedRole.id ? 1.1 : 1
                      }}
                    >
                      {role.duration.split(' - ')[0].split(' ')[1] || role.duration.split(' ')[0]}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceSection;