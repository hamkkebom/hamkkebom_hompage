import Link from "next/link";
import { MEDIA_POSTS } from "@/data/media-posts";
import styles from "./site.module.css";

const SERVICES = [
  {
    no: "01",
    title: "AI 영상 제작",
    desc: "광고영상, 노래광고영상, 숏폼, 뮤직비디오까지. 기획부터 납품까지 AI로 빠르게 만듭니다.",
    tags: ["노래광고영상", "브랜드 필름", "숏폼", "AI 뮤직비디오"],
    href: "/services/video",
  },
  {
    no: "02",
    title: "AI 홈페이지 제작",
    desc: "랜딩페이지부터 홈페이지, 쇼핑몰, 플랫폼까지. 기획·디자인·개발을 AI로 한 번에.",
    tags: ["랜딩페이지", "기업 홈페이지", "이커머스", "플랫폼"],
    href: "/services/planning",
  },
  {
    no: "03",
    title: "AI 마케팅",
    desc: "콘텐츠 생성부터 광고 운영, 플레이스·SNS 관리까지. 만든 것이 팔리도록 알립니다.",
    tags: ["콘텐츠 생성", "퍼포먼스 광고", "플레이스", "SNS"],
    href: "/services/marketing",
  },
  {
    no: "04",
    title: "AI 교육",
    desc: "기업 맞춤 AI 교육과 실습. 배운 사람이 함께봄과 함께 일하는 크리에이터로 자랍니다.",
    tags: ["기업 교육", "AI 툴 실습", "퍼스널브랜딩"],
    href: "/services/education",
  },
];

const WORKS = [
  { id: "P1kKoW6Afp0", title: "주안이네 김치 홍보송", kind: "노래광고영상" },
  { id: "tHzauNGtsqw", title: "다온 국제특허 홍보송", kind: "노래광고영상" },
  // 아셀케어 홍보송(vfrMwQR4ym0)은 썸네일·oEmbed 가 404/403 — 비공개로 보여 고객 확인 전까지 추억송으로 대신한다
  { id: "mcKKPA3UlSY", title: "추억송", kind: "추억송" },
  { id: "0HzCpVP8vvw", title: "에이스인력 홍보송", kind: "노래광고영상" },
  { id: "h_XBaIOGqN0", title: "구인공고송", kind: "구인공고영상" },
  { id: "It4FXs2A6cc", title: "꿈꾸는 아리랑 공모전 참가작", kind: "AI 뮤직비디오" },
];

const PROJECTS = [
  {
    label: "전시 · 운영 중",
    title: "헐버트 사진전 「고종의 밀사, 조선을 담다」",
    desc: "한글을 사랑한 외국인 호머 헐버트의 기록을 AI로 복원해 선보입니다.",
    meta: "2026.08.24 – 11.30 · 서촌 한옥",
    image: "/renewal/hanok-wall.webp",
  },
  {
    label: "전시",
    title: "헐버트 유물전",
    desc: "헐버트가 남긴 유물과 이야기를 서촌 한옥에서 만납니다.",
    meta: "서촌 한옥",
    image: "/renewal/hanok-lantern.webp",
  },
  {
    label: "전시 · 언론보도 13건",
    title: "아리랑, 130년 전 한국의 보물을 찾다",
    desc: "헐버트의 아리랑 채보 130주년. AI 영상과 음악으로 아리랑을 다시 불렀습니다.",
    meta: "2026.03.19 – 04.19",
    image: "/renewal/hanok-office.webp",
  },
  {
    label: "공모전",
    title: "꿈꾸는 아리랑 AI 영상 공모전",
    desc: "전 세계 누구나 AI로 만든 아리랑 뮤직비디오로 참여한 공모전.",
    meta: "출품 462편",
    image: "/renewal/ch1/platforms/aikkum-arirang-keyvisual.webp",
  },
];

const PLATFORMS = [
  { name: "AI꿈", desc: "AI 영상 공모전·갤러리 플랫폼", href: "https://www.aikkumhub.com" },
  { name: "별들에게 물어봐", desc: "AI 영상 크리에이터 커뮤니티", href: "https://hamkkebom-star.vercel.app" },
];

const NUMBERS = [
  { value: "400+", label: "누적 제작 영상" },
  { value: "2,384", label: "AI꿈 참여자" },
  { value: "462", label: "공모전 출품작" },
  { value: "13", label: "언론보도" },
];

const JOIN = [
  {
    who: "AI 영상 크리에이터",
    title: "별님",
    desc: "AI 영상 제작을 배우고, 함께봄의 프로젝트에 참여해 수익을 만듭니다.",
    cta: "별님 지원하기",
    type: "star",
  },
  {
    who: "함께 성장할 사람",
    title: "나투사",
    desc: "함께봄에 참여하며 크리에이터, 창업가로 함께 자랍니다.",
    cta: "나투사 알아보기",
    type: "natusa",
  },
  {
    who: "셀러 · 작가",
    title: "한옥에서 도전",
    desc: "서촌 한옥에서 판매하고, 전시하고, 첫 무대를 엽니다.",
    cta: "입점·전시 신청",
    type: "hanok",
  },
  {
    who: "동료 · 파트너",
    title: "함께 일하기",
    desc: "함께봄과 함께 일할 동료와 협력 기관을 기다립니다.",
    cta: "채용·제휴 문의",
    type: "partner",
  },
];

export default function HomeSections() {
  const press = MEDIA_POSTS.slice(0, 6);

  return (
    <>
      {/* 서비스 */}
      {/* tabIndex -1: 이야기의 「건너뛰기」가 포커스를 여기로 옮긴다 */}
      <section id="services" className={`${styles.section} ${styles.sectionHandoff}`} tabIndex={-1}>
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>함께 깨다 · 서비스</p>
            <h2 className={styles.sectionTitle}>
              AI로 만들고,
              <br />
              알리는 것까지 함께합니다
            </h2>
          </header>
          <div className={styles.serviceGrid}>
            {SERVICES.map((s) => (
              <Link key={s.no} href={s.href} className={styles.serviceCard}>
                <span className={styles.serviceNo}>{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className={styles.tags}>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <span className={styles.more}>자세히 보기 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 포트폴리오 */}
      <section className={`${styles.section} ${styles.sectionTint}`}>
        <div className={styles.container}>
          <header className={styles.sectionHeadRow}>
            <div>
              <p className={styles.eyebrow}>포트폴리오</p>
              <h2 className={styles.sectionTitle}>함께 만든 영상</h2>
            </div>
            <Link href="/works" className={styles.textLink}>
              전체 보기 →
            </Link>
          </header>
          <div className={styles.workGrid}>
            {WORKS.map((w) => (
              <a
                key={w.id}
                href={`https://www.youtube.com/watch?v=${w.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.workCard}
              >
                <div className={styles.workThumb}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${w.id}/hqdefault.jpg`} alt="" loading="lazy" />
                  <span className={styles.play} aria-hidden="true">▶</span>
                </div>
                <p className={styles.workKind}>{w.kind}</p>
                <h3 className={styles.workTitle}>{w.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 프로젝트 */}
      <section id="projects" className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>함께 보다 · 프로젝트</p>
            <h2 className={styles.sectionTitle}>
              사람이 모여
              <br />
              같은 것을 바라봅니다
            </h2>
            <p className={styles.sectionLead}>
              130년 전 한글을 사랑했던 한 사람, 호머 헐버트. 함께봄은 그의 기록을 AI로 되살려 서촌 한옥에서 사람들과 나눕니다.
            </p>
          </header>
          <div className={styles.projectGrid}>
            {PROJECTS.map((p) => (
              <article key={p.title} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading="lazy" />
                </div>
                <div className={styles.projectBody}>
                  <p className={styles.projectLabel}>{p.label}</p>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <p className={styles.projectMeta}>{p.meta}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.platformRow}>
            <p className={styles.platformHead}>함께봄이 운영하는 플랫폼</p>
            {PLATFORMS.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={styles.platform}>
                <strong>{p.name}</strong>
                <span>{p.desc}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 숫자 */}
      <section className={styles.numbers} aria-label="함께봄 숫자">
        <div className={`${styles.container} ${styles.numberGrid}`}>
          {NUMBERS.map((n) => (
            <div key={n.label} className={styles.number}>
              <strong>{n.value}</strong>
              <span>{n.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 함께하기 */}
      <section id="join" className={`${styles.section} ${styles.sectionSpring}`}>
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>함께 봄을 맞이하다 · 함께하기</p>
            <h2 className={styles.sectionTitle}>
              당신은
              <br />
              어떤 사람인가요?
            </h2>
            <p className={styles.sectionLead}>함께봄은 사람이 모이는 곳입니다. 각자의 자리에서 함께 봄을 맞이할 사람을 찾습니다.</p>
          </header>
          <div className={styles.joinGrid}>
            {JOIN.map((j) => (
              <Link key={j.type} href={`/contact?type=${j.type}`} className={styles.joinCard}>
                <p className={styles.joinWho}>{j.who}</p>
                <h3>{j.title}</h3>
                <p>{j.desc}</p>
                <span className={styles.more}>{j.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 소식 */}
      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeadRow}>
            <div>
              <p className={styles.eyebrow}>소식</p>
              <h2 className={styles.sectionTitle}>언론이 본 함께봄</h2>
            </div>
            <Link href="/media" className={styles.textLink}>
              전체 보기 →
            </Link>
          </header>
          <ul className={styles.pressList}>
            {press.map((p) => (
              <li key={p.sourceUrl}>
                <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <span className={styles.pressSource}>{p.source}</span>
                  <span className={styles.pressTitle}>{p.title}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 문의 */}
      <section className={styles.ctaBand}>
        <div className={styles.container}>
          <h2>무엇을 함께 만들어 볼까요?</h2>
          <p>영상, 홈페이지, 마케팅. 상담은 무료입니다.</p>
          <div className={styles.ctaRow}>
            <Link href="/contact" className={styles.ctaLight}>
              제작 문의하기
            </Link>
            <a href="mailto:info@hamkkebom.com" className={styles.ctaOutline}>
              info@hamkkebom.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
