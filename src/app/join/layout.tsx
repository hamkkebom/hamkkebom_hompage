import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const TITLE = "크리에이터 모집 · 매칭설명회";
const DESCRIPTION =
  "AI 영상으로 내 손으로 소득을 만들고, 오래 이어지는 일자리를 함께 만듭니다. 함께봄 크리에이터 매칭설명회 일정과 진행 과정, 소득 구조를 확인하고 신청하세요.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://hamkkebom.com/join" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "함께봄",
    url: "https://hamkkebom.com/join",
    title: `${TITLE} | 함께봄`,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "함께봄 크리에이터 모집 · 매칭설명회",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | 함께봄`,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://hamkkebom.com" },
          { name: "크리에이터 모집", url: "https://hamkkebom.com/join" },
        ]}
      />
      {children}
    </>
  );
}
