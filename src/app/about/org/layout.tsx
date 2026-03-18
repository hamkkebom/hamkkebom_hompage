import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "조직도 — 함께봄 전문 크리에이티브 팀",
  description: "함께봄의 영상제작팀, 마케팅팀, 교육팀, 기획개발팀 조직 구성을 확인하세요. 각 분야 전문가들이 브랜드의 가치를 영상으로 표현합니다.",
  alternates: { canonical: "https://hamkkebom.com/about/org" },
  openGraph: {
    title: "조직도 | 함께봄",
    description: "영상제작·마케팅·교육·기획개발 — 함께봄 전문팀 소개",
    url: "https://hamkkebom.com/about/org",
  },
};

export default function AboutOrgLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
