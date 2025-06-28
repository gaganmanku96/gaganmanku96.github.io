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
    <section id="about" className="space-section bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-900 dark:to-primary-900/20">
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
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block">Get to Know Me</span>
            <h2 className="heading-secondary mb-6 text-gradient">About Me</h2>
            <p className="text-body-large text-slate-600 dark:text-slate-400 mb-6">
              Senior Data Scientist specializing in Generative AI and Natural Language Processing
            </p>
            <p className="text-body text-slate-600 dark:text-slate-400 leading-relaxed">
              With over 6 years of experience at <span className="font-semibold text-primary-600 dark:text-primary-400">Zykrr Technologies</span>, 
              I've been promoted multiple times, reflecting consistent performance in developing cutting-edge AI solutions. 
              I specialize in building <span className="font-semibold text-secondary-600 dark:text-secondary-400">multi-agent GenAI systems</span>, 
              <span className="font-semibold text-primary-600 dark:text-primary-400">LLM frameworks</span>, and 
              <span className="font-semibold text-secondary-600 dark:text-secondary-400">speech analytics platforms</span>.
            </p>
            <p className="mt-4 text-body text-slate-600 dark:text-slate-400 leading-relaxed">
              My work has directly impacted business outcomes, including a <span className="font-bold text-primary-600 dark:text-primary-400">40% increase in user engagement</span> 
              through interactive AI systems and processing <span className="font-bold text-secondary-600 dark:text-secondary-400">10,000+ calls monthly</span> 
              for actionable insights. I'm passionate about pushing the boundaries of what's possible with AI.
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants}>
            <h3 className="heading-tertiary text-center mb-10 text-gradient">Technical Expertise</h3>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {techStack.map((tech, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-slate-700 dark:text-slate-300">{tech.name}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tech.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700">
                    <motion.div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2.5 rounded-full"
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
            <h3 className="heading-tertiary text-center mb-10 text-gradient">Key Achievements</h3>
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card-hover text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="card-content">
                    <span className="text-4xl mb-4 block">{fact.icon}</span>
                    <p className="text-base text-slate-700 dark:text-slate-300">{fact.fact}</p>
                  </div>
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
