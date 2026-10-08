"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./story.module.css";

gsap.registerPlugin(ScrollTrigger);

/* 1장 「함께 보다」 — 한옥 사진들이 액자처럼 모여든다 (x, y: 화면 중앙 기준 vw/vh) */
const GALLERY = [
  { src: "/renewal/hanok-office.webp", alt: "서촌 한옥 사무실", x: -2, y: -6, r: -5, h: 44 },
  { src: "/renewal/hanok-wall.webp", alt: "한옥 처마와 담장", x: 14, y: 10, r: 3, h: 40 },
  { src: "/renewal/hanok-studio.webp", alt: "한옥 영상 스튜디오", x: 29, y: -8, r: -2, h: 46 },
  { src: "/renewal/hanok-meeting.webp", alt: "한옥 회의실", x: 42, y: 12, r: 5, h: 38 },
  { src: "/renewal/hanok-lattice.webp", alt: "창호 격자", x: 20, y: -20, r: 1, h: 24 },
];

/* 3장 「함께 봄을 맞이하다」 — 함께하는 사람들 */
const PEOPLE = [
  { src: "/renewal/team-video.webp", alt: "AI 영상제작팀" },
  { src: "/renewal/team-marketing.webp", alt: "마케팅 솔루션팀" },
  { src: "/renewal/team-education.webp", alt: "AI 교육·컨설팅팀" },
  { src: "/renewal/team-planning.webp", alt: "AI 기획개발팀" },
];

/* 2장 「함께 깨다」 — 화면을 덮은 벽을 삼각형 파편으로 쪼갠다.
   SSR/CSR 결과가 같도록 고정 시드 난수로 생성한다. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function buildShards(cols: number, rows: number) {
  const rand = seeded(20260128);
  const pts: [number, number][][] = [];
  for (let r = 0; r <= rows; r++) {
    const row: [number, number][] = [];
    for (let c = 0; c <= cols; c++) {
      const edgeX = c === 0 || c === cols;
      const edgeY = r === 0 || r === rows;
      const jx = edgeX ? 0 : (rand() - 0.5) * (70 / cols);
      const jy = edgeY ? 0 : (rand() - 0.5) * (70 / rows);
      row.push([(c / cols) * 100 + jx, (r / rows) * 100 + jy]);
    }
    pts.push(row);
  }
  const shards: { clip: string; cx: number; cy: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = pts[r][c], b = pts[r][c + 1], d = pts[r + 1][c], e = pts[r + 1][c + 1];
      const tris = rand() > 0.5 ? [[a, b, e], [a, e, d]] : [[a, b, d], [b, e, d]];
      for (const t of tris) {
        shards.push({
          clip: `polygon(${t.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(",")})`,
          cx: (t[0][0] + t[1][0] + t[2][0]) / 3,
          cy: (t[0][1] + t[1][1] + t[2][1]) / 3,
        });
      }
    }
  }
  return shards;
}

const SHARDS = buildShards(6, 4);
const PETALS = Array.from({ length: 14 }, (_, i) => i);

export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px)",
      },
      (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };

        // 움직임 줄이기 설정: 연출 없이 마지막 장면만 보여준다
        if (!motion) {
          gsap.set(q("[data-final]"), { autoAlpha: 1, y: 0 });
          gsap.set(q("[data-person]"), { autoAlpha: 1, y: 0 });
          gsap.set(q("[data-wordmark]"), { autoAlpha: 0 });
          gsap.set(q("[data-bg]"), { backgroundColor: "#FFF3DE" });
          return;
        }

        const rand = seeded(7);
        const vw = window.innerWidth / 100;
        const vh = window.innerHeight / 100;

        // 초기 상태
        gsap.set(q("[data-gallery]"), { autoAlpha: 0, scale: 0.3, x: 0, y: 30 * vh, rotate: 0 });
        gsap.set(q("[data-shard]"), { autoAlpha: 0 });
        gsap.set(q("[data-wall-text]"), { autoAlpha: 0 });
        gsap.set(q("[data-video]"), { autoAlpha: 0 });
        gsap.set(q("[data-person]"), { autoAlpha: 0, y: 60 * vh });
        gsap.set(q("[data-petal]"), { autoAlpha: 0 });
        gsap.set(q("[data-chapter]"), { autoAlpha: 0, y: 30 });
        gsap.set(q("[data-final]"), { autoAlpha: 0, y: 30 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: mobile ? "+=380%" : "+=520%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        /* 0. 함께봄 → 세 가지 뜻 */
        tl.to(q("[data-letter='0']"), { x: -6 * vw, duration: 1 }, 0)
          .to(q("[data-letter='2']"), { x: 6 * vw, duration: 1 }, 0)
          .to(q("[data-intro]"), { autoAlpha: 0, duration: 0.6 }, 0.2);

        /* 1. 함께 보다 */
        tl.to(q("[data-wordmark]"), { scale: 0.42, y: -36 * vh, autoAlpha: 0.12, duration: 1.2 }, 1)
          .to(q("[data-chapter='0']"), { autoAlpha: 1, y: 0, duration: 0.6 }, 1.4);
        q("[data-gallery]").forEach((card, i) => {
          const g = GALLERY[i];
          tl.to(
            card,
            { autoAlpha: 1, scale: mobile ? 0.7 : 1, x: (mobile ? g.x - 20 : g.x) * vw, y: (mobile ? g.y + 14 : g.y) * vh, rotate: g.r, duration: 1.3, ease: "power3.out" },
            1.2 + i * 0.12,
          );
        });

        /* 2. 함께 깨다 — 벽이 세워지고, 산산이 부서지며 AI 크리에이터들이 드러난다 */
        tl.to(q("[data-chapter='0']"), { autoAlpha: 0, y: -30, duration: 0.5 }, 3.1)
          .to(q("[data-gallery]"), { autoAlpha: 0, scale: 0.85, duration: 0.6 }, 3.1)
          .set(q("[data-video]"), { autoAlpha: 1 }, 3.3)
          .to(q("[data-shard]"), { autoAlpha: 1, duration: 0.5, stagger: { each: 0.01, from: "random" } }, 3.2)
          .to(q("[data-wall-text]"), { autoAlpha: 1, duration: 0.4 }, 3.6)
          .to(q("[data-wall-text]"), { autoAlpha: 0, scale: 1.08, duration: 0.3 }, 4.4)
          .to(q("[data-chapter='1']"), { autoAlpha: 1, y: 0, duration: 0.6 }, 4.6);
        q("[data-shard]").forEach((shard, i) => {
          const s = SHARDS[i];
          const dx = (s.cx - 50) * (0.9 + rand()) * vw;
          const dy = (s.cy - 50) * (0.9 + rand()) * vh + 20 * vh * rand();
          tl.to(
            shard,
            {
              x: dx,
              y: dy,
              rotate: (rand() - 0.5) * 140,
              scale: 0.6 + rand() * 0.3,
              autoAlpha: 0,
              transformOrigin: `${s.cx}% ${s.cy}%`,
              duration: 1.1,
              ease: "power3.in",
            },
            4.4 + rand() * 0.25,
          );
        });

        /* 3. 함께 봄을 맞이하다 — 봄빛으로 물들고, 사람들이 모여든다 */
        tl.to(q("[data-chapter='1']"), { autoAlpha: 0, y: -30, duration: 0.5 }, 6.1)
          .to(q("[data-video]"), { autoAlpha: 0, duration: 0.8 }, 6.1)
          .to(q("[data-bg]"), { backgroundColor: "#FFF3DE", duration: 1 }, 6.2)
          .to(q("[data-chapter='2']"), { autoAlpha: 1, y: 0, duration: 0.6 }, 6.6)
          .to(q("[data-person]"), { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }, 6.4);
        q("[data-petal]").forEach((p) => {
          tl.fromTo(
            p,
            { autoAlpha: 0, y: 40 * vh, x: (rand() - 0.5) * 90 * vw, rotate: rand() * 180 },
            { autoAlpha: 0.9, y: -60 * vh, x: `+=${(rand() - 0.5) * 20 * vw}`, rotate: `+=${180 + rand() * 180}`, duration: 2.6, ease: "none" },
            6.2 + rand() * 1.2,
          );
        });

        /* 4. 사람이 모이면, 봄이 됩니다 */
        tl.to(q("[data-chapter='2']"), { autoAlpha: 0, y: -30, duration: 0.5 }, 8.4)
          .to(q("[data-wordmark]"), { autoAlpha: 0, duration: 0.4 }, 8.4)
          .to(q("[data-people]"), mobile ? { autoAlpha: 0, y: 10 * vh, duration: 0.8 } : { y: 16 * vh, scale: 0.7, duration: 1 }, 8.5)
          .to(q("[data-final]"), { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }, 8.9)
          .to({}, { duration: 0.8 });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={styles.story} aria-label="함께봄의 세 가지 뜻">
      <div className={styles.bg} data-bg />

      {/* 2장 배경: 100명의 AI 영상 제작자 */}
      <div className={styles.videoLayer} data-video>
        <video
          className={styles.video}
          src="/videos/main-hero-opt.mp4"
          poster="/renewal/people-mosaic.webp"
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className={styles.videoShade} />
      </div>

      {/* 0장: 워드마크 */}
      <div className={styles.wordmark} data-wordmark aria-hidden="true">
        <span data-letter="0">함께</span>
        <span data-letter="2">봄</span>
      </div>
      <p className={styles.intro} data-intro>
        함께봄에는 세 가지 뜻이 있습니다
        <span className={styles.scrollHint}>스크롤</span>
      </p>

      {/* 1장 갤러리 */}
      <div className={styles.center}>
        {GALLERY.map((g) => (
          <figure key={g.src} className={styles.card} style={{ height: `${g.h}vh` }} data-gallery>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.src} alt={g.alt} loading="eager" />
          </figure>
        ))}
      </div>

      {/* 2장 벽과 파편 */}
      <div className={styles.wall} aria-hidden="true">
        {SHARDS.map((s, i) => (
          <div key={i} className={styles.shard} style={{ clipPath: s.clip }} data-shard />
        ))}
        <p className={styles.wallText} data-wall-text>
          비싸고, 느리고, 어려운
          <br />
          늘 하던 방식
        </p>
      </div>

      {/* 3장 꽃잎 */}
      {PETALS.map((i) => (
        <span key={i} className={styles.petal} data-petal aria-hidden="true" />
      ))}

      {/* 3장~마무리: 사람들 */}
      <div className={styles.people} data-people>
        {PEOPLE.map((p) => (
          <figure key={p.src} className={styles.person} data-person>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} loading="lazy" />
            <figcaption>{p.alt}</figcaption>
          </figure>
        ))}
      </div>

      {/* 장 제목 */}
      <div className={styles.chapters}>
        <div className={styles.chapter} data-chapter="0">
          <span className={styles.num}>01</span>
          <h2>함께 보다</h2>
          <p>한 자리에 모여 같은 것을 바라봅니다.<br />전시, 공모전, 커뮤니티에서 사람이 만납니다.</p>
        </div>
        <div className={`${styles.chapter} ${styles.onDark}`} data-chapter="1">
          <span className={styles.num}>02</span>
          <h2>함께 깨다</h2>
          <p>당연하던 상식을 함께 깨부숩니다.<br />AI로 더 빠르고, 더 가볍게 만듭니다.</p>
        </div>
        <div className={styles.chapter} data-chapter="2">
          <span className={styles.num}>03</span>
          <h2>함께 봄을 맞이하다</h2>
          <p>함께 배우고 자라<br />각자의 봄을 피워냅니다.</p>
        </div>
      </div>

      {/* 마무리 */}
      <div className={styles.final}>
        <p className={styles.finalEyebrow} data-final>함께 보고, 함께 깨고, 함께 봄을 맞이하는 곳</p>
        <h1 className={styles.finalTitle} data-final>
          사람이 모이면,
          <br />
          봄이 됩니다.
        </h1>
        <div className={styles.finalCtas} data-final>
          <a href="/contact" className={styles.ctaPrimary}>영상·홈페이지 제작 문의</a>
          <a href="#join" className={styles.ctaGhost}>함께하기</a>
        </div>
      </div>
    </section>
  );
}
