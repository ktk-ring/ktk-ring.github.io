'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { categories, works, type CategoryId, type Work } from '../data/works';
import styles from '../styles/WorkBrowser.module.css';

type Filter = CategoryId | 'all';

const labelOf = Object.fromEntries(categories.map((c) => [c.id, c.label])) as Record<CategoryId, string>;
const categoryIds = categories.map((c) => c.id) as string[];

/** 연도 섹션이 접히는 시간 (CSS yearClose와 같게) */
const ANIMATION_MS = 440;
const FILTER_PARAM = 'category';

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

interface RenderedYear {
  year: number;
  items: Work[];
  status: 'idle' | 'entering' | 'leaving';
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 필터에 맞는 작업을 연도별로 묶는다 (최신 연도 먼저) */
function groupsFor(filter: Filter) {
  const visible = works.filter((w) => filter === 'all' || w.tags.includes(filter));
  const byYear: Record<number, Work[]> = {};
  visible.forEach((w) => {
    (byYear[w.year] = byYear[w.year] ?? []).push(w);
  });
  return Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a)
    .map((year) => [year, byYear[year]] as [number, Work[]]);
}

const idle = (groups: [number, Work[]][]): RenderedYear[] =>
  groups.map(([year, items]) => ({ year, items, status: 'idle' as const }));

function youtubeThumbnail(href?: string) {
  const id = href?.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/)?.[1];
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
}

/**
 * href 종류에 따라 새 탭 링크 / 같은 탭 링크 / 일반 박스로 감싼다.
 * /jiji-stop 같은 경로는 같은 도메인의 별도 저장소 사이트라 next/link가 아닌 일반 링크로 연다.
 */
function Wrapper({
  work: w,
  className,
  style,
  children,
}: {
  work: Work;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (!w.href)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  const external = /^https?:\/\//.test(w.href);
  return (
    <a
      href={w.href}
      className={className}
      style={style}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

function WorkCard({ work: w }: { work: Work }) {
  const thumbnail = youtubeThumbnail(w.href);
  const className = [styles.card, w.href ? styles.link : ''].filter(Boolean).join(' ');

  const body = (
    <>
      {thumbnail && (
        <span className={styles.thumbFrame}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.thumb} src={thumbnail} alt="" loading="lazy" width={480} height={270} />
        </span>
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
      {w.href && (
        <span className={styles.cta}>
          작업 보기 <span className="nudge">→</span>
        </span>
      )}
    </>
  );

  return (
    <Wrapper work={w} className={className} style={{ '--vt': `work-${works.indexOf(w)}` } as React.CSSProperties}>
      {body}
    </Wrapper>
  );
}

export default function WorkBrowser() {
  const [filter, setFilter] = useState<Filter>('all');
  const urlFilterRef = useRef<string | null>(null);

  // 주소의 ?category= 값을 필터에 반영 (정적 배포라 마운트 후에 읽는다)
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get(FILTER_PARAM);
    if (value && categoryIds.includes(value)) {
      urlFilterRef.current = value;
      setFilter(value as CategoryId);
    }
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const revealObserver = useRef<IntersectionObserver | null>(null);

  const selectFilter = (id: Filter) => {
    if (id === filter) return;
    const url = new URL(window.location.href);
    if (id === 'all') url.searchParams.delete(FILTER_PARAM);
    else url.searchParams.set(FILTER_PARAM, id);
    window.history.replaceState(null, '', url);

    // 필터를 고르기 시작하면 스크롤 등장 효과는 그만두고 아직 숨은 카드를 모두 보이게 한다
    revealObserver.current?.disconnect();
    sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal="pending"]').forEach((el) => {
      el.dataset.reveal = 'done';
    });

    // View Transitions를 지원하면 카드 하나하나가 새 자리로 옮겨 가게 하고,
    // 아니면 연도 섹션이 접히고 열리는 기존 애니메이션을 쓴다
    const doc = document as Document & {
      startViewTransition?: (update: () => void) => { finished: Promise<void> };
    };
    const section = sectionRef.current;
    if (!doc.startViewTransition || reducedMotion() || !section) {
      setFilter(id);
      return;
    }
    // 화면 근처에 있는 카드 · 연도 제목만 전환에 참여시킨다 (전부 캡처하면 첫 프레임이 끊긴다)
    const markNearViewport = () => {
      const margin = window.innerHeight * 0.25;
      section.querySelectorAll<HTMLElement>(`.${styles.card}, .${styles.yearTitle}`).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > -margin && r.top < window.innerHeight + margin) el.dataset.vt = '';
        else delete el.dataset.vt;
      });
    };
    markNearViewport();
    section.classList.add(styles.vtActive);
    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setRendered(idle(groupsFor(id)));
        setFilter(id);
      });
      markNearViewport();
    });
    transition.finished.finally(() => {
      section.classList.remove(styles.vtActive);
      section.querySelectorAll<HTMLElement>('[data-vt]').forEach((el) => delete el.dataset.vt);
    });
  };

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: works.length };
    categories.forEach((c) => {
      result[c.id] = works.filter((w) => w.tags.includes(c.id)).length;
    });
    return result;
  }, []);

  const groups = useMemo(() => groupsFor(filter), [filter]);

  const options: { id: Filter; label: string }[] = [{ id: 'all', label: '전체' }, ...categories];

  // 필터 변경 시 연도 섹션이 사라지고 나타나는 것을 애니메이션하기 위해,
  // 사라지는 연도는 애니메이션이 끝날 때까지 이전 내용 그대로 남겨 둔다.
  const [rendered, setRendered] = useState<RenderedYear[]>(() => idle(groups));

  useEffect(() => {
    // 주소에서 읽어 온 필터를 처음 적용할 때는 애니메이션 없이 바로 교체
    if (urlFilterRef.current && urlFilterRef.current === filter) {
      urlFilterRef.current = null;
      setRendered(idle(groups));
      return;
    }

    const target = new Map<number, Work[]>(groups);
    const reduced = reducedMotion();

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
  }, [groups, filter]);

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
  const [mobileTocVisible, setMobileTocVisible] = useState(false);
  const mobileTocRef = useRef<HTMLElement>(null);

  // 첫 화면 아래에 있는 카드는 숨겨 두었다가, 스크롤해서 보이면 같이 들어온 순서대로 떠오르게 한다.
  // 서버에서 그린 HTML에서는 모두 보이고, 화면 밖 카드만 하이드레이션 뒤에 숨기므로 깜빡임이 없다.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion() || !('IntersectionObserver' in window)) return;
    const below = Array.from(section.querySelectorAll<HTMLElement>(`.${styles.grid} > li`)).filter(
      (li) => li.getBoundingClientRect().top > window.innerHeight,
    );
    below.forEach((li) => {
      li.dataset.reveal = 'pending';
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.setProperty('--rn', String(Math.min(i, 5)));
            el.dataset.reveal = 'shown';
            io.unobserve(el);
          });
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    below.forEach((li) => io.observe(li));
    revealObserver.current = io;
    return () => io.disconnect();
  }, []);

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

      // 모바일 연도 바는 작업 목록 영역에 들어온 뒤부터 표시
      const works = document.getElementById('works');
      setMobileTocVisible(!!works && works.getBoundingClientRect().top <= 140);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [tocItems]);

  // 모바일 바에서 활성 항목이 가려지지 않도록 가로 스크롤 위치를 맞춘다
  useEffect(() => {
    const bar = mobileTocRef.current;
    const chip = bar?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!bar || !chip) return;
    bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2, behavior: 'smooth' });
  }, [activeId]);

  return (
    <>
      <section id="works" ref={sectionRef} aria-labelledby="works-title">
        <h2 id="works-title" className={styles.srOnly}>작업물</h2>

        <p className={`${styles.legend} reveal`} style={step(5)}>
          <span className={styles.legendMark} aria-hidden="true">↗</span>
          표시가 있는 작업은 클릭하면 작업을 볼 수 있습니다.
        </p>

        <div className={`${styles.filters} reveal`} style={step(6)} role="group" aria-label="작업 분류">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              className={styles.chip}
              aria-pressed={filter === o.id}
              onClick={() => selectFilter(o.id)}
            >
              <span className="boldSafe" data-text={o.label}>
                {o.label}
              </span>
              <span className={styles.count}>{counts[o.id]}</span>
            </button>
          ))}
        </div>

        {rendered.map(({ year, items, status }, index) => (
          <div
            key={year}
            id={`year-${year}`}
            className={`${styles.yearWrap} ${statusClass(status)} ${introDone ? '' : 'reveal'}`}
            style={introDone ? undefined : step(7 + Math.min(index, 3))}
            aria-hidden={status === 'leaving' ? true : undefined}
          >
            <div className={styles.yearInner}>
              <div className={styles.year}>
                <h3 className={styles.yearTitle} style={{ '--vt': `year-${year}` } as React.CSSProperties}>
                  {year}
                </h3>
                <ul className={styles.grid}>
                  {items.map((w, i) => (
                    <li key={`${year}-${w.title}`} style={{ '--n': Math.min(i + 1, 8) } as React.CSSProperties}>
                      <WorkCard work={w} />
                    </li>
                  ))}
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
                    <span className="boldSafe" data-text={item.label}>
                      {item.label}
                    </span>
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
              <span className="boldSafe" data-text="Contact">
                Contact
              </span>
            </a>
          </div>
        </nav>
      </section>

      <nav
        ref={mobileTocRef}
        className={`${styles.mobileToc} ${mobileTocVisible ? styles.mobileTocVisible : ''}`}
        aria-label="연도별 바로가기 (모바일)"
        aria-hidden={mobileTocVisible ? undefined : true}
      >
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={styles.mobileChip}
            aria-current={activeId === item.id ? 'location' : undefined}
            tabIndex={mobileTocVisible ? undefined : -1}
          >
            <span className="boldSafe" data-text={item.label}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}
