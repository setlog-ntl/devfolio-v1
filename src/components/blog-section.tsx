'use client';

import { AnimatedReveal } from './animated-reveal';
import type { BlogPost } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  posts: BlogPost[];
}

export function BlogSection({ posts }: Props) {
  const { locale, t } = useLocale();

  return (
    <section id="blog" className="px-4 sm:px-6" style={{ paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}>
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <div className="section-heading">{t('blog.title')}</div>
        </AnimatedReveal>

        <div className="flex flex-col gap-3">
          {posts.map((post, i) => {
            const title = locale === 'en' && post.titleEn ? post.titleEn : post.title;
            return (
              <AnimatedReveal key={i} delay={i * 50}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-card-ds group"
                >
                  <span
                    className="text-sm font-medium flex-1 min-w-0 truncate transition-colors group-hover:text-[var(--brand-secondary)]"
                    style={{ color: 'var(--text)' }}
                  >
                    {title}
                  </span>
                  <span
                    className="font-mono text-xs shrink-0"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    {post.date}
                  </span>
                  <span
                    className="text-sm shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: 'var(--text-dim)' }}
                    aria-hidden="true"
                  >
                    &#x2197;
                  </span>
                </a>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
