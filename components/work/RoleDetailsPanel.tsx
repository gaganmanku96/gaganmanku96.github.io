import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerRole } from '@/data/workExperience';
import ProjectCard from './ProjectCard';

interface RoleDetailsPanelProps {
  role: CareerRole;
  isTransitioning: boolean;
}

type TabType = 'overview' | 'projects' | 'technologies' | 'leadership';

interface Tab {
  id: TabType;
  label: string;
  icon: JSX.Element;
}

const tabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: 'technologies',
    label: 'Tech Stack',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: 'leadership',
    label: 'Leadership',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

const RoleDetailsPanel: React.FC<RoleDetailsPanelProps> = ({ role, isTransitioning }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            key="overview"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Role Header */}
            <div className="pb-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {role.title}
                  </h2>
                  <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                    {role.company}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {role.duration}
                  </p>
                </div>
                {role.teamSize && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                      {role.teamSize}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Team Size</div>
                  </div>
                )}
              </div>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {role.summary}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Key Responsibilities
              </h3>
              <ul className="space-y-3">
                {role.responsibilities.map((responsibility, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">
                      {responsibility}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {role.projects.length}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                  {role.keySkills.length}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Skills</div>
              </div>
              {role.leadershipImpact && (
                <div className="text-center col-span-2 md:col-span-1">
                  <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                    {role.leadershipImpact.length}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Leadership</div>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'projects':
        return (
          <motion.div
            key="projects"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Major Projects ({role.projects.length})
            </h3>
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              {role.projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        );

      case 'technologies':
        return (
          <motion.div
            key="technologies"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Technology Stack
            </h3>
            
            {/* Main Skills */}
            <div>
              <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">Core Technologies</h4>
              <div className="flex flex-wrap gap-3">
                {role.keySkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="tech-chip"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Project Technologies */}
            <div>
              <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">Project Technologies</h4>
              <div className="space-y-4">
                {role.projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                  >
                    <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {project.name}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'leadership':
        return (
          <motion.div
            key="leadership"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Leadership & Impact
            </h3>

            {role.leadershipImpact ? (
              <div className="space-y-6">
                {/* Team Management */}
                {role.teamSize && (
                  <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Team Management
                    </h4>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                        {role.teamSize}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">Direct Reports</p>
                    </div>
                  </div>
                )}

                {/* Leadership Achievements */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Key Leadership Achievements
                  </h4>
                  <ul className="space-y-3">
                    {role.leadershipImpact.map((impact, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-start"
                      >
                        <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-600 dark:text-slate-300">
                          {impact}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  This role focused primarily on individual contribution and technical excellence.
                </p>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate={isTransitioning ? "hidden" : "visible"}
      exit="exit"
      key={role.id}
    >
      {/* Tab Navigation */}
      <div className="flex space-x-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RoleDetailsPanel;