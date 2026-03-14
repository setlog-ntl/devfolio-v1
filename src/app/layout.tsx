import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/lib/config';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: `${siteConfig.name} — 개발자 포트폴리오`,
  description: siteConfig.tagline,
  openGraph: {
    title: `${siteConfig.name} — 개발자 포트폴리오`,
    description: siteConfig.tagline,
    type: 'website',
    images: ['/api/og'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — 개발자 포트폴리오`,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const preset = siteConfig.designPreset || 'github-dark';
  return (
    <html
      lang="ko"
      data-preset={preset}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* Inline theme init — prevents FOUC */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('ds-theme');if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})()` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfilePage',
              mainEntity: {
                '@type': 'Person',
                name: siteConfig.name,
                description: siteConfig.tagline,
                ...(siteConfig.email ? { email: siteConfig.email } : {}),
                ...(siteConfig.githubUsername
                  ? { sameAs: [`https://github.com/${siteConfig.githubUsername}`] }
                  : {}),
                ...(siteConfig.skills?.length ? { knowsAbout: siteConfig.skills.map((s: { name: string }) => s.name) } : {}),
              },
            }),
          }}
        />
      </head>
      <body className={`antialiased ${jetbrainsMono.variable}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:shadow-lg focus:text-sm"
        >
          본문으로 바로가기
        </a>
        {children}
      </body>
    </html>
  );
}
