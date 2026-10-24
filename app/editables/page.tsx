import type { Metadata } from 'next';
import EditablesDownload from '../../components/EditablesDownload';
import EditablesToc from '../../components/EditablesToc';
import styles from '../../styles/Editables.module.css';

const TITLE = 'Editables | make editable';
const DESCRIPTION =
  '영상 · 이미지 변환, 파일 이름 일괄 변경, SVN 형상관리, 텍스처 맵 만들기, 3D 모델 확인을 한 앱에서. Windows · macOS용 무료 작업 도구';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/editables' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/editables',
    siteName: '김태균 Portfolio',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/editables/og.png', width: 1200, height: 630, alt: 'Editables · make editable 작업공간' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/editables/og.png'] },
};

type Shot = { src: string; caption: string };
type Module = { id: string; title: string; lead: string; points: string[]; shots: [Shot, Shot][] };

const MODULES: Module[] = [
  {
    id: 'media',
    title: '미디어',
    lead: '영상과 이미지를 확인하고 원하는 형식으로 바꿉니다. 파일 목록 하나로 미리보기 · 인코딩 · 비교를 오가며 씁니다.',
    points: [
      '프레임 단위 미리보기 · 구간 지정 · 지금 화면 PNG · 구간 GIF와 영상',
      'MP4 · MOV · MKV · WebM · GIF 일괄 변환 · 프리셋 · 오디오와 자막 트랙 선택',
      '영상 ↔ PNG · JPG · TIFF · EXR 이미지 시퀀스 · 빠진 프레임 알림',
      '최대 9개 영상을 격자나 A/B 분할로 동시에 재생하고 영상 · 이미지로 저장',
      'HDR 영상은 SDR로 바꿔 미리보기 · 변환',
    ],
    shots: [
      [
        { src: 'media-preview', caption: '미리보기' },
        { src: 'media-compare', caption: '비교' },
      ],
      [
        { src: 'media-encode', caption: '인코딩' },
        { src: 'media-image', caption: '이미지 변환' },
      ],
    ],
  },
  {
    id: 'renamer',
    title: '리네이머',
    lead: '여러 파일의 이름을 규칙대로 한 번에 바꿉니다. 바뀔 이름을 미리 보고 적용하며, 적용한 뒤에도 되돌릴 수 있습니다.',
    points: [
      '찾아 바꾸기 · 앞뒤에 붙이기 · 번호 · 대소문자 · 공백과 특수문자 정리',
      'UE5 네이밍: 파일 종류에 맞는 T_ · SM_ · A_ 접두사와 텍스처 접미사',
      '시퀀스 재번호 · 엑셀로 정리한 이름 표(CSV)대로 바꾸기',
      '원본은 그대로 두고 새 이름으로 사본 만들기',
    ],
    shots: [
      [
        { src: 'renamer', caption: '규칙 · 미리보기' },
        { src: 'renamer-history', caption: '기록 · 되돌리기' },
      ],
    ],
  },
  {
    id: 'vcs',
    title: '형상관리 (SVN)',
    lead: '팀 저장소의 파일을 받고, 올리고, 잠급니다. Windows는 svn이 함께 설치되어 따로 준비할 것이 없습니다.',
    points: [
      '바뀐 파일 확인 · 커밋 · 업데이트 · 잠금 · 되돌리기 · 충돌 해결 · 바뀐 내용 보기',
      '저장소 전체 잠금 현황 · 오래된 잠금 정리',
      'UE5 에셋 잠금 필수 · 프로젝트 셋업 마법사',
      '커밋 전 검사: 쓸 수 없는 이름 · 큰 파일 · 잠그지 않은 에셋 · 에셋 접두사',
    ],
    shots: [
      [
        { src: 'vcs-working-copy', caption: '작업 사본' },
        { src: 'vcs-locks', caption: '잠금 현황' },
      ],
    ],
  },
  {
    id: 'texture',
    title: '텍스처 도구',
    lead: '베이스 컬러(또는 하이트) 이미지 한 장으로 PBR 맵을 만들고, 구 · 큐브 · 평면에 입혀 바로 확인합니다.',
    points: [
      '노멀 · 하이트 · 러프니스 · AO · ORM 맵',
      '이어 붙여도 이음매가 보이지 않는 심리스 타일',
      '여러 이미지의 채널을 골라 한 장으로 합치는 채널 패킹',
      '언리얼 이름 규칙(T_이름_N)으로 PNG · TGA · TIFF 저장',
    ],
    shots: [
      [
        { src: 'texture-maps', caption: '맵 만들기' },
        { src: 'texture-pack', caption: '채널 패킹' },
      ],
    ],
  },
  {
    id: 'pipeline',
    title: '3D 뷰어',
    lead: 'FBX · OBJ · glTF · STL 모델을 열어 실제 크기 · 폴리곤 수 · 재질 · UV를 확인합니다. Cinema 4D 익스포트와 UE5 자동 임포트는 준비 중입니다.',
    points: ['재질 · 점토 · UV 체커 · 노멀 보기 · 와이어프레임', '원본 단위를 고르면 실제 크기 표시', '메시별 UV 펼침과 0~1 밖 표시'],
    shots: [
      [
        { src: 'pipeline-viewer', caption: '3D 뷰어' },
        { src: 'pipeline-checker', caption: 'UV 체커' },
      ],
    ],
  },
];

function Pair({ pair }: { pair: [Shot, Shot] }) {
  return (
    <div className={styles.pair}>
      {pair.map((s) => (
        <figure key={s.src} className={styles.shot}>
          <img src={`/editables/${s.src}.webp`} alt={s.caption} width={1600} height={1000} loading="lazy" />
          <figcaption>{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function EditablesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroText} reveal`}>
          <img className={styles.logo} src="/editables/icon.svg" alt="" width={88} height={88} />
          <h1>Editables</h1>
          <p className={styles.studio}>
            <b>make editable</b> 작업공간
          </p>
          <p className={styles.lead}>
            영상 · 이미지 변환, 파일 이름 일괄 변경, SVN 형상관리, 텍스처 맵 만들기, 3D 모델 확인을 한 앱에서 할 수 있습니다.
          </p>
          <EditablesDownload />
        </div>
        <figure className={`${styles.heroShot} reveal`} style={{ ['--i' as string]: 2 }}>
          <img src="/editables/home.webp" alt="Editables 홈 화면" width={1600} height={1000} />
        </figure>
      </section>

      <EditablesToc items={[...MODULES.map((m) => ({ id: m.id, title: m.title })), { id: 'install', title: '설치' }]} />

      {MODULES.map((m) => (
        <section key={m.id} id={m.id} className={styles.module}>
          <div className={styles.moduleText}>
            <h2>{m.title}</h2>
            <p>{m.lead}</p>
            <ul>
              {m.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          {m.shots.map((pair) => (
            <Pair key={pair[0].src} pair={pair} />
          ))}
        </section>
      ))}

      <section className={styles.module}>
        <div className={styles.moduleText}>
          <h2>그 밖에</h2>
          <ul>
            <li>자주 쓰는 설정은 프리셋으로 저장하고, 파일이나 팀 공유 폴더로 팀원과 함께 씁니다.</li>
            <li>터미널 · 자동화 스크립트 · AI 에이전트에서 쓰는 명령줄 도구(editables-cli)가 함께 설치됩니다.</li>
            <li>긴 작업이 끝나면 창이 뒤에 있어도 OS 알림으로 알려 줍니다.</li>
            <li>설정 → 앱 정보 → 문제 보고에서 의견 · 오류를 바로 보낼 수 있습니다.</li>
          </ul>
        </div>
      </section>

      <section id="install" className={styles.install}>
        <h2>설치</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Windows</h3>
            <p>
              <code>Editables-Setup</code>을 실행합니다. 처음 한 번 “Windows의 PC 보호” 창이 뜨면 <b>추가 정보 → 실행</b>을 누릅니다. FFmpeg와 svn이 함께
              설치되어 인터넷 없이도 바로 쓸 수 있습니다.
            </p>
          </div>
          <div className={styles.card}>
            <h3>macOS</h3>
            <p>
              DMG를 열어 Editables를 <b>응용 프로그램</b> 폴더로 끌어 놓고, 앱을 <b>우클릭 → 열기</b>로 엽니다. 처음 켤 때 FFmpeg를 한 번 받습니다(약 120MB).
            </p>
            <p className={styles.small}>“손상되었기 때문에 열 수 없습니다”가 나오면 터미널에서 실행한 뒤 다시 엽니다.</p>
            <pre>
              <code>xattr -dr com.apple.quarantine /Applications/Editables.app</code>
            </pre>
          </div>
          <div className={styles.card}>
            <h3>업데이트</h3>
            <p>
              앱을 켜면 새 버전을 확인하고, 있으면 바뀐 점과 함께 알려 줍니다. <b>설치 후 다시 시작</b>을 누르면 받는 동안 진행률이 보이고, 설치가 끝나면 앱이 자동으로 다시
              시작됩니다.
            </p>
          </div>
        </div>
        <p className={styles.license}>
          Editables는 무료로 쓸 수 있습니다. 소스 코드는 공개하지 않으며, 모든 권리는 make editable의 김태균에게 있습니다. 함께 들어 있는 외부 구성 요소의 라이선스는{' '}
          <a href="https://github.com/ktk-ring/editables-releases/blob/main/THIRD-PARTY-NOTICES.md">오픈소스 고지</a>에 있습니다.
        </p>
      </section>
    </main>
  );
}
