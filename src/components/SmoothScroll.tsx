"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // ★ 핵심: Lenis 스크롤 이벤트를 GSAP ScrollTrigger에 전달 ★
        lenis.on("scroll", ScrollTrigger.update);

        // ★ 핵심: GSAP ticker에 Lenis의 raf loop을 연결 ★
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // GSAP ticker는 초 단위, Lenis는 밀리초 단위
        });
        gsap.ticker.lagSmoothing(0); // Lag smoothing 비활성화로 더 정확한 동기화

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf as any);
        };
    }, []);

    return <>{children}</>;
}
