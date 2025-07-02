
export interface CaseStudy {
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

export const caseStudies: CaseStudy[] = [
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
      image: "/images/projects/albert-sentiment-analysis.png",
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
      image: "/images/projects/browserless-selenium-scraping.png",
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
      image: "/images/projects/chaos-framework.png",
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
      image: "/images/projects/docker-tutorial.png",
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
      image: "/images/projects/finding-missing-person.png",
      featured: false
    }
  ];
