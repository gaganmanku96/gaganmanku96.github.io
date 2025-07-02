import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiCopy, FiCheckCircle, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => (
  <div className="relative flex items-center group">
    {children}
    <div className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
      {text}
    </div>
  </div>
);

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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(`${type} copied!`);
      setTimeout(() => setCopySuccess(''), 3000);
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const contactInfo = [
    { icon: <FiMail className="w-6 h-6" />, title: 'Email', value: 'gaganmanku96@gmail.com', link: 'mailto:gaganmanku96@gmail.com', hasCopy: true },
    { icon: <FiPhone className="w-6 h-6" />, title: 'Mobile', value: '+91-9871061965', link: 'tel:+919871061965', hasCopy: true },
    { icon: <FiMapPin className="w-6 h-6" />, title: 'Location', value: 'Gurgaon, India', link: null, hasCopy: false },
    { icon: <FiCalendar className="w-6 h-6" />, title: 'Schedule a Call', value: 'Topmate', link: 'https://topmate.io/gaganmanku96', hasCopy: false },
  ];

  const socialLinks = [
    { icon: <FiGithub className="w-6 h-6" />, label: 'GitHub', url: 'https://github.com/gaganmanku96' },
    { icon: <FiLinkedin className="w-6 h-6" />, label: 'LinkedIn', url: 'https://linkedin.com/in/gaganmanku96' },
    { icon: <FiTwitter className="w-6 h-6" />, label: 'Twitter', url: 'https://twitter.com/gaganmanku96' },
  ];

  return (
    <section id="contact" className="space-section bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-900 dark:to-primary-900/20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block">Let's Connect</span>
          <h2 className="heading-secondary mb-6 text-gradient">Get In Touch</h2>
          <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Have a question or want to work together? Feel free to reach out to me directly through any of the channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            ref={ref}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -1, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors duration-300">
                  {info.icon}
                </div>
                <div className="flex-grow ml-4">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{info.title}</h4>
                  {info.link ? (
                    <a 
                      href={info.link} 
                      target={info.link.startsWith('mailto') || info.link.startsWith('tel:') ? '_self' : '_blank'} 
                      rel="noopener noreferrer" 
                      className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400">{info.value}</span>
                  )}
                </div>
                {info.hasCopy && (
                  <Tooltip text={`Copy ${info.title}`}>
                    <button
                      onClick={() => copyToClipboard(info.value, info.title)}
                      className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      aria-label={`Copy ${info.title}`}
                    >
                      <FiCopy className="w-5 h-5" />
                    </button>
                  </Tooltip>
                )}
              </motion.div>
            ))}
            
            <motion.div variants={itemVariants} className="pt-6">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map(social => (
                  <Tooltip key={social.label} text={social.label}>
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={social.label} 
                      className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all duration-300 transform hover:scale-110"
                    >
                      {social.icon}
                    </a>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="bg-white dark:bg-slate-800/50 p-8 rounded-xl shadow-md border border-slate-200 dark:border-slate-700/50 h-fit"
          >
            <h3 className="heading-tertiary text-slate-900 dark:text-white mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  placeholder="Subject" 
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows={5} 
                  placeholder="Your Message..." 
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-300"
                />
              </div>
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </div>
              {submitStatus === 'success' && (
                <p className="text-emerald-600 dark:text-emerald-400 text-center text-sm">
                  Message sent successfully! I'll be in touch soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 dark:text-red-400 text-center text-sm">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </motion.div>
        </div>
        
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 right-10 flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            <FiCheckCircle />
            <span>{copySuccess}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
