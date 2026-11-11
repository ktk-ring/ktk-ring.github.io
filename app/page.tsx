import Link from 'next/link';
import ContactSection from '../components/ContactSection';
import LegacyRedirect from '../components/LegacyRedirect';
import { ServiceIcon, ServiceLink } from '../components/ServiceLink';
import { categories, works } from '../data/works';
import { serviceGroups, services } from '../data/services';
import styles from '../styles/Home.module.css';

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

const youtubeId = (href?: string) => href?.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/)?.[1];

const years = works.map((w) => w.year);
const firstYear = Math.min(...years);
const lastYear = Math.max(...years);

// 최근 영상 작업 4개를 포트폴리오 입구의 미리보기로 쓴다
const previews = works
  .map((w, i) => ({ w, i, id: youtubeId(w.href) }))
  .filter((p): p is typeof p & { id: string } => !!p.id)
  .sort((a, b) => b.w.year - a.w.year || b.i - a.i)
  .slice(0, 4);

const categoryCounts = categories.map((c) => ({ ...c, count: works.filter((w) => w.tags.includes(c.id)).length }));

export default function Home() {
  return (
    <main className="container">
      <LegacyRedirect />

      <header className={`hero ${styles.hero}`}>
        <p className="eyebrow reveal" style={step(0)}>KTK RING</p>
        <h1 className="reveal" style={step(1)}>김태균</h1>
        <p className="role reveal" style={step(2)}>3D · VFX · 테크니컬 아티스트</p>
      </header>

      <div className={styles.doors}>
        <section className={`${styles.door} reveal`} style={step(3)} aria-labelledby="door-portfolio">
          <p className={styles.doorIndex}>
            <span>01</span> Portfolio
          </p>
          <h2 id="door-portfolio" className={styles.doorTitle}>
            <Link href="/portfolio/" className={styles.doorLink}>
              작업 포트폴리오
            </Link>
          </h2>
          <p className={styles.doorMeta}>
            {firstYear}~{lastYear} · 작업 {works.length}개
          </p>

          <ul className={styles.previews} aria-hidden="true">
            {previews.map(({ w, id }) => (
              <li key={w.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" width={480} height={270} loading="lazy" />
              </li>
            ))}
          </ul>

          <ul className={styles.doorChips} aria-label="분류별로 보기">
            {categoryCounts.map((c) => (
              <li key={c.id}>
                <Link href={`/portfolio/?category=${c.id}`} className={styles.doorChip}>
                  {c.label}
                  <span>{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>

          <span className={styles.doorCta} aria-hidden="true">
            포트폴리오 보기 →
          </span>
        </section>

        <section className={`${styles.door} reveal`} style={step(4)} aria-labelledby="door-apps">
          <p className={styles.doorIndex}>
            <span>02</span> Apps &amp; Services
          </p>
          <h2 id="door-apps" className={styles.doorTitle}>
            <Link href="/apps/" className={styles.doorLink}>
              앱과 서비스
            </Link>
          </h2>
          <p className={styles.doorMeta}>
            {serviceGroups.map((g) => `${g.label} ${g.items.length}개`).join(' · ')}
          </p>

          <ul className={styles.doorServices}>
            {services.map((s) => (
              <li key={s.name}>
                <ServiceLink service={s} className={styles.doorService}>
                  <ServiceIcon service={s} className={styles.doorServiceIcon} />
                  <span className={styles.doorServiceText}>
                    <span className={styles.doorServiceName}>{s.name}</span>
                    <span className={styles.doorServiceSummary}>{s.summary}</span>
                  </span>
                  <span className={styles.doorServiceArrow} aria-hidden="true">
                    {s.internal ? '→' : '↗'}
                  </span>
                </ServiceLink>
              </li>
            ))}
          </ul>

          <span className={styles.doorCta} aria-hidden="true">
            전체 보기 →
          </span>
        </section>
      </div>

      <ContactSection />
    </main>
  );
}
