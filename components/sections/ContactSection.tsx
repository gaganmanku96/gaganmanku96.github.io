import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, this would be an API call to a backend service
      // For now, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setSubmitStatus('success');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  // State for copy notification
  const [copySuccess, setCopySuccess] = useState('');

  // Copy to clipboard function
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${type} copied to clipboard!`);
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  // Contact information
  const contactInfo = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'Email',
      value: 'gaganmanku96@gmail.com',
      link: 'mailto:gaganmanku96@gmail.com',
      hasCopy: true,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: 'Mobile',
      value: '+91-9871061965',
      link: 'tel:+919871061965',
      hasCopy: true,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: 'Location',
      value: 'Gurgaon, India',
      link: null,
      hasCopy: false,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'Schedule a Call',
      value: 'Topmate',
      link: 'https://topmate.io/gaganmanku96',
      hasCopy: false,
    },
  ];

  return (
    <section id="contact" className="space-section bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-900 dark:to-primary-900/20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block">Let's Connect</span>
          <h2 className="heading-secondary mb-6 text-gradient">Get In Touch</h2>
          <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Have a question or want to work together? Feel free to reach out to me directly through any of the channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:items-start">
          {/* Contact form */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="lg:col-span-3 card h-full"
          >
            <div className="card-content">
              <h3 className="heading-tertiary text-slate-900 dark:text-white mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Project Inquiry"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-300"
                  placeholder="Your message here..."
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-md text-sm">
                    Your message has been sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-3 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 rounded-md text-sm">
                    There was an error sending your message. Please try again later.
                  </div>
                )}
              </motion.div>
            </form>
            </div>
          </motion.div>

          {/* Contact information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="lg:col-span-2 space-y-6 h-full flex flex-col"
          >
            {/* Contact cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-hover flex items-start p-6"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary-600 dark:text-primary-400">{info.icon}</span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{info.title}</h4>
                  <div className="flex items-center gap-2">
                    {info.link ? (
                      <a
                        href={info.link}
                        target={info.link.startsWith('mailto') || info.link.startsWith('tel:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-400">{info.value}</span>
                    )}
                    {info.hasCopy && (
                      <button
                        onClick={() => copyToClipboard(info.value, info.title)}
                        className="ml-2 p-1.5 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                        title={`Copy ${info.title}`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="card-hover"
            >
              <div className="card-content">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/gaganmanku96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="GitHub"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/gaganmanku96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-secondary-600 hover:text-white dark:hover:bg-secondary-600 dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/gaganmanku96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-accent-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="Twitter"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="https://medium.com/@gaganmanku96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-600 dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="Medium"
                  >
                    <svg className="h-6 w-6" fill="#00AB6C" viewBox="0 0 24 24">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                  </a>
                  <a
                    href="https://huggingface.co/gaganmanku96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label="HuggingFace"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="14" fill="#FFD21E"/>
                      <circle cx="12.5" cy="12.5" r="2" fill="#FF9D0B"/>
                      <circle cx="19.5" cy="12.5" r="2" fill="#FF9D0B"/>
                      <path d="M10 18c1 3 4 5 6 5s5-2 6-5" fill="none" stroke="#FF323D" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="16" cy="16" r="12" fill="none" stroke="#3A3B45" strokeWidth="1" opacity="0.3"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Copy Success Notification */}
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-primary-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {copySuccess}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
