import Head from 'next/head';
import Layout from '@/components/Layout';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';

export default function CaseStudies() {
  return (
    <>
      <Head>
        <title>Case Studies | Gagandeep Singh - Senior Data Scientist</title>
        <meta name="description" content="Deep dive into Gagandeep Singh's technical case studies featuring LLMs, Whisper speech-to-text, NLP implementations, and Transformer architectures." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className="pt-20">
          <CaseStudiesSection />
        </main>
      </Layout>
    </>
  );
}