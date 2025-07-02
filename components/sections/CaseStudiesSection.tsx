import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies, CaseStudy } from '@/data/caseStudies';
import CaseStudyContent from './CaseStudyContent';

const CaseStudiesSection: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy>(caseStudies[0]);

  return (
    <section id="case-studies" className="space-section bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block">Deep Dives</span>
          <h2 className="heading-secondary mb-6 text-gradient">Technical Case Studies</h2>
          <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Explore detailed technical implementations of cutting-edge AI solutions, from LLM frameworks to speech analytics systems, 
            showcasing real-world impact and innovative approaches.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left: Navigation Panel */}
          <aside className="lg:col-span-4 xl:col-span-3 lg:sticky top-24 h-max mb-12 lg:mb-0">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">Explore Case Studies</h3>
            <div className="space-y-2">
              {caseStudies.map((study) => (
                <button
                  key={study.id}
                  onClick={() => setSelectedStudy(study)}
                  className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-200 ${
                    selectedStudy.id === study.id
                      ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="font-semibold">{study.title}</span>
                  <span className="block text-sm text-slate-500 dark:text-slate-500 mt-1">{study.category}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Right: Content Area */}
          <main className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStudy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <CaseStudyContent study={selectedStudy} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;