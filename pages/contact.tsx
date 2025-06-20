import Head from 'next/head';
import Layout from '@/components/Layout';
import ContactSection from '@/components/sections/ContactSection';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Gagandeep Singh - AVP Data Scientist</title>
        <meta name="description" content="Get in touch with Gagandeep Singh for AI/ML consulting, collaboration opportunities, or to discuss innovative GenAI solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className="pt-20">
          <ContactSection />
        </main>
      </Layout>
    </>
  );
}