import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiTrendingUp } from 'react-icons/fi';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  duration: string;
  highlights: string[];
  logo?: string;
}

const ExperienceTimeline: React.FC = () => {
  const experiences: Experience[] = [
    {
      id: '1',
      company: 'TechCorp',
      position: 'Senior GenAI Engineer',
      location: 'San Francisco, CA',
      duration: '2023 - Present',
      highlights: [
        'Led development of LLM-powered applications',
        'Improved model performance by 40%',
        'Built production ML pipelines'
      ]
    },
    {
      id: '2',
      company: 'DataSync',
      position: 'ML Engineer',
      location: 'New York, NY',
      duration: '2021 - 2023',
      highlights: [
        'Deployed 15+ ML models to production',
        'Reduced inference time by 60%',
        'Mentored junior data scientists'
      ]
    },
    {
      id: '3',
      company: 'AI Innovations',
      position: 'Data Scientist',
      location: 'Austin, TX',
      duration: '2019 - 2021',
      highlights: [
        'Built NLP solutions for customer insights',
        'Increased revenue by $2M annually',
        'Published 3 research papers'
      ]
    }
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { 
      opacity: 0, 
      x: -30
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-deep-teal/80">Work Experience</h3>
      
      <motion.div 
        className="relative"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-mustard via-dark-teal to-transparent opacity-30"></div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative flex items-start space-x-4 group"
              variants={itemVariants}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {/* Timeline dot */}
              <motion.div
                className="flex-shrink-0 w-3 h-3 bg-mustard rounded-full border-2 border-cream shadow-sm relative z-10"
                whileHover={{ 
                  scale: 1.3,
                  backgroundColor: '#2D4F46'
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 bg-mustard rounded-full opacity-0"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </motion.div>

              {/* Content */}
              <motion.div 
                className="flex-1 bg-cream/50 rounded-lg p-4 border border-dark-teal/10 shadow-sm"
                whileHover={{
                  backgroundColor: 'rgba(250, 249, 246, 0.8)',
                  borderColor: '#F4B63C40',
                  boxShadow: '0 4px 20px -5px rgba(244, 182, 60, 0.2)'
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4 className="font-semibold text-deep-teal text-lg">
                    {exp.position}
                  </h4>
                  <div className="flex items-center text-deep-teal/60 text-sm">
                    <FiCalendar className="w-4 h-4 mr-1" />
                    {exp.duration}
                  </div>
                </div>
                
                <div className="flex items-center text-mustard font-medium mb-2">
                  {exp.company}
                </div>
                
                <div className="flex items-center text-deep-teal/60 text-sm mb-3">
                  <FiMapPin className="w-4 h-4 mr-1" />
                  {exp.location}
                </div>

                {/* Highlights */}
                <div className="space-y-1">
                  {exp.highlights.map((highlight, highlightIndex) => (
                    <motion.div
                      key={highlightIndex}
                      className="flex items-start text-sm text-deep-teal/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.2 + highlightIndex * 0.1,
                        duration: 0.3 
                      }}
                    >
                      <FiTrendingUp className="w-3 h-3 mr-2 mt-1 text-mustard flex-shrink-0" />
                      {highlight}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceTimeline;