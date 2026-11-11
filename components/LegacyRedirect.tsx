'use client';

import { useEffect } from 'react';

/**
 * 예전에는 홈(/)이 곧 포트폴리오였다. 이미 공유된 주소
 * (예: /?category=3d, /#works, /#year-2024)로 들어오면 포트폴리오 페이지로 옮겨 준다.
 */
export default function LegacyRedirect() {
  useEffect(() => {
    const { search, hash } = window.location;
    const params = new URLSearchParams(search);
    if (params.has('category') || hash === '#works' || hash.startsWith('#year-')) {
      window.location.replace(`/portfolio/${search}${hash}`);
    }
  }, []);
  return null;
}
