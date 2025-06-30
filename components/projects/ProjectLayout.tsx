import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectLayoutProps, IProject } from '@/types/project';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import AiBrain from '@/components/three/AiBrain';

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ projects, className = '' }) => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const handleSelectProject = (project: IProject) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className={`relative min-h-screen bg-cream text-deep-teal overflow-hidden ${className}`}>
      {/* Three.js Background - Fixed position, low opacity */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <AiBrain />
      </div>

      {/* Main Content Grid - Above Three.js background */}
      <div className="relative z-10 h-screen grid grid-cols-1 lg:grid-cols-5">
        
        {/* Left Sidebar: Project List */}
        <motion.aside
          className="lg:col-span-2 p-6 lg:p-8 overflow-y-auto bg-cream/95 backdrop-blur-sm border-r border-dark-teal/10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ProjectList
            projects={projects}
            onSelectProject={handleSelectProject}
            selectedProjectId={selectedProject?.id || null}
          />
        </motion.aside>

        {/* Right Pane: Project Detail or Placeholder */}
        <main className="lg:col-span-3 relative">
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <motion.div
                key={selectedProject.id}
                className="h-full p-6 lg:p-8 overflow-y-auto bg-cream/95 backdrop-blur-sm"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProjectDetail
                  project={selectedProject}
                  onClose={handleCloseProject}
                />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                className="h-full flex flex-col items-center justify-center text-center p-6 lg:p-8 bg-cream/95 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Placeholder Content */}
                <motion.div
                  className="max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Animated Icon */}
                  <motion.div
                    className="w-24 h-24 mx-auto mb-8 relative"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 1, 0, -1, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-mustard to-dark-teal opacity-20"></div>
                    <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-dark-teal to-mustard opacity-30"></div>
                    <div className="absolute inset-4 rounded-full bg-mustard opacity-60"></div>
                    <div className="absolute inset-6 rounded-full bg-cream"></div>
                    <div className="absolute inset-8 rounded-full bg-deep-teal"></div>
                  </motion.div>

                  {/* Welcome Text */}
                  <motion.h2
                    className="text-3xl lg:text-4xl font-bold text-deep-teal mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Welcome to My Portfolio
                  </motion.h2>

                  <motion.p
                    className="text-lg text-deep-teal/80 leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Explore my collection of projects by selecting one from the sidebar. 
                    Each project showcases different technologies and approaches to solving 
                    real-world problems.
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    className="grid grid-cols-3 gap-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div>
                      <div className="text-2xl font-bold text-mustard">
                        {projects.length}
                      </div>
                      <div className="text-sm text-deep-teal/60">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-mustard">
                        {projects.filter(p => p.featured).length}
                      </div>
                      <div className="text-sm text-deep-teal/60">Featured</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-mustard">
                        {new Set(projects.flatMap(p => p.techStack)).size}
                      </div>
                      <div className="text-sm text-deep-teal/60">Technologies</div>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div className="flex items-center justify-center text-deep-teal/60">
                      <motion.div
                        className="flex items-center space-x-2"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="text-sm">Select a project to begin</span>
                        <div className="w-1 h-1 bg-mustard rounded-full animate-pulse"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-cream/95 backdrop-blur-sm border-t border-dark-teal/10 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-deep-teal/60">
            {selectedProject ? (
              <button
                onClick={handleCloseProject}
                className="flex items-center space-x-2 text-deep-teal hover:text-mustard transition-colors"
              >
                <span>← Back to Projects</span>
              </button>
            ) : (
              <span>Select a project above</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-mustard rounded-full animate-pulse"></div>
            <span className="text-xs text-deep-teal/60">
              {projects.length} Projects
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;