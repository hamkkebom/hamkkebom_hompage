"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import GNB from "@/components/GNB";
import ContactAndFooter from "@/components/ContactAndFooter";

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

    // 마키 데이터를 두 배로 늘려 무한 롤링 효과
    const marqueeData = [...recentVideos, ...recentVideos];

    return (
        <main style={{ background: "var(--bg-color)", minHeight: "100vh", position: "relative" }}>
            <GNB />

            <div style={{ paddingTop: "120px", paddingBottom: "4rem", minHeight: "80vh" }}>

                {/* 상단 무한 스크롤 마키 (Marquee) 구역 */}
                {recentVideos.length > 0 && (
                    <div style={{
                        width: "100%",
                        overflow: "hidden",
                        marginBottom: "6rem",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        padding: "2rem 0",
                        background: "rgba(0,0,0,0.5)"
                    }}>
                        <div ref={marqueeRef} style={{ display: "flex", gap: "2rem", width: "max-content", paddingLeft: "2rem" }}>
                            {marqueeData.map((work, idx) => (
                                <Link href={`/works/${work.uid}`} key={`marquee-${work.uid}-${idx}`} style={{ textDecoration: "none" }}>
                                    <div style={{
                                        width: "300px",
                                        height: "170px",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        position: "relative",
                                        cursor: "pointer",
                                        background: "#111"
                                    }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={work.thumbnail || "/placeholder-image.jpg"}
                                            alt={work.meta?.name || "Video Thumbnail"}
                                            style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative", zIndex: 1, opacity: 0.8, transition: "opacity 0.3s" }}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}
                                        />
                                        <div style={{
                                            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                                            zIndex: 2, pointerEvents: "none", background: "rgba(0,0,0,0.6)",
                                            borderRadius: "50%", width: "40px", height: "40px",
                                            display: "flex", alignItems: "center", justifyContent: "center"
                                        }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* 하단 메인 갤러리 그리드 구역 */}
                <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2rem" }}>
                    <h1 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "3rem", letterSpacing: "-0.04em" }}>
                        모든 <span style={{ color: "var(--accent-color)" }}>작업물.</span>
                    </h1>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "5rem", color: "var(--text-secondary)" }}>
                            진행중인 작업물을 불러오는 중입니다...
                        </div>
                    ) : videos.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "5rem", color: "var(--text-secondary)" }}>
                            등록된 작업물이 없습니다.
                        </div>
                    ) : (
                        <>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                                gap: "3rem 2rem",
                                marginBottom: "4rem"
                            }}>
                                {videos.map((work) => (
                                    <Link href={`/works/${work.uid}`} key={work.uid} style={{ textDecoration: "none" }}>
                                        <div style={{ cursor: "pointer" }} className="work-card">
                                            <div style={{
                                                width: "100%",
                                                aspectRatio: "16/9",
                                                borderRadius: "12px",
                                                overflow: "hidden",
                                                marginBottom: "1.5rem",
                                                position: "relative",
                                                background: "#111"
                                            }}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={work.thumbnail || "/placeholder-image.jpg"}
                                                    alt={work.meta?.name || "Video"}
                                                    style={{
                                                        width: "100%", height: "100%", objectFit: "cover",
                                                        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s",
                                                        opacity: 0.9
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = "scale(1.05)";
                                                        e.currentTarget.style.opacity = "1";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = "scale(1)";
                                                        e.currentTarget.style.opacity = "0.9";
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <div style={{
                                                    fontSize: "0.85rem", color: "var(--accent-color)",
                                                    textTransform: "uppercase", letterSpacing: "0.1em",
                                                    marginBottom: "0.5rem", fontWeight: 600
                                                }}>
                                                    {work.meta?.category || "PORTFOLIO"}
                                                </div>
                                                <h3 style={{
                                                    fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)",
                                                    marginBottom: "0.5rem", lineHeight: 1.3
                                                }}>
                                                    {work.meta?.name || "Untitled Project"}
                                                </h3>
                                                {work.meta?.client && (
                                                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
                                                        Client: {work.meta.client}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination UI */}
                            {totalPages > 1 && (
                                <div style={{
                                    display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "4rem"
                                }}>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => {
                                                setPage(p);
                                                window.scrollTo({ top: 400, behavior: "smooth" });
                                            }}
                                            style={{
                                                width: "40px", height: "40px",
                                                borderRadius: "4px",
                                                border: "none",
                                                background: page === p ? "var(--accent-color)" : "rgba(255,255,255,0.05)",
                                                color: page === p ? "#000" : "var(--text-secondary)",
                                                fontSize: "1rem", fontWeight: 600,
                                                cursor: "pointer",
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <ContactAndFooter />
        </main>
    );
}
