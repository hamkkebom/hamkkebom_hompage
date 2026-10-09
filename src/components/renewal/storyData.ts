/* 홈 스크롤 스토리 데이터.
   모든 값은 모듈 상수다 — 렌더 중에 Math.random / window / Date 를 쓰지 않아 SSR 과 CSR 이 같다.
   사진을 바꿀 때는 이 파일의 배열만 고치면 된다 (예: 고객이 별님·관람객·교육 현장 사진을 주면 HEROES 교체). */

export const BLANK_GIF = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

/** 휴대폰·움직임 줄이기에서는 내려받지 않는 데스크톱 전용 이미지의 <source media> */
export const DESKTOP_ONLY_MEDIA = "(max-width: 767px), (max-aspect-ratio: 4/5), (prefers-reduced-motion: reduce)";

export function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/* ───────────────────────── 1장 「함께 보다」 ───────────────────────── */

export type Material = "print" | "screen";
export type RevealDir = "left" | "right" | "bottom" | "top" | "gate";

export type Hero = {
  id: string;
  src: string;
  src800?: string;
  /** src800 파생본의 실제 폭 (기본 800) */
  w800?: number;
  w: number;
  h: number;
  /** 화면에 놓일 종횡비 */
  a: number;
  /** 화면 최대 폭(px) — 원본 폭 / 1.5 이하로 두어 DPR 2 에서도 흐려지지 않게 */
  cap: number;
  material: Material;
  reveal: RevealDir;
  z: number;
  alt: string;
  caption: string;
  capSide: "left" | "right";
  /** 세로형(휴대폰)에서는 라벨을 숨긴다 — 사진 바로 아래 슬레이트와 겹치는 장면 */
  capHideM?: boolean;
  objectPosition?: string;
};

/* 1장의 장면 순서 — 「사람 + 프로젝트」 짝으로 간다. 모든 장면의 주인공은 사람이다.
   1 같은 화면을 함께 보는 사람들 → 2 조선 기록 사진 속 사람들 → (매치컷) 3 그 사진이 걸린 전시 액자
   → 3' 헐버트 (액자는 옆으로 물러나고 사람이 주인공이 된다) → 4 꿈꾸는 아리랑 AI 영상 공모전(모여 환호하는 사람들)
   → 5 고객과 함께 만든 영상 → 모여드는 사람들.
   고객이 별님·관람객·교육 현장 사진을 주면 이 배열(과 SATELLITES)의 src 만 바꾸면 된다. */
export const HEROES: Hero[] = [
  {
    // 문이 열리면 가장 먼저 만나는 얼굴: 모니터 하나를 함께 보는 사람들.
    // 실제 함께봄 팀 사진으로 확인되지 않았으므로 팀 이름·실적을 붙이지 않는다 (고객 확인 뒤 교체)
    id: "h1",
    src: "/renewal/team-video.webp",
    src800: "/renewal/ch1/800/team-video.webp",
    w: 1600,
    h: 893,
    a: 1.792,
    cap: 1000,
    material: "print",
    reveal: "gate",
    z: 2,
    alt: "모니터 하나를 함께 보며 웃는 사람들",
    caption: "같은 화면 앞에 모인 사람들",
    capSide: "right", // 왼쪽 아래는 위성(고객 영상)이 놓인다
  },
  {
    id: "h2",
    src: "/renewal/ch1/archive/joseon-19-janggi.webp",
    src800: "/renewal/ch1/800/joseon-19-janggi.webp",
    w: 1200,
    h: 806,
    a: 1.489,
    cap: 800,
    material: "print",
    reveal: "bottom",
    z: 4, // 매치컷 동안 창살 액자(h3) 위에 있어야 한다
    alt: "장기판을 둘러싼 사람들 — 세 사람은 판을 내려다보고, 한 아이는 렌즈를 봅니다",
    caption: "조선 기록 사진 · 장기 한 판",
    capSide: "left",
  },
  {
    // 매치컷의 착지점. 원본이 600px 이라 오래 크게 두지 않는다 — 착지 직후 옆으로 물러나 작은 액자가 된다
    id: "h3",
    src: "/renewal/ch1/archive/hulbert-frame-02-window.webp",
    w: 600,
    h: 518,
    a: 1.158,
    cap: 400, // 원본 600px — 원본/1.5 를 넘기지 않는다
    material: "print",
    reveal: "top",
    z: 3,
    alt: "한옥 창살 앞에 걸린 전시 액자 — 그 안에 장기 사진이 있다",
    caption: "전시 액자 · 한옥 창살 앞",
    capSide: "right",
  },
  {
    // 장면 3의 주인공: 사진 속 사람들을 기록하고 아리랑을 처음 악보로 옮긴 사람
    id: "h3p",
    src: "/renewal/ch1/archive/hulbert-portrait.webp",
    src800: "/renewal/ch1/600/hulbert-portrait.webp",
    w800: 600,
    w: 750,
    h: 997,
    a: 0.752,
    cap: 500,
    material: "print",
    reveal: "bottom",
    z: 2, // 물러난 액자(h3)가 초상 모서리 위에 겹친다
    alt: "호머 B. 헐버트의 초상",
    caption: "호머 B. 헐버트 · 한글을 사랑한 미국인",
    capSide: "right",
    capHideM: true, // 휴대폰에서는 오도미터 라벨과 겹친다 — 슬레이트가 헐버트 사진전을 말해 준다
    objectPosition: "50% 0%",
  },
  {
    id: "h4",
    src: "/renewal/ch1/platforms/arirang-entry-maskdance-crowd.webp",
    src800: "/renewal/ch1/800/arirang-entry-maskdance-crowd.webp",
    w: 1200,
    h: 666,
    a: 1.802,
    cap: 800,
    material: "screen",
    reveal: "bottom",
    z: 5,
    alt: "탈춤 주위에 모여 환호하는 사람들 (AI 영상 속 장면)",
    caption: "꿈꾸는 아리랑 AI 영상 공모전 출품작 · 영상 속 장면",
    capSide: "right",
  },
  {
    // 고객과 함께 만든 영상 — 실제 고객사 영상의 표지
    id: "h5",
    src: "/renewal/ch1/works/works-ace-insa.webp",
    src800: "/renewal/ch1/800/works-ace-insa.webp",
    w: 1200,
    h: 676,
    a: 1.775,
    cap: 800,
    material: "screen",
    reveal: "right",
    z: 6,
    alt: "안전모를 쓰고 마주 보며 웃는 두 사람 — 에이스인력 영상의 표지 장면",
    caption: "에이스인력 · 영상 속 장면",
    capSide: "right",
  },
];

export type Satellite = {
  id: string;
  hero: string;
  src: string;
  /** 600w 파생본 (scripts/make-ch1-thumbs.mjs) */
  src600?: string;
  w: number;
  h: number;
  a: number;
  /** 히어로 사각형 기준 중심 위치(비율)·폭(비율)·기울기 */
  sx: number;
  sy: number;
  sw: number;
  r: number;
  /** 세로형 화면(휴대폰)용 위치. 없으면 휴대폰에서 숨기고 내려받지도 않는다 */
  m?: { sx: number; sy: number; sw: number };
  /** 휴대폰에서도 한 줄 라벨(제목만)을 보인다 */
  capM?: boolean;
  /** 히어로 위쪽에 걸친 위성: 라벨을 사진 위에 단다 (아래에 달면 히어로 사진을 덮는다) */
  capTop?: boolean;
  material: Material;
  /** 어두운 화면을 밝은 지면에 앉히는 종이 매트 */
  mat?: boolean;
  reveal: RevealDir;
  alt: string;
  caption: string;
  sub?: string;
  objectPosition?: string;
};

export const SATELLITES: Satellite[] = [
  {
    // 장면 1: 팀이 함께 보는 화면 — 그들이 만든 고객 영상
    id: "s1",
    hero: "h1",
    src: "/renewal/ch1/works/works-juan-kimchi.webp",
    src600: "/renewal/ch1/600/works-juan-kimchi.webp",
    w: 1200,
    h: 676,
    a: 1.775,
    sx: 0.12,
    sy: 1.0,
    sw: 0.34,
    r: -1,
    // 휴대폰: 사진 위 오른쪽에 걸쳐 얼굴을 가리지 않는다 (낮은 휴대폰에서는 위성을 모두 숨긴다)
    m: { sx: 0.76, sy: -0.2, sw: 0.4 },
    material: "screen",
    reveal: "bottom",
    alt: "주안이네 김치 영상의 한 장면",
    caption: "주안이네 김치 · 영상 속 장면",
  },
  {
    // 장면 2: 기록 사진 속 아이들
    id: "s2",
    hero: "h2",
    src: "/renewal/ch1/archive/joseon-40-children.webp",
    src600: "/renewal/ch1/600/joseon-40-children.webp",
    w: 1152,
    h: 928,
    a: 1.241,
    sx: 0.92,
    sy: 0.08,
    sw: 0.3,
    r: 1.5,
    m: { sx: 0.8, sy: 0.04, sw: 0.34 },
    material: "print",
    reveal: "top",
    alt: "한곳에 모여 서서 카메라를 바라보는 조선의 아이들",
    caption: "",
  },
  {
    // 장면 3': 헐버트 초상 왼쪽 — 모여 선 사람들을 담은 또 하나의 전시 액자, 아래에 아리랑 전시 포스터
    id: "s3a",
    hero: "h3p",
    src: "/renewal/ch1/archive/hulbert-frame-09-crowd.webp",
    w: 524,
    h: 600,
    a: 0.873,
    sx: -0.3,
    sy: 0.2,
    sw: 0.46,
    r: 1.5,
    material: "print",
    reveal: "top",
    alt: "모여 선 사람들의 사진을 담은 전시 액자",
    caption: "",
  },
  {
    id: "s3b",
    hero: "h3p",
    src: "/renewal/ch1/archive/arirang-exhibition-poster.webp",
    src600: "/renewal/ch1/600/arirang-exhibition-poster.webp",
    w: 806,
    h: 1200,
    // 아래 6.7%(장소 표기·QR)만 잘라 낸다 — 태그라인 「한 미국인의 펜이 지켰습니다」는 남긴다
    a: 806 / 1120,
    sx: -0.38,
    sy: 0.76,
    sw: 0.48,
    r: -1,
    material: "print",
    reveal: "bottom",
    alt: "아리랑 전시 포스터 — 만년필 끝에서 흘러나온 아리랑 악보",
    caption: "「아리랑, 130년 전 한국의 보물을 찾다」",
    sub: "2026.03.19 – 04.19 · 언론보도 13건",
    objectPosition: "50% 0%",
  },
  {
    id: "s4a",
    hero: "h4",
    src: "/renewal/ch1/platforms/arirang-award-kkumgyeol.webp",
    src600: "/renewal/ch1/600/arirang-award-kkumgyeol.webp",
    w: 1200,
    h: 670,
    a: 1.791,
    sx: 0.74,
    sy: -0.1,
    sw: 0.4,
    r: -1.5,
    m: { sx: 0.58, sy: -0.14, sw: 0.46 },
    capTop: true,
    material: "screen",
    reveal: "right",
    alt: "보름달 아래 손을 잡은 두 인물 (AI 영상 속 장면)",
    caption: "꿈꾸는 아리랑 AI 영상 공모전",
    sub: "출품작 · 영상 속 장면",
  },
  {
    id: "s4b",
    hero: "h4",
    src: "/renewal/ch1/platforms/arirang-entry-azalea-children.webp",
    src600: "/renewal/ch1/600/arirang-entry-azalea-children.webp",
    w: 1200,
    h: 676,
    a: 1.775,
    sx: 0.3,
    sy: 1.06,
    sw: 0.34,
    r: 1,
    material: "screen",
    reveal: "bottom",
    alt: "진달래 언덕을 함께 걷는 두 아이 — 꿈꾸는 아리랑 AI 영상 공모전 출품작 (AI 영상 속 장면)",
    caption: "",
  },
  {
    // 장면 5: 고객과 함께 만든 영상 — 슬레이트에 이름이 나오는 고객을 사진으로도 보여 준다
    id: "s5a",
    hero: "h5",
    src: "/renewal/ch1/works/works-daon-patent.webp",
    src600: "/renewal/ch1/600/works-daon-patent.webp",
    w: 1200,
    h: 676,
    a: 1.775,
    sx: 0.2,
    sy: 1.04,
    sw: 0.34,
    r: 0,
    // 휴대폰에서는 숨긴다 — 사진 아래로 내려오면 슬레이트 글을, 안으로 들이면 표지 글씨를 덮는다
    material: "screen",
    reveal: "bottom",
    alt: "다온 국제특허 영상의 표지 장면",
    caption: "다온 국제특허 · 영상 속 장면",
  },
  {
    id: "s5b",
    hero: "h5",
    src: "/renewal/ch1/works/still-kkumkkum-family.webp",
    src600: "/renewal/ch1/600/still-kkumkkum-family.webp",
    w: 1200,
    h: 676,
    a: 1.775,
    sx: 0.72,
    sy: -0.15, // 히어로 위 끝에만 살짝 걸친다 (오른쪽 사람의 안전모를 덮지 않게)
    sw: 0.38,
    r: -1,
    m: { sx: 0.76, sy: -0.2, sw: 0.4 },
    capTop: true,
    material: "screen",
    reveal: "bottom",
    alt: "한 상에 둘러앉아 웃으며 식사하는 네 식구 (AI 영상 속 장면)",
    caption: "꿈꿈송 · 영상 속 장면",
  },
];

export const heroById = (id: string) => HEROES.find((h) => h.id === id)!;

/* 장면 설명(슬레이트). 한 화면에 본문은 하나만. 숫자·이름은 검증된 사실만 쓴다. */
export type Slate = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  body: string;
  bodyM?: string;
  counters?: boolean;
  odometer?: boolean;
};

export const SLATES: Slate[] = [
  {
    id: "1",
    index: "01 — 05",
    kicker: "함께봄 · 영상 제작",
    title: "같은 화면을 함께 보는 사람들",
    body: "함께봄이 만든 영상은 400편이 넘습니다. 영상 한 편은 같은 화면을 함께 보는 데서 시작합니다.",
    bodyM: "함께봄이 만든 영상, 400편 이상.",
  },
  {
    id: "2",
    index: "02 — 05",
    kicker: "기록 · 조선 기록 사진",
    title: "장기판 하나를 둘러싼 사람들",
    body: "세 사람은 판을 내려다보고, 한 아이는 렌즈를 봅니다. 오래전에도 사람들은 한 장면 앞에 모였습니다.",
    bodyM: "오래전에도 한 장면 앞에 사람이 모였습니다.",
  },
  {
    id: "3",
    index: "03 — 05",
    kicker: "전시 · 서촌 한옥(통의동)",
    title: "오래된 사진, 다시 액자 속으로",
    // 날짜 범위는 줄바꿈 없는 공백으로 묶는다 (「– 11.30」만 다음 줄로 떨어지지 않게)
    body: "헐버트 사진전 「고종의 밀사, 조선을 담다」 2026.08.24 – 11.30",
    odometer: true,
  },
  {
    id: "4",
    index: "04 — 05",
    kicker: "공모전 · 꿈꾸는 아리랑",
    title: "462편의 아리랑을 함께 보다",
    body: "",
    counters: true,
  },
  {
    id: "5",
    index: "05 — 05",
    kicker: "함께 만든 영상",
    title: "고객과 함께 만든 영상",
    body: "에이스인력 · 다온 국제특허 · 주안이네 김치 · 아셀케어의 영상부터 꿈꿈송, 구인공고송, 추억송까지.",
    bodyM: "고객사의 영상부터 꿈꿈송, 추억송까지.",
  },
];

/* 1장 끝: 모여드는 인화 사진들 (12장, 밝은 종이 톤 — 2장의 어두운 얼굴 모자이크와 겹치지 않게).
   1장에서 본 사람들(기록 사진·헐버트·공모전·고객 영상)과 함께봄 사람들이 한 장에 모인다.
   3장의 팀 사진 세 장은 3장에서 처음 크게 보이도록 여기서는 다른 순간(-b)만 쓴다.
   x,y = 묶음 안 중심 위치(%), m = 휴대폰 위치(없으면 숨김), z = 겹칠 때 위로 올릴 카드. 회전·흩어짐은 시드 난수. */
const GATHER_BASE: { src: string; x: number; y: number; m?: [number, number]; z?: number }[] = [
  { src: "team-video", x: 13, y: 20, m: [17, 18] },
  { src: "joseon-19-janggi", x: 38, y: 17, m: [50, 17] },
  { src: "arirang-entry-maskdance-crowd", x: 63, y: 21 },
  { src: "team-planning-b", x: 87, y: 18, m: [83, 19] },
  { src: "works-juan-kimchi", x: 11, y: 51, m: [17, 50] },
  { src: "hulbert-portrait", x: 36, y: 49, m: [50, 51] },
  { src: "hulbert-frame-09-crowd", x: 64, y: 50, z: 2 },
  { src: "team-marketing-b", x: 88, y: 49, m: [83, 50] },
  { src: "joseon-40-children", x: 14, y: 81, m: [17, 82] },
  { src: "works-daon-patent", x: 39, y: 81, m: [50, 83] },
  { src: "still-kkumkkum-family", x: 63, y: 80 },
  { src: "arirang-entry-azalea-children", x: 84, y: 78, m: [83, 81] },
];

export const GATHER = (() => {
  const rand = seeded(53);
  const cx = 50,
    cy = 50;
  const items = GATHER_BASE.map((g, i) => {
    const x = g.x + (rand() - 0.5) * 5;
    const y = g.y + (rand() - 0.5) * 7;
    const r = (rand() - 0.5) * 10; // 최종 기울기 ±5°
    const r0 = (rand() - 0.5) * 28; // 들어올 때 기울기
    const dist = Math.hypot((x - cx) * 1.75, y - cy);
    return { ...g, i, x, y, r, r0, dist, frame: String(i + 1).padStart(2, "0") + "A" };
  });
  // 휴대폰에서는 보이는 카드만 차례로 번호를 매긴다 (숨은 카드 때문에 번호가 건너뛰지 않게)
  let mi = 0;
  const mframe = items.map((it) => (it.m ? String(++mi).padStart(2, "0") + "A" : ""));
  // 안쪽 고리부터 차례로 도착한다
  const order = [...items].sort((a, b) => a.dist - b.dist).map((it) => it.i);
  return items.map((it) => ({ ...it, mframe: mframe[it.i], rank: order.indexOf(it.i) }));
})();

/* ───────────────────────── 2장 「함께 깨다」 ───────────────────────── */

type Pt = [number, number];

function buildShards(cols: number, rows: number) {
  // 승인된 벽과 같은 모양이 나오도록 시드·난수 순서를 바꾸지 않는다
  const rand = seeded(20260128);
  const pts: Pt[][] = [];
  for (let r = 0; r <= rows; r++) {
    const row: Pt[] = [];
    for (let c = 0; c <= cols; c++) {
      const edgeX = c === 0 || c === cols;
      const edgeY = r === 0 || r === rows;
      const jx = edgeX ? 0 : (rand() - 0.5) * (70 / cols);
      const jy = edgeY ? 0 : (rand() - 0.5) * (70 / rows);
      row.push([(c / cols) * 100 + jx, (r / rows) * 100 + jy]);
    }
    pts.push(row);
  }
  const tris: Pt[][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = pts[r][c],
        b = pts[r][c + 1],
        d = pts[r + 1][c],
        e = pts[r + 1][c + 1];
      const t = rand() > 0.5 ? [[a, b, e], [a, e, d]] : [[a, b, d], [b, e, d]];
      tris.push(...(t as Pt[][]));
    }
  }
  return tris;
}

const TRIS = buildShards(6, 4);
const f2 = (n: number) => Math.round(n * 100) / 100;

export const SHARDS = (() => {
  // 승인된 「클래식」 부서짐과 같은 난수열 (시드 7, 파편당 6개)
  const classic = seeded(7);
  const extra = seeded(11);
  const list = TRIS.map((t, i) => {
    const cx = (t[0][0] + t[1][0] + t[2][0]) / 3;
    const cy = (t[0][1] + t[1][1] + t[2][1]) / 3;
    // 이음매가 보이지 않게 중심에서 2% 키운다
    const grown = t.map(([x, y]) => [cx + (x - cx) * 1.02, cy + (y - cy) * 1.02] as Pt);
    const xs = grown.map((p) => p[0]);
    const ys = grown.map((p) => p[1]);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs),
      minY = Math.min(...ys),
      maxY = Math.max(...ys);
    const w = maxX - minX,
      h = maxY - minY;
    const clip = `polygon(${grown.map(([x, y]) => `${f2(((x - minX) / w) * 100)}% ${f2(((y - minY) / h) * 100)}%`).join(",")})`;
    const c = Array.from({ length: 6 }, () => classic());
    const e = { rx: (extra() - 0.5) * 140, ry: (extra() - 0.5) * 140, toward: extra() < 0.25, ts: 1.3 + extra() * 0.4 };
    return {
      i,
      box: { left: f2(minX), top: f2(minY), width: f2(w), height: f2(h) },
      clip,
      cx,
      cy,
      origin: `${f2(((cx - minX) / w) * 100)}% ${f2(((cy - minY) / h) * 100)}%`,
      c,
      e,
    };
  });
  // 셔터가 닫히는 지점(1장 무대 중심)에서 먼 순서 — 데스크톱/세로형 각각
  const rankFrom = (ox: number, oy: number) => {
    const order = [...list].sort((a, b) => Math.hypot((a.cx - ox) * 1.6, a.cy - oy) - Math.hypot((b.cx - ox) * 1.6, b.cy - oy)).map((s) => s.i);
    return list.map((s) => order.indexOf(s.i));
  };
  const rankD = rankFrom(62, 56);
  const rankM = rankFrom(50, 44);
  return list.map((s) => ({ ...s, rankD: rankD[s.i], rankM: rankM[s.i], dist: Math.hypot((s.cx - 50) * 1.6, s.cy - 50) }));
})();

/** 파편 경계에서 뽑은 금(크랙) — 중심에서 가까운 순으로 6묶음 */
export const CRACKS = (() => {
  const seen = new Set<string>();
  const edges: { d: string; dist: number }[] = [];
  const onBorder = (p: Pt) => p[0] <= 0.01 || p[0] >= 99.99 || p[1] <= 0.01 || p[1] >= 99.99;
  for (const t of TRIS) {
    for (let k = 0; k < 3; k++) {
      const p = t[k],
        q = t[(k + 1) % 3];
      if (onBorder(p) && onBorder(q) && (p[0] === q[0] || p[1] === q[1])) continue;
      const key = [p, q]
        .map((v) => `${f2(v[0])},${f2(v[1])}`)
        .sort()
        .join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      const mx = (p[0] + q[0]) / 2,
        my = (p[1] + q[1]) / 2;
      edges.push({ d: `M${f2(p[0])} ${f2(p[1])}L${f2(q[0])} ${f2(q[1])}`, dist: Math.hypot((mx - 50) * 1.6, my - 50) });
    }
  }
  edges.sort((a, b) => a.dist - b.dist);
  const groups = 6;
  const per = Math.ceil(edges.length / groups);
  return Array.from({ length: groups }, (_, g) =>
    edges
      .slice(g * per, (g + 1) * per)
      .map((e) => e.d)
      .join(""),
  );
})();

/* ───────────────────────── 3장 「함께 봄을 맞이하다」 ───────────────────────── */

/* team-video 는 1장 첫 장면(문이 열리면 보이는 사람들)이다 — 같은 큰 사진이 두 번 나오지 않게 여기서는 뺀다.
   실제 함께봄 팀 사진으로 확인되지 않았으므로 팀 이름 대신 하는 일(서비스)만 붙인다.
   고객이 실제 팀·관람객 사진을 주면 여기서 교체한다.
   label 은 그림 설명(figcaption)으로만 쓴다 — 이미지 alt 와 겹쳐 두 번 읽히지 않게 alt 는 비운다.
   pos = 좁게 잘릴 때(작은 휴대폰) 사람들이 남도록 맞출 초점 */
export const PEOPLE = [
  { src: "/renewal/team-marketing.webp", src800: "/renewal/ch1/800/team-marketing.webp", label: "AI 마케팅", pos: "38% 50%" },
  { src: "/renewal/team-education.webp", src800: "/renewal/ch1/800/team-education.webp", label: "AI 교육", pos: "52% 50%" },
  { src: "/renewal/team-planning.webp", src800: "/renewal/ch1/800/team-planning.webp", label: "AI 기획·개발", pos: "45% 50%" },
];

/** 아래에서 솟는 거리(vh) — 서로 다른 속도로 올라와 함께 도착한다 */
export const PEOPLE_RISE = [60, 72, 66, 78];

export const PETALS = (() => {
  const rand = seeded(31);
  const tiers = [
    { size: 22, travel: 1.3, opacity: 0.95 },
    { size: 16, travel: 1.0, opacity: 0.85 },
    { size: 10, travel: 0.7, opacity: 0.6 },
  ];
  return Array.from({ length: 22 }, (_, i) => {
    const tier = tiers[i % 3];
    return {
      i,
      tier: i % 3,
      size: tier.size,
      travel: tier.travel,
      opacity: tier.opacity,
      x0: (rand() - 0.5) * 92,
      drift: (rand() - 0.5) * 22,
      rot0: rand() * 180,
      spin: 160 + rand() * 200,
      at: rand() * 1.3,
      flutter: f2(2.4 + rand() * 1.8),
      delay: f2(-rand() * 3),
      hue: i % 4,
    };
  });
})();
