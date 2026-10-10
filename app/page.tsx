import WorkBrowser from '../components/WorkBrowser';

interface ContactValue {
  value: string;
  href?: string;
}

const contacts: { label: string; values: ContactValue[] }[] = [
  {
    label: '이메일',
    values: [
      { value: 'ktk03115@gmail.com', href: 'mailto:ktk03115@gmail.com' },
      { value: 'ktk03115@naver.com', href: 'mailto:ktk03115@naver.com' },
    ],
  },
  { label: '카카오톡', values: [{ value: 'ktk03115' }] },
  { label: '인스타그램', values: [{ value: '@ktk_ring', href: 'https://www.instagram.com/ktk_ring' }] },
  { label: '유튜브', values: [{ value: '반지 RING', href: 'https://www.youtube.com/@ktk_ring' }] },
];

const tools: { label: string; items: string[] }[] = [
  {
    label: '3D 그래픽 디자인',
    items: [
      'Cinema 4D',
      'Octane Render',
      'Redshift',
      'Unreal Engine',
      'Blender',
      'Maya',
      'Substance 3D Painter',
      'Substance 3D Designer',
    ],
  },
  {
    label: '2D 그래픽 디자인',
    items: ['Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Premiere Pro', 'Animate', 'Figma'],
  },
  {
    label: '프로그래밍 및 코딩 (개발)',
    items: ['Unreal Engine', 'JavaScript', 'p5.js', 'React', 'Next.js', 'Python', 'Arduino', 'Java'],
  },
];

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <h1 className="reveal" style={step(0)}>김태균</h1>
        <p className="role reveal" style={step(1)}>3D · VFX · 테크니컬 아티스트</p>
        <p className="subtitle reveal" style={step(2)}>
          작업 포트폴리오 · Last Update 2026.10
        </p>

        <dl className="tools reveal" style={step(3)}>
          {tools.map((group) => (
            <div key={group.label} className="tool-group">
              <dt>{group.label}</dt>
              <dd>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <WorkBrowser />

      <section id="contact" className="contact">
        <h2>CONTACT</h2>
        <ul>
          {contacts.map((c) => (
            <li key={c.label}>
              <span>{c.label}</span>
              <div className="contact-values">
                {c.values.map((v) =>
                  v.href ? (
                    <a
                      key={v.value}
                      href={v.href}
                      {...(v.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {v.value}
                    </a>
                  ) : (
                    <p key={v.value}>{v.value}</p>
                  ),
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
