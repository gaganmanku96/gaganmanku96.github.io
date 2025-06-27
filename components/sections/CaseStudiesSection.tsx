import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  image: string;
  featured: boolean;
}

const CaseStudiesSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Multi-Agent GenAI Analytics Chatbot",
      category: "Generative AI",
      description: "Revolutionary multi-agent system that transforms how users interact with analytics data through natural language conversations.",
      challenge: "Users struggled with complex data interfaces and needed hours to extract insights from analytics dashboards. Traditional query systems required technical expertise.",
      solution: "Developed a sophisticated multi-agent GenAI system with specialized agents for different analytics domains. Implemented RLHF (Reinforcement Learning from Human Feedback) to continuously improve responses based on user interactions.",
      results: [
        "40% increase in user engagement through interactive feedback loops",
        "Reduced average time-to-insight from hours to minutes",
        "Enabled non-technical users to perform complex analytics queries",
        "Implemented real-time learning from user feedback"
      ],
      technologies: ["Python", "LangChain", "OpenAI GPT", "Hugging Face", "RLHF", "FastAPI", "Vector DBs"],
      metrics: [
        { label: "User Engagement", value: "40%", improvement: "increase" },
        { label: "Query Resolution", value: "85%", improvement: "accuracy" },
        { label: "Response Time", value: "2.3s", improvement: "average" }
      ],
      image: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=GenAI+Chatbot",
      featured: true
    },
    {
      id: 2,
      title: "Call Analytics System with Speech Processing",
      category: "Speech Analytics",
      description: "Advanced call analytics platform processing thousands of calls monthly using Whisper and custom NLP models for comprehensive insights.",
      challenge: "Manual analysis of customer calls was time-intensive and inconsistent. Need for real-time sentiment analysis, agent performance tracking, and quality assessment across 10,000+ monthly calls.",
      solution: "Built end-to-end speech analytics pipeline using Whisper for transcription, custom transformer models for sentiment analysis, and automated performance scoring algorithms.",
      results: [
        "Processing 10,000+ calls monthly with automated insights",
        "Real-time agent performance tracking and feedback",
        "Comprehensive sentiment analysis with 92% accuracy",
        "Automated quality scoring reducing manual review by 80%"
      ],
      technologies: ["Whisper", "PyTorch", "Transformers", "Azure Speech", "NLP", "Redis", "FastAPI"],
      metrics: [
        { label: "Calls Processed", value: "10K+", improvement: "monthly" },
        { label: "Sentiment Accuracy", value: "92%", improvement: "precision" },
        { label: "Manual Review Reduction", value: "80%", improvement: "efficiency" }
      ],
      image: "https://via.placeholder.com/600x400/059669/FFFFFF?text=Speech+Analytics",
      featured: true
    },
    {
      id: 3,
      title: "Custom LLM Telemetry Framework",
      category: "LLM Operations",
      description: "Comprehensive monitoring and observability framework for LLM applications, tracking costs, performance, and reliability across multiple projects.",
      challenge: "Managing costs and monitoring performance across 10+ GenAI projects became complex. Need for centralized tracking of LLM usage, error rates, and cost optimization.",
      solution: "Engineered custom telemetry framework with real-time monitoring, cost tracking, error analysis, and performance optimization recommendations for LLM applications.",
      results: [
        "Cost tracking across 10+ GenAI projects with detailed breakdown",
        "Real-time monitoring of LLM performance and reliability",
        "Automated alerts for cost thresholds and error spikes",
        "20% reduction in overall LLM operational costs"
      ],
      technologies: ["Python", "FastAPI", "Prometheus", "Grafana", "Docker", "Azure Monitor", "LLM APIs"],
      metrics: [
        { label: "Projects Monitored", value: "10+", improvement: "active" },
        { label: "Cost Reduction", value: "20%", improvement: "savings" },
        { label: "Uptime Monitoring", value: "99.9%", improvement: "reliability" }
      ],
      image: "https://via.placeholder.com/600x400/DC2626/FFFFFF?text=LLM+Telemetry",
      featured: false
    },
    {
      id: 4,
      title: "Transformer-Based Emotion Detection",
      category: "NLP",
      description: "Advanced emotion detection system using transformer architecture to extract customer emotions from text with high accuracy.",
      challenge: "Traditional sentiment analysis was too basic for understanding complex customer emotions. Needed granular emotion detection for better customer experience insights.",
      solution: "Developed custom transformer-based model fine-tuned for emotion detection, supporting multiple emotion categories with confidence scoring and contextual understanding.",
      results: [
        "Multi-class emotion detection with 88% accuracy",
        "Real-time processing of customer feedback streams",
        "Integration with existing text analytics pipeline",
        "Improved customer experience insights and actions"
      ],
      technologies: ["Transformers", "BERT", "PyTorch", "Hugging Face", "Python", "scikit-learn"],
      metrics: [
        { label: "Emotion Accuracy", value: "88%", improvement: "precision" },
        { label: "Processing Speed", value: "1.2s", improvement: "per text" },
        { label: "Emotion Categories", value: "8", improvement: "supported" }
      ],
      image: "https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=Emotion+AI",
      featured: false
    },
    {
      id: 5,
      title: "Keyword Sentiment Algorithm with 70% Accuracy Improvement",
      category: "NLP",
      description: "Revolutionary keyword sentiment analysis using linguistic features that dramatically improved accuracy over traditional approaches.",
      challenge: "Existing sentiment analysis tools had poor accuracy for domain-specific keywords and context. Need for more nuanced understanding of sentiment in specialized terminology.",
      solution: "Developed novel algorithm combining linguistic features, contextual embeddings, and domain-specific training data to achieve significant accuracy improvements in keyword sentiment analysis.",
      results: [
        "70% improvement in sentiment accuracy over baseline",
        "Enhanced processing of 10,000+ weekly feedbacks",
        "Better understanding of domain-specific sentiment patterns",
        "Improved customer satisfaction insights"
      ],
      technologies: ["Python", "NLTK", "spaCy", "Word2Vec", "Linguistic Features", "Machine Learning"],
      metrics: [
        { label: "Accuracy Improvement", value: "70%", improvement: "boost" },
        { label: "Weekly Processing", value: "10K+", improvement: "feedbacks" },
        { label: "Domain Coverage", value: "95%", improvement: "terminology" }
      ],
      image: "https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Sentiment+AI",
      featured: false
    }
  ];

  const categories = ['All', 'Generative AI', 'Speech Analytics', 'LLM Operations', 'NLP'];

  const filteredCaseStudies = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="case-studies" className="space-section bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-900 dark:to-primary-900/20">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block">Deep Dives</span>
          <h2 className="heading-secondary mb-6 text-gradient">Technical Case Studies</h2>
          <p className="text-body-large text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Explore detailed technical implementations of cutting-edge AI solutions, from LLM frameworks to speech analytics systems, 
            showcasing real-world impact and innovative approaches.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-12"
        >
          {filteredCaseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Individual Case Study Card Component
const CaseStudyCard: React.FC<{ study: CaseStudy; index: number }> = ({ study, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {study.category}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <h3 className="heading-tertiary text-slate-900 dark:text-white mb-3">
            {study.title}
          </h3>
          <p className="text-body-large text-slate-600 dark:text-slate-400 leading-relaxed">
            {study.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {study.metrics.map((metric, idx) => (
            <div key={idx} className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{metric.value}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{metric.label}</div>
              <div className="text-xs text-secondary-600 dark:text-secondary-400">{metric.improvement}</div>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div>
          <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {study.technologies.map((tech) => (
              <span
                key={tech}
                className="tech-chip"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable Details */}
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="accordion-trigger"
          >
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {isExpanded ? 'Hide' : 'View'} Technical Details
            </span>
            <svg
              className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="accordion-content space-y-4">
              <div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Challenge</h5>
                <p className="text-slate-600 dark:text-slate-400">{study.challenge}</p>
              </div>
              <div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Solution</h5>
                <p className="text-slate-600 dark:text-slate-400">{study.solution}</p>
              </div>
              <div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Results</h5>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                  {study.results.map((result, idx) => (
                    <li key={idx}>{result}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudiesSection;