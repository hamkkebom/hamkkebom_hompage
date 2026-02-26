"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation, Phone, Mail, Loader2 } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

gsap.registerPlugin(ScrollTrigger);

export default function LocationMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapDivRef = useRef<HTMLDivElement>(null);
    const infoCardsRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<maplibregl.Map | null>(null);

    const [isMapLoaded, setIsMapLoaded] = useState(false);

    // 함께봄 주소 정보
    const location = {
        lat: 37.5665,
        lng: 126.9780,
        title: "함께봄 본사",
        address: "서울특별시 중구 세종대로 110",
        phone: "02-1234-5678",
        email: "contact@hamkkebom.com",
    };

    // MapLibre 초기화
    useEffect(() => {
        if (!mapDivRef.current || mapInstanceRef.current) return;

        const map = new maplibregl.Map({
            container: mapDivRef.current,
            // 무료 다크 테마 타일 (API 키 불필요!)
            style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
            center: [location.lng, location.lat],
            zoom: 11,
            pitch: 0,
            bearing: 0,
            attributionControl: false,
        });

        map.addControl(new maplibregl.NavigationControl(), "bottom-right");

        // 커스텀 마커 생성
        const markerEl = document.createElement("div");
        markerEl.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: markerBounce 2s infinite;
            ">
                <div style="
                    background: rgba(20,20,20,0.9);
                    border: 1px solid #d4af37;
                    color: #d4af37;
                    padding: 8px 16px;
                    border-radius: 30px;
                    font-size: 0.85rem;
                    font-weight: bold;
                    margin-bottom: 12px;
                    backdrop-filter: blur(4px);
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
                    white-space: nowrap;
                ">
                    ${location.title}
                </div>
                <div style="
                    width: 18px;
                    height: 18px;
                    background: #d4af37;
                    border-radius: 50%;
                    box-shadow: 0 0 20px #d4af37, 0 0 40px rgba(212,175,55,0.4);
                    border: 3px solid #fff;
                "></div>
            </div>
        `;

        new maplibregl.Marker({ element: markerEl, anchor: "bottom" })
            .setLngLat([location.lng, location.lat])
            .addTo(map);

        map.on("load", () => {
            setIsMapLoaded(true);

            // 3D 건물 레이어 추가
            const layers = map.getStyle().layers;
            let labelLayerId: string | undefined;
            if (layers) {
                for (const layer of layers) {
                    if (layer.type === "symbol" && (layer.layout as Record<string, unknown>)?.["text-field"]) {
                        labelLayerId = layer.id;
                        break;
                    }
                }
            }

            // OpenStreetMap 3D 건물 소스 & 레이어
            if (!map.getSource("openmaptiles")) {
                map.addSource("openmaptiles", {
                    type: "vector",
                    url: "https://tiles.openfreemap.org/planet",
                });
            }

            // 시네마틱 FlyTo 애니메이션
            setTimeout(() => {
                map.flyTo({
                    center: [location.lng, location.lat],
                    zoom: 16.5,
                    pitch: 55,
                    bearing: -30,
                    duration: 5000,
                    essential: true,
                });
            }, 500);
        });

        mapInstanceRef.current = map;

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    // GSAP 애니메이션
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".reveal-text", { y: 50, opacity: 0 });
            gsap.set(".map-box", { scale: 0.95, opacity: 0, y: 30 });
            gsap.set(".info-card", { y: 30, opacity: 0 });

            gsap.to(".reveal-text", {
                y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out",
                scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
            });

            gsap.to(".map-box", {
                scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "expo.out",
                scrollTrigger: { trigger: mapContainerRef.current, start: "top 85%" }
            });

            gsap.to(".info-card", {
                y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
                scrollTrigger: { trigger: infoCardsRef.current, start: "top 90%" }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} style={{
            position: "relative", width: "100%", minHeight: "100vh",
            backgroundColor: "var(--bg-color)",
            backgroundImage: "url('/images/contact_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            padding: "8rem 5vw",
            display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden"
        }}>
            {/* CSS for marker bounce animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes markerBounce {
                    0%, 100% { transform: translateY(-8px); }
                    50% { transform: translateY(0px); }
                }
            `}} />

            {/* Background glow */}
            <div style={{
                position: "absolute", top: "20%", left: "10%",
                width: "40vw", height: "40vw",
                background: "radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(0,0,0,0) 70%)",
                filter: "blur(60px)", pointerEvents: "none", zIndex: 0
            }} />

            <div style={{ zIndex: 1, width: "100%", maxWidth: "1400px" }}>
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2 className="reveal-text" style={{
                        fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700,
                        color: "#fff", fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: "-0.02em", marginBottom: "1rem"
                    }}>FIND US</h2>
                    <p className="reveal-text" style={{
                        fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                        color: "rgba(255,255,255,0.6)", fontWeight: 300, letterSpacing: "0.05em"
                    }}>오시는 길</p>
                </div>

                {/* 3D Map Area */}
                <div ref={mapContainerRef} className="map-box" style={{
                    width: "100%", height: "clamp(400px, 60vh, 700px)",
                    borderRadius: "24px", overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
                    position: "relative", marginBottom: "4rem"
                }}>
                    {!isMapLoaded && (
                        <div style={{
                            position: "absolute", inset: 0, display: "flex",
                            alignItems: "center", justifyContent: "center",
                            background: "#0a0a0a", zIndex: 10, color: "#d4af37"
                        }}>
                            <Loader2 className="animate-spin" size={48} />
                        </div>
                    )}
                    <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />
                </div>

                {/* Information Cards */}
                <div ref={infoCardsRef} style={{
                    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "2rem", width: "100%"
                }}>
                    {[
                        { icon: MapPin, title: "ADDRESS", content: location.address },
                        { icon: Phone, title: "CONTACT", content: location.phone },
                        { icon: Mail, title: "EMAIL", content: location.email },
                    ].map((info, i) => (
                        <div key={i} className="info-card" style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.05)",
                            borderRadius: "16px", padding: "2rem",
                            display: "flex", flexDirection: "column", gap: "1rem",
                            transition: "all 0.4s ease", cursor: "default"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                            }}>
                            <div style={{
                                width: "48px", height: "48px", borderRadius: "50%",
                                background: "rgba(212, 175, 55, 0.1)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#d4af37"
                            }}>
                                <info.icon size={24} />
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: "0.9rem", color: "rgba(255,255,255,0.4)",
                                    letterSpacing: "0.1em", marginBottom: "0.5rem"
                                }}>{info.title}</h3>
                                <p style={{
                                    fontSize: "1.1rem", color: "#fff", fontWeight: 400
                                }}>{info.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Button */}
                <div className="info-card" style={{
                    display: "flex", justifyContent: "center", gap: "1rem",
                    marginTop: "4rem", flexWrap: "wrap"
                }}>
                    <a href={`https://map.kakao.com/link/map/${encodeURIComponent(location.title)},${location.lat},${location.lng}`}
                        target="_blank" rel="noreferrer" style={{
                            display: "flex", alignItems: "center", gap: "0.8rem",
                            padding: "1rem 2rem", background: "#FEE500", color: "#000",
                            borderRadius: "30px", fontWeight: 600, textDecoration: "none",
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
