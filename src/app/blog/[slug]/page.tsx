import Link from "next/link";
import type { Metadata } from "next";
import GNB from "@/components/GNB";
import ContactAndFooter from "@/components/ContactAndFooter";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog-posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "글을 찾을 수 없습니다" };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://hamkkebom.com/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | 함께봄 블로그`,
      description: post.description,
      type: "article",
      url: `https://hamkkebom.com/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["함께봄"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <main style={{ background: "var(--bg-color)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>글을 찾을 수 없습니다</h1>
          <Link href="/blog" style={{ color: "var(--accent-color)" }}>블로그로 돌아가기</Link>
        </div>
      </main>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "함께봄",
      url: "https://hamkkebom.com",
    },
    publisher: {
      "@type": "Organization",
      name: "함께봄",
      url: "https://hamkkebom.com",
      logo: { "@type": "ImageObject", url: "https://hamkkebom.com/logo.png" },
    },
    mainEntityOfPage: `https://hamkkebom.com/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  const categoryLabels: Record<string, string> = {
    guide: "가이드",
    insight: "인사이트",
    "case-study": "성공 사례",
    comparison: "비교 분석",
  };

  return (
    <main id="main-content" style={{ background: "var(--bg-color)", minHeight: "100vh", color: "#fff" }}>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://hamkkebom.com" },
          { name: "블로그", url: "https://hamkkebom.com/blog" },
          { name: post.title, url: `https://hamkkebom.com/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <GNB />

      <article style={{ maxWidth: "800px", margin: "0 auto", padding: "10rem 1.5rem 4rem" }}>
        {/* 상단 메타 정보 */}
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/blog" style={{ color: "var(--text-secondary)", fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            ← 블로그 목록
          </Link>
        </div>

        <header style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", gap: "0.8rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", padding: "0.3rem 0.8rem", borderRadius: "4px", background: "rgba(0, 240, 255, 0.1)", color: "var(--accent-color)", fontWeight: 600 }}>
              {categoryLabels[post.category] || post.category}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              {new Date(post.publishedAt).toLocaleDateString("ko-KR")} · {post.readingTime}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.3, marginBottom: "1.5rem", wordBreak: "keep-all" }}>
            {post.title}
          </h1>

          <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", lineHeight: 1.7, wordBreak: "keep-all" }}>
            {post.description}
          </p>
        </header>

        {/* 본문 */}
        <div style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.85)", wordBreak: "keep-all" }}>
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "#fff" }}>
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
                  {items.map((item, j) => (
                    <li key={j} style={{ marginBottom: "0.5rem" }}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} style={{ marginBottom: "1.5rem" }}>
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "4rem", padding: "2rem", background: "rgba(0, 240, 255, 0.05)", border: "1px solid rgba(0, 240, 255, 0.15)", borderRadius: "12px", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.8rem" }}>
            프로젝트를 시작할 준비가 되셨나요?
          </h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            함께봄 전문팀과 함께 브랜드의 가치를 영상으로 만들어 보세요.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#000",
              padding: "0.8rem 2rem",
              borderRadius: "8px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            무료 상담 신청하기 →
          </Link>
        </div>

        {/* 키워드 태그 */}
        <div style={{ marginTop: "2rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {post.keywords.map((kw) => (
            <span key={kw} style={{ fontSize: "0.8rem", padding: "0.3rem 0.7rem", background: "rgba(255,255,255,0.05)", borderRadius: "4px", color: "var(--text-secondary)" }}>
              #{kw}
            </span>
          ))}
        </div>
      </article>

      <ContactAndFooter />
    </main>
  );
}
