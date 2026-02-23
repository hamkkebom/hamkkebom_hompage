"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- TILE GRID CONFIGURATION ---
const COLS = 5;
const ROWS = 4;
const TOTAL_TILES = COLS * ROWS;

// --- CANVAS 2D SPARK PARTICLE ENGINE ---
interface Spark {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    hue: number;
}

function initSparkCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")!;
    const sparks: Spark[] = [];
    let progress = 0;
    let animId: number;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnBurst = (count: number) => {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 8;
            sparks.push({
                x: cx + (Math.random() - 0.5) * canvas.width * 0.6,
                y: cy + (Math.random() - 0.5) * canvas.height * 0.6,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                maxLife: 0.5 + Math.random() * 1.5,
                size: 1 + Math.random() * 3,
                hue: 180 + Math.random() * 100,
            });
        }
    };

    const loop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (progress > 0.05 && progress < 0.6 && Math.random() < progress * 2) {
            spawnBurst(Math.floor(3 + progress * 15));
        }
        for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.05;
            s.life -= 1 / 60 / s.maxLife;
            if (s.life <= 0) { sparks.splice(i, 1); continue; }
            const alpha = s.life;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${s.hue}, 100%, 70%, ${alpha})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * alpha * 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${s.hue}, 100%, 70%, ${alpha * 0.15})`;
            ctx.fill();
        }
        animId = requestAnimationFrame(loop);
    };
    loop();

    return {
        setProgress: (p: number) => { progress = p; },
        destroy: () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        },
    };
}

// Build tile geometry once (static)
const TILE_GEOMETRY: { row: number; col: number; clipPath: string }[] = [];
for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
        const l = (col / COLS) * 100;
        const t = (row / ROWS) * 100;
        const r = ((col + 1) / COLS) * 100;
        const b = ((row + 1) / ROWS) * 100;
        TILE_GEOMETRY.push({
            row, col,
            clipPath: `polygon(${l}% ${t}%, ${r}% ${t}%, ${r}% ${b}%, ${l}% ${b}%)`
        });
    }
}

export default function HeroScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const baseVideoRef = useRef<HTMLVideoElement>(null);
    const sparkEngineRef = useRef<ReturnType<typeof initSparkCanvas> | null>(null);
    const [tilesLoaded, setTilesLoaded] = useState(false);
    const shatterSetupDone = useRef(false);

    // Inject <video> into each tile progressively to avoid 20-video decoder bottleneck
    const injectTileVideos = useCallback(() => {
        if (tilesLoaded) return;
        setTilesLoaded(true);

        const tileDivs = document.querySelectorAll<HTMLElement>(".hero-tile");

        // Extract row/col info from tile keys or calculate it, then sort by distance from center (descending)
        const tilesArr = Array.from(tileDivs).map((tile, i) => {
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            const centerRow = (ROWS - 1) / 2;
            const centerCol = (COLS - 1) / 2;
            const dist = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
            return { tile, dist };
        });

        // Sort descending: furtheset from center (outside edges) first
        tilesArr.sort((a, b) => b.dist - a.dist);

        // Add videos one by one with a slight delay
        tilesArr.forEach(({ tile }, index) => {
            setTimeout(() => {
                if (tile.querySelector("video")) return;
                const video = document.createElement("video");
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;pointer-events:none;opacity:0;transition:opacity 0.6s ease;";

                // Fade in video once it actually plays to avoid pop-in
                video.addEventListener('playing', () => {
                    video.style.opacity = '1';
                }, { once: true });

                const source = document.createElement("source");
                source.src = "/videos/main-hero.mp4";
                source.type = "video/mp4";
                video.appendChild(source);
                tile.appendChild(video);
            }, index * 80); // 80ms delay between each tile = 1.6s total for 20 tiles
        });
    }, [tilesLoaded]);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        sparkEngineRef.current = initSparkCanvas(canvasRef.current);

        const glitchOverlay = document.querySelector<HTMLElement>(".glitch-overlay");

        // Slogan MUST be hidden before JS (also hidden inline, belt-and-suspenders)
        gsap.set(".slogan-text", { scale: 1.8, opacity: 0, filter: "blur(20px)", display: "none" });
        gsap.set(".cyber-bg", { opacity: 0 });

        // Set up tile transforms
        const tiles = gsap.utils.toArray<HTMLElement>(".hero-tile");
        gsap.set(tiles, { transformOrigin: "center center" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero-section",
                start: "top top",
                end: "+=2500",
                scrub: 0.3,
                pin: true,
                onUpdate: (self) => {
                    sparkEngineRef.current?.setProgress(self.progress);
                },
                onLeave: () => {
                    // ★ Hero 섹션을 완전히 지나갔을 때: 타일 숨기고 비디오 정지
                    const heroEl = document.getElementById("hero-section");
                    if (heroEl) heroEl.style.visibility = "hidden";
                    document.querySelectorAll<HTMLVideoElement>(".hero-tile video").forEach(v => {
                        try { v.pause(); } catch (_) { /* ignore */ }
                    });
                    if (baseVideoRef.current) {
                        try { baseVideoRef.current.pause(); } catch (_) { /* ignore */ }
                    }
                },
                onEnterBack: () => {
                    // ★ 위로 스크롤해서 Hero 섹션에 돌아왔을 때: 복원
                    const heroEl = document.getElementById("hero-section");
                    if (heroEl) heroEl.style.visibility = "visible";
                    document.querySelectorAll<HTMLVideoElement>(".hero-tile video").forEach(v => {
                        try { v.play(); } catch (_) { /* ignore */ }
                    });
                    if (baseVideoRef.current) {
                        try { baseVideoRef.current.play(); } catch (_) { /* ignore */ }
                    }
                },
            },
        });

        // Trigger progressive loading immediately after initial animations setup
        if (!shatterSetupDone.current) {
            shatterSetupDone.current = true;
            // Delay start slightly to let page structure settle (reduced to 100ms)
            setTimeout(injectTileVideos, 100);
        }

        // Phase 1: Fade out the base video as tiles take over (now based on scroll)
        if (baseVideoRef.current) {
            tl.to(baseVideoRef.current, {
                opacity: 0,
                duration: 0.15,
                ease: "power2.in",
            }, 0.06);
        }

        // Phase 2: EMP Glitch Flash
        tl.to(glitchOverlay, {
            opacity: 1,
            duration: 0.04,
            ease: "power4.in",
        }, 0.05)
            .to(glitchOverlay, {
                opacity: 0,
                duration: 0.04,
                ease: "power4.out",
            }, 0.09);

        // Phase 3: Tiles Shatter
        tiles.forEach((tile, i) => {
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            const dx = (col - (COLS - 1) / 2) * 1;
            const dy = (row - (ROWS - 1) / 2) * 1;
            const dist = Math.sqrt(dx * dx + dy * dy) + 0.5;
            const delay = 0.08 + dist * 0.04 + Math.random() * 0.03;

            tl.to(tile, {
                x: dx * (400 + Math.random() * 300),
                y: dy * (350 + Math.random() * 250),
                rotation: (Math.random() - 0.5) * 120,
                scale: 0.2 + Math.random() * 0.4,
                opacity: 0,
                filter: `brightness(${2 + Math.random() * 4}) hue-rotate(${Math.random() * 90}deg)`,
                duration: 0.5,
                ease: "power2.in",
            }, delay);
        });

        // Phase 4: Background reveal
        tl.to(".cyber-bg", {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
        }, 0.12);

        // Phase 5: Slogan Assembly
        tl.to(".slogan-text", {
            display: "block",
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.25,
            ease: "expo.out",
        }, 0.2)
            .to(".slogan-text", {
                scale: 1.05,
                textShadow: "0 0 40px rgba(0,240,255,0.8), 0 0 80px rgba(160,0,255,0.5)",
                duration: 0.55,
                ease: "sine.inOut",
            }, 0.45);

        // CSS Glitch Toggle
        const glitchST = ScrollTrigger.create({
            trigger: "#hero-section",
            start: "top top",
            end: "+=2500",
            onEnter: () => document.querySelector(".slogan-text")?.classList.add("hero-glitch-active"),
            onLeaveBack: () => document.querySelector(".slogan-text")?.classList.remove("hero-glitch-active"),
        });

        return () => {
            tl.kill();
            glitchST.kill();
            sparkEngineRef.current?.destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [injectTileVideos]);

    return (
        <div
            id="hero-section"
            ref={containerRef}
            style={{
                width: "100%",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#000",
            }}
        >
            {/* ★ Layer 0: SINGLE Base Video — 즉시 로드, 타일 뒤에서 깔림 ★ */}
            <video
                ref={baseVideoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
            >
                <source src="/videos/main-hero.mp4" type="video/mp4" />
            </video>

            {/* Layer 1: Cyber Background (hidden initially) */}
            <div className="cyber-bg" style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                zIndex: 0,
                background: "#030812",
            }}>
                <div style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "90vmin", height: "90vmin",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, rgba(100,0,255,0.04) 40%, transparent 70%)",
                    filter: "blur(60px)",
                    animation: "heroPulse 4s ease-in-out infinite alternate",
                }} />
                <div style={{
                    position: "absolute",
                    width: "200%", height: "200%",
                    top: "40%", left: "-50%",
                    backgroundImage:
                        "linear-gradient(rgba(0,240,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.07) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                    transform: "perspective(800px) rotateX(70deg)",
                    animation: "heroGridMove 12s linear infinite",
                }} />
            </div>

            {/* ★ Layer 2: Tile Grid — clip-path만 있는 빈 div, 
                 베이스 영상이 gaps 사이로 보이면서 타일 느낌 발생.
                 스크롤 시 JS로 <video>를 주입하여 Shatter 발동 ★ */}
            {TILE_GEOMETRY.map((geo, idx) => (
                <div
                    key={`tile-${geo.row}-${geo.col}`}
                    className="hero-tile"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        clipPath: geo.clipPath,
                        willChange: "transform, opacity, filter",
                        zIndex: 2,
                    }}
                />
            ))}

            {/* Layer 3: EMP Glitch Flash Overlay */}
            <div
                className="glitch-overlay"
                style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%", height: "100%",
                    zIndex: 5,
                    pointerEvents: "none",
                    opacity: 0,
                    background: "linear-gradient(135deg, rgba(0,255,255,0.9) 0%, rgba(255,255,255,0.95) 50%, rgba(140,0,255,0.8) 100%)",
                    mixBlendMode: "overlay",
                }}
            />

            {/* Layer 4: Scanline Noise */}
            <div style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                zIndex: 6,
                pointerEvents: "none",
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                animation: "heroScanline 0.1s steps(3) infinite",
            }} />

            {/* Layer 5: Canvas 2D Spark Particles */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%", height: "100%",
                    zIndex: 7,
                    pointerEvents: "none",
                }}
            />

            {/* Layer 6: Slogan (HIDDEN inline to prevent FOUC) */}
            <div style={{
                position: "absolute",
                top: "45%", left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 8,
                textAlign: "center",
                pointerEvents: "none",
                width: "100%",
            }}>
                <h1
                    className="slogan-text"
                    style={{
                        fontSize: "clamp(2.5rem, 6vw, 6rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        lineHeight: 1.2,
                        color: "#fff",
                        willChange: "transform, opacity, filter",
                        display: "none",
                        opacity: 0,
                    }}
                >
                    <span style={{
                        display: "block",
                        fontSize: "0.25em",
                        fontWeight: 600,
                        color: "#ff2a2a",
                        marginBottom: "1.2rem",
                        letterSpacing: "0.5em",
                        textShadow: "0 0 20px rgba(255,42,42,0.8)",
                        animation: "heroAlertBlink 2s infinite",
                    }}>
                        [ SYSTEM ALERT: CONTENT ORIGIN UNKNOWN ]
                    </span>
                    방금 당신이 본 영상,<br />
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.8em" }}>단 한 명의 현실도 </span>
                    <span className="hero-glitch-intense" style={{
                        display: "inline-block",
                        color: "var(--accent-color)",
                        textShadow: "0 0 20px rgba(0,240,255,0.8)"
                    }}>
                        존재하지 않습니다.
                    </span>
                </h1>
            </div>

            <style>{`
                @keyframes heroPulse {
                    0% { transform: translate(-50%,-50%) scale(0.85); opacity: 0.5; }
                    100% { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
                }
                @keyframes heroGridMove {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 50px; }
                }
                @keyframes heroScanline {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(4px); }
                }
                @keyframes heroGlitch {
                    0% { transform: translate(0) skew(0); text-shadow: 0 0 10px #0ff; }
                    8% { transform: translate(-6px, 3px) skew(-12deg); text-shadow: -6px 0 25px #0ff, 6px 0 40px #a0f; }
                    16% { transform: translate(5px, -3px) skew(10deg); }
                    24% { transform: translate(0) skew(0); text-shadow: 0 0 35px #0ff, 0 0 70px #a0f; filter: hue-rotate(30deg); }
                    32% { transform: translate(-3px, 1px) skew(-4deg); filter: hue-rotate(60deg); }
                    50% { transform: translate(0) skew(0); filter: hue-rotate(0deg); }
                    100% { transform: translate(0) skew(0); text-shadow: 0 0 20px #0ff, 0 0 40px #a0f; }
                }
                @keyframes heroAlertBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.2; display: none; }
                    51% { opacity: 1; }
                    55% { opacity: 0.1; }
                    60% { opacity: 1; }
                }
                .hero-glitch-active {
                    animation: heroGlitch 1.8s infinite linear alternate-reverse !important;
                }
                .hero-glitch-intense {
                    animation: heroGlitch 0.6s infinite linear alternate-reverse !important;
                }
            `}</style>
        </div>
    );
}
