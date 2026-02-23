import type { Metadata } from "next";
import { Noto_Sans_KR, Outfit } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-kr",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "함께봄 | 100년 가는 노래광고영상",
  description: "AI송을 기반으로 한 압도적인 영상 브랜딩",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
