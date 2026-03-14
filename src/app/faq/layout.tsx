import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description:
    "함께봄 영상 제작 관련 자주 묻는 질문들을 모아 답변드립니다. 제작 기간, 비용, 마케팅, 저작권 등 궁금한 사항을 확인하세요.",
  alternates: { canonical: "https://hamkkebom.com/faq" },
  openGraph: {
    title: "자주 묻는 질문 | 함께봄",
    description:
      "영상 제작 기간, 원스톱 마케팅, 브랜딩 의뢰, 저작권 등 자주 묻는 질문 모음",
    url: "https://hamkkebom.com/faq",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "영상 제작 기간은 보통 얼마나 걸리나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "프로젝트 범위와 난이도에 따라 다르지만, 보통 기획부터 최종 납품까지 2일~2주 소요됩니다. 급한 일정의 프로젝트도 유연하게 대응 가능합니다.",
      },
    },
    {
      "@type": "Question",
      name: "영상 제작뿐만 아니라 온라인 마케팅까지 한번에 의뢰할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 가능합니다. 영상 제작팀이 완성된 콘텐츠를 넘기면, 마케팅팀에서 곧바로 유튜브, 인스타그램 등 최적의 타겟 매체를 설정하여 퍼포먼스 마케팅을 올인원으로 집행해 드립니다.",
      },
    },
    {
      "@type": "Question",
      name: "단순 영상 제작을 넘어 브랜드 기획부터 전반적으로 맡길 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "그럼요. 기획개발팀이 투입되어 클라이언트의 브랜드 아이덴티티를 심층 분석한 뒤, 유튜브 채널 아트 구성, 시리즈 기획, 전반적인 브랜딩 전략까지 모두 맞춤형으로 제안해 드립니다.",
      },
    },
    {
      "@type": "Question",
      name: "원하는 레퍼런스(참고) 영상이 있는데 비슷하게 제작 가능할까요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "물론입니다. 클라이언트가 원하시는 레퍼런스 영상을 100% 이해한 뒤, 함께봄만의 돋보이는 크리에이티브를 더해 한 차원 더 높은 결과물로 제작해 드립니다.",
      },
    },
    {
      "@type": "Question",
      name: "기업이나 기관 대상의 영상 제작/홍보 실무 교육도 진행하시나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 운영 중인 전문 교육팀에서 실무에 바로 적용할 수 있는 기획, 촬영, 프로덕션 편집 과정부터 SNS 채널 운영 마케팅 스킬까지 기업 맞춤형 출강/컨설팅 솔루션을 제공하고 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "최종 결과물에 쓰이는 BGM이나 디자인 소스의 저작권은 어떻게 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "저희가 제작 시 사용하는 모든 소스는 정식 라이선스를 취득하여 저작권 문제가 발생하지 않으며, 완성된 최종 결과물의 상업적 사용 권한은 클라이언트에게 양도됩니다.",
      },
    },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
