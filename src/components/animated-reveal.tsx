'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealVariant = 'fade' | 'slide-left' | 'slide-right' | 'scale';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}

export function AnimatedReveal({ children, className = '', delay = 0, variant = 'fade' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) { setTimeout(() => setVisible(true), delay); }
          else { setVisible(true); }
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const variantClass = variant === 'fade' ? 'reveal-fade'
    : variant === 'slide-left' ? 'reveal-slide-left'
    : variant === 'slide-right' ? 'reveal-slide-right'
    : 'reveal-scale';

  return (
    <div ref={ref} className={`${variantClass} ${visible ? 'revealed' : ''} ${className}`}>
      {children}
    </div>
  );
}
