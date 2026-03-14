import type { ReactNode } from 'react';
import { AnimatedReveal } from './animated-reveal';

type RevealVariant = 'fade' | 'slide-left' | 'slide-right' | 'scale';

interface Props {
  id?: string;
  ariaLabel?: string;
  className?: string;
  animate?: boolean;
  delay?: number;
  variant?: RevealVariant;
  children: ReactNode;
}

export function SectionWrapper({
  id,
  ariaLabel,
  className = '',
  animate = true,
  delay = 0,
  variant = 'fade',
  children,
}: Props) {
  const section = (
    <section id={id} aria-label={ariaLabel} className={`section-gap px-[var(--section-padding-x,1rem)] ${className}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );

  if (!animate) return section;
  return <AnimatedReveal delay={delay} variant={variant}>{section}</AnimatedReveal>;
}
