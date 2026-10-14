import { Resume, SkillGroup } from './resume.model';

/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE — everything on the site is driven from here.
 * ─────────────────────────────────────────────────────────────
 */

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'Angular', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'RxJS / Signals', level: 85 },
      { name: 'HTML & SCSS', level: 88 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 82 },
      { name: 'REST & GraphQL', level: 80 },
      { name: 'SQL', level: 78 },
    ],
  },
  {
    category: 'Tools & Cloud',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Azure / AWS', level: 68 },
    ],
  },
];

/** Number of technologies listed above — used by the "Technologies" stat. */
const TECH_COUNT = SKILL_GROUPS.reduce((sum, g) => sum + g.skills.length, 0);

export const RESUME: Resume = {
  profile: {
    name: 'Leonid Jakimovski',
    roles: ['Software Developer', 'Full-Stack Engineer', 'Angular Specialist', 'Problem Solver'],
    tagline: 'I design and build fast, resilient software — from pixel-perfect interfaces to the systems that power them.',
    location: 'Skopje, North Macedonia',
    email: 'jakimovskil211@gmail.com',
    avatar: 'me.webp',
    resumeUrl: 'Leonid-Jakimovski-CV.pdf',
    availableForWork: true,
  },

  socials: [
    { label: 'GitHub', url: 'https://github.com/leojk11', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/leonidjakimovski/', icon: 'linkedin' },
    { label: 'Instagram', url: 'https://www.instagram.com/leojakimovski/', icon: 'instagram' },
    { label: 'Email', url: 'mailto:jakimovskil211@gmail.com', icon: 'mail' },
  ],

  about: [
    'I am a software developer from Skopje who loves turning complex problems into simple, elegant products. I started in 2019 building websites from scratch at CodeDesk, and over 5+ years and 20+ shipped projects that curiosity has grown into building large-scale Angular applications as a Senior Developer at Atis Software Factory.',
    'Angular is my craft: I care about clean, modular code and interfaces that feel effortless to use. I work fully remote, enjoy reviewing code and sharing what I know with the team, and I am always learning: right now I am expanding into backend and cloud with Node.js, Azure and AWS, because I like building things people actually use.',
  ],

  stats: [
    { value: 5, suffix: '+', label: 'Years experience' },
    { value: 20, suffix: '+', label: 'Projects shipped' },
    { value: TECH_COUNT, label: 'Technologies' },
    { value: 100, suffix: '%', label: 'Coffee powered' },
  ],

  skillGroups: SKILL_GROUPS,

  experience: [
    {
      role: 'Senior Software Developer',
      company: 'Atis Software Factory',
      period: '2021 — Present',
      location: 'Remote',
      summary:
        'Building complex, large-scale web applications with Angular — turning demanding business requirements into fast, maintainable and user-friendly products.',
      highlights: [
        'Architect and develop feature-rich Angular applications with clean, modular and scalable code.',
        'Break down complex problems and design practical solutions, from data flow and state management to performance.',
        'Connect Angular applications to existing REST APIs: consuming endpoints, mapping data and handling loading and error states.',
        'Review code, share knowledge and help keep quality and best practices high across the team.',
        'Work closely with clients and teammates in a fully remote setup, from requirements to delivery.',
      ],
      tech: ['Angular', 'TypeScript', 'RxJS', 'API integration', 'SCSS'],
    },
    {
      role: 'Junior Developer',
      company: 'CodeDesk',
      period: '2019 — 2021',
      summary:
        'Where it all started — learning how to design and build websites from scratch, turning ideas and mockups into real, working pages.',
      highlights: [
        'Built websites end to end: from layout and visual design to responsive, cross-browser implementation.',
        'Learned the fundamentals of UI/UX: typography, colour, spacing and designing with the user in mind.',
        'Turned design mockups into clean, pixel-perfect HTML, CSS and JavaScript.',
        'Built a strong foundation in web development that later grew into building full applications.',
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Responsive design', 'UI/UX'],
    },
  ],

  projects: [
    {
      title: 'Invoice Generator',
      description:
        'Built to help small businesses create invoices, even from a phone, so they can ship them easily. Pure JavaScript.',
      category: 'Web App',
      tech: ['JavaScript', 'HTML', 'CSS', 'Mobile-friendly'],
      repo: 'https://github.com/leojk11/invoice-generator',
      link: 'https://invoice-generator.softwareio.click/',
    },
    {
      title: 'Wedding Invitation',
      description:
        'An interactive digital invitation for couples about to get married, to invite guests to their wedding party and collect RSVPs, backed by a custom API. Still a work in progress: many more features are coming, especially an admin panel to control the whole page dynamically.',
      category: 'Web App',
      tech: ['Angular', 'API', 'Animations'],
      link: 'https://example.com',
      featured: true,
    },
    {
      title: 'Wedding Invitation API',
      description: 'The backend service handling guests, RSVPs and notifications.',
      category: 'Backend',
      tech: ['Node.js', 'REST', 'Database'],
      featured: true,
    },
    {
      title: 'Project Four',
      description: 'Describe another project — what problem it solves and how.',
      category: 'Open Source',
      tech: ['TypeScript', 'CLI'],
    },
  ],

};
