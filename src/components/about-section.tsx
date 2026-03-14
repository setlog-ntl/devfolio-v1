'use client';

import { useEffect, useRef } from 'react';
import { AnimatedReveal } from './animated-reveal';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  config: SiteConfig;
}

export function AboutSection({ config }: Props) {
  const { locale, t } = useLocale();
  const about = locale === 'en' && config.aboutEn ? config.aboutEn : config.about;
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach((bar) => {
              const level = bar.getAttribute('data-level') ?? '0';
              bar.style.width = `${level}%`;
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="px-4 sm:px-6" style={{ paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}>
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <div className="section-heading">{t('about.title')}</div>
        </AnimatedReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio */}
          <AnimatedReveal>
            <p
              className="text-sm leading-[1.8] whitespace-pre-line"
              style={{ color: 'var(--text-muted)' }}
            >
              {about}
            </p>
          </AnimatedReveal>

          {/* Skills */}
          <AnimatedReveal delay={100}>
            <div ref={skillsRef} className="flex flex-col gap-4">
              <h3
                className="font-mono text-sm font-semibold mb-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {t('about.skills')}
              </h3>
              {config.skills.map((skill, i) => {
                const pct = typeof skill.level === 'number'
                  ? skill.level
                  : skill.level === 'advanced' ? 90 : skill.level === 'intermediate' ? 65 : 35;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-sm font-medium" style={{ color: 'var(--text)' }}>
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                        {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-light)' }}>
                      <div
                        className="skill-bar-fill"
                        data-level={pct}
                        style={{ animationDelay: `${i * 80}ms` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
