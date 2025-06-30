import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import { IProject, SAMPLE_PROJECTS } from '@/types/project';

interface HomeProps {
  projects: IProject[];
}

export default function Home({ projects }: HomeProps) {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>Gagandeep Singh | GenAI Expert - Portfolio</title>
        <meta name="description" content="Gagandeep Singh - GenAI Expert & Data Scientist. Explore my collection of AI/ML projects, from neural networks to production systems." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Gagandeep Singh | GenAI Expert Portfolio" />
        <meta property="og:description" content="Explore innovative AI/ML projects by Gagandeep Singh. From computer vision to NLP, discover cutting-edge solutions and implementations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gaganmanku96.github.io/" />
        <meta property="og:image" content="https://gaganmanku96.github.io/images/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gagandeep Singh | GenAI Expert Portfolio" />
        <meta name="twitter:description" content="Explore innovative AI/ML projects by Gagandeep Singh. From computer vision to NLP, discover cutting-edge solutions." />
        <meta name="twitter:image" content="https://gaganmanku96.github.io/images/og-image.jpg" />
      </Head>

      <Layout>
        {/* Hero Section - Minimalist profile with Three.js background */}
        <HeroSection />
        
        {/* Projects Section - Card-based layout */}
        <ProjectsSection projects={projects} />
        
        {/* Blog Section - Latest insights and articles */}
        <BlogSection />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // In a real application, you would fetch this from a CMS or API
  // For now, we'll use the sample projects from our types file
  const projects = SAMPLE_PROJECTS;

  return {
    props: {
      projects,
    },
    // Regenerate the page at most once per hour (ISR)
    revalidate: 3600,
  };
};
