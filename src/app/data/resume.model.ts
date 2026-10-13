export interface Profile {
  name: string;
  /** Rotating titles shown with the typewriter effect in the hero. */
  roles: string[];
  tagline: string;
  location: string;
  email: string;
  phone?: string;
  /** Path to a photo in /public (e.g. 'me.jpg'). Leave empty to show initials. */
  avatar?: string;
  /** Path to a PDF in /public (e.g. 'resume.pdf'). Leave empty to hide the button. */
  resumeUrl?: string;
  availableForWork: boolean;
}

export type SocialIcon = 'github' | 'linkedin' | 'instagram' | 'mail' | 'web';

export interface Social {
  label: string;
  url: string;
  icon: SocialIcon;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface Skill {
  name: string;
  /** 0 – 100 */
  level: number;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  title: string;
  description: string;
  category: string;
  tech: string[];
  link?: string;
  repo?: string;
  featured?: boolean;
}

export interface Resume {
  profile: Profile;
  socials: Social[];
  about: string[];
  stats: Stat[];
  skillGroups: SkillGroup[];
  experience: Experience[];
  projects: Project[];
}
