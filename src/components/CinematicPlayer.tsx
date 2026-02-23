"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

interface VideoData {
    uid: string;
    meta: {
        name: string;
        client?: string;
        category: string;
    };
}

export default function CinematicPlayer({ videoData }: { videoData: VideoData }) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isHovering, setIsHovering] = useState(true);

    const videoUrl = `https://iframe.videodelivery.net/${videoData.uid}?autoplay=true&controls=true&muted=false&loop=true`;

    const startFadeOutTimer = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsHovering(false);
            gsap.to(overlayRef.current, { opacity: 0, duration: 1.5, ease: "power2.inOut" });
        }, 3000);
    }, []);

    useEffect(() => {
        // 초기에 오버레이를 페이드 인
        gsap.to(overlayRef.current, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        });

        // 3초 후 자동 페이드 아웃
        startFadeOutTimer();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [startFadeOutTimer]);

    useEffect(() => {
        if (isHovering) {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
            startFadeOutTimer();
        }
    }, [isHovering, startFadeOutTimer]);

    const handleMouseMove = () => {
        if (!isHovering) setIsHovering(true);
        else startFadeOutTimer(); // 마우스가 움직일 때마다 타이머 갱신
    };

    return (
        <div
            style={{
                width: "100ww",
                height: "100vh",
                backgroundColor: "#000",
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                overflow: "hidden"
            }}
            onMouseMove={handleMouseMove}
        >
            {/* Full-bleed Video iframe */}
            <iframe
                src={videoUrl}
                style={{
                    border: "none",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    inset: 0,
                    pointerEvents: isHovering ? "auto" : "auto", // 컨트롤바 클릭을 위해 iframe 로드
                }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
            ></iframe>

            {/* Cinematic Overlay UI */}
            <div
                ref={overlayRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none", // 오버레이 클릭 무시하고 아래 iframe으로 전달
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "40px",
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.8) 100%)",
                    opacity: 0
                }}
            >
                {/* Header / Back Button */}
                <div style={{ pointerEvents: "auto" }}>
                    <Link href="/works" style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: "14px",
                        letterSpacing: "0.1em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        backdropFilter: "blur(10px)",
                        background: "rgba(255,255,255,0.1)",
                        padding: "10px 20px",
                        borderRadius: "30px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        transition: "background 0.3s"
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                    >
                        ← BACK TO GALLERY
                    </Link>
                </div>

                {/* Footer Info */}
                <div style={{ pointerEvents: "none", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
                    <div style={{
                        fontSize: "12px",
                        color: "var(--accent-color)",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        marginBottom: "8px",
                        fontWeight: 600
                    }}>
                        {videoData.meta?.category || "PORTFOLIO"}
                    </div>
                    <h1 style={{
                        fontSize: "clamp(2rem, 4vw, 3.5rem)",
                        fontWeight: 900,
                        color: "#fff",
                        marginBottom: "8px",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1
                    }}>
                        {videoData.meta?.name || "Untitled Project"}
                    </h1>
                    {videoData.meta?.client && (
                        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", fontWeight: 500, margin: 0 }}>
                            Client : {videoData.meta.client}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
