import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

// Blog post data structure
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string; // Changed from thumbnail to image
  url: string;
  publishDate: string;
  readTime: string; // Changed from number to string
  tags: string[];
}

const BlogSection: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch blog posts (simulated)
  useEffect(() => {
    // In a real implementation, this would be an API call to Medium or your blog platform
    // For now, we'll use sample data
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Hardcoded blog posts data (based on data science and ML topics)
        const blogPosts = [
          {
            id: '1',
            title: "Finding Missing Persons Using AI: A Technical Deep Dive",
            excerpt: "Exploring the architecture and algorithms behind AI systems designed to help locate missing persons through facial recognition and machine learning.",
            publishDate: "2023-06-10",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8",
            url: "https://medium.com/@gaganmanku96/finding-missing-persons-using-ai",
            tags: ["Computer Vision", "AI", "Facial Recognition"]
          },
          {
            id: '2',
            title: "Sentiment Analysis with ALBERT: Improving Efficiency and Accuracy",
            excerpt: "How to implement sentiment analysis using ALBERT (A Lite BERT) model for more efficient and accurate text classification with fewer parameters.",
            publishDate: "2023-04-15",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
            url: "https://medium.com/@gaganmanku96/sentiment-analysis-with-albert",
            tags: ["NLP", "ALBERT", "Sentiment Analysis"]
          },
          {
            id: '3',
            title: "Optimizing Web Scraping with Browserless Selenium",
            excerpt: "A comprehensive guide to implementing efficient, scalable web scraping solutions using Selenium in a browserless environment with Docker.",
            publishDate: "2023-02-28",
            readTime: "12 min read",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
            url: "https://medium.com/@gaganmanku96/optimizing-web-scraping-with-browserless-selenium",
            tags: ["Web Scraping", "Selenium", "Docker"]
          },
          {
            id: '4',
            title: "Docker for Data Scientists: A Practical Guide",
            excerpt: "Learn how to leverage Docker to create reproducible, scalable environments for your data science and machine learning workflows.",
            publishDate: "2023-01-20",
            readTime: "9 min read",
            image: "https://images.unsplash.com/photo-1605745341112-85968b19335b",
            url: "https://medium.com/@gaganmanku96/docker-for-data-scientists",
            tags: ["Docker", "Data Science", "DevOps"]
          }
        ];
        
        setBlogPosts(blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container-custom">
        <motion.div
          ref={ref} // Use the ref for the main section animation trigger
          initial="hidden"
          animate={controls} // Animate with controls tied to inView
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 inline-block">My Thoughts</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">Latest Articles</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Dive into my latest insights and articles on Data Science, Machine Learning, AI, and software development. 
            Stay updated with my thoughts, projects, and discoveries.
          </p>
        </motion.div>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 dark:bg-gray-600 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-4 w-2/3" />
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-1/3" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Blog posts grid
          <motion.div
            // ref={ref} // The ref is already on the parent for section intro, this variants will be controlled by parent's 'controls'
            variants={containerVariants} // This handles staggerChildren
            initial="hidden"
            animate={controls} // This will trigger 'visible' on children when this container is 'visible'
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} variants={itemVariants} />
            ))}
          </motion.div>
        )}

        {/* "Load More" button or pagination could be added here */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://medium.com/@gaganmanku96"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4"
          >
            View All Articles on Medium
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Blog post card component
const BlogPostCard: React.FC<{ post: BlogPost; variants: any }> = ({ post, variants }) => {
  // Format date
  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const placeholderImage = `https://via.placeholder.com/600x400/e2e8f0/94a3b8?text=${encodeURIComponent(post.title.substring(0, 20))}`;

  return (
    <motion.div
      variants={variants}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border border-gray-200 dark:border-gray-700/80 flex flex-col"
    >
      {/* Blog post image with overlay gradient */}
      <div className="h-52 overflow-hidden relative w-full">
        <Image
          src={post.image || placeholderImage}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:opacity-75 transition-opacity duration-300"></div>
      </div>

      {/* Blog post content */}
      <div className="p-6 relative flex flex-col flex-grow">
        {/* Tags positioned at the top */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:opacity-80 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
          <a href={post.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm">
            {post.title}
          </a>
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-3 text-sm leading-relaxed flex-grow">
          {post.excerpt}
        </p>

        <div className="flex justify-between items-center text-sm border-t border-gray-200 dark:border-gray-700/60 pt-4 mt-auto">
          <span className="text-gray-500 dark:text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </span>
          <span className="text-gray-500 dark:text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogSection;
