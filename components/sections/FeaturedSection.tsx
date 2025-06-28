import React from 'react';
import { motion } from 'framer-motion';
import Carousel from '@/components/Carousel';

const FeaturedSection: React.FC = () => {
  // Latest projects data
  const latestProjects = [
    {
      id: '1',
      title: 'CHAOS Framework',
      description: 'Revolutionary synthetic training data generator that teaches AI systems "how to think, not just what to do". Features progressive difficulty, confidence tracking, adaptive reasoning, and multi-dimensional learning scenarios using PEFT with Gemini AI.',
      tags: ['Python', 'Gemini AI', 'PEFT', 'Machine Learning'],
      link: 'https://github.com/gaganmanku96/chaos-framework',
    },
    {
      id: '2',
      title: 'Talk with Figma Claude',
      description: 'Revolutionary integration enabling designers to interact with Claude AI directly within Figma for enhanced workflows. Streamlines the design process by bringing AI assistance directly into the creative environment.',
      tags: ['Figma', 'Claude AI', 'Design Tools', 'Integration'],
      link: 'https://github.com/gaganmanku96/talk-with-figma-claude',
    },
    {
      id: '3',
      title: 'AI-Powered Missing Person Finder',
      description: 'Comprehensive AI solution using facial recognition and machine learning to help locate missing persons. Integrates with PostgreSQL for efficient data management and real-time searching capabilities.',
      tags: ['AI', 'Facial Recognition', 'PostgreSQL', 'Computer Vision'],
      link: 'https://github.com/gaganmanku96/missing-person-ai',
    },
  ];

  // Latest case studies data
  const latestCaseStudies = [
    {
      id: '1',
      title: 'Multi-Agent GenAI Chatbot System',
      description: 'Developed a sophisticated multi-agent chatbot system that increased user engagement by 40%. The system employs advanced NLP techniques and conversation flow management to deliver personalized experiences.',
      tags: ['GenAI', 'Multi-Agent', 'NLP', 'Chatbots'],
      link: '/case-studies#multi-agent-chatbot',
    },
    {
      id: '2',
      title: 'LLM Telemetry Framework',
      description: 'Built a comprehensive telemetry framework for monitoring and optimizing Large Language Model performance. Processes 10,000+ calls monthly providing actionable insights for model improvement.',
      tags: ['LLM', 'Telemetry', 'Monitoring', 'Analytics'],
      link: '/case-studies#llm-telemetry',
    },
    {
      id: '3',
      title: 'Speech Analytics Platform',
      description: 'Engineered an advanced speech analytics platform using Whisper and custom NLP models. Improved model accuracy by 70% while processing thousands of audio files for sentiment and intent analysis.',
      tags: ['Speech Analytics', 'Whisper', 'NLP', 'Audio Processing'],
      link: '/case-studies#speech-analytics',
    },
  ];

  // Key achievements data
  const keyAchievements = [
    {
      id: '1',
      title: '40% Engagement Increase',
      description: 'Achieved a remarkable 40% increase in user engagement through the implementation of interactive AI systems and personalized user experiences using advanced machine learning algorithms.',
      tags: ['User Engagement', 'AI Systems', 'Personalization'],
    },
    {
      id: '2',
      title: '70% Accuracy Improvement',
      description: 'Improved model accuracy by 70% through innovative feature engineering, advanced preprocessing techniques, and fine-tuning of machine learning models for production environments.',
      tags: ['Model Accuracy', 'Feature Engineering', 'ML Optimization'],
    },
    {
      id: '3',
      title: '10K+ Monthly Processing',
      description: 'Successfully processing over 10,000 calls monthly for actionable insights using scalable AI infrastructure and real-time analytics pipelines built with modern cloud technologies.',
      tags: ['Scale', 'Real-time Analytics', 'Cloud Infrastructure'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="space-section bg-gradient-to-br from-slate-50 to-primary-50/30 dark:from-slate-900 dark:to-primary-900/10">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block">
              Featured Work
            </span>
            <h2 className="heading-secondary mb-6 text-gradient">Latest Projects & Achievements</h2>
            <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Explore my most recent projects, case studies, and key achievements in Generative AI, 
              Machine Learning, and innovative technology solutions.
            </p>
          </motion.div>

          {/* Latest Projects Carousel */}
          <motion.div variants={itemVariants}>
            <Carousel
              items={latestProjects}
              title="Latest Projects"
              autoPlay={true}
              autoPlayDelay={6000}
            />
          </motion.div>

          {/* Latest Case Studies Carousel */}
          <motion.div variants={itemVariants}>
            <Carousel
              items={latestCaseStudies}
              title="Latest Case Studies"
              autoPlay={true}
              autoPlayDelay={7000}
            />
          </motion.div>

          {/* Key Achievements Carousel */}
          <motion.div variants={itemVariants}>
            <Carousel
              items={keyAchievements}
              title="Key Achievements"
              autoPlay={true}
              autoPlayDelay={8000}
            />
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-body text-slate-600 dark:text-slate-400 mb-8">
              Interested in collaborating or learning more about my work?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/projects" className="btn-primary">
                View All Projects
              </a>
              <a href="/case-studies" className="btn-secondary">
                Read Case Studies
              </a>
              <a href="/contact" className="btn-outline">
                Get In Touch
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;