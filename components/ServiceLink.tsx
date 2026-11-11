import Link from 'next/link';
import type { Service } from '../data/services';

/** 사이트 안 소개 페이지는 같은 탭, 별도 저장소의 페이지 · 외부 앱은 새 탭으로 연다 */
export function ServiceLink({
  service: s,
  className,
  children,
}: {
  service: Service;
  className?: string;
  children: React.ReactNode;
}) {
  if (s.internal) {
    return (
      <Link href={s.href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={s.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function ServiceIcon({ service: s, className }: { service: Service; className?: string }) {
  if (s.icon) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={s.icon} alt="" width={48} height={48} />;
  }
  // 아이콘이 없으면 이름의 첫 글자(따옴표 제외)로 대신한다
  const letter = s.name.replace(/^[‘'"]/, '').charAt(0);
  return (
    <span className={className} aria-hidden="true">
      {letter}
    </span>
  );
}
