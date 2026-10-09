"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let current: Lenis | null = null;

/** 현재 Lenis 인스턴스 (움직임 줄이기 설정이면 null — 기본 스크롤을 쓴다) */
export function getLenis() {
    return current;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        let stop: (() => void) | null = null;

        const start = () => {
            const isMobile = window.innerWidth <= 768;

            const lenis = new Lenis({
                duration: isMobile ? 1.0 : 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: isMobile ? 1.5 : 1,
                touchMultiplier: isMobile ? 5 : 2,
                // 고정 헤더(68px) 아래로 앵커 이동
                anchors: { offset: -68 },
            });
            current = lenis;

            // ★ 핵심: Lenis 스크롤 이벤트를 GSAP ScrollTrigger에 전달 ★
            lenis.on("scroll", ScrollTrigger.update);

            // ★ 핵심: GSAP ticker에 Lenis의 raf loop을 연결 ★
            const tick = (time: number) => {
                lenis.raf(time * 1000); // GSAP ticker는 초 단위, Lenis는 밀리초 단위
            };
            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0); // Lag smoothing 비활성화로 더 정확한 동기화

            return () => {
                gsap.ticker.remove(tick);
                lenis.destroy();
                if (current === lenis) current = null;
            };
        };

        // 움직임 줄이기: 부드러운 스크롤도 끈다 — 사용 중에 설정을 바꿔도 따라간다
        const apply = () => {
            if (reduce.matches) {
                stop?.();
                stop = null;
            } else if (!stop) {
                stop = start();
            }
        };
        apply();
        reduce.addEventListener("change", apply);

        return () => {
            reduce.removeEventListener("change", apply);
            stop?.();
            stop = null;
        };
    }, []);

    return <>{children}</>;
}
