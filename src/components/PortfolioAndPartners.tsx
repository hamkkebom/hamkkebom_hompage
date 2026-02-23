"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const row1Partners = [
    "SAMSUNG", "NEXON", "NAVER", "ADIDAS", "COCA-COLA", "NETMARBLE", "VOLKSWAGEN", "HS AD", "SAMSUNG", "NEXON"
];
const row2Partners = [
    "KAKAO", "NCSOFT", "KRAFTON", "PEARLABYSS", "SBA", "OLIVE YOUNG", "NAVIEN", "MOLESKIN", "KAKAO", "NCSOFT"
];

export default function PortfolioAndPartners() {
    const marquee1Ref = useRef<HTMLDivElement>(null);
    const marquee2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 첫 번째 줄: 왼쪽으로 스크롤
        if (marquee1Ref.current) {
            gsap.to(marquee1Ref.current, {
                xPercent: -50,
                ease: "none",
                duration: 25,
                repeat: -1,
            });
        }

        // 두 번째 줄: 오른쪽으로 스크롤 (시작 위치를 -50%로 잡고 0으로 이동)
        if (marquee2Ref.current) {
            gsap.fromTo(marquee2Ref.current,
                { xPercent: -50 },
                {
                    xPercent: 0,
                    ease: "none",
                    duration: 25,
                    repeat: -1,
                }
            );
        }
    }, []);

    const LogoItem = ({ text }: { text: string }) => (
        <div style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-geist-sans)"
        }}>
            {text}
        </div>
    );

    return (
        <section id="포트폴리오" style={{ padding: "5rem 0 8rem 0", background: "var(--bg-color)", position: "relative", zIndex: 10 }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>

                {/* Partners Section */}
                <div id="파트너스" style={{ position: "relative" }}>
                    <h3 style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "3rem", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        고객사
                    </h3>

                    <h2 style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 900,
                        textAlign: "center",
                        color: "#fff",
                        marginBottom: "4rem",
                        lineHeight: 1.3,
                        wordBreak: "keep-all"
                    }}>
                        상상을 넘어선 시각적 임팩트로<br />
                        브랜드의 서사를 압도적인 영상으로 증명합니다.
                    </h2>

                    <div style={{
                        position: "relative",
                        width: "100vw",
                        left: "50%",
                        transform: "translateX(-50%)",
                        overflow: "hidden",
                        padding: "2rem 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "3rem",
                        background: "linear-gradient(90deg, #050505 0%, #111 50%, #050505 100%)"
                    }}>
                        {/* Row 1 (Moves Left) */}
                        <div
                            ref={marquee1Ref}
                            style={{ display: "flex", width: "fit-content", gap: "6rem", paddingRight: "6rem" }}
                        >
                            {[...row1Partners, ...row1Partners].map((partner, i) => (
                                <LogoItem key={`r1-${i}`} text={partner} />
                            ))}
                        </div>

                        {/* Row 2 (Moves Right) */}
                        <div
                            ref={marquee2Ref}
                            style={{ display: "flex", width: "fit-content", gap: "6rem", paddingRight: "6rem" }}
                        >
                            {[...row2Partners, ...row2Partners].map((partner, i) => (
                                <LogoItem key={`r2-${i}`} text={partner} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
