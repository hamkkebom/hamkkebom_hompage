"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactAndFooter() {
    return (
        <section id="문의하기" style={{ background: "var(--bg-color)", position: "relative", zIndex: 10 }}>
            {/* Contact Section */}
            <div className="contact-footer-grid" style={{ maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" }}>

                {/* Contact CTA (Centered Full Width) */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "6rem 2rem", background: "url('/images/noise.png')", position: "relative", width: "100%", boxSizing: "border-box", borderRadius: "30px", overflow: "hidden" }}>
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "150%",
                        height: "150%",
                        background: "radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 60%)",
                        pointerEvents: "none",
                        zIndex: 0
                    }} />

                    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.2 }}>
                            다음 프로젝트의<br />
                            <span style={{ color: "var(--accent-color)" }}>주인공이 되세요.</span>
                        </h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", marginBottom: "3.5rem", lineHeight: 1.6 }}>
                            압도적인 퀄리티의 영상 제작.<br />
                            지금 바로 전문가와 상담을 시작해 보세요.
                        </p>

                        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                            <Link href="/contact" style={{ textDecoration: "none" }}>
                                <button
                                    style={{
                                        background: "#fff",
                                        color: "#000",
                                        border: "none",
                                        padding: "clamp(1rem, 3vw, 1.2rem) clamp(1.5rem, 5vw, 2.5rem)",
                                        fontSize: "clamp(1rem, 2vw, 1.2rem)",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        borderRadius: "8px",
                                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                        boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "0.8rem",
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
                            <button
                                style={{
                                    background: "transparent",
                                    border: "1px solid var(--accent-color)",
                                    color: "var(--accent-color)",
                                    padding: "clamp(1rem, 3vw, 1.2rem) clamp(1.5rem, 5vw, 2.5rem)",
                                    fontSize: "clamp(1rem, 2vw, 1.1rem)",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    borderRadius: "8px",
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

                        <div style={{ marginTop: "3rem", display: "flex", gap: "2rem", color: "var(--text-secondary)", fontSize: "1rem" }}>
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
            <footer className="footer-container" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "4rem" }}>
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
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"} style={{ transition: "color 0.3s" }}>Instagram</a>
                        <a href="https://www.youtube.com/@hamkkesong" target="_blank" rel="noopener noreferrer" onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"} style={{ transition: "color 0.3s" }}>YouTube</a>
                        <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"} style={{ transition: "color 0.3s" }}>Blog</a>
                    </div>
                </div>
                <div style={{ maxWidth: "1400px", margin: "2rem auto 0", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "2rem", color: "rgba(255,255,255,0.2)", fontSize: "0.8rem", textAlign: "center" }}>
                    © {new Date().getFullYear()} HAMKKEBOM. All Rights Reserved.
                </div>
            </footer>
            <style>{`
                .contact-footer-grid {
                    padding: 8rem 2rem;
                }
                .footer-container {
                    padding: 4rem 2rem;
                }
                @media (max-width: 900px) {
                    .contact-footer-grid {
                        padding: 5rem 1.5rem !important;
                    }
                    .footer-container {
                        padding: 2rem 1.5rem !important;
                    }
                }
            `}</style>
        </section >
    );
}
