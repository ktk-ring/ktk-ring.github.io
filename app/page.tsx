import WorkBrowser from '../components/WorkBrowser';

const contacts: { label: string; value: string; href?: string }[] = [
  { label: '이메일', value: 'ktk03115@gmail.com', href: 'mailto:ktk03115@gmail.com' },
  { label: '이메일', value: 'ktk03115@naver.com', href: 'mailto:ktk03115@naver.com' },
  { label: '전화번호', value: '+82 10-4089-8285', href: 'tel:+821040898285' },
  { label: '카카오톡', value: 'ktk03115' },
  { label: '인스타그램', value: '@ktk_ring', href: 'https://www.instagram.com/ktk_ring' },
  { label: '유튜브', value: '반지 RING', href: 'https://www.youtube.com/@ktk_ring' },
];

export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <h1>김태균</h1>
        <p className="subtitle">
          작업 포트폴리오 · Last Update 2024.07
        </p>
      </header>

      <WorkBrowser />

      <section id="contact" className="contact">
        <h2>CONTACT</h2>
        <ul>
          {contacts.map((c) => (
            <li key={`${c.label}-${c.value}`}>
              <span>{c.label}</span>
              {c.href ? (
                <a
                  href={c.href}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {c.value}
                </a>
              ) : (
                c.value
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
