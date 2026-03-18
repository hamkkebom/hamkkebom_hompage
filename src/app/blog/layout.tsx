import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: {
    template: "%s | 함께봄 블로그",
    default: "블로그 — AI 영상 제작·마케팅 인사이트",
  },
  description:
    "AI 영상 제작, 퍼포먼스 마케팅, 숏폼 콘텐츠, 브랜딩 전략에 대한 전문 가이드와 인사이트. 함께봄 전문가가 알려드리는 실전 노하우.",
  alternates: { canonical: "https://hamkkebom.com/blog" },
  openGraph: {
    title: "블로그 | 함께봄",
    description:
      "AI 영상·마케팅·브랜딩 전문 가이드 — 함께봄 블로그",
    url: "https://hamkkebom.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://hamkkebom.com" },
          { name: "블로그", url: "https://hamkkebom.com/blog" },
        ]}
      />
      {children}
    </>
  );
}
