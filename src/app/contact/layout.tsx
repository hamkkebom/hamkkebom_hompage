import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "함께봄에 영상 제작, 마케팅, 교육 관련 문의를 남겨주세요. 빠르게 답변 드리겠습니다.",
  alternates: { canonical: "https://hamkkebom.com/contact" },
  openGraph: {
    title: "문의하기 | 함께봄",
    description:
      "영상 제작 · 마케팅 · 교육 문의. 함께봄 전문팀이 빠르게 답변드립니다.",
    url: "https://hamkkebom.com/contact",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "함께봄",
  description: "AI 음원 기반 브랜드 영상 제작 및 퍼포먼스 마케팅 전문 스튜디오",
  url: "https://hamkkebom.com",
  logo: "https://hamkkebom.com/logo.png",
  image: "https://hamkkebom.com/opengraph-image",
  address: {
    "@type": "PostalAddress",
    streetAddress: "효자로7길 10 1층",
    addressLocality: "종로구",
    addressRegion: "서울특별시",
    postalCode: "03046",
    addressCountry: "KR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.5792,
    longitude: 126.9738,
  },
  email: "hamkkebom12@gmail.com",
  // ⚠️ 전화번호 02-1234-5678은 플레이스홀더이므로 포함하지 않음
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  },
  sameAs: [
    "https://www.instagram.com/hamkkebom_official",
    "https://www.youtube.com/@hamkkesong",
    "https://hamkkebom.kr",
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {children}
    </>
  );
}
