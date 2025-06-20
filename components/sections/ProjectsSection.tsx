import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Project data structure
interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  caseStudyLink?: string;
  featured: boolean;
  category: string;
}

const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
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

  // Real project data from GitHub profile
  const projects: Project[] = [
    {
      id: 1,
      title: "Finding Missing Person using AI",
      description: "AI-powered solution using facial recognition and machine learning to help locate missing persons with PostgreSQL database integration.",
      thumbnail: "https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=AI+Missing+Person",
      technologies: ["Python", "Computer Vision", "Machine Learning", "PostgreSQL"],
      githubLink: "https://github.com/gaganmanku96/Finding-missing-person-using-AI",
      featured: true,
      category: "Machine Learning"
    },
    {
      id: 2,
      title: "ALBERT Sentiment Analysis",
      description: "Google's state-of-the-art Natural Language Processing model implementation with superior results across various NLP tasks.",
      thumbnail: "https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=ALBERT+NLP",
      technologies: ["Python", "NLP", "ALBERT", "Transformers"],
      githubLink: "https://github.com/gaganmanku96/Albert-Sentiment-Analysis",
      featured: true,
      category: "Machine Learning"
    },
    {
      id: 3,
      title: "Gibberish Detection",
      description: "Experimental machine learning project for detecting and classifying gibberish text using advanced ML techniques.",
      thumbnail: "https://via.placeholder.com/400x250/10B981/FFFFFF?text=Gibberish+Detection",
      technologies: ["Python", "Machine Learning", "Jupyter Notebook", "NLP"],
      githubLink: "https://github.com/gaganmanku96/Gibberish-Detection",
      featured: false,
      category: "Machine Learning"
    },
    {
      id: 4,
      title: "Talk with Figma Claude",
      description: "Revolutionary integration enabling designers to interact with Claude AI directly within Figma for enhanced design workflows.",
      thumbnail: "https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Figma+Claude",
      technologies: ["JavaScript", "Figma API", "Claude AI", "UI/UX"],
      githubLink: "https://github.com/gaganmanku96/talk-with-figma-claude",
      featured: true,
      category: "Frontend"
    },
    {
      id: 5,
      title: "Browserless Selenium Scraping",
      description: "High-performance web scraping solution using Selenium in serverless environments, optimized for scalability.",
      thumbnail: "https://via.placeholder.com/400x250/06B6D4/FFFFFF?text=Web+Scraping",
      technologies: ["Python", "Selenium", "Web Scraping", "Docker"],
      githubLink: "https://github.com/gaganmanku96/Browserless-Selenium-Scrapping",
      featured: false,
      category: "Data Engineering"
    },
    {
      id: 6,
      title: "Docker Tutorial for Data Scientists",
      description: "Comprehensive educational resource teaching data scientists how to leverage Docker for reproducible ML workflows.",
      thumbnail: "https://via.placeholder.com/400x250/EF4444/FFFFFF?text=Docker+Tutorial",
      technologies: ["Docker", "Data Science", "Education", "DevOps"],
      githubLink: "https://github.com/gaganmanku96/Docker-Tutorial---Data-Scientists",
      featured: false,
      category: "DevOps"
    }
  ];

  // Filter categories
  const categories = ['All', 'Machine Learning', 'Frontend', 'Data Engineering', 'DevOps'];
  
  // Filter projects based on active filter
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
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
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 inline-block">My Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
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
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid - Bento layout */}
        <motion.div
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-fr"
        >
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`${project.featured ? 'md:col-span-3 lg:col-span-6' : 'md:col-span-3 lg:col-span-4'} ${project.id % 5 === 0 ? 'md:row-span-2' : ''}`}
            >
              <ProjectCard project={project} variants={itemVariants} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Project card component
const ProjectCard: React.FC<{ project: Project; variants: any }> = ({ project, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl h-full border border-gray-100 dark:border-gray-700 group hover:-translate-y-1"
      whileHover={{ y: -5 }}
    >
      {/* Project image with gradient overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        {project.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Project content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-medium">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Project links */}
        <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View Code
          </a>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}

          {project.caseStudyLink && (
            <a
              href={project.caseStudyLink}
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Case Study
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
