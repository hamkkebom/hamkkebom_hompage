"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function GNB() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems: Array<{
        name: string;
        label: string;
        href: string;
        subItems?: Array<{ name: string; label: string; href?: string; }>;
    }> = [
            {
                name: "ABOUT",
                label: "회사소개",
                href: "/about",
                subItems: [
                    { name: "INTRO", label: "소개글", href: "/about/intro" },
                    { name: "ORGANIZATION", label: "조직도", href: "/about/org" },
                ]
            },
            { name: "SERVICES", label: "서비스 설명", href: "/#서비스설명" },
            { name: "WORKS", label: "WORKS", href: "/works" },
            { name: "CONTACT", label: "문의하기", href: "/contact" },
        ];

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                padding: scrolled ? "1.2rem 4rem" : "2.5rem 5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: "var(--z-header)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                background: scrolled ? "rgba(2, 2, 2, 0.75)" : "rgba(0,0,0,0)",
                backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.04)" : "1px solid rgba(255, 255, 255, 0)",
            }}
        >
            {/* Logo Section */}
            <Link href="/" style={{ textDecoration: "none", zIndex: 2 }}>
                <div
                    style={{
                        fontSize: "1.3rem",
                        fontWeight: 900,
                        letterSpacing: "0.25em",
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#fff",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        opacity: 0.9,
                        textShadow: scrolled ? "none" : "0 4px 24px rgba(0,0,0,0.8)",
                        transition: "opacity 0.4s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
                >
                    HAMKKEBOM<span style={{ color: "var(--accent-color, #d4af37)", marginLeft: "4px" }}>.</span>
                </div>
            </Link>

            {/* Central Navigation - The "Exhibition" Layout */}
            <nav style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "5vw", // 화면 크기에 비례하는 극적인 간격
                alignItems: "center",
                zIndex: 1
            }}>
                {navItems.map((item) => {
                    // 해시링크(#서비스설명) 처리와 일반 링크 처리
                    const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== "/");
                    const hasSubItems = item.subItems && item.subItems.length > 0;

                    return (
                        <div
                            key={item.name}
                            style={{ position: "relative" }}
                            onMouseEnter={(e) => {
                                const artItem = e.currentTarget.querySelector('.nav-item-art') as HTMLElement;
                                if (artItem) {
                                    artItem.style.opacity = "1";
                                    const dot = artItem.querySelector('.nav-dot');
                                    const label = artItem.querySelector('.nav-label');
                                    const subLabel = artItem.querySelector('.nav-sublabel');
                                    if (dot) gsap.to(dot, { scaleX: 1, autoAlpha: 1, duration: 0.5, ease: "power4.out" });
                                    if (label) gsap.to(label, { y: -3, color: "#fff", textShadow: "0 0 20px rgba(255,255,255,0.4)", duration: 0.5, ease: "power3.out" });
                                    if (subLabel) gsap.to(subLabel, { opacity: 0.8, y: -2, duration: 0.4, ease: "power2.out" });
                                }

                                const subMenu = e.currentTarget.querySelector('.sub-menu-container') as HTMLElement;
                                if (subMenu) {
                                    gsap.to(subMenu, { opacity: 1, y: 0, visibility: "visible", duration: 0.4, ease: "power3.out" });
                                }
                            }}
                            onMouseLeave={(e) => {
                                const artItem = e.currentTarget.querySelector('.nav-item-art') as HTMLElement;
                                if (artItem) {
                                    if (!isActive) artItem.style.opacity = "0.45";
                                    const dot = artItem.querySelector('.nav-dot');
                                    const label = artItem.querySelector('.nav-label');
                                    const subLabel = artItem.querySelector('.nav-sublabel');
                                    if (dot && !isActive) gsap.to(dot, { scaleX: 0, autoAlpha: 0, duration: 0.4, ease: "power3.inOut" });
                                    if (label) gsap.to(label, { y: 0, color: isActive ? "#fff" : "rgba(255,255,255,0.8)", textShadow: "none", duration: 0.5, ease: "power3.out" });
                                    if (subLabel) gsap.to(subLabel, { opacity: 0.4, y: 0, duration: 0.4 });
                                }

                                const subMenu = e.currentTarget.querySelector('.sub-menu-container') as HTMLElement;
                                if (subMenu) {
                                    gsap.to(subMenu, { opacity: 0, y: 10, visibility: "hidden", duration: 0.3, ease: "power2.in" });
                                }
                            }}
                        >
                            <Link
                                href={hasSubItems ? "#" : item.href}
                                style={{ textDecoration: "none" }}
                                onClick={(e) => {
                                    if (hasSubItems) {
                                        e.preventDefault(); // 하위 메뉴가 있으면 부모 링크 이동 막기
                                    }
                                }}
                            >
                                <div
                                    className="nav-item-art"
                                    style={{
                                        position: "relative",
                                        padding: "0.5rem 0",
                                        cursor: "pointer",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        opacity: isActive ? 1 : 0.45,
                                        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                                    }}
                                >
                                    {/* 영문 타이포그래피 메인 */}
                                    <span
                                        className="nav-label"
                                        style={{
                                            fontSize: "0.95rem",
                                            fontWeight: 600,
                                            letterSpacing: "0.22em",
                                            color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
                                            textTransform: "uppercase",
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            textShadow: scrolled ? "none" : "0 2px 10px rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        {item.name}
                                    </span>

                                    {/* 한글 서브 타이포그래피 (예술 영화 포스터의 크레딧 느낌) */}
                                    <span
                                        className="nav-sublabel"
                                        style={{
                                            fontSize: "0.68rem",
                                            letterSpacing: "0.15em",
                                            color: "rgba(255,255,255,0.8)",
                                            marginTop: "8px",
                                            fontWeight: 300,
                                            opacity: isActive ? 0.8 : 0.4,
                                            textShadow: scrolled ? "none" : "0 2px 10px rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        {item.label}
                                    </span>

                                    {/* 하단 빛의 선 애니메이션 */}
                                    <div
                                        className="nav-dot"
                                        style={{
                                            position: "absolute",
                                            bottom: "-10px",
                                            width: "100%",
                                            height: "1px",
                                            backgroundColor: "var(--accent-color, rgba(255,255,255,0.8))",
                                            boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.4)",
                                            opacity: isActive ? 1 : 0,
                                            transform: isActive ? "scaleX(1)" : "scaleX(0)",
                                            transformOrigin: "center",
                                        }}
                                    />
                                </div>
                            </Link>

                            {/* Dropdown Sub-menu */}
                            {hasSubItems && (
                                <div
                                    className="sub-menu-container"
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: "50%",
                                        transform: "translateX(-50%) translateY(10px)",
                                        opacity: 0,
                                        visibility: "hidden",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        paddingTop: "2rem", // gap from main menu
                                        width: "max-content",
                                        zIndex: 10,
                                    }}
                                >
                                    <div style={{
                                        background: scrolled ? "rgba(5, 5, 5, 0.85)" : "rgba(0,0,0,0.6)",
                                        backdropFilter: "blur(16px) saturate(1.2)",
                                        padding: "1.5rem 2.5rem",
                                        borderRadius: "2px", // Cinematic sharp edges
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        borderTop: "2px solid var(--accent-color, #d4af37)",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1.5rem",
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.8)"
                                    }}>
                                        {item.subItems?.map((sub) => (
                                            <Link href={sub.href || "#"} key={sub.name} style={{ textDecoration: "none" }} onClick={(e) => {
                                                // href가 '#'이면 아직 없는 페이지로 간주하여 방지
                                                if (!sub.href || sub.href === "#") {
                                                    e.preventDefault();
                                                }
                                            }}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        cursor: "pointer",
                                                        opacity: 0.6,
                                                        transition: "opacity 0.3s ease, transform 0.3s ease"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.opacity = "1";
                                                        e.currentTarget.style.transform = "translateX(4px)"; // Slight indent on hover
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.opacity = "0.6";
                                                        e.currentTarget.style.transform = "translateX(0px)";
                                                    }}
                                                >
                                                    <span style={{
                                                        fontSize: "0.85rem",
                                                        fontWeight: 600,
                                                        letterSpacing: "0.2em",
                                                        color: "#fff",
                                                        fontFamily: "'Space Grotesk', sans-serif"
                                                    }}>
                                                        {sub.name}
                                                    </span>
                                                    <span style={{
                                                        fontSize: "0.65rem",
                                                        letterSpacing: "0.15em",
                                                        color: "rgba(255,255,255,0.7)",
                                                        marginTop: "6px",
                                                        fontWeight: 300
                                                    }}>
                                                        {sub.label}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Right Side Decoration (Minimalist lines representing a menu or just balance) */}
            <div style={{ zIndex: 2, display: "flex", gap: "10px", alignItems: "center", opacity: 0.6, cursor: "pointer" }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.3 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 0.6, duration: 0.3 })}
            >
                {/* 3줄의 비대칭 라인으로 포인트 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" }}>
                    <div style={{ width: "32px", height: "1px", backgroundColor: "#fff" }} />
                    <div style={{ width: "20px", height: "1px", backgroundColor: "#fff" }} />
                    <div style={{ width: "26px", height: "1px", backgroundColor: "#fff" }} />
                </div>
            </div>
        </header>
    );
}

