import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "포트폴리오 — AI 브랜드 영상 제작 사례 400편+",
  description:
    "함께봄이 제작한 AI 음원 기반 브랜드 영상 포트폴리오. 기업홍보, 광고, 숏폼, 뮤직비디오 등 400편 이상의 누적 제작 영상을 확인해 보세요.",
  alternates: { canonical: "https://hamkkebom.com/works" },
  openGraph: {
    title: "포트폴리오 | 함께봄",
    description:
      "AI 음원과 시네마틱 영상이 결합된 함께봄의 브랜드 영상 포트폴리오 갤러리",
    url: "https://hamkkebom.com/works",
  },
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://hamkkebom.com" },
          { name: "포트폴리오", url: "https://hamkkebom.com/works" },
        ]}
      />
      {children}
    </>
  );
}
