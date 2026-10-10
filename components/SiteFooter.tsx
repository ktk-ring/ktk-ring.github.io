import styles from '../styles/Site.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>© 2024 김태균 (ktk_ring). All rights reserved.</p>
        <nav aria-label="외부 링크" className={styles.nav}>
          <a href="https://www.instagram.com/ktk_ring" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.youtube.com/@ktk_ring" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="mailto:ktk03115@gmail.com">Email</a>
          <a href="#top">맨 위로 ↑</a>
        </nav>
      </div>
    </footer>
  );
}
