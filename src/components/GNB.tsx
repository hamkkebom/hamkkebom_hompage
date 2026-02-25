"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Youtube } from "lucide-react";
import gsap from "gsap";

export default function GNB() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    // 페이지 변경 시 모바일 메뉴 닫기
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    const navItems: Array<{
        name: string;
        label: string;
        href: string;
        subItems?: Array<{ name: string; label: string; href?: string; }>;
        isExternal?: boolean;
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
            { name: "YOUTUBE", label: "공식 채널", href: "https://www.youtube.com/@hamkkesong", isExternal: true },
        ];

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                padding: isMobile ? (scrolled ? "1rem 1.5rem" : "1.5rem 1.5rem") : (scrolled ? "1.2rem 4rem" : "2.5rem 5rem"),
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
            <Link href="/" style={{ textDecoration: "none", zIndex: 100, display: "flex", alignItems: "center" }} onClick={() => setMenuOpen(false)}>
                <div
                    style={{
                        cursor: "pointer",
                        opacity: 0.9,
                        transition: "opacity 0.4s ease",
                        display: "flex",
                        alignItems: "center"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
                >
                    <Image
                        src="/logo-white.png"
                        alt="함께봄 로고"
                        width={isMobile ? 100 : 140}
                        height={isMobile ? 40 : 60}
                        style={{ objectFit: "contain", filter: scrolled ? "none" : "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}
                        priority
                    />
                </div>
            </Link>

            {/* Central Navigation - The "Exhibition" Layout */}
            <nav style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: isMobile ? "none" : "flex",
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
                                target={item.isExternal ? "_blank" : undefined}
                                rel={item.isExternal ? "noopener noreferrer" : undefined}
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
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px"
                                        }}
                                    >
                                        {item.name === "YOUTUBE" && (
                                            <Youtube size={18} color="#ff0000" style={{ filter: "drop-shadow(0 0 8px rgba(255,0,0,0.6))" }} />
                                        )}
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

            {/* Right Side Decoration / Hamburger Menu */}
            <div style={{ zIndex: 100, display: "flex", gap: "10px", alignItems: "center", opacity: 1, cursor: "pointer", padding: "10px" }}
                onClick={() => setMenuOpen(!menuOpen)}
                onMouseEnter={(e) => !isMobile && gsap.to(e.currentTarget, { opacity: 1, duration: 0.3 })}
                onMouseLeave={(e) => !isMobile && gsap.to(e.currentTarget, { opacity: 0.6, duration: 0.3 })}
            >
                {/* 햄버거 아이콘 (모바일 및 데스크탑 공통, 클릭시 X 모양으로 애니메이션 추가) */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", position: "relative", width: "32px", height: "20px" }}>
                    <div style={{ width: menuOpen ? "32px" : "32px", height: "1px", backgroundColor: "#fff", transition: "all 0.3s ease", position: "absolute", top: menuOpen ? "10px" : "0", transform: menuOpen ? "rotate(45deg)" : "rotate(0)" }} />
                    <div style={{ width: menuOpen ? "0" : "20px", height: "1px", backgroundColor: "#fff", transition: "all 0.3s ease", position: "absolute", top: "8px", opacity: menuOpen ? 0 : 1 }} />
                    <div style={{ width: menuOpen ? "32px" : "26px", height: "1px", backgroundColor: "#fff", transition: "all 0.3s ease", position: "absolute", top: menuOpen ? "10px" : "16px", transform: menuOpen ? "rotate(-45deg)" : "rotate(0)" }} />
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div style={{
                position: "fixed",
                top: 0, left: 0, width: "100%", height: "100vh",
                backgroundColor: "rgba(5, 8, 15, 0.98)",
                zIndex: 99,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                opacity: menuOpen ? 1 : 0,
                visibility: menuOpen ? "visible" : "hidden",
                transform: menuOpen ? "translateY(0)" : "translateY(-20px)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                backdropFilter: "blur(20px)"
            }}>
                {navItems.map((item) => (
                    <div key={item.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                        <Link href={item.href} target={item.isExternal ? "_blank" : undefined} rel={item.isExternal ? "noopener noreferrer" : undefined} style={{ textDecoration: "none" }} onClick={(e) => {
                            if (item.subItems && item.subItems.length > 0) {
                                // 모바일에서는 서브메뉴 대신 부모 항목 링크로 이동 (또는 e.preventDefault()로 토글)
                                // 여기서는 부모 href가 유효하면 이동 허용 ("회사소개"는 /about)
                            }
                            setMenuOpen(false);
                        }}>
                            <span style={{
                                fontSize: "1.5rem",
                                fontWeight: 600,
                                letterSpacing: "0.2em",
                                color: "#fff",
                                fontFamily: "'Space Grotesk', sans-serif"
                            }}>
                                {item.name === "YOUTUBE" ? <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Youtube size={24} color="#ff0000" /> {item.name}</span> : item.name}
                            </span>
                        </Link>
                        {item.subItems && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem", marginTop: "-0.5rem", marginBottom: "1rem" }}>
                                {item.subItems.map(sub => (
                                    <Link key={sub.name} href={sub.href || "#"} style={{ textDecoration: "none", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", letterSpacing: "0.1em" }} onClick={() => setMenuOpen(false)}>
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </header>
    );
}

