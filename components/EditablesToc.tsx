'use client';

// Editables 페이지 목차. 지금 보고 있는 섹션을 강조하고, 휴대폰(한 줄 · 옆으로 넘김)에서는
// 강조된 버튼이 보이도록 목차만 옆으로 넘긴다 (페이지 스크롤은 건드리지 않음).

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Editables.module.css';

export default function EditablesToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    // 화면 위쪽 1/3 지점을 지나는 섹션을 지금 섹션으로
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const el = nav.current;
    const link = el?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!el || !link || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: link.offsetLeft - (el.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <nav ref={nav} className={styles.toc} aria-label="기능">
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`} className={i.id === active ? styles.tocActive : undefined} aria-current={i.id === active ? 'true' : undefined}>
          {i.title}
        </a>
      ))}
    </nav>
  );
}
