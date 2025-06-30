import React from 'react';
import { motion } from 'framer-motion';
import { IProject, ProjectListProps } from '@/types/project';

interface ProjectListItemProps {
  project: IProject;
  onSelect: (project: IProject) => void;
  isSelected: boolean;
  index: number;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ 
  project, 
  onSelect, 
  isSelected, 
  index 
}) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="mb-3"
    >
      <motion.button
        onClick={() => onSelect(project)}
        className={`w-full text-left p-4 rounded-xl transition-all duration-300 group
          ${isSelected 
            ? 'bg-dark-teal text-cream shadow-lg' 
            : 'bg-cream/50 hover:bg-dark-teal/10 text-deep-teal hover:shadow-md'
          }`}
        whileHover={{ scale: 1.02, x: 5 }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        {/* Project Number */}
        <div className={`text-xs font-bold mb-2 transition-colors duration-300
          ${isSelected ? 'text-mustard' : 'text-dark-teal group-hover:text-mustard'}
        `}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Project Title */}
        <h3 className={`text-lg font-semibold mb-2 leading-tight transition-colors duration-300
          ${isSelected ? 'text-cream' : 'text-deep-teal'}
        `}>
          {project.title}
        </h3>

        {/* Project Category */}
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 transition-colors duration-300
          ${isSelected 
            ? 'bg-mustard text-deep-teal' 
            : 'bg-dark-teal/20 text-dark-teal group-hover:bg-mustard group-hover:text-deep-teal'
          }`}>
          {project.category}
        </div>

        {/* Short Description */}
        <p className={`text-sm leading-relaxed transition-colors duration-300
          ${isSelected ? 'text-cream/90' : 'text-deep-teal/80'}
        `}>
          {project.shortDescription}
        </p>

        {/* Tech Stack Preview */}
        <div className="flex flex-wrap gap-1 mt-3">
          {project.techStack.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className={`px-2 py-0.5 rounded-full text-xs transition-colors duration-300
                ${isSelected 
                  ? 'bg-cream/20 text-cream' 
                  : 'bg-dark-teal/10 text-dark-teal group-hover:bg-dark-teal/20'
                }`}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className={`px-2 py-0.5 rounded-full text-xs transition-colors duration-300
              ${isSelected 
                ? 'bg-cream/20 text-cream' 
                : 'bg-dark-teal/10 text-dark-teal'
              }`}>
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Project Status & Date */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-current opacity-20">
          <span className={`text-xs font-medium transition-colors duration-300
            ${isSelected ? 'text-cream/70' : 'text-deep-teal/60'}
          `}>
            {project.status}
          </span>
          <span className={`text-xs transition-colors duration-300
            ${isSelected ? 'text-cream/70' : 'text-deep-teal/60'}
          `}>
            {new Date(project.completionDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </span>
        </div>
      </motion.button>
    </motion.li>
  );
};

const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  onSelectProject, 
  selectedProjectId,
  className = ''
}) => {
  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-mustard mb-2">
          My Work
        </h1>
        <p className="text-deep-teal/80">
          Select a project to view details
        </p>
        <div className="w-16 h-1 bg-mustard mt-3 rounded-full"></div>
      </motion.div>

      {/* Project Count */}
      <motion.div 
        className="flex items-center justify-between mb-4 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <span className="text-sm text-deep-teal/60">
          {projects.length} Projects
        </span>
        <div className="flex items-center space-x-1">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                project.id === selectedProjectId 
                  ? 'bg-mustard' 
                  : 'bg-dark-teal/20'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
        <ul className="space-y-3">
          {projects.map((project, index) => (
            <ProjectListItem
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              isSelected={project.id === selectedProjectId}
              index={index}
            />
          ))}
        </ul>
      </div>

      {/* Footer */}
      <motion.div 
        className="mt-6 pt-4 border-t border-dark-teal/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div className="flex items-center justify-between text-sm text-deep-teal/60">
          <span>Featured Projects</span>
          <span>{projects.filter(p => p.featured).length}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectList;