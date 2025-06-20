import Head from 'next/head';
import Layout from '@/components/Layout';
import AboutSection from '@/components/sections/AboutSection';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Gagandeep Singh - AVP Data Scientist</title>
        <meta name="description" content="Learn about Gagandeep Singh's journey in Data Science, Generative AI, and NLP. 6+ years of experience specializing in GenAI and LLM implementations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className="pt-20">
          <AboutSection />
        </main>
      </Layout>
    </>
  );
}