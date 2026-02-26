"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation, Phone, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LocationMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const infoCardsRef = useRef<HTMLDivElement>(null);

    // 함께봄 주소 정보 (예시 데이터, 필요시 수정)
    const location = {
        lat: 37.5665,
        lng: 126.9780, // 서울시청 좌표 (임시)
        title: "함께봄 본사",
        address: "서울특별시 중구 세종대로 110",
        phone: "02-1234-5678",
        email: "contact@hamkkebom.com",
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 초기 설정
            gsap.set(".reveal-text", { y: 50, opacity: 0 });
            gsap.set(".map-box", { scale: 0.95, opacity: 0, y: 30 });
            gsap.set(".info-card", { y: 30, opacity: 0 });

            // 타이틀 애니메이션
            gsap.to(".reveal-text", {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // 지도 등장 애니메이션
            gsap.to(".map-box", {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: mapContainerRef.current,
                    start: "top 85%",
                }
            });

            // 정보 카드 등장 애니메이션
            gsap.to(".info-card", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: infoCardsRef.current,
                    start: "top 90%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} style={{
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "#05080f",
            padding: "8rem 5vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden"
        }}>
            {/* Background Effects */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "10%",
                width: "40vw",
                height: "40vw",
                background: "radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(0,0,0,0) 70%)",
                filter: "blur(60px)",
                pointerEvents: "none",
                zIndex: 0
            }} />

            <div style={{ zIndex: 1, width: "100%", maxWidth: "1400px" }}>
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2 className="reveal-text" style={{
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        fontWeight: 700,
                        color: "#fff",
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: "-0.02em",
                        marginBottom: "1rem"
                    }}>
                        FIND US
                    </h2>
                    <p className="reveal-text" style={{
                        fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 300,
                        letterSpacing: "0.05em"
                    }}>
                        오시는 길
                    </p>
                </div>

                {/* Map Display Area - Kakao Map iframe (API 키 불필요) */}
                <div ref={mapContainerRef} className="map-box" style={{
                    width: "100%",
                    height: "clamp(400px, 50vh, 600px)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                    position: "relative",
                    marginBottom: "4rem"
                }}>
                    <iframe
                        src={`https://map.kakao.com/link/map/${encodeURIComponent(location.title)},${location.lat},${location.lng}`}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Kakao Map"
                    />
                </div>

                {/* Information Cards */}
                <div ref={infoCardsRef} style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "2rem",
                    width: "100%"
                }}>
                    {[
                        { icon: MapPin, title: "ADDRESS", content: location.address },
                        { icon: Phone, title: "CONTACT", content: location.phone },
                        { icon: Mail, title: "EMAIL", content: location.email },
                    ].map((info, i) => (
                        <div key={i} className="info-card" style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.05)",
                            borderRadius: "16px",
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            transition: "all 0.4s ease",
                            cursor: "default"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                e.currentTarget.style.transform = "translateY(-5px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}>
                            <div style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "50%",
                                background: "rgba(212, 175, 55, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#d4af37"
                            }}>
                                <info.icon size={24} />
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: "0.9rem",
                                    color: "rgba(255,255,255,0.4)",
                                    letterSpacing: "0.1em",
                                    marginBottom: "0.5rem"
                                }}>{info.title}</h3>
                                <p style={{
                                    fontSize: "1.1rem",
                                    color: "#fff",
                                    fontWeight: 400
                                }}>{info.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Action Buttons */}
                <div className="info-card" style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginTop: "4rem",
                    flexWrap: "wrap"
                }}>
                    <a href={`https://map.kakao.com/link/map/${encodeURIComponent(location.title)},${location.lat},${location.lng}`} target="_blank" rel="noreferrer" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.8rem",
                        padding: "1rem 2rem",
                        background: "#FEE500",
                        color: "#000",
                        borderRadius: "30px",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "all 0.3s ease"
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <Navigation size={18} /> 카카오맵 열기
                    </a>
                </div>
            </div>
        </section>
    );
}
