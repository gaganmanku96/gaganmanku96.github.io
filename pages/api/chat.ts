import { OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '@/lib/rate-limiter';
import { validateMessages } from '@/lib/input-validation';
import fs from 'fs';
import path from 'path';

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

  console.log('[Chat API] Received messages:', JSON.stringify(messages, null, 2));

  // Validate input
  const validation = validateMessages(messages);
  if (!validation.isValid) {
    console.error('[Chat API] Validation failed:', validation.error);
    console.log('[Chat API] Failed messages:', JSON.stringify(messages, null, 2));
    return res.status(400).json({ error: validation.error });
  }

  try {
    // Create OpenAI instance with OpenRouter configuration
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    console.log('[Chat API] Processing request with', messages.length, 'messages');

    // Load personal information from JSON file
    let personalInfo;
    try {
      const personalInfoPath = path.join(process.cwd(), 'data', 'personal-info.json');
      const personalInfoData = fs.readFileSync(personalInfoPath, 'utf8');
      personalInfo = JSON.parse(personalInfoData);
    } catch (error) {
      console.error('Error loading personal info:', error);
      // Fallback to basic info if file loading fails
      personalInfo = {
        basic_info: { name: "Gagandeep Singh", title: "Senior Data Scientist" },
        professional_summary: { specialization: "Generative AI and Machine Learning" }
      };
    }

    // Generate system prompt from personal information
    const generateSystemPrompt = (info: any) => {
      const basicInfo = info.basic_info || {};
      const professional = info.professional_summary || {};
      const technical = info.technical_expertise || {};
      const projects = info.featured_projects || [];
      const strengths = info.strengths || [];
      const personality = info.personality_traits || [];

      let prompt = `You are an AI assistant for ${basicInfo.name || 'Gagandeep Singh'}'s portfolio website. You have extensive knowledge about his background, projects, and expertise.

About ${basicInfo.name || 'Gagandeep Singh'}:
- ${basicInfo.title || 'Senior Data Scientist'} at ${basicInfo.company || 'Zykrr Technologies'} with ${basicInfo.experience_years || 6}+ years of experience
- Specializes in ${professional.specialization || 'Generative AI, Natural Language Processing, and Machine Learning'}`;

      if (professional.key_achievements) {
        prompt += '\n\nKey Achievements:';
        professional.key_achievements.forEach((achievement: string) => {
          prompt += `\n- ${achievement}`;
        });
      }

      if (technical.ai_ml_frameworks) {
        prompt += '\n\nTechnical Expertise:';
        Object.entries(technical.ai_ml_frameworks).forEach(([tech, level]) => {
          prompt += `\n- ${tech} (${level}% proficiency)`;
        });
      }

      if (projects.length > 0) {
        prompt += '\n\nFeatured Projects:';
        projects.forEach((project: any, index: number) => {
          prompt += `\n${index + 1}. ${project.name} - ${project.description}`;
        });
      }

      if (strengths.length > 0) {
        prompt += '\n\nKey Strengths:';
        strengths.slice(0, 5).forEach((strength: string) => {
          prompt += `\n- ${strength}`;
        });
      }

      if (personality.length > 0) {
        prompt += '\n\nPersonality & Communication Style:';
        personality.slice(0, 3).forEach((trait: string) => {
          prompt += `\n- ${trait}`;
        });
      }

      prompt += `\n\nBe helpful, knowledgeable, and personable. Answer questions about his work, provide insights about his projects, and help visitors understand his expertise. Keep responses concise but informative.

IMPORTANT: At the end of every response, include exactly 3 relevant follow-up questions to help continue the conversation. Format them like this:

---SUGGESTIONS---
1. [First suggested question]
2. [Second suggested question] 
3. [Third suggested question]

Make sure the suggestions are:
- Specific to the context of the conversation and Gagan's work
- Maximum 45 characters each for mobile optimization
- Concise but engaging (e.g., "Tell me about CHAOS framework" not "Can you provide more detailed information about the CHAOS framework that Gagan developed?")`;

      return prompt;
    };

    // System prompt with dynamic personal context
    const systemMessage = {
      role: 'system' as const,
      content: generateSystemPrompt(personalInfo)
    };

    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1:free',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    });

    console.log('[Chat API] Created completion, starting stream');

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream the response
    let totalContent = '';
    try {
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          totalContent += content;
          res.write(content);
        }
      }
      console.log('[Chat API] Stream completed, total length:', totalContent.length);
    } catch (streamError) {
      console.error('[Chat API] Stream error:', streamError);
      if (!res.headersSent) {
        res.write('Sorry, I encountered an error while processing your request.');
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