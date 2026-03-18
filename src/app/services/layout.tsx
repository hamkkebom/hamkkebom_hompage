import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "서비스 안내 — AI 영상제작·마케팅·교육·기획개발",
  description:
    "함께봄의 4가지 전문 서비스: AI 영상제작, 퍼포먼스 마케팅, AI 교육&컨설팅, 기획개발. AI 음원 기반 브랜드 영상부터 퍼포먼스 마케팅까지 원스톱으로 제공합니다.",
  alternates: { canonical: "https://hamkkebom.com/services" },
  openGraph: {
    title: "서비스 안내 | 함께봄",
    description:
      "영상제작 · 마케팅 · 기획개발 · 교육 — 함께봄의 4가지 전문 서비스를 만나보세요.",
    url: "https://hamkkebom.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://hamkkebom.com" },
          { name: "서비스 안내", url: "https://hamkkebom.com/services" },
        ]}
      />
      {children}
    </>
  );
}
