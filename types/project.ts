export interface IProject {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  category: ProjectCategory;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  images?: string[];
  videoUrl?: string;
  completionDate: string;
  status: ProjectStatus;
}

export type ProjectCategory = 
  | 'Machine Learning'
  | 'Frontend'
  | 'Full Stack'
  | 'DevOps'
  | 'Data Engineering'
  | 'Mobile'
  | 'AI/ML';

export type ProjectStatus = 
  | 'Completed'
  | 'In Progress'
  | 'On Hold'
  | 'Archived';

export interface ProjectListProps {
  projects: IProject[];
  onSelectProject: (project: IProject) => void;
  selectedProjectId: string | null;
  className?: string;
}

export interface ProjectDetailProps {
  project: IProject;
  onClose: () => void;
  className?: string;
}

export interface ProjectLayoutProps {
  projects: IProject[];
  className?: string;
}

export interface ProjectFilterProps {
  categories: ProjectCategory[];
  selectedCategory: ProjectCategory | 'All';
  onCategoryChange: (category: ProjectCategory | 'All') => void;
  className?: string;
}

export interface ProjectCardProps {
  project: IProject;
  onSelect: (project: IProject) => void;
  isSelected: boolean;
  className?: string;
}

// Project data interface for static props
export interface ProjectPageProps {
  projects: IProject[];
  categories: ProjectCategory[];
}

// Example project data structure
export const SAMPLE_PROJECTS: IProject[] = [
  {
    id: 'finding-missing-person',
    title: 'Finding Missing Person using AI',
    slug: 'finding-missing-person-ai',
    thumbnail: '/images/projects/missing-person-ai.jpg',
    shortDescription: 'AI-powered facial recognition system to help locate missing persons using computer vision and deep learning.',
    fullDescription: `Advanced machine learning system that leverages computer vision and facial recognition to assist in finding missing persons. The system processes images from various sources and matches them against a database of missing person reports.

Key Features:
• Real-time facial recognition using deep neural networks
• Multi-source image processing (CCTV, social media, user submissions)
• High accuracy matching with confidence scoring
• Integration with law enforcement databases
• Privacy-focused design with secure data handling

The system achieved 94% accuracy in testing and has been designed with ethical AI principles, ensuring responsible use of biometric data while maximizing the potential to reunite families.`,
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI', 'PostgreSQL', 'Docker', 'React'],
    category: 'Machine Learning',
    featured: true,
    liveUrl: 'https://missing-person-ai.demo.com',
    githubUrl: 'https://github.com/gaganmanku96/missing-person-ai',
    completionDate: '2024-03',
    status: 'Completed',
    images: [
      '/images/projects/missing-person-1.jpg',
      '/images/projects/missing-person-2.jpg',
      '/images/projects/missing-person-3.jpg'
    ]
  },
  {
    id: 'albert-sentiment-analysis',
    title: 'ALBERT Sentiment Analysis',
    slug: 'albert-sentiment-analysis',
    thumbnail: '/images/projects/albert-sentiment.jpg',
    shortDescription: 'Advanced NLP model using ALBERT for real-time sentiment analysis with 96% accuracy on social media data.',
    fullDescription: `State-of-the-art sentiment analysis system built using ALBERT (A Lite BERT) transformer model. The system processes text data in real-time and provides detailed sentiment classification with high accuracy.

Technical Implementation:
• Fine-tuned ALBERT model on domain-specific datasets
• Real-time processing capability handling 1000+ requests/second
• Multi-class sentiment classification (positive, negative, neutral, mixed)
• Confidence scoring and uncertainty quantification
• RESTful API with comprehensive documentation
• Scalable microservices architecture

The model achieved 96% accuracy on benchmark datasets and has been optimized for production deployment with minimal latency.`,
    techStack: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'Redis', 'Docker', 'Kubernetes'],
    category: 'AI/ML',
    featured: true,
    liveUrl: 'https://albert-sentiment.demo.com',
    githubUrl: 'https://github.com/gaganmanku96/albert-sentiment-analysis',
    completionDate: '2024-02',
    status: 'Completed'
  },
  {
    id: 'chaos-framework',
    title: 'CHAOS Framework',
    slug: 'chaos-framework',
    thumbnail: '/images/projects/chaos-framework.jpg',
    shortDescription: 'Comprehensive chaos engineering framework for testing system resilience and fault tolerance.',
    fullDescription: `CHAOS (Comprehensive Havoc and Operational Stress) is a robust chaos engineering framework designed to test system resilience by introducing controlled failures and monitoring system behavior.

Framework Capabilities:
• Network latency and partition simulation
• Resource exhaustion testing (CPU, memory, disk)
• Service dependency failure simulation
• Database connection pool exhaustion
• Custom failure injection plugins
• Comprehensive monitoring and alerting
• Automated rollback mechanisms

The framework has been used to improve system reliability by 40% and reduce MTTR (Mean Time To Recovery) by 60% in production environments.`,
    techStack: ['Go', 'Kubernetes', 'Prometheus', 'Grafana', 'Docker', 'gRPC', 'Helm'],
    category: 'DevOps',
    liveUrl: 'https://chaos-framework.demo.com',
    githubUrl: 'https://github.com/gaganmanku96/chaos-framework',
    completionDate: '2024-01',
    status: 'Completed'
  },
  {
    id: 'talk-with-figma-claude',
    title: 'Talk with Figma Claude',
    slug: 'talk-with-figma-claude',
    thumbnail: '/images/projects/figma-claude.jpg',
    shortDescription: 'AI-powered Figma plugin that enables natural language interactions with design files using Claude AI.',
    fullDescription: `Revolutionary Figma plugin that bridges the gap between natural language and design tools. Users can interact with their Figma designs using conversational AI, making design workflows more intuitive and accessible.

Plugin Features:
• Natural language design queries and modifications
• Automated component generation from descriptions
• Design system compliance checking
• Asset organization and naming conventions
• Color palette suggestions based on brand guidelines
• Accessibility audit and recommendations
• Export automation with custom specifications

The plugin has over 5,000 active users and has reduced design iteration time by 35% for teams using it regularly.`,
    techStack: ['TypeScript', 'Figma API', 'Claude API', 'React', 'Node.js', 'Webpack'],
    category: 'Frontend',
    featured: true,
    liveUrl: 'https://figma.com/community/plugin/talk-with-claude',
    githubUrl: 'https://github.com/gaganmanku96/figma-claude-plugin',
    completionDate: '2023-12',
    status: 'Completed'
  },
  {
    id: 'browserless-selenium-scraping',
    title: 'Browserless Selenium Scraping',
    slug: 'browserless-selenium-scraping',
    thumbnail: '/images/projects/browserless-scraping.jpg',
    shortDescription: 'High-performance web scraping solution using browserless Chrome instances with Selenium automation.',
    fullDescription: `Scalable web scraping infrastructure built on browserless Chrome instances, designed for high-volume data extraction with enterprise-grade reliability and performance.

Architecture Highlights:
• Containerized browserless Chrome instances
• Distributed scraping with load balancing
• Anti-detection mechanisms and proxy rotation
• Intelligent rate limiting and retry logic
• Real-time monitoring and alerting
• Data validation and quality assurance
• Automated scaling based on workload

The system processes over 1 million pages daily with 99.9% uptime and has reduced scraping costs by 70% compared to traditional solutions.`,
    techStack: ['Python', 'Selenium', 'Docker', 'Redis', 'PostgreSQL', 'Celery', 'Kubernetes'],
    category: 'Data Engineering',
    liveUrl: 'https://browserless-scraping.demo.com',
    githubUrl: 'https://github.com/gaganmanku96/browserless-selenium-scraping',
    completionDate: '2023-11',
    status: 'Completed'
  },
  {
    id: 'docker-tutorial-data-scientists',
    title: 'Docker Tutorial for Data Scientists',
    slug: 'docker-tutorial-data-scientists',
    thumbnail: '/images/projects/docker-tutorial.jpg',
    shortDescription: 'Comprehensive Docker learning platform specifically designed for data science workflows and ML pipelines.',
    fullDescription: `Interactive learning platform that teaches Docker concepts through hands-on data science examples. The tutorial covers containerization of ML workflows, from development to production deployment.

Learning Modules:
• Docker fundamentals for data science environments
• Containerizing Jupyter notebooks and ML models
• Multi-stage builds for optimized ML containers
• Docker Compose for complex data pipelines
• Kubernetes deployment strategies for ML workloads
• Best practices for reproducible research
• CI/CD pipelines for ML model deployment

The tutorial has been completed by over 10,000 data scientists and engineers, with a 95% satisfaction rate and has been featured in several tech conferences.`,
    techStack: ['Docker', 'Python', 'Jupyter', 'Kubernetes', 'GitHub Actions', 'Next.js', 'Tailwind CSS'],
    category: 'DevOps',
    featured: true,
    liveUrl: 'https://docker-for-data-scientists.com',
    githubUrl: 'https://github.com/gaganmanku96/docker-tutorial-data-scientists',
    completionDate: '2023-10',
    status: 'Completed'
  }
];

// Helper functions for project filtering and sorting
export const getProjectsByCategory = (projects: IProject[], category: ProjectCategory | 'All'): IProject[] => {
  if (category === 'All') return projects;
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = (projects: IProject[]): IProject[] => {
  return projects.filter(project => project.featured);
};

export const getProjectCategories = (projects: IProject[]): ProjectCategory[] => {
  const categories = new Set<ProjectCategory>();
  projects.forEach(project => categories.add(project.category));
  return Array.from(categories).sort();
};

export const sortProjectsByDate = (projects: IProject[], order: 'asc' | 'desc' = 'desc'): IProject[] => {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.completionDate);
    const dateB = new Date(b.completionDate);
    return order === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });
};