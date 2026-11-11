import type { Metadata } from 'next';

/** 페이지마다 openGraph · twitter를 덮어쓰면 상위 값이 통째로 사라지므로 공통값을 같이 넣는다 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: '김태균 · KTK RING',
      locale: 'ko_KR',
      type: 'website',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: '김태균 · 3D VFX 테크니컬 아티스트' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
  };
}
