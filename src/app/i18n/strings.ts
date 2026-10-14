/**
 * UI strings (labels, buttons, headings). The résumé *content* itself lives in
 * data/resume.data.ts (English) and data/resume.data.mk.ts (Macedonian).
 *
 * `{name}`-style placeholders are filled in by I18n.t(key, { name: '…' }).
 */
export const EN = {
  // nav
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.experience': 'Experience',
  'nav.projects': 'Projects',
  'nav.terminal': 'Terminal',
  'nav.contact': 'Contact',
  'nav.palette': 'Command palette',
  'nav.menu': 'Menu',
  'lang.label': 'Language',

  // section headings (plain + gradient part)
  'about.h1': 'About',
  'about.h2': 'me',
  'skills.h2': 'Skills',
  'experience.h1': 'Experience',
  'experience.h2': 'log',
  'projects.h1': 'Selected',
  'projects.h2': 'projects',
  'terminal.h1': 'Interactive',
  'terminal.h2': 'shell',
  'contact.h1': "Let's",
  'contact.h2': 'connect',

  // hero
  'hero.available': 'Available for new opportunities',
  'hero.hi': "Hi, I'm",
  'hero.work': 'View my work',
  'hero.resume': 'Résumé',
  'hero.touch': 'Get in touch',

  // projects
  'projects.all': 'All',
  'projects.featured': '★ featured',
  'projects.code': 'Code',
  'projects.live': 'Live',

  // contact
  'contact.lead1': 'Have a project in mind, a role to fill, or just want to talk tech?',
  'contact.lead2': 'My inbox is always open.',
  'contact.copy': 'Copy email',
  'contact.copied': 'Email copied',
  'contact.hello': 'Say hello',

  // toast
  'toast.copied': 'Copied to clipboard',
  'toast.copyFailed': 'Copy failed',

  // command palette
  'palette.placeholder': 'Type a command or search…',
  'palette.empty': 'No matching commands',
  'palette.navigate': 'navigate',
  'palette.run': 'run',
  'palette.goto': 'Go to',
  'palette.action': 'Action',
  'palette.link': 'Link',
  'palette.language': 'Language',
  'palette.top': 'Top',
  'palette.copyEmail': 'Copy email address',
  'palette.downloadResume': 'Download résumé (PDF)',
  'palette.open': 'Open {name}',
  'palette.switchTo': 'Switch to {name}',

  // terminal
  'term.welcome': "Welcome to {name}'s portfolio shell v1.0",
  'term.hint': "Type 'help' to see available commands.",
  'term.try': 'Try',
  'term.or': 'or',
  'term.input': 'Terminal input',
  'term.notFound': "command not found: {name}. Type 'help'.",
  'term.usage': 'usage: goto <{list}>',
  'term.navigating': 'Navigating to {name}…',
  'term.sudo': 'Permission denied: nice try though 😉',
  'term.cmd.help': 'List available commands',
  'term.cmd.whoami': 'Who is this?',
  'term.cmd.about': 'Short bio',
  'term.cmd.skills': 'Skill overview',
  'term.cmd.experience': 'Work history',
  'term.cmd.projects': 'List projects',
  'term.cmd.contact': 'How to reach me',
  'term.cmd.goto': 'Scroll to a section (goto <name>)',
  'term.cmd.date': 'Current date & time',
  'term.cmd.echo': 'Print text',
  'term.cmd.clear': 'Clear the screen',
} as const;

export type StringKey = keyof typeof EN;

export const MK: Record<StringKey, string> = {
  'nav.about': 'За мене',
  'nav.skills': 'Вештини',
  'nav.experience': 'Искуство',
  'nav.projects': 'Проекти',
  'nav.terminal': 'Терминал',
  'nav.contact': 'Контакт',
  'nav.palette': 'Палета со команди',
  'nav.menu': 'Мени',
  'lang.label': 'Јазик',

  'about.h1': 'За',
  'about.h2': 'мене',
  'skills.h2': 'Вештини',
  'experience.h1': 'Работно',
  'experience.h2': 'искуство',
  'projects.h1': 'Избрани',
  'projects.h2': 'проекти',
  'terminal.h1': 'Интерактивен',
  'terminal.h2': 'терминал',
  'contact.h1': 'Да се',
  'contact.h2': 'поврземе',

  'hero.available': 'Достапен за нови можности',
  'hero.hi': 'Здраво, јас сум',
  'hero.work': 'Погледни ги проектите',
  'hero.resume': 'Биографија',
  'hero.touch': 'Јави ми се',

  'projects.all': 'Сите',
  'projects.featured': '★ издвоен',
  'projects.code': 'Код',
  'projects.live': 'Во живо',

  'contact.lead1': 'Имаш идеја за проект, отворена позиција или едноставно сакаш да разговараме за технологија?',
  'contact.lead2': 'Моето сандаче е секогаш отворено.',
  'contact.copy': 'Копирај е-пошта',
  'contact.copied': 'Е-поштата е копирана',
  'contact.hello': 'Поздрави',

  'toast.copied': 'Копирано',
  'toast.copyFailed': 'Копирањето не успеа',

  'palette.placeholder': 'Впиши команда или пребарај…',
  'palette.empty': 'Нема соодветни команди',
  'palette.navigate': 'движење',
  'palette.run': 'изврши',
  'palette.goto': 'Оди до',
  'palette.action': 'Акција',
  'palette.link': 'Линк',
  'palette.language': 'Јазик',
  'palette.top': 'На врвот',
  'palette.copyEmail': 'Копирај е-пошта',
  'palette.downloadResume': 'Преземи биографија (PDF)',
  'palette.open': 'Отвори {name}',
  'palette.switchTo': 'Префрли на {name}',

  'term.welcome': 'Добредојде во терминалот на портфолиото на {name} v1.0',
  'term.hint': "Впиши 'help' за листа на достапни команди.",
  'term.try': 'Пробај',
  'term.or': 'или',
  'term.input': 'Внес во терминалот',
  'term.notFound': "непозната команда: {name}. Впиши 'help'.",
  'term.usage': 'употреба: goto <{list}>',
  'term.navigating': 'Одам до {name}…',
  'term.sudo': 'Пристапот е одбиен: добар обид сепак 😉',
  'term.cmd.help': 'Листа на достапни команди',
  'term.cmd.whoami': 'Кој е ова?',
  'term.cmd.about': 'Кратка биографија',
  'term.cmd.skills': 'Преглед на вештини',
  'term.cmd.experience': 'Работна историја',
  'term.cmd.projects': 'Листа на проекти',
  'term.cmd.contact': 'Како да ме контактираш',
  'term.cmd.goto': 'Оди до секција (goto <име>)',
  'term.cmd.date': 'Тековен датум и време',
  'term.cmd.echo': 'Испечати текст',
  'term.cmd.clear': 'Исчисти го екранот',
};
