"use client";

import { useEffect, useRef, useState } from "react";

export default function AiSloganSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentRef = sectionRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // 딱 한 번만 실행되도록
                }
            },
            {
                root: null,
                rootMargin: "0px 0px -15% 0px", // 화면에 약간 더 들어왔을 때 트리거
                threshold: 0.1,
            }
        );

        observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    // 단어 단위 쪼개기 애니메이션 (띄어쓰기 유지!)
    const splitTextToWords = (text: string, baseDelay: number, stagger: number) => {
        return text.split(" ").map((word, idx) => (
            <span
                key={idx}
                className="slogan-word-wrapper"
                style={{
                    display: "inline-block",
                    overflow: "hidden",
                    paddingBottom: "5px",
                    marginRight: "0.25em", // 띄어쓰기 여백!
                }}
            >
                <span
                    className={`slogan-word-reveal ${isVisible ? 'active' : ''}`}
                    style={{
                        display: "inline-block",
                        animationDelay: `${baseDelay + (idx * stagger)}s`
                    }}
                >
                    {word}
                </span>
            </span>
        ));
    };

    // 글자 단위 쪼개기 애니메이션 (제목용)
    const splitTextToChars = (text: string, baseDelay: number, stagger: number) => {
        return text.split("").map((char, idx) => {
            if (char === " ") return <span key={idx} style={{ display: "inline-block", width: "0.4em" }} />;
            return (
                <span key={idx} style={{ display: "inline-block", overflow: "hidden" }}>
                    <span
                        className={`slogan-char-reveal ${isVisible ? 'active' : ''}`}
                        style={{
                            display: "inline-block",
                            animationDelay: `${baseDelay + (idx * stagger)}s`
                        }}
                    >
                        {char}
                    </span>
                </span>
            )
        });
    }

    return (
        <section
            ref={sectionRef}
            style={{
                width: "100%",
                minHeight: "80vh",
                backgroundColor: "var(--bg-color, #050505)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "8rem 1rem",
                overflow: "hidden",
                position: "relative",
                zIndex: 10
            }}
        >
            {/* 다이내믹 배경 네온 효과 (시네마틱) */}
            <div
                className={`slogan-bg-glow ${isVisible ? 'active' : ''}`}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(0.5)",
                    width: "100%",
                    maxWidth: "1000px",
                    height: "400px",
                    background: "rgba(0, 240, 255, 0.08)",
                    borderRadius: "50%",
                    filter: "blur(120px)",
                    pointerEvents: "none",
                    opacity: 0,
                    transition: "all 2.5s ease-out",
                }}
            />

            <div style={{ maxWidth: "1200px", width: "100%", textAlign: "center", position: "relative", zIndex: 10 }}>

                {/* 1st Line: Intro */}
                <h3
                    className={`slogan-fade-up ${isVisible ? 'active' : ''}`}
                    style={{
                        fontSize: "clamp(1rem, 2vw, 1.4rem)",
                        color: "rgba(255, 255, 255, 0.7)",
                        fontWeight: 300,
                        marginBottom: "2rem",
                        wordBreak: "keep-all",
                        animationDelay: "0.1s"
                    }}
                >
                    단순히 시각만 자극하고 흩어지는 15초짜리 영상이 아닙니다.
                </h3>

                {/* 2nd Line: Mid Header with Stagger */}
                <h2
                    style={{
                        fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
                        color: "#fff",
                        fontWeight: 800,
                        lineHeight: 1.5,
                        letterSpacing: "-0.03em",
                        marginBottom: "4rem",
                        wordBreak: "keep-all"
                    }}
                >
                    <div style={{ marginBottom: "0.5rem" }}>
                        {splitTextToWords("맞춤형 AI 음악과 압도적인 비주얼의 융합으로,", 0.4, 0.08)}
                    </div>
                    <div>
                        {splitTextToWords("망막을 넘어", 0.9, 0.08)}
                        <span style={{ color: "var(--accent-color, #00f0ff)", display: "inline-block", marginLeft: "0.2em" }}>
                            {splitTextToWords("고막에 영원히 각인될", 1.2, 0.08)}
                        </span>
                    </div>
                </h2>

                {/* 3rd Line: The Giant Core Slogan */}
                <div style={{ margin: "5rem 0 6rem 0" }}>
                    <h1
                        style={{
                            fontSize: "clamp(3rem, 10vw, 7.5rem)",
                            color: "#fff",
                            fontWeight: 900,
                            lineHeight: 1.1,
                            letterSpacing: "-0.04em",
                            margin: 0,
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            textShadow: "0 0 25px rgba(255, 255, 255, 0.2)"
                        }}
                    >
                        {splitTextToChars("100년 가는 노래광고 영상", 1.8, 0.06)}
                    </h1>
                </div>

                {/* 4th Line: Label */}
                <h4
                    className={`slogan-label-expand ${isVisible ? 'active' : ''}`}
                    style={{
                        fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
                        fontWeight: 900,
                        color: "var(--accent-color, #00f0ff)",
                        textTransform: "uppercase",
                        animationDelay: "3.2s",
                        whiteSpace: "nowrap"
                    }}
                >
                    AI Song Branding <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 15px", fontWeight: 300 }}>X</span> Cinematic Visual
                </h4>

            </div>

            {/* Hardware Accelerated CSS Animations */}
            <style jsx>{`
                /* Background Glow Transition */
                .slogan-bg-glow.active {
                    opacity: 1 !important;
                    transform: translate(-50%, -50%) scale(1) !important;
                }

                /* 1. Basic Fade Up with Blur */
                .slogan-fade-up {
                    opacity: 0;
                    transform: translateY(30px);
                    filter: blur(8px);
                }
                .slogan-fade-up.active {
                    animation: fadeUpBlur 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes fadeUpBlur {
                    0% { opacity: 0; transform: translateY(30px); filter: blur(8px); }
                    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
                }

                /* 2. Word Reveal (Staggered bottom-up with slight 3D rotate for cinematic feel) */
                .slogan-word-reveal {
                    opacity: 0;
                    transform: translateY(110%) rotateX(-20deg);
                    transform-origin: top center;
                    will-change: transform, opacity;
                }
                .slogan-word-reveal.active {
                    animation: wordReveal 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
                }

                @keyframes wordReveal {
                    0% { opacity: 0; transform: translateY(110%) rotateX(-20deg); }
                    100% { opacity: 1; transform: translateY(0) rotateX(0); }
                }

                /* 3. Giant Text Char Reveal */
                .slogan-char-reveal {
                    opacity: 0;
                    transform: translateY(120%) scaleY(1.3);
                    will-change: transform, opacity;
                }
                .slogan-char-reveal.active {
                    animation: charReveal 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }

                @keyframes charReveal {
                    0% { opacity: 0; transform: translateY(120%) scaleY(1.3); }
                    100% { opacity: 1; transform: translateY(0) scaleY(1); }
                }

                /* 4. Label Expand Pattern */
                .slogan-label-expand {
                    opacity: 0;
                    letter-spacing: 0em;
                    transform: scale(0.9);
                    filter: blur(8px);
                }
                .slogan-label-expand.active {
                    animation: labelExpand 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes labelExpand {
                    0% { opacity: 0; letter-spacing: 0em; transform: scale(0.9); filter: blur(8px); }
                    50% { opacity: 1; filter: blur(0); }
                    100% { opacity: 1; letter-spacing: 0.5em; transform: scale(1); filter: blur(0); }
                }
            `}</style>

            {/* 레이저 선 효과 (빛) */}
            <div
                className={`slogan-beam-1 ${isVisible ? 'active' : ''}`}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "200vw",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.2), transparent)",
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%) rotate(-6deg) scaleX(0)",
                    opacity: 0,
                    transition: "transform 2.5s ease-out 0.8s, opacity 2.5s ease-out 0.8s"
                }}
            />
            <div
                className={`slogan-beam-2 ${isVisible ? 'active' : ''}`}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "200vw",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%) rotate(4deg) scaleX(0)",
                    opacity: 0,
                    transition: "transform 2.5s ease-out 1.2s, opacity 2.5s ease-out 1.2s"
                }}
            />
            <style jsx>{`
                .slogan-beam-1.active {
                    transform: translate(-50%, -50%) rotate(-6deg) scaleX(1) !important;
                    opacity: 1 !important;
                }
                .slogan-beam-2.active {
                    transform: translate(-50%, -50%) rotate(4deg) scaleX(1) !important;
                    opacity: 1 !important;
                }
            `}</style>
        </section>
    );
}
