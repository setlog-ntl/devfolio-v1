'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/lib/i18n';
import { LanguageToggle } from './language-toggle';
import { siteConfig } from '@/lib/config';

const sectionIds = ['hero', 'about', 'projects', 'experience', 'contact'];

const sectionKeys: Record<string, string> = {
  hero: 'nav.home',
  about: 'nav.about',
  projects: 'nav.projects',
  experience: 'nav.experience',
  contact: 'nav.contact',
};

export function NavHeader() {
  const [active, setActive] = useState('hero');
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { t } = useLocale();

  useEffect(() => {
    // Read persisted theme
    try {
      const saved = localStorage.getItem('ds-theme');
      if (saved === 'light') setTheme('light');
    } catch (_) {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) setProgress((window.scrollY / h) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('ds-theme', next); } catch (_) {}
  };

  const slug = (siteConfig.nameEn || siteConfig.name).toLowerCase().replace(/\s+/g, '-');

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[52px]"
        style={{
          background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        {/* Logo */}
        <div
          className="font-mono text-sm"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.02em' }}
        >
          <span style={{ color: 'var(--brand-primary)' }}>~/</span>
          {slug}
        </div>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-0.5">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-xs px-3 py-1.5 rounded-md transition-colors"
              style={{
                color: active === id ? 'var(--text)' : 'var(--text-muted)',
                background: active === id ? 'var(--bg-card)' : 'transparent',
              }}
            >
              {t(sectionKeys[id])}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            className="text-sm px-2.5 py-1.5 rounded-md transition-all"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              background: 'none',
              cursor: 'pointer',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-primary)';
              e.currentTarget.style.color = 'var(--brand-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </header>

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
    </>
  );
}
