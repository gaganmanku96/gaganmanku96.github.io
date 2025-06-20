import Head from 'next/head';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import BlogSection from '@/components/sections/BlogSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>Gagandeep Singh | AVP Data Scientist - GenAI & LLM Expert</title>
        <meta name="description" content="Gagandeep Singh - AVP Data Scientist with 6+ years in GenAI & NLP. Built multi-agent chatbots, LLM Telemetry Frameworks, and Call Analytics Systems at Zykrr Technologies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Gagandeep Singh | AVP Data Scientist - GenAI Expert" />
        <meta property="og:description" content="AVP Data Scientist specializing in Generative AI, LLMs, and NLP. Led development of multi-agent GenAI chatbots with 40% engagement increase." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gaganmanku96.github.io/" />
        <meta property="og:image" content="https://gaganmanku96.github.io/images/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gagandeep Singh | AVP Data Scientist - GenAI Expert" />
        <meta name="twitter:description" content="AVP Data Scientist specializing in Generative AI, LLMs, and NLP. Led development of multi-agent GenAI chatbots with 40% engagement increase." />
        <meta name="twitter:image" content="https://gaganmanku96.github.io/images/og-image.jpg" />
      </Head>

      <Layout>
        <main className="flex flex-col min-h-screen">
          <HeroSection />
          {/* Quick preview sections for home page */}
          <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
            <div className="container-custom text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Explore My Work
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <a href="/about" className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-blue-600 dark:text-blue-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">About Me</h3>
                  <p className="text-gray-600 dark:text-gray-400">Learn about my journey in AI/ML</p>
                </a>
                
                <a href="/experience" className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-purple-600 dark:text-purple-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Experience</h3>
                  <p className="text-gray-600 dark:text-gray-400">6+ years at Zykrr Technologies</p>
                </a>
                
                <a href="/projects" className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-green-600 dark:text-green-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Projects</h3>
                  <p className="text-gray-600 dark:text-gray-400">GenAI & ML innovations</p>
                </a>
                
                <a href="/case-studies" className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-orange-600 dark:text-orange-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Case Studies</h3>
                  <p className="text-gray-600 dark:text-gray-400">LLMs, Whisper & NLP deep dives</p>
                </a>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
