'use client';

// Editables 다운로드 버튼. 페이지가 열릴 때 릴리스 저장소의 최신 릴리스를 읽어
// Windows 셋업 · macOS DMG로 바로 연결한다 (버전이 바뀌어도 페이지를 고칠 필요 없음).
// 읽지 못하면 릴리스 페이지로 연결한다.

import { useEffect, useState } from 'react';
import styles from '../styles/Editables.module.css';

const REPO = 'ktk-ring/editables-releases';
const LATEST = `https://github.com/${REPO}/releases/latest`;

type Asset = { name: string; size: number; browser_download_url: string };
type Release = { tag_name: string; published_at: string; assets: Asset[] };

const mb = (n: number) => `${Math.round(n / 1048576)}MB`;

export default function EditablesDownload() {
  const [release, setRelease] = useState<Release | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
      .then((r) => (r.ok ? r.json() : null))
      .then((r: Release | null) => r && setRelease(r))
      .catch(() => {});
  }, []);

  const win = release?.assets.find((a) => /^Editables-Setup-.*\.exe$/.test(a.name));
  const mac = release?.assets.find((a) => a.name.endsWith('.dmg'));
  const version = release?.tag_name.replace(/^v/, '');

  return (
    <div className={styles.download}>
      <div className={styles.downloadButtons}>
        <a className={`${styles.button} ${styles.primary}`} href={win?.browser_download_url ?? LATEST}>
          <span>Windows용 다운로드</span>
          <small>{win ? `Windows 10 · 11 · ${mb(win.size)}` : 'Windows 10 · 11'}</small>
        </a>
        <a className={styles.button} href={mac?.browser_download_url ?? LATEST}>
          <span>macOS용 다운로드</span>
          <small>{mac ? `Apple Silicon · macOS 12 이상 · ${mb(mac.size)}` : 'Apple Silicon · macOS 12 이상'}</small>
        </a>
      </div>
      <p className={styles.downloadNote}>
        {version ? `최신 버전 ${version} · ` : ''}무료 ·{' '}
        <a href={version ? `https://github.com/${REPO}/releases/tag/v${version}` : LATEST}>바뀐 점 보기</a>
      </p>
    </div>
  );
}
