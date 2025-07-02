// Enhanced Project interface for comprehensive showcases
export interface Project {
  id: number;
  title: string;
  tagline: string; // Compelling one-liner for recruiters
  description: string; // Short description for card
  thumbnail: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  caseStudyLink?: string;
  featured: boolean;
  category: string;

  // Enhanced storytelling fields
  problemStatement: string; // "What was the challenge?"
  solutionOverview: string; // "How did I solve it?"
  impact?: string; // "What was the result?"

  // Visual evidence
  media: {
    type: 'image' | 'video' | 'gif';
    src: string;
    caption: string;
  }[];

  // Key functionality highlights
  keyFeatures?: {
    title: string;
    description: string;
    icon?: string;
  }[];

  // Technical depth
  technicalDeepDive?: {
    title: string;
    content: string;
    codeSnippet?: {
      language: string;
      code: string;
    };
  }[];

  // Growth and reflection
  learnings?: string;
}