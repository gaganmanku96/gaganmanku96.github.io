import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit3, FiCalendar, FiClock, FiTag, FiArrowRight } from 'react-icons/fi';
import { IBlog, SAMPLE_BLOGS } from '@/types/blog';

import Link from 'next/link';

interface BlogSectionProps {
  blogs?: IBlog[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ 
  blogs = SAMPLE_BLOGS 
}) => {
  
  // Limit to first 3 blogs for homepage
  const featuredBlogs = blogs.slice(0, 3);
  const [selectedBlog, setSelectedBlog] = useState<IBlog>(featuredBlogs[0]);

  const handleBlogSelect = (blog: IBlog) => {
    setSelectedBlog(blog);
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI/ML': 'bg-muted-gold/20 text-antique-copper',
      'Technology': 'bg-stone-gray/20 text-charcoal-gray',
      'Tutorial': 'bg-antique-copper/20 text-muted-gold',
      'Industry Insights': 'bg-light-neutral/30 text-stone-gray',
      'Personal': 'bg-muted-gold/10 text-charcoal-gray',
      'Research': 'bg-antique-copper/10 text-stone-gray'
    };
    return colors[category] || 'bg-light-neutral/20 text-stone-gray';
  };

  return (
    <motion.section 
      id="blog" 
      className="bg-soft-cream text-charcoal-gray py-16 md:py-24"
    >
      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-12"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiEdit3 className="w-5 h-5 text-muted-gold" />
            <span className="text-sm font-semibold text-stone-gray uppercase tracking-wider">Blog</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-charcoal-gray mb-6">
            Latest <span className="text-muted-gold">Insights</span>
          </h2>
          
          <p className="text-xl text-stone-gray max-w-3xl mx-auto leading-relaxed">
            Explore my thoughts on AI, technology trends, and industry insights. 
            Deep dives into the latest developments in machine learning and software engineering.
          </p>
        </motion.div>

        {/* Split Layout: Blog List + Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Side - Blog List */}
          <motion.div 
            className="lg:col-span-2 space-y-4 flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-charcoal-gray mb-6">Recent Articles</h3>
            <div className="space-y-3 flex-1">
              {featuredBlogs.map((blog, index) => (
                <motion.button
                  key={blog.id}
                  onClick={() => handleBlogSelect(blog)}
                  className={`relative w-full text-left p-4 rounded-lg transition-all duration-500 border overflow-hidden group ${
                    selectedBlog.id === blog.id
                      ? 'bg-muted-gold text-white shadow-lg border-muted-gold'
                      : 'bg-warm-ivory text-charcoal-gray hover:bg-light-neutral/30 border-light-neutral/40'
                  }`}
                  initial={{ opacity: 0, y: 20, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    delay: index * 0.15 + 0.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 2,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-muted-gold/20 via-antique-copper/10 to-muted-gold/20 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ 
                      x: selectedBlog.id === blog.id ? 0 : "-100%",
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="w-1 h-1 bg-muted-gold rounded-full"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="w-1 h-1 bg-antique-copper rounded-full absolute top-2 -right-1"
                      animate={{
                        y: [0, -12, 0],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="font-semibold text-lg mb-2 line-clamp-2">{blog.title}</div>
                    <div className="flex items-center space-x-3 mb-2 text-sm opacity-80">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedBlog.id === blog.id
                          ? 'bg-white/20 text-white'
                          : getCategoryColor(blog.category)
                      }`}>
                        {blog.category}
                      </span>
                      <span className="flex items-center space-x-1">
                        <FiClock className="w-3 h-3" />
                        <span>{blog.readTime} min</span>
                      </span>
                    </div>
                    <div className="text-sm opacity-70 line-clamp-2">{blog.excerpt}</div>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* View All Blog Posts Button */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-charcoal-gray text-warm-ivory rounded-lg font-medium hover:bg-charcoal-gray/80 transition-colors duration-300 shadow-md"
              >
                <span>View All Articles</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Blog Details */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBlog.id}
                className="relative bg-warm-ivory rounded-2xl p-8 shadow-xl border border-light-neutral/20 overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.95, rotateX: 10 }}
                transition={{ 
                  duration: 0.5, 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 25,
                  staggerChildren: 0.1
                }}
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, ${selectedBlog.category === 'AI/ML' ? '#B4886B' : selectedBlog.category === 'Technology' ? '#8C5A3B' : '#D1D1D1'} 1px, transparent 0)`
                  }}
                  animate={{
                    backgroundSize: ["20px 20px", "25px 25px", "20px 20px"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Blog Featured Image Placeholder */}
                <motion.div 
                  className="relative w-full h-48 bg-gradient-to-br from-muted-gold/15 to-soft-cream/30 rounded-lg mb-6 flex items-center justify-center border border-light-neutral/20 group cursor-pointer overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {/* Animated floating elements */}
                  <motion.div
                    className="absolute top-4 left-4 w-2 h-2 bg-muted-gold rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute top-6 right-6 w-1.5 h-1.5 bg-antique-copper rounded-full"
                    animate={{
                      y: [0, -8, 0],
                      x: [0, -3, 0],
                      opacity: [0.4, 0.9, 0.4]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  
                  {/* Main blog icon with breathe animation */}
                  <motion.div 
                    className="text-6xl opacity-40 relative z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    📝
                  </motion.div>
                  
                  {/* Hover reveal effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-muted-gold/10 via-transparent to-antique-copper/10 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Blog Title */}
                <motion.h3 
                  className="text-3xl font-bold text-charcoal-gray mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {selectedBlog.title}
                </motion.h3>
                
                {/* Category, Date & Read Time */}
                <motion.div 
                  className="flex items-center space-x-4 mb-4 flex-wrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 500, damping: 25 }}
                >
                  <motion.span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedBlog.category)}`}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {selectedBlog.category}
                  </motion.span>
                  <motion.div 
                    className="flex items-center space-x-1 text-stone-gray text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiCalendar className="w-4 h-4" />
                    <span>{formatDate(selectedBlog.publishDate)}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-1 text-stone-gray text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiClock className="w-4 h-4" />
                    <span>{selectedBlog.readTime} min read</span>
                  </motion.div>
                </motion.div>

                {/* Excerpt */}
                <motion.p 
                  className="text-stone-gray leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {selectedBlog.excerpt}
                </motion.p>

                {/* Tags */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.h4 
                    className="font-semibold text-charcoal-gray mb-3 flex items-center space-x-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <FiTag className="w-4 h-4" />
                    <span>Tags</span>
                  </motion.h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 bg-soft-cream text-charcoal-gray rounded-full text-sm font-medium border border-light-neutral/30 cursor-default"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: 0.8 + index * 0.1, 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 25 
                        }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "#B4886B20",
                          transition: { type: "spring", stiffness: 400, damping: 10 }
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Read More Button */}
                <motion.div 
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 100, damping: 15 }}
                >
                  <motion.a
                    href={`/blog/${selectedBlog.slug}`}
                    className="relative flex items-center space-x-2 px-6 py-3 bg-muted-gold text-white rounded-lg font-medium shadow-md overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(180, 136, 107, 0.3)",
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-antique-copper via-muted-gold to-antique-copper opacity-0 group-hover:opacity-100"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                    <FiEdit3 className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Read Full Article</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default BlogSection;
