"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import GNB from "@/components/GNB";
import ContactAndFooter from "@/components/ContactAndFooter";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface StreamItem {
    uid: string;
    thumbnail: string;
    preview: string;
    meta: {
        name?: string;
        client?: string;
        category?: string;
    };
    created: string;
}

export default function WorksGalleryPage() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [videos, setVideos] = useState<StreamItem[]>([]);
    const [recentVideos, setRecentVideos] = useState<StreamItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const limit = 20;

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/works?page=${page}&limit=${limit}`);
                const data = await res.json();

                if (data.videos) setVideos(data.videos);
                if (data.recentVideos) setRecentVideos(data.recentVideos);
                if (data.pagination) setTotalPages(data.pagination.totalPages);
            } catch (error) {
                console.error("Failed to load videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [page]);

    // 무한 마키 애니메이션
    useEffect(() => {
        if (!marqueeRef.current || recentVideos.length === 0) return;

        let xPos = 0;
        const speed = 1.0;

        const updateMarquee = () => {
            if (marqueeRef.current) {
                xPos -= speed;
                if (xPos <= -marqueeRef.current.scrollWidth / 2) {
                    xPos = 0;
                }
                gsap.set(marqueeRef.current, { x: xPos });
            }
        };

        gsap.ticker.add(updateMarquee);

        return () => {
            gsap.ticker.remove(updateMarquee);
        };
    }, [recentVideos]);

    // 패럴랙스 (시차) 갤러리 애니메이션
    useEffect(() => {
        if (!loading && videos.length > 0) {
            // Give DOM a tick to render
            const ctx = gsap.context(() => {
                const cards = gsap.utils.toArray<HTMLElement>('.work-card-wrapper');

                cards.forEach((card, index) => {
                    // 비대칭 흩뿌림 배치에 따른 시차 설정
                    let yOffset = 100;
                    if (index % 3 === 0) yOffset = 150;
                    if (index % 3 === 1) yOffset = 80;
                    if (index % 3 === 2) yOffset = 200;

                    gsap.fromTo(card,
                        { y: yOffset, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1.5,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 95%",
                                end: "bottom 80%",
                                scrub: 1,  // 스크롤 속도에 연동 (패럴랙스)
                            }
                        }
                    );
                });
            }, galleryRef);

            return () => ctx.revert();
        }
    }, [loading, videos]);

    // 마키 데이터를 두 배로 늘려 무한 롤링 효과
    const marqueeData = [...recentVideos, ...recentVideos];

    return (
        <main className="cinematic-main" style={{ minHeight: "100vh", position: "relative" }}>
            {/* Cinematic Background Lights (Nanobanana Pro Vibe) */}
            <div className="theater-lights">
                <div className="light-beam"></div>
                <div className="ambient-glow amber"></div>
                <div className="ambient-glow blue"></div>
            </div>

            {/* Film Grain Filter (Inline SVG base64) */}
            <div className="film-grain" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            <GNB />

            <div style={{ paddingTop: "120px", paddingBottom: "4rem", minHeight: "80vh", position: "relative", zIndex: 10 }}>

                <div className="director-cut-header">
                    <h2 className="sub-heading">THE DIRECTOR'S CUT</h2>
                    <h1 className="main-heading">LATEST VISUALS</h1>
                </div>

                {/* 상단 무한 스크롤 마키 (Film Strip Design) */}
                {recentVideos.length > 0 && (
                    <div className="film-strip-container">
                        <div className="film-perforation top"></div>
                        <div className="film-marquee-track">
                            <div ref={marqueeRef} style={{ display: "flex", width: "max-content", paddingLeft: "1rem" }}>
                                {marqueeData.map((work, idx) => (
                                    <Link href={`/works/${work.uid}`} key={`marquee-${work.uid}-${idx}`} style={{ textDecoration: "none" }}>
                                        <div className="marquee-card">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={work.thumbnail || "/placeholder-image.jpg"}
                                                alt={work.meta?.name || "Video Thumbnail"}
                                                onError={(e) => {
                                                    const card = e.currentTarget.closest('.marquee-card') as HTMLElement;
                                                    if (card) card.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="film-perforation bottom"></div>
                    </div>
                )}

                {/* 하단 예술적 갤러리 흩뿌림 배치 (Scattered Masonry) */}
                <div ref={galleryRef} className="scattered-gallery" style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2rem" }}>

                    {loading ? (
                        <div className="loading-state">
                            <div className="glitch-text" data-text="LOADING ARCHIVES...">LOADING ARCHIVES...</div>
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="empty-state">
                            NO FOOTAGE FOUND.
                        </div>
                    ) : (
                        <>
                            <div className="scattered-container">
                                {videos.map((work, idx) => (
                                    <div key={work.uid} className={`work-card-wrapper layout-type-${idx % 3}`}>
                                        <Link href={`/works/${work.uid}`} className="work-card">
                                            <div className="work-img-container">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={work.thumbnail || "/placeholder-image.jpg"}
                                                    alt={work.meta?.name || "Video"}
                                                    onError={(e) => {
                                                        const wrapper = e.currentTarget.closest('.work-card-wrapper') as HTMLElement;
                                                        if (wrapper) wrapper.style.display = 'none';
                                                    }}
                                                />
                                                <div className="work-overlay"></div>

                                                <div className="work-info">
                                                    {/* 나중에 필요할 경우 주석 해제하여 사용
                                                    <div className="work-category">
                                                        {work.meta?.category || "SCENE"} // 0{idx + 1 + (page - 1) * limit}
                                                    </div>
                                                    */}
                                                    <h3 className="work-title">
                                                        {work.meta?.name || "Untitled Film"}
                                                    </h3>
                                                    {work.meta?.client && (
                                                        <p className="work-client">
                                                            A FILM FOR {work.meta.client.toUpperCase()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination UI */}
                            {totalPages > 1 && (
                                <div className="cinematic-pagination">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => {
                                                setPage(p);
                                                window.scrollTo({ top: 600, behavior: "smooth" });
                                            }}
                                            className={`page-btn ${page === p ? "active" : ""}`}
                                        >
                                            {p < 10 ? `0${p}` : p}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <ContactAndFooter />

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;600&display=swap');

                .cinematic-main {
                    background: linear-gradient(135deg, #080808 0%, #000000 100%);
                    color: #e0e0e0;
                    font-family: 'Space Grotesk', sans-serif;
                    overflow-x: hidden;
                }

                /* Theater Cinematic Lights & Aurora Glows */
                .theater-lights {
                    position: fixed;
                    top: 0; left: 0; width: 100vw; height: 100vh;
                    pointer-events: none;
                    z-index: 0;
                    overflow: hidden;
                }

                /* Top down projector beam */
                .light-beam {
                    position: absolute;
                    top: -20vh;
                    left: 50%;
                    width: 150vw;
                    height: 120vh;
                    background: radial-gradient(ellipse at top, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
                    transform: translateX(-50%);
                    animation: flicker 6s infinite alternate;
                }

                /* Subtly moving aurora gradients (Cinematic Amber & Cobalt Blue) */
                .ambient-glow {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(140px);
                    opacity: 0.18;
                    animation: floatGlow 20s infinite alternate ease-in-out;
                    mix-blend-mode: screen;
                }

                .ambient-glow.amber {
                    width: 70vw; height: 70vw;
                    background: radial-gradient(circle, rgba(168, 100, 31, 0.8), transparent);
                    top: 10%; left: -15vw;
                }

                .ambient-glow.blue {
                    width: 80vw; height: 80vw;
                    background: radial-gradient(circle, rgba(14, 42, 71, 0.8), transparent);
                    bottom: -15vh; right: -20vw;
                    animation-duration: 25s;
                    animation-delay: -10s;
                }

                @keyframes flicker {
                    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 0.9; }
                    20%, 24%, 55% { opacity: 0.6; }
                }

                @keyframes floatGlow {
                    0% { transform: translateY(0) scale(1) rotate(0deg); }
                    50% { transform: translateY(-70px) scale(1.05) rotate(5deg); }
                    100% { transform: translateY(30px) scale(0.95) rotate(-5deg); }
                }

                .film-grain {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.12;
                    mix-blend-mode: overlay;
                }

                .director-cut-header {
                    text-align: center;
                    margin-bottom: 5rem;
                    padding: 0 1rem;
                }

                .sub-heading {
                    font-size: 0.85rem;
                    letter-spacing: 0.4em;
                    text-transform: uppercase;
                    color: var(--accent-color, #e5a93d);
                    margin-bottom: 1rem;
                    font-weight: 600;
                }

                .main-heading {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(3rem, 8vw, 6rem);
                    font-weight: 700;
                    font-style: italic;
                    line-height: 1;
                    letter-spacing: -0.02em;
                    margin: 0;
                    text-shadow: 0 10px 30px rgba(0,0,0,0.8);
                }

                /* Film Strip Marquee */
                .film-strip-container {
                    width: 100%;
                    background: #000;
                    padding: 0;
                    margin-bottom: 8rem;
                    border-top: 1px solid #222;
                    border-bottom: 1px solid #222;
                    position: relative;
                    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.9);
                }

                .film-perforation {
                    height: 20px;
                    width: 100%;
                    background-image: repeating-linear-gradient(90deg, transparent 0, transparent 40px, #1a1a1a 40px, #1a1a1a 50px);
                    opacity: 0.8;
                }

                .film-perforation.top {
                    border-bottom: 1px solid #111;
                    margin-bottom: 5px;
                }

                .film-perforation.bottom {
                    border-top: 1px solid #111;
                    margin-top: 5px;
                }

                .film-marquee-track {
                    padding: 5px 0;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                }

                .marquee-card {
                    width: 380px;
                    height: 220px;
                    margin: 0 5px;
                    position: relative;
                    background: #0a0a0a;
                    overflow: hidden;
                    cursor: pointer;
                }

                .marquee-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%) contrast(1.2) brightness(0.7);
                    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
                }

                .marquee-card:hover img {
                    filter: grayscale(0%) contrast(1) brightness(1);
                    transform: scale(1.03);
                }

                /* Scattered Gallery Layout */
                .scattered-container {
                    display: flex;
                    flex-direction: column;
                    gap: 8rem;
                    padding-bottom: 4rem;
                }

                .work-card-wrapper {
                    display: flex;
                    width: 100%;
                    position: relative;
                }

                /* Type 0: Left aligned, medium width */
                .work-card-wrapper.layout-type-0 {
                    justify-content: flex-start;
                    padding-left: 5%;
                }
                .work-card-wrapper.layout-type-0 .work-card {
                    width: 65%;
                    max-width: 900px;
                }

                /* Type 1: Right aligned, smaller width, negative top margin for overlap illusion */
                .work-card-wrapper.layout-type-1 {
                    justify-content: flex-end;
                    padding-right: 5%;
                    margin-top: -6rem;
                }
                .work-card-wrapper.layout-type-1 .work-card {
                    width: 50%;
                    max-width: 700px;
                }

                /* Type 2: Center aligned, large width */
                .work-card-wrapper.layout-type-2 {
                    justify-content: center;
                    margin-top: 2rem;
                }
                .work-card-wrapper.layout-type-2 .work-card {
                    width: 85%;
                    max-width: 1200px;
                }

                /* Mobile overrides for scatter layout */
                @media (max-width: 768px) {
                    .scattered-container { gap: 4rem; }
                    .work-card-wrapper.layout-type-0,
                    .work-card-wrapper.layout-type-1,
                    .work-card-wrapper.layout-type-2 {
                        justify-content: center;
                        padding: 0;
                        margin-top: 0;
                    }
                    .work-card-wrapper .work-card {
                        width: 100% !important;
                    }
                    .marquee-card {
                        width: 280px;
                        height: 160px;
                    }
                    .main-heading { font-size: 3rem; }
                }

                .work-card {
                    display: block;
                    text-decoration: none;
                    position: relative;
                }

                .work-img-container {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/9;
                    overflow: hidden;
                    background: #111;
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
                }

                .work-img-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: saturate(0.8) contrast(1.1) sepia(0.1);
                    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s;
                }

                .work-overlay {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 40%, transparent 100%);
                    pointer-events: none;
                    transition: background 0.5s;
                }

                .work-card:hover .work-img-container img {
                    transform: scale(1.04);
                    filter: saturate(1.2) contrast(1) sepia(0);
                }
                
                .work-card:hover .work-overlay {
                    background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
                }

                .work-info {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 3rem 2.5rem;
                    z-index: 10;
                    transform: translateY(10px);
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .work-card:hover .work-info {
                    transform: translateY(0);
                }

                .work-category {
                    font-size: 0.85rem;
                    color: var(--accent-color, #e5a93d);
                    letter-spacing: 0.3em;
                    margin-bottom: 0.8rem;
                    font-weight: 600;
                }

                .work-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2rem, 4vw, 3.5rem);
                    font-weight: 400;
                    font-style: italic;
                    color: #fff;
                    line-height: 1.1;
                    margin-bottom: 0.5rem;
                    text-shadow: 0 4px 15px rgba(0,0,0,0.7);
                }

                .work-client {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.9rem;
                    letter-spacing: 0.1em;
                    font-weight: 300;
                }

                /* Loading & Empty state */
                .loading-state, .empty-state {
                    height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    letter-spacing: 0.2em;
                    color: #666;
                }

                .glitch-text {
                    position: relative;
                    animation: pulse 2s infinite alternate;
                }

                @keyframes pulse {
                    0% { opacity: 0.5; }
                    100% { opacity: 1; }
                }

                /* Pagination */
                .cinematic-pagination {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 8rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }

                .page-btn {
                    background: transparent;
                    border: none;
                    color: #555;
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    font-style: italic;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                }

                .page-btn:hover {
                    color: #fff;
                }

                .page-btn.active {
                    color: var(--accent-color, #e5a93d);
                    font-weight: 700;
                    transform: scale(1.1);
                }

                .page-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 1px;
                    background: var(--accent-color, #e5a93d);
                }
            `}} />
        </main>
    );
}
