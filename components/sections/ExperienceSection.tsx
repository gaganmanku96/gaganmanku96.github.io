import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Experience data structure
interface Experience {
  id?: number;
  company: string;
  position: string; // Changed from role to position
  duration: string;
  location?: string; // Made optional
  achievements: string[];
  technologies: string[];
  logo: string;
}

const ExperienceSection: React.FC = () => {
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

  // Experience data based on actual Zykrr Technologies career progression
  const experiences: Experience[] = [
    {
      id: 1,
      company: "Zykrr Technologies Pvt Ltd",
      position: "AVP Data Scientist",
      duration: "May 2024 - Present",
      location: "Gurugram",
      logo: "https://via.placeholder.com/150/0066CC/FFFFFF?text=Zykrr",
      achievements: [
        "Developed and implemented multi-agent GenAI analytics chatbot, increasing user engagement by 40%",
        "Built Call Analytics System analyzing over 10,000 calls/month with insights on agent performance and sentiment",
        "Engineered custom LLM Telemetry Framework to monitor costs, errors, and retries across 10+ GenAI projects",
        "Led strategic AI initiatives contributing to operational efficiency improvements across the organization"
      ],
      technologies: ["Python", "PyTorch", "Hugging Face", "GenAI", "LLMs", "Azure Cloud", "FastAPI"]
    },
    {
      id: 2,
      company: "Zykrr Technologies Pvt Ltd",
      position: "Senior Manager Data Scientist",
      duration: "May 2023 - May 2024",
      location: "Gurugram",
      logo: "https://via.placeholder.com/150/0066CC/FFFFFF?text=Zykrr",
      achievements: [
        "Delivered actionable insights from structured & unstructured data for multiple client projects",
        "Designed churn analysis model using unsupervised learning with ability to switch to supervised approaches",
        "Automated social media data pipelines, saving 10+ hours per analysis across 10+ clients",
        "Managed data science team and mentored junior scientists on advanced ML techniques"
      ],
      technologies: ["Python", "Scikit-learn", "NLP", "Data Pipelines", "Automation", "Team Leadership"]
    },
    {
      id: 3,
      company: "Zykrr Technologies Pvt Ltd",
      position: "Manager Data Scientist",
      duration: "May 2022 - May 2023",
      location: "Gurugram",
      logo: "https://via.placeholder.com/150/0066CC/FFFFFF?text=Zykrr",
      achievements: [
        "Trained emotion detection model (Transformer-based) to extract customer emotions from text",
        "Developed Key Driver Analysis in Predictive Analytics with NPS simulation features",
        "Added bullet point functionality in Text Analytics via Sentence Transformers",
        "Built Streamlit App for 5 active POCs to enhance visibility and stakeholder engagement"
      ],
      technologies: ["Transformers", "Sentence Transformers", "Streamlit", "NLP", "Predictive Analytics", "Python"]
    },
    {
      id: 4,
      company: "Zykrr Technologies Pvt Ltd",
      position: "Senior Data Scientist",
      duration: "May 2021 - May 2022",
      location: "Gurugram",
      logo: "https://via.placeholder.com/150/0066CC/FFFFFF?text=Zykrr",
      achievements: [
        "Re-architected DS projects using Docker & Kubernetes for better scalability and deployment",
        "Integrated Custom Named Entity Recognition (NER) model into existing workflows",
        "Migrated sentiment and entity models to Transformer Architecture, improving accuracy by 9%",
        "Implemented voice-based RASA chatbot with Topic and Sentiment Extraction integration"
      ],
      technologies: ["Docker", "Kubernetes", "Transformers", "NER", "RASA", "Voice Processing", "Python"]
    },
    {
      id: 5,
      company: "Zykrr Technologies Pvt Ltd",
      position: "Data Scientist",
      duration: "Jun 2019 - May 2021",
      location: "Gurugram",
      logo: "https://via.placeholder.com/150/0066CC/FFFFFF?text=Zykrr",
      achievements: [
        "Migrated Text Analytics solution from JavaScript to Python, enhancing performance for 10,000+ weekly feedbacks",
        "Developed keyword sentiment algorithm using linguistic features—accuracy improved by 70%",
        "Built and deployed Predictive Analytics tools that streamlined stakeholder decision-making",
        "Implemented Redis Blocking Queue to improve text analytics scalability"
      ],
      technologies: ["Python", "JavaScript", "NLP", "Redis", "Text Analytics", "Predictive Analytics"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-950">
      <div className="container-custom">
        <motion.div
          ref={ref} // Ensure ref is used here if this is the main entry animation trigger for the section
          initial="hidden"
          animate={controls} // Animate with controls tied to inView
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 inline-block">My Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Career Progression at Zykrr</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A timeline of my 6+ year journey at Zykrr Technologies, from Data Scientist to AVP Data Scientist, 
            showcasing consistent growth, promotions, and impact in Generative AI and Machine Learning.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Timeline Line - enhanced styling */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-blue-300 via-blue-500 to-purple-600 dark:from-blue-700 dark:via-blue-500 dark:to-purple-700 rounded-full transform -translate-x-1/2"></div>
          {/* For mobile, a simpler line on the left */}
          <div className="md:hidden absolute top-0 bottom-0 left-4 w-1 bg-gradient-to-b from-blue-300 via-blue-500 to-purple-600 dark:from-blue-700 dark:via-blue-500 dark:to-purple-700 rounded-full"></div>

          <motion.div
            ref={ref} // This ref is for the container of timeline items if they stagger
            variants={containerVariants} // Stagger children if defined
            initial="hidden"
            animate={controls} // Animate when this container is in view
            className="space-y-12 md:space-y-0"
          >
            {experiences.map((exp, index) => (
              <TimelineItem 
                key={exp.id || index} 
                experience={exp} 
                isLeft={index % 2 === 0} 
                variants={itemVariants} // Individual item animation variants
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Timeline item component
const TimelineItem: React.FC<{ 
  experience: Experience; 
  isLeft: boolean;
  variants: any;
}> = ({ experience, isLeft, variants }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={variants}
      className={`relative flex flex-col md:flex-row items-start mb-12 md:mb-16 group ${
        isLeft ? 'md:items-start' : 'md:flex-row-reverse md:items-start'
      }`}
    >
      {/* Timeline Dot - Enhanced Styling */}
      <div className="absolute top-0 left-4 md:left-1/2 transform md:-translate-x-1/2 z-10">
        <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 dark:border-blue-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
          <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
        </div>
      </div>

      {/* Content Card - Offset for mobile and adjusted for desktop */}
      <div className={`w-full md:w-5/12 mt-10 md:mt-0 ${isLeft ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform group-hover:-translate-y-1">
          {/* Company Logo and Details */}
          <div className="flex items-start mb-4">
            <div className="w-16 h-16 mr-5 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0 shadow-sm bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
              <img 
                src={experience.logo || 'https://via.placeholder.com/150/FFFFFF/808080?text=Logo'} 
                alt={`${experience.company} logo`} 
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{experience.position}</h3>
              <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{experience.company}</h4>
              <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>{experience.duration}</span>
                {experience.location && <span className="mx-2">•</span>}
                {experience.location && <span>{experience.location}</span>}
              </div>
            </div>
          </div>

          {/* Achievements - Enhanced Toggle and List */}
          <div className="mt-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full text-left px-4 py-2.5 rounded-md bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400"
              aria-expanded={isExpanded}
              aria-controls={`achievements-${experience.id}`}
            >
              <span className="font-semibold text-gray-700 dark:text-gray-200"> {isExpanded ? 'Hide' : 'View'} Key Achievements</span>
              <svg
                className={`ml-2 h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <motion.div
              id={`achievements-${experience.id}`}
              initial={false} // No initial animation, controlled by animate prop
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0, marginTop: isExpanded ? '1rem' : '0rem'}}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className="list-none pl-0 space-y-2 text-gray-600 dark:text-gray-300">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-1 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Technologies - Enhanced Styling */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/50">
            <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Technologies Used:</h5>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
