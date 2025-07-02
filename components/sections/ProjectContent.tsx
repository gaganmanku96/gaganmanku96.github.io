
import { motion } from 'framer-motion';
import { Project } from '@/types/projects';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

interface ProjectContentProps {
  project: Project;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ project }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} className="space-y-12">
      {/* Hero Image */}
      <motion.div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/20">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-lg">{project.category}</span>
        </div>
      </motion.div>

      {/* Title and Description */}
      <div className="text-center">
        <h2 className="heading-secondary text-gradient mb-4">{project.title}</h2>
        <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">{project.tagline}</p>
      </div>

      {/* Problem Statement */}
      {project.problemStatement && (
        <div className="glass-card p-8">
          <h3 className="heading-tertiary mb-6 text-red-600 dark:text-red-400">The Challenge</h3>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{project.problemStatement}</p>
        </div>
      )}

      {/* Solution Overview */}
      {project.solutionOverview && (
        <div className="glass-card p-8">
          <h3 className="heading-tertiary mb-6 text-blue-600 dark:text-blue-400">My Solution</h3>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{project.solutionOverview}</p>
        </div>
      )}

      {/* Impact & Results */}
      {project.impact && (
        <div className="glass-card p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <h3 className="heading-tertiary mb-6 text-green-600 dark:text-green-400">Impact & Results</h3>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">{project.impact}</p>
        </div>
      )}

      {/* Key Features */}
      <div>
        <h3 className="heading-tertiary text-center mb-8">Key Features</h3>
        <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {project.keyFeatures?.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-center gap-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>{feature.title}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div>
        <h3 className="heading-tertiary text-center mb-8">Technologies Used</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {project.technologies.map((tech, i) => (
            <motion.div 
              key={tech} 
              className="tech-chip-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Gallery */}
      {project.media && project.media.length > 0 && (
        <div>
          <h3 className="heading-tertiary text-center mb-8">Project Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.media.map((media, i) => (
              <motion.div
                key={i}
                className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <img
                  src={media.src}
                  alt={media.caption}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white text-sm p-4 font-medium">{media.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Deep Dive */}
      {project.technicalDeepDive && project.technicalDeepDive.length > 0 && (
        <div>
          <h3 className="heading-tertiary text-center mb-8">Technical Implementation</h3>
          <div className="space-y-8">
            {project.technicalDeepDive.map((section, i) => (
              <motion.div
                key={i}
                className="glass-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  {section.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {section.content}
                </p>
                {section.codeSnippet && (
                  <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-slate-400 font-medium">
                        {section.codeSnippet.language}
                      </span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(section.codeSnippet!.code)}
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        Copy Code
                      </button>
                    </div>
                    <pre className="text-sm text-slate-100 font-mono overflow-x-auto">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Project Learnings */}
      {project.learnings && (
        <div className="glass-card p-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <h3 className="heading-tertiary mb-6 text-purple-600 dark:text-purple-400">Key Learnings</h3>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed italic">{project.learnings}</p>
        </div>
      )}

      {/* Links */}
      <div className="flex justify-center gap-4">
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="button-primary">
          <FiGithub className="w-5 h-5 mr-2" />
          View on GitHub
        </a>
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="button-secondary">
            <FiExternalLink className="w-5 h-5 mr-2" />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectContent;
