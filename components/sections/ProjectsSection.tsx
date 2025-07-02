import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/projects';
import { enhancedProjects } from '@/data/enhancedProjects';
import ProjectContent from './ProjectContent';

const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Enhanced project data with rich content for recruiters
  const projects = enhancedProjects;

  // Filter categories
  const categories = ['All', 'Machine Learning', 'Frontend', 'Data Engineering', 'DevOps'];
  
  // Filter projects based on active filter
  useEffect(() => {
    let filtered = activeFilter === 'All'
      ? projects
      : projects.filter(project => project.category === activeFilter);
    setFilteredProjects(filtered);
    // Set the first project as selected whenever the filter changes
    if (filtered.length > 0) {
      setSelectedProject(filtered[0]);
    } else {
      setSelectedProject(null);
    }
  }, [activeFilter, projects]);

  return (
    <section id="projects" className="space-section bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block">My Work</span>
          <h2 className="heading-secondary mb-4 text-gradient">Featured Projects</h2>
          <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Explore my latest work and personal projects. Each project represents a unique challenge and solution.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`mx-2 mb-2 px-5 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                activeFilter === category
                  ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-md shadow-primary-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left: Navigation Panel */}
          <aside className="lg:col-span-4 xl:col-span-3 lg:sticky top-24 h-max mb-12 lg:mb-0">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">Explore Projects</h3>
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-200 ${
                    selectedProject?.id === project.id
                      ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="font-semibold">{project.title}</span>
                  <span className="block text-sm text-slate-500 dark:text-slate-500 mt-1">{project.category}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Right: Content Area */}
          <main className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectContent project={selectedProject} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;