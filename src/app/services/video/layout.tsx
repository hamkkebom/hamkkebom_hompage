import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 영상제작 서비스 — 촬영 없이 완성되는 브랜드 영상",
  description: "함께봄 AI 영상제작팀이 생성형 AI 기술로 CF, 홍보영상, 숏폼 콘텐츠, FOOH 가상광고, 뮤직비디오를 제작합니다. 기존 대비 제작 기간 50% 단축, 비용 1/3 절감.",
  alternates: { canonical: "https://hamkkebom.com/services/video" },
  openGraph: {
    title: "AI 영상제작 서비스 | 함께봄",
    description: "촬영 없이도 완성되는 고품질 AI 영상 — 광고, 홍보, 숏폼, FOOH 제작",
    url: "https://hamkkebom.com/services/video",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 영상제작 서비스",
  provider: {
    "@type": "Organization",
    name: "함께봄",
    url: "https://hamkkebom.com",
  },
  description: "생성형 AI 기술로 CF, 홍보영상, 숏폼, FOOH, 뮤직비디오를 기존 대비 50% 빠르고 1/3 비용으로 제작합니다.",
  serviceType: "AI Video Production",
  areaServed: { "@type": "Country", name: "KR" },
  url: "https://hamkkebom.com/services/video",
};

export default function VideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {children}
    </>
  );
}
