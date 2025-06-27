import Head from 'next/head';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
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
        <title>Gagandeep Singh | Data Scientist - GenAI & LLM Expert</title>
        <meta name="description" content="Gagandeep Singh - Data Scientist with 6+ years in GenAI & NLP. Built multi-agent chatbots, LLM Telemetry Frameworks, and Call Analytics Systems at Zykrr Technologies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Gagandeep Singh | Data Scientist - GenAI Expert" />
        <meta property="og:description" content="Data Scientist specializing in Generative AI, LLMs, and NLP. Led development of multi-agent GenAI chatbots with 40% engagement increase." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gaganmanku96.github.io/" />
        <meta property="og:image" content="https://gaganmanku96.github.io/images/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gagandeep Singh | Data Scientist - GenAI Expert" />
        <meta name="twitter:description" content="Data Scientist specializing in Generative AI, LLMs, and NLP. Led development of multi-agent GenAI chatbots with 40% engagement increase." />
        <meta name="twitter:image" content="https://gaganmanku96.github.io/images/og-image.jpg" />
      </Head>

      <Layout>
        <main className="flex flex-col min-h-screen">
          <HeroSection />
          <ProjectsSection />
        </main>
      </Layout>
    </>
  );
}
