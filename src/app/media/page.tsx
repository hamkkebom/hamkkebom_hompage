import GNB from "@/components/GNB";
import ContactAndFooter from "@/components/ContactAndFooter";
import { MEDIA_POSTS } from "@/data/media-posts";

const categoryLabels: Record<string, string> = {
  exhibition: "전시회",
  press: "언론보도",
  review: "블로그 리뷰",
  event: "행사",
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  exhibition: { bg: "rgba(168, 85, 247, 0.12)", text: "#a855f7" },
  press: { bg: "rgba(59, 130, 246, 0.12)", text: "#3b82f6" },
  review: { bg: "rgba(34, 197, 94, 0.12)", text: "#22c55e" },
  event: { bg: "rgba(251, 191, 36, 0.12)", text: "#fbbf24" },
};

/* Domains for source display */
const sourceDomains: Record<string, string> = {
  Facebook: "facebook.com",
  "Naver Blog": "blog.naver.com",
  Instagram: "instagram.com",
  YouTube: "youtube.com",
  연합뉴스: "yna.co.kr",
  동아일보: "donga.com",
  문화일보: "munhwa.com",
  월간조선: "monthly.chosun.com",
  재외동포신문: "dongponews.net",
  더쎈뉴스: "mhns.co.kr",
  코리아리포트: "koreareport.co.kr",
  비욘드포스트: "beyondpost.co.kr",
  국악신문: "kukak21.com",
  "네이트 뉴스": "news.nate.com",
  뉴스통: "newstong.co.kr",
  재외동포뉴스: "korean.net",
  와우투데이: "wowtoday.co.kr",
};

/* SVG source icons per platform */
function SourceIcon({ source, color, size = 20 }: { source: string; color?: string; size?: number }) {
  // SNS platforms get unique icons
  switch (source) {
    case "Facebook":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path
            d="M16.67 15.47l.53-3.47h-3.33V9.87c0-.95.46-1.87 1.95-1.87h1.51V5.13S16.05 5 14.84 5c-2.54 0-4.2 1.54-4.2 4.33V12H7.5v3.47h3.14V24h3.87V15.47h2.16z"
            fill="#fff"
          />
        </svg>
      );
    case "Naver Blog":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#03C75A" />
          <path d="M8 7h2.8l2.4 3.6V7H16v10h-2.8L10.8 13.4V17H8V7z" fill="#fff" />
        </svg>
      );
    default:
      // Korean news outlets — newspaper icon with source color
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill={color || "#6366f1"} />
          <path d="M5 6h14v1.5H5V6zm0 3.5h10v1H5v-1zm0 2.5h12v1H5v-1zm0 2.5h8v1H5v-1zm0 2.5h11v1H5v-1z" fill="#fff" fillOpacity="0.9" />
        </svg>
      );
  }
}

export default function MediaPage() {
  return (
    <main
      id="main-content"
      style={{ background: "var(--bg-color)", minHeight: "100vh", color: "#fff" }}
    >
      <GNB />

      <section
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "10rem 1.5rem 4rem",
          minHeight: "60vh",
        }}
      >
        {/* ── Header ── */}
        <header style={{ marginBottom: "4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              borderRadius: "100px",
              background: "rgba(0, 240, 255, 0.08)",
              border: "1px solid rgba(0, 240, 255, 0.15)",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--accent-color)", fontWeight: 600, letterSpacing: "0.15em" }}>
              PRESS ROOM
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              marginBottom: "1rem",
              lineHeight: 1.2,
              wordBreak: "keep-all",
            }}
          >
            보도자료
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "600px",
              wordBreak: "keep-all",
            }}
          >
            함께봄의 언론 보도, 전시 소식, 블로그 리뷰 등
            다양한 보도자료를 한눈에 확인하세요.
          </p>
        </header>

        {/* ── Stats Bar ── */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "3rem",
            padding: "1.2rem 1.5rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-color)" }}>
              {MEDIA_POSTS.length}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              전체 보도
            </span>
          </div>
          {Object.entries(
            MEDIA_POSTS.reduce<Record<string, number>>((acc, p) => {
              acc[p.category] = (acc[p.category] || 0) + 1;
              return acc;
            }, {})
          ).map(([cat, count]) => {
            const colors = categoryColors[cat] ?? { bg: "rgba(255,255,255,0.05)", text: "#ccc" };
            return (
              <div key={cat} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: colors.text,
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  {categoryLabels[cat] ?? cat}
                </span>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{count}</span>
              </div>
            );
          })}
        </div>

        {/* ── Cards ── */}
        {MEDIA_POSTS.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 1rem",
              color: "var(--text-secondary)",
            }}
          >
            <p style={{ fontSize: "1.1rem" }}>아직 등록된 보도자료가 없습니다.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {MEDIA_POSTS.map((post) => {
              const catColor = categoryColors[post.category] ?? { bg: "rgba(0,240,255,0.1)", text: "var(--accent-color)" };
              return (
                <a
                  key={post.id}
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    {/* Source Header Bar */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem 1.5rem",
                        borderBottom: "1px solid var(--border-color)",
                        background: "rgba(255,255,255,0.015)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <SourceIcon source={post.source} color={post.sourceColor} size={28} />
                        <div>
                          <span
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: 700,
                              color: post.sourceColor,
                              display: "block",
                              lineHeight: 1.2,
                            }}
                          >
                            {post.source}
                          </span>
                          <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1 }}>
                            {sourceDomains[post.source] ?? ""}
                          </span>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.3rem 0.75rem",
                          borderRadius: "100px",
                          background: catColor.bg,
                          color: catColor.text,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {categoryLabels[post.category] ?? post.category}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div
                      style={{
                        padding: "1.5rem",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          lineHeight: 1.5,
                          marginBottom: "0.8rem",
                          wordBreak: "keep-all",
                          flex: 1,
                        }}
                      >
                        {post.title}
                      </h2>

                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.88rem",
                          lineHeight: 1.7,
                          wordBreak: "keep-all",
                          marginBottom: "1.2rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingTop: "1rem",
                          borderTop: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <time
                          dateTime={post.publishedAt}
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-secondary)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {new Date(post.publishedAt).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--accent-color)",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                          }}
                        >
                          원문 보기
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* Hover styles */}
      <style>{`
        .press-card article {
          position: relative;
        }
        .press-card:hover article {
          border-color: rgba(0, 240, 255, 0.25) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 240, 255, 0.1);
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .press-card article {
            border-radius: 12px !important;
          }
        }
      `}</style>

      <ContactAndFooter />
    </main>
  );
}
