import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 교육 & 컨설팅 서비스 — 실무 중심 맞춤형 AI 교육",
  description: "함께봄 교육팀이 기업 맞춤형 AI 교육, AI 툴 실습, 창업 컨설팅, 정부지원사업 연계를 제공합니다. 수료 후 실무 진출률 92%, 수강생 만족도 4.9/5.",
  alternates: { canonical: "https://hamkkebom.com/services/education" },
  openGraph: {
    title: "AI 교육 & 컨설팅 서비스 | 함께봄",
    description: "기업 맞춤 AI 교육부터 창업 컨설팅까지 — 실무 중심 맞춤형 프로그램",
    url: "https://hamkkebom.com/services/education",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 교육 & 컨설팅 서비스",
  provider: { "@type": "Organization", name: "함께봄", url: "https://hamkkebom.com" },
  description: "기업 맞춤형 AI 교육, AI 툴 실습, 창업 컨설팅, 정부지원사업 연계 서비스를 제공합니다.",
  serviceType: "AI Education & Consulting",
  areaServed: { "@type": "Country", name: "KR" },
  url: "https://hamkkebom.com/services/education",
};

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {children}
    </>
  );
}
