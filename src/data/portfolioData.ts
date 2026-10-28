import { Project, SkillCategory, Milestone, AuditionPoint } from '../types';

export const PERSONAL_INFO = {
  name: 'Harsh Bawankar',
  fullName: 'Harsh Ketan Bawankar',
  title: 'B.Tech CSE Student & Aspiring Web Developer',
  headline: 'B.Tech CSE Student | Exploring AI & Technology | Building, Learning, and Turning Ideas into Reality | Aspiring Entrepreneur',
  institution: 'Ramdeobaba University (RBU)',
  degree: 'B.Tech, Computer Science & Engineering (1st Year)',
  period: '2026 – Present',
  location: 'Nagpur, Maharashtra, India',
  zipCode: '440003',
  email: '26bawankarhk@rbunagpur.in',
  phone: '+91 93250 51476',
  github: 'https://github.com/keshoraobawankar-cloud',
  githubHandle: 'keshoraobawankar-cloud',
  instagram: 'https://www.instagram.com/_unwrittenway/',
  instagramHandle: '@_unwrittenway',
  resumeUrl: '/assets/aistudio/Harsh_Bawankar_Resume_8f1a6895.pdf',
  portfolioZipUrl: '/assets/aistudio/Harsh_Bawankar_Web_Development_Portfolio_ac85a303.zip',
  recruitmentTaskPdfUrl: '/assets/aistudio/web-development-task_copy_0c71c1cd.pdf',
  summary: `First-year Computer Science student who builds as he learns. Hands-on with HTML, CSS, C, and Python, with several app and game projects started and one client app delivered. Believes consistency beats natural talent, and is looking to learn from and build alongside other makers in a collaborative tech community.`,
  coreTenet: 'Consistency beats natural talent.',
  subPhilosophy: 'Turn concepts into working experiments. Small, disciplined steps compound into lasting engineering ability.',
};

export const PROJECTS: Project[] = [
  {
    id: 'client-pdf-app',
    title: 'Client Business & PDF App',
    category: 'client',
    status: 'Delivered',
    statusType: 'delivered',
    subtitle: 'Custom business workflow & document processing utility',
    description: 'Customized an app for a client to support automated PDF handling and day-to-day business operations, tailored to real user requirements.',
    longDescription: `Delivered a custom desktop/web tool engineered to streamline repetitive document handling tasks for a real-world client. The client required dependable, offline-friendly PDF operations including batch collation, receipt generation, invoice previewing, and document formatting. Built with a focus on ease of use, robust file handling, and reliable day-to-day operations.`,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PDF Generation', 'File API', 'Client Workflow'],
    highlights: [
      'Delivered on real client specifications with rapid turnaround',
      'Engineered structured document preview and export pipelines',
      'Replaced manual multi-step paperwork with automated digital actions',
      '100% client satisfaction on delivery and everyday utility'
    ],
    clientOrContext: 'Independent Commercial Client',
    year: '2026',
    role: 'Solo Developer & Solution Designer',
    hasInteractiveDemo: true,
    demoType: 'pdf-app',
  },
  {
    id: 'food-safety-app',
    title: 'Food Safety & Quality Inspection App',
    category: 'product',
    status: 'In Progress',
    statusType: 'progress',
    subtitle: 'Digital hygiene compliance & inspection scoring workflow',
    description: 'Designing and building an app centered on food safety, practicing app structure, intuitive UI flows, and systematic feature planning.',
    longDescription: `An ongoing engineering initiative to digitize food safety and compliance auditing. Designed for campus canteens, small cafes, and food vendors to conduct structured hygiene checks, log storage temperatures, flag allergen cross-contamination risks, and maintain inspection transparency with clear safety scorecards.`,
    technologies: ['UI Architecture', 'HTML/CSS/JS', 'State Modeling', 'Inspection Rubrics', 'Responsive Flow'],
    highlights: [
      'Comprehensive inspection checklist modeled after hygiene standards',
      'Dynamic real-time grading and compliance indicator',
      'Allergen tracking matrix and temperature violation alerts',
      'Clean mobile-friendly layout for quick on-the-spot audits'
    ],
    clientOrContext: 'Independent Product Initiative',
    year: '2026',
    role: 'Product Architect & Frontend Developer',
    hasInteractiveDemo: true,
    demoType: 'food-safety',
  },
  {
    id: 'game-projects-sandbox',
    title: 'Logic Game Projects & Arcade',
    category: 'game',
    status: 'In Progress',
    statusType: 'progress',
    subtitle: 'Algorithmic state machines & interactive mini-games',
    description: 'Started two games to learn core programming logic, event loops, user interaction, and iterative design through hands-on play.',
    longDescription: `A hands-on exploration of core computer science fundamentals through game development. These projects focus on turn-based state machines, win-condition matrix checks, deterministic AI opponent algorithms, and real-time DOM updates. Meets the Technical Club Domain 02 Mini-Games and Gamified Portfolio specifications.`,
    technologies: ['Game Logic', 'DOM Manipulation', 'Event Loops', 'State Machines', 'Algorithmic Checks'],
    highlights: [
      'Playable right in the browser with score tracking and instant restart',
      'Clean state transitions without third-party game frameworks',
      'Built-in AI opponent mode with minimax heuristic logic',
      'Immediate visual and sound feedback upon moves and win events'
    ],
    clientOrContext: 'Technical Club Recruitment & Learning Lab',
    year: '2026',
    role: 'Game Programmer',
    hasInteractiveDemo: true,
    demoType: 'game-logic',
  },
  {
    id: 'web-dev-recruitment-portfolio',
    title: 'Technical Club Portfolio Showcase',
    category: 'web',
    status: 'Live',
    statusType: 'live',
    subtitle: 'Engineered for Technical Club Recruitment 2026 (Domain 02)',
    description: 'A comprehensive, accessible personal platform demonstrating creativity, clean HTML/CSS architecture, and working interactive features.',
    longDescription: `Designed specifically to fulfill and exceed the requirements of Domain 02 (Web Development) for the 2026 Technical Club recruitment. Demonstrates modern semantic layout, zero-pill typography, real interactive tools, sound synthesis, and an Audition Presentation Mode for live laptop demonstration.`,
    technologies: ['HTML5 & Modern CSS', 'TypeScript', 'Clean UI', 'Web Audio API', 'Accessibility WCAG AA'],
    highlights: [
      'Zero-pill typographic hierarchy adhering to production guidelines',
      'Integrated live demos for each project',
      'Audition Presentation guide for club evaluators',
      'Light/Dark mode with seamless persistent state'
    ],
    clientOrContext: 'Technical Club Recruitment 2026 Submission',
    year: '2026',
    role: 'Lead Developer',
    hasInteractiveDemo: false,
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Web Development',
    number: '01',
    description: 'Semantic structure, responsive layouts, and interactive frontend design',
    skills: [
      {
        name: 'HTML5',
        level: 'Practicing & Expanding',
        experience: 'Semantic markup, accessible forms, audio integration, document structure',
        details: 'Crafting clean semantic layouts that prioritize readability, SEO, and accessibility without relying on bloated boilerplate.',
        icon: 'code'
      },
      {
        name: 'CSS3 & Modern Styling',
        level: 'Practicing & Expanding',
        experience: 'Flexbox, CSS Grid, custom properties, responsive media queries, transitions',
        details: 'Deeply comfortable with modern layout techniques, spacing math, subtle transitions, and dark/light theme systems.',
        icon: 'layout'
      },
      {
        name: 'JavaScript & DOM Manipulation',
        level: 'Foundational',
        experience: 'Event listeners, IntersectionObserver, Web Storage, state management',
        details: 'Building dynamic user interactions, responsive navigation menus, interactive calculators, and browser game loops.',
        icon: 'zap'
      }
    ]
  },
  {
    name: 'Programming & Foundations',
    number: '02',
    description: 'Core logic, algorithmic thinking, and structural software development',
    skills: [
      {
        name: 'C Programming',
        level: 'Foundational / Practicing',
        experience: 'Control flow, pointers, memory allocation, arrays, structs, modular logic',
        details: 'Practicing low-level logic, understanding how hardware and memory operate under the hood to write performant code.',
        icon: 'terminal'
      },
      {
        name: 'Python',
        level: 'Learning & Exploring',
        experience: 'Scripting, data structures, automation basics, algorithmic problem-solving',
        details: 'Developing confidence with Python syntax, quick scripting, string manipulation, and automation pipelines.',
        icon: 'file-code'
      }
    ]
  },
  {
    name: 'Tools & Workflow',
    number: '03',
    description: 'Modern developer toolchain, collaboration, and rapid prototyping',
    skills: [
      {
        name: 'Git & GitHub',
        level: 'Active Daily Use',
        experience: 'Version control, repositories, commits, branch management, deployment',
        details: 'Maintains personal repositories, organizes project commits, and follows clean versioning conventions.',
        icon: 'git-branch'
      },
      {
        name: 'AI Engineering & Debugging Tools',
        level: 'Active Workflow',
        experience: 'Assisted code generation, bug triage, architectural research, test cases',
        details: 'Leverages AI tools thoughtfully to accelerate debugging, explore new libraries, and iterate on product concepts while understanding every line of code.',
        icon: 'sparkles'
      },
      {
        name: '3D Modelling & Graphics (Exploring)',
        level: 'Curiosity & Exploration',
        experience: 'Spatial geometry, visual design, blender basics, asset styling',
        details: 'Eager interest in bridging code and digital visual craft, experimenting with visual design and spatial representations.',
        icon: 'box'
      }
    ]
  },
  {
    name: 'Engineering Tenets',
    number: '04',
    description: 'Mindset and communication principles guiding every build',
    skills: [
      {
        name: 'Consistency Over Talent',
        level: 'Core Creed',
        experience: 'Daily commits, relentless iteration, finishing what is started',
        details: 'Believes true engineering excellence comes from disciplined, repeated practice rather than fleeting bursts of motivation.',
        icon: 'check-circle'
      },
      {
        name: 'Build to Understand',
        level: 'Learning Method',
        experience: 'Learning by implementing real features rather than passive video watching',
        details: 'Transforms classroom theory immediately into functioning browser apps and executable code.',
        icon: 'cpu'
      },
      {
        name: 'Collaborative Communication',
        level: 'Soft Skill',
        experience: 'Teamwork, active listening, taking feedback, sharing progress openly',
        details: 'Excited to contribute to campus technical clubs, peer hackathons, and community-driven projects.',
        icon: 'users'
      }
    ]
  }
];

export const MILESTONES: Milestone[] = [
  {
    year: '2026 – Present',
    period: 'Current Academic Chapter',
    title: 'B.Tech in Computer Science & Engineering',
    organization: 'Ramdeobaba University (RBU)',
    location: 'Nagpur, Maharashtra',
    description: 'Commenced undergraduate engineering studies. Building strong foundations in data structures, algorithms, discrete math, and computer programming while actively participating in technical community auditions.',
    takeaway: 'Focusing on deep conceptual understanding paired with daily code commits.',
    isCurrent: true,
  },
  {
    year: '2026',
    period: 'Commercial Milestone',
    title: 'First Client Solution Shipped',
    organization: 'Client Business & PDF App',
    location: 'Nagpur / Remote',
    description: 'Gathered requirements from an actual commercial client, designed an easy-to-use application for PDF handling and document workflows, and delivered a production-ready tool.',
    takeaway: 'Learned the importance of user empathy, constraint management, and edge-case testing.',
    isCurrent: false,
  },
  {
    year: '2026',
    period: 'Recruitment & Community',
    title: 'Technical Club Recruitment Showcase',
    organization: 'Technical Club Recruitment 2026',
    location: 'RBU Campus',
    description: 'Developed an interactive portfolio website adhering to Domain 02 Web Development guidelines, featuring live interactive game mechanics and clean design.',
    takeaway: 'Demonstrating clean engineering, live code demonstration readiness, and creative problem solving.',
    isCurrent: false,
  }
];

export const AUDITION_PREPARATION: AuditionPoint[] = [
  {
    topic: 'Task Choice & Objective',
    question: 'Which task did you choose and why?',
    keyAnswer: 'I unified Task 1 (Personal Portfolio) and Task 2 & 3 (Mini Games & Gamified Portfolio) to demonstrate both clean web design and functional JavaScript game state management.',
    technicalDetails: [
      'Built with semantic HTML5, modern CSS3 layout techniques (Grid/Flexbox), and modular JavaScript/TypeScript.',
      'Includes live playable games (Tic-Tac-Toe with Minimax heuristic & Binary Logic Guessing) right on the page.',
      'Clean typography and layout inspired by production engineering standards.'
    ]
  },
  {
    topic: 'Real-World Client Experience',
    question: 'Tell us about the client app you delivered.',
    keyAnswer: 'I built the Client Business & PDF App to solve real document handling bottlenecks for a commercial client, automating receipt generation, collation, and daily business file operations.',
    technicalDetails: [
      'Focused on intuitive client workflows so non-technical users can process documents without confusion.',
      'Handled file I/O safely and provided immediate preview states before document generation.',
      'Showcased my ability to take ambiguous requirements and ship working software.'
    ]
  },
  {
    topic: 'Code Quality & Tech Stack Rationale',
    question: 'How do you structure your code and debug issues?',
    keyAnswer: 'I prioritize clean semantic structure, single-responsibility functions, and accessible DOM hierarchies over unnecessary complexity or bloated dependencies.',
    technicalDetails: [
      'Separation of concerns: clean data models, pure helper functions, and decoupled state management.',
      'Leverage browser DevTools console, network tabs, and structured console logs for rapid triage.',
      'Use AI tools responsibly for research and edge cases while understanding every line of code myself.'
    ]
  },
  {
    topic: 'Growth & Future Roadmap',
    question: 'What are your goals in the Technical Club?',
    keyAnswer: 'I want to collaborate with seniors and peers on campus products, contribute to hackathons, expand from frontend fundamentals to full-stack systems, and explore 3D graphics.',
    technicalDetails: [
      'Strong daily work ethic: "Consistency beats natural talent."',
      'Ready to take on club responsibilities, maintain club web assets, and mentor incoming juniors next year.'
    ]
  }
];
