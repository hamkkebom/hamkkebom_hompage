"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAMPAIGNS = [
    { platform: "YouTube", videoId: "vYAtCeIwW7Y", roas: 547, label: "Campaign Gamma" },
    { platform: "YouTube", videoId: "KnEr40LjwLo", roas: 617, label: "Campaign Beta" },
    { platform: "YouTube", videoId: "3UALtP4QRos", roas: 845, label: "Campaign Alpha" }
];

export default function RoasShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const roasNumberRef = useRef<HTMLHeadingElement>(null);

    // To trigger lazy loading strictly when a card is in the center
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!sectionRef.current || !trackRef.current || !roasNumberRef.current) return;

        // Ensure ScrollTrigger is refreshed before calculations
        ScrollTrigger.refresh();

        const trackHeight = trackRef.current.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollDistance = trackHeight - windowHeight;

        const cards = gsap.utils.toArray<HTMLElement>('.roas-card');

        // The scrub timeline moves the whole track UP.
        const scrollTween = gsap.to(trackRef.current, {
            y: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,           // Pin the section
                scrub: 1,            // Smooth scrub
                start: "top top",
                end: () => `+=${scrollDistance}`, // End EXACTLY when the travel distance finishes = NO GAP
                onUpdate: (self) => {
                    const progress = self.progress;

                    const cardCount = CAMPAIGNS.length;
                    const cardProgress = progress * cardCount;
                    let newIndex = Math.floor(cardProgress);
                    if (newIndex < 0) newIndex = 0;
                    if (newIndex >= cardCount) newIndex = cardCount - 1;

                    if (newIndex !== activeIndex) {
                        setActiveIndex(newIndex);
                    }

                    // Bulletproof physics: calculate exact physical distance of each card to the screen center
                    const windowCenter = window.innerHeight / 2;

                    cards.forEach((card, index) => {
                        const rect = card.getBoundingClientRect();
                        const cardCenter = rect.top + rect.height / 2;
                        const dist = Math.abs(windowCenter - cardCenter);

                        // Map distance to a 0 to 1 value (0 = center, 1 = edge of screen or further)
                        let normalizedDist = dist / (window.innerHeight * 0.6);
                        if (normalizedDist > 1) normalizedDist = 1;

                        const scale = 1 - (normalizedDist * 0.3); // Scale drops slightly
                        const opacity = 1 - Math.pow(normalizedDist, 2.5); // Opacity drops steeply

                        // 845% Final Pop effect
                        const isFinal = index === CAMPAIGNS.length - 1;
                        const finalScale = (isFinal && normalizedDist < 0.15) ? 1.05 : 1;

                        gsap.set(card, {
                            scale: scale * finalScale,
                            opacity: Math.max(0.1, opacity),
                            filter: normalizedDist < 0.2 ? "grayscale(0%) brightness(1.2)" : "grayscale(100%) brightness(0.5)",
                            boxShadow: (isFinal && normalizedDist < 0.15) ? "0 20px 80px rgba(0,0,0,0.8), 0 0 60px rgba(0,240,255,0.4)" : "none",
                            borderRadius: normalizedDist < 0.15 ? "0px" : "150px 30px 150px 30px",
                            rotationX: normalizedDist * 15, // Rotate on X axis slightly as it moves away
                        });
                    });
                }
            }
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
            // VERY IMPORTANT: Refresh ScrollTrigger so HeroSection and others recalculate positions after ROAS changes
            setTimeout(() => ScrollTrigger.refresh(), 50);
        };
    }, []); // Empty dependency array to run once on mount

    // --- 3. Animate Background Number when Active Index Changes ---
    useEffect(() => {
        if (!roasNumberRef.current) return;

        const targetRoas = CAMPAIGNS[activeIndex].roas;

        // GSAP Counter Animation
        gsap.to(roasNumberRef.current, {
            innerHTML: targetRoas,
            duration: 0.8,
            snap: { innerHTML: 1 },
            ease: "power2.out",
            onUpdate: function () {
                if (roasNumberRef.current) {
                    roasNumberRef.current.innerText = Math.round(this.targets()[0].innerHTML) + "%";
                }
            }
        });

        // Scale & Color bump for impact
        gsap.fromTo(roasNumberRef.current,
            { scale: 1.1, color: "#fff", textShadow: "0 0 50px rgba(255,255,255,1)" },
            { scale: 1, color: "var(--accent-color)", textShadow: "0 0 30px rgba(0,240,255,0.4)", duration: 0.8, ease: "bounce.out" }
        );

    }, [activeIndex]);

    return (
        <section
            id="roas-showcase"
            ref={sectionRef}
            style={{
                width: "100%",
                height: "100vh", // Pin container takes exact screen height
                position: "relative",
                overflow: "hidden", // Hide track overflow
                backgroundColor: "#030812",
            }}
        >
            {/* Background Massive Number (Fixed center of pinned section) */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                width: "100%",
                textAlign: "center",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    letterSpacing: "0.5em",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: "-2rem"
                }}>
                    PROVEN PERFORMANCE
                </div>
                <h2
                    ref={roasNumberRef}
                    style={{
                        fontSize: "clamp(12rem, 30vw, 35rem)",
                        fontWeight: 900,
                        margin: 0,
                        lineHeight: 1,
                        color: "var(--accent-color)",
                        opacity: 0.15,
                        fontVariantNumeric: "tabular-nums",
                        willChange: "transform, opacity, color"
                    }}
                >
                    0%
                </h2>
                <div style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    color: "#fff",
                    textShadow: "0 0 20px rgba(255,255,255,0.5)",
                    marginTop: "-2rem",
                    opacity: 0.8
                }}>
                    ROAS
                </div>
            </div>

            {/* Vertical Cards Track - Translated Up via GSAP */}
            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "50vh", // Spatial distance between cards
                    paddingTop: "50vh", // Padding so first card starts roughly center
                    paddingBottom: "100vh", // Heavy padding at end so last card lands center and doesn't run out of track
                    zIndex: 2,
                    position: "relative",
                    width: "100%"
                }}
            >
                {CAMPAIGNS.map((camp, idx) => {
                    const isActive = idx === activeIndex;

                    return (
                        <div
                            key={`roas-art-frame-${idx}`}
                            className="roas-card"
                            style={{
                                flexShrink: 0,
                                width: "clamp(320px, 30vw, 500px)",
                                height: "clamp(480px, 70vh, 850px)",
                                position: "relative",
                                transformOrigin: "center center",
                            }}
                        >
                            {/* The Artistic Container */}
                            <div className="roas-card-inner" style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                overflow: "hidden",
                                background: "#000",
                            }}>
                                {/* Dark Gradient Overlay so white text always pops */}
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%)",
                                    zIndex: 5,
                                    pointerEvents: "none"
                                }} />

                                {/* Platform Minimal Badge */}
                                <div style={{
                                    position: "absolute",
                                    top: "2rem",
                                    right: "2rem",
                                    zIndex: 10,
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    padding: "4px 12px",
                                    color: "#fff",
                                    textTransform: "uppercase",
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.2em",
                                    opacity: isActive ? 1 : 0,
                                    transition: "opacity 0.4s",
                                    transitionDelay: isActive ? "0.4s" : "0s"
                                }}>
                                    {camp.platform}
                                </div>

                                {/* Video or Placeholder */}
                                {camp.videoId !== "placeholder" && (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${camp.videoId}?autoplay=1&mute=1&loop=1&playlist=${camp.videoId}&controls=0&modestbranding=1&showinfo=0`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        style={{
                                            pointerEvents: "none",
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%) scale(1.1)", // Slightly scaled up for edge bleed
                                        }}
                                    />
                                )}

                                {/* High-Contrast Typography Layout overlay on video */}
                                <div style={{
                                    position: "absolute",
                                    bottom: "2rem",
                                    left: "2rem",
                                    right: "2rem",
                                    zIndex: 10,
                                    transform: isActive ? "translateY(0)" : "translateY(20px)",
                                    opacity: isActive ? 1 : 0,
                                    transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                                    transitionDelay: isActive ? "0.3s" : "0s",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start"
                                }}>
                                    <h4 style={{
                                        color: "rgba(255,255,255,0.6)",
                                        fontSize: "0.9rem",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.3em",
                                        marginBottom: "0.5rem"
                                    }}>
                                        {camp.label}
                                    </h4>

                                    <div style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        gap: "0.5rem"
                                    }}>
                                        <span style={{
                                            color: "var(--accent-color)",
                                            fontSize: "1.2rem",
                                            fontWeight: 800,
                                            letterSpacing: "0.2em",
                                            textShadow: "0 0 20px rgba(0,240,255,0.4)"
                                        }}>
                                            ROAS
                                        </span>
                                        <span style={{
                                            fontSize: "clamp(3rem, 6vw, 5rem)",
                                            fontWeight: 900,
                                            color: "#fff",
                                            lineHeight: 0.9,
                                            letterSpacing: "-0.03em"
                                        }}>
                                            {camp.roas}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes spin {
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}
