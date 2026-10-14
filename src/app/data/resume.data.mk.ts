import { RESUME } from './resume.data';
import { Experience, Project, Resume } from './resume.model';

/**
 * Macedonian translation of resume.data.ts.
 *
 * Only translatable text lives here — links, emails, tech names and skill
 * levels are inherited from the English data. Lists are matched by their
 * English key (project title, company, skill category), so anything you add to
 * resume.data.ts without a translation here simply shows up in English.
 */

const SKILL_CATEGORIES: Record<string, string> = {
  Frontend: 'Фронтенд',
  Backend: 'Бекенд',
  'Tools & Cloud': 'Алатки и облак',
};

const EXPERIENCE: Record<string, Partial<Experience>> = {
  'Atis Software Factory': {
    role: 'Senior software engineer',
    period: '2021 — Денес',
    location: 'Од далечина',
    summary:
      'Градам сложени веб апликации од голем обем со Angular — барањата на бизнисот ги претворам во брзи, одржливи и лесни за користење производи.',
    highlights: [
      'Проектирам и развивам Angular апликации со многу функционалности, со чист, модуларен и скалабилен код.',
      'Сложените проблеми ги разложувам на делови и дизајнирам практични решенија — од проток на податоци и управување со состојба до перформанси.',
      'Ги поврзувам Angular апликациите со постоечки REST API-ја: повикување на ендпоинти, мапирање на податоци и справување со состојби на вчитување и грешки.',
      'Прегледувам код, споделувам знаење и помагам во одржување на високо ниво на квалитет и добри практики во тимот.',
      'Работам блиску со клиенти и колеги во целосно далечинско окружување, од барања до испорака.',
    ],
  },
  CodeDesk: {
    role: 'Junior software engineer',
    period: '2019 — 2021',
    summary:
      'Каде што сè започна — учев како да дизајнирам и градам веб-сајтови од нула, претворајќи идеи и скици во вистински, работни страници.',
    highlights: [
      'Изработував веб-сајтови од почеток до крај: од распоред и визуелен дизајн до респонзивна имплементација компатибилна со сите прелистувачи.',
      'Ги научив основите на UI/UX: типографија, боја, простор и дизајн со корисникот на ум.',
      'Дизајн-скици ги претворав во чист HTML, CSS и JavaScript, прецизен до пиксел.',
      'Изградив цврста основа во веб-развојот, која подоцна прерасна во градење на комплетни апликации.',
    ],
  },
};

const PROJECTS: Record<string, Partial<Project>> = {
  'Invoice Generator': {
    description:
      'Направен за малите бизниси лесно да креираат фактури, дури и од телефон, за брзо да ги испраќаат. Чист JavaScript.',
    category: 'Веб апликација',
    tech: ['JavaScript', 'HTML', 'CSS', 'Прилагодено за мобилни'],
  },
  'Wedding Invitation': {
    description:
      'Интерактивна дигитална покана за двојки што се готват да стапат во брак, за да ги поканат гостите на својата свадбена прослава и да собираат потврди на присуство, поддржана од сопствено API. Сè уште е во изработка: доаѓаат уште многу нови функционалности, особено админ панел со кој ќе се контролира целата страница динамично.',
    category: 'Веб апликација',
    tech: ['Angular', 'API', 'Анимации'],
  },
  'Wedding Invitation API': {
    description: 'Бекенд сервис за гости, потврди на присуство и известувања.',
    category: 'Бекенд',
    tech: ['Node.js', 'REST', 'База на податоци'],
  },
  'Project Four': {
    description: 'Опиши уште еден проект — кој проблем го решава и како.',
    category: 'Open Source',
  },
};

export const RESUME_MK: Resume = {
  ...RESUME,

  profile: {
    ...RESUME.profile,
    roles: ['Software engineer', 'Full-Stack инженер', 'Angular специјалист', 'Problem solver'],
    tagline:
      'Дизајнирам и градам брзи и издржливи софтверски решенија — од прецизни кориснички интерфејси до системите што ги движат.',
    location: 'Скопје, Северна Македонија',
  },

  about: [
    'Јас сум software engineer од Скопје кој сака сложените проблеми да ги претвора во едноставни, елегантни производи. Започнав во 2019 година со изработка на веб-сајтови од нула во CodeDesk, а низ 5+ години и 20+ испорачани проекти таа љубопитност прерасна во градење на големи Angular апликации како постар развивач во Atis Software Factory.',
    'Angular е мојот занает: ми се важни чистиот, модуларен код и интерфејсите што се лесни за користење. Работам целосно од далечина, сакам да прегледувам код и да го споделувам знаењето со тимот, и постојано учам — во моментов се проширувам кон бекенд и облак со Node.js, Azure и AWS, затоа што сакам да градам работи што луѓето навистина ги користат.',
  ],

  // Same order as the English stats; values/suffixes are inherited.
  stats: RESUME.stats.map((s, i) => ({
    ...s,
    label: ['Години искуство', 'Испорачани проекти', 'Технологии', 'Coffee powered'][i] ?? s.label,
  })),

  skillGroups: RESUME.skillGroups.map((g) => ({ ...g, category: SKILL_CATEGORIES[g.category] ?? g.category })),

  experience: RESUME.experience.map((e) => ({ ...e, ...EXPERIENCE[e.company] })),

  projects: RESUME.projects.map((p) => ({ ...p, ...PROJECTS[p.title] })),
};
