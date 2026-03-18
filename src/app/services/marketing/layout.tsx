import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "퍼포먼스 마케팅 서비스 — 데이터가 증명하는 성과 중심 마케팅",
  description: "함께봄 마케팅팀이 AI 데이터 분석 기반 브랜드 마케팅, SNS 콘텐츠, 퍼포먼스 광고, 이커머스 솔루션을 제공합니다. 캠페인 ROAS 2000% 달성.",
  alternates: { canonical: "https://hamkkebom.com/services/marketing" },
  openGraph: {
    title: "퍼포먼스 마케팅 서비스 | 함께봄",
    description: "AI 데이터 분석 기반 통합 마케팅 — 브랜드 인지도 확장부터 매출 전환까지",
    url: "https://hamkkebom.com/services/marketing",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "퍼포먼스 마케팅 서비스",
  provider: { "@type": "Organization", name: "함께봄", url: "https://hamkkebom.com" },
  description: "AI 데이터 분석 기반 브랜드 마케팅, SNS 콘텐츠, 퍼포먼스 광고, 이커머스 솔루션을 통합 제공합니다.",
  serviceType: "Performance Marketing",
  areaServed: { "@type": "Country", name: "KR" },
  url: "https://hamkkebom.com/services/marketing",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {children}
    </>
  );
}
