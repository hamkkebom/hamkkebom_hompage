"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import GNB from "@/components/GNB";

gsap.registerPlugin(ScrollTrigger);

const images = [
    { src: "/about/1.png", alt: "회사 소개 이미지 1" },
    { src: "/about/2.png", alt: "회사 소개 이미지 2" },
    { src: "/about/3.png", alt: "회사 소개 이미지 3" },
    { src: "/about/4.png", alt: "회사 소개 이미지 4" },
    { src: "/about/5.png", alt: "회사 소개 이미지 5" },
    { src: "/about/6.png", alt: "회사 소개 이미지 6" },
    { src: "/about/7.png", alt: "회사 소개 이미지 7" },
    { src: "/about/8.png", alt: "회사 소개 이미지 8" },
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !sliderRef.current) return;

        const slides = gsap.utils.toArray<HTMLElement>(".about-slide");

        // Horizontal Scroll Animation using GSAP
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1, // Smooth scrubbing effect
                start: "top top",
                end: () => `+=${sliderRef.current?.scrollWidth || window.innerWidth * slides.length}`,
                invalidateOnRefresh: true, // Recalculate on window resize
            }
        });

        // Translate the slider container horizontally
        tl.to(sliderRef.current, {
            xPercent: -100 * (slides.length - 1),
            ease: "none" // Linear movement is crucial for smooth scroll connection
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <main style={{ background: "transparent", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
            {/* Navigation Header */}
            <GNB />

            {/* Pinned Horizontal Scroll Section */}
            <section
                ref={containerRef}
                style={{
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "transparent"
                }}
            >
                {/* Close/Back Button Overlay */}
                <div style={{
                    position: "absolute",
                    top: "120px",
                    left: "2rem",
                    zIndex: 50
                }}>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <button style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#fff",
                            padding: "0.8rem 1.5rem",
                            borderRadius: "30px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: 600,
                            transition: "all 0.3s"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                                e.currentTarget.style.borderColor = "var(--accent-color)";
                                e.currentTarget.style.color = "var(--accent-color)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(0,0,0,0.5)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                                e.currentTarget.style.color = "#fff";
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            돌아가기
                        </button>
                    </Link>
                </div>

                {/* Tracking Container */}
                <div
                    ref={sliderRef}
                    style={{
                        display: "flex",
                        height: "100%",
                        width: `${images.length * 100}vw`, // Crucial: Total width = viewport width * number of slides
                        willChange: "transform" // Force GPU acceleration
                    }}
                >
                    {images.map((img, idx) => (
                        <div
                            key={`about-slide-${idx}`}
                            className="about-slide"
                            style={{
                                width: "100vw",
                                height: "100vh",
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "2rem", // Safe area padding
                            }}
                        >
                            {/* Inner Wrapper to contain the 4:5 image ratio optimally on screen */}
                            <div style={{
                                position: "relative",
                                width: "100%",
                                maxWidth: "800px", // Cap width so it doesn't get too bloated on ultra-wide screens
                                height: "100%",
                                maxHeight: "90vh",
                                borderRadius: "20px",
                                overflow: "hidden",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                                backgroundColor: "#111" // Placeholder while loading
                            }}>
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    priority={idx === 0} // Preload the first image for LCP
                                    sizes="(max-width: 800px) 100vw, 800px" // Optimize responsive image loading
                                    style={{
                                        objectFit: "contain", // Or 'cover' depending on preference, 'contain' ensures whole 4:5 image is visible
                                        willChange: "transform"
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
