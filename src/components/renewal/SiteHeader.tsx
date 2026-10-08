"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV } from "./nav";
import styles from "./site.module.css";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="함께봄 홈">
          함께<span>봄</span>
        </Link>

        <nav className={styles.nav} aria-label="주 메뉴">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.headerCta}>
          문의하기
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.srOnly}>{open ? "메뉴 닫기" : "메뉴 열기"}</span>
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className={styles.mobileNav} aria-label="모바일 메뉴">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.mobileCta} onClick={() => setOpen(false)}>
            문의하기
          </Link>
        </nav>
      )}
    </header>
  );
}
