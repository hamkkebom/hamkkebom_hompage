"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import GNB from "@/components/GNB";

import styles from "../services.module.css";

const HorizontalMarqueeParallax = ({ highlightColor }: { highlightColor: string }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 90%", "end 30%"]
    });

    const xRight = useTransform(scrollYProgress, [0, 1], ["-5%", "3%"]);
    const xLeft = useTransform(scrollYProgress, [0, 1], ["5%", "-3%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    return (
        <motion.div
            ref={targetRef}
            style={{
                width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem",
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                overflow: "hidden", scale, opacity, willChange: "transform, opacity", marginBottom: "2rem"
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%", textAlign: "center" }}>
                <motion.h2
                    style={{
                        x: xRight, fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)", fontWeight: 900,
                        whiteSpace: "normal", wordBreak: "keep-all", color: "rgba(255,255,255,0.2)",
                        WebkitTextStroke: "1px rgba(255,255,255,0.4)", letterSpacing: "-0.04em",
                        lineHeight: 1.2, willChange: "transform"
                    }}
                >
                    촬영 없이도 완성되는 영상,
                </motion.h2>
                <motion.h2
                    style={{
                        x: xLeft, fontSize: "clamp(1.8rem, 4vw, 4rem)", fontWeight: 900,
                        whiteSpace: "normal", wordBreak: "keep-all", color: "#ffffff",
                        letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform"
                    }}
                >
                    AI가 만드는 브랜드의 새로운 얼굴
                </motion.h2>
                <motion.h2
                    style={{
                        x: xRight, fontSize: "clamp(2rem, 4.5vw, 4.5rem)", fontWeight: 900,
                        whiteSpace: "normal", wordBreak: "keep-all", color: "transparent",
                        WebkitTextStroke: `1.5px ${highlightColor}`,
                        textShadow: `0 0 30px ${highlightColor}60`,
                        letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform"
                    }}
                >
                    제작 기간 50% 단축 · <br className={styles.mobileBreak} />비용 1/3 절감 실현.
                </motion.h2>
            </div>
        </motion.div>
    );
};

const COLOR = "#8b5cf6";

const serviceCategories = [
    {
        num: "01",
        title: "AI 광고 영상 · 브랜드 필름 제작",
        slogan: "브랜드의 가치를 AI로, 더 빠르고 더 강렬하게",
        desc: "생성형 AI 기술로 실사 촬영 없이도 고감도 영상을 제작합니다. CF·기업 홍보·브랜드 스토리 필름까지, 합리적인 비용으로 대형 브랜드 수준의 결과물을 제공합니다.",
        items: [
            "AI 광고 영상 제작 — 15초 / 30초 / 60초 패키지 (CF·광고용)",
            "기업 홍보 영상 — 회사 소개·제품 소개·이벤트 영상",
            "AI 나레이션 · AI 모델 활용 영상 제작",
            "브랜드 필름 — 브랜드 스토리·캠페인 영상 기획·제작",
            "AI 룩북 — 패션·라이프스타일·제품 이미지/영상 AI 생성",
        ],
    },
    {
        num: "02",
        title: "바이럴 숏폼 콘텐츠 제작",
        slogan: "SNS를 장악하는 15초~1분의 강력한 한 컷",
        desc: "SNS 플랫폼별 최적화된 숏폼 콘텐츠를 AI로 빠르게 제작합니다. 트렌드 분석을 기반으로 바이럴 확산에 최적화된 영상을 기획·제작합니다.",
        items: [
            "릴스 · 쇼츠 · 틱톡 플랫폼 최적화 숏폼 영상 제작 (15초~1분)",
            "SNS 광고용 숏폼 콘텐츠 기획 및 제작",
            "이커머스 상품 숏폼 영상 (상품 소개·리뷰·언박싱)",
            "인플루언서 협업 바이럴 영상 기획 및 제작",
            "생성형 AI 이미지·영상 활용 숏 & 롱폼 콘텐츠",
        ],
    },
    {
        num: "03",
        title: "FOOH · AI 버추얼 광고 제작",
        slogan: "현실을 초월한 비주얼, 촬영 없이 완성하는 임팩트 광고",
        desc: "실사 촬영 없이 AI CG로 제작하는 가상 옥외광고(FOOH) 영상으로, SNS 바이럴 확산에 최적화된 초현실적 비주얼 콘텐츠를 제작합니다.",
        items: [
            "FOOH(Fake Out-Of-Home) 가상 옥외광고 제작",
            "AI CG 기반 버추얼 광고 영상 제작",
            "AI 합성 영상 · 모션그래픽 제작",
            "제품 3D 시각화 영상 (실물 없이 AI로 제품 광고 구현)",
            "바이럴 캠페인 영상 기획 및 제작",
        ],
    },
    {
        num: "04",
        title: "AI 뮤직비디오 · 웹드라마 · 라이브 방송",
        slogan: "엔터테인먼트와 브랜드를 연결하는 스토리텔링 영상",
        desc: "AI 음원과 영상을 결합한 뮤직비디오부터 브랜디드 웹드라마, 라이브 커머스 대행까지 콘텐츠 엔터테인먼트 전 영역을 커버합니다.",
        items: [
            "AI 뮤직비디오 — AI 음원 + 영상 통합 제작 (아티스트·브랜드 뮤직필름)",
            "웹드라마 — 3~5분 미니 시리즈 기획·제작 (브랜디드 스토리텔링 콘텐츠)",
            "라이브 방송 세팅 및 운영 대행 — 유튜브·인스타그램·네이버 쇼핑라이브",
            "라이브 커머스 기획 및 진행 지원",
            "AI 가상 인플루언서 캐릭터 개발 및 콘텐츠 제작",
        ],
    },
];

const packages = [
    { badge: "#22c55e", name: "라이트", length: "15초", use: "SNS 광고·홍보용" },
    { badge: "#eab308", name: "스탠다드", length: "30초", use: "광고·캠페인용" },
    { badge: "#ef4444", name: "프리미엄", length: "60초 이상", use: "브랜드 필름·기업 홍보" },
];

const processSteps = [
    { num: "01", label: "기획·브리핑", desc: "요구사항 수렴" },
    { num: "02", label: "AI 시안 제작", desc: "초안 빠른 확인" },
    { num: "03", label: "수정·보완", desc: "1~2회 수정" },
    { num: "04", label: "최종 납품", desc: "파일 전달" },
];

const summaryRows = [
    { area: "AI 브랜드 필름", badge: "#8b5cf6", value: "고품질 · 합리적 비용", services: "CF·홍보영상·AI모델·룩북" },
    { area: "바이럴 숏폼", badge: "#a78bfa", value: "빠른 제작 · SNS 최적화", services: "릴스·쇼츠·틱톡·이커머스" },
    { area: "FOOH / 버추얼 광고", badge: "#3b82f6", value: "초현실 비주얼 · 바이럴 확산", services: "가상옥외광고·AI CG·3D영상" },
    { area: "MV · 웹드라마 · 라이브", badge: "#10b981", value: "스토리텔링 · 엔터테인먼트", services: "뮤직비디오·웹드라마·라이브커머스" },
];

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function VideoProductionPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true });
    const sectionRef = useRef<HTMLDivElement>(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <main className={styles.servicesPage}>
            <GNB />

            <section ref={headerRef} className={styles.heroSection} style={{ paddingBottom: "2rem" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: easeOut }}
                >
                    <p className={styles.heroTagline} style={{ color: COLOR }}>AI VIDEO PRODUCTION TEAM</p>
                    <h1 className={styles.heroTitle}>
                        <span style={{ color: COLOR }}>AI 영상제작팀</span> 서비스 상세내용
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={headerInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{ position: "absolute", top: "clamp(70px, 15vw, 120px)", left: "1rem" }}
                >
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <button
                            style={{
                                display: "flex", alignItems: "center", gap: "0.5rem",
                                background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.2)", color: "#fff",
                                padding: "0.8rem 1.5rem", borderRadius: "30px", cursor: "pointer",
                                fontSize: "1rem", fontWeight: 600, transition: "all 0.3s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = COLOR; e.currentTarget.style.color = COLOR; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}
                        >
                            <ArrowLeft size={20} />
                            홈으로 돌아가기
                        </button>
                    </Link>
                </motion.div>
            </section>

            <section ref={sectionRef} className={styles.teamSection} style={{ paddingTop: "2rem", paddingBottom: "8rem" }}>
                <motion.div
                    className={styles.teamHeader}
                    initial="hidden"
                    animate={sectionInView ? "visible" : "hidden"}
                    variants={fadUp}
                    style={{ justifyContent: "center", textAlign: "center", flexDirection: "column" }}
                >
                    <div className={styles.artisticImageWrapper}>
                        <div className={styles.artisticImageFrame}>
                            <Image src="/images/services/video_team_startup_1772161861134.png" alt="영상제작팀 이미지" fill style={{ objectFit: "cover" }} />
                        </div>
                        <div className={styles.polaroidMargin}>
                            <span className={styles.polaroidText}>VIDEO PRODUCTION TEAM</span>
                        </div>
                    </div>
                    <div className={styles.teamTitleGroup}>
                        <h2 className={styles.teamName} style={{ fontSize: "2rem" }}>AI Visual Production Division</h2>
                        <span className={styles.teamSubtitle} style={{ marginTop: "0.5rem" }}>촬영 없이도 완성되는 영상, AI가 만드는 브랜드의 새로운 얼굴</span>
                    </div>
                </motion.div>

                <div className={styles.contentGrid}>
                    {/* WHY US + Stats */}
                    <motion.div
                        className={styles.contentCard}
                        style={{ gridColumn: "1 / -1", backgroundColor: "transparent", border: "none", padding: "1rem 0" }}
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.1 } } }}
                    >
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <span className={styles.cardLabel} style={{ color: COLOR }}>WHY US</span>
                            <h3 className={styles.cardTitle} style={{ fontSize: "2.2rem", marginBottom: "2rem" }}>왜 함께봄 AI 영상제작팀인가?</h3>
                            <HorizontalMarqueeParallax highlightColor={COLOR} />
                        </div>

                        <div className={styles.performanceStatsGrid}>
                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: COLOR }}>
                                        <CountUp end={50} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: COLOR }}>%</span>
                                </div>
                                <span className={styles.performanceLabel}>제작 기간 단축</span>
                            </div>
                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: COLOR }}>
                                        <CountUp end={400} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: COLOR }}>+</span>
                                </div>
                                <span className={styles.performanceLabel}>누적 제작 영상</span>
                            </div>
                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: COLOR, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}>
                                        1/3
                                    </span>
                                </div>
                                <span className={styles.performanceLabel}>비용 절감</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* OUR VISION */}
                    <motion.div
                        className={styles.contentCard}
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.2 } } }}
                    >
                        <span className={styles.cardLabel} style={{ color: COLOR }}>OUR VISION</span>
                        <h3 className={styles.cardTitle}>촬영 없이도 완성되는 영상, AI가 만드는 브랜드의 새로운 얼굴</h3>
                        <div className={styles.cardBody}>
                            <p>함께봄 AI 영상제작팀은 생성형 AI 기술을 활용해 기획부터 제작·편집·납품까지 영상 제작의 전 과정을 원스톱으로 제공합니다. 기존 대비 제작 기간 단축·비용 절감을 실현하면서도, 브랜드 아이덴티티를 극대화하는 고품질 AI 영상 콘텐츠를 완성합니다.</p>
                        </div>
                    </motion.div>

                    {/* SERVICES */}
                    <motion.div
                        className={styles.contentCard}
                        style={{ gridColumn: "1 / -1" }}
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.3 } } }}
                    >
                        <span className={styles.cardLabel} style={{ color: COLOR }}>SERVICES</span>
                        <h3 className={styles.cardTitle}>서비스 구성</h3>

                        <div className={styles.serviceCategoriesGrid}>
                             {serviceCategories.map((cat) => (
                                 <div key={cat.num} className={styles.serviceCategoryCard} style={{ "--card-accent": COLOR } as React.CSSProperties}>
                                     <div className={styles.serviceCategoryNumber} style={{ color: COLOR }}>{cat.num}</div>
                                     <h4 className={styles.serviceCategoryTitle}>{cat.title}</h4>
                                     <p className={styles.serviceCategorySlogan}>&ldquo;{cat.slogan}&rdquo;</p>
                                     <p className={styles.serviceCategoryDesc}>{cat.desc}</p>
                                     <ul className={styles.serviceCategoryItems}>
                                         {cat.items.map((item, i) => (<li key={i} className={styles.serviceCategoryItem}><span className={styles.serviceCategoryItemDot} style={{ backgroundColor: COLOR }} /><span>{item}</span></li>))}
                                     </ul>
                                 </div>
                             ))}
                         </div>
                    </motion.div>

                    {/* PACKAGES */}
                    <motion.div
                        className={styles.contentCard}
                        style={{ gridColumn: "1 / -1" }}
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.35 } } }}
                    >
                        <span className={styles.cardLabel} style={{ color: COLOR }}>PACKAGES</span>
                        <h3 className={styles.cardTitle}>제작 패키지</h3>

                        <div className={styles.packageGrid}>
                            {packages.map((pkg, i) => (
                                <div key={i} className={styles.packageCard}>
                                    <div className={styles.packageBadge} style={{ backgroundColor: pkg.badge }} />
                                    <div className={styles.packageName}>{pkg.name}</div>
                                    <div className={styles.packageLength}>{pkg.length}</div>
                                    <div className={styles.packageUse}>{pkg.use}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* PROCESS */}
                    <motion.div
                        className={styles.contentCard}
                        style={{ gridColumn: "1 / -1" }}
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.4 } } }}
                    >
                        <span className={styles.cardLabel} style={{ color: COLOR }}>PROCESS</span>
                        <h3 className={styles.cardTitle}>AI 영상 제작 프로세스</h3>

                        <div className={styles.processTimeline}>
                            {processSteps.map((step) => (
                                <div key={step.num} className={styles.processTimelineStep}>
                                    <div className={styles.processTimelineNum} style={{ backgroundColor: COLOR } as React.CSSProperties}>{step.num}</div>
                                    <div>
                                        <div className={styles.processTimelineLabel}>{step.label}</div>
                                        <div className={styles.processTimelineDesc}>{step.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.sectionNote}>
                            기존 영상 제작 대비 제작 기간 50% 단축 · 비용 1/3 절감 실현
                        </div>
                    </motion.div>

                    {/* SUMMARY TABLE */}
                    <motion.div
                        className={styles.contentCard}
                        style={{ gridColumn: "1 / -1" }}
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.5 } } }}
                    >
                        <span className={styles.cardLabel} style={{ color: COLOR }}>OVERVIEW</span>
                        <h3 className={styles.cardTitle}>한눈에 보는 서비스 요약</h3>

                        <table className={styles.summaryTable}>
                            <thead>
                                <tr>
                                    <th>서비스 영역</th>
                                    <th>핵심 가치</th>
                                    <th>주요 서비스</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summaryRows.map((row, i) => (
                                    <tr key={i}>
                                        <td>
                                            <span className={styles.summaryTableBadge} style={{ backgroundColor: `${row.badge}20`, color: row.badge }}>
                                                {row.area}
                                            </span>
                                        </td>
                                        <td>{row.value}</td>
                                        <td>{row.services}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section aria-label="프로젝트 문의" style={{ maxWidth: "900px", margin: "6rem auto 4rem", padding: "3rem 2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", textAlign: "center" }}>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: "1rem", wordBreak: "keep-all" }}>
                    프로젝트를 시작할 준비가 되셨나요?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", wordBreak: "keep-all" }}>
                    함께봄 전문팀과 함께 브랜드의 가치를 영상으로 만들어 보세요.<br />
                    무료 상담을 통해 최적의 솔루션을 제안드립니다.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/contact" style={{ display: "inline-block", background: "#fff", color: "#000", padding: "0.9rem 2.5rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "1rem", transition: "all 0.3s ease" }}>
                        프로젝트 문의하기 →
                    </Link>
                    <Link href="/works" style={{ display: "inline-block", background: "transparent", color: "#fff", padding: "0.9rem 2.5rem", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "1rem", border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.3s ease" }}>
                        포트폴리오 보기
                    </Link>
                </div>
            </section>
        </main>
    );
}
