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

export default function ContactSection() {
  return (
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
  );
}
