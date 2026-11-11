/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  // /portfolio/ 처럼 폴더(index.html)로 내보내서 끝에 / 가 있든 없든 열리게 한다 (GitHub Pages)
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
