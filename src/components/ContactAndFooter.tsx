"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const faqs = [
    { q: "제작 기간은 보통 얼마나 걸리나요?", a: "프로젝트 범위에 따라 다르지만 보통 4~8주 소요됩니다." },
    { q: "사용되는 BGM이나 AI 송의 저작권은 어떻게 되나요?", a: "저희가 제작한 모든 결과물의 상업적 사용 권한을 클라이언트에게 양도합니다." },
    { q: "원하는 레퍼런스 영상이 있는데 비슷하게 제작 가능한가요?", a: "물론입니다. 레퍼런스 영상을 100% 이해하고 함께봄만의 독보적인 크리에이티브를 더해 맞춤형으로 제작합니다." },
];

export default function ContactAndFooter() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section id="문의하기" style={{ background: "var(--bg-color)", position: "relative", zIndex: 10 }}>
            {/* Contact Section */}
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "10rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>

                {/* Left Side: FAQ */}
                <div>
                    <h2 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "3rem" }}>자주 묻는 질문</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: 500 }}>
                                    <span style={{ color: openFaq === index ? "var(--accent-color)" : "inherit", transition: "color 0.3s" }}>
                                        Q. {faq.q}
                                    </span>
                                    <span style={{ transform: openFaq === index ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                                        +
                                    </span>
                                </div>
                                <div
                                    style={{
                                        maxHeight: openFaq === index ? "200px" : "0",
                                        overflow: "hidden",
                                        transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                                        opacity: openFaq === index ? 0.8 : 0,
                                        marginTop: openFaq === index ? "1rem" : "0",
                                    }}
                                >
                                    <p style={{ lineHeight: 1.6, color: "var(--text-secondary)" }}>A. {faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: "4rem" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>더 자세한 내용이 궁금하신가요?</h3>
                        <button
                            className="brochure-btn"
                            style={{
                                background: "transparent",
                                border: "1px solid var(--accent-color)",
                                color: "var(--accent-color)",
                                padding: "1rem 2rem",
                                fontSize: "1rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                position: "relative",
                                overflow: "hidden",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(0, 240, 255, 0.1)";
                                e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 240, 255, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            제안서 및 브로셔 다운로드
                        </button>
                    </div>
                </div>

                {/* Right Side: Contact CTA (Replaced Form) */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "2rem", background: "url('/images/noise.png')", position: "relative" }}>
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "150%",
                        height: "150%",
                        background: "radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, transparent 60%)",
                        pointerEvents: "none",
                        zIndex: 0
                    }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                        <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 900, marginBottom: "1rem", lineHeight: 1.2 }}>
                            다음 프로젝트의<br />
                            <span style={{ color: "var(--accent-color)" }}>주인공이 되세요.</span>
                        </h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", marginBottom: "3rem", lineHeight: 1.6 }}>
                            압도적인 퀄리티의 영상 제작.<br />
                            지금 바로 전문가와 상담을 시작해 보세요.
                        </p>

                        <Link href="/contact" style={{ textDecoration: "none" }}>
                            <button
                                style={{
                                    background: "#fff",
                                    color: "#000",
                                    border: "none",
                                    padding: "1.5rem 3rem",
                                    fontSize: "1.3rem",
                                    fontWeight: 800,
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 240, 255, 0.4)";
                                    e.currentTarget.style.background = "var(--accent-color)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(255, 255, 255, 0.2)";
                                    e.currentTarget.style.background = "#fff";
                                }}
                            >
                                프로젝트 문의하기
                                <span style={{ fontSize: "1.5rem" }}>→</span>
                            </button>
                        </Link>

                        <div style={{ marginTop: "2rem", display: "flex", gap: "2rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00ff00" }} />
                                상담 가능
                            </div>
                            <div>평일 10:00 - 19:00</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "4rem 2rem", marginTop: "4rem" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
                    <div>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <Image
                                src="/logo-white.png"
                                alt="함께봄 로고"
                                width={150}
                                height={65}
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.8 }}>
                            대표이사 : 노수빈<br />
                            이메일 : hamkkebom12@gmail.com<br />
                            주소 : 서울 종로구 효자로7길 10 1층(서촌 한옥체)<br />
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                        <a href="#" onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"} style={{ transition: "color 0.3s" }}>Instagram</a>
                        <a href="#" onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"} style={{ transition: "color 0.3s" }}>YouTube</a>
                        <a href="#" onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"} style={{ transition: "color 0.3s" }}>Behance</a>
                    </div>
                </div>
                <div style={{ maxWidth: "1400px", margin: "2rem auto 0", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "2rem", color: "rgba(255,255,255,0.2)", fontSize: "0.8rem", textAlign: "center" }}>
                    © {new Date().getFullYear()} HAMKKEBOM. All Rights Reserved.
                </div>
            </footer>
        </section >
    );
}
