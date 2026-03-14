import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청하신 페이지를 찾을 수 없습니다. 함께봄 홈으로 돌아가세요.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        background: "var(--bg-color, #0a0a0a)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "var(--font-outfit), sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(4rem, 15vw, 10rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          marginBottom: "0rem",
          lineHeight: 1,
          color: "#00f0ff",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "clamp(1rem, 3vw, 1.5rem)",
          color: "rgba(255,255,255,0.6)",
          marginBottom: "3rem",
          wordBreak: "keep-all",
        }}
      >
        페이지를 찾을 수 없습니다
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.8rem 2rem",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "30px",
          color: "#fff",
          textDecoration: "none",
          fontSize: "1rem",
          letterSpacing: "0.05em",
        }}
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
