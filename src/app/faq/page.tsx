"use client";

import { useState } from "react";
import GNB from "@/components/GNB";

const faqs = [
    { q: "영상 제작 기간은 보통 얼마나 걸리나요?", a: "프로젝트 범위와 난이도에 따라 다르지만, 보통 기획부터 최종 납품까지 2일~2주 소요됩니다. 급한 일정의 프로젝트도 유연하게 대응 가능합니다." },
    { q: "영상 제작뿐만 아니라 온라인 마케팅까지 한번에 의뢰할 수 있나요?", a: "네, 가능합니다. 영상 제작팀이 완성된 콘텐츠를 넘기면, 마케팅팀에서 곧바로 유튜브, 인스타그램 등 최적의 타겟 매체를 설정하여 퍼포먼스 마케팅을 올인원으로 집행해 드립니다." },
    { q: "단순 영상 제작을 넘어 브랜드 기획부터 전반적으로 맡길 수 있나요?", a: "그럼요. 기획개발팀이 투입되어 클라이언트의 브랜드 아이덴티티를 심층 분석한 뒤, 유튜브 채널 아트 구성, 시리즈 기획, 전반적인 브랜딩 전략까지 모두 맞춤형으로 제안해 드립니다." },
    { q: "원하는 레퍼런스(참고) 영상이 있는데 비슷하게 제작 가능할까요?", a: "물론입니다. 클라이언트가 원하시는 레퍼런스 영상을 100% 이해한 뒤, 함께봄만의 돋보이는 크리에이티브를 더해 한 차원 더 높은 결과물로 제작해 드립니다." },
    { q: "기업이나 기관 대상의 영상 제작/홍보 실무 교육도 진행하시나요?", a: "네, 운영 중인 전문 교육팀에서 실무에 바로 적용할 수 있는 기획, 촬영, 프로덕션 편집 과정부터 SNS 채널 운영 마케팅 스킬까지 기업 맞춤형 출강/컨설팅 솔루션을 제공하고 있습니다." },
    { q: "최종 결과물에 쓰이는 BGM이나 디자인 소스의 저작권은 어떻게 되나요?", a: "저희가 제작 시 사용하는 모든 소스는 정식 라이선스를 취득하여 저작권 문제가 발생하지 않으며, 완성된 최종 결과물의 상업적 사용 권한은 클라이언트에게 양도됩니다." },
];

export default function FAQPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="cinematic-main" style={{ background: "var(--bg-color)", minHeight: "100vh", color: "#fff" }}>
            <GNB />

            <section style={{ maxWidth: "800px", margin: "0 auto", padding: "12rem 2rem 4rem", minHeight: "60vh", position: "relative", zIndex: 10 }}>
                <h1 style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", fontWeight: 700, marginBottom: "4rem", textAlign: "center", wordBreak: "keep-all" }}>자주 묻는 질문</h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            style={{
                                borderBottom: "1px solid var(--border-color)",
                                paddingBottom: "1.5rem",
                                cursor: "pointer"
                            }}
                            onClick={() => toggleFaq(index)}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1.3rem", fontWeight: 500 }}>
                                <span style={{ color: openFaq === index ? "var(--accent-color)" : "inherit", transition: "color 0.3s" }}>
                                    Q. {faq.q}
                                </span>
                                <span style={{
                                    transform: openFaq === index ? "rotate(45deg)" : "rotate(0)",
                                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                    fontSize: "1.5rem"
                                }}>
                                    +
                                </span>
                            </div>
                            <div
                                style={{
                                    maxHeight: openFaq === index ? "200px" : "0",
                                    overflow: "hidden",
                                    transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                    opacity: openFaq === index ? 0.9 : 0,
                                    marginTop: openFaq === index ? "1rem" : "0",
                                }}
                            >
                                <p style={{ lineHeight: 1.6, color: "var(--text-secondary)", fontSize: "1.1rem" }}>A. {faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
