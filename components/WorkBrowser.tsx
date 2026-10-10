'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { categories, works, type CategoryId, type Work } from '../data/works';
import styles from '../styles/WorkBrowser.module.css';

type Filter = CategoryId | 'all';

const labelOf = Object.fromEntries(categories.map((c) => [c.id, c.label])) as Record<CategoryId, string>;

const ANIMATION_MS = 350;

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

interface RenderedYear {
  year: number;
  items: Work[];
  status: 'idle' | 'entering' | 'leaving';
}

function youtubeThumbnail(href?: string) {
  const id = href?.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/)?.[1];
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
}

export default function WorkBrowser() {
  const [filter, setFilter] = useState<Filter>('all');

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: works.length };
    categories.forEach((c) => {
      result[c.id] = works.filter((w) => w.tags.includes(c.id)).length;
    });
    return result;
  }, []);

  const groups = useMemo(() => {
    const visible = works.filter((w) => filter === 'all' || w.tags.includes(filter));
    const byYear: Record<number, Work[]> = {};
    visible.forEach((w) => {
      (byYear[w.year] = byYear[w.year] ?? []).push(w);
    });
    return Object.keys(byYear)
      .map(Number)
      .sort((a, b) => b - a)
      .map((year) => [year, byYear[year]] as [number, Work[]]);
  }, [filter]);

  const options: { id: Filter; label: string }[] = [{ id: 'all', label: '전체' }, ...categories];

  // 필터 변경 시 연도 섹션이 사라지고 나타나는 것을 애니메이션하기 위해,
  // 사라지는 연도는 애니메이션이 끝날 때까지 이전 내용 그대로 남겨 둔다.
  const [rendered, setRendered] = useState<RenderedYear[]>(() =>
    groups.map(([year, items]) => ({ year, items, status: 'idle' as const })),
  );

  useEffect(() => {
    const target = new Map<number, Work[]>(groups);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setRendered((prev) => {
      const prevByYear = new Map(prev.map((r) => [r.year, r]));
      const years = Array.from(new Set([...Array.from(target.keys()), ...prev.map((r) => r.year)])).sort(
        (a, b) => b - a,
      );
      const next: RenderedYear[] = [];
      years.forEach((year) => {
        const items = target.get(year);
        const was = prevByYear.get(year);
        if (items) {
          const stays = was && was.status !== 'leaving';
          next.push({ year, items, status: stays || reduced ? 'idle' : 'entering' });
        } else if (was && !reduced) {
          next.push({ ...was, status: 'leaving' });
        }
      });
      return next;
    });

    const timer = window.setTimeout(() => {
      setRendered((prev) => prev.filter((r) => r.status !== 'leaving'));
    }, ANIMATION_MS + 40);
    return () => window.clearTimeout(timer);
  }, [groups]);

  const tocItems = useMemo(
    () => [
      ...rendered
        .filter((r) => r.status !== 'leaving')
        .map((r) => ({ id: `year-${r.year}`, label: String(r.year) })),
      { id: 'contact', label: 'Contact' },
    ],
    [rendered],
  );

  const tocRows = useMemo(
    () => [
      ...rendered.map((r) => ({
        id: `year-${r.year}`,
        label: String(r.year),
        status: r.status,
      })),
      { id: 'contact', label: 'Contact', status: 'idle' as const },
    ],
    [rendered],
  );

  const statusClass = (status: RenderedYear['status']) =>
    status === 'entering' ? styles.entering : status === 'leaving' ? styles.leaving : '';

  const [activeId, setActiveId] = useState<string>('');

  // 첫 로딩 등장 효과가 끝난 뒤에는 연도 섹션에서 reveal 클래스를 제거
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  // 현재 화면 상단 기준선을 지난 마지막 섹션을 활성 항목으로 표시
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = tocItems[0]?.id ?? '';
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        // Contact는 높이가 짧아 기준선까지 올라오지 못하므로 더 아래쪽에서 활성화
        const threshold = item.id === 'contact' ? window.innerHeight * 0.65 : line;
        if (el && el.getBoundingClientRect().top <= threshold) current = item.id;
      }
      // 페이지 맨 아래까지 내려오면 마지막 항목(Contact)을 활성화
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && window.scrollY > 0 && tocItems.length > 0) current = tocItems[tocItems.length - 1].id;
      setActiveId(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [tocItems]);

  return (
    <section id="works" aria-labelledby="works-title">
      <h2 id="works-title" className={styles.srOnly}>작업물</h2>

      <p className={`${styles.legend} reveal`} style={step(4)}>
        <span className={styles.legendMark} aria-hidden="true">↗</span>
        표시가 있는 작업은 클릭하면 작업을 볼 수 있습니다.
      </p>

      <div className={`${styles.filters} reveal`} style={step(5)} role="group" aria-label="작업 분류">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={styles.chip}
            aria-pressed={filter === o.id}
            onClick={() => setFilter(o.id)}
          >
            {o.label}
            <span className={styles.count}>{counts[o.id]}</span>
          </button>
        ))}
      </div>

      {rendered.map(({ year, items, status }, index) => (
        <div
          key={year}
          id={`year-${year}`}
          className={`${styles.yearWrap} ${statusClass(status)} ${introDone ? '' : 'reveal'}`}
          style={introDone ? undefined : step(6 + Math.min(index, 3))}
          aria-hidden={status === 'leaving' ? true : undefined}
        >
          <div className={styles.yearInner}>
        <div className={styles.year}>
          <h3 className={styles.yearTitle}>{year}</h3>
          <ul className={styles.grid}>
            {items.map((w) => {
              const thumbnail = youtubeThumbnail(w.href);
              const body = (
                <>
                  {thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className={styles.thumb}
                      src={thumbnail}
                      alt=""
                      loading="lazy"
                      width={480}
                      height={270}
                    />
                  )}
                  <span className={styles.title}>{w.title}</span>
                  {w.href && (
                    <span className={styles.arrow} aria-hidden="true">↗</span>
                  )}
                  {w.role && <span className={styles.role}>{w.role}</span>}
                  {(w.tags.length > 0 || w.personal) && (
                    <span className={styles.meta}>
                      {w.tags.map((t) => (
                        <span key={t} className={styles.tag}>{labelOf[t]}</span>
                      ))}
                      {w.personal && <span className={styles.personal}>Personal</span>}
                    </span>
                  )}
                  {w.href && <span className={styles.cta}>작업 보기 →</span>}
                </>
              );
              return (
                <li key={`${year}-${w.title}`}>
                  {w.href ? (
                    /^https?:\/\//.test(w.href) ? (
                      <a
                        href={w.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.card} ${styles.link}`}
                      >
                        {body}
                      </a>
                    ) : (
                      <Link href={w.href} className={`${styles.card} ${styles.link}`}>
                        {body}
                      </Link>
                    )
                  ) : (
                    <div className={styles.card}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
          </div>
        </div>
      ))}

      <nav className={styles.toc} aria-label="바로가기">
        <div className={styles.tocPanel}>
          {tocRows
            .filter((item) => item.id !== 'contact')
            .map((item) => (
              <div key={item.id} className={`${styles.tocRow} ${statusClass(item.status)}`}>
                <a
                  href={`#${item.id}`}
                  className={styles.tocItem}
                  aria-current={activeId === item.id ? 'location' : undefined}
                  tabIndex={item.status === 'leaving' ? -1 : undefined}
                >
                  {item.label}
                </a>
              </div>
            ))}
        </div>

        <div className={styles.tocPanel}>
          <a
            href="#contact"
            className={styles.tocItem}
            aria-current={activeId === 'contact' ? 'location' : undefined}
          >
            Contact
          </a>
        </div>
      </nav>
    </section>
  );
}
