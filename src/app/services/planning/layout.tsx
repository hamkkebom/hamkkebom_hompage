import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 기획개발 서비스 — 기술로 콘텐츠 비즈니스를 설계",
  description: "함께봄 기획개발팀이 서비스 기획, 웹·플랫폼 개발, 업무 자동화, 데이터 분석, 콘텐츠 플랫폼 구축을 수행합니다. 기획부터 개발·운영까지 원플로우.",
  alternates: { canonical: "https://hamkkebom.com/services/planning" },
  openGraph: {
    title: "AI 기획개발 서비스 | 함께봄",
    description: "서비스 기획, 웹 개발, 업무 자동화 — 기술로 콘텐츠 비즈니스를 설계합니다",
    url: "https://hamkkebom.com/services/planning",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 기획개발 서비스",
  provider: { "@type": "Organization", name: "함께봄", url: "https://hamkkebom.com" },
  description: "서비스 기획, 웹·플랫폼 개발, 업무 자동화, 데이터 분석, 콘텐츠 플랫폼 구축 서비스를 제공합니다.",
  serviceType: "AI Planning & Development",
  areaServed: { "@type": "Country", name: "KR" },
  url: "https://hamkkebom.com/services/planning",
};

export default function PlanningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {children}
    </>
  );
}
