'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { categories, works, type CategoryId, type Work } from '../data/works';
import styles from '../styles/WorkBrowser.module.css';

type Filter = CategoryId | 'all';

const labelOf = Object.fromEntries(categories.map((c) => [c.id, c.label])) as Record<CategoryId, string>;

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

  return (
    <section id="works" aria-labelledby="works-title">
      <h2 id="works-title" className={styles.srOnly}>작업물</h2>

      <p className={styles.legend}>
        <span className={styles.legendMark} aria-hidden="true">↗</span>
        표시가 있는 작업은 클릭하면 작업 페이지로 이동합니다.
      </p>

      <div className={styles.filters} role="group" aria-label="작업 분류">
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

      {groups.map(([year, items]) => (
        <div key={year} className={styles.year}>
          <h3 className={styles.yearTitle}>{year}</h3>
          <ul className={styles.grid}>
            {items.map((w) => {
              const body = (
                <>
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
                  {w.href && <span className={styles.cta}>작업 페이지 보기 →</span>}
                </>
              );
              return (
                <li key={`${year}-${w.title}`}>
                  {w.href ? (
                    <Link href={w.href} className={`${styles.card} ${styles.link}`}>
                      {body}
                    </Link>
                  ) : (
                    <div className={styles.card}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
