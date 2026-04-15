import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Noto_Sans_KR, Outfit } from "next/font/google";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-kr",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-outfit",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "함께봄",
  url: "https://hamkkebom.com",
  logo: "https://hamkkebom.com/logo.png",
  description: "AI 음원 기반 브랜드 영상 제작 및 퍼포먼스 마케팅 전문 스튜디오",
  email: "info@hamkkebom.com",
  sameAs: [
    "https://www.instagram.com/hamkkebom_official",
    "https://www.youtube.com/@hamkkessong",
    "https://hamkkebom.kr",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "효자로7길 10 1층",
    addressLocality: "종로구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "함께봄",
  url: "https://hamkkebom.com",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hamkkebom.com"),
  title: {
    template: "%s | 함께봄",
    default: "함께봄 | 100년 가는 노래광고영상",
  },
  description:
    "AI송을 기반으로 한 압도적인 영상 브랜딩. 함께봄은 AI 음원 작곡과 시네마틱 영상 제작을 결합하여 브랜드의 가치를 강력한 콘텐츠로 만들어 드립니다.",
  keywords: [
    "AI 영상",
    "브랜드 영상",
    "노래 광고",
    "영상 제작",
    "마케팅 영상",
    "함께봄",
    "AI 음원",
    "브랜딩",
  ],
  authors: [{ name: "함께봄", url: "https://hamkkebom.com" }],
  creator: "함께봄",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://hamkkebom.com",
    siteName: "함께봄",
    title: "함께봄 | 100년 가는 노래광고영상",
    description:
      "AI송을 기반으로 한 압도적인 영상 브랜딩. AI 음원 작곡과 시네마틱 영상 제작으로 브랜드 가치를 극대화합니다.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "함께봄 — AI 기반 영상 브랜딩",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "함께봄 | 100년 가는 노래광고영상",
    description: "AI송을 기반으로 한 압도적인 영상 브랜딩",
    images: ["/opengraph-image"],
    site: "@hamkkebom_official",
  },
  alternates: {
    canonical: "https://hamkkebom.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: {
      "naver-site-verification": ["cc5029b2a4ab2c6cda70d3520165c6338db2c2d7"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3886881221608564');
              fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3886881221608564&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={`${notoSansKr.variable} ${outfit.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">본문으로 건너뛰기</a>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
