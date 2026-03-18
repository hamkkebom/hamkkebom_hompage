import Link from "next/link";
import GNB from "@/components/GNB";
import ContactAndFooter from "@/components/ContactAndFooter";
import { BLOG_POSTS } from "@/data/blog-posts";

const categoryLabels: Record<string, string> = {
  guide: "가이드",
  insight: "인사이트",
  "case-study": "성공 사례",
  comparison: "비교 분석",
};

export default function BlogIndexPage() {
  return (
    <main
      id="main-content"
      style={{ background: "var(--bg-color)", minHeight: "100vh", color: "#fff" }}
    >
      <GNB />

      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "10rem 1.5rem 4rem",
          minHeight: "60vh",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.3em",
              color: "var(--accent-color)",
              marginBottom: "1rem",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Blog & Insights
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              marginBottom: "1.5rem",
              lineHeight: 1.2,
              wordBreak: "keep-all",
            }}
          >
            AI 영상 제작 · 마케팅 인사이트
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: "0 auto",
              wordBreak: "keep-all",
            }}
          >
            AI 영상 제작, 퍼포먼스 마케팅, 브랜딩에 대한 전문 가이드와 실전
            노하우를 공유합니다.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  padding: "2rem",
                  transition: "all 0.3s ease",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.3rem 0.7rem",
                      borderRadius: "4px",
                      background: "rgba(0, 240, 255, 0.1)",
                      color: "var(--accent-color)",
                      fontWeight: 600,
                    }}
                  >
                    {categoryLabels[post.category] || post.category}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {post.readingTime}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    lineHeight: 1.4,
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
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    wordBreak: "keep-all",
                  }}
                >
                  {post.description}
                </p>
                <div
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <ContactAndFooter />
    </main>
  );
}
