import WorkBrowser from '../../components/WorkBrowser';
import ContactSection from '../../components/ContactSection';
import { pageMetadata } from '../../data/site';

export const metadata = pageMetadata({
  title: 'Portfolio | 김태균',
  description: '김태균(ktk_ring)이 2019년부터 해 온 작업들. 모션그래픽, 3D, 디자인, 프로그래밍, 미디어아트, AI',
  path: '/portfolio/',
});

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
    label: '개발',
    items: ['Unreal Engine', 'JavaScript', 'p5.js', 'React', 'Next.js', 'Python', 'Arduino', 'Java'],
  },
];

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Portfolio() {
  return (
    <main className="container has-toc">
      <header className="hero">
        <p className="eyebrow reveal" style={step(0)}>01 · Portfolio</p>
        <h1 className="reveal" style={step(1)}>작업 포트폴리오</h1>
        <p className="role reveal" style={step(2)}>3D · VFX · 테크니컬 아티스트</p>

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

      <ContactSection />
    </main>
  );
}
