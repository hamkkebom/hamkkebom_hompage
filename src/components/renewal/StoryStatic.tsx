import styles from "./story.module.css";
import { HEROES, PEOPLE, SATELLITES, SLATES } from "./storyData";

/* 움직임 줄이기(prefers-reduced-motion) 와 스크립트 없는 방문자를 위한 정적 문서.
   기본은 display:none 이고 CSS(@media / <noscript>) 만으로 켜진다 — 하이드레이션 분기 없음.
   사진·글은 움직이는 이야기와 같은 데이터(HEROES · SATELLITES · SLATES)에서 가져와 둘이 어긋나지 않는다. */

const hero = (id: string) => HEROES.find((h) => h.id === id)!;
const satOf = (id: string) => SATELLITES.find((s) => s.id === id)!;
const slateOf = (id: string) => SLATES.find((s) => s.id === id)!;
/** 정적 문서는 800w 파생본이 있으면 그것을 쓴다 (원본 1200–1600px 을 받지 않는다) */
const smallSrc = (h: { src: string; src800?: string }) => h.src800 ?? h.src;

type Fig = { src: string; w: number; h: number; alt: string; cap: string };

const fig = (id: string, cap: string): Fig => {
  const h = hero(id);
  return { src: smallSrc(h), w: h.src800 ? 800 : h.w, h: h.src800 ? Math.round((800 / h.w) * h.h) : h.h, alt: h.alt, cap };
};

const FIGS: Fig[] = [
  fig("h1", `${slateOf("1").title} · 함께봄 누적 제작 영상 400편 이상`),
  fig("h2", `${slateOf("2").title} · ${hero("h2").caption}`),
  fig("h3", `${slateOf("3").body} · 서촌 한옥(통의동)`),
  fig("h4", "꿈꾸는 아리랑 AI 영상 공모전 · 출품 462편 · AI꿈 참여자 2,384명"),
  fig("h5", `${slateOf("5").title} · ${slateOf("5").body}`),
  {
    src: "/renewal/ch1/800/still-kkumkkum-family.webp",
    w: 800,
    h: 451,
    alt: satOf("s5b").alt,
    cap: satOf("s5b").caption,
  },
];

/* 헐버트와 아리랑 전시 — 세로 사진 두 장을 한 줄에 */
const PAIR: Fig[] = [
  {
    src: "/renewal/ch1/600/hulbert-portrait.webp",
    w: 600,
    h: 798,
    alt: hero("h3p").alt,
    cap: "호머 B. 헐버트 · 한글을 사랑한 미국인 · 1896년 아리랑을 처음 서양 악보로 옮기다",
  },
  {
    src: "/renewal/ch1/600/arirang-exhibition-poster.webp",
    w: 600,
    h: 893,
    alt: satOf("s3b").alt,
    cap: `${satOf("s3b").caption} ${satOf("s3b").sub}`,
  },
];

export default function StoryStatic() {
  return (
    <div className={styles.static}>
      <section className={styles.stSection} aria-labelledby="st-ch1">
        <div className={styles.stInner}>
          <span className={styles.num}>01</span>
          <h2 id="st-ch1" className={styles.stTitle}>
            함께 보다
          </h2>
          <p className={styles.stLead}>같은 장면 앞에 사람이 모입니다. 오래된 사진 한 장부터 오늘의 영상까지, 함께봄은 사람을 봅니다.</p>
          <div className={styles.stGrid}>
            {FIGS.map((f) => (
              <figure key={f.src} className={styles.stFig}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async" />
                <figcaption>{f.cap}</figcaption>
              </figure>
            ))}
          </div>
          <div className={styles.stPair}>
            {PAIR.map((f) => (
              <figure key={f.src} className={`${styles.stFig} ${styles.stFigTall}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async" />
                <figcaption>{f.cap}</figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.stStatement}>함께 보는 순간, 사람이 모입니다.</p>
        </div>
      </section>

      <section className={cxDark()} aria-labelledby="st-ch2">
        <div className={styles.stInner}>
          <span className={styles.num}>02</span>
          <h2 id="st-ch2" className={styles.stTitle}>
            함께 깨다
          </h2>
          <p className={styles.stLead}>당연하던 상식을 함께 깨부숩니다. AI로 더 빠르고, 더 가볍게 만듭니다.</p>
          <p className={styles.stWall}>
            비싸고, 느리고, 어려운
            <br />
            <span className={styles.stStrike}>늘 하던 방식</span>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.stMosaic}
            src="/renewal/people-mosaic.webp"
            alt="AI로 생성한 영상 작업 장면 이미지 모음"
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className={`${styles.stSection} ${styles.stSpring}`} aria-labelledby="st-ch3">
        <span className={styles.stPetals} aria-hidden="true" />
        <div className={styles.stInner}>
          <span className={styles.num}>03</span>
          <h2 id="st-ch3" className={styles.stTitle}>
            함께 봄을 맞이하다
          </h2>
          <p className={styles.stLead}>함께 배우고 자라 각자의 봄을 피워냅니다.</p>
          <div className={styles.stTeam}>
            {PEOPLE.map((p) => (
              <figure key={p.src} className={styles.stFig}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src800} alt="" width={800} height={446} loading="lazy" decoding="async" />
                <figcaption>{p.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.stSection} ${styles.stFinal}`} aria-label="함께봄">
        <p className={styles.finalEyebrow}>함께 보고, 함께 깨고, 함께 봄을 맞이하는 곳</p>
        <p className={styles.finalTitle}>
          사람이 모이면,
          <br />
          봄이 됩니다.
        </p>
        <div className={styles.finalCtas}>
          <a href="/join#apply" className={styles.ctaPrimary}>
            <span>매칭설명회 신청</span>
          </a>
          <a href="/contact" className={styles.ctaPrimary}>
            <span>제작 문의</span>
          </a>
        </div>
      </section>
    </div>
  );
}

function cxDark() {
  return `${styles.stSection} ${styles.stDark}`;
}
