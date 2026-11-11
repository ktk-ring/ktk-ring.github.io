import ContactSection from '../../components/ContactSection';
import { ServiceLink, ServiceIcon } from '../../components/ServiceLink';
import { pageMetadata } from '../../data/site';
import { serviceGroups } from '../../data/services';
import styles from '../../styles/Home.module.css';

export const metadata = pageMetadata({
  title: 'Apps & Services | 김태균',
  description: '김태균(ktk_ring)이 직접 만든 앱과 웹 서비스. 작업 도구 Editables, 환승 열차 탐색, 워드샐러드 생성기',
  path: '/apps/',
});

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Apps() {
  return (
    <main className="container">
      <header className="hero">
        <p className="eyebrow reveal" style={step(0)}>02 · Apps &amp; Services</p>
        <h1 className="reveal" style={step(1)}>앱과 서비스</h1>
        <p className="role reveal" style={step(2)}>필요해서, 혹은 재미로 직접 만든 것들이에요.</p>
      </header>

      {serviceGroups.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
          className={`${styles.group} reveal`}
          style={step(3 + gi)}
        >
          <div className={styles.groupHead}>
            <h2 id={`${group.id}-title`}>{group.label}</h2>
            <p>{group.caption}</p>
            {group.more && (
              <a className={styles.groupMore} href={group.more.href} target="_blank" rel="noopener noreferrer">
                {group.more.label} ↗
              </a>
            )}
          </div>

          <ul className={styles.serviceGrid}>
            {group.items.map((s) => (
              <li key={s.name} className={s.wide ? styles.wide : undefined}>
                <ServiceLink service={s} className={styles.serviceCard}>
                  {s.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className={styles.serviceImage} src={s.image} alt="" width={1600} height={1000} loading="lazy" />
                  )}
                  <span className={styles.serviceBody}>
                    <ServiceIcon service={s} className={styles.serviceIcon} />
                    <span className={styles.serviceText}>
                      <span className={styles.serviceName}>{s.name}</span>
                      <span className={styles.serviceSummary}>{s.summary}</span>
                    </span>
                    <span className={styles.servicePlatform}>{s.platform}</span>
                  </span>
                  <span className={styles.serviceCta}>{s.internal ? '자세히 보기 →' : '열기 ↗'}</span>
                </ServiceLink>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <ContactSection />
    </main>
  );
}
