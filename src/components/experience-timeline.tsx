'use client';

import { AnimatedReveal } from './animated-reveal';
import type { ExperienceItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  experience: ExperienceItem[];
}

export function ExperienceTimeline({ experience }: Props) {
  const { locale, t } = useLocale();

  return (
    <section id="experience" className="px-4 sm:px-6" style={{ paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}>
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <div className="section-heading">{t('experience.title')}</div>
        </AnimatedReveal>

        <div className="ds-timeline">
          {experience.map((item, i) => {
            const title = locale === 'en' && item.titleEn ? item.titleEn : item.title;
            const company = locale === 'en' && item.companyEn ? item.companyEn : item.company;
            const period = locale === 'en' && item.periodEn ? item.periodEn : item.period;
            const description = locale === 'en' && item.descriptionEn ? item.descriptionEn : item.description;

            return (
              <AnimatedReveal key={i} delay={i * 80}>
                <div className="ds-timeline-item">
                  <div className="ds-timeline-dot" />
                  <div className="ds-period-badge">{period}</div>
                  <h3 className="text-base font-semibold mb-0.5" style={{ color: 'var(--text)' }}>
                    {title}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--brand-primary)' }}>
                    {company}
                  </p>
                  {description && (
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {description}
                    </p>
                  )}
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
