"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function GNB() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                padding: scrolled ? "1rem 2rem" : "2rem 4rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: "var(--z-header)",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                background: scrolled ? "rgba(5, 5, 5, 0.85)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
            }}
        >
            <Link href="/" style={{ textDecoration: "none" }}>
                <div
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        letterSpacing: "-0.05em",
                        color: "var(--text-primary)",
                        cursor: "pointer"
                    }}
                >
                    함께봄<span style={{ color: "var(--accent-color)" }}>.</span>
                </div>
            </Link>

            <nav style={{ display: "flex", gap: "3rem" }}>
                {["회사소개", "서비스 설명", "WORKS", "문의하기"].map((item) => {
                    let linkHref = `/#${item.replace(" ", "")}`;
                    if (item === "회사소개") linkHref = "/about";
                    if (item === "문의하기") linkHref = "/contact";
                    if (item === "WORKS") linkHref = "/works";

                    return (
                        <a
                            key={item}
                            href={linkHref}
                            className="nav-link"
                            style={{
                                fontSize: "0.95rem",
                                fontWeight: 500,
                                color: "var(--text-primary)",
                                textDecoration: "none",
                                position: "relative",
                                opacity: 0.8,
                                transition: "opacity 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = "1";
                                gsap.to(e.currentTarget, { y: -2, duration: 0.3, ease: "power2.out" });
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = "0.8";
                                gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "power2.out" });
                            }}
                        >
                            {item}
                        </a>
                    );
                })}
            </nav>
        </header>
    );
}
