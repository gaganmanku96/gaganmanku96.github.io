import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection: React.FC = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };

  const techStack = [
    { name: 'Python & PyTorch', level: 95 },
    { name: 'Hugging Face & Transformers', level: 90 },
    { name: 'Generative AI & LLMs', level: 95 },
    { name: 'Natural Language Processing', level: 90 },
    { name: 'FastAPI & Docker/Kubernetes', level: 85 },
    { name: 'Azure Cloud & Vector DBs', level: 80 },
  ];

  const funFacts = [
    { icon: '🤖', fact: 'Built multi-agent GenAI chatbots' },
    { icon: '📊', fact: 'Analyze 10,000+ calls monthly' },
    { icon: '🚀', fact: 'Promoted multiple times at Zykrr' },
    { icon: '⚡', fact: 'Improved model accuracy by 70%' },
  ];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* About Me Text */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">About Me</h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
              AVP Data Scientist specializing in Generative AI and Natural Language Processing
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              With over 6 years of experience at <span className="font-semibold text-blue-600 dark:text-blue-400">Zykrr Technologies</span>, 
              I've been promoted multiple times, reflecting consistent performance in developing cutting-edge AI solutions. 
              I specialize in building <span className="font-semibold text-purple-600 dark:text-purple-400">multi-agent GenAI systems</span>, 
              <span className="font-semibold text-green-600 dark:text-green-400">LLM frameworks</span>, and 
              <span className="font-semibold text-orange-600 dark:text-orange-400">speech analytics platforms</span>.
            </p>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              My work has directly impacted business outcomes, including a <span className="font-bold text-blue-600 dark:text-blue-400">40% increase in user engagement</span> 
              through interactive AI systems and processing <span className="font-bold text-purple-600 dark:text-purple-400">10,000+ calls monthly</span> 
              for actionable insights. I'm passionate about pushing the boundaries of what's possible with AI.
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">Technical Expertise</h3>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {techStack.map((tech, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <motion.div
                      className="bg-blue-600 h-2.5 rounded-full"
                      initial={{ width: '0%' }}
                      animate={inView ? { width: `${tech.level}%` } : { width: '0%' }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-600">Key Achievements</h3>
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <span className="text-4xl mb-4 block">{fact.icon}</span>
                  <p className="text-base text-gray-700 dark:text-gray-300">{fact.fact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
