export type PortfolioTheme = 'noir' | 'barcelona' | 'paper' | 'comic' | 'playground' | 'system';
export type Locale = 'en' | 'hi';

export interface Project {
  id: string;
  title: string;
  category: 'client' | 'product' | 'game' | 'web' | 'design';
  status: 'Shipped' | 'In Progress' | 'Live' | 'Case Study';
  statusType: 'delivered' | 'progress' | 'live';
  subtitle: string;
  description: string;
  problemStatement: string;
  solutionSummary: string;
  processSteps?: string[];
  resultSummary?: string;
  technologies: string[];
  highlights: string[];
  clientOrContext: string;
  year: string;
  role: string;
  hasInteractiveDemo: boolean;
  demoType?: 'pdf-app' | 'food-safety' | 'game-logic' | 'ux-redesign' | 'brand-system';
}

export interface SkillCategory {
  name: string;
  number: string;
  description: string;
  skills: {
    name: string;
    level: string;
    experience: string;
    details: string;
    icon: string;
  }[];
}

export interface Milestone {
  year: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  takeaway: string;
  isCurrent: boolean;
}
