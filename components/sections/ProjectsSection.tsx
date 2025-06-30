import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiGrid, FiArrowRight } from 'react-icons/fi';
import { IProject, SAMPLE_PROJECTS } from '@/types/project';
import { useSectionTransition } from '@/hooks/useParallax';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectsSectionProps {
  projects?: IProject[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  projects = SAMPLE_PROJECTS 
}) => {
  const { projects: projectsTransition } = useSectionTransition();
  // Limit to first 3 projects for homepage
  const featuredProjects = projects.slice(0, 3);
  const [selectedProject, setSelectedProject] = useState<IProject>(featuredProjects[0]);

  const handleProjectSelect = (project: IProject) => {
    setSelectedProject(project);
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      id="projects" 
      className="min-h-screen bg-warm-ivory text-charcoal-gray pt-8 pb-20"
      style={projectsTransition}
    >
      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-12"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiGrid className="w-5 h-5 text-muted-gold" />
            <span className="text-sm font-semibold text-stone-gray uppercase tracking-wider">Portfolio</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-charcoal-gray mb-6">
            My <span className="text-muted-gold">Projects</span>
          </h2>
          
          <p className="text-xl text-stone-gray max-w-3xl mx-auto leading-relaxed">
            Explore my collection of projects showcasing expertise in AI, Machine Learning, 
            and Full-Stack Development. Each project represents innovation and technical excellence.
          </p>
        </motion.div>

        {/* Split Layout: Projects List + Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Side - Projects List */}
          <motion.div 
            className="lg:col-span-2 space-y-4 h-full min-h-[600px] flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-charcoal-gray mb-6">Featured Projects</h3>
            <div className="space-y-3 flex-1">
              {featuredProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className={`relative w-full text-left p-4 rounded-lg transition-all duration-500 border overflow-hidden group ${
                    selectedProject.id === project.id
                      ? 'bg-muted-gold text-white shadow-lg border-muted-gold'
                      : 'bg-soft-cream text-charcoal-gray hover:bg-light-neutral/30 border-light-neutral/40'
                  }`}
                  initial={{ opacity: 0, y: 20, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    delay: index * 0.15 + 0.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 2,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-muted-gold/20 via-antique-copper/10 to-muted-gold/20 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ 
                      x: selectedProject.id === project.id ? 0 : "-100%",
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="w-1 h-1 bg-muted-gold rounded-full"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="w-1 h-1 bg-antique-copper rounded-full absolute top-2 -right-1"
                      animate={{
                        y: [0, -12, 0],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </div>
                  
                    <div className="font-semibold text-lg mb-2">{project.title}</div>
                    <div className="text-sm opacity-80 mb-2">{project.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className={`text-xs px-2 py-1 rounded-full ${
                            selectedProject.id === project.id
                              ? 'bg-white/20 text-white'
                              : 'bg-muted-gold/20 text-antique-copper'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-light-neutral text-stone-gray">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                </motion.button>
              ))}
            </div>
            
            {/* View All Projects Button */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-charcoal-gray text-warm-ivory rounded-lg font-medium hover:bg-charcoal-gray/80 transition-colors duration-300 shadow-md"
              >
                <span>View All Projects</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Project Details */}
          <motion.div 
            className="lg:col-span-3 h-full min-h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                className="relative bg-white rounded-2xl p-8 shadow-xl border border-light-neutral/20 overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.95, rotateX: 10 }}
                transition={{ 
                  duration: 0.5, 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 25,
                  staggerChildren: 0.1
                }}
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, ${selectedProject.category === 'Machine Learning' ? '#B4886B' : selectedProject.category === 'AI/ML' ? '#8C5A3B' : '#D1D1D1'} 1px, transparent 0)`
                  }}
                  animate={{
                    backgroundSize: ["20px 20px", "25px 25px", "20px 20px"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Project Image Placeholder with crazy hover effects */}
                <motion.div 
                  className="relative w-full h-48 bg-gradient-to-br from-muted-gold/15 to-soft-cream/30 rounded-lg mb-6 flex items-center justify-center border border-light-neutral/20 group cursor-pointer overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {/* Animated floating elements */}
                  <motion.div
                    className="absolute top-4 left-4 w-2 h-2 bg-muted-gold rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute top-6 right-6 w-1.5 h-1.5 bg-antique-copper rounded-full"
                    animate={{
                      y: [0, -8, 0],
                      x: [0, -3, 0],
                      opacity: [0.4, 0.9, 0.4]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-1/2 w-1 h-1 bg-muted-gold/60 rounded-full"
                    animate={{
                      y: [0, -6, 0],
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  
                  {/* Main project icon with breathe animation */}
                  <motion.div 
                    className="text-6xl opacity-40 relative z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🚀
                  </motion.div>
                  
                  {/* Hover reveal effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-muted-gold/10 via-transparent to-antique-copper/10 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Project Title with typewriter effect */}
                <motion.h3 
                  className="text-3xl font-bold text-charcoal-gray mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {selectedProject.title}
                </motion.h3>
                
                {/* Category & Status with bounce */}
                <motion.div 
                  className="flex items-center space-x-4 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 500, damping: 25 }}
                >
                  <motion.span 
                    className="px-3 py-1 bg-muted-gold/20 text-antique-copper rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {selectedProject.category}
                  </motion.span>
                  <motion.span 
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {selectedProject.status}
                  </motion.span>
                </motion.div>

                {/* Description with reveal animation */}
                <motion.p 
                  className="text-stone-gray leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {selectedProject.shortDescription}
                </motion.p>

                {/* Tech Stack with staggered animations */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.h4 
                    className="font-semibold text-charcoal-gray mb-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Tech Stack
                  </motion.h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-soft-cream text-charcoal-gray rounded-full text-sm font-medium border border-light-neutral/30 cursor-default"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: 0.8 + index * 0.1, 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 25 
                        }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "#B4886B20",
                          transition: { type: "spring", stiffness: 400, damping: 10 }
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons with magnetic effect */}
                <motion.div 
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 100, damping: 15 }}
                >
                  {selectedProject.liveUrl && (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center space-x-2 px-6 py-3 bg-muted-gold text-white rounded-lg font-medium shadow-md overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(180, 136, 107, 0.3)",
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-antique-copper via-muted-gold to-antique-copper opacity-0 group-hover:opacity-100"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                      <FiExternalLink className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">View Project</span>
                    </motion.a>
                  )}
                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center space-x-2 px-6 py-3 bg-soft-cream text-charcoal-gray rounded-lg font-medium border border-light-neutral/40 overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: "#B4886B80",
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-muted-gold/10 to-antique-copper/10 opacity-0 group-hover:opacity-100"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                      <FiGithub className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">GitHub</span>
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ProjectsSection;