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
    isYoutube?: boolean;
    youtubeUrl?: string;
}

const PR_YOUTUBE_VIDEOS: StreamItem[] = [
    {
        uid: "yt-1",
        thumbnail: "https://img.youtube.com/vi/P1kKoW6Afp0/maxresdefault.jpg",
        preview: "",
        meta: { name: "주안이네 김치 홍보송", category: "기업홍보", client: "주안이네 김치" },
        created: new Date().toISOString(),
        isYoutube: true,
        youtubeUrl: "https://www.youtube.com/watch?v=P1kKoW6Afp0&list=PLuG5PIXGPOHqtAZFcrktSBdp2Kt5C7Kdz&index=1"
    },
    {
        uid: "yt-2",
        thumbnail: "https://img.youtube.com/vi/tHzauNGtsqw/maxresdefault.jpg",
        preview: "",
        meta: { name: "다온 국제변리사 홍보송", category: "기업홍보", client: "다온 국제변리사" },
        created: new Date().toISOString(),
        isYoutube: true,
        youtubeUrl: "https://www.youtube.com/watch?v=tHzauNGtsqw&list=PLuG5PIXGPOHqtAZFcrktSBdp2Kt5C7Kdz&index=2"
    },
    {
        uid: "yt-3",
        thumbnail: "https://img.youtube.com/vi/vfrMwQR4ym0/maxresdefault.jpg",
        preview: "",
        meta: { name: "아셀케어 홍보송", category: "기업홍보", client: "아셀케어" },
        created: new Date().toISOString(),
        isYoutube: true,
        youtubeUrl: "https://www.youtube.com/watch?v=vfrMwQR4ym0&list=PLuG5PIXGPOHqtAZFcrktSBdp2Kt5C7Kdz&index=3"
    },
    {
        uid: "yt-4",
        thumbnail: "https://img.youtube.com/vi/0HzCpVP8vvw/maxresdefault.jpg",
        preview: "",
        meta: { name: "에이스인력 홍보송", category: "기업홍보", client: "에이스인력" },
        created: new Date().toISOString(),
        isYoutube: true,
        youtubeUrl: "https://www.youtube.com/watch?v=0HzCpVP8vvw&list=PLuG5PIXGPOHqtAZFcrktSBdp2Kt5C7Kdz&index=4"
    }
];

const JOB_YOUTUBE_VIDEOS: StreamItem[] = [
    {
        uid: "yt-job-1",
        thumbnail: "https://img.youtube.com/vi/h_XBaIOGqN0/maxresdefault.jpg",
        preview: "",
        meta: { name: "AI 영상 프리랜서 모집송", category: "구인공고" },
        created: new Date().toISOString(),
        isYoutube: true,
        youtubeUrl: "https://www.youtube.com/watch?v=h_XBaIOGqN0&list=PLuG5PIXGPOHr_ifLtttnIvVRQEnSvCTeL&index=1"
    },
    {
        uid: "yt-job-2",
        thumbnail: "https://img.youtube.com/vi/4GCIC9-eLiQ/maxresdefault.jpg",
        preview: "",
        meta: { name: "AI 콘텐츠 우리같이 만들어요", category: "구인공고" },
        created: new Date().toISOString(),
        isYoutube: true,
        youtubeUrl: "https://www.youtube.com/watch?v=4GCIC9-eLiQ&list=PLuG5PIXGPOHr_ifLtttnIvVRQEnSvCTeL&index=2"
    }
];

const CONTEST_YOUTUBE_VIDEOS: StreamItem[] = [
    {
        uid: "yt-contest-1",
        thumbnail: "https://img.youtube.com/vi/It4FXs2A6cc/maxresdefault.jpg",
        preview: "",
        meta: { name: "[꿈꾸는 아리랑] 졸업은 했는데, 뭐해먹고 살지..?", category: "공모전참가송" },
        created: new Date().toISOString(),
        isYoutube: true,
        youtubeUrl: "https://www.youtube.com/watch?v=It4FXs2A6cc&list=PLuG5PIXGPOHqNU_AsRPS17tf9TOJ2Pn25&index=1"
    },
    {
        uid: "yt-contest-2",
        thumbnail: "https://img.youtube.com/vi/jme85Dz0zzg/maxresdefault.jpg",
        preview: "",
        meta: { name: "[꿈꾸는 아리랑] 나의 아리랑", category: "공모전참가송" },
        created: new Date().toISOString(),
        isYoutube: true,
        youtubeUrl: "https://www.youtube.com/watch?v=jme85Dz0zzg&list=PLuG5PIXGPOHqNU_AsRPS17tf9TOJ2Pn25&index=2"
    },
    {
        uid: "yt-contest-3",
        thumbnail: "https://img.youtube.com/vi/rbYmaPUKw00/maxresdefault.jpg",
        preview: "",
        meta: { name: "[꿈꾸는 아리랑] 꿈은 너를 배신하지 않아", category: "공모전참가송" },
        created: new Date().toISOString(),
        isYoutube: true,
        youtubeUrl: "https://www.youtube.com/watch?v=rbYmaPUKw00&list=PLuG5PIXGPOHqNU_AsRPS17tf9TOJ2Pn25&index=3"
    }
];

const ALL_YOUTUBE_VIDEOS: StreamItem[] = [...PR_YOUTUBE_VIDEOS, ...JOB_YOUTUBE_VIDEOS, ...CONTEST_YOUTUBE_VIDEOS];

export default function WorksGalleryPage() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [videos, setVideos] = useState<StreamItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("전체");

    const categories = [
        "전체", "구인공고", "기업홍보", "공모전참가송", "꿈꿈송", "자기소개송", "추억송"
    ];

    const limit = 20;

    // 마키(자동 재생 띠) 데이터
    const marqueeVideos = [...ALL_YOUTUBE_VIDEOS, ...ALL_YOUTUBE_VIDEOS, ...ALL_YOUTUBE_VIDEOS];

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                // DB 연동 제거 및 하드코딩된 유튜브 영상으로 대체
                if (selectedCategory === "전체") {
                    setVideos(ALL_YOUTUBE_VIDEOS);
                } else if (selectedCategory === "기업홍보") {
                    setVideos(PR_YOUTUBE_VIDEOS);
                } else if (selectedCategory === "구인공고") {
                    setVideos(JOB_YOUTUBE_VIDEOS);
                } else if (selectedCategory === "공모전참가송") {
                    setVideos(CONTEST_YOUTUBE_VIDEOS);
                } else {
                    // 다른 카테고리의 경우 현재는 비워둠. 필요시 데이터 추가.
                    setVideos([]);
                }
                setTotalPages(1);
            } catch (error) {
                console.error("Error setting videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [page, selectedCategory]);

    // 카테고리 변경 시 첫 페이지로 초기화
    const handleCategoryClick = (cat: string) => {
        if (selectedCategory !== cat) {
            setSelectedCategory(cat);
            setPage(1);
            setVideos([]); // 로딩 중 이전 데이터 보이는 것 방지
        }
    };

    // 무한 마키 애니메이션
    useEffect(() => {
        if (!marqueeRef.current || marqueeVideos.length === 0) return;

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
    }, [marqueeVideos]);

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

                {/* Category Filters */}
                <div className="category-filter-container">
                    <div className="category-filter-scroll">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 상단 무한 스크롤 마키 (Film Strip Design) */}
                {marqueeVideos.length > 0 && (
                    <div className="film-strip-container">
                        <div className="film-perforation top"></div>
                        <div className="film-marquee-track">
                            <div ref={marqueeRef} style={{ display: "flex", width: "max-content", paddingLeft: "1rem" }}>
                                {marqueeVideos.map((work, idx) => (
                                    <div key={`marquee-${work.uid}-${idx}`} className="film-frame">
                                        <div className="film-frame-inner">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={work.thumbnail || "/placeholder-image.jpg"}
                                                alt={work.meta?.name || "Film"}
                                                onError={(e) => {
                                                    const wrapper = e.currentTarget.closest('.film-frame') as HTMLElement;
                                                    if (wrapper) wrapper.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    </div>
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
                                {videos.map((work, idx) => {
                                    const CardContent = (
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
                                                {/* 나중에 필요할 경우 주석 해제하여 사용 */}
                                                <div className="work-category">
                                                    {work.meta?.category || "FILM"}
                                                    {work.isYoutube && " • YOUTUBE"}
                                                </div>
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
                                    );

                                    return (
                                        <div key={work.uid} className={`work-card-wrapper layout-type-${idx % 3}`}>
                                            {work.isYoutube ? (
                                                <a href={work.youtubeUrl} target="_blank" rel="noopener noreferrer" className="work-card">
                                                    {CardContent}
                                                </a>
                                            ) : (
                                                <Link href={`/works/${work.uid}`} className="work-card">
                                                    {CardContent}
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
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

                /* Category Filters */
                .category-filter-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto 5rem;
                    padding: 0 2rem;
                    display: flex;
                    justify-content: center;
                }

                .category-filter-scroll {
                    display: flex;
                    gap: 1rem;
                    overflow-x: auto;
                    padding-bottom: 1rem;
                    /* 스크롤바 숨기기 (크롬, 사파리 등) */
                    -ms-overflow-style: none;  /* IE, Edge */
                    scrollbar-width: none;  /* Firefox */
                }

                .category-filter-scroll::-webkit-scrollbar {
                    display: none;
                }

                .category-pill {
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: rgba(255, 255, 255, 0.5);
                    padding: 0.7rem 1.6rem;
                    border-radius: 4px; /* 영화 필름 컷 느낌으로 살짝 각지게 */
                    font-family: 'Noto Sans KR', sans-serif;
                    font-size: 1rem;
                    font-weight: 400;
                    letter-spacing: 0.05em;
                    white-space: nowrap;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                    overflow: hidden;
                }

                .category-pill::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: #e5a93d; /* 샴페인 골드 (개별 적용) */
                    opacity: 0;
                    z-index: -1;
                    transition: opacity 0.4s ease;
                }

                .category-pill:hover {
                    color: #fff;
                    border-color: rgba(255, 255, 255, 0.4);
                }

                .category-pill.active {
                    color: #000;
                    border-color: #e5a93d; /* 샴페인 골드 (개별 적용) */
                    font-weight: 700;
                }

                .category-pill.active::before {
                    opacity: 1;
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
                    overflow: hidden;
                    white-space: nowrap;
                    padding: 1rem 0;
                    display: flex;
                    align-items: center;
                }

                .film-frame {
                    display: inline-block;
                    width: 280px;
                    height: 160px;
                    margin-right: 1rem;
                    border-radius: 4px; /* 살짝 둥글게 */
                    overflow: hidden;
                    position: relative;
                    flex-shrink: 0;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5); /* 필름의 입체감 부여 */
                }

                .film-frame-inner {
                    width: 100%;
                    height: 100%;
                }

                .film-frame img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    /* 기존 애니메이션/호버 트랜지션 등이 필요하다면 아래에 추가 */
                    filter: grayscale(100%) contrast(1.2) brightness(0.7);
                    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
                }

                .film-frame:hover img {
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
