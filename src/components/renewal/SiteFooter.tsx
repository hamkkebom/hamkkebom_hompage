import Link from "next/link";
import { NAV } from "./nav";
import styles from "./site.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerTop}`}>
        <div>
          <p className={styles.footerLogo}>
            함께<span>봄</span>
          </p>
          <p className={styles.footerSlogan}>사람이 모이면, 봄이 됩니다.</p>
        </div>
        <nav className={styles.footerNav} aria-label="하단 메뉴">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact">문의하기</Link>
          <Link href="/faq">자주 묻는 질문</Link>
        </nav>
      </div>
      <div className={`${styles.container} ${styles.footerInfo}`}>
        <p>
          함께봄 주식회사 · 대표 노수빈 · 사업자등록번호 330-87-03743
          <br />
          (03044) 서울특별시 종로구 효자로7길 10 (통의동) · info@hamkkebom.com
        </p>
        <div className={styles.footerSocial}>
          <a href="https://www.youtube.com/@hamkkessong" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.instagram.com/hamkkebom_official" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://hamkkebom.kr" target="_blank" rel="noopener noreferrer">Blog</a>
        </div>
        <p className={styles.copy}>© 2026 Hamkkebom Inc.</p>
      </div>
    </footer>
  );
}
