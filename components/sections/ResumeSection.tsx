import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ResumeSection: React.FC = () => {
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
        staggerChildren: 0.2, // Stagger children within the main grid
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 }, // Slightly more pronounced y offset
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6, // Slightly longer duration for a smoother feel
        ease: [0.6, 0.01, 0.05, 0.95], // Custom cubic bezier (adjusted for valid range)
      },
    },
  };
  
  const headerTextVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };

  const highlights = [
    {
      category: 'Education',
      items: [
        'Master of Science in Computer Science - Stanford University (Hypothetical)',
        'Bachelor of Technology in Computer Engineering - IIT Delhi (Hypothetical)'
      ]
    },
    {
      category: 'Key Skills',
      items: [
        'Next.js & React Ecosystem',
        'Tailwind CSS & Modern Styling',
        'Framer Motion for Animations',
        'TypeScript for Scalable Apps',
        'Full Stack Web Development'
      ]
    },
    {
      category: 'Certifications (Examples)',
      items: [
        'AWS Certified Developer - Associate',
        'Certified Kubernetes Application Developer (CKAD)',
        'Professional Scrum Master (PSM I)'
      ]
    },
    {
      category: 'Proficient Languages',
      items: [
        'JavaScript (ES6+)',
        'TypeScript',
        'Python',
        'HTML5 & CSS3'
      ]
    }
  ];

  return (
    <section id="resume" className="space-section bg-gradient-to-br from-white to-green-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref} // Intersection observer ref for triggering animation
          initial="hidden"
          animate={controls} // Controls animation based on inView state
          variants={{
            hidden: { opacity: 0 }, // Simpler parent variant, children handle specifics
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.15, delayChildren: 0.2 } // Stagger for header elements
            }, 
          }}
          className="text-center mb-20"
        >
          <motion.span 
            variants={headerTextVariants} 
            className="text-base font-semibold text-green-600 dark:text-green-400 uppercase tracking-widest mb-3 inline-block"
          >
            My Credentials
          </motion.span>
          <motion.h2 
            variants={headerTextVariants} 
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-green-700 to-gray-800 dark:from-white dark:via-green-400 dark:to-white pb-2"
          >
            Resume & Highlights
          </motion.h2>
          <motion.p 
            variants={headerTextVariants} 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Explore my professional background, key skills, and download my full resume for a detailed overview.
          </motion.p>
        </motion.div>

        {/* Main Content Grid - applies containerVariants for staggering its direct children */}
        <motion.div 
          initial="hidden"
          animate={controls} // Use the same controls for the grid animation
          variants={containerVariants} // This will stagger the left and right columns
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-12 items-start"
        >
          {/* Left Column: Resume Viewer Placeholder */}
          <motion.div
            variants={itemVariants} // This column animates as one item
            className="lg:col-span-2 bg-white dark:bg-gray-800/70 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 backdrop-blur-md"
          >
            <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 dark:bg-gray-700/30">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">Gagandeep Singh - Resume</h3>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-3 py-1 bg-green-100 dark:bg-green-700/30 text-green-700 dark:text-green-300 rounded-full">
                Last Updated: July 2024
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800/30 h-[650px] flex items-center justify-center p-6 sm:p-8">
              <div className="text-center p-8 sm:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg mx-auto border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-300">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                  <svg 
                    className="mx-auto h-24 w-24 text-green-500 dark:text-green-400 mb-8" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="1.2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </motion.div>
                <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Resume Preview</h4>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm sm:text-base">
                  An interactive resume viewer will be available here soon. In the meantime, please download the PDF.
                </p>
                <a
                  href="/assets/Gagan_Manku_Resume.pdf" 
                  download="Gagan_Manku_Resume.pdf"
                  className="inline-flex items-center group px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/50 dark:focus:ring-green-400/50 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2.5 transition-transform duration-300 group-hover:translate-y-[-2px]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download PDF Resume
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Highlights and Download Options - This column itself animates as one item */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-1 space-y-8"
          >
            {/* Highlights Section - Each card within this will be staggered by the parent's (Right Column's) variants if this div also has staggerChildren in its itemVariants definition, or animate together */}
            {highlights.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants} // Each highlight card animates individually based on itemVariants
                className="bg-white dark:bg-gray-800/70 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700/80 hover:shadow-2xl transition-shadow duration-300 backdrop-blur-md transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300 pb-1">
                  {section.category}
                </h3>
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 dark:text-green-400 mr-3.5 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Download Options Card */}
            <motion.div
              variants={itemVariants} // This card animates individually
              className="bg-white dark:bg-gray-800/70 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700/80 hover:shadow-2xl transition-shadow duration-300 backdrop-blur-md transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300 pb-1">
                Download Full Resume
              </h3>
              <div className="space-y-5">
                <a
                  href="/assets/Gagan_Manku_Resume.pdf" 
                  download="Gagan_Manku_Resume.pdf"
                  className="w-full group flex items-center justify-center px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.03] transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/50 dark:focus:ring-green-400/50 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm5 10.586l-2.293-2.293a1 1 0 011.414-1.414L10 10.172l2.879-2.879a1 1 0 011.414 1.414L11.414 13H13a1 1 0 110 2H7a1 1 0 110-2h1.586l-2.293-2.293z" />
                  </svg>
                  Download PDF
                </a>
                <a
                  href="/assets/Gagan_Manku_Resume.docx" 
                  download="Gagan_Manku_Resume.docx"
                  className="w-full group flex items-center justify-center px-6 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/80 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:scale-[1.03]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /> 
                     <path fillRule="evenodd" d="M10 9a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zM7 9a1 1 0 000 2h1a1 1 0 100-2H7z" clipRule="evenodd" />                
                  </svg>
                  Download DOCX
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div> {/* Closes Main Content Grid */}
      </div> {/* Closes container-custom div */}
    </section> // Closes main section tag
  );
};

export default ResumeSection;
