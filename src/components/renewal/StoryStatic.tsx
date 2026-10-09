import styles from "./story.module.css";
import { BRIEFING_DATES, HEROES, PEOPLE, PEOPLE_NOTE, SATELLITES, SLATES, WORK_STILLS } from "./storyData";

/* 움직임 줄이기(prefers-reduced-motion) 와 스크립트 없는 방문자를 위한 정적 문서 — 「우리의 프로젝트」.
   기본은 display:none 이고 CSS(@media / <noscript>) 만으로 켜진다 — 하이드레이션 분기 없음.
   사진·글은 움직이는 이야기와 같은 데이터(HEROES · SATELLITES · SLATES)에서 가져와 둘이 어긋나지 않는다. */

const hero = (id: string) => HEROES.find((h) => h.id === id)!;
const satOf = (id: string) => SATELLITES.find((s) => s.id === id)!;
const slateOf = (id: string) => SLATES.find((s) => s.id === id)!;

type Fig = { src: string; w: number; h: number; alt: string; cap: string; tall?: boolean };

/** 정적 문서는 작은 파생본이 있으면 그것을 쓴다 (원본 1200–1600px 을 받지 않는다) */
const fig = (id: string, cap: string, tall = false): Fig => {
  const h = hero(id);
  const w = h.src800 ? (h.w800 ?? 800) : h.w;
  return { src: h.src800 ?? h.src, w, h: Math.round((w / h.w) * h.h), alt: h.alt, cap, tall };
};

const HULBERT: Fig[] = [
  fig("h1", `${slateOf("1").title} · 조선 기록 사진`),
  fig("h2", `${slateOf("2").title} · 조선 기록 사진`),
];
const HULBERT_TALL: Fig[] = [
  fig("h3p", "호머 B. 헐버트 · 한글을 사랑한 미국인", true),
  { src: hero("h3").src, w: 600, h: 518, alt: hero("h3").alt, cap: hero("h3").caption },
];

const ARIRANG: Fig[] = [
  fig("h4", "「아리랑, 130년 전 한국의 보물을 찾다」 2026.03.19 – 04.19 · 언론보도 13건", true),
  fig("h5", "꿈꾸는 아리랑 AI 영상 공모전 · 출품 462편 · AI꿈 플랫폼 참여자 2,384명"),
];

const KEYVISUAL = satOf("s4a");

export default function StoryStatic() {
  return (
    <div className={styles.static}>
      <section className={styles.stSection} aria-labelledby="st-ch1">
        <div className={styles.stInner}>
          <p className={styles.stKicker}>함께봄이 만들어 온 프로젝트</p>
          <span className={styles.num}>01</span>
          <h2 id="st-ch1" className={styles.stTitle}>
            헐버트 프로젝트
          </h2>
          <p className={styles.stLead}>
            한글을 사랑한 미국인, 헐버트. 서촌 한옥에서 헐버트 사진전 「고종의 밀사, 조선을 담다」(2026.08.24 – 11.30)와 헐버트 유물전이
            열립니다.
          </p>
          <div className={styles.stGrid}>
            {HULBERT.map((f) => (
              <StFig key={f.src} f={f} />
            ))}
          </div>
          <div className={styles.stPair}>
            {HULBERT_TALL.map((f) => (
              <StFig key={f.src} f={f} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.stSection} ${styles.stTint}`} aria-labelledby="st-ch2">
        <div className={styles.stInner}>
          <span className={styles.num}>02</span>
          <h2 id="st-ch2" className={styles.stTitle}>
            꿈꾸는 아리랑
          </h2>
          <p className={styles.stLead}>
            아리랑 전시 「아리랑, 130년 전 한국의 보물을 찾다」(2026.03.19 – 04.19, 언론보도 13건)와 꿈꾸는 아리랑 AI 영상 공모전(출품 462편). AI꿈
            플랫폼에는 2,384명이 참여했습니다.
          </p>
          <div className={styles.stArirang}>
            {ARIRANG.map((f) => (
              <StFig key={f.src} f={f} />
            ))}
          </div>
          <figure className={styles.stFig}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.stWide}
              src={KEYVISUAL.src600}
              alt={KEYVISUAL.alt}
              width={800}
              height={400}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{KEYVISUAL.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className={`${styles.stSection} ${styles.stDark}`} aria-labelledby="st-ch3">
        <div className={styles.stInner}>
          <span className={styles.num}>03</span>
          <h2 id="st-ch3" className={styles.stTitle}>
            AI 영상 제작
          </h2>
          <p className={styles.stWall}>
            비싸고, 느리고, 어려운
            <br />
            <span className={styles.stStrike}>늘 하던 방식</span>
          </p>
          <p className={styles.stLead}>노래광고영상부터 기업 홍보 영상까지, AI로 더 빠르고 가볍게 만듭니다. 누적 제작 영상 400편 이상.</p>
          <ul className={styles.stWorks} aria-label="함께 만든 영상">
            {WORK_STILLS.map((w) => (
              <li key={w.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.src} alt={w.alt} width={600} height={338} loading="lazy" decoding="async" />
                <span>{w.label}</span>
              </li>
            ))}
          </ul>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.stMosaic}
            src="/renewal/people-mosaic-960.webp"
            alt="AI 영상 크리에이터들의 작업 장면을 담은 AI 생성 영상 장면 모음"
            width={960}
            height={540}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className={`${styles.stSection} ${styles.stSpring}`} aria-labelledby="st-ch4">
        <span className={styles.stPetals} aria-hidden="true" />
        <div className={styles.stInner}>
          <span className={styles.num}>04</span>
          <h2 id="st-ch4" className={styles.stTitle}>
            별님 · 매칭설명회
          </h2>
          <p className={styles.stLead}>취업은 어렵고 창업은 두려운 AI 영상 크리에이터에게, 안전한 일자리와 창업의 기회를 엽니다.</p>
          <p className={styles.chDates}>
            <span className={styles.chDatesLabel}>매칭설명회</span>
            {BRIEFING_DATES.map((d) => (
              <span key={d} className={styles.chDate}>
                {d}
              </span>
            ))}
          </p>
          <div className={styles.stTeam}>
            {PEOPLE.map((p) => (
              <figure key={p.src} className={styles.stFig}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src800} alt="" width={800} height={446} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
          <p className={styles.stNote}>{PEOPLE_NOTE}</p>
        </div>
      </section>

      <section className={`${styles.stSection} ${styles.stFinal}`} aria-label="함께봄">
        <p className={styles.finalEyebrow}>헐버트 프로젝트 · 꿈꾸는 아리랑 · AI 영상 제작 · 별님</p>
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

function StFig({ f }: { f: Fig }) {
  return (
    <figure className={`${styles.stFig} ${f.tall ? styles.stFigTall : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async" />
      <figcaption>{f.cap}</figcaption>
    </figure>
  );
}
