import Head from 'next/head';
import Layout from '@/components/Layout';
import ProjectsSection from '@/components/sections/ProjectsSection';

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | Gagandeep Singh - AVP Data Scientist</title>
        <meta name="description" content="Discover Gagandeep Singh's innovative AI/ML projects including multi-agent GenAI chatbots, Call Analytics Systems, and LLM Telemetry Frameworks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className="pt-20">
          <ProjectsSection />
        </main>
      </Layout>
    </>
  );
}