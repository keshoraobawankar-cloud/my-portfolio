import { Project, SkillCategory, Milestone, Locale } from '../types';

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
    processSteps: [
      'Shadowed daily invoice & voucher workflows with the client to spot manual bottlenecks',
      'Sketched single-screen batch flows and live watermark preview states before coding',
      'Iterated rapidly with client feedback until non-technical staff could run exports in 2 clicks'
    ],
    resultSummary: 'Eliminated multi-tool PDF prep overhead and adopted in daily commercial billing operations.',
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
    processSteps: [
      'Audited common kitchen inspection checklists to group criteria into 5 weighted checks',
      'Mapped thumb-friendly mobile wireframes prioritizing one-tap pass/fail logging',
      'Implemented live 0–100 scoring and A/B/C grade thresholds in an interactive prototype'
    ],
    resultSummary: 'Working interactive audit flow ready for field testing with campus food stalls.',
    hasInteractiveDemo: true,
    demoType: 'food-safety',
  },
  {
    id: 'ux-redesign-transit',
    title: 'Nagpur Commute App — UX Redesign Study',
    category: 'design',
    status: 'Case Study',
    statusType: 'live',
    subtitle: 'Usability teardown, wireframe iteration & high-clarity mobile route UI',
    description:
      'Redesigned a cluttered daily commuter transit lookup flow by identifying contrast, hierarchy, and multi-screen friction flaws through structured usability research.',
    problemStatement:
      'Everyday regional transit apps often bury live departure times behind nested dropdowns, tiny low-contrast text, and confusing fare tables—slowing down commuters on the move.',
    solutionSummary:
      'Documented 4 key usability flaws, sketched low-fidelity task flows in Figma, and designed a high-contrast one-screen route card with instant interchange status and clear fare breakdown.',
    technologies: ['UX Research', 'Usability Audit', 'Figma Wireframes', 'Information Hierarchy', 'Accessibility'],
    highlights: [
      'Identified and fixed 4 high-friction navigation and legibility bottlenecks',
      'Reduced route-to-fare lookup from 5 taps down to a single scannable view',
      'Applied WCAG AA contrast ratios and tabular numerals for departure times',
      'Includes interactive Before vs. After redesign switcher in the case study'
    ],
    clientOrContext: 'UX Redesign Case Study · Nagpur',
    year: '2026',
    role: 'UX Researcher & UI Designer',
    processSteps: [
      'Research: Logged real commuter pain points during peak campus travel hours',
      'Wireframes: Consolidated 3 fragmented lookup screens into a unified route card',
      'Final UI: Paired high-contrast status indicators with clear one-tap station swap'
    ],
    resultSummary: 'Cut simulated route-check task time by over half with zero nested menus.',
    hasInteractiveDemo: true,
    demoType: 'ux-redesign',
  },
  {
    id: 'brand-study-orange-city',
    title: 'Orange City Roasters — Brand Identity',
    category: 'design',
    status: 'Case Study',
    statusType: 'live',
    subtitle: 'Self-initiated Nagpur-inspired coffee brand, palette, typography & packaging',
    description:
      'Created a complete self-initiated local brand identity inspired by Nagpur’s citrus heritage—covering geometric mark design, color system, type pairing, and packaging mockups.',
    problemStatement:
      'Local craft beverage startups often launch with inconsistent Canva graphics and mismatched fonts, losing shelf recognition and brand warmth.',
    solutionSummary:
      'Crafted a cohesive visual system anchored by a minimal citrus-crescent monogram, warm terracotta and deep espresso neutrals, display-sans pairings, and ready-to-print sleeve & social templates.',
    technologies: ['Brand Strategy', 'Vector Logo Mark', 'Color & Type System', 'Packaging Mockup', 'Figma / Canva'],
    highlights: [
      'Custom geometric SVG emblem merging a coffee bean and Nagpur orange slice',
      'Curated 4-swatch palette with contrast-checked ink and cream surfaces',
      'Interactive brand previewer for packaging sleeve and social launch card',
      'Built for effortless reuse across digital campaigns and physical print'
    ],
    clientOrContext: 'Self-Initiated Brand Study',
    year: '2026',
    role: 'Brand & Visual Designer',
    processSteps: [
      'Concept: Distilled Nagpur’s identity into warm citrus tones and architectural geometry',
      'Identity: Built vector monogram, 4-color system, and Syne + Jakarta type hierarchy',
      'Rollout: Applied system to drip-bag packaging and launch campaign mockups'
    ],
    resultSummary: 'Complete, reproducible brand kit spanning digital social assets and cup/bag packaging.',
    hasInteractiveDemo: true,
    demoType: 'brand-system',
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
    processSteps: [
      'Modeled win-line matrices and binary search bounds first as pure logic functions',
      'Added heuristic bot move selection (win -> block -> center -> corner)',
      'Synthesized tactile move/win chimes using the browser Web Audio API'
    ],
    resultSummary: 'Two zero-dependency playable games reinforcing state logic and user feedback.',
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
      'Engineered an interactive portfolio featuring a working command-line terminal card, embedded live simulations for every case study, bilingual EN/HI support, and keyboard shortcuts.',
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Motion Animations', 'Web Audio API'],
    highlights: [
      'Interactive terminal card with typing animation and shell commands',
      'Embedded live prototypes inside project case study modals',
      'Bilingual English/Hindi locale switcher with keyboard navigation',
      'Full mobile responsiveness with smooth slide-in navigation'
    ],
    clientOrContext: 'Personal Web Platform',
    year: '2026',
    role: 'Creator & Builder',
    processSteps: [
      'Structured content as problem-process-result case studies instead of a static gallery',
      'Engineered kinetic word-arrangement hero, reading progress bar, and terminal card',
      'Added bilingual EN/HI localization and global keyboard shortcut navigation'
    ],
    resultSummary: 'Accessible, interactive web portfolio serving as a live engineering and design showcase.',
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
        icon: 'layers'
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

const PERSONAL_INFO_HI = {
  ...PERSONAL_INFO,
  name: 'हर्ष बावनकर',
  fullName: 'हर्ष बावनकर',
  title: 'B.Tech CSE छात्र और प्रोडक्ट बिल्डर',
  roles: ['B.Tech CSE छात्र', 'ऐप और टूल बिल्डर', 'महत्वाकांक्षी उद्यमी'],
  headline: 'रामदेवबाबा विश्वविद्यालय में CSE प्रथम वर्ष · सीखते हुए वास्तविक उत्पाद निर्माण',
  institution: 'रामदेवबाबा विश्वविद्यालय (RBU)',
  degree: 'B.Tech, कंप्यूटर साइंस एंड इंजीनियरिंग (प्रथम वर्ष)',
  period: '2026 – वर्तमान',
  location: 'नागपुर, महाराष्ट्र, भारत',
  shortLocation: 'नागपुर, भारत',
  heroBio: `नमस्ते, मैं हर्ष बावनकर हूँ — रामदेवबाबा विश्वविद्यालय में कंप्यूटर साइंस का प्रथम-वर्ष छात्र, जो विचारों को कार्यशील टूल्स में बदलता है। मैं C, Python और AI-सहायता प्राप्त विकास वर्कफ़्लो से सीखते हुए निर्माण करता हूँ—एक कस्टम क्लाइंट PDF ऐप डिलीवर कर चुका हूँ, एक फ़ूड सेफ़्टी प्लेटफ़ॉर्म निर्माणाधीन है, और समस्या-समाधान निखारने के लिए ब्राउज़र लॉजिक गेम्स बनाए हैं।`,
  summary: `प्रथम-वर्ष कंप्यूटर साइंस छात्र जो सीखते हुए निर्माण करता है। AI-सहायता ऐप प्रोटोटाइपिंग के साथ C और Python का अभ्यास कर रहा हूँ, कई ऐप और गेम प्रोजेक्ट्स शुरू किए हैं और एक क्लाइंट बिज़नेस ऐप डिलीवर किया है। मानता हूँ कि निरंतरता जन्मजात प्रतिभा से आगे होती है, और साथी मेकर्स के साथ मिलकर विचारों को वास्तविक सॉफ़्टवेयर में बदलना पसंद करता हूँ।`,
  coreTenet: 'निरंतरता हमेशा जन्मजात प्रतिभा से आगे निकलती है।',
  subPhilosophy: 'अवधारणाओं को कार्यशील प्रयोगों में बदलें। छोटे, अनुशासित कदम स्थायी इंजीनियरिंग क्षमता बनाते हैं।',
};

const PROJECTS_HI: Project[] = [
  {
    id: 'client-pdf-app',
    title: 'क्लाइंट बिज़नेस और PDF ऐप',
    category: 'client',
    status: 'Shipped',
    statusType: 'delivered',
    subtitle: 'कस्टम व्यावसायिक वर्कफ़्लो और स्वचालित PDF प्रोसेसिंग टूल',
    description:
      'दैनिक PDF हैंडलिंग, डॉक्यूमेंट स्टैम्पिंग और दोहराए जाने वाले व्यावसायिक कागज़ी काम को सरल बनाने के लिए एक व्यावसायिक क्लाइंट हेतु एप्लिकेशन कस्टमाइज़ कर डिलीवर किया।',
    problemStatement:
      'एक स्थानीय व्यावसायिक क्लाइंट को अलग-अलग टूल्स पर रसीदें जोड़ने, गोपनीय इनवॉइस पर स्टैम्प लगाने और बार-बार बिज़नेस PDF फ़ॉर्मेट करने में घंटों लगते थे, जिससे देरी और फ़ॉर्मेटिंग की गलतियाँ होती थीं।',
    solutionSummary:
      'क्लाइंट के साथ सीधे आवश्यकताएँ तय कर एक सरल डॉक्यूमेंट टूल डिलीवर किया, जिसमें तुरंत वॉटरमार्क प्रीव्यू, संरचित इनवॉइस/वाउचर टेम्पलेट और गैर-तकनीकी स्टाफ़ के लिए वन-क्लिक बैच तैयारी शामिल है।',
    technologies: ['क्लाइंट डिस्कवरी', 'PDF प्रोसेसिंग', 'वर्कफ़्लो ऑटोमेशन', 'AI प्रोटोटाइपिंग', 'फ़ाइल हैंडलिंग'],
    highlights: [
      'तेज़ टर्नअराउंड के साथ वास्तविक व्यावसायिक ज़रूरतों पर डिलीवर किया',
      'त्रुटियों से बचने के लिए एक्सपोर्ट से पहले लाइव डॉक्यूमेंट स्टैम्प प्रीव्यू बनाया',
      'मैन्युअल मल्टी-स्टेप कागज़ी काम को तेज़ डिजिटल बैच एक्शन से बदला',
      'दैनिक व्यावसायिक संचालन में विश्वसनीय रूप से अपनाया गया'
    ],
    clientOrContext: 'व्यावसायिक क्लाइंट · डिलीवर',
    year: '2026',
    role: 'सोलो बिल्डर और सॉल्यूशन डिज़ाइनर',
    processSteps: [
      'मैन्युअल अड़चनों को पहचानने के लिए क्लाइंट के दैनिक इनवॉइस और वाउचर वर्कफ़्लो का अध्ययन किया',
      'कोडिंग से पहले सिंगल-स्क्रीन बैच फ़्लो और लाइव वॉटरमार्क प्रीव्यू स्टेट के वायरफ़्रेम बनाए',
      'क्लाइंट फ़ीडबैक के साथ तेज़ी से सुधार किया जब तक गैर-तकनीकी स्टाफ़ 2 क्लिक में एक्सपोर्ट न कर सके'
    ],
    resultSummary: 'मल्टी-टूल PDF तैयारी का झंझट समाप्त हुआ और दैनिक बिलिंग संचालन में अपनाया गया।',
    hasInteractiveDemo: true,
    demoType: 'pdf-app',
  },
  {
    id: 'food-safety-app',
    title: 'फ़ूड सेफ़्टी और क्वालिटी इंस्पेक्शन ऐप',
    category: 'product',
    status: 'In Progress',
    statusType: 'progress',
    subtitle: 'डिजिटल स्वच्छता अनुपालन चेकलिस्ट और लाइव ग्रेडिंग वर्कफ़्लो',
    description:
      'स्वच्छ ऐप आर्किटेक्चर, सहज यूज़र फ़्लो और संरचित फ़ीचर प्लानिंग का अभ्यास करते हुए फ़ूड सेफ़्टी निरीक्षण पर केंद्रित एक एप्लिकेशन डिज़ाइन और विकसित कर रहे हैं।',
    problemStatement:
      'छोटे फ़ूड वेंडर्स, कैफ़े और कैंपस किचन अक्सर कोल्ड-स्टोरेज तापमान, एलर्जेन चेतावनियाँ और स्वच्छता जाँच कागज़ी क्लिपबोर्ड पर लिखते हैं, जिनका नियमित ऑडिट करना कठिन होता है।',
    solutionSummary:
      'भारित स्वच्छता मानदंडों, रियल-टाइम अनुपालन स्कोरिंग (0–100), स्वचालित ग्रेड गणना और स्पष्ट एक्शन अलर्ट के साथ मोबाइल-अनुकूल डिजिटल निरीक्षण वर्कफ़्लो तैयार कर रहे हैं।',
    technologies: ['प्रोडक्ट आर्किटेक्चर', 'UI फ़्लो डिज़ाइन', 'भारित स्कोरिंग लॉजिक', 'रिस्पॉन्सिव प्रोटोटाइपिंग'],
    highlights: [
      'तुरंत अनुपालन स्कोर गणना के साथ भारित स्वच्छता रूब्रिक',
      'जाँच दर्ज होते ही रियल-टाइम ग्रेड A / B / C स्थिति फ़ीडबैक',
      'कोल्ड स्टोरेज, सतह पृथक्करण और एलर्जेन लेबलिंग को कवर करता है',
      'मोबाइल स्क्रीन पर तेज़ और सहज निरीक्षण के लिए डिज़ाइन किया गया'
    ],
    clientOrContext: 'स्वतंत्र प्रोडक्ट बिल्ड',
    year: '2026',
    role: 'प्रोडक्ट क्रिएटर और बिल्डर',
    processSteps: [
      'मानदंडों को 5 भारित जाँचों में समूहित करने के लिए सामान्य किचन निरीक्षण चेकलिस्ट का ऑडिट किया',
      'एक-टैप पास/फ़ेल लॉगिंग को प्राथमिकता देते हुए मोबाइल-अनुकूल वायरफ़्रेम मैप किए',
      'इंटरैक्टिव प्रोटोटाइप में लाइव 0–100 स्कोरिंग और A/B/C ग्रेड थ्रेशोल्ड लागू किए'
    ],
    resultSummary: 'कैंपस फ़ूड स्टॉल्स के साथ फ़ील्ड टेस्टिंग के लिए तैयार कार्यशील इंटरैक्टिव ऑडिट फ़्लो।',
    hasInteractiveDemo: true,
    demoType: 'food-safety',
  },
  {
    id: 'ux-redesign-transit',
    title: 'नागपुर कम्यूट ऐप — UX रीडिज़ाइन अध्ययन',
    category: 'design',
    status: 'Case Study',
    statusType: 'live',
    subtitle: 'यूज़ेबिलिटी ऑडिट, वायरफ़्रेम इटरेशन और उच्च-स्पष्टता मोबाइल रूट UI',
    description:
      'संरचित यूज़ेबिलिटी रिसर्च के ज़रिए कंट्रास्ट, पदानुक्रम और मल्टी-स्क्रीन अड़चनों की पहचान कर एक उलझे हुए दैनिक कम्यूटर ट्रांज़िट लुकअप फ़्लो को रीडिज़ाइन किया।',
    problemStatement:
      'दैनिक क्षेत्रीय ट्रांज़िट ऐप्स अक्सर लाइव प्रस्थान समय को नेस्टेड ड्रॉपडाउन, छोटे कम-कंट्रास्ट टेक्स्ट और उलझन भरी किराया तालिकाओं में छिपा देते हैं—जिससे चलते समय यात्रियों की गति धीमी पड़ती है।',
    solutionSummary:
      '4 प्रमुख यूज़ेबिलिटी कमियों का दस्तावेज़ीकरण किया, Figma में लो-फ़िडेलिटी टास्क फ़्लो स्केच किए, और तुरंत इंटरचेंज स्थिति व स्पष्ट किराया विवरण के साथ उच्च-कंट्रास्ट वन-स्क्रीन रूट कार्ड डिज़ाइन किया।',
    technologies: ['UX रिसर्च', 'यूज़ेबिलिटी ऑडिट', 'Figma वायरफ़्रेम्स', 'इन्फ़ॉर्मेशन हायरार्की', 'एक्सेसिबिलिटी'],
    highlights: [
      '4 उच्च-घर्षण नेविगेशन और पठनीयता अड़चनों की पहचान कर सुधार किया',
      'रूट-से-किराया देखने के चरणों को 5 टैप से घटाकर एक स्कैनेबल दृश्य में बदला',
      'प्रस्थान समय के लिए WCAG AA कंट्रास्ट अनुपात और टैबुलर अंक लागू किए',
      'केस स्टडी में इंटरैक्टिव "पहले बनाम बाद" रीडिज़ाइन स्विचर शामिल है'
    ],
    clientOrContext: 'UX रीडिज़ाइन केस स्टडी · नागपुर',
    year: '2026',
    role: 'UX रिसर्चर और UI डिज़ाइनर',
    processSteps: [
      'रिसर्च: व्यस्त कैंपस यात्रा समय के दौरान यात्रियों की वास्तविक कठिनाइयाँ दर्ज कीं',
      'वायरफ़्रेम्स: 3 बिखरी हुई लुकअप स्क्रीन को एक एकीकृत रूट कार्ड में समेटा',
      'अंतिम UI: उच्च-कंट्रास्ट स्थिति संकेतकों के साथ वन-टैप स्टेशन स्वैप जोड़ा'
    ],
    resultSummary: 'बिना किसी नेस्टेड मेनू के सिम्युलेटेड रूट-चेक समय को आधे से अधिक कम किया।',
    hasInteractiveDemo: true,
    demoType: 'ux-redesign',
  },
  {
    id: 'brand-study-orange-city',
    title: 'ऑरेंज सिटी रोस्टर्स — ब्रांड पहचान',
    category: 'design',
    status: 'Case Study',
    statusType: 'live',
    subtitle: 'नागपुर-प्रेरित स्व-प्रारंभित कॉफ़ी ब्रांड, कलर पैलेट, टाइपोग्राफ़ी और पैकेजिंग',
    description:
      'नागपुर की संतरा विरासत से प्रेरित एक पूर्ण स्व-प्रारंभित स्थानीय ब्रांड पहचान बनाई—जिसमें ज्यामितीय लोगो मार्क, कलर सिस्टम, टाइप पेयरिंग और पैकेजिंग मॉकअप शामिल हैं।',
    problemStatement:
      'स्थानीय क्राफ्ट बेवरेज स्टार्टअप अक्सर असंगत ग्राफ़िक्स और बेमेल फ़ॉन्ट्स के साथ लॉन्च होते हैं, जिससे शेल्फ़ पहचान और ब्रांड की आत्मीयता खो जाती है।',
    solutionSummary:
      'संतरा-कॉफ़ी मोनोग्राम, गर्म टेराकोटा व एस्प्रेसो न्यूट्रल्स, डिस्प्ले-सैन्स टाइप पेयरिंग और प्रिंट-रेडी स्लीव व सोशल मीडिया टेम्पलेट्स से सुसज्जित एक सुसंगत विज़ुअल सिस्टम तैयार किया।',
    technologies: ['ब्रांड रणनीति', 'वेक्टर लोगो मार्क', 'कलर और टाइप सिस्टम', 'पैकेजिंग मॉकअप', 'Figma / Canva'],
    highlights: [
      'कॉफ़ी बीन और नागपुर संतरे के टुकड़े को जोड़ता कस्टम ज्यामितीय SVG प्रतीक',
      'कंट्रास्ट-जाँचे गए इंक और क्रीम सरफ़ेस के साथ 4-स्वैच कलर पैलेट',
      'पैकेजिंग स्लीव और सोशल लॉन्च कार्ड के लिए इंटरैक्टिव ब्रांड प्रीव्यूअर',
      'डिजिटल अभियानों और भौतिक प्रिंट दोनों में आसान पुन: उपयोग हेतु निर्मित'
    ],
    clientOrContext: 'स्व-प्रारंभित ब्रांड अध्ययन',
    year: '2026',
    role: 'ब्रांड और विज़ुअल डिज़ाइनर',
    processSteps: [
      'कॉन्सेप्ट: नागपुर की पहचान को गर्म सिट्रस रंगों और वास्तुशिल्प ज्यामिति में ढाला',
      'पहचान: वेक्टर मोनोग्राम, 4-रंग प्रणाली और Syne + Jakarta टाइप पदानुक्रम बनाया',
      'रोलआउट: सिस्टम को ड्रिप-बैग पैकेजिंग और लॉन्च अभियान मॉकअप पर लागू किया'
    ],
    resultSummary: 'डिजिटल सोशल एसेट्स और कप/बैग पैकेजिंग को जोड़ने वाली पूर्ण पुनरुत्पादक ब्रांड किट।',
    hasInteractiveDemo: true,
    demoType: 'brand-system',
  },
  {
    id: 'game-projects-sandbox',
    title: 'लॉजिक गेम प्रोजेक्ट्स और आर्केड',
    category: 'game',
    status: 'In Progress',
    statusType: 'progress',
    subtitle: 'टर्न-आधारित स्टेट लॉजिक, डिडक्शन लूप और खेलने योग्य मिनी-गेम्स',
    description:
      'कोर प्रोग्रामिंग लॉजिक, टर्न साइकिल, जीत की स्थिति जाँच और व्यावहारिक खेल के माध्यम से इटरेटिव डिज़ाइन का अभ्यास करने के लिए दो इंटरैक्टिव ब्राउज़र गेम्स शुरू किए।',
    problemStatement:
      'केवल पाठ्यपुस्तक के कंसोल अभ्यासों से कंट्रोल फ़्लो और एल्गोरिद्म सीखने में तुरंत विज़ुअल फ़ीडबैक और वास्तविक यूज़र इंटरैक्शन के एज-केस की कमी रहती है।',
    solutionSummary:
      'दो खेलने योग्य ब्राउज़र गेम्स बनाए—टैक्टिकल टिक-टैक-टो (ह्यूरिस्टिक AI बॉट और 2-खिलाड़ी लोकल मोड दोनों के साथ) और बाइनरी नंबर डिडक्शन—स्कोर ट्रैकिंग, तुरंत रीसेट और Web Audio साउंड सिंथेसिस के साथ।',
    technologies: ['एल्गोरिद्मिक लॉजिक', 'स्टेट मशीन्स', 'ह्यूरिस्टिक बॉट लॉजिक', 'Web Audio सिंथेसिस'],
    highlights: [
      'जीत-रेखा हाइलाइट और स्कोरबोर्ड के साथ लाइव खेलने योग्य',
      'टैक्टिकल बॉट प्रतिद्वंद्वी और 2-खिलाड़ी लोकल मोड दोनों का समर्थन',
      'दिशात्मक संकेतों के साथ बाइनरी-सर्च नंबर डिडक्शन चुनौती',
      'बिना बाहरी ऑडियो फ़ाइलों के Web Audio API से स्पष्ट ध्वनि संश्लेषण'
    ],
    clientOrContext: 'पर्सनल लॉजिक और गेम लैब',
    year: '2026',
    role: 'गेम लॉजिक बिल्डर',
    processSteps: [
      'पहले शुद्ध लॉजिक फ़ंक्शंस के रूप में जीत-रेखा मैट्रिक्स और बाइनरी खोज सीमाएँ तैयार कीं',
      'ह्यूरिस्टिक बॉट चाल चयन (जीत -> ब्लॉक -> केंद्र -> कोना) जोड़ा',
      'ब्राउज़र Web Audio API का उपयोग करके चाल और जीत की ध्वनियाँ संश्लेषित कीं'
    ],
    resultSummary: 'स्टेट लॉजिक और यूज़र फ़ीडबैक को सुदृढ़ करने वाले दो ज़ीरो-डिपेंडेंसी खेलने योग्य गेम्स।',
    hasInteractiveDemo: true,
    demoType: 'game-logic',
  },
  {
    id: 'interactive-personal-portfolio',
    title: 'इंटरैक्टिव डेवलपर पोर्टफ़ोलियो',
    category: 'web',
    status: 'Live',
    statusType: 'live',
    subtitle: 'टर्मिनल शेल, लाइव डेमो और मल्टी-थीम इंजन के साथ व्यक्तिगत वेब प्लेटफ़ॉर्म',
    description:
      'एक तेज़, रिस्पॉन्सिव व्यक्तिगत प्लेटफ़ॉर्म जिसमें इंटरैक्टिव कमांड-लाइन कार्ड, लाइव खेलने योग्य प्रोजेक्ट प्रोटोटाइप और तुरंत डार्क/लाइट थीम स्विचिंग शामिल है।',
    problemStatement:
      'स्थिर टेक्स्ट रिज़्यूमे यह नहीं दिखा पाते कि कोई बिल्डर कैसे सोचता है, प्रयोग करता है और इंटरैक्टिव सॉफ़्टवेयर बनाता है—विशेषकर कंप्यूटर साइंस डिग्री के शुरुआती वर्षों में।',
    solutionSummary:
      'कार्यशील कमांड-लाइन टर्मिनल कार्ड, प्रमुख प्रोजेक्ट्स के भीतर एम्बेडेड लाइव सिमुलेशन, द्विभाषी समर्थन और कीबोर्ड शॉर्टकट नेविगेशन के साथ एक इंटरैक्टिव पोर्टफ़ोलियो तैयार किया।',
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Motion Animations', 'Web Audio API'],
    highlights: [
      'टाइपिंग एनिमेशन और शेल कमांड्स के साथ इंटरैक्टिव टर्मिनल कार्ड',
      'हर प्रमुख प्रोजेक्ट विवरण दृश्य में एम्बेडेड लाइव प्रोटोटाइप',
      'तुरंत लाइट/मेश स्विचिंग और कीबोर्ड शॉर्टकट के साथ द्विभाषी EN/HI अनुभव',
      'सहज स्लाइड-इन नेविगेशन के साथ पूर्ण मोबाइल रिस्पॉन्सिवनेस'
    ],
    clientOrContext: 'व्यक्तिगत वेब प्लेटफ़ॉर्म',
    year: '2026',
    role: 'क्रिएटर और बिल्डर',
    processSteps: [
      'स्थिर गैलरी के बजाय समस्या-प्रक्रिया-परिणाम केस स्टडी के रूप में सामग्री व्यवस्थित की',
      'काइनेटिक वर्ड-अरेंजमेंट हीरो, रीडिंग प्रोग्रेस बार और टर्मिनल कार्ड इंजीनियर किया',
      'द्विभाषी EN/HI लोकलाइज़ेशन और वैश्विक कीबोर्ड शॉर्टकट नेविगेशन जोड़ा'
    ],
    resultSummary: 'लाइव इंजीनियरिंग और डिज़ाइन शोकेस के रूप में कार्य करने वाला सुलभ, इंटरैक्टिव वेब पोर्टफ़ोलियो।',
    hasInteractiveDemo: false,
  }
];

const SKILL_CATEGORIES_HI: SkillCategory[] = [
  {
    name: 'प्रोग्रामिंग की नींव',
    number: '01',
    description: 'मुख्य लॉजिक, संरचित समस्या समाधान और बुनियादी CS भाषाएँ',
    skills: [
      {
        name: 'C प्रोग्रामिंग',
        level: 'अभ्यास',
        experience: 'कंट्रोल फ़्लो, लूप्स, ऐरे, फ़ंक्शन्स, पॉइंटर्स, संरचित लॉजिक',
        details: 'प्रोग्राम चरण-दर-चरण कैसे चलते हैं इसकी मज़बूत समझ बनाना, नियतात्मक लॉजिक लिखना और एल्गोरिद्मिक समस्या-समाधान का अभ्यास करना।',
        icon: 'terminal'
      },
      {
        name: 'Python',
        level: 'सीख रहे हैं',
        experience: 'स्क्रिप्टिंग बेसिक्स, डेटा हैंडलिंग, समस्या-समाधान अभ्यास',
        details: 'Python सिंटैक्स, साफ़ स्क्रिप्टिंग और तार्किक विचारों को पढ़ने योग्य कोड में बदलने में आत्मविश्वास बढ़ाना।',
        icon: 'file-code'
      },
      {
        name: 'एल्गोरिद्मिक लॉजिक',
        level: 'अभ्यास',
        experience: 'बाइनरी डिडक्शन, टर्न-आधारित गेम नियम, कंडीशन मैट्रिक्स',
        details: 'कक्षा के लॉजिक को सीधे इंटरैक्टिव मिनी-गेम्स और व्यावहारिक निर्णय फ़्लो में लागू करना।',
        icon: 'cpu'
      }
    ]
  },
  {
    name: 'AI-सहायता निर्माण',
    number: '02',
    description: 'आधुनिक AI वर्कफ़्लो से प्रोडक्ट विचारों को कार्यशील ऐप्स में बदलना',
    skills: [
      {
        name: 'AI कोडिंग और प्रोटोटाइपिंग',
        level: 'दैनिक वर्कफ़्लो',
        experience: 'इटरेटिव प्रॉम्प्टिंग, फ़ीचर स्कैफ़ोल्डिंग, UI इटरेशन, तेज़ MVP',
        details: 'प्रोडक्ट विचारों और कार्यशील सॉफ़्टवेयर के बीच की दूरी पाटने के लिए AI टूल्स का उद्देश्यपूर्ण उपयोग, साथ ही हर घटक की समझ विकसित करना।',
        icon: 'layers'
      },
      {
        name: 'डिबगिंग और रिसर्च',
        level: 'सक्रिय उपयोग',
        experience: 'बग्स ट्रेस करना, एज-केस जाँचना, तकनीकी विकल्पों पर रिसर्च',
        details: 'त्रुटियों को व्यवस्थित रूप से तोड़कर समझना, प्रत्यक्ष परीक्षण से समाधान सत्यापित करना और वर्कफ़्लो को विश्वसनीय बनाना।',
        icon: 'zap'
      },
      {
        name: 'वेब ऐप एक्सप्लोरेशन',
        level: 'अन्वेषण',
        experience: 'पेज संरचना, इंटरैक्टिव स्टेट्स, यूज़र-फ़ेसिंग फ़्लो की समझ',
        details: 'केवल सिंटैक्स रटने के बजाय वास्तविक प्रोजेक्ट्स बनाकर आधुनिक वेब इंटरफ़ेस की कार्यप्रणाली सीखना।',
        icon: 'layout'
      }
    ]
  },
  {
    name: 'टूल्स और रचनात्मक शिल्प',
    number: '03',
    description: 'वर्ज़न कंट्रोल, प्रोडक्ट स्ट्रक्चरिंग और विज़ुअल जिज्ञासा',
    skills: [
      {
        name: 'Git और GitHub',
        level: 'सक्रिय उपयोग',
        experience: 'रिपॉज़िटरीज़, वर्ज़न हिस्ट्री, प्रोजेक्ट पब्लिशिंग, कोड बैकअप',
        details: 'प्रगति ट्रैक करने, बिल्ड्स साझा करने और साफ़ सहयोग के लिए सुव्यवस्थित GitHub रिपॉज़िटरीज़ का रखरखाव।',
        icon: 'git-branch'
      },
      {
        name: 'प्रोडक्ट और UI फ़्लो प्लानिंग',
        level: 'अभ्यास',
        experience: 'आवश्यकता संकलन, यूज़र सहानुभूति, स्क्रीन-दर-स्क्रीन फ़्लो डिज़ाइन',
        details: 'वास्तविक क्लाइंट या यूज़र समस्याओं—जैसे इनवॉइस PDF स्टैम्पिंग या फ़ूड सेफ़्टी चेकलिस्ट—को सरल, सहज चरणों में बदलना।',
        icon: 'code'
      },
      {
        name: '3D मॉडलिंग और ग्राफ़िक्स',
        level: 'अन्वेषण',
        experience: 'स्पेशियल डिज़ाइन जिज्ञासा, विज़ुअल रचना, डिजिटल शिल्प',
        details: 'इंजीनियरिंग के साथ विज़ुअल रचनात्मकता को जोड़ने के लिए सॉफ़्टवेयर के साथ 3D मॉडलिंग और ग्राफ़िक्स की खोज।',
        icon: 'box'
      }
    ]
  },
  {
    name: 'बिल्डर मानसिकता',
    number: '04',
    description: 'दैनिक विकास को गति देने वाले सिद्धांत और आदतें',
    skills: [
      {
        name: 'प्रतिभा से अधिक निरंतरता',
        level: 'मूल मंत्र',
        experience: 'नियमित दैनिक अभ्यास, जल्दी शिप करना, हर सप्ताह सुधार',
        details: 'विश्वास है कि स्थायी क्षमता लगातार उपस्थित रहने और वास्तविक प्रोजेक्ट्स को चरण-दर-चरण पूरा करने से आती है।',
        icon: 'check-circle'
      },
      {
        name: 'सीखने के लिए निर्माण',
        level: 'पद्धति',
        experience: 'निष्क्रिय सिद्धांत के बजाय वास्तविक क्लाइंट व व्यक्तिगत बिल्ड्स से सीखना',
        details: 'प्रथम वर्ष में ही वास्तविक ऐप्स और गेम्स शुरू करना ताकि हर बाधा एक व्यावहारिक पाठ सिखाए।',
        icon: 'cpu'
      },
      {
        name: 'टीमवर्क और संवाद',
        level: 'शक्ति',
        experience: 'क्लाइंट की बात समझना, सहकर्मी सहयोग, मार्गदर्शन के प्रति खुलापन',
        details: 'साथी बिल्डर्स के साथ सहयोग करना, रचनात्मक फ़ीडबैक लेना और मिलकर व्यावहारिक समाधान तैयार करना पसंद है।',
        icon: 'users'
      }
    ]
  }
];

const MILESTONES_HI: Milestone[] = [
  {
    year: '2026 – वर्तमान',
    period: 'वर्तमान शैक्षणिक अध्याय',
    title: 'B.Tech कंप्यूटर साइंस एंड इंजीनियरिंग',
    organization: 'रामदेवबाबा विश्वविद्यालय (RBU)',
    location: 'नागपुर, महाराष्ट्र',
    description: 'प्रथम-वर्ष CSE स्नातक छात्र, जो C प्रोग्रामिंग, Python और समस्या-समाधान में मज़बूत नींव रखते हुए शुरुआती प्रोडक्ट विचारों को कार्यशील प्रोटोटाइप में बदल रहे हैं।',
    takeaway: 'कक्षा के मूल सिद्धांतों को निरंतर व्यावहारिक निर्माण के साथ जोड़ना।',
    isCurrent: true,
  },
  {
    year: '2026',
    period: 'व्यावसायिक उपलब्धि',
    title: 'पहला क्लाइंट समाधान डिलीवर',
    organization: 'क्लाइंट बिज़नेस और PDF ऐप',
    location: 'नागपुर / रिमोट',
    description: 'एक वास्तविक क्लाइंट की आवश्यकताओं पर सीधे काम करके व्यावहारिक PDF और दैनिक व्यावसायिक उपयोगिता टूल कस्टमाइज़ कर डिलीवर किया।',
    takeaway: 'आवश्यकताओं की स्पष्टता, यूज़र समझ और लोगों के वास्तविक उपयोग में आने वाला सॉफ़्टवेयर बनाना सीखा।',
    isCurrent: false,
  },
  {
    year: '2026',
    period: 'स्वतंत्र निर्माण',
    title: 'फ़ूड सेफ़्टी ऐप और लॉजिक गेम प्रोटोटाइप',
    organization: 'पर्सनल प्रोडक्ट लैब',
    location: 'नागपुर, महाराष्ट्र',
    description: 'एप्लिकेशन संरचना, स्टेट ट्रांज़िशन और इंटरैक्टिव यूज़र फ़्लो का अभ्यास करने के लिए फ़ूड सेफ़्टी इंस्पेक्शन ऐप और दो खेलने योग्य लॉजिक गेम्स शुरू किए।',
    takeaway: 'प्रयोग, इटरेशन और पब्लिक बिल्डिंग के ज़रिए हर सप्ताह निरंतर प्रगति।',
    isCurrent: false,
  }
];

export function getPortfolioData(locale: Locale) {
  if (locale === 'hi') {
    return {
      personalInfo: PERSONAL_INFO_HI,
      projects: PROJECTS_HI,
      skillCategories: SKILL_CATEGORIES_HI,
      milestones: MILESTONES_HI,
    };
  }
  return {
    personalInfo: PERSONAL_INFO,
    projects: PROJECTS,
    skillCategories: SKILL_CATEGORIES,
    milestones: MILESTONES,
  };
}

