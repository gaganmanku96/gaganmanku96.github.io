import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiExternalLink, FiGithub, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { IProject } from '@/types/project';

interface ProjectCardProps {
  project: IProject;
  index: number;
  onViewProject: (project: IProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewProject }) => {
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="group relative bg-cream rounded-2xl overflow-hidden border border-dark-teal/10 shadow-sm cursor-pointer"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px -10px rgba(45, 79, 70, 0.15)',
        borderColor: '#F4B63C40'
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onViewProject(project)}
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-mustard/10 to-dark-teal/10">
        {project.thumbnail ? (
          <>
            <motion.div
              variants={imageVariants}
              initial="initial"
              whileHover="hover"
              className="relative w-full h-full"
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-deep-teal/80 via-transparent to-transparent"
              variants={overlayVariants}
              initial="initial"
              whileHover="hover"
            >
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {project.liveUrl && (
                    <div className="p-2 bg-cream/20 backdrop-blur-sm rounded-full">
                      <FiExternalLink className="w-4 h-4 text-cream" />
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="p-2 bg-cream/20 backdrop-blur-sm rounded-full">
                      <FiGithub className="w-4 h-4 text-cream" />
                    </div>
                  )}
                </motion.div>
                
                <motion.div
                  className="text-cream text-sm font-medium"
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  View Details
                </motion.div>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-6xl opacity-30">🚀</div>
          </div>
        )}
        
        {/* Featured badge */}
        {project.featured && (
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-mustard text-deep-teal text-xs font-semibold rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            Featured
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 bg-dark-teal/10 text-dark-teal text-xs font-medium rounded-full">
              {project.category}
            </span>
            <div className="flex items-center text-deep-teal/60 text-xs">
              <FiCalendar className="w-3 h-3 mr-1" />
              {new Date(project.completionDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              })}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-deep-teal leading-tight group-hover:text-mustard transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-deep-teal/70 text-sm leading-relaxed line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 4).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-cream border border-dark-teal/20 text-deep-teal text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 bg-mustard/10 text-mustard text-xs rounded-md font-medium">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <motion.div
          className="flex items-center justify-between pt-2 border-t border-dark-teal/10"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="text-sm text-deep-teal/60">
            {project.status}
          </div>
          
          <motion.div
            className="flex items-center text-mustard text-sm font-medium group-hover:text-deep-teal transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            <span>View Project</span>
            <FiArrowRight className="w-4 h-4 ml-1" />
          </motion.div>
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-mustard/5 to-dark-teal/5 opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;