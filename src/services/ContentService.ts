import { useMemo } from 'react';
import { getPortfolioData } from '../data/portfolioData';
import { TRANSLATIONS } from '../data/translations';
import { useLocale } from '../context/LocaleContext';
import { Locale, Milestone, Project, SkillCategory } from '../types';
import { calculateReadingTime, formatReadingTime } from '../utils/readingTime';

export type ContentSectionKey =
  | 'about'
  | 'projects'
  | 'skills'
  | 'arcade'
  | 'journey'
  | 'contact';

export interface AboutSectionContent {
  copy: (typeof TRANSLATIONS)[Locale]['about'];
  contact: {
    email: string;
    secondaryEmail: string;
  };
  textBlocks: string[];
  readingTime: {
    minutes: number;
    wordCount: number;
    label: string;
    wordCountTitle: string;
  };
}

export interface ProjectsSectionContent {
  copy: (typeof TRANSLATIONS)[Locale]['projects'];
  items: Project[];
  textBlocks: string[];
  findById: (projectId: string | null) => Project | null;
}

export interface SkillsSectionContent {
  copy: (typeof TRANSLATIONS)[Locale]['skills'];
  categories: SkillCategory[];
  textBlocks: string[];
  findSkill: (
    categoryNumber: string,
    skillIndex: number
  ) => SkillCategory['skills'][number] | null;
}

export interface ArcadeSectionContent {
  copy: (typeof TRANSLATIONS)[Locale]['arcade'];
  textBlocks: string[];
}

export interface JourneySectionContent {
  copy: (typeof TRANSLATIONS)[Locale]['journey'];
  milestones: Milestone[];
  coreTenet: string;
  textBlocks: string[];
}

export interface ContactSectionContent {
  copy: (typeof TRANSLATIONS)[Locale]['contact'];
  personalInfo: ReturnType<typeof getPortfolioData>['personalInfo'];
  textBlocks: string[];
}

export interface SectionContentMap {
  about: AboutSectionContent;
  projects: ProjectsSectionContent;
  skills: SkillsSectionContent;
  arcade: ArcadeSectionContent;
  journey: JourneySectionContent;
  contact: ContactSectionContent;
}

type SectionLocaleEntry<T> = Record<Locale, () => T>;

function buildAboutSection(locale: Locale): AboutSectionContent {
  const translation = TRANSLATIONS[locale].about;
  const { personalInfo } = getPortfolioData(locale);

  const textBlocks = [
    translation.sectionLabel,
    translation.headingLead,
    translation.headingMuted,
    translation.leadParagraph,
    `${translation.bodyParagraph1BeforeDegree}${translation.degreeStrong}${translation.bodyParagraph1BetweenDegreeAndUni}${translation.uniStrong}${translation.bodyParagraph1AfterUniBeforeC}${translation.cStrong}${translation.andWord}${translation.pythonStrong}${translation.bodyParagraph1AfterPython}`,
    translation.bodyParagraph2,
    translation.locationPin,
    translation.cta,
    ...translation.principles.flatMap((pillar) => [pillar.title, pillar.description]),
  ];

  const { minutes, wordCount } = calculateReadingTime(textBlocks);
  const label = formatReadingTime(minutes, locale);
  const wordCountTitle = locale === 'hi' ? `${wordCount} शब्द` : `${wordCount} words`;

  return {
    copy: translation,
    contact: {
      email: personalInfo.email,
      secondaryEmail: personalInfo.secondaryEmail,
    },
    textBlocks,
    readingTime: {
      minutes,
      wordCount,
      label,
      wordCountTitle,
    },
  };
}

function buildProjectsSection(locale: Locale): ProjectsSectionContent {
  const translation = TRANSLATIONS[locale].projects;
  const { projects } = getPortfolioData(locale);

  const textBlocks = [
    translation.sectionLabel,
    translation.headingLead,
    translation.headingMuted,
    translation.subtitle,
    ...projects.flatMap((p) => [
      p.title,
      p.subtitle,
      p.description,
      p.problemStatement,
      p.solutionSummary,
      ...(p.processSteps ?? []),
      ...(p.resultSummary ? [p.resultSummary] : []),
      ...p.highlights,
    ]),
  ];

  return {
    copy: translation,
    items: projects,
    textBlocks,
    findById: (projectId: string | null) => {
      if (!projectId) return null;
      return projects.find((project) => project.id === projectId) ?? null;
    },
  };
}

function buildSkillsSection(locale: Locale): SkillsSectionContent {
  const translation = TRANSLATIONS[locale].skills;
  const { skillCategories } = getPortfolioData(locale);

  const textBlocks = [
    translation.sectionLabel,
    translation.headingLead,
    translation.headingMuted,
    translation.subtitle,
    translation.activeHorizonsLabel,
    ...translation.horizons,
    ...skillCategories.flatMap((cat) => [
      cat.name,
      cat.description,
      ...cat.skills.flatMap((s) => [s.name, s.level, s.experience, s.details]),
    ]),
  ];

  return {
    copy: translation,
    categories: skillCategories,
    textBlocks,
    findSkill: (categoryNumber: string, skillIndex: number) => {
      const category = skillCategories.find((item) => item.number === categoryNumber);
      if (!category) return null;
      return category.skills[skillIndex] ?? null;
    },
  };
}

function buildArcadeSection(locale: Locale): ArcadeSectionContent {
  const translation = TRANSLATIONS[locale].arcade;

  const textBlocks = [
    translation.sectionLabel,
    translation.headingLead,
    translation.headingMuted,
    translation.subtitle,
    translation.tabs.wordfight,
    translation.tabs.matrix,
    translation.tabs.tictactoe,
    translation.wordFight.title,
    translation.wordFight.subtitle,
    translation.numberGame.title,
    `${translation.numberGame.subtitlePrefix} 7 ${translation.numberGame.subtitleSuffix}`,
    translation.ticTacToe.title,
    translation.ticTacToe.subtitle,
    ...translation.achievements.flatMap((a) => [a.title, a.desc]),
  ];

  return {
    copy: translation,
    textBlocks,
  };
}

function buildJourneySection(locale: Locale): JourneySectionContent {
  const translation = TRANSLATIONS[locale].journey;
  const { milestones, personalInfo } = getPortfolioData(locale);

  const textBlocks = [
    translation.sectionLabel,
    translation.headingLead,
    translation.headingMuted,
    translation.subtitle,
    translation.quoteBody,
    translation.rbuTitle,
    translation.rbuDesc,
    personalInfo.coreTenet,
    ...milestones.flatMap((m) => [
      m.period,
      m.title,
      m.organization,
      m.description,
      m.takeaway,
    ]),
  ];

  return {
    copy: translation,
    milestones,
    coreTenet: personalInfo.coreTenet,
    textBlocks,
  };
}

function buildContactSection(locale: Locale): ContactSectionContent {
  const translation = TRANSLATIONS[locale].contact;
  const { personalInfo } = getPortfolioData(locale);

  const textBlocks = [
    translation.sectionLabel,
    translation.headingLead,
    translation.headingAccent,
    translation.subtitle,
    translation.primaryPriority,
    translation.secondaryPriority,
    translation.phoneLabel,
    translation.campusLabel,
    translation.formTitle,
    translation.formSubtitlePrefix,
    personalInfo.location,
  ];

  return {
    copy: translation,
    personalInfo,
    textBlocks,
  };
}

const SECTION_LOCALE_MAP: {
  [K in ContentSectionKey]: SectionLocaleEntry<SectionContentMap[K]>;
} = {
  about: {
    en: () => buildAboutSection('en'),
    hi: () => buildAboutSection('hi'),
  },
  projects: {
    en: () => buildProjectsSection('en'),
    hi: () => buildProjectsSection('hi'),
  },
  skills: {
    en: () => buildSkillsSection('en'),
    hi: () => buildSkillsSection('hi'),
  },
  arcade: {
    en: () => buildArcadeSection('en'),
    hi: () => buildArcadeSection('hi'),
  },
  journey: {
    en: () => buildJourneySection('en'),
    hi: () => buildJourneySection('hi'),
  },
  contact: {
    en: () => buildContactSection('en'),
    hi: () => buildContactSection('hi'),
  },
};

export const ContentService = {
  supportedLocales: ['en', 'hi'] as const,

  sections: SECTION_LOCALE_MAP,

  getSection<K extends ContentSectionKey>(
    section: K,
    locale: Locale
  ): SectionContentMap[K] {
    const sectionMap = SECTION_LOCALE_MAP[section];
    const resolver = sectionMap[locale] ?? sectionMap.en;
    return resolver();
  },

  getSectionVariants<K extends ContentSectionKey>(
    section: K
  ): Record<Locale, SectionContentMap[K]> {
    const sectionMap = SECTION_LOCALE_MAP[section];
    return {
      en: sectionMap.en(),
      hi: sectionMap.hi(),
    };
  },

  getSectionTextBlocks(section: ContentSectionKey, locale: Locale): string[] {
    return this.getSection(section, locale).textBlocks;
  },
};

/**
 * React hook powered by LocaleContext + ContentService.
 * Subscribes to locale changes so section headings, copy, cards, and modals
 * re-render dynamically whenever the user switches between English and Hindi.
 */
export function useSectionContent<K extends ContentSectionKey>(section: K) {
  const { locale, setLocale, toggleLocale } = useLocale();

  const content = useMemo(
    () => ContentService.getSection(section, locale),
    [section, locale]
  );

  return {
    locale,
    setLocale,
    toggleLocale,
    content,
  };
}
