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
      title: 'Why Whisper Hallucinates and How to Fix It',
      description: 'Coming Soon - Comprehensive research exploring hallucination phenomena in OpenAI\'s Whisper model and developing practical solutions for production environments.',
      tags: ['Whisper', 'Speech AI', 'Audio Processing', 'Research'],
      link: '/case-studies',
    },
    {
      id: '2',
      title: 'LoRA Best Practices: What Actually Works in Production',
      description: 'Coming Soon - Real-world insights from training dozens of LoRA adapters. Sharing what worked, what failed, and the battle-tested practices for production deployment.',
      tags: ['LoRA', 'Best Practices', 'Production', 'Real-world'],
      link: '/case-studies',
    },
    {
      id: '3',
      title: 'Can We Add Hindi Language Support in Parakeet S2T?',
      description: 'Coming Soon - Groundbreaking research exploring feasibility and implementation strategies for adding Hindi language support to NVIDIA\'s Parakeet Speech-to-Text model.',
      tags: ['Parakeet', 'Hindi NLP', 'Multilingual AI', 'Speech-to-Text'],
      link: '/case-studies',
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
    <section className="space-section bg-gradient-to-br from-slate-50 to-primary-50/30 dark:from-slate-900 dark:to-primary-900/10 relative z-30">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center relative z-40">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block relative z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full">
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