"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Animate text blocks on scroll
        const textElements = gsap.utils.toArray<HTMLElement>(".story-text-block");

        textElements.forEach((el) => {
            gsap.fromTo(
                el,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Trigger slightly before it comes into full view
                        toggleActions: "play none none reverse", // Play down, reverse up
                    },
                }
            );
        });

        // Cleanup function for ScrollTrigger
        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.vars.trigger && typeof t.vars.trigger !== "string" && (t.vars.trigger as HTMLElement).classList?.contains('story-text-block')) {
                    t.kill();
                }
            });
        };
    }, []);

    return (
        <section
            id="서비스설명"
            ref={containerRef}
            style={{
                backgroundColor: "var(--bg-color)", // Using the global dark background
                padding: "10rem 2rem", // Generous whitespace for premium feel
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                color: "#fff",
                position: "relative",
                zIndex: 10,
            }}
        >
            <div style={{ maxWidth: "900px", width: "100%", display: "flex", flexDirection: "column", gap: "8rem" }}>

                {/* Block 1 */}
                <div className="story-text-block">
                    <h3 style={{
                        fontSize: "clamp(1.8rem, 5vw, 3rem)",
                        fontWeight: 700,
                        lineHeight: 1.4,
                        wordBreak: "keep-all",
                        margin: 0
                    }}>
                        우리는 <span style={{ color: "var(--accent-color)" }}>AI송을 기반</span>으로 한 <br />영상 브랜딩 생태계를 만들어 나갑니다.
                    </h3>
                </div>

                {/* Block 2 */}
                <div className="story-text-block">
                    <p style={{
                        fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                        fontWeight: 400,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.8)",
                        margin: 0,
                        wordBreak: "keep-all"
                    }}>
                        100년 가는 광고영상은 없습니다.<br />
                        하지만 <strong style={{ color: "#fff", fontWeight: 700, backgroundImage: "linear-gradient(90deg, #fff, var(--accent-color))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>100년 가는 노래광고영상</strong>은 있습니다.<br />
                        <br />
                        시장의 트렌드가 빠르게 변하는 속에서,<br />
                        단 한 번을 들어도 뇌리에 박히는 영상과 슬로건을 제작합니다.
                    </p>
                </div>

                {/* Block 3 */}
                <div className="story-text-block" style={{
                    padding: "4rem",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "2rem",
                    background: "rgba(255,255,255,0.02)",
                    backdropFilter: "blur(10px)",
                }}>
                    <h3 style={{
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        margin: 0,
                        letterSpacing: "-0.02em"
                    }}>
                        누적 제작 풀버전 영상 수만<br />
                        <span style={{
                            color: "var(--accent-color)",
                            textShadow: "0 0 40px rgba(0, 240, 255, 0.4)"
                        }}>400여 건.</span>
                    </h3>
                    <p style={{
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.7)",
                        marginTop: "2rem",
                        marginBottom: 0,
                        wordBreak: "keep-all"
                    }}>
                        이미 수많은 브랜드가 저희 서비스를 이용하고 있습니다.<br />
                        압도적인 데이터로 증명된 AI 영상 브랜딩의 선두주자입니다.
                    </p>
                </div>

                {/* Block 4 */}
                <div className="story-text-block">
                    <p style={{
                        fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                        fontWeight: 600,
                        lineHeight: 1.6,
                        margin: 0,
                        wordBreak: "keep-all"
                    }}>
                        노래 작곡부터 영상 제작, 그리고 완성형 슬로건까지.<br />
                        <br />
                        <span style={{
                            color: "var(--accent-color)",
                            borderBottom: "2px solid var(--accent-color)",
                            paddingBottom: "4px"
                        }}>
                            비즈니스를 성공으로 이끄는 혁신적인 맞춤형 영상 솔루션
                        </span>을 설계합니다.
                    </p>
                </div>

            </div>
        </section>
    );
}
