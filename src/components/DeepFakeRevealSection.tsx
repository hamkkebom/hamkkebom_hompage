"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DeepFakeRevealSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subTextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current || !subTextRef.current) return;

        // --- Split Text Manually (since we don't have SplitText plugin) ---
        const textElement = textRef.current;
        const originalText = textElement.innerHTML; // get the br tag as well

        // We'll split by line first, then by character
        const lines = originalText.split('<br>');
        textElement.innerHTML = '';

        lines.forEach((line, lineIndex) => {
            const lineDiv = document.createElement('div');
            lineDiv.style.overflow = 'hidden'; // For the reveal clipping 
            lineDiv.style.display = 'block';
            lineDiv.style.lineHeight = '1.3';

            const chars = line.trim().split('');
            chars.forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.innerText = char === ' ' ? '\u00A0' : char; // preserve spaces
                charSpan.className = 'reveal-char';
                charSpan.style.display = 'inline-block';
                // Initial state for animation
                charSpan.style.transform = 'translateY(100%) rotateX(-90deg) translateZ(-50px)';
                charSpan.style.opacity = '0';
                charSpan.style.transformOrigin = '50% 100%';

                // Color specific words
                if (lineIndex === 1 && (char === 'A' || char === 'I')) {
                    charSpan.style.color = 'var(--accent-color)';
                    charSpan.style.textShadow = '0 0 15px rgba(0,240,255,0.5)';
                } else if (lineIndex === 1) {
                    charSpan.style.color = 'var(--text-secondary)';
                }

                lineDiv.appendChild(charSpan);
            });
            textElement.appendChild(lineDiv);
        });

        const chars = gsap.utils.toArray<HTMLElement>(".reveal-char");

        // --- GSAP Animation ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%", // Start animating when the section is 40% into the viewport
                end: "center center",
                scrub: 0.5, // Smooth scrubbing
            }
        });

        // 1. Subtext fade in
        tl.fromTo(subTextRef.current,
            { opacity: 0, y: 30, filter: "blur(5px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" }
        );

        // 2. 3D Character reveal
        tl.to(chars, {
            transform: 'translateY(0%) rotateX(0deg) translateZ(0px)',
            opacity: 1,
            duration: 1.5,
            stagger: 0.05, // Stagger each character
            ease: "back.out(1.7)", // Bouncy overshoot effect
        }, "-=0.5"); // Overlap with subtext animation

        // 3. Subtle floating scale after reveal
        tl.to(containerRef.current, {
            scale: 1.05,
            duration: 3,
            ease: "sine.inOut",
        }, "-=1");

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            id="서비스설명"
            ref={containerRef}
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 10,
                perspective: "1000px" // Enable 3D perspective for children
            }}
        >
            <p
                ref={subTextRef}
                style={{
                    color: "var(--accent-color)",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    letterSpacing: "0.4em",
                    marginBottom: "1.5rem",
                    textShadow: "0 0 10px rgba(0,240,255,0.4)"
                }}
            >
                100% GENERATIVE VARIABLE
            </p>
            <h2
                ref={textRef}
                style={{
                    fontSize: "clamp(2.5rem, 5vw, 5rem)",
                    fontWeight: 800,
                    textAlign: "center",
                    lineHeight: 1.3,
                    color: "white",
                    margin: 0
                }}
            >
                인간의 한계를 삭제한<br />가장 압도적인 AI 브랜딩
            </h2>
            {/* Background ambient glow matching the text */}
            <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: "60vmin", height: "60vmin",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 60%)",
                filter: "blur(40px)",
                zIndex: -1,
                pointerEvents: "none"
            }} />
        </section>
    );
}
