'use client';

import { AnimatedReveal } from './animated-reveal';
import { Star, GitFork } from 'lucide-react';
import type { ProjectItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  'C#': '#178600',
  Dockerfile: '#384d54',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
};

// GitHub-style repo book icon
const RepoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z" />
  </svg>
);

interface Props {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: Props) {
  const { locale, t } = useLocale();

  return (
    <section id="projects" className="px-4 sm:px-6" style={{ paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}>
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <div className="section-heading">{t('projects.title')}</div>
        </AnimatedReveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project, i) => {
            const desc = locale === 'en' && project.descriptionEn
              ? project.descriptionEn
              : project.description;
            const langColor = LANG_COLORS[project.language] ?? '#6b7280';
            return (
              <AnimatedReveal key={i} delay={i * 60}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-ds hover-glow"
                >
                  {/* Name */}
                  <div
                    className="flex items-center gap-2 font-mono text-sm font-semibold"
                    style={{ color: 'var(--brand-primary)' }}
                  >
                    <RepoIcon />
                    {project.name}
                  </div>

                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed line-clamp-2 flex-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {desc}
                  </p>

                  {/* Meta */}
                  <div
                    className="flex items-center gap-3 text-xs font-mono"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <span
                        className="repo-lang-dot"
                        style={{ backgroundColor: langColor }}
                      />
                      <span style={{ color: 'var(--text-muted)' }}>{project.language}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" style={{ color: 'var(--gh-orange)' }} />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {project.forks}
                    </span>
                  </div>
                </a>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
