export interface Project {
  id: string;
  title: string;
  category: 'client' | 'product' | 'game' | 'web';
  status: 'Delivered' | 'In Progress' | 'Live';
  statusType: 'delivered' | 'progress' | 'live';
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  clientOrContext: string;
  year: string;
  role: string;
  hasInteractiveDemo: boolean;
  demoType?: 'pdf-app' | 'food-safety' | 'game-logic';
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

export interface AuditionPoint {
  topic: string;
  question: string;
  keyAnswer: string;
  technicalDetails: string[];
}
