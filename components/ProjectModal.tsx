import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import { Project } from '@/types/projects';
import Image from 'next/image';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  // Handle escape key press
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Handle body scroll lock and escape key
  useEffect(() => {
    if (isOpen) {
      // Store original scroll position and lock body scroll
      const scrollY = window.scrollY;
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPosition = window.getComputedStyle(document.body).position;
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Add escape key listener
      document.addEventListener('keydown', handleEscapeKey);
      
      // Cleanup function
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.position = originalPosition;
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, handleEscapeKey]);

  if (!project) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full h-full md:w-[95vw] md:h-[95vh] md:max-w-6xl bg-white dark:bg-slate-900 md:rounded-2xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 md:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-4">
                  <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm md:text-lg text-primary-600 dark:text-primary-400 font-medium mb-4">
                    {project.tagline}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm md:text-base"
                    >
                      <FiGithub className="w-4 h-4" />
                      View Code
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm md:text-base"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain min-h-0" style={{ scrollBehavior: 'smooth' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 min-h-full">
                {/* Left Column - Story */}
                <motion.div 
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8 h-fit"
                >
                  {/* Problem Statement */}
                  <motion.section variants={itemVariants}>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      🎯 The Challenge
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.problemStatement}
                    </p>
                  </motion.section>

                  {/* Solution */}
                  <motion.section variants={itemVariants}>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      💡 The Solution
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.solutionOverview}
                    </p>
                  </motion.section>

                  {/* Impact */}
                  {project.impact && (
                    <motion.section variants={itemVariants}>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        📈 The Impact
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {project.impact}
                      </p>
                    </motion.section>
                  )}

                  {/* Key Features */}
                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <motion.section variants={itemVariants}>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-4">
                        ⚡ Key Features
                      </h3>
                      <div className="space-y-3">
                        {project.keyFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-primary-600 dark:text-primary-400 text-xs md:text-sm">✓</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white text-sm md:text-base">{feature.title}</h4>
                              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.section>
                  )}

                  {/* Technologies */}
                  <motion.section variants={itemVariants}>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-3">
                      🛠️ Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 md:px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs md:text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.section>

                  {/* Learnings */}
                  {project.learnings && (
                    <motion.section variants={itemVariants}>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        🎓 Key Learnings
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {project.learnings}
                      </p>
                    </motion.section>
                  )}
                </motion.div>

                {/* Right Column - Media & Technical Details */}
                <motion.div 
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6 h-fit"
                >
                  {/* Media Gallery */}
                  <motion.section variants={itemVariants}>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-4">
                      📸 Project Showcase
                    </h3>
                    <div className="space-y-4">
                      {project.media.map((item, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                          {item.type === 'image' && (
                            <div className="relative h-32 md:h-48 w-full">
                              <Image
                                src={item.src}
                                alt={item.caption}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={false}
                              />
                            </div>
                          )}
                          {item.type === 'video' && (
                            <video 
                              controls 
                              className="w-full h-32 md:h-48 object-cover"
                              poster={item.src.replace('.mp4', '-poster.jpg')}
                            >
                              <source src={item.src} type="video/mp4" />
                            </video>
                          )}
                          {item.type === 'gif' && (
                            <img 
                              src={item.src} 
                              alt={item.caption}
                              className="w-full h-32 md:h-48 object-cover"
                            />
                          )}
                          <div className="p-3">
                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">{item.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.section>

                  {/* Technical Deep Dive */}
                  {project.technicalDeepDive && project.technicalDeepDive.length > 0 && (
                    <motion.section variants={itemVariants}>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-4">
                        🔧 Technical Deep Dive
                      </h3>
                      <div className="space-y-4">
                        {project.technicalDeepDive.map((section, index) => (
                          <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 md:p-4">
                            <h4 className="font-medium text-slate-900 dark:text-white mb-2 text-sm md:text-base">
                              {section.title}
                            </h4>
                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                              {section.content}
                            </p>
                            {section.codeSnippet && (
                              <div className="bg-slate-900 rounded-lg p-2 md:p-3 overflow-x-auto">
                                <pre className="text-xs md:text-sm text-slate-300">
                                  <code>{section.codeSnippet.code}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.section>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;