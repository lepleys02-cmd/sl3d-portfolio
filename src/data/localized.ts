import type { Lang } from '../i18n/config';
import { defaultLang } from '../i18n/config';
import { projects, collections } from './projects';
import type { Project, Collection } from './projects';
import { projectsNl, collectionsNl } from './content.nl';
import type { ProjectCopy, CollectionCopy } from './content.nl';

/**
 * Locale-aware views over `projects.ts`.
 *
 * The merge is explicit rather than a generic deep-merge so that a new
 * translatable field on `Project` fails loudly here (TypeScript flags the
 * missing branch) instead of silently shipping English inside a Dutch page.
 */

const projectCopy: Record<Lang, Record<string, ProjectCopy>> = {
  en: {},
  nl: projectsNl,
};

const collectionCopy: Record<Lang, Record<string, CollectionCopy>> = {
  en: {},
  nl: collectionsNl,
};

function mergeProject(project: Project, copy: ProjectCopy | undefined): Project {
  if (!copy) return project;
  return {
    ...project,
    title: copy.title ?? project.title,
    discipline: copy.discipline ?? project.discipline,
    description: copy.description ?? project.description,
    brief: copy.brief ?? project.brief,
    approach: copy.approach ?? project.approach,
    facts: copy.facts ?? project.facts,
    process: project.process ? { ...project.process, ...(copy.process ?? {}) } : undefined,
    pairs: project.pairs?.map((pair, i) => ({ ...pair, ...(copy.pairs?.[i] ?? {}) })),
    stillToMotion: project.stillToMotion
      ? { ...project.stillToMotion, ...(copy.stillToMotion ?? {}) }
      : undefined,
    sheets: project.sheets?.map((sheet, i) => ({ ...sheet, ...(copy.sheets?.[i] ?? {}) })),
    scrollFeature: project.scrollFeature
      ? {
          ...project.scrollFeature,
          chapters: project.scrollFeature.chapters.map((chapter, i) => ({
            ...chapter,
            label: copy.chapters?.[i] ?? chapter.label,
          })),
        }
      : undefined,
  };
}

function mergeCollection(collection: Collection, copy: CollectionCopy | undefined): Collection {
  if (!copy) return collection;
  return {
    ...collection,
    title: copy.title ?? collection.title,
    kicker: copy.kicker ?? collection.kicker,
    discipline: copy.discipline ?? collection.discipline,
    description: copy.description ?? collection.description,
    intro: copy.intro ?? collection.intro,
    facets: copy.facets ?? collection.facets,
  };
}

export function getProjects(lang: Lang = defaultLang): Project[] {
  const copy = projectCopy[lang] ?? {};
  return projects.map((project) => mergeProject(project, copy[project.slug]));
}

export function getCollections(lang: Lang = defaultLang): Collection[] {
  const copy = collectionCopy[lang] ?? {};
  return collections.map((collection) => mergeCollection(collection, copy[collection.slug]));
}

export type { Project, Collection };
