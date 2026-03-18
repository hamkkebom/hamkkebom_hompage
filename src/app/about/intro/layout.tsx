import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "함께봄 소개 — 탄생과 철학, 비전과 미션",
  description: "AI 음원 기반 브랜드 영상 제작 스튜디오 함께봄의 탄생 스토리, 경영 철학, 비전과 미션을 소개합니다. '함께 바라봄, 함 깨부수어 봄, 함께 맞이하는 봄'",
  alternates: { canonical: "https://hamkkebom.com/about/intro" },
  openGraph: {
    title: "함께봄 소개 | 함께봄",
    description: "AI 음원 기반 영상 브랜딩 스튜디오 함께봄의 철학과 비전",
    url: "https://hamkkebom.com/about/intro",
  },
};

export default function AboutIntroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
