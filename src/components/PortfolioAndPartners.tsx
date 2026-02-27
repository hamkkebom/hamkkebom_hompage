"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const clients = [
    { name: "디앤아이부동산", url: "https://blog.naver.com/tkkim25", logo: null },
    { name: "(주)에이스솔루션", url: "https://acepower.page24.app/", logo: "https://9tsiiw6i9140.edge.naverncp.com/files/acepower/202503/82800af4df138243b6d86512920428ec.png" },
    { name: "아셀케어", url: "http://acellcare.com", logo: null },
    { name: "주안이네 김치", url: "https://smartstore.naver.com/jooankimchi", logo: null },
    { name: "삼익익스프레스", url: "https://www.samickexpress.co.kr/", logo: "https://www.samickexpress.co.kr/img_main/top_logo.jpg" },
    { name: "마을회관", url: "https://map.naver.com/v5/entry/place/1507967604", logo: null },
    { name: "해피푸드다은", url: "https://www.hdef.co.kr/new/index.php", logo: "https://www.hdef.co.kr/new/images/main/logo.png" },
    { name: "다온국제특허법률사무소", url: "https://daontm.kr/", logo: "https://daontm.kr/images/common/logo.png" },
    { name: "본전회수산", url: "https://map.naver.com/v5/entry/place/1246434043", logo: null },
];

// 총 9개 업체이므로 5개/4개로 나누어 2줄 배너 생성
const row1Partners = clients.slice(0, 5);
const row2Partners = clients.slice(5, 9);

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

    const LogoItem = ({ partner }: { partner: typeof clients[0] }) => (
        <a href={partner.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div className="partner-logo-item" style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
            }}>
                {partner.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={partner.logo}
                        alt={partner.name}
                        style={{
                            maxHeight: "100%",
                            maxWidth: "180px",
                            objectFit: "contain",
                            filter: "grayscale(1) brightness(2)", // 흰색/밝은 톤으로 맞추어 다크모드에 어울리게 변경
                            transition: "all 0.4s ease",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0) brightness(1)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(1) brightness(2)"; }}
                    />
                ) : (
                    <span style={{
                        fontWeight: 800,
                        color: "rgba(255,255,255,0.8)",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-geist-sans)",
                        transition: "color 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                    >
                        {partner.name}
                    </span>
                )}
            </div>
        </a>
    );

    return (
        <section id="포트폴리오" style={{ padding: "clamp(3rem, 6vw, 5rem) 0 clamp(4rem, 8vw, 8rem) 0", background: "var(--bg-color)", position: "relative", zIndex: 10 }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>

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
                            style={{ display: "flex", width: "fit-content", gap: "clamp(2rem, 5vw, 6rem)", paddingRight: "clamp(2rem, 5vw, 6rem)" }}
                        >
                            {[...row1Partners, ...row1Partners].map((partner, i) => (
                                <LogoItem key={`r1-${i}`} partner={partner} />
                            ))}
                        </div>

                        {/* Row 2 (Moves Right) */}
                        <div
                            ref={marquee2Ref}
                            style={{ display: "flex", width: "fit-content", gap: "clamp(2rem, 5vw, 6rem)", paddingRight: "clamp(2rem, 5vw, 6rem)" }}
                        >
                            {[...row2Partners, ...row2Partners].map((partner, i) => (
                                <LogoItem key={`r2-${i}`} partner={partner} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <style>{`
                .partner-logo-item {
                    font-size: 2rem;
                }
                @media (max-width: 768px) {
                    .partner-logo-item {
                        font-size: 1.2rem;
                    }
                }
            `}</style>
        </section>
    );
}
