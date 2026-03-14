'use client';

import { AnimatedReveal } from './animated-reveal';
import { useLocale } from '@/lib/i18n';

interface Props {
  username: string;
}

export function GithubGraph({ username }: Props) {
  const { t } = useLocale();

  return (
    <section className="px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <div className="github-graph-wrap">
            <img
              src={`https://ghchart.rshah.org/58a6ff/${username}`}
              alt={`${username} ${t('github.alt')}`}
              className="w-full max-w-full"
              loading="lazy"
            />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
