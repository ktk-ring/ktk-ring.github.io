import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://ktkring.com"),
  title: "김태균 | Portfolio",
  description: "김태균(ktk_ring)의 작업 포트폴리오 - 모션그래픽, 3D, 디자인, 프로그래밍, 미디어아트",
  alternates: { canonical: "/" },
  keywords: ["김태균", "ktk_ring", "포트폴리오", "3D", "VFX", "테크니컬 아티스트", "모션그래픽", "미디어아트"],
  openGraph: {
    title: "김태균 | Portfolio",
    description: "3D · VFX · 테크니컬 아티스트. 모션그래픽, 3D, 디자인, 프로그래밍, 미디어아트 작업 모음",
    url: "/",
    siteName: "김태균 Portfolio",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "김태균 · 3D VFX 테크니컬 아티스트 포트폴리오" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "김태균 | Portfolio",
    description: "3D · VFX · 테크니컬 아티스트. 작업 포트폴리오",
    images: ["/og.png"],
  },
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
