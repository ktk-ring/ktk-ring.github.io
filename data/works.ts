export type CategoryId =
  | '2d'
  | '3d'
  | 'design'
  | 'programming'
  | 'media';

export const categories: { id: CategoryId; label: string }[] = [
  { id: '2d', label: '2D Work' },
  { id: '3d', label: '3D Work' },
  { id: 'design', label: 'Design' },
  { id: 'programming', label: 'Programming' },
  { id: 'media', label: 'Media Art / Installation' },
];

export interface Work {
  title: string;
  year: number;
  tags: CategoryId[];
  /** 담당 업무 등 보조 설명 */
  role?: string;
  /** 개인 작업 여부 */
  personal?: boolean;
  /** 상세 페이지 경로 */
  href?: string;
}

export const works: Work[] = [
  // 2019
  { title: '119 REMIX 타이포 모션', year: 2019, tags: ['2d'], personal: true },
  { title: 'Kim Hoonki Vert 타이포 모션', year: 2019, tags: ['2d'], personal: true },
  { title: 'Hyperreal 타이포 모션', year: 2019, tags: ['2d'], personal: true },
  { title: 'KARTEL 타이포 모션', year: 2019, tags: ['2d'], personal: true },
  { title: 'UFO 타이포 모션', year: 2019, tags: ['2d'], personal: true },
  { title: '교통정리 타이포 모션', year: 2019, tags: ['2d'], personal: true },
  { title: 'IMJMWDP 타이포 모션', year: 2019, tags: ['2d'], personal: true },
  { title: '아퍼 타이포 모션', year: 2019, tags: ['2d'], personal: true },
  { title: '관종 타이포 모션', year: 2019, tags: ['2d'], personal: true },

  // 2020
  { title: '을 타이포 모션', year: 2020, tags: ['2d'], personal: true },
  { title: '필요해 타이포 모션', year: 2020, tags: ['2d'], personal: true },
  { title: 'party is over 타이포 모션', year: 2020, tags: ['2d'], personal: true },
  { title: '개화 타이포 모션', year: 2020, tags: ['2d'], personal: true },
  { title: '기억해줘요 내 모든 날과 그때를 타이포 모션', year: 2020, tags: ['2d'], personal: true },
  { title: 'Sincerely 타이포 모션', year: 2020, tags: ['2d'], personal: true },
  { title: '못 UNDERSTAND 타이포 모션', year: 2020, tags: ['2d'], personal: true },
  { title: '취급주의 타이포 모션', year: 2020, tags: ['2d'], personal: true },
  { title: 'Freak 타이포 모션', year: 2020, tags: ['2d'], personal: true },
  { title: '단편영화 ‘초인’ VFX', year: 2020, tags: ['3d'] },
  { title: 'Caprice Heart', year: 2020, tags: ['3d'], personal: true },

  // 2021
  { title: '꽃마름 샤브샤브 공모전 VFX', year: 2021, tags: ['2d'] },
  { title: 'ON AIR 3D 모션그래픽', year: 2021, tags: ['3d'], personal: true },

  // 2022
  { title: '夜驚 (NIGHT TERROR)', year: 2022, tags: ['2d', '3d'], personal: true },
  { title: '눈동자 (Pupilla)', year: 2022, tags: ['2d'], personal: true },
  { title: 'Cagelight 제품 영상', year: 2022, tags: ['3d'] },
  {
    title: '22-1 뉴미디어와 조형 ‘크립토고스트’',
    year: 2022,
    tags: ['design', 'programming', 'media'],
    role: 'UI 디자인 · 전체 개발 · 기말전시',
  },
  {
    title: '22-2 인터랙티브 인스톨레이션 ‘대나무숲’',
    year: 2022,
    tags: ['programming', 'media'],
    role: '하드웨어 개발',
  },
  {
    title: '2022 서울예대 축제 ‘디아코인’',
    year: 2022,
    tags: ['programming'],
    role: '서버 개발',
  },
  {
    title: '‘지지를 철회한다’ 생성기',
    year: 2022,
    tags: ['programming'],
    role: '밈 생성기 사이트 개발',
    href: '/jiji-stop',
  },
  { title: 'p5.js 작업 아카이브', year: 2022, tags: [], href: '/p5js-archives' },
  {
    title: '2022 디지털아트 프로그래밍 기말작업',
    year: 2022,
    tags: [],
    href: '/dap-final',
  },

  // 2023
  { title: '2023 디지털아트전공 소개영상 VFX', year: 2023, tags: ['3d'] },
  { title: '2024 서울예대 축제 ‘디아청과’ 홍보영상', year: 2023, tags: ['3d'] },
  { title: '삼성전자 에어드레서 제품 영상', year: 2023, tags: ['3d'] },
  { title: 'MECSEED 모바일 액세서리 제품 소개 이미지', year: 2023, tags: ['3d'] },
  { title: '전공학회 주요 행사 포스터 다수 제작', year: 2023, tags: ['design'] },
  { title: '전공학회 주요 행사 굿즈 제작', year: 2023, tags: ['design'] },
  { title: '월간디아 시즌2 디자인 전담', year: 2023, tags: ['design'] },
  { title: '‘GRAVITY’ 포스터 등 그래픽 디자인', year: 2023, tags: ['design'] },
  { title: '‘GRAVITY’ 프로그램북 등 편집 디자인', year: 2023, tags: ['design'] },
  {
    title: '23-1 디지털아트페스티벌 ‘당기시오 PULL’',
    year: 2023,
    tags: ['programming', 'media'],
    role: '통신 및 소프트웨어 개발',
    href: '/pull-2023diaf',
  },
  {
    title: '포스코 체인지업그라운드 미디어월 ‘아침 맞이하기’',
    year: 2023,
    tags: ['programming', 'media'],
    role: '통신 시스템 개발',
  },
  {
    title: '23-2 피지컬컴퓨팅 ‘마에스트로넛’',
    year: 2023,
    tags: ['programming', 'media'],
    role: '인터랙션 시스템 개발',
  },

  // 2024
  { title: '안산거리극축제 미디어파사드 보조 작업', year: 2024, tags: ['2d'] },
  { title: '2024 디지털아트전공 소개영상', year: 2024, tags: ['3d'] },
  { title: 'MECSEED 모바일 액세서리 광고 영상', year: 2024, tags: ['3d'] },
  { title: '원명원 미디어파사드 3D Assistant', year: 2024, tags: ['3d'] },
  { title: 'CANDY-BANG 제품 영상', year: 2024, tags: ['3d'] },
  {
    title: '공간 파동 ‘서랍 열어보기’',
    year: 2024,
    tags: ['programming', 'media'],
    role: '통신 및 소프트웨어 개발 · 2024.2~2024.3',
  },
  {
    title: '24-1 디지털아트페스티벌 ‘물물교환’',
    year: 2024,
    tags: ['programming', 'media'],
    role: '시스템 전체 개발',
  },
];
