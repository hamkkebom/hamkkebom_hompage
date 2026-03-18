import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "회사 소개 — AI 영상 브랜딩 스튜디오",
  description:
    "함께봄은 AI 음원 작곡 기술과 시네마틱 영상 제작이 결합된 종합 브랜딩 스튜디오입니다. 대표 노수빈과 전문 크리에이티브 팀이 브랜드의 가치를 영상으로 표현합니다.",
  alternates: { canonical: "https://hamkkebom.com/about" },
  openGraph: {
    title: "회사 소개 | 함께봄",
    description: "AI 음원 + 영상 브랜딩의 선두주자, 함께봄 스튜디오를 소개합니다.",
    url: "https://hamkkebom.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://hamkkebom.com" },
          { name: "회사 소개", url: "https://hamkkebom.com/about" },
        ]}
      />
      {children}
    </>
  );
}
