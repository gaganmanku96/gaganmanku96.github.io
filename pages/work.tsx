import Head from 'next/head';
import Layout from '@/components/Layout';
import WorkExperienceSection from '@/components/sections/WorkExperienceSection';

export default function Work() {
  return (
    <>
      <Head>
        <title>Work Experience | Gagandeep Singh - AI Engineering Journey</title>
        <meta name="description" content="Explore Gagandeep Singh's comprehensive 6+ year journey at Zykrr Technologies - from Intern to AVP, showcasing AI/ML projects, leadership growth, and technical achievements." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Work Experience | Gagandeep Singh - AI Engineering Journey" />
        <meta property="og:description" content="Interactive career progression from Intern to AVP - 6+ years of AI/ML innovation at Zykrr Technologies" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work Experience | Gagandeep Singh - AI Engineering Journey" />
        <meta name="twitter:description" content="Interactive career progression from Intern to AVP - 6+ years of AI/ML innovation" />
      </Head>

      <Layout>
        <main>
          <WorkExperienceSection />
        </main>
      </Layout>
    </>
  );
}