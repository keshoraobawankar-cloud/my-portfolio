import { Project, SkillCategory, Milestone } from '../types';

export const PERSONAL_INFO = {
  name: 'Harsh Bawankar',
  fullName: 'Harsh Bawankar',
  title: 'B.Tech CSE Student & Product Builder',
  roles: ['B.Tech CSE Student', 'App & Tool Builder', 'Aspiring Entrepreneur'],
  headline: '1st Year CSE at Ramdeobaba University · Building Real Products as I Learn',
  institution: 'Ramdeobaba University (RBU)',
  degree: 'B.Tech, Computer Science & Engineering (1st Year)',
  period: '2026 – Present',
  location: 'Nagpur, Maharashtra, India',
  shortLocation: 'Nagpur, India',
  zipCode: '440003',
  email: 'keshoraobawankar@gmail.com',
  secondaryEmail: '26bawankarhk@rbunagpur.in',
  phone: '+91 93250 51476',
  github: 'https://github.com/keshoraobawankar-cloud',
  githubHandle: 'keshoraobawankar-cloud',
  instagram: 'https://www.instagram.com/_unwrittenway/',
  instagramHandle: '@_unwrittenway',
  resumeUrl: '/assets/aistudio/Harsh_Bawankar_Resume_8f1a6895.pdf',
  heroBio: `Hi, Harsh Bawankar here — a first-year Computer Science student at Ramdeobaba University turning ideas into working tools. I build as I learn using C, Python, and AI-assisted development workflows, with one custom client PDF app shipped, a food safety platform in progress, and browser logic games built to sharpen problem solving.`,
  summary: `First-year Computer Science student who builds as he learns. Practicing C and Python alongside AI-assisted app prototyping, with several app and game projects started and one client business app delivered. Believes consistency beats natural talent, and loves collaborating with fellow makers to turn ideas into real software.`,
  coreTenet: 'Consistency beats natural talent.',
  subPhilosophy: 'Turn concepts into working experiments. Small, disciplined steps compound into lasting engineering ability.',
};

export const PROJECTS: Project[] = [
  {
    id: 'client-pdf-app',
    title: 'Client Business & PDF App',
    category: 'client',
    status: 'Shipped',
    statusType: 'delivered',
    subtitle: 'Custom commercial workflow & automated PDF processing utility',
    description:
      'Customized and delivered an application for a commercial client to streamline daily PDF handling, document stamping, and repetitive business paperwork.',
    problemStatement:
      'A local commercial client spent hours manually collating receipts, stamping confidential invoices, and formatting repetitive business PDFs across disconnected tools, causing delays and formatting mistakes in daily operations.',
    solutionSummary:
      'Scoped requirements directly with the client and delivered a streamlined, easy-to-use document utility featuring instant watermark previews, structured invoice/voucher templates, and one-click batch preparation tailored to non-technical staff.',
    technologies: ['Client Discovery', 'PDF Processing', 'Workflow Automation', 'AI-Assisted Prototyping', 'File Handling'],
    highlights: [
      'Delivered on real commercial specifications with rapid turnaround',
      'Built live document stamp previewing before export to prevent errors',
      'Replaced manual multi-step paperwork with fast digital batch actions',
      'Adopted for reliable day-to-day business operations'
    ],
    clientOrContext: 'Commercial Client · Delivered',
    year: '2026',
    role: 'Solo Builder & Solution Designer',
    hasInteractiveDemo: true,
    demoType: 'pdf-app',
  },
  {
    id: 'food-safety-app',
    title: 'Food Safety & Quality Inspection App',
    category: 'product',
    status: 'In Progress',
    statusType: 'progress',
    subtitle: 'Digital hygiene compliance checklist & live grading workflow',
    description:
      'Designing and building an application centered on food safety inspections, practicing clean app architecture, intuitive user flows, and structured feature planning.',
    problemStatement:
      'Small food vendors, cafes, and campus kitchens often track daily cold-storage temperatures, allergen warnings, and sanitation checks on paper clipboards that are hard to audit consistently.',
    solutionSummary:
      'Architecting a mobile-friendly digital inspection workflow with weighted hygiene criteria, real-time compliance scoring (0–100), automatic grade calculation, and clear action alerts.',
    technologies: ['Product Architecture', 'UI Flow Design', 'Weighted Scoring Logic', 'Responsive Prototyping'],
    highlights: [
      'Weighted hygiene rubric with instant compliance score calculation',
      'Real-time Grade A / B / C status feedback as checks are logged',
      'Covers cold storage, surface separation, and allergen labeling',
      'Designed for fast thumb-friendly inspections on mobile screens'
    ],
    clientOrContext: 'Independent Product Build',
    year: '2026',
    role: 'Product Creator & Builder',
    hasInteractiveDemo: true,
    demoType: 'food-safety',
  },
  {
    id: 'game-projects-sandbox',
    title: 'Logic Game Projects & Arcade',
    category: 'game',
    status: 'In Progress',
    statusType: 'progress',
    subtitle: 'Turn-based state logic, deduction loops & playable mini-games',
    description:
      'Started two interactive browser games to practice core programming logic, turn cycles, win-condition checks, and iterative design through hands-on play.',
    problemStatement:
      'Learning control flow and algorithms purely through textbook console exercises lacks immediate visual feedback and real user interaction edge cases.',
    solutionSummary:
      'Built two playable browser games—Tactical Tic-Tac-Toe (with both heuristic AI bot and 2-player local pass-and-play) and Binary Number Deduction—complete with score tracking, instant resets, and Web Audio sound synthesis.',
    technologies: ['Algorithmic Logic', 'State Machines', 'Heuristic Bot Logic', 'Web Audio Synthesis'],
    highlights: [
      'Playable live with win-line highlighting and persistent scoreboard',
      'Supports both tactical bot opponent and 2-player pass-and-play',
      'Binary-search number deduction challenge with directional hints',
      'Zero external audio assets—synthesizes crisp chimes via Web Audio API'
    ],
    clientOrContext: 'Personal Logic & Game Lab',
    year: '2026',
    role: 'Game Logic Builder',
    hasInteractiveDemo: true,
    demoType: 'game-logic',
  },
  {
    id: 'interactive-personal-portfolio',
    title: 'Interactive Developer Portfolio',
    category: 'web',
    status: 'Live',
    statusType: 'live',
    subtitle: 'Personal web platform with terminal shell, live demos & multi-theme engine',
    description:
      'A fast, responsive personal platform combining an interactive command-line card, live playable project prototypes, and instant dark/light atmosphere switching.',
    problemStatement:
      'Static text resumes fail to show how a builder thinks, experiments, and ships interactive software—especially early in a computer science degree.',
    solutionSummary:
      'Engineered an interactive portfolio featuring a working command-line terminal card, embedded live simulations for shipped and active projects, and seamless theme switching.',
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Motion Animations', 'Web Audio API'],
    highlights: [
      'Interactive terminal card with typing animation and shell commands',
      'Embedded live prototypes inside every major project detail view',
      'Rich #0b0f19 developer dark theme with instant light/mesh switching',
      'Full mobile responsiveness with smooth slide-in navigation'
    ],
    clientOrContext: 'Personal Web Platform',
    year: '2026',
    role: 'Creator & Builder',
    hasInteractiveDemo: false,
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming Foundations',
    number: '01',
    description: 'Core logic, structured problem solving, and foundational CS languages',
    skills: [
      {
        name: 'C Programming',
        level: 'Practicing',
        experience: 'Control flow, loops, arrays, functions, pointers, structured logic',
        details: 'Building strong fundamentals in how programs execute step-by-step, writing deterministic logic and practicing algorithmic problem solving.',
        icon: 'terminal'
      },
      {
        name: 'Python',
        level: 'Learning',
        experience: 'Scripting basics, data handling, problem-solving exercises',
        details: 'Expanding confidence in Python syntax, clean scripting, and translating logical ideas into readable code.',
        icon: 'file-code'
      },
      {
        name: 'Algorithmic Logic',
        level: 'Practicing',
        experience: 'Binary deduction, turn-based game rules, condition matrices',
        details: 'Applying classroom logic directly to interactive mini-games and practical decision flows.',
        icon: 'cpu'
      }
    ]
  },
  {
    name: 'AI-Assisted Building',
    number: '02',
    description: 'Turning product ideas into working applications using modern AI workflows',
    skills: [
      {
        name: 'AI Coding & Prototyping',
        level: 'Daily Workflow',
        experience: 'Iterative prompting, feature scaffolding, UI iteration, rapid MVPs',
        details: 'Uses AI engineering tools intentionally to bridge the gap between product ideas and working software while learning how each component fits together.',
        icon: 'sparkles'
      },
      {
        name: 'Debugging & Research',
        level: 'Active Use',
        experience: 'Tracing bugs, testing edge cases, researching technical approaches',
        details: 'Breaks down errors systematically, verifies fixes through hands-on testing, and iterates until workflows feel dependable.',
        icon: 'zap'
      },
      {
        name: 'Web App Exploration',
        level: 'Exploring',
        experience: 'Understanding page structure, interactive states, user-facing flows',
        details: 'Learning how modern web interfaces work by building and customizing real projects rather than memorizing syntax passively.',
        icon: 'layout'
      }
    ]
  },
  {
    name: 'Tools & Creative Craft',
    number: '03',
    description: 'Version control, product structuring, and visual curiosity',
    skills: [
      {
        name: 'Git & GitHub',
        level: 'Active Use',
        experience: 'Repositories, version history, project publishing, code backup',
        details: 'Maintains organized GitHub repositories to track progress, share builds, and collaborate cleanly.',
        icon: 'git-branch'
      },
      {
        name: 'Product & UI Flow Planning',
        level: 'Practicing',
        experience: 'Requirement gathering, user empathy, screen-by-screen flow design',
        details: 'Translates real client or user problems—like invoice PDF stamping or food safety checklists—into simple, intuitive steps.',
        icon: 'code'
      },
      {
        name: '3D Modelling & Graphics',
        level: 'Exploring',
        experience: 'Spatial design curiosity, visual composition, digital craft',
        details: 'Exploring 3D modelling and graphics alongside software to combine visual creativity with engineering.',
        icon: 'box'
      }
    ]
  },
  {
    name: 'Builder Mindset',
    number: '04',
    description: 'Principles and habits that drive daily growth',
    skills: [
      {
        name: 'Consistency Over Talent',
        level: 'Core Creed',
        experience: 'Steady daily practice, shipping early, improving every week',
        details: 'Believes lasting capability comes from showing up consistently and finishing real projects step by step.',
        icon: 'check-circle'
      },
      {
        name: 'Build to Learn',
        level: 'Method',
        experience: 'Learning through real client & personal builds instead of passive theory',
        details: 'Starts real apps and games early in 1st year so every obstacle teaches a practical lesson.',
        icon: 'cpu'
      },
      {
        name: 'Teamwork & Communication',
        level: 'Strength',
        experience: 'Client listening, peer collaboration, openness to mentorship',
        details: 'Enjoys collaborating with fellow builders, taking constructive feedback, and shipping practical solutions together.',
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
    description: 'First-year CSE undergraduate building core foundations in C programming, Python, and problem solving while turning early product ideas into working prototypes.',
    takeaway: 'Pairing classroom fundamentals with consistent hands-on building.',
    isCurrent: true,
  },
  {
    year: '2026',
    period: 'Commercial Milestone',
    title: 'First Client Solution Shipped',
    organization: 'Client Business & PDF App',
    location: 'Nagpur / Remote',
    description: 'Worked directly from a real client’s requirements to customize and deliver a practical PDF and day-to-day business utility.',
    takeaway: 'Learned requirement clarity, user empathy, and shipping software people actually use.',
    isCurrent: false,
  },
  {
    year: '2026',
    period: 'Independent Builds',
    title: 'Food Safety App & Logic Game Prototypes',
    organization: 'Personal Product Lab',
    location: 'Nagpur, Maharashtra',
    description: 'Started a food safety inspection app and two playable logic games to practice application structure, state transitions, and interactive user flows.',
    takeaway: 'Growing every week by experimenting, iterating, and building in public.',
    isCurrent: false,
  }
];
