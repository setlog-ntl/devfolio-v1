import { siteConfig } from '@/lib/config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="px-4 py-6 text-center font-mono text-xs"
      style={{ borderTop: '1px solid var(--border-light)', color: 'var(--text-dim)' }}
    >
      built with{' '}
      <a
        href="https://www.linkmap.biz/sites?utm_source=badge&utm_medium=referral&utm_campaign=dev-showcase"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'var(--brand-primary)' }}
        className="hover:underline"
      >
        linkmap
      </a>
      {' · '}
      &copy; {year} {siteConfig.name}
    </footer>
  );
}
