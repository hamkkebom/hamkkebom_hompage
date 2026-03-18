import SmoothScroll from "@/components/SmoothScroll";
import HeroScene from "@/components/HeroScene";
import GNB from "@/components/GNB";
import PortfolioAndPartners from "@/components/PortfolioAndPartners";
import ContactAndFooter from "@/components/ContactAndFooter";
import RoasShowcase from "@/components/RoasShowcase";
import BrandStory from "@/components/BrandStory";

export default function Home() {
  return (
    <>
      <GNB />
      <SmoothScroll>
        <main
          id="main-content"
          style={{ position: "relative", backgroundColor: "var(--bg-color)" }}
        >
          {/* 히어로 섹션: AI 브랜드 영상 제작 인트로 */}
          <section aria-label="AI 브랜드 영상 제작 소개">
            <HeroScene />
          </section>

          {/* ROAS 퍼포먼스 쇼케이스 */}
          <section aria-label="유튜브 마케팅 성과 ROAS 쇼케이스">
            <RoasShowcase />
          </section>

          {/* 브랜드 스토리 */}
          <section aria-label="함께봄 브랜드 스토리">
            <BrandStory />
          </section>

          {/* 포트폴리오 및 파트너 리스트 */}
          <section aria-label="포트폴리오 및 파트너사">
            <PortfolioAndPartners />
          </section>

          {/* 문의하기 및 Footer */}
          <ContactAndFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
