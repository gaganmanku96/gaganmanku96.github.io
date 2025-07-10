
export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  image: string;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Why Whisper Hallucinates and How to Fix It",
      category: "Speech AI Research",
      description: "Coming Soon",
      challenge: "Coming Soon",
      solution: "Coming Soon",
      results: [
        "Coming Soon"
      ],
      technologies: ["Whisper", "PyTorch", "Audio Processing", "Transformer Analysis", "Python"],
      metrics: [
        { label: "Status", value: "Coming Soon", improvement: "" }
      ],
      image: "/images/projects/albert-sentiment-analysis.png",
      featured: true
    },
    {
      id: 2,
      title: "LoRA Best Practices: What Actually Works in Production",
      category: "Production Best Practices",
      description: "Coming Soon",
      challenge: "Coming Soon",
      solution: "Coming Soon",
      results: [
        "Coming Soon"
      ],
      technologies: ["LoRA", "PyTorch", "Transformers", "PEFT", "Hugging Face", "Production Deployment"],
      metrics: [
        { label: "Status", value: "Coming Soon", improvement: "" }
      ],
      image: "/images/projects/browserless-selenium-scraping.png",
      featured: true
    },
    {
      id: 3,
      title: "Can We Add Hindi Language Support in Parakeet S2T?",
      category: "Multilingual Speech AI",
      description: "Coming Soon",
      challenge: "Coming Soon",
      solution: "Coming Soon",
      results: [
        "Coming Soon"
      ],
      technologies: ["Parakeet", "Hindi NLP", "Speech-to-Text", "Multilingual Models", "NVIDIA NeMo", "Transformer Architecture"],
      metrics: [
        { label: "Status", value: "Coming Soon", improvement: "" }
      ],
      image: "/images/projects/chaos-framework.png",
      featured: true
    }
  ];
