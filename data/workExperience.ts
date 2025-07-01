// Work Experience Data for Interactive Career Neural Network
// Based on 6+ years journey at Zykrr Technologies

export interface WorkProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  impact: string[];
  metrics?: { label: string; value: string; color?: string }[];
  timeline?: string;
  type: 'technical' | 'leadership' | 'product' | 'research';
}

export interface CareerRole {
  id: string;
  title: string;
  company: string;
  duration: string;
  summary: string;
  responsibilities: string[];
  projects: WorkProject[];
  keySkills: string[];
  leadershipImpact?: string[];
  teamSize?: number;
  nodeColor: string;
  nodeSize: number; // Represents career progression
}

export const careerData: CareerRole[] = [
  {
    id: 'intern',
    title: 'Intern',
    company: 'Zykrr Technologies',
    duration: 'Jan 2018 - May 2018',
    summary: 'Started my AI journey with text analytics migration and initial model development under close mentorship.',
    responsibilities: [
      'Migrated legacy text analytics system from JavaScript to Python',
      'Enhanced system with industry mapping and keyword-level sentiment',
      'Implemented Redis blocking queue for data processing',
      'Deployed applications independently on AWS EC2'
    ],
    projects: [
      {
        id: 'text-analytics-migration',
        name: 'Text Analytics Migration & Enhancement',
        description: 'Migrated legacy JavaScript text analytics system to Python, introducing industry mapping for topics and keyword-level sentiment analysis.',
        technologies: ['Python', 'JavaScript', 'TF-IDF', 'AWS EC2', 'Redis'],
        impact: [
          'Laid groundwork for future ML development',
          'Introduced structured sentiment analysis approach',
          'Enabled scalable data processing with Redis queue'
        ],
        metrics: [
          { label: 'System Migration', value: '100%', color: '#4ECDC4' },
          { label: 'Performance Gain', value: '2x', color: '#FF6B6B' }
        ],
        timeline: '4 months',
        type: 'technical'
      },
      {
        id: 'initial-models',
        name: 'Initial ML Model Development',
        description: 'Implemented TF-IDF model with binary classification for sentiment analysis and experimented with RNNs and LSTMs.',
        technologies: ['Python', 'TF-IDF', 'RNN', 'LSTM', 'Scikit-learn'],
        impact: [
          'Established foundation for ML-driven analytics',
          'Identified limitations of binary classification',
          'Researched advanced architectures for improvement'
        ],
        metrics: [
          { label: 'Model Accuracy', value: '75%', color: '#45B7D1' }
        ],
        timeline: '2 months',
        type: 'research'
      }
    ],
    keySkills: ['Python', 'JavaScript', 'Basic ML', 'AWS EC2', 'Redis', 'TF-IDF'],
    nodeColor: '#4ECDC4',
    nodeSize: 1
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    company: 'Zykrr Technologies',
    duration: 'Jun 2019 - May 2021',
    summary: 'Pioneered BERT adoption and developed sophisticated NLP algorithms, establishing core ML capabilities.',
    responsibilities: [
      'Upgraded core text analytics engine to BERT architecture',
      'Developed custom NER models for entity extraction',
      'Created advanced keyword sentiment algorithms',
      'Initiated predictive analytics capabilities'
    ],
    projects: [
      {
        id: 'bert-upgrade',
        name: 'Core Model Upgrade to BERT',
        description: 'Pioneered BERT adoption for text analytics engine shortly after its release, significantly upgrading model performance.',
        technologies: ['BERT', 'Transformers', 'Python', 'PyTorch', 'Hugging Face'],
        impact: [
          'Dramatically improved text understanding capabilities',
          'Replaced hardcoded fuzzy-match mappings with ML-driven approach',
          'Set foundation for advanced NLP features'
        ],
        metrics: [
          { label: 'Model Performance', value: '+40%', color: '#4D96FF' },
          { label: 'Processing Speed', value: '3x faster', color: '#FF6F61' }
        ],
        timeline: '6 months',
        type: 'technical'
      },
      {
        id: 'custom-ner',
        name: 'Custom NER Model Development',
        description: 'Developed custom Named Entity Recognition model using BERT, fine-tuned on CoNLL-2003 dataset for customer feedback analysis.',
        technologies: ['BERT', 'NER', 'CoNLL-2003', 'Fine-tuning', 'Python'],
        impact: [
          'Enabled precise entity extraction from customer feedback',
          'Improved data structure and categorization',
          'Enhanced analytics granularity'
        ],
        metrics: [
          { label: 'Entity Accuracy', value: '89%', color: '#10b981' },
          { label: 'Entity Types', value: '12+', color: '#f59e0b' }
        ],
        timeline: '4 months',
        type: 'technical'
      },
      {
        id: 'keyword-sentiment',
        name: 'Advanced Keyword Sentiment Algorithm',
        description: 'Developed novel hybrid algorithm combining dependency parsing with sentence splitting for keyword-level sentiment accuracy.',
        technologies: ['NLP', 'Dependency Parsing', 'MongoDB', 'Python', 'Linguistic Analysis'],
        impact: [
          'Solved sentence-level sentiment limitation',
          'Achieved breakthrough in keyword sentiment accuracy',
          'Migrated and backfilled historical data'
        ],
        metrics: [
          { label: 'Keyword Accuracy', value: '80%+', color: '#8B5CF6' },
          { label: 'Data Migration', value: '100%', color: '#EC4899' }
        ],
        timeline: '5 months',
        type: 'technical'
      },
      {
        id: 'predictive-analytics-v1',
        name: 'Predictive Analytics (V1)',
        description: 'Initiated company\'s first predictive analytics using CSAT drivers to predict NPS scores for actionable client insights.',
        technologies: ['Python', 'Predictive Modeling', 'CSAT', 'NPS', 'Statistical Analysis'],
        impact: [
          'Launched company\'s predictive analytics capability',
          'Provided actionable insights for clients',
          'Established foundation for advanced analytics products'
        ],
        metrics: [
          { label: 'Prediction Accuracy', value: '72%', color: '#FF6B6B' },
          { label: 'Client Adoption', value: '5 clients', color: '#4ECDC4' }
        ],
        timeline: '3 months',
        type: 'product'
      }
    ],
    keySkills: ['BERT', 'Transformers', 'NER', 'NLP', 'Predictive Analytics', 'MongoDB', 'PyTorch'],
    nodeColor: '#4D96FF',
    nodeSize: 1.2
  },
  {
    id: 'senior-data-scientist',
    title: 'Senior Data Scientist',
    company: 'Zykrr Technologies',
    duration: 'May 2021 - May 2022',
    summary: 'Led technical excellence through model optimization, containerization, and advanced ML development.',
    responsibilities: [
      'Optimized ML models for cost and performance',
      'Led containerization and Kubernetes migration',
      'Developed advanced tone detection capabilities',
      'Built proof-of-concept chatbot solutions'
    ],
    projects: [
      {
        id: 'tone-detection',
        name: 'Multi-Class Tone Detection Model',
        description: 'Developed and trained sophisticated tone detection model (angry, sad, neutral, surprise, happy) using BERT with custom dataset.',
        technologies: ['BERT', 'Multi-class Classification', 'Web Scraping', 'Data Augmentation', 'Python'],
        impact: [
          'Enhanced emotional understanding of customer feedback',
          'Created industry-specific training dataset',
          'Achieved high accuracy through data curation'
        ],
        metrics: [
          { label: 'Tone Accuracy', value: '85%+', color: '#8B5CF6' },
          { label: 'Emotion Classes', value: '5', color: '#EC4899' },
          { label: 'Training Data', value: '50K+', color: '#F59E0B' }
        ],
        timeline: '4 months',
        type: 'technical'
      },
      {
        id: 'model-optimization',
        name: 'Model Optimization & MLOps',
        description: 'Migrated from BERT to DistilBERT with int4 quantization, achieving significant cost and latency improvements.',
        technologies: ['DistilBERT', 'Quantization', 'Docker', 'Kubernetes', 'MLOps'],
        impact: [
          'Reduced inference costs and latency significantly',
          'Improved model deployment scalability',
          'Contributed to open source community'
        ],
        metrics: [
          { label: 'Cost Reduction', value: '60%', color: '#10b981' },
          { label: 'Latency Improvement', value: '3x faster', color: '#FF6F61' },
          { label: 'Model Size', value: '50% smaller', color: '#4D96FF' }
        ],
        timeline: '3 months',
        type: 'technical'
      },
      {
        id: 'rasa-chatbot',
        name: 'RASA Chatbot Development',
        description: 'Built proof-of-concept chatbot using RASA with custom logic for input validation and sentiment integration.',
        technologies: ['RASA', 'Chatbot', 'NLP', 'Sentiment Analysis', 'Topic Extraction'],
        impact: [
          'Demonstrated conversational AI capabilities',
          'Integrated with existing analytics pipeline',
          'Secured potential client interest'
        ],
        metrics: [
          { label: 'Intent Accuracy', value: '90%+', color: '#4ECDC4' },
          { label: 'Validation Logic', value: '100%', color: '#FF6B6B' }
        ],
        timeline: '2 months',
        type: 'product'
      },
      {
        id: 'open-source-contribution',
        name: 'Open Source Contribution',
        description: 'Discovered and fixed critical bug in simpletransformers library for quantized NER model prediction.',
        technologies: ['Open Source', 'Python', 'NER', 'Quantization', 'GitHub'],
        impact: [
          'Improved library reliability for community',
          'Enhanced quantized model functionality',
          'Gained recognition in ML community'
        ],
        metrics: [
          { label: 'PR Status', value: 'Merged', color: '#10b981' },
          { label: 'Community Impact', value: '1000+ users', color: '#8B5CF6' }
        ],
        timeline: '1 month',
        type: 'technical'
      }
    ],
    keySkills: ['DistilBERT', 'Model Optimization', 'Docker', 'Kubernetes', 'RASA', 'MLOps', 'Open Source'],
    nodeColor: '#8B5CF6',
    nodeSize: 1.4
  },
  {
    id: 'manager',
    title: 'Manager - Data Scientist',
    company: 'Zykrr Technologies',
    duration: 'May 2022 - May 2023',
    summary: 'Transitioned to leadership while driving product development, team management, and advanced research initiatives.',
    responsibilities: [
      'Led end-to-end product development for KDA',
      'Managed and mentored data science team',
      'Developed actionable insights extraction features',
      'Researched and evaluated emerging technologies'
    ],
    projects: [
      {
        id: 'kda-product',
        name: 'Key Driver Analysis (KDA) Product',
        description: 'Owned complete development of KDA product including Key Driver Matrix and Planner tool for clients.',
        technologies: ['Statistical Analysis', 'Product Development', 'Key Driver Analysis', 'Client Tools'],
        impact: [
          'Delivered complete analytics product to market',
          'Enabled data-driven decision making for clients',
          'Established new revenue stream'
        ],
        metrics: [
          { label: 'Product Completion', value: '100%', color: '#4D96FF' },
          { label: 'Client Adoption', value: '8 clients', color: '#10b981' },
          { label: 'Revenue Impact', value: '+25%', color: '#FF6F61' }
        ],
        timeline: '6 months',
        type: 'product'
      },
      {
        id: 'text-analytics-actionables',
        name: 'Text Analytics Actionables',
        description: 'Led development of automated actionable insights extraction using Sentence Transformers and T5 model.',
        technologies: ['Sentence Transformers', 'T5', 'Abstractive Summarization', 'Vector DBs', 'Semantic Grouping'],
        impact: [
          'Automated insight extraction process',
          'Reduced manual analysis time significantly',
          'Enhanced client value proposition'
        ],
        metrics: [
          { label: 'Automation Level', value: '85%', color: '#8B5CF6' },
          { label: 'Time Savings', value: '10+ hrs/week', color: '#EC4899' },
          { label: 'Insight Quality', value: '90%+', color: '#F59E0B' }
        ],
        timeline: '4 months',
        type: 'technical'
      },
      {
        id: 'social-listening-tool',
        name: 'Client-Specific Social Listening Tool',
        description: 'Created custom Streamlit application for aviation client to monitor Twitter mentions with real-time response metrics.',
        technologies: ['Streamlit', 'Twitter API', 'Real-time Analytics', 'Social Media Monitoring'],
        impact: [
          'Enabled real-time social media monitoring',
          'Improved client response times',
          'Demonstrated custom solution capabilities'
        ],
        metrics: [
          { label: 'Response TAT', value: '50% faster', color: '#4ECDC4' },
          { label: 'Monitor Coverage', value: '24/7', color: '#FF6B6B' },
          { label: 'Client Satisfaction', value: '95%', color: '#10b981' }
        ],
        timeline: '2 months',
        type: 'product'
      },
      {
        id: 'vector-db-research',
        name: 'Vector Database Research',
        description: 'Researched and benchmarked various Vector DBs (Chroma, Milvus, Pinecone) for future architectural decisions.',
        technologies: ['Chroma', 'Milvus', 'Pinecone', 'Vector Search', 'Benchmarking'],
        impact: [
          'Informed strategic technology decisions',
          'Prepared for semantic search capabilities',
          'Established evaluation framework'
        ],
        metrics: [
          { label: 'DBs Evaluated', value: '3', color: '#8B5CF6' },
          { label: 'Performance Metrics', value: '10+', color: '#EC4899' }
        ],
        timeline: '1 month',
        type: 'research'
      }
    ],
    keySkills: ['Team Leadership', 'Product Management', 'T5', 'Sentence Transformers', 'Vector DBs', 'Streamlit'],
    leadershipImpact: [
      'Onboarded and mentored 1 new data scientist',
      'Led team in delivering multiple custom dashboards',
      'Managed project timelines and stakeholder expectations',
      'Established team best practices and code review processes'
    ],
    teamSize: 2,
    nodeColor: '#EC4899',
    nodeSize: 1.6
  },
  {
    id: 'senior-manager',
    title: 'Senior Manager, Data Scientist',
    company: 'Zykrr Technologies',
    duration: 'May 2023 - May 2024',
    summary: 'Focused on strategic collaboration, GenAI research, and complex client delivery while maintaining technical excellence.',
    responsibilities: [
      'Strategic collaboration with business teams',
      'Deep research into Generative AI and prompt engineering',
      'Complex client requirement fulfillment',
      'Custom dashboard development for diverse needs'
    ],
    projects: [
      {
        id: 'genai-research',
        name: 'Generative AI R&D',
        description: 'Conducted comprehensive GenAI research and prompt engineering, creating multiple proof-of-concept applications.',
        technologies: ['GenAI', 'Prompt Engineering', 'LLMs', 'POC Development'],
        impact: [
          'Established company GenAI capabilities',
          'Demonstrated technology value to business',
          'Prepared for AI transformation initiatives'
        ],
        metrics: [
          { label: 'POCs Created', value: '5+', color: '#FF6F61' },
          { label: 'Business Value', value: 'High', color: '#10b981' },
          { label: 'Technology Readiness', value: '90%', color: '#4D96FF' }
        ],
        timeline: '8 months',
        type: 'research'
      },
      {
        id: 'predictive-analytics-enhancement',
        name: 'Predictive Analytics Enhancement',
        description: 'Collaborated with business team to define and implement advanced predictive analytics features.',
        technologies: ['Predictive Modeling', 'Business Intelligence', 'Advanced Analytics'],
        impact: [
          'Enhanced existing predictive capabilities',
          'Improved client satisfaction and retention',
          'Increased product competitiveness'
        ],
        metrics: [
          { label: 'Feature Additions', value: '3+', color: '#8B5CF6' },
          { label: 'Client Retention', value: '+15%', color: '#EC4899' }
        ],
        timeline: '4 months',
        type: 'product'
      },
      {
        id: 'custom-dashboards',
        name: 'Custom Client Dashboards',
        description: 'Built multiple custom dashboards to meet specific client needs across various industries.',
        technologies: ['Dashboard Development', 'Data Visualization', 'Client Solutions'],
        impact: [
          'Satisfied diverse client requirements',
          'Demonstrated flexibility and expertise',
          'Generated additional revenue opportunities'
        ],
        metrics: [
          { label: 'Dashboards Built', value: '6+', color: '#4ECDC4' },
          { label: 'Client Industries', value: '4', color: '#FF6B6B' },
          { label: 'Delivery Success', value: '100%', color: '#10b981' }
        ],
        timeline: '6 months',
        type: 'product'
      }
    ],
    keySkills: ['GenAI', 'Prompt Engineering', 'Strategic Planning', 'Client Relations', 'Business Collaboration'],
    leadershipImpact: [
      'Collaborated closely with business stakeholders',
      'Defined technical requirements for new initiatives',
      'Mentored team on emerging AI technologies',
      'Established GenAI best practices and guidelines'
    ],
    nodeColor: '#FF6F61',
    nodeSize: 1.8
  },
  {
    id: 'avp',
    title: 'AVP - Data Scientist',
    company: 'Zykrr Technologies',
    duration: 'May 2024 - Present',
    summary: 'Leading strategic AI transformation, managing larger teams, and delivering enterprise-scale GenAI solutions.',
    responsibilities: [
      'Strategic GenAI migration leadership',
      'Multi-agent system architecture and development',
      'Team management and organizational AI initiatives',
      'Cost optimization and operational efficiency'
    ],
    projects: [
      {
        id: 'genai-migration',
        name: 'GenAI Text Analytics Migration',
        description: 'Led strategic migration from DistilBERT to GenAI-based system using Gemini Flash 1.5 with comprehensive data architecture.',
        technologies: ['Gemini Flash 1.5', 'MongoDB', 'Vector DBs', 'LLM Architecture', 'System Migration'],
        impact: [
          'Modernized entire text analytics pipeline',
          'Improved analysis quality and speed',
          'Prepared for future fine-tuning capabilities'
        ],
        metrics: [
          { label: 'Migration Success', value: '100%', color: '#10b981' },
          { label: 'Performance Gain', value: '2.5x', color: '#FF6F61' },
          { label: 'Cost Efficiency', value: '+40%', color: '#4D96FF' }
        ],
        timeline: '4 months',
        type: 'technical'
      },
      {
        id: 'multi-agent-chatbot',
        name: 'Multi-Agent Analytics Chatbot',
        description: 'Architected and built sophisticated multi-agent chatbot with 4 agents using Active ReAct Prompting and RLHF.',
        technologies: ['Multi-Agent Systems', 'Active ReAct', 'Qdrant', 'RLHF', 'LLM Orchestration'],
        impact: [
          'Revolutionized client analytics interaction',
          'Established advanced conversational AI capability',
          'Created scalable agent framework'
        ],
        metrics: [
          { label: 'Agent Accuracy', value: '92%+', color: '#8B5CF6' },
          { label: 'User Engagement', value: '+60%', color: '#EC4899' },
          { label: 'Response Quality', value: '95%', color: '#F59E0B' }
        ],
        timeline: '6 months',
        type: 'technical'
      },
      {
        id: 'call-analytics-cla',
        name: 'Call Analytics (CLA) Product',
        description: 'Led development of comprehensive call analytics backend with audio processing and self-hosted Whisper Large-v2.',
        technologies: ['Whisper Large-v2', 'Audio Processing', 'Speaker Diarization', 'GPU Infrastructure'],
        impact: [
          'Solved client manual audit inefficiency',
          'Delivered enterprise-scale audio analytics',
          'Achieved significant time savings for clients'
        ],
        metrics: [
          { label: 'Time Reduction', value: '3hrs → 30min', color: '#4ECDC4' },
          { label: 'Processing Accuracy', value: '94%+', color: '#10b981' },
          { label: 'Client ROI', value: '500%+', color: '#FF6B6B' }
        ],
        timeline: '5 months',
        type: 'product'
      },
      {
        id: 'llm-cost-tracking',
        name: 'LLM Cost Management Framework',
        description: 'Built comprehensive framework and Streamlit dashboard for granular LLM cost tracking by client, user, and agent.',
        technologies: ['Cost Analytics', 'Streamlit', 'LLM Monitoring', 'Resource Optimization'],
        impact: [
          'Enabled precise cost attribution and control',
          'Improved profitability insights',
          'Facilitated informed pricing decisions'
        ],
        metrics: [
          { label: 'Cost Visibility', value: '100%', color: '#4D96FF' },
          { label: 'Cost Optimization', value: '25%', color: '#10b981' },
          { label: 'Granularity Level', value: 'Per request', color: '#8B5CF6' }
        ],
        timeline: '2 months',
        type: 'technical'
      },
      {
        id: 'model-fine-tuning',
        name: 'Llama 3.1 Model Fine-tuning',
        description: 'Leveraged stored prompt data to fine-tune Llama 3.1 model using QLoRA for specialized text analytics and summarization.',
        technologies: ['Llama 3.1', 'QLoRA', 'Fine-tuning', 'Model Specialization', 'Adapter Training'],
        impact: [
          'Created specialized models for company use cases',
          'Reduced dependency on external APIs',
          'Improved model performance for specific tasks'
        ],
        metrics: [
          { label: 'Model Adapters', value: '2', color: '#EC4899' },
          { label: 'Task Performance', value: '+30%', color: '#FF6F61' },
          { label: 'API Cost Reduction', value: '70%', color: '#10b981' }
        ],
        timeline: '3 months',
        type: 'technical'
      },
      {
        id: 'operations-automation',
        name: 'N8N Operations Automation',
        description: 'Deployed self-hosted N8N instance to create internal automation workflows for survey and data generation.',
        technologies: ['N8N', 'Workflow Automation', 'Process Optimization', 'Self-hosting'],
        impact: [
          'Dramatically reduced manual operational tasks',
          'Improved team productivity and efficiency',
          'Standardized repetitive processes'
        ],
        metrics: [
          { label: 'Survey Generation', value: '2hrs → 15min', color: '#4ECDC4' },
          { label: 'Data Generation', value: '1hr → 5min', color: '#FF6B6B' },
          { label: 'Automation Coverage', value: '80%+', color: '#F59E0B' }
        ],
        timeline: '1 month',
        type: 'technical'
      }
    ],
    keySkills: ['GenAI Architecture', 'Multi-Agent Systems', 'LLM Fine-tuning', 'Team Leadership', 'Product Management', 'Cost Optimization'],
    leadershipImpact: [
      'Managed team of 2 data scientists',
      'Acted as de-facto Product Manager for CLA and Analytics Chatbot',
      'Coordinated cross-functional teams and stakeholders',
      'Established CI/CD pipelines and deployment processes',
      'Led strategic AI transformation initiatives'
    ],
    teamSize: 2,
    nodeColor: '#FFA500',
    nodeSize: 2
  }
];

// Helper function to get role by ID
export const getRoleById = (id: string): CareerRole | undefined => {
  return careerData.find(role => role.id === id);
};

// Helper function to get all projects
export const getAllProjects = (): WorkProject[] => {
  return careerData.flatMap(role => role.projects);
};

// Helper function to get unique technologies across all roles
export const getAllTechnologies = (): string[] => {
  const allTech = careerData.flatMap(role => role.keySkills);
  return Array.from(new Set(allTech)).sort();
};

// Constants for the neural network visualization
export const NEURAL_NETWORK_CONFIG = {
  roles: careerData.map(role => ({
    id: role.id,
    title: role.title,
    color: role.nodeColor,
    size: role.nodeSize,
    duration: role.duration
  })),
  connections: [
    { from: 'intern', to: 'data-scientist' },
    { from: 'data-scientist', to: 'senior-data-scientist' },
    { from: 'senior-data-scientist', to: 'manager' },
    { from: 'manager', to: 'senior-manager' },
    { from: 'senior-manager', to: 'avp' }
  ]
};