import Link from 'next/link';
import styles from '../styles/Site.module.css';

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          김태균 <span>KTK RING</span>
        </Link>
        <nav aria-label="주요 메뉴" className={styles.nav}>
          <a href="/#works">Works</a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
