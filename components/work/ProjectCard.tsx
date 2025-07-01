import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkProject } from '@/data/workExperience';

interface ProjectCardProps {
  project: WorkProject;
  index: number;
}

const getProjectTypeIcon = (type: WorkProject['type']) => {
  switch (type) {
    case 'technical':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'leadership':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'product':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    case 'research':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    default:
      return null;
  }
};

const getProjectTypeColor = (type: WorkProject['type']) => {
  switch (type) {
    case 'technical':
      return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
    case 'leadership':
      return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
    case 'product':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    case 'research':
      return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
    default:
      return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20';
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.1
      }
    }
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {/* Card Header */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Project Type & Timeline */}
            <div className="flex items-center gap-3 mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getProjectTypeColor(project.type)}`}>
                {getProjectTypeIcon(project.type)}
                <span className="ml-1 capitalize">{project.type}</span>
              </span>
              {project.timeline && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {project.timeline}
                </span>
              )}
            </div>

            {/* Project Name */}
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {project.name}
            </h4>

            {/* Brief Description */}
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies Preview (first 3) */}
            <div className="flex flex-wrap gap-1 mt-3">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Expand/Collapse Icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 flex-shrink-0"
          >
            <svg
              className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={expandVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700 pt-4">
              
              {/* Full Technology Stack */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Technologies Used:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact & Achievements */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Key Impact:
                </h5>
                <ul className="space-y-1">
                  {project.impact.map((impact, impactIndex) => (
                    <li key={impactIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {impact}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Key Metrics:
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    {project.metrics.map((metric, metricIndex) => (
                      <motion.div
                        key={metricIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: metricIndex * 0.1, duration: 0.3 }}
                        className="text-center p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600"
                      >
                        <div
                          className="text-lg font-bold mb-1"
                          style={{ color: metric.color || '#6366f1' }}
                        >
                          {metric.value}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;