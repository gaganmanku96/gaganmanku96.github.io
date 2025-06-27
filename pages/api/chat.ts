import { OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '@/lib/rate-limiter';
import { validateMessages } from '@/lib/input-validation';

// Allow streaming responses up to 30 seconds
export const config = {
  api: {
    responseLimit: false,
  },
}

async function chatHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  // Validate input
  const validation = validateMessages(messages);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    // Create OpenAI instance with OpenRouter configuration
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    // System prompt with portfolio context
    const systemMessage = {
      role: 'system' as const,
      content: `You are an AI assistant for Gagandeep Singh's portfolio website. You have extensive knowledge about his background, projects, and expertise.

About Gagandeep Singh:
- AVP Data Scientist at Zykrr Technologies with 6+ years of experience
- Specializes in Generative AI, Natural Language Processing, and Machine Learning
- Promoted multiple times at Zykrr, reflecting consistent performance
- Expert in multi-agent GenAI systems, LLM frameworks, and speech analytics platforms
- Achieved 40% increase in user engagement through interactive AI systems
- Processes 10,000+ calls monthly for actionable insights
- Improved model accuracy by 70%

Technical Expertise:
- Python & PyTorch (95% proficiency)
- Hugging Face & Transformers (90% proficiency) 
- Generative AI & LLMs (95% proficiency)
- Natural Language Processing (90% proficiency)
- FastAPI & Docker/Kubernetes (85% proficiency)
- Azure Cloud & Vector DBs (80% proficiency)

Featured Projects:
1. Finding Missing Person using AI - AI-powered solution using facial recognition and ML
2. ALBERT Sentiment Analysis - Google's state-of-the-art NLP model implementation
3. Talk with Figma Claude - Revolutionary integration enabling designers to interact with Claude AI
4. CHAOS Framework - Synthetic training data generator teaching AI systems 'how to think'
5. Browserless Selenium Scraping - High-performance web scraping solution
6. Gibberish Detection - Experimental ML project for detecting gibberish text
7. Docker Tutorial for Data Scientists - Educational resource for reproducible ML workflows

Be helpful, knowledgeable, and personable. Answer questions about his work, provide insights about his projects, and help visitors understand his expertise. Keep responses concise but informative.`
    };

    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1:free',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    });

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream the response
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(content);
      }
    }

    res.end();
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'An error occurred while processing your request' 
    });
  }
}

export default withRateLimit(chatHandler);