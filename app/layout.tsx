import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { pageMetadata } from "../data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://ktkring.com"),
  keywords: ["김태균", "ktk_ring", "포트폴리오", "3D", "VFX", "테크니컬 아티스트", "모션그래픽", "미디어아트"],
  ...pageMetadata({
    title: "김태균 | KTK RING",
    description: "3D · VFX 테크니컬 아티스트 김태균(ktk_ring)의 홈페이지. 지금까지 한 작업과 직접 만든 앱, 웹 서비스를 모아 두었어요.",
    path: "/",
  }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e0e11",
};

const FONT_CSS =
  "https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "김태균",
  alternateName: "ktk_ring",
  jobTitle: "3D · VFX · Technical Artist",
  url: "https://ktkring.com",
  sameAs: ["https://www.instagram.com/ktk_ring", "https://www.youtube.com/@ktk_ring"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* CSS @import 대신 <link>로 불러와 폰트 요청이 첫 화면 렌더링과 병렬로 시작되게 한다 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preload" as="style" href={FONT_CSS} />
        <link rel="stylesheet" href={FONT_CSS} />
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
