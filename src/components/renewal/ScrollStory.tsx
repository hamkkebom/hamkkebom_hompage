"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { preload } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/components/SmoothScroll";
import styles from "./story.module.css";
import { serifKr } from "./fonts";
import { buildStory, type StoryApi } from "./storyTimeline";
import StoryStatic from "./StoryStatic";
import {
  BLANK_GIF,
  BRIEFING_DATES,
  CRACKS,
  DESKTOP_ONLY_MEDIA,
  GATHER,
  HEROES,
  PEOPLE,
  PEOPLE_NOTE,
  PETALS,
  SATELLITES,
  SHARDS,
  SLATES,
  STAGE_HEADS,
  WORK_STILLS,
  heroById,
  type Hero,
  type Satellite,
  type Slate,
} from "./storyData";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Vars = CSSProperties & Record<`--${string}`, string | number | undefined>;
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

const STACKED_MEDIA = "(max-width: 767px), (max-aspect-ratio: 4/5)";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const HERO_SIZES = "(max-width: 767px) 92vw, (max-aspect-ratio: 4/5) 92vw, 50vw";
const SAT_SIZES = "(max-width: 767px) 46vw, (max-aspect-ratio: 4/5) 46vw, 22vw";
/* 04 사람들 띠: 데스크톱 min(1040px, 74vw) 를 3칸으로 (사이 16px 둘), 세로형은 두 칸(2+1) */
const PEOPLE_SIZES =
  "(max-width: 767px) calc((min(100vw, 592px) - 40px) / 2), (max-aspect-ratio: 4/5) calc((min(100vw, 592px) - 40px) / 2), min(336px, calc((74vw - 32px) / 3))";
const srcSetOf = (h: { src: string; src800?: string; w800?: number; w: number }) =>
  h.src800 ? `${h.src800} ${h.w800 ?? 800}w, ${h.src} ${h.w}w` : undefined;

/** 첫 두 장면 뒤의 사진은 load 이후에 순서대로 받는다 — 첫 화면(워드마크·첫 사진)과 대역폭을 다투지 않게.
    실제 주소는 data-src/data-srcset 에 두고, ScrollStory 의 대기열이 장면 순서(data-order)대로 몇 장씩 붙인다. */
function deferred(src: string, srcSet: string | undefined, order: number) {
  return { src: BLANK_GIF, "data-src": src, "data-srcset": srcSet, "data-order": order } as const;
}

/* ── 글자·줄 마스크 (JSX 에서 미리 쪼갠다 — 하이드레이션 뒤 DOM 변형 없음) ── */
function Line({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx(styles.lineMask, className)}>
      <span className={styles.lineInner} data-line>
        {children}
      </span>
    </span>
  );
}

function Chars({ text }: { text: string }) {
  return (
    <span className={styles.charMask} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} className={styles.char} data-char>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

function ChapterHead({ num, title }: { num: string; title: string }) {
  return (
    <>
      <span className={cx(styles.lineMask, styles.numMask)}>
        <span className={cx(styles.lineInner, styles.num)} data-num>
          {num}
        </span>
      </span>
      {/* 낭독용 제목은 실제 글자로 — 일부 화면낭독기의 읽기 모드는 aria-label 대신 내용을 읽는다 */}
      <h2 className={styles.chTitle}>
        <span className={styles.srOnly}>{title}</span>
        <Chars text={title} />
      </h2>
    </>
  );
}

/* ── 사진 한 장 (인화 / 화면 재질) ── */
function ScreenFx({ progress }: { progress: number }) {
  return (
    <span className={styles.screenFx} aria-hidden="true">
      <span className={styles.play}>▶</span>
      <span className={styles.progress}>
        <i style={{ width: `${progress}%` }} />
      </span>
    </span>
  );
}

function HeroShot({ h, index }: { h: Hero; index: number }) {
  // 첫 장면(문 뒤)과 둘째 장면만 바로 받는다. 움직임 줄이기에서는 이 무대를 쓰지 않으므로 받지 않는다.
  const eager = index < 2;
  const vars: Vars = { "--a": h.a, "--cap": `${h.cap}px`, zIndex: h.z };
  const imgProps = eager ? { src: h.src, srcSet: srcSetOf(h) } : deferred(h.src, srcSetOf(h), index * 10);
  return (
    <figure className={cx(styles.shot, styles.plate, h.material === "print" ? styles.print : styles.screen)} style={vars} data-plate={h.id}>
      <div className={styles.drift} data-drift>
        <div className={styles.frame} data-frame>
          <div className={styles.mask} data-mask>
            <picture>
              {eager && <source media={REDUCED} srcSet={BLANK_GIF} />}
              <img
                {...imgProps}
                sizes={h.src800 ? HERO_SIZES : undefined}
                alt={h.alt}
                width={h.w}
                height={h.h}
                fetchPriority={index === 0 ? "high" : eager ? "auto" : "low"}
                decoding="async"
                style={h.objectPosition ? { objectPosition: h.objectPosition } : undefined}
                data-img
              />
            </picture>
          </div>
          {h.material === "screen" && <ScreenFx progress={28 + ((index * 17) % 46)} />}
        </div>
        <figcaption className={cx(styles.cap, h.capSide === "right" && styles.capRight, h.capHideM && styles.capNoM)} data-cap>
          {h.caption}
        </figcaption>
      </div>
    </figure>
  );
}

function SatShot({ s, index }: { s: Satellite; index: number }) {
  const hero = heroById(s.hero);
  const heroIndex = HEROES.indexOf(hero);
  const vars: Vars = {
    "--a": s.a,
    "--ha": hero.a,
    "--hcap": `${hero.cap}px`,
    "--sx": s.sx,
    "--sy": s.sy,
    "--sw": s.sw,
    "--msx": s.m?.sx ?? s.sx,
    "--msy": s.m?.sy ?? s.sy,
    "--msw": s.m?.sw ?? s.sw,
    "--r": `${s.r}deg`,
  };
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...deferred(s.src, s.src600 ? `${s.src600} ${s.w600 ?? 600}w, ${s.src} ${s.w}w` : undefined, heroIndex * 10 + 1 + index)}
      sizes={s.src600 ? SAT_SIZES : undefined}
      alt={s.alt}
      width={s.w}
      height={s.h}
      fetchPriority="low"
      decoding="async"
      style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
      data-img
    />
  );
  return (
    <figure
      className={cx(styles.shot, styles.sat, s.material === "print" ? styles.print : styles.screen, s.mat && styles.mat, !s.m && styles.dOnly)}
      style={vars}
      data-sat={s.id}
    >
      <div className={styles.drift} data-drift>
        <div className={styles.frame} data-frame>
          <div className={styles.mask} data-mask>
            {s.m ? (
              img
            ) : (
              <picture>
                <source media={DESKTOP_ONLY_MEDIA} srcSet={BLANK_GIF} />
                {img}
              </picture>
            )}
          </div>
          {s.material === "screen" && <ScreenFx progress={34 + ((index * 23) % 40)} />}
        </div>
        {s.caption && (
          <figcaption className={cx(styles.satCap, s.capM && styles.satCapM, s.capTop && styles.satCapTop)} data-cap>
            <span className={styles.satCapTitle}>{s.caption}</span>
            {s.sub && <span className={styles.satCapSub}>{s.sub}</span>}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

const DIGITS20 = Array.from({ length: 20 }, (_, i) => i % 10);

function Odometer() {
  return (
    <span className={styles.odo} data-odo>
      <span className={styles.srOnly}>1896년, 헐버트가 아리랑을 처음 서양 악보로 옮겼습니다. 2026년, 서촌 한옥에서 헐버트 사진전이 열립니다.</span>
      <span className={styles.odoDigits} aria-hidden="true">
        {[1, 8, 9, 6].map((d, i) => (
          <span key={i} className={styles.odoCol}>
            <span className={styles.odoStrip} style={{ transform: `translateY(${-d * 5}%)` }} data-strip>
              {DIGITS20.map((n, k) => (
                <span key={k}>{n}</span>
              ))}
            </span>
          </span>
        ))}
      </span>
      <span className={styles.odoLabels} aria-hidden="true">
        <span data-odo-label="0">헐버트, 아리랑을 처음 서양 악보로 옮기다</span>
        <span data-odo-label="1">헐버트 사진전 · 서촌 한옥</span>
      </span>
    </span>
  );
}

/** 올라가는 숫자: 화면용 숫자는 낭독에서 빼고, 실제 값은 숨은 글로 읽힌다 */
function Count({ value, width }: { value: number; width: string }) {
  const label = value.toLocaleString("ko-KR");
  return (
    <>
      <span className={styles.count} style={{ minWidth: width }} data-count={value} aria-hidden="true">
        {label}
      </span>
      <span className={styles.srOnly}>{label}</span>
    </>
  );
}

function SlateBody({ s: { counters, body, bodyM } }: { s: Slate }) {
  if (counters) {
    return (
      <>
        꿈꾸는 아리랑 AI 영상 공모전 · 출품 <Count value={462} width="2.9ch" />편 · AI꿈 플랫폼 참여자 <Count value={2384} width="4.4ch" />명
      </>
    );
  }
  if (!bodyM) return <>{body}</>;
  return (
    <>
      <span className={styles.bodyD}>{body}</span>
      <span className={styles.bodyM}>{bodyM}</span>
    </>
  );
}

const RAIL = [
  { id: "ch1", n: "01", label: "헐버트" },
  { id: "ch2", n: "02", label: "아리랑" },
  { id: "ch3", n: "03", label: "AI 영상" },
  { id: "ch4", n: "04", label: "별님" },
];

/** 대기열 순서: 장면 사진(10·20…)과 위성 → 모여드는 인화(100+) → 03 고객 영상 장면(150+) → 04 사람들(200+) */
const GATHER_ORDER = 100;
const WORKS_ORDER = 150;
const PEOPLE_ORDER = 200;

export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  const api = useRef<StoryApi | null>(null);

  // 1장 첫 장면(문 뒤의 사람들)만 미리 받는다 — 움직임 줄이기에서는 이 무대를 쓰지 않으므로 받지 않는다
  const h1 = HEROES[0];
  preload(h1.src, { as: "image", fetchPriority: "high", imageSrcSet: srcSetOf(h1), imageSizes: HERO_SIZES, media: MOTION_OK });

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    ScrollTrigger.config({ ignoreMobileResize: true });
    const classic = new URLSearchParams(window.location.search).get("shatter") === "classic";
    const scrollTo = (y: number, immediate = false) => {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, immediate ? { immediate: true, force: true } : { duration: 1.6 });
      else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
    };

    // load 뒤: 미뤄 둔 사진의 주소를 장면 순서대로 몇 장씩 붙이고(앞 묶음을 다 받아 디코드한 뒤 다음 묶음),
    // 한가할 때 미리 디코드한다 — 등장 프레임에 디코드가 걸리지 않고, 뒤 장면 사진이 앞 장면과 대역폭을 다투지 않게.
    const idle: (cb: () => void) => number =
      "requestIdleCallback" in window ? (cb) => window.requestIdleCallback(cb, { timeout: 1500 }) : (cb) => window.setTimeout(cb, 120);
    // 화면이 바뀌어(태블릿 회전·창 넓히기) 새로 보이게 된 사진도 붙도록 여러 번 불러도 된다 — 붙인 사진은 data-src 가 지워진다
    let alive = true;
    const queue = () => {
      if (!alive || !window.matchMedia(MOTION_OK).matches) return;
      const imgs = Array.from(el.querySelectorAll<HTMLImageElement>("[data-stage] img[data-src]"))
        .filter((img) => img.offsetParent !== null)
        .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
      const BATCH = 4;
      const next = () => {
        if (!alive) return;
        const batch = imgs.splice(0, BATCH).filter((img) => img.dataset.src);
        if (!batch.length) return;
        batch.forEach((img) => {
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.src = img.dataset.src!;
          img.removeAttribute("data-src");
        });
        idle(() => {
          Promise.all(batch.map((img) => img.decode().catch(() => {}))).finally(next);
        });
      };
      next();
    };
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: MOTION_OK,
        stacked: STACKED_MEDIA,
        fine: "(pointer: fine)",
      },
      (ctx) => {
        const { motion, stacked, fine } = ctx.conditions as { motion: boolean; stacked: boolean; fine: boolean };
        // 움직임 줄이기: CSS 가 정적 문서를 보여 준다. JS 는 아무것도 하지 않는다.
        if (!motion) return;
        const story = buildStory(el, { stacked, fine, classic }, scrollTo);
        api.current = story;
        // 처음 한 번은 load 뒤에 붙인다. 그 뒤 화면 조건이 바뀌면 새로 보이게 된 사진을 바로 붙인다
        if (document.readyState === "complete") queue();
        return () => {
          story.cleanup();
          api.current = null;
        };
      },
    );

    // 글꼴이 바뀌면 왼쪽 단의 높이가 달라진다 — 다 받은 뒤 다시 잰다
    const refresh = () => alive && ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    document.fonts?.load(`600 24px ${serifKr.style.fontFamily}`, "함께보는순간").then(refresh).catch(() => {});

    if (document.readyState !== "complete") window.addEventListener("load", queue, { once: true });

    return () => {
      alive = false;
      window.removeEventListener("load", queue);
      mm.revert();
    };
  }, []);

  /** 건너뛰기: 이야기 전체를 훑으며 지나가지 않고 바로 다음 구역으로, 포커스도 함께 옮긴다 */
  const skipStory = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("vision");
    if (!target) return;
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { offset: -68, immediate: true, force: true });
    else target.scrollIntoView();
    target.focus({ preventScroll: true });
  };

  const noscriptCss = `.${styles.stage}{display:none!important}.${styles.static}{display:block!important}.${styles.story}{height:auto!important;overflow:visible!important}`;

  return (
    <section ref={root} className={cx(styles.story, serifKr.variable)} aria-label="우리의 프로젝트">
      {/* 홈의 제목 — 움직임·정적 문서·스크립트 없음 어느 경우에도 하나만 있다 */}
      <h1 className={styles.srOnly}>함께봄 — 사람이 모이면, 봄이 됩니다</h1>
      <noscript dangerouslySetInnerHTML={{ __html: `<style>${noscriptCss}</style>` }} />

      <div className={styles.stage} data-stage>
        {/* 화면 끝까지 덮는 층(100lvh): 배경 · 영상 · 벽 · 꽃잎 · 그레인 */}
        <div className={styles.bg} />
        <div className={styles.bgSpring} data-bg-spring aria-hidden="true">
          <div className={styles.dawn} data-dawn />
        </div>

        {/* 03 배경: AI 영상 크리에이터 작업 장면(AI로 만든 영상, 실제 인물 아님) — 무대 후반에 받고, 벽이 깨질 때만 재생한다 */}
        <div className={styles.videoLayer} data-video aria-hidden="true">
          <video className={styles.video} muted loop playsInline preload="none" data-video-el>
            <source src="/videos/ch2-creators-720.mp4" type="video/mp4" media={STACKED_MEDIA} />
            <source src="/videos/ch2-creators.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoShade} />
        </div>

        {/* ── 03 AI 영상 제작: 벽과 파편 ── */}
        <div className={styles.wall} aria-hidden="true">
          {SHARDS.map((s) => (
            <div
              key={s.i}
              className={styles.shard}
              style={{ left: `${s.box.left}%`, top: `${s.box.top}%`, width: `${s.box.width}%`, height: `${s.box.height}%`, clipPath: s.clip }}
              data-shard
            />
          ))}
          <svg className={styles.cracks} viewBox="0 0 100 100" preserveAspectRatio="none">
            {CRACKS.map((d, i) => (
              <path key={i} d={d} data-crack />
            ))}
          </svg>
          <p className={styles.wallText} data-wall-text>
            <Line>비싸고, 느리고, 어려운</Line>
            <Line>
              <span className={styles.strikeWrap}>
                늘 하던 방식
                <span className={styles.strike} data-strike />
              </span>
            </Line>
          </p>
        </div>
        <p className={styles.srOnly}>비싸고, 느리고, 어려운 늘 하던 방식을 깨뜨립니다.</p>

        {/* ── 04 별님: 꽃잎 ── */}
        {PETALS.map((p) => (
          <span
            key={p.i}
            className={cx(styles.petal, p.i >= 10 && styles.petalExtra)}
            style={{ "--s": `${p.size}px`, "--fd": `${p.flutter}s`, "--fdl": `${p.delay}s` } as Vars}
            data-petal
            aria-hidden="true"
          >
            <span className={styles.petalInner} data-hue={p.hue} />
          </span>
        ))}

        {/* 글·사진 층(100svh): 휴대폰 주소창이 접혀도 글은 늘 보이는 영역 안에 있다 */}
        <div className={styles.safe} data-safe>
          {/* 건너뛰기 → 진행 표시 순서로 맨 앞에 둔다 — 키보드는 마무리 버튼보다 먼저 여기에 닿는다 (보이는 자리는 CSS z-index) */}
          <a href="#vision" className={styles.skip} data-skip onClick={skipStory}>
            건너뛰기 <span aria-hidden="true">↓</span>
          </a>
          <nav className={styles.rail} data-rail aria-label="이야기 진행">
            <ol>
              {RAIL.map((r) => (
                <li key={r.id}>
                  <button type="button" data-rail-item={r.id} onClick={() => api.current?.jump(r.id)}>
                    <span className={styles.railNum}>{r.n}</span> {r.label}
                  </button>
                </li>
              ))}
            </ol>
            <span className={styles.railTrack} aria-hidden="true">
              <span className={styles.railFill} data-rail-fill />
            </span>
          </nav>
          <span className={styles.railBar} aria-hidden="true">
            <span data-railbar-fill />
          </span>

          {/* ── 01 헐버트 프로젝트 · 02 꿈꾸는 아리랑: 하나의 뷰파인더가 사람들을 차례로 담는다 ── */}
          <div className={styles.ch1} data-ch1>
            <div className={cx(styles.layer, styles.layerHero)} data-px="hero">
              <div className={styles.gather} data-gather aria-hidden="true">
                {GATHER.map((g) => {
                  const img = (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...deferred(`/renewal/ch1/thumbs/${g.src}.webp`, undefined, GATHER_ORDER + g.rank)}
                      alt=""
                      width={480}
                      height={320}
                      fetchPriority="low"
                      decoding="async"
                    />
                  );
                  return (
                    <figure
                      key={g.src}
                      className={cx(styles.printCard, !g.m && styles.dOnly)}
                      style={{ "--x": g.x, "--y": g.y, "--mx": g.m?.[0] ?? g.x, "--my": g.m?.[1] ?? g.y, zIndex: g.z } as Vars}
                      data-print
                      data-i={g.i}
                    >
                      <span className={styles.printImg}>
                        {g.m ? (
                          img
                        ) : (
                          <picture>
                            <source media={DESKTOP_ONLY_MEDIA} srcSet={BLANK_GIF} />
                            {img}
                          </picture>
                        )}
                      </span>
                      <span className={styles.printNo}>
                        <span className={styles.printNoD}>{g.frame}</span>
                        {g.mframe && <span className={styles.printNoM}>{g.mframe}</span>}
                      </span>
                    </figure>
                  );
                })}
              </div>
              {HEROES.map((h, i) => (
                <HeroShot key={h.id} h={h} index={i} />
              ))}
              <div className={cx(styles.plate, styles.doors)} style={{ "--a": h1.a, "--cap": `${h1.cap}px` } as Vars} data-doors aria-hidden="true">
                <span className={cx(styles.door, styles.doorL)} data-door="l" />
                <span className={cx(styles.door, styles.doorR)} data-door="r" />
              </div>
            </div>

            <div className={cx(styles.layer, styles.layerSat)} data-px="sat">
              {SATELLITES.map((s, i) => (
                <SatShot key={s.id} s={s} index={i} />
              ))}
            </div>

            <div className={styles.scrim} data-scrim aria-hidden="true" />
            <div className={styles.spot} data-spot aria-hidden="true" />

            <div className={cx(styles.layer, styles.layerVf)} data-px="vf">
              <div className={styles.vf} data-vf aria-hidden="true">
                {(["tl", "tr", "bl", "br"] as const).map((k) => (
                  <i key={k} className={cx(styles.corner, styles[k])} data-corner={k} />
                ))}
                <i className={styles.cross} data-cross />
              </div>
            </div>

            <div className={cx(styles.layer, styles.layerText)} data-px="text">
              <div className={styles.col}>
                {/* 프로젝트 제목: 01 → 02 가 같은 자리에서 바뀐다 */}
                <div className={styles.colHeads}>
                  {STAGE_HEADS.map((h) => (
                    <div key={h.id} className={styles.colHead} data-col-head={h.id}>
                      <ChapterHead num={h.num} title={h.title} />
                    </div>
                  ))}
                </div>

                {/* 안내 문장 · 슬레이트 · 맺음말은 제목 바로 아래 같은 자리에 차례로 놓인다 (한 번에 하나만) */}
                <div className={styles.colStack}>
                  <p className={styles.lead} data-lead>
                    <Line>한글을 사랑한 미국인, 헐버트.</Line>
                    <Line>그가 남긴 기록 앞에 다시 사람이 모입니다.</Line>
                  </p>

                  <ol className={styles.slates} aria-label="프로젝트 장면들">
                    {SLATES.map((s) => (
                      <li key={s.id} className={styles.slate} data-slate={s.id}>
                        {s.odometer && (
                          <Line className={styles.odoRow}>
                            <Odometer />
                          </Line>
                        )}
                        <Line className={styles.slateIndex}>{s.index}</Line>
                        <Line className={styles.slateKicker}>{s.kicker}</Line>
                        <h3 className={styles.slateTitle}>
                          <Line>{s.title}</Line>
                        </h3>
                        <Line className={styles.slateBody}>
                          <SlateBody s={s} />
                        </Line>
                      </li>
                    ))}
                  </ol>
                  <div className={cx(styles.slate, styles.statement)} data-slate="stmt">
                    <Line className={styles.slateKicker}>우리의 프로젝트</Line>
                    <p className={styles.statementTitle}>
                      <Line>한 장면 앞에,</Line>
                      <Line>사람이 모입니다.</Line>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 0장: 워드마크 — 첫 페인트부터 CSS 로 떠오른다 */}
          <div className={styles.wordmark} aria-hidden="true">
            <span className={styles.letter} data-letter="0">
              <span className={styles.letterInner}>함</span>
              <span className={styles.letterInner}>께</span>
            </span>
            <span className={cx(styles.letter, styles.letterSpring)} data-letter="2">
              <span className={styles.letterInner}>봄</span>
            </span>
          </div>
          {/* 바깥 p 는 스크롤(GSAP), 안쪽 span 은 첫 페인트 페이드(CSS) — 같은 노드를 두 곳에서 움직이지 않는다 */}
          <p className={styles.intro} data-intro>
            <span className={styles.introInner}>
              함께봄이 만들어 온 프로젝트
              <span className={styles.scrollHint} aria-hidden="true">
                <span className={styles.hintLine} />
                스크롤
              </span>
            </span>
          </p>

          {/* ── 04~마무리: AI 영상 크리에이터 (AI로 만든 이미지 — 사람마다 이름·팀을 달지 않는다) ── */}
          <div className={styles.people} style={{ "--n": PEOPLE.length } as Vars} data-people>
            {PEOPLE.map((p, i) => (
              <figure key={p.src} className={styles.person} data-person>
                <div className={styles.personMask} data-mask>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    {...deferred(p.src800, `${p.src800} 800w, ${p.src} 1600w`, PEOPLE_ORDER + i)}
                    sizes={PEOPLE_SIZES}
                    alt=""
                    width={800}
                    height={446}
                    fetchPriority="low"
                    decoding="async"
                    style={{ objectPosition: p.pos }}
                    data-img
                  />
                </div>
              </figure>
            ))}
            <p className={styles.peopleNote} data-people-note>
              <Line>{PEOPLE_NOTE}</Line>
            </p>
          </div>

          {/* 03 · 04 제목 */}
          <div className={styles.chapters}>
            <div className={cx(styles.chapter, styles.onDark)} data-chapter="1">
              <ChapterHead num="03" title="AI 영상 제작" />
              <p className={styles.chDesc} data-desc>
                노래광고영상부터 기업 홍보 영상까지, AI로 더 빠르고 가볍게 만듭니다.
                <span className={styles.chFact}>누적 제작 영상 400편 이상</span>
              </p>
            </div>
            <div className={styles.chapter} data-chapter="2">
              <ChapterHead num="04" title="별님 · 매칭설명회" />
              <p className={styles.chDesc} data-desc>
                취업은 어렵고 창업은 두려운 AI 영상 크리에이터에게, 안전한 일자리와 창업의 기회를 엽니다.
              </p>
              <p className={styles.chDates} data-dates>
                <span className={styles.chDatesLabel}>매칭설명회</span>
                {BRIEFING_DATES.map((d) => (
                  <span key={d} className={styles.chDate}>
                    {d}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* 03: 함께 만든 고객 영상의 장면 — 벽이 깨진 영상 위에 */}
          <ul className={styles.works} data-works aria-label="함께 만든 영상">
            {WORK_STILLS.map((w, i) => (
              <li key={w.src} className={styles.work} data-work>
                <span className={styles.workMask} data-mask>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    {...deferred(w.src, undefined, WORKS_ORDER + i)}
                    alt={w.alt}
                    width={600}
                    height={338}
                    fetchPriority="low"
                    decoding="async"
                    data-img
                  />
                </span>
                <span className={styles.workLabel}>{w.label}</span>
              </li>
            ))}
          </ul>

          {/* 마무리 */}
          <div className={styles.final} data-final>
            <p className={styles.finalEyebrow}>
              <span data-eb>헐버트 프로젝트 ·</span> <span data-eb>꿈꾸는 아리랑 ·</span> <span data-eb>AI 영상 제작 ·</span>{" "}
              <span data-eb>별님</span>
            </p>
            <p className={styles.finalTitle} data-final-title>
              <Line>사람이 모이면,</Line>
              <Line>
                <span className={styles.swashWrap}>
                  봄<span className={styles.swash} data-swash aria-hidden="true" />
                </span>
                이 됩니다.
              </Line>
            </p>
            <div className={styles.finalCtas} data-final-ctas>
              <a href="/join#apply" className={styles.ctaPrimary} data-cta onFocus={() => api.current?.jump("final", true)}>
                <span>매칭설명회 신청</span>
              </a>
              <a href="/contact" className={styles.ctaPrimary} data-cta onFocus={() => api.current?.jump("final", true)}>
                <span>제작 문의</span>
              </a>
            </div>
          </div>
        </div>
        <span className={styles.grain} aria-hidden="true" />
      </div>

      {/* 움직임 줄이기 · 스크립트 없음: 같은 이야기를 차분한 문서로 */}
      <StoryStatic />
    </section>
  );
}
