'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  config: SiteConfig;
}

function useTypingAnimation(texts: string[], speed = 80, pause = 2000) {
  const stateRef = useRef({
    displayed: '',
    textIndex: 0,
    charIndex: 0,
    deleting: false,
  });
  const listenersRef = useRef(new Set<() => void>());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  const notify = useCallback(() => {
    listenersRef.current.forEach((cb) => cb());
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    const current = texts[s.textIndex] ?? '';

    if (!s.deleting && s.charIndex <= current.length) {
      s.displayed = current.slice(0, s.charIndex);
      s.charIndex++;
      notify();
      timerRef.current = setTimeout(tick, speed);
    } else if (!s.deleting && s.charIndex > current.length) {
      s.deleting = true;
      timerRef.current = setTimeout(tick, pause);
    } else if (s.deleting && s.charIndex > 0) {
      s.charIndex--;
      s.displayed = current.slice(0, s.charIndex);
      notify();
      timerRef.current = setTimeout(tick, speed / 2);
    } else if (s.deleting && s.charIndex === 0) {
      s.deleting = false;
      s.textIndex = (s.textIndex + 1) % texts.length;
      timerRef.current = setTimeout(tick, speed);
    }
  }, [texts, speed, pause, notify]);

  if (typeof window !== 'undefined' && !startedRef.current) {
    startedRef.current = true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      stateRef.current.displayed = texts[0] ?? '';
    } else {
      setTimeout(tick, speed);
    }
  }

  const getSnapshot = useCallback(() => stateRef.current.displayed, []);
  const getServerSnapshot = useCallback(() => '', []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function HeroSection({ config }: Props) {
  const { locale, t } = useLocale();
  const name = locale === 'en' && config.nameEn ? config.nameEn : config.name;
  const nameEn = config.nameEn || config.name;
  const taglineRaw = locale === 'en' && config.taglineEn ? config.taglineEn : config.tagline;

  const taglines = taglineRaw.includes('|')
    ? taglineRaw.split('|').map((s) => s.trim())
    : [taglineRaw];
  const typed = useTypingAnimation(taglines);

  const slug = nameEn.toLowerCase().replace(/\s+/g, '-');

  // Build the stack array from skills names (up to 4)
  const stack = config.skills.slice(0, 4).map((s) => s.name);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-[52px]"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-2xl editor-window">
        {/* Tab bar */}
        <div className="editor-tab-bar">
          <div className="traffic-lights">
            <div className="tl tl-red" />
            <div className="tl tl-yellow" />
            <div className="tl tl-green" />
          </div>
          <div className="editor-tab active">developer.ts</div>
          <div className="editor-tab">README.md</div>
        </div>

        {/* Code body */}
        <div className="editor-body">
          <div className="code-line">
            <div className="ln">1</div>
            <div className="code-content">
              <span className="t-kw">const</span>
              <span> developer </span>
              <span className="t-pun">= &#123;</span>
            </div>
          </div>
          <div className="code-line">
            <div className="ln">2</div>
            <div className="code-content">
              &nbsp;&nbsp;<span className="t-prp">name</span><span className="t-pun">:</span>
              <span className="t-str"> &quot;{name}&quot;</span><span className="t-pun">,</span>
            </div>
          </div>
          {nameEn !== name && (
            <div className="code-line">
              <div className="ln">3</div>
              <div className="code-content">
                &nbsp;&nbsp;<span className="t-prp">nameEn</span><span className="t-pun">:</span>
                <span className="t-str"> &quot;{nameEn}&quot;</span><span className="t-pun">,</span>
              </div>
            </div>
          )}
          <div className="code-line">
            <div className="ln">{nameEn !== name ? '4' : '3'}</div>
            <div className="code-content">
              &nbsp;&nbsp;<span className="t-prp">role</span><span className="t-pun">:</span>
              <span className="t-str"> &quot;{taglines[0]}&quot;</span><span className="t-pun">,</span>
            </div>
          </div>
          {stack.length > 0 && (
            <div className="code-line">
              <div className="ln">{nameEn !== name ? '5' : '4'}</div>
              <div className="code-content">
                &nbsp;&nbsp;<span className="t-prp">stack</span><span className="t-pun">: [</span>
                {stack.map((s, i) => (
                  <span key={s}>
                    <span className="t-str">&quot;{s}&quot;</span>
                    {i < stack.length - 1 && <span className="t-pun">, </span>}
                  </span>
                ))}
                <span className="t-pun">],</span>
              </div>
            </div>
          )}
          <div className="code-line">
            <div className="ln">{nameEn !== name ? '6' : '5'}</div>
            <div className="code-content">
              &nbsp;&nbsp;<span className="t-prp">available</span><span className="t-pun">:</span>
              <span className="t-acc"> true</span>
              <span className="cursor-blink" aria-hidden="true" />
              <span className="t-pun">,</span>
            </div>
          </div>
          <div className="code-line">
            <div className="ln">{nameEn !== name ? '7' : '6'}</div>
            <div className="code-content">
              <span className="t-pun">&#125;</span>
            </div>
          </div>
        </div>

        {/* Terminal prompt */}
        <div className="terminal-line">
          <span className="terminal-prompt" aria-hidden="true">&#9655;</span>
          <span className="terminal-text font-mono text-sm">
            {typed}
            <span className="typing-cursor ml-0.5" aria-hidden="true" />
          </span>
        </div>

        {/* CTA */}
        <div className="hero-actions">
          {config.email && (
            <a href="#contact" className="ds-btn ds-btn-primary">
              {t('contact.cta')}
            </a>
          )}
          {config.githubUsername && (
            <a
              href={`https://github.com/${config.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-btn ds-btn-secondary"
            >
              GitHub
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
          {config.resumeUrl && (
            <a
              href={config.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-btn ds-btn-secondary"
            >
              {t('hero.resume')}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
