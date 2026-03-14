import { ImageResponse } from "next/og";

export const alt = "함께봄 | 100년 가는 노래광고영상";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cyan accent bar — left side */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "6px",
            height: "100%",
            background: "#00f0ff",
          }}
        />

        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "600px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: 24,
            fontFamily: "sans-serif",
          }}
        >
          함께봄
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "-0.01em",
            marginBottom: 48,
            fontFamily: "sans-serif",
          }}
        >
          100년 가는 노래광고영상
        </div>

        {/* Cyan divider */}
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "#00f0ff",
            marginBottom: 32,
          }}
        />

        {/* Domain */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.08em",
            fontFamily: "sans-serif",
          }}
        >
          hamkkebom.com
        </div>
      </div>
    ),
    { ...size }
  );
}
