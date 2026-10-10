import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://ktkring.com"),
  title: "김태균 | Portfolio",
  description: "김태균(ktk_ring)의 작업 포트폴리오 - 모션그래픽, 3D, 디자인, 프로그래밍, 미디어아트",
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
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body id="top">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
