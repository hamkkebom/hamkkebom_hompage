import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "자주 묻는 질문 (FAQ) — 영상제작 비용·기간·마케팅",
  description:
    "함께봄 AI 영상 제작 비용, 제작 기간, 마케팅 연계, 브랜딩 의뢰, 저작권, AI 교육 등 자주 묻는 질문과 답변을 확인하세요.",
  alternates: { canonical: "https://hamkkebom.com/faq" },
  openGraph: {
    title: "자주 묻는 질문 (FAQ) | 함께봄",
    description:
      "AI 영상 제작 비용, 기간, 마케팅 연계, 저작권 등 자주 묻는 질문 모음",
    url: "https://hamkkebom.com/faq",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "영상 제작 기간은 보통 얼마나 걸리나요?", acceptedAnswer: { "@type": "Answer", text: "프로젝트 범위와 난이도에 따라 다르지만, 보통 기획부터 최종 납품까지 2일~2주 소요됩니다. 급한 일정의 프로젝트도 유연하게 대응 가능합니다." } },
    { "@type": "Question", name: "AI 영상 제작 비용은 얼마인가요?", acceptedAnswer: { "@type": "Answer", text: "AI 영상 제작 비용은 영상 길이와 복잡도에 따라 달라집니다. 15초 SNS 광고용 라이트 패키지부터 60초 이상 브랜드 필름 프리미엄 패키지까지 다양한 옵션을 제공하며, 기존 실사 촬영 대비 약 1/3 수준의 합리적인 비용으로 제작 가능합니다." } },
    { "@type": "Question", name: "영상 제작뿐만 아니라 온라인 마케팅까지 한번에 의뢰할 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네, 가능합니다. 영상 제작팀이 완성된 콘텐츠를 넘기면, 마케팅팀에서 곧바로 유튜브, 인스타그램 등 최적의 타겟 매체를 설정하여 퍼포먼스 마케팅을 올인원으로 집행해 드립니다." } },
    { "@type": "Question", name: "단순 영상 제작을 넘어 브랜드 기획부터 전반적으로 맡길 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "그럼요. 기획개발팀이 투입되어 클라이언트의 브랜드 아이덴티티를 심층 분석한 뒤, 유튜브 채널 아트 구성, 시리즈 기획, 전반적인 브랜딩 전략까지 모두 맞춤형으로 제안해 드립니다." } },
    { "@type": "Question", name: "AI로 만든 영상 품질이 실사 촬영과 비교해서 어떤가요?", acceptedAnswer: { "@type": "Answer", text: "최신 생성형 AI 기술은 실사 촬영에 준하는 고품질 영상을 구현합니다. 특히 FOOH(가상 옥외광고), 3D 시각화, AI 모델 활용 등 기존 촬영으로는 구현이 어렵거나 비용이 과도한 장면도 합리적인 비용으로 제작할 수 있습니다." } },
    { "@type": "Question", name: "원하는 레퍼런스(참고) 영상이 있는데 비슷하게 제작 가능할까요?", acceptedAnswer: { "@type": "Answer", text: "물론입니다. 클라이언트가 원하시는 레퍼런스 영상을 100% 이해한 뒤, 함께봄만의 돋보이는 크리에이티브를 더해 한 차원 더 높은 결과물로 제작해 드립니다." } },
    { "@type": "Question", name: "기업이나 기관 대상의 영상 제작/홍보 실무 교육도 진행하시나요?", acceptedAnswer: { "@type": "Answer", text: "네, 운영 중인 전문 교육팀에서 실무에 바로 적용할 수 있는 기획, 촬영, 프로덕션 편집 과정부터 SNS 채널 운영 마케팅 스킬까지 기업 맞춤형 출강/컨설팅 솔루션을 제공하고 있습니다." } },
    { "@type": "Question", name: "유튜브 마케팅 ROAS(광고비 대비 매출)는 어느 정도인가요?", acceptedAnswer: { "@type": "Answer", text: "함께봄의 유튜브 마케팅 캠페인은 평균 ROAS 500~2,000% 이상을 달성하고 있습니다. AI 데이터 분석을 기반으로 타겟 소비자를 정밀하게 선정하고, 영상 콘텐츠와 퍼포먼스 마케팅을 통합 운영하여 광고 효율을 극대화합니다." } },
    { "@type": "Question", name: "숏폼 콘텐츠(릴스, 쇼츠, 틱톡) 제작도 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "네, 릴스·쇼츠·틱톡 등 각 SNS 플랫폼에 최적화된 15초~1분 숏폼 콘텐츠를 기획·제작합니다. 트렌드 분석을 기반으로 바이럴 확산에 최적화된 영상을 만들어 드립니다." } },
    { "@type": "Question", name: "최종 결과물에 쓰이는 BGM이나 디자인 소스의 저작권은 어떻게 되나요?", acceptedAnswer: { "@type": "Answer", text: "저희가 제작 시 사용하는 모든 소스는 정식 라이선스를 취득하여 저작권 문제가 발생하지 않으며, 완성된 최종 결과물의 상업적 사용 권한은 클라이언트에게 양도됩니다." } },
    { "@type": "Question", name: "정부 지원사업이나 바우처를 활용할 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네, 함께봄 교육&컨설팅팀에서 정부·지자체 지원사업 탐색부터 신청 컨설팅까지 지원합니다. 내일배움카드, K-디지털, AI 바우처 등 다양한 지원사업과 연계하여 교육비 부담을 줄이고 사업 성장 기회를 극대화할 수 있습니다." } },
    { "@type": "Question", name: "함께봄 스튜디오는 어디에 있나요?", acceptedAnswer: { "@type": "Answer", text: "서울 종로구 효자로7길 10 1층(서촌 한옥체)에 위치해 있습니다. 경복궁역 3번 출구에서 도보 약 10분 거리이며, 평일 10:00~19:00 운영합니다." } },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://hamkkebom.com" },
          { name: "자주 묻는 질문", url: "https://hamkkebom.com/faq" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
