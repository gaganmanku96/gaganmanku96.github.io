import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiEye } from 'react-icons/fi';
import { Project } from '@/types/projects';
import { enhancedProjects } from '@/data/enhancedProjects';
import ProjectModal from '@/components/ProjectModal';
import Image from 'next/image';

const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Enhanced project data with rich content for recruiters
  const projects = enhancedProjects;

  // Modal functions
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Filter categories
  const categories = ['All', 'Machine Learning', 'Frontend', 'Data Engineering', 'DevOps'];
  
  // Filter projects based on active filter
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter, projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="space-section bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block">My Work</span>
          <h2 className="heading-secondary mb-4 text-gradient">Featured Projects</h2>
          <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Explore my latest work and personal projects. Each project represents a unique challenge and solution.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`mx-2 mb-2 px-5 py-2 rounded-full transition-all duration-300 font-medium text-sm ${activeFilter === category
                ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid - Uniform layout */}
        <motion.div
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              variants={itemVariants}
              onViewDetails={openProjectModal}
            />
          ))}
        </motion.div>
        
        {/* Navigation Arrow to Case Studies */}
        <div className="flex justify-center mt-16">
          <motion.button
            onClick={() => {
              const element = document.getElementById('case-studies');
              if (element) {
                const navbarHeight = 80;
                const elementPosition = element.offsetTop - navbarHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth'
                });
              }
            }}
            className="p-3 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors duration-300 cursor-pointer group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to case studies section"
          >
            <svg className="w-8 h-8 text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>
        </div>

        {/* Project Details Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      </div>
    </section>
  );
};

// Enhanced Project card component
const ProjectCard: React.FC<{ 
  project: Project; 
  variants: any; 
  onViewDetails: (project: Project) => void;
}> = ({ project, variants, onViewDetails }) => {
  return (
    <motion.div
      variants={variants}
      className="card-uniform group hover:-translate-y-2"
      whileHover={{ y: -5 }}
    >
      {/* Project image with gradient overlay */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        {project.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Project content */}
      <div className="card-content">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        
        {/* Tagline for quick understanding */}
        <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-3">
          {project.tagline}
        </p>
        
        <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow line-clamp-2 text-sm">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-chip text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="tech-chip-secondary text-xs">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Project actions */}
        <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
          {/* Primary CTA - View Details */}
          <button
            onClick={() => onViewDetails(project)}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
          >
            <FiEye className="w-4 h-4" />
            View Full Details
          </button>
          
          {/* Secondary actions */}
          <div className="flex gap-2">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 text-sm text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-primary-600 dark:hover:border-primary-400"
            >
              <FiGithub className="w-4 h-4" />
              Code
            </a>

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 text-sm text-slate-700 dark:text-slate-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors font-medium py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-secondary-600 dark:hover:border-secondary-400"
              >
                <FiExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;