import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: {
    template: "%s | 함께봄 보도자료",
    default: "보도자료 — 언론보도·전시·블로그 리뷰",
  },
  description:
    "함께봄의 언론 보도, 전시회, 블로그 리뷰 등 다양한 보도자료를 확인하세요.",
  alternates: { canonical: "https://hamkkebom.com/media" },
  openGraph: {
    title: "보도자료 | 함께봄",
    description: "함께봄 언론보도·전시·블로그 리뷰 모아보기",
    url: "https://hamkkebom.com/media",
  },
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://hamkkebom.com" },
          { name: "보도자료", url: "https://hamkkebom.com/media" },
        ]}
      />
      {children}
    </>
  );
}
