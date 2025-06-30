export interface IBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishDate: string;
  category: BlogCategory;
  tags: string[];
  readTime: number;
  featured?: boolean;
  author: string;
  thumbnail?: string;
}

export type BlogCategory = 
  | 'AI/ML'
  | 'Technology'
  | 'Tutorial'
  | 'Industry Insights'
  | 'Personal'
  | 'Research';

export interface BlogListProps {
  blogs: IBlog[];
  onSelectBlog: (blog: IBlog) => void;
  selectedBlogId: string | null;
  className?: string;
}

export interface BlogDetailProps {
  blog: IBlog;
  className?: string;
}

export interface BlogLayoutProps {
  blogs: IBlog[];
  className?: string;
}

// Sample blog data
export const SAMPLE_BLOGS: IBlog[] = [
  {
    id: 'ai-revolution-2025',
    title: 'The AI Revolution: What 2025 Holds for Machine Learning',
    slug: 'ai-revolution-2025',
    excerpt: 'Exploring the latest trends and breakthroughs in artificial intelligence that are shaping the future of technology and business.',
    content: `The year 2025 marks a pivotal moment in the evolution of artificial intelligence...`,
    publishDate: '2025-01-15',
    category: 'AI/ML',
    tags: ['AI', 'Machine Learning', 'Future Tech', 'Innovation'],
    readTime: 8,
    featured: true,
    author: 'Gagandeep Singh',
    thumbnail: '/images/blogs/ai-revolution.jpg'
  },
  {
    id: 'llm-production-guide',
    title: 'Building Production-Ready LLM Applications: A Complete Guide',
    slug: 'llm-production-guide',
    excerpt: 'Learn how to design, deploy, and scale Large Language Model applications for enterprise environments with best practices and real-world examples.',
    content: `Deploying LLM applications in production requires careful consideration of multiple factors...`,
    publishDate: '2024-12-10',
    category: 'Tutorial',
    tags: ['LLM', 'Production', 'DevOps', 'Scaling'],
    readTime: 12,
    featured: true,
    author: 'Gagandeep Singh',
    thumbnail: '/images/blogs/llm-production.jpg'
  },
  {
    id: 'future-of-genai',
    title: 'The Future of Generative AI in Enterprise Solutions',
    slug: 'future-of-genai',
    excerpt: 'Analyzing how generative AI is transforming business operations and creating new opportunities across industries.',
    content: `Generative AI has moved beyond experimental phases to become a cornerstone technology...`,
    publishDate: '2024-11-28',
    category: 'Industry Insights',
    tags: ['GenAI', 'Enterprise', 'Business Strategy', 'Innovation'],
    readTime: 10,
    featured: false,
    author: 'Gagandeep Singh',
    thumbnail: '/images/blogs/genai-enterprise.jpg'
  }
];

// Helper functions
export const getBlogsByCategory = (blogs: IBlog[], category: BlogCategory | 'All'): IBlog[] => {
  if (category === 'All') return blogs;
  return blogs.filter(blog => blog.category === category);
};

export const getFeaturedBlogs = (blogs: IBlog[]): IBlog[] => {
  return blogs.filter(blog => blog.featured);
};

export const getBlogCategories = (blogs: IBlog[]): BlogCategory[] => {
  const categories = new Set<BlogCategory>();
  blogs.forEach(blog => categories.add(blog.category));
  return Array.from(categories).sort();
};

export const sortBlogsByDate = (blogs: IBlog[], order: 'asc' | 'desc' = 'desc'): IBlog[] => {
  return [...blogs].sort((a, b) => {
    const dateA = new Date(a.publishDate);
    const dateB = new Date(b.publishDate);
    return order === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });
};