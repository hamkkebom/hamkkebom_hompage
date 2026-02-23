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
        <main style={{ position: "relative", backgroundColor: "var(--bg-color)" }}>
          {/* 첫 번째 섹션: 비디오 Shatter 효과 */}
          <HeroScene />

          {/* 두 번째 섹션: ROAS 퍼포먼스 쇼케이스 */}
          <RoasShowcase />

          {/* 세 번째 섹션: 브랜드 스토리 */}
          <BrandStory />

          {/* 네 번째 섹션: 포트폴리오 및 파트너 리스트 */}
          <PortfolioAndPartners />

          {/* 네 번째 섹션: 문의하기 및 Footer */}
          <ContactAndFooter />

        </main>
      </SmoothScroll>
    </>
  );
}
