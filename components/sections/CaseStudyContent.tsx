
import { motion } from 'framer-motion';
import { CaseStudy } from '@/data/caseStudies';

interface CaseStudyContentProps {
  study: CaseStudy;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ study }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} className="space-y-12">
      {/* Hero Image */}
      <motion.div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/20">
        <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-lg">{study.category}</span>
        </div>
      </motion.div>

      {/* Title and Description */}
      <div className="text-center">
        <h2 className="heading-secondary text-gradient mb-4">{study.title}</h2>
        <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">{study.description}</p>
      </div>

      {/* Challenge and Solution */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="glass-card p-8">
          <h3 className="heading-tertiary mb-4">The Challenge</h3>
          <p className="text-slate-600 dark:text-slate-300">{study.challenge}</p>
        </div>
        <div className="glass-card p-8">
          <h3 className="heading-tertiary mb-4">The Solution</h3>
          <p className="text-slate-600 dark:text-slate-300">{study.solution}</p>
        </div>
      </div>

      {/* Results */}
      <div>
        <h3 className="heading-tertiary text-center mb-8">Key Results</h3>
        <ul className="space-y-4 max-w-3xl mx-auto">
          {study.results.map((result, i) => (
            <motion.li 
              key={i} 
              className="flex items-center gap-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>{result}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {study.metrics.map((metric, i) => (
          <motion.div 
            key={i} 
            className="glass-card p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="text-4xl font-bold text-primary-500 dark:text-primary-400">{metric.value}</div>
            <div className="text-slate-600 dark:text-slate-400 mt-2">{metric.label}</div>
            <div className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">{metric.improvement}</div>
          </motion.div>
        ))}
      </div>

      {/* Technologies */}
      <div>
        <h3 className="heading-tertiary text-center mb-8">Technologies Used</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {study.technologies.map((tech, i) => (
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
    </motion.div>
  );
};

export default CaseStudyContent;
