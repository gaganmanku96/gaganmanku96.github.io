import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ProjectDetailProps } from '@/types/project';
import { FiGithub, FiExternalLink, FiX, FiCalendar, FiTag, FiCode } from 'react-icons/fi';

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, className = '' }) => {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className={`h-full flex flex-col ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header with Close Button */}
      <motion.div 
        className="flex items-start justify-between mb-6"
        variants={itemVariants}
      >
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-3 py-1 bg-mustard text-deep-teal text-sm font-semibold rounded-full">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 bg-dark-teal text-cream text-sm font-semibold rounded-full">
                Featured
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-deep-teal mb-3 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-deep-teal/80 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
        
        <motion.button
          onClick={onClose}
          className="ml-4 p-2 text-deep-teal hover:text-mustard text-2xl transition-colors duration-300 flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close project details"
        >
          <FiX />
        </motion.button>
      </motion.div>

      {/* Project Meta Information */}
      <motion.div 
        className="flex flex-wrap items-center gap-4 mb-6 text-sm text-deep-teal/70"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-1">
          <FiCalendar className="w-4 h-4" />
          <span>
            {new Date(project.completionDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <FiTag className="w-4 h-4" />
          <span>{project.status}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FiCode className="w-4 h-4" />
          <span>{project.techStack.length} Technologies</span>
        </div>
      </motion.div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
        {/* Project Image */}
        {project.thumbnail && (
          <motion.div 
            className="mb-8 rounded-2xl overflow-hidden shadow-lg"
            variants={itemVariants}
          >
            <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </motion.div>
        )}

        {/* Full Description */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-deep-teal mb-4">About This Project</h2>
          <div className="prose prose-lg max-w-none">
            {project.fullDescription.split('\n').map((paragraph, index) => (
              <p key={index} className="text-deep-teal/80 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-deep-teal mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <motion.span
                key={index}
                className="tech-chip"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Project Images Gallery */}
        {project.images && project.images.length > 0 && (
          <motion.div className="mb-8" variants={itemVariants}>
            <h3 className="text-xl font-bold text-deep-teal mb-4">Project Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Project Links */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-deep-teal mb-4">Project Links</h3>
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </motion.a>
            )}
            
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="w-4 h-4" />
                <span>View Code</span>
              </motion.a>
            )}

            {project.caseStudyUrl && (
              <motion.a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink className="w-4 h-4" />
                <span>Case Study</span>
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Video Embed */}
        {project.videoUrl && (
          <motion.div className="mb-8" variants={itemVariants}>
            <h3 className="text-xl font-bold text-deep-teal mb-4">Project Demo</h3>
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
              <iframe
                src={project.videoUrl.replace('watch?v=', 'embed/')}
                title={`${project.title} demo video`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Sticky Footer with Actions */}
      <motion.div 
        className="mt-6 pt-4 border-t border-dark-teal/20 bg-cream"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm text-deep-teal/60">
            <p>Interested in this project?</p>
          </div>
          <div className="flex space-x-3">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-deep-teal hover:text-mustard transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View on GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-deep-teal hover:text-mustard transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View live demo"
              >
                <FiExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;