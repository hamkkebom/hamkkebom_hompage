import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { GATHER, PEOPLE_RISE, PETALS, SHARDS } from "./storyData";

gsap.registerPlugin(ScrollTrigger, CustomEase);

let easesReady = false;
function ensureEases() {
  if (easesReady) return;
  CustomEase.create("hb.cam", "M0,0 C0.65,0 0.35,1 1,1"); // 카메라·브래킷·매치컷
  CustomEase.create("hb.reveal", "M0,0 C0.16,1 0.3,1 1,1"); // 마스크 드러내기
  CustomEase.create("hb.exit", "M0,0 C0.7,0 0.84,0 1,1"); // 퇴장
  easesReady = true;
}

/** 1장이 끝나는 시각. 승인된 2·3장과 마무리는 예전 시각(1장 끝 = 3.1) + SHIFT 에 그대로 놓는다.
    1장 장면 간격(약 1.55)은 슬레이트 글이 다 오른 뒤 약 0.85 unit(데스크톱 약 300px) 멈춰 읽히도록 잡았다 */
const HANDOFF = 11.7;
const SHIFT = HANDOFF - 3.1;
const o = (t: number) => t + SHIFT;

/** 타임라인 단위 시각 (1 unit ≈ 데스크톱 40vh 스크롤) */
export const T = {
  gate: 0,
  ch1: 1.0,
  /** 장면 1 — 같은 화면을 함께 보는 사람들 (문이 열리면 보이는 사람들) */
  s1: 1.75,
  /** 장면 2 — 조선 기록 사진 속 사람들 */
  s2: 3.3,
  /** 매치컷 → 장면 3 전시 액자 */
  cut: 4.85,
  /** 장면 3' — 액자가 옆으로 물러나고 헐버트(사람)가 주인공이 된다 (슬레이트 3은 그대로) */
  s3p: 5.85,
  /** 장면 4 — 꿈꾸는 아리랑 AI 영상 공모전 */
  s4: 6.85,
  /** 장면 5 — 고객과 함께 만든 영상 */
  s5: 8.4,
  sheet: 9.95,
  handoff: HANDOFF,
  /** 벽이 거의 다 선 뒤에 글이 오른다 */
  wallText: o(3.7),
  shatter: o(4.4),
  ch2Head: o(4.6),
  ch3: o(6.1),
  people: o(6.4),
  /** 영상이 다 걷힌 뒤에 3장 제목이 오른다 */
  ch3Head: o(6.7),
  finale: o(8.4),
  finalIn: o(8.9),
};

/** 먹벽: 셔터가 닫히고 인화 사진이 걷힌 뒤 그 자리에서 번진다 (사진·제목 위에 반투명 벽이 겹치는 순간이 없게).
    파편은 처음부터 불투명하게 나타나 자라기만 한다. 마지막 파편이 다 자라는 시각이 WALL_DONE */
const WALL_AT = T.handoff + 0.35;
const SHARD_GROW = 0.25;
const WALL_DONE = WALL_AT + SHARD_GROW + Math.max(...SHARDS.map((s) => Math.max(s.rankD, s.rankM))) * 0.008;
/** 영상 재생 구간 — 벽이 깨지기 직전부터만 (벽 뒤에서 디코드하지 않는다) */
const PLAY_FROM = T.shatter - 0.15;
const PLAY_TO = o(6.3);
/** 헤더를 투명·흰 글씨로 바꾸는 어두운 구간 — 벽이 화면을 다 덮은 뒤부터 */
const DARK_FROM = WALL_DONE + 0.02;
/** 영상이 아래에서부터 걷히므로 맨 위(헤더 뒤)가 드러나는 무렵까지 어둡게 둔다 */
const DARK_TO = T.ch3 + 0.4;
/** 3장 꽃잎 펄럭임(CSS)을 켜는 구간 — 이야기 무대가 고정돼 있는 동안만 */
const SPRING_FROM = T.ch3 - 0.2;

/** 레일·포커스 이동 시 도착할 지점 */
const JUMPS: Record<string, number> = { ch1: 1.5, ch2: o(4.6) + 0.55, ch3: T.ch3Head + 0.65, final: T.finalIn + 1.1 };

export type StoryOpts = { stacked: boolean; fine: boolean; classic: boolean };
export type StoryApi = { jump(id: string, immediate?: boolean): void; cleanup(): void };
type Rect = { L: number; T: number; W: number; H: number };

const VIDEO_POSTER = "/renewal/people-mosaic.webp";
const VIDEO_POSTER_M = "/renewal/people-mosaic-960.webp";

export function buildStory(el: HTMLElement, opts: StoryOpts, scrollTo: (y: number, immediate?: boolean) => void): StoryApi {
  ensureEases();
  const { stacked, fine, classic } = opts;
  const all = <E extends Element = HTMLElement>(sel: string, scope: ParentNode = el) => Array.from(scope.querySelectorAll<E>(sel));
  const one = (sel: string, scope: ParentNode = el) => scope.querySelector<HTMLElement>(sel)!;
  /* 글·사진은 100svh 상자(data-safe) 기준, 배경은 100lvh 무대 전체. 리프레시 때마다 다시 읽는다 */
  const safe = one("[data-safe]");
  const vw = (n: number) => (el.clientWidth / 100) * n;
  const vh = (n: number) => (safe.clientHeight / 100) * n;
  const shown = (n: HTMLElement) => n.offsetParent !== null;

  /** transform 을 무시한 무대 기준 사각형 (offset 체인) */
  const rectOf = (node: HTMLElement): Rect => {
    let L = 0,
      Tp = 0,
      n: HTMLElement | null = node;
    while (n && n !== el) {
      L += n.offsetLeft;
      Tp += n.offsetTop;
      n = n.offsetParent as HTMLElement | null;
    }
    return { L, T: Tp, W: node.offsetWidth, H: node.offsetHeight };
  };

  const plate = (id: string) => one(`[data-plate="${id}"]`);
  const sat = (id: string) => one(`[data-sat="${id}"]`);
  const imgOf = (fig: HTMLElement) => one("[data-img]", fig);
  const frameOf = (fig: HTMLElement) => one("[data-frame]", fig);
  const maskOf = (fig: HTMLElement) => one("[data-mask]", fig);
  const capOf = (fig: HTMLElement) => fig.querySelector<HTMLElement>("[data-cap]");

  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

  /* ── 헬퍼 ── */
  function reveal(fig: HTMLElement, dir: string, t: number, d = 0.55) {
    if (!shown(fig)) return;
    tl.fromTo(fig, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18 }, t);
    const prop = dir === "left" || dir === "right" ? "xPercent" : "yPercent";
    const sign = dir === "left" || dir === "top" ? -1 : 1;
    tl.fromTo(maskOf(fig), { [prop]: sign * 101 }, { [prop]: 0, duration: d, ease: "hb.reveal" }, t);
    tl.fromTo(imgOf(fig), { [prop]: -sign * 101 }, { [prop]: 0, duration: d, ease: "hb.reveal" }, t);
  }
  function kenBurns(fig: HTMLElement, from: number, to: number, t: number, d: number) {
    if (!shown(fig)) return;
    tl.fromTo(imgOf(fig), { scale: from }, { scale: to, duration: d, ease: "none" }, t);
  }
  /* 글자(라벨·슬레이트·장 제목)는 visibility 대신 opacity 로만 숨긴다 — 화면낭독기·키보드에서 사라지지 않게 */
  function capIn(fig: HTMLElement, t: number) {
    const c = capOf(fig);
    if (c && shown(c)) tl.fromTo(c, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "hb.reveal" }, t);
  }
  function capOut(fig: HTMLElement, t: number) {
    const c = capOf(fig);
    if (c && shown(c)) tl.to(c, { opacity: 0, y: -6, duration: 0.25, ease: "hb.exit" }, t);
  }
  function out(fig: HTMLElement, t: number, vars: gsap.TweenVars = {}) {
    if (!shown(fig)) return;
    tl.to(fig, { autoAlpha: 0, scale: 0.96, duration: 0.3, ease: "hb.exit", ...vars }, t);
  }
  function satOut(fig: HTMLElement, t: number, rise: number) {
    capOut(fig, t);
    if (shown(fig)) tl.to(fig, { y: () => -vh(rise), autoAlpha: 0, duration: 0.4, ease: "hb.exit" }, t);
  }
  const linesOf = (box: HTMLElement) => all("[data-line]", box);
  function showLines(box: HTMLElement, t: number, d = 0.4, stagger = 0.04) {
    tl.set(box, { opacity: 1 }, t);
    tl.fromTo(linesOf(box), { yPercent: 112 }, { yPercent: 0, duration: d, ease: "hb.reveal", stagger }, t);
  }
  /** 나가는 글은 짧게 — 들어오는 글은 HIDE_GAP 뒤에 시작해 두 슬레이트의 줄이 겹치지 않는다 */
  const HIDE_D = 0.22;
  const HIDE_STAGGER = 0.02;
  const HIDE_GAP = 0.26;
  function hideLines(box: HTMLElement, t: number) {
    const ls = linesOf(box);
    tl.to(ls, { yPercent: -112, duration: HIDE_D, ease: "hb.exit", stagger: HIDE_STAGGER }, t);
    tl.set(box, { opacity: 0 }, t + HIDE_D + HIDE_STAGGER * ls.length);
  }

  /* ── 뷰파인더 브래킷 ── */
  const corners = all("[data-corner]");
  const cross = one("[data-cross]");
  const vf = one("[data-vf]");
  const G = stacked ? 10 : 14;
  const ARM = stacked ? 18 : 26;
  const cornerX = (k: string, r: Rect) => {
    const x = k[1] === "l" ? r.L - G : r.L + r.W + G - ARM;
    // 세로형: 브래킷도 다른 요소처럼 화면 양옆 16px 여백 안쪽에 둔다
    return stacked ? Math.min(Math.max(x, 16), el.clientWidth - 16 - ARM) : x;
  };
  const cornerY = (k: string, r: Rect) => (k[0] === "t" ? r.T - G : r.T + r.H + G - ARM);
  function frameTo(to: () => Rect, t: number, d: number, ease = "hb.cam", from?: () => Rect) {
    corners.forEach((c) => {
      const k = c.dataset.corner!;
      const vars = { x: () => cornerX(k, to()), y: () => cornerY(k, to()), duration: d, ease };
      if (from) tl.fromTo(c, { x: () => cornerX(k, from()), y: () => cornerY(k, from()) }, vars, t);
      else tl.to(c, vars, t);
    });
    const cv = { x: () => to().L + to().W / 2 - 7, y: () => to().T + to().H / 2 - 7, duration: d, ease };
    if (from) tl.fromTo(cross, { x: () => from().L + from().W / 2 - 7, y: () => from().T + from().H / 2 - 7 }, cv, t);
    else tl.to(cross, cv, t);
  }
  /** 초점 맞춤: 십자선이 잠깐 켜졌다 꺼지고 뷰파인더가 살짝 자리를 잡는다 */
  function focusLock(t: number, center: () => Rect) {
    tl.to(cross, { autoAlpha: 0.9, duration: 0.06 }, t);
    tl.to(cross, { autoAlpha: 0, duration: 0.15 }, t + 0.1);
    const origin = () => `${center().L + center().W / 2}px ${center().T + center().H / 2}px`;
    tl.to(vf, { scale: 1.02, duration: 0.02, transformOrigin: origin }, t);
    tl.to(vf, { scale: 1, duration: 0.25, ease: "back.out(2)" }, t + 0.02);
  }
  function travel(t: number) {
    tl.to(cross, { autoAlpha: 0.55, duration: 0.08 }, t);
  }

  /* ── 요소 ── */
  const H = { h1: plate("h1"), h2: plate("h2"), h3: plate("h3"), h3p: plate("h3p"), h4: plate("h4"), h5: plate("h5") };
  const S = {
    s1: sat("s1"),
    s2: sat("s2"),
    s3a: sat("s3a"),
    s3b: sat("s3b"),
    s4a: sat("s4a"),
    s4b: sat("s4b"),
    s5a: sat("s5a"),
    s5b: sat("s5b"),
  };
  const R = (n: HTMLElement) => () => rectOf(n);
  const driftOf = (fig: HTMLElement) => one("[data-drift]", fig);
  const drift = (fig: HTMLElement, from: number, to: number, t: number, d: number) => {
    if (shown(fig)) tl.fromTo(driftOf(fig), { y: () => vh(from) }, { y: () => vh(to), duration: d }, t);
  };

  const letters = all("[data-letter]");
  const [L0, L2] = letters;
  const intro = one("[data-intro]");
  const doors = one("[data-doors]");
  const spot = one("[data-spot]");
  const colHead = one("[data-col-head]");
  const lead = one("[data-lead]");
  const slate = (id: string) => one(`[data-slate="${id}"]`);
  const strips = all("[data-strip]");
  const odoLabels = all("[data-odo-label]");
  const counters = all("[data-count]");
  const gather = one("[data-gather]");
  const prints = all("[data-print]").filter(shown);
  const rail = one("[data-rail]");
  const railFill = one("[data-rail-fill]");
  const railBar = one("[data-railbar-fill]");
  const railItems = all("[data-rail-item]");
  const skip = one("[data-skip]");

  /* ════════════ 0. 관문 — 「함께」와 「봄」 사이에서 「보다」가 열린다 ════════════ */
  const wordRect = (): Rect => {
    const a = rectOf(L0),
      b = rectOf(L2);
    const pad = vw(1.4);
    const L = Math.min(a.L, b.L) - pad;
    const Tp = Math.min(a.T, b.T) + a.H * 0.04 - pad * 0.6;
    return { L, T: Tp, W: Math.max(a.L + a.W, b.L + b.W) + pad - L, H: Math.max(a.H, b.H) * 0.92 + pad * 1.2 };
  };
  const gapPx = () => (stacked ? 14 : vw(2.6));
  tl.addLabel("intro", 0);
  tl.fromTo(corners, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.02);
  tl.fromTo(cross, { autoAlpha: 0 }, { autoAlpha: 0.6, duration: 0.25 }, 0.02);
  // 브래킷은 문이 다 놓이는 순간(0.95) 문 사각형에 닿는다
  frameTo(R(H.h1), 0.3, 0.65, "hb.cam", wordRect);
  // 안내 문구: CSS 페이드는 안쪽 span(introInner) 이, 스크롤 퇴장은 바깥 p 가 맡는다 — 같은 노드를 두고 다투지 않게.
  // 시작값을 명시해 두어 CSS 애니메이션 도중에 기록된 opacity 0 이 다시 쓰이지 않는다.
  tl.fromTo(intro, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: () => -vh(2), duration: 0.45, ease: "hb.exit", immediateRender: false }, 0.15);
  tl.fromTo(L0, { x: 0 }, { x: () => rectOf(H.h1).L - gapPx() - (rectOf(L0).L + rectOf(L0).W), duration: 0.75, ease: "hb.cam" }, 0.2);
  tl.fromTo(L2, { x: 0 }, { x: () => rectOf(H.h1).L + rectOf(H.h1).W + gapPx() - rectOf(L2).L, duration: 0.75, ease: "hb.cam" }, 0.2);
  // 레일·건너뛰기는 글자가 흐려지기 시작한 뒤에 — 「봄」 위로 레일이 지나가지 않게
  tl.fromTo([rail, skip], { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.95);
  // 창호 미닫이: 글자가 벌어지는 틈에 닫힌 문이 놓이고, 문이 열리면 사람들이 있다.
  // 데스크톱은 글자가 흐려지기 시작할 때(0.7) 문이 놓인다 — 「봄」이 문짝 위에 겹쳐 보이지 않게
  if (stacked) tl.fromTo(doors, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "hb.reveal" }, 0.55);
  else tl.fromTo(doors, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "hb.reveal" }, 0.7);
  if (stacked) {
    // 세로형: 글자가 화면 밖으로 밀려나며 가장자리에 조각이 남지 않도록 움직이는 동안 흐려진다
    tl.to(letters, { autoAlpha: 0, scale: 0.92, duration: 0.4, ease: "power1.in" }, 0.2);
  } else {
    tl.to(letters, { autoAlpha: 0, scale: 0.92, duration: 0.3, ease: "hb.exit" }, 0.7);
  }
  tl.set(H.h1, { autoAlpha: 1 }, 0.85);
  kenBurns(H.h1, 1.14, 1.02, 0.85, T.s2 - 0.85);
  tl.fromTo(one('[data-door="l"]'), { xPercent: 0 }, { xPercent: -101, duration: 0.55, ease: "hb.cam" }, 0.95);
  tl.fromTo(one('[data-door="r"]'), { xPercent: 0 }, { xPercent: 101, duration: 0.55, ease: "hb.cam" }, 0.95);
  tl.set(doors, { autoAlpha: 0 }, 1.51);

  /* ════════════ 1. 함께 보다 ════════════ */
  tl.addLabel("ch1", T.ch1);
  tl.set(colHead, { opacity: 1 }, T.ch1);
  tl.fromTo(all("[data-num]", colHead), { yPercent: 112 }, { yPercent: 0, duration: 0.4, ease: "hb.reveal" }, T.ch1);
  tl.fromTo(all("[data-char]", colHead), { yPercent: 112 }, { yPercent: 0, duration: 0.55, ease: "hb.reveal", stagger: 0.035 }, T.ch1 + 0.05);
  tl.fromTo(spot, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 1.05);
  showLines(lead, 1.15, 0.5, 0.08);
  focusLock(1.5, R(H.h1));
  capIn(H.h1, 1.55);

  /* 장면 1 — 같은 화면을 함께 보는 사람들 (함께봄 영상제작팀) + 그들이 만든 고객 영상 */
  tl.addLabel("s1", T.s1);
  reveal(S.s1, "bottom", 1.4, 0.5);
  drift(S.s1, 3, -4, 1.4, T.s2 - 1.4);
  capIn(S.s1, 1.65);
  hideLines(lead, T.s1);
  showLines(slate("1"), T.s1 + HIDE_GAP);

  /* 장면 2 — 장기판 하나를 둘러싼 사람들 (조선 기록 사진) */
  tl.addLabel("s2", T.s2);
  hideLines(slate("1"), T.s2);
  capOut(H.h1, T.s2);
  satOut(S.s1, T.s2, 8);
  reveal(H.h2, "bottom", T.s2, 0.5);
  kenBurns(H.h2, 1.12, 1.02, T.s2, T.cut - T.s2);
  travel(T.s2);
  frameTo(R(H.h2), T.s2, 0.5);
  out(H.h1, T.s2 + 0.15, { scale: 0.97 });
  showLines(slate("2"), T.s2 + HIDE_GAP);
  focusLock(T.s2 + 0.5, R(H.h2));
  capIn(H.h2, T.s2 + 0.4);
  reveal(S.s2, "top", T.s2 + 0.25, 0.5);
  drift(S.s2, -2, 3, T.s2 + 0.25, T.cut - T.s2 - 0.25);

  /* 매치컷 — 장기 사진이 한옥 창살 앞 전시 액자 속 그 사진으로 들어간다.
     액자 사진 속 인화지 위치(실측): 중심 50.0% / 43.8%, 폭 30.3%, 높이 29.0% (종횡비 약 1.2).
     장기 사진(1.489)은 줄어드는 동안 좌우가 잘려 인화지와 같은 비율·같은 크롭이 된다 */
  const PRINT = { cx: 0.5, cy: 0.438, h: 0.29 };
  // 1.489 × (1 − 0.08 − 0.114) ≈ 1.2 · 서 있는 아이가 인화지에서와 같은 자리에 오도록 왼쪽을 덜 자른다
  const CLIP_L = 0.08,
    CLIP_R = 0.114;
  const cut = () => {
    const f2 = rectOf(H.h2),
      m2 = rectOf(maskOf(H.h2)),
      f3 = rectOf(H.h3),
      m3 = rectOf(maskOf(H.h3));
    const pcx = m3.L + PRINT.cx * m3.W,
      pcy = m3.T + PRINT.cy * m3.H;
    const s = (PRINT.h * m3.H) / m2.H;
    // 좌우를 비대칭으로 자르면 보이는 부분의 중심이 옮겨 가므로 그만큼 보정한다
    const clipShift = ((CLIP_R - CLIP_L) / 2) * f2.W * s;
    return { dx: pcx - (f2.L + f2.W / 2) + clipShift, dy: pcy - (f2.T + f2.H / 2), s, ox: pcx - f3.L, oy: pcy - f3.T };
  };
  const CUT_D = 0.8;
  tl.addLabel("s3", T.cut);
  satOut(S.s2, T.cut - 0.25, 6); // 줌이 시작되기 전에 비켜 준다
  // 큰 사진이 화면을 채우는 동안에는 스포트라이트(전체 화면 그라디언트)를 내려 합성 비용을 줄인다
  tl.to(spot, { autoAlpha: 0, duration: 0.1 }, T.cut);
  tl.to(spot, { autoAlpha: 1, duration: 0.3 }, T.cut + CUT_D);
  tl.fromTo(H.h2, { x: 0, y: 0, scale: 1 }, { x: () => cut().dx, y: () => cut().dy, scale: () => cut().s, duration: CUT_D, ease: "hb.cam" }, T.cut);
  tl.fromTo(
    frameOf(H.h2),
    { clipPath: "inset(0% 0% 0% 0%)" },
    { clipPath: `inset(0% ${CLIP_R * 100}% 0% ${CLIP_L * 100}%)`, duration: CUT_D, ease: "hb.cam" },
    T.cut,
  );
  tl.fromTo(
    H.h3,
    { x: () => -cut().dx, y: () => -cut().dy, scale: () => 1 / cut().s, transformOrigin: () => `${cut().ox}px ${cut().oy}px` },
    { x: 0, y: 0, scale: 1, duration: CUT_D, ease: "hb.cam", transformOrigin: () => `${cut().ox}px ${cut().oy}px` },
    T.cut,
  );
  // 액자 사진 원본은 600px 이다. 줌 앞부분(4–5배)에서는 보이지 않다가 배율이 약 2.2배 아래로 내려온 뒤에야
  // 천천히(power1.in) 나타나 약 1.4배에서 다 보인다 — 흐린 창살이 화면을 채우는 순간이 없다.
  // 장기 사진은 액자가 거의 제 크기(≤1.05배)가 된 뒤에 녹아 사라진다.
  tl.fromTo(H.h3, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.16, ease: "power1.in" }, T.cut + 0.46);
  tl.to(H.h2, { autoAlpha: 0, duration: 0.08 }, T.cut + 0.72);
  // 크게 확대된 액자가 왼쪽 글 단을 덮지 않도록 종이 가림막을 잠깐 올린다 (가림막은 사진 층 위, 글 층 아래)
  const scrim = one("[data-scrim]");
  tl.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, T.cut + 0.05);
  tl.to(scrim, { autoAlpha: 0, duration: 0.25 }, T.cut + CUT_D - 0.1);
  capOut(H.h2, T.cut);
  hideLines(slate("2"), T.cut);
  travel(T.cut);
  frameTo(R(H.h3), T.cut, CUT_D);
  focusLock(T.cut + CUT_D, R(H.h3));
  showLines(slate("3"), T.cut + 0.3);
  // 1896 → 2026 — 슬레이트가 오르는 동안 다 굴러, 장면 3' 전에 「2026」이 멈춰 있다
  const IDX0 = [1, 8, 9, 6],
    IDX1 = [2, 10, 12, 16];
  tl.fromTo(
    strips,
    { y: 0, yPercent: (i: number) => -IDX0[i] * 5 },
    { yPercent: (i: number) => -IDX1[i] * 5, duration: 0.45, ease: "hb.cam", stagger: { each: 0.05, from: "end" } },
    T.cut + 0.35,
  );
  tl.to(odoLabels[0], { opacity: 0, yPercent: -40, duration: 0.2, ease: "hb.exit" }, T.cut + 0.6);
  tl.fromTo(odoLabels[1], { opacity: 0, yPercent: 40 }, { opacity: 1, yPercent: 0, duration: 0.25, ease: "hb.reveal" }, T.cut + 0.68);
  capIn(H.h3, T.cut + 0.8);
  kenBurns(H.h3, 1, 1.04, T.cut + CUT_D, T.s4 - T.cut);

  /* 장면 3' — 액자는 초상의 오른쪽 위 모서리로 물러나 작은 인화가 되고, 사람(헐버트)이 주인공이 된다 */
  tl.addLabel("s3p", T.s3p);
  const COLLAGE_K = stacked ? 0.4 : 0.55;
  const collage = () => {
    const f3 = rectOf(H.h3),
      p = rectOf(H.h3p),
      c = cut();
    const w = f3.W * COLLAGE_K;
    // 얼굴(가로 30–70%)은 가리지 않는다. 오른쪽 레일·화면 끝 안쪽으로 붙잡는다
    const maxCx = el.clientWidth - (stacked ? 16 : 96) - w / 2;
    const tx = Math.min(p.L + p.W + w * (stacked ? 0 : 0.05), maxCx);
    const ty = p.T + p.H * (stacked ? 0.06 : 0.08);
    // 매치컷이 남긴 transform-origin(인화지 중심) 기준으로 줄어든 뒤의 중심이 (tx, ty) 에 오게
    const ox = f3.L + c.ox,
      oy = f3.T + c.oy;
    return { x: tx - (ox + COLLAGE_K * (f3.L + f3.W / 2 - ox)), y: ty - (oy + COLLAGE_K * (f3.T + f3.H / 2 - oy)) };
  };
  capOut(H.h3, T.s3p);
  tl.fromTo(
    H.h3,
    { x: 0, y: 0, scale: 1, rotation: 0 },
    { x: () => collage().x, y: () => collage().y, scale: COLLAGE_K, rotation: 2.5, duration: 0.6, ease: "hb.cam", immediateRender: false },
    T.s3p,
  );
  reveal(H.h3p, "bottom", T.s3p + 0.1, 0.55);
  kenBurns(H.h3p, 1.1, 1.02, T.s3p + 0.1, T.s4 - T.s3p);
  travel(T.s3p);
  frameTo(R(H.h3p), T.s3p, 0.6);
  focusLock(T.s3p + 0.6, R(H.h3p));
  capIn(H.h3p, T.s3p + 0.5);
  if (shown(S.s3a)) tl.fromTo(S.s3a, { autoAlpha: 0, y: () => -vh(4) }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "hb.reveal" }, T.s3p + 0.3);
  reveal(S.s3b, "bottom", T.s3p + 0.35, 0.5);
  kenBurns(S.s3b, 1.1, 1, T.s3p + 0.35, 0.7);
  drift(S.s3b, 2, -4, T.s3p + 0.35, T.s4 - T.s3p - 0.35);
  capIn(S.s3b, T.s3p + 0.6);

  /* 장면 4 — 462편의 아리랑을 함께 보다 */
  tl.addLabel("s4", T.s4);
  reveal(H.h4, "bottom", T.s4, 0.55);
  kenBurns(H.h4, 1.15, 1.03, T.s4, T.s5 - T.s4 + 0.2);
  travel(T.s4);
  frameTo(R(H.h4), T.s4, 0.6);
  focusLock(T.s4 + 0.6, R(H.h4));
  capOut(H.h3p, T.s4);
  satOut(S.s3b, T.s4, 12);
  if (shown(S.s3a)) tl.to(S.s3a, { y: () => -vh(8), autoAlpha: 0, duration: 0.4, ease: "hb.exit" }, T.s4);
  hideLines(slate("3"), T.s4);
  out(H.h3p, T.s4 + 0.12);
  out(H.h3, T.s4 + 0.06, { scale: COLLAGE_K * 0.94 });
  showLines(slate("4"), T.s4 + HIDE_GAP);
  // 숫자는 줄이 오르는 동시에 세기 시작해 짧게 끝난다 — 슬레이트가 읽히는 동안에는 늘 실제 값(462 / 2,384)이다
  counters.forEach((c) => {
    const target = Number(c.dataset.count);
    const box = { v: 0 };
    // React 가 그린 글자 노드를 그대로 두고 값만 바꾼다 (노드를 갈아 끼우지 않는다)
    const text = c.firstChild as Text;
    tl.fromTo(
      box,
      { v: 0 },
      {
        v: target,
        duration: 0.3,
        ease: "power1.out",
        onUpdate: () => {
          text.nodeValue = Math.round(box.v).toLocaleString("ko-KR");
        },
      },
      T.s4 + HIDE_GAP,
    );
  });
  reveal(S.s4a, "right", T.s4 + 0.25, 0.5);
  capIn(S.s4a, T.s4 + 0.5);
  reveal(S.s4b, "bottom", T.s4 + 0.35, 0.5);
  capIn(H.h4, T.s4 + 0.4);

  /* 장면 5 — 고객과 함께 만든 영상 */
  tl.addLabel("s5", T.s5);
  reveal(H.h5, "right", T.s5, 0.55);
  kenBurns(H.h5, 1.12, 1.02, T.s5, T.sheet - T.s5 + 0.2);
  travel(T.s5);
  frameTo(R(H.h5), T.s5, 0.6);
  focusLock(T.s5 + 0.6, R(H.h5));
  capOut(H.h4, T.s5);
  satOut(S.s4a, T.s5, 8);
  satOut(S.s4b, T.s5, 12);
  hideLines(slate("4"), T.s5);
  out(H.h4, T.s5 + 0.12);
  showLines(slate("5"), T.s5 + HIDE_GAP);
  reveal(S.s5a, "bottom", T.s5 + 0.2, 0.5);
  capIn(S.s5a, T.s5 + 0.45);
  reveal(S.s5b, "bottom", T.s5 + 0.3, 0.5);
  capIn(S.s5b, T.s5 + 0.55);
  capIn(H.h5, T.s5 + 0.4);

  /* 당겨 보기 — 화면 밖에서 사람들이 고리를 이루며 모여든다 */
  tl.addLabel("sheet", T.sheet);
  out(H.h5, T.sheet, { scale: 0.92, duration: 0.4 });
  capOut(H.h5, T.sheet);
  satOut(S.s5a, T.sheet, 8);
  satOut(S.s5b, T.sheet, 12);
  hideLines(slate("5"), T.sheet);
  tl.to(spot, { autoAlpha: 0, duration: 0.4 }, T.sheet);
  tl.set(gather, { autoAlpha: 1 }, T.sheet);
  // 인화 사진은 모여드는 동안만 합성 레이어로 올린다 (그림자는 레이어에 한 번만 그려진다)
  tl.set(prints, { willChange: "transform" }, T.sheet - 0.01);
  tl.set(prints, { willChange: "auto" }, T.handoff + 0.45);
  const gRect = R(gather);
  prints.forEach((p) => {
    const g = GATHER[Number(p.dataset.i)];
    const dir = () => {
      const gr = gRect();
      const pr = rectOf(p);
      const dx = pr.L + pr.W / 2 - (gr.L + gr.W / 2);
      const dy = pr.T + pr.H / 2 - (gr.T + gr.H / 2);
      const len = Math.hypot(dx, dy) || 1;
      const reach = Math.hypot(el.clientWidth, safe.clientHeight) * 0.62;
      return { x: (dx / len) * reach, y: (dy / len) * reach };
    };
    tl.fromTo(
      p,
      { x: () => dir().x, y: () => dir().y, rotation: g.r0, autoAlpha: 0 },
      { x: 0, y: 0, rotation: g.r, autoAlpha: 1, duration: 0.7, ease: "expo.out" },
      T.sheet + 0.05 + g.rank * 0.025,
    );
  });
  travel(T.sheet + 0.1);
  frameTo(gRect, T.sheet + 0.1, 0.55);
  focusLock(T.sheet + 0.65, gRect);
  showLines(slate("stmt"), T.sheet + 0.35, 0.5, 0.07);

  /* ════════════ 1 → 2: 셔터가 닫히고 먹벽이 그 자리에서 번진다 ════════════ */
  tl.addLabel("handoff", T.handoff);
  // 제목·맺음말은 벽이 서기(WALL_AT) 전에 다 빠진다
  tl.to([...all("[data-num]", colHead), ...all("[data-char]", colHead)], { yPercent: -112, duration: 0.25, ease: "hb.exit", stagger: 0.01 }, T.handoff);
  hideLines(slate("stmt"), T.handoff);
  tl.set(colHead, { opacity: 0 }, T.handoff + 0.33);
  const shut = (): Rect => {
    const g = gRect();
    return { L: g.L + g.W / 2, T: g.T + g.H / 2, W: 0, H: 0 };
  };
  frameTo(shut, T.handoff, 0.35, "hb.exit");
  tl.to(corners, { autoAlpha: 0, duration: 0.1 }, T.handoff + 0.3);
  tl.to(cross, { autoAlpha: 0.9, duration: 0.05 }, T.handoff + 0.25);
  tl.to(cross, { autoAlpha: 0, duration: 0.15 }, T.handoff + 0.32);
  // 셔터가 닫히는 동안 인화 사진이 살짝 물러나며 걷힌다 — 벽은 그다음, 빈 종이 위에서 번진다
  tl.to(gather, { scale: 0.97, duration: 0.35 }, T.handoff + 0.05);
  tl.to(gather, { autoAlpha: 0, duration: 0.2 }, T.handoff + 0.2);

  const shards = all("[data-shard]");
  if (classic) {
    tl.fromTo(shards, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, stagger: { each: 0.01, from: "random" } }, WALL_AT);
  } else {
    shards.forEach((s, i) => {
      const d = SHARDS[i];
      const at = WALL_AT + (stacked ? d.rankM : d.rankD) * 0.008;
      // 첫 프레임부터 불투명 — 반투명 회색 삼각형이 겹쳐 보이는 순간 없이 먹이 번지듯 자라기만 한다
      tl.set(s, { autoAlpha: 1 }, at);
      tl.fromTo(s, { scale: 0.6, transformOrigin: d.origin }, { scale: 1, duration: SHARD_GROW, ease: "power2.out", immediateRender: false }, at);
    });
  }
  // 파편은 벽이 서는 순간부터 다 흩어질 때까지만 합성 레이어로 올린다
  const SHATTER_END = T.shatter + 0.28 + 1.2;
  tl.set(shards, { willChange: "transform, opacity" }, WALL_AT - 0.01);
  tl.set(shards, { willChange: "auto" }, SHATTER_END);
  const videoLayer = one("[data-video]");
  tl.set(videoLayer, { autoAlpha: 1 }, WALL_DONE);
  tl.to([rail, skip], { color: "rgba(255,255,255,0.85)", duration: 0.3 }, DARK_FROM - 0.1);

  /* ════════════ 2. 함께 깨다 (승인안 — 시각만 이동) ════════════ */
  const wallText = one("[data-wall-text]");
  tl.addLabel("ch2", T.wallText);
  showLines(wallText, T.wallText, 0.5, 0.12);
  if (!classic) {
    // 금이 가고, 「늘 하던 방식」에 봄빛 줄이 그어지고, 한 번 울린 뒤 부서진다
    all("[data-crack]").forEach((c, g) => {
      tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.08 }, T.shatter - 0.25 + g * 0.035);
    });
    tl.fromTo(one("[data-strike]"), { scaleX: 0 }, { scaleX: 1, duration: 0.2, ease: "hb.cam" }, T.shatter - 0.2);
    tl.to(wallText, { scale: 1.03, duration: 0.12, ease: "power4.out" }, T.shatter - 0.15);
    tl.to(all("[data-crack]"), { opacity: 0, duration: 0.12 }, T.shatter + 0.02);
    tl.fromTo(one("[data-video-el]"), { scale: 1.12 }, { scale: 1, duration: 1.2, ease: "power2.out" }, T.shatter);
  }
  tl.to(wallText, { opacity: 0, scale: 1.08, duration: 0.3, ease: "power2.inOut" }, T.shatter);
  tl.addLabel("shatter", T.shatter);
  shards.forEach((s, i) => {
    const d = SHARDS[i];
    const [r1, r2, r3, r4, r5, r6] = d.c;
    const dx = () => (d.cx - 50) * (0.9 + r1) * vw(1);
    const dy = () => (d.cy - 50) * (0.9 + r2) * vh(1) + 20 * vh(1) * r3;
    if (classic) {
      tl.to(s, { x: dx, y: dy, rotate: (r4 - 0.5) * 140, scale: 0.6 + r5 * 0.3, autoAlpha: 0, transformOrigin: d.origin, duration: 1.1, ease: "power3.in" }, T.shatter + r6 * 0.25);
      return;
    }
    // 글자 중심에서 먼 파편일수록 늦게 — 깨짐이 바깥으로 번진다. x·회전은 감속, y는 가속(무게)
    const at = T.shatter + (d.dist / 70) * 0.28;
    const toward = d.e.toward;
    // 세로형(휴대폰)에서는 3D 회전 없이 평면 회전만 — 원근 합성 비용을 줄인다
    const spin3d = stacked ? {} : { rotationX: d.e.rx, rotationY: d.e.ry };
    tl.to(s, { x: dx, rotate: (r4 - 0.5) * 160, ...spin3d, duration: 1.1, ease: "power2.out", transformOrigin: d.origin }, at);
    tl.to(s, { y: () => dy() + vh(22), duration: 1.1, ease: "power2.in" }, at);
    tl.to(s, { scale: toward ? d.e.ts : 0.6 + r5 * 0.3, duration: 1.1, ease: "power2.out" }, at);
    tl.to(s, { autoAlpha: 0, duration: toward ? 0.55 : 1.1, ease: "power2.in" }, at);
  });
  const ch2 = one('[data-chapter="1"]');
  tl.set(ch2, { opacity: 1 }, T.ch2Head);
  tl.fromTo(all("[data-num]", ch2), { yPercent: 112 }, { yPercent: 0, duration: 0.4, ease: "hb.reveal" }, T.ch2Head);
  tl.fromTo(all("[data-char]", ch2), { yPercent: 112 }, { yPercent: 0, duration: 0.55, ease: "hb.reveal", stagger: 0.035 }, T.ch2Head + 0.05);
  tl.fromTo(one("[data-desc]", ch2), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "hb.reveal" }, T.ch2Head + 0.3);

  /* ════════════ 3. 함께 봄을 맞이하다 (승인안) ════════════ */
  tl.addLabel("ch3", T.ch3);
  // 2장 제목(어두운 후광 포함)은 영상이 걷히는 선이 닿기 전에 빠진다 — 봄빛 위에 검은 얼룩이 남지 않게
  tl.to(ch2, { opacity: 0, y: -30, duration: 0.22, ease: "hb.exit" }, T.ch3);
  // 봄빛 바탕은 영상 뒤에서 먼저 다 깔리고, 영상은 투명해지는 대신 아래에서부터 걷힌다(새벽빛이 차오르는 방향) —
  // 반쯤 비친 회색 모자이크가 화면을 덮는 순간이 없다
  // (배경색 트윈 대신 봄빛 레이어를 겹쳐 띄운다 — 매 프레임 전체 다시 칠하기 없음)
  tl.fromTo(one("[data-bg-spring]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, T.ch3 - 0.15);
  const VIDEO_WIPE = 0.5;
  tl.fromTo(videoLayer, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", duration: VIDEO_WIPE, ease: "hb.cam" }, T.ch3);
  tl.set(videoLayer, { autoAlpha: 0 }, T.ch3 + VIDEO_WIPE);
  tl.to([rail, skip], { color: "#17140f", duration: 0.2 }, T.ch3 + 0.15);
  tl.fromTo(one("[data-dawn]"), { y: () => vh(18) }, { y: 0, duration: T.finale - o(6.2) }, o(6.2));
  all("[data-petal]").forEach((p, i) => {
    const c = PETALS[i];
    tl.fromTo(
      p,
      { autoAlpha: 0, y: () => vh(40) * c.travel, x: () => vw(c.x0), rotate: c.rot0 },
      { autoAlpha: c.opacity, y: () => -vh(60) * c.travel, x: () => vw(c.x0 + c.drift), rotate: c.rot0 + c.spin, duration: 2.6 },
      o(6.2) + c.at,
    );
  });
  const peopleBox = one("[data-people]");
  const persons = all("[data-person]");
  persons.forEach((p, i) => {
    tl.set(p, { autoAlpha: 1 }, T.people);
    tl.fromTo(p, { y: () => vh(PEOPLE_RISE[i % PEOPLE_RISE.length]) }, { y: 0, duration: 1.2, ease: "hb.reveal" }, T.people);
    tl.fromTo(one("[data-mask]", p), { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "hb.reveal" }, T.people + 0.1 + i * 0.06);
    tl.fromTo(one("[data-img]", p), { yPercent: -100, scale: 1.15 }, { yPercent: 0, scale: 1, duration: 1.1, ease: "hb.reveal" }, T.people + 0.1 + i * 0.06);
    tl.fromTo(all("[data-line]", p), { yPercent: 112 }, { yPercent: 0, duration: 0.45, ease: "hb.reveal" }, T.people + 0.8 + i * 0.06);
  });
  const ch3 = one('[data-chapter="2"]');
  tl.set(ch3, { opacity: 1 }, T.ch3Head);
  tl.fromTo(all("[data-num]", ch3), { yPercent: 112 }, { yPercent: 0, duration: 0.4, ease: "hb.reveal" }, T.ch3Head);
  tl.fromTo(all("[data-char]", ch3), { yPercent: 112 }, { yPercent: 0, duration: 0.55, ease: "hb.reveal", stagger: 0.035 }, T.ch3Head + 0.05);
  tl.fromTo(one("[data-desc]", ch3), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "hb.reveal" }, T.ch3Head + 0.3);

  /* ════════════ 마무리 — 사람이 모이면, 봄이 됩니다 ════════════ */
  tl.addLabel("finale", T.finale);
  tl.to(ch3, { opacity: 0, y: -30, duration: 0.5, ease: "hb.exit" }, T.finale);
  tl.to(skip, { opacity: 0, duration: 0.3 }, T.finale);
  const finalBox = one("[data-final]");
  const ctas = one("[data-final-ctas]");
  if (stacked) {
    // 세로형: 사람들 띠는 3장 설명 바로 아래에 있다가, 마무리 버튼 바로 아래로 내려온다.
    // 낮은 화면에서 남은 높이가 모자라면 그만큼만 줄인다 (위 끝 기준) — 버튼과 겹치지 않는다
    const fit = () => {
      const pr = rectOf(peopleBox),
        c = rectOf(ctas);
      const want = c.T + c.H + vh(4);
      const k = Math.max(0.6, Math.min(1, (vh(97) - want) / pr.H));
      return { y: want - pr.T, k };
    };
    tl.to(peopleBox, { y: () => fit().y, scale: () => fit().k, transformOrigin: "50% 0%", duration: 1, ease: "hb.cam" }, o(8.5));
  } else {
    // 데스크톱: 사람들이 줄어들며 마무리 버튼 바로 아래로 내려와 모인다 (세로형은 아래 띠에 그대로 남아 빈 곳을 채운다)
    const PEOPLE_K = 0.8;
    const peopleY = () => {
      const pr = rectOf(peopleBox),
        c = rectOf(ctas);
      const top0 = pr.T + (pr.H * (1 - PEOPLE_K)) / 2; // 가운데 기준으로 줄어든 뒤의 위 끝
      const want = c.T + c.H + vh(5);
      const maxTop = vh(97) - pr.H * PEOPLE_K;
      return Math.min(want, maxTop) - top0;
    };
    tl.to(peopleBox, { y: peopleY, scale: PEOPLE_K, duration: 1, ease: "hb.cam" }, o(8.5));
    const mid = (persons.length - 1) / 2;
    persons.forEach((p, i) => tl.to(p, { x: () => (i - mid) * -vw(0.5), duration: 1, ease: "hb.cam" }, o(8.5)));
  }
  tl.set(finalBox, { opacity: 1, pointerEvents: "auto" }, T.finalIn);
  tl.fromTo(all("[data-eb]", finalBox), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "hb.reveal", stagger: 0.12 }, T.finalIn);
  tl.fromTo(all("[data-line]", finalBox), { yPercent: 112 }, { yPercent: 0, duration: 0.6, ease: "hb.reveal", stagger: 0.1 }, T.finalIn + 0.15);
  tl.fromTo(one("[data-swash]", finalBox), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "hb.cam" }, T.finalIn + 0.55);
  tl.fromTo(all("[data-cta]", finalBox), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: "hb.reveal", stagger: 0.08 }, T.finalIn + 0.6);
  tl.to({}, { duration: 0.8 }, tl.duration());

  /* 진행 표시 — 전체 길이에 맞춰 채운다 */
  tl.fromTo(stacked ? railBar : railFill, stacked ? { scaleX: 0 } : { scaleY: 0 }, { ...(stacked ? { scaleX: 1 } : { scaleY: 1 }), duration: tl.duration() }, 0);
  Object.entries(JUMPS).forEach(([k, v]) => tl.addLabel(`jump-${k}`, v));

  /* ── 초기값: 숫자는 SSR 에 최종값, 연출 중에는 0 부터 ── */
  counters.forEach((c) => ((c.firstChild as Text).nodeValue = "0"));

  /* ── 영상·헤더·레일 상태 동기화 (타임라인이 그릴 때마다) ── */
  const video = one("[data-video-el]") as HTMLVideoElement;
  let videoStage = 0; // 0 아무것도 안 받음 · 1 메타데이터 · 2 전부
  let wantPlay = false;
  let storyState = "";
  let active = "";
  let pxPaused = false;
  const flag = (name: string, on: boolean) => {
    if (el.hasAttribute(name) !== on) el.toggleAttribute(name, on);
  };
  const setStory = (v: string) => {
    if (v === storyState) return;
    storyState = v;
    if (v) document.documentElement.dataset.story = v;
    else delete document.documentElement.dataset.story;
  };
  let st: ScrollTrigger | null = null;
  const sync = () => {
    const t = tl.time();
    // 영상은 1장 후반에 메타데이터만, 1장 끝에서 나머지를 받는다 (포스터도 그때 붙인다)
    if (videoStage === 0 && t >= T.s4 && t <= PLAY_TO) {
      videoStage = 1;
      video.poster = stacked ? VIDEO_POSTER_M : VIDEO_POSTER;
      video.preload = "metadata";
      video.load();
    }
    if (videoStage === 1 && t >= T.sheet && t <= PLAY_TO) {
      videoStage = 2;
      video.preload = "auto";
    }
    const play = t >= PLAY_FROM && t <= PLAY_TO;
    if (play !== wantPlay) {
      wantPlay = play;
      if (play) {
        // 벽이 깨지는 순간에는 항상 고리의 처음(모자이크가 가장 넓게 보이는 장면)이 드러난다
        if (t < T.shatter + 0.3) {
          try {
            video.currentTime = 0;
          } catch {}
        }
        video.play().catch(() => {});
      } else video.pause();
    }
    if (st) setStory(st.isActive ? (t >= DARK_FROM && t < DARK_TO ? "dark" : "on") : "");
    const a = t < T.handoff + 0.4 ? "ch1" : t < T.ch3 ? "ch2" : "ch3";
    if (a !== active) {
      active = a;
      railItems.forEach((b) => {
        const on = b.dataset.railItem === a;
        b.toggleAttribute("data-active", on);
        b.setAttribute("aria-current", on ? "step" : "false");
      });
    }
    flag("data-scrolled", t > 0.6);
    // 고정이 풀려 다음 구역으로 넘어가면 꽃잎 펄럭임도 멈춘다 (onToggle 이 sync 를 부른다)
    flag("data-spring", !!st?.isActive && t >= SPRING_FROM);
    setPx(t >= T.handoff);
  };

  /* ── 포인터 시차 (데스크톱·정밀 포인터만, 1장이 끝나면 멈춤) ── */
  const pxLayers: [HTMLElement, number][] = [
    [one('[data-px="hero"]'), 10],
    [one('[data-px="vf"]'), 10],
    [one('[data-px="sat"]'), 18],
    [one('[data-px="text"]'), -4],
  ];
  const quick = fine && !stacked ? pxLayers.map(([n, amt]) => ({ x: gsap.quickTo(n, "x", { duration: 0.9, ease: "power3" }), y: gsap.quickTo(n, "y", { duration: 0.9, ease: "power3" }), amt })) : [];
  function setPx(p: boolean) {
    if (p === pxPaused || !quick.length) return;
    pxPaused = p;
    if (p) quick.forEach((qq) => (qq.x(0), qq.y(0)));
  }
  const onMove = (e: PointerEvent) => {
    if (pxPaused) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    quick.forEach((qq) => {
      qq.x(nx * qq.amt);
      qq.y(ny * qq.amt);
    });
  };
  if (quick.length) window.addEventListener("pointermove", onMove, { passive: true });

  tl.eventCallback("onUpdate", sync);

  const PER_UNIT = stacked ? 30 : 40; // vh / unit
  st = ScrollTrigger.create({
    trigger: el,
    start: "top top",
    end: () => `+=${Math.round(tl.duration() * PER_UNIT * safe.clientHeight) / 100}`,
    pin: true,
    scrub: stacked ? 0.35 : 0.6,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    animation: tl,
    onToggle: () => sync(),
  });

  if (process.env.NODE_ENV !== "production") (window as unknown as { __story?: unknown }).__story = { tl, st, T };

  return {
    jump(id: string, immediate = false) {
      if (!st) return;
      // 키보드 포커스로 마무리 버튼에 왔을 때: 이미 보이고 있으면 움직이지 않는다
      if (id === "final" && tl.time() >= T.finalIn + 0.6) return;
      scrollTo(st.labelToScroll(`jump-${id}`), immediate);
    },
    cleanup() {
      if (quick.length) window.removeEventListener("pointermove", onMove);
      gsap.set(
        pxLayers.map(([n]) => n),
        { clearProps: "transform" },
      );
      counters.forEach((c) => ((c.firstChild as Text).nodeValue = Number(c.dataset.count).toLocaleString("ko-KR")));
      if (!video.paused) video.pause();
      // 다음 빌드(세로형 ↔ 가로형)가 자기 화면에 맞는 소스·포스터로 다시 받도록 처음 상태로 돌린다
      video.removeAttribute("poster");
      video.preload = "none";
      setStory("");
      flag("data-scrolled", false);
      flag("data-spring", false);
      railItems.forEach((b) => {
        b.removeAttribute("data-active");
        b.removeAttribute("aria-current");
      });
    },
  };
}
