import Head from 'next/head';
import Layout from '@/components/Layout';
import ExperienceSection from '@/components/sections/ExperienceSection';

export default function Experience() {
  return (
    <>
      <Head>
        <title>Experience | Gagandeep Singh - Senior Data Scientist</title>
        <meta name="description" content="Explore Gagandeep Singh's professional journey at Zykrr Technologies, from Data Scientist to Senior Data Scientist, building GenAI solutions and LLM frameworks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main>
          <ExperienceSection />
        </main>
      </Layout>
    </>
  );
}