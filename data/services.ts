export interface Service {
  name: string;
  /** 한 줄 설명 */
  summary: string;
  href: string;
  /** 실행 환경 표시 (예: Windows · macOS, 웹) */
  platform: string;
  /** 아이콘 이미지 경로. 없으면 이름 첫 글자를 쓴다 */
  icon?: string;
  /** 앱 및 서비스 페이지 카드에 보여 줄 화면 (16:10) */
  image?: string;
  /** 카드를 한 줄 전체 폭으로 (이미지 왼쪽 · 설명 오른쪽) */
  wide?: boolean;
  /** 사이트 안에 있는 소개 페이지면 true (새 탭으로 열지 않음) */
  internal?: boolean;
}

export interface ServiceGroup {
  id: string;
  label: string;
  caption: string;
  /** 묶음 전체로 가는 링크 */
  more?: { label: string; href: string };
  items: Service[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'apps',
    label: '앱',
    caption: '작업 · 일상용 도구',
    more: { label: 'app.ktkring.com', href: 'https://app.ktkring.com' },
    items: [
      {
        name: 'Editables',
        summary: '영상 · 이미지 변환, 파일 이름 일괄 변경, SVN, 텍스처 맵 생성을 하나로 묶은 작업 도구',
        href: '/editables/',
        platform: 'Windows · macOS',
        icon: '/editables/icon.svg',
        image: '/editables/banner.webp',
        wide: true,
        internal: true,
      },
      {
        name: '환승 열차 탐색',
        summary: '직통보다 빨리 도착하는 환승 조합 검색',
        href: 'https://app.ktkring.com/train/',
        platform: '웹',
        image: '/apps/train.webp',
        wide: true,
      },
    ],
  },
  {
    id: 'web',
    label: '웹 서비스',
    caption: '텍스트 생성 웹 서비스',
    items: [
      {
        name: '워드샐러드 생성기',
        summary: '검색어로 2000~2010년대 포털 스팸 게시글 형식의 글 생성',
        href: '/wordsalad/',
        platform: '웹',
        image: '/apps/wordsalad.webp',
      },
      {
        name: '‘지지를 철회한다’ 생성기',
        summary: '이름으로 ‘지지를 철회한다’ 밈 형식의 문구 생성',
        href: '/jiji-stop/',
        platform: '웹',
        image: '/apps/jiji-stop.webp',
      },
    ],
  },
];

export const services = serviceGroups.flatMap((g) => g.items);
