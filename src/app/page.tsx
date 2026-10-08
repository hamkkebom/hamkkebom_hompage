import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/renewal/SiteHeader";
import ScrollStory from "@/components/renewal/ScrollStory";
import HomeSections from "@/components/renewal/HomeSections";
import SiteFooter from "@/components/renewal/SiteFooter";
import styles from "@/components/renewal/site.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <SmoothScroll>
        <main id="main-content">
          <ScrollStory />
          <HomeSections />
        </main>
        <SiteFooter />
      </SmoothScroll>
    </div>
  );
}
