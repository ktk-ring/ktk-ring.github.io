'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Site.module.css';

const sections = [
  { href: '/portfolio/', label: 'Portfolio', match: '/portfolio' },
  { href: '/apps/', label: 'Apps', match: '/apps' },
];

export default function SiteHeader() {
  const pathname = usePathname() ?? '/';
  // Contact 영역은 홈 · 포트폴리오 · 앱 페이지에 있다. 그 밖의 페이지(Editables 소개 등)에서는 홈의 Contact로 보낸다
  const hasContact = pathname === '/' || sections.some((s) => pathname.startsWith(s.match));

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          김태균 <span>KTK RING</span>
        </Link>
        <nav aria-label="주요 메뉴" className={styles.nav}>
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              aria-current={pathname.startsWith(s.match) ? 'page' : undefined}
            >
              {s.label}
            </Link>
          ))}
          <a href={hasContact ? '#contact' : '/#contact'}>Contact</a>
        </nav>
      </div>
    </header>
  );
}
