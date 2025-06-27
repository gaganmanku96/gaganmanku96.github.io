import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Python', icon: '🐍' },
  { name: 'TensorFlow', icon: '🧠' },
  { name: 'PyTorch', icon: '🔥' },
  { name: 'OpenAI', icon: '🤖' },
  { name: 'LangChain', icon: '⛓️' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'MLflow', icon: '📊' },
  { name: 'JavaScript', icon: '💻' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '🚀' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
];

const SkillsSection: React.FC = () => {
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
    <section id="skills" className="space-section bg-white dark:bg-slate-800">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4 text-gradient">My Skills</h2>
          <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A look at the technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="card-hover p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="text-5xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
