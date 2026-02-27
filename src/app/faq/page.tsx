"use client";

import { useState } from "react";
import GNB from "@/components/GNB";
import ContactAndFooter from "@/components/ContactAndFooter";

const faqs = [
    { q: "제작 기간은 보통 얼마나 걸리나요?", a: "프로젝트 범위에 따라 다르지만 보통 4~8주 소요됩니다." },
    { q: "사용되는 BGM이나 AI 송의 저작권은 어떻게 되나요?", a: "저희가 제작한 모든 결과물의 상업적 사용 권한을 클라이언트에게 양도합니다." },
    { q: "원하는 레퍼런스 영상이 있는데 비슷하게 제작 가능한가요?", a: "물론입니다. 레퍼런스 영상을 100% 이해하고 함께봄만의 독보적인 크리에이티브를 더해 맞춤형으로 제작합니다." },
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
                <h1 style={{ fontSize: "3.5rem", fontWeight: 700, marginBottom: "4rem", textAlign: "center" }}>자주 묻는 질문</h1>

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

            <ContactAndFooter />
        </main>
    );
}
