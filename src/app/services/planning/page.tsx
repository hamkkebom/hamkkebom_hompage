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
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start 90%", "end 30%"] });
    const xRight = useTransform(scrollYProgress, [0, 1], ["-5%", "3%"]);
    const xLeft = useTransform(scrollYProgress, [0, 1], ["5%", "-3%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    return (
        <motion.div ref={targetRef} style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden", scale, opacity, willChange: "transform, opacity", marginBottom: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%", textAlign: "center" }}>
                <motion.h2 style={{ x: xRight, fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)", fontWeight: 900, whiteSpace: "normal", wordBreak: "keep-all", color: "rgba(255,255,255,0.2)", WebkitTextStroke: "1px rgba(255,255,255,0.4)", letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform" }}>기술로 콘텐츠 비즈니스를 설계하고</motion.h2>
                <motion.h2 style={{ x: xLeft, fontSize: "clamp(1.8rem, 4vw, 4rem)", fontWeight: 900, whiteSpace: "normal", wordBreak: "keep-all", color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform" }}>실행하는 기획개발팀</motion.h2>
                <motion.h2 style={{ x: xRight, fontSize: "clamp(2rem, 4.5vw, 4.5rem)", fontWeight: 900, whiteSpace: "normal", wordBreak: "keep-all", color: "transparent", WebkitTextStroke: `1.5px ${highlightColor}`, textShadow: `0 0 30px ${highlightColor}60`, letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform" }}>플랫폼과 자동화 시스템을 <br className={styles.mobileBreak} />기획·개발합니다.</motion.h2>
            </div>
        </motion.div>
    );
};

const COLOR = "#f59e0b";

const serviceCategories = [
    { num: "01", title: "서비스 기획 & MVP 개발", slogan: "아이디어를 실행 가능한 서비스로 구체화하고 빠르게 검증합니다", desc: "고객의 비즈니스 목표와 시장 환경을 분석하여 실현 가능한 서비스 구조를 설계하고, 단기간 내 핵심 기능 중심의 MVP로 빠르게 시장에 검증합니다.", items: ["신규 서비스 및 플랫폼 기획", "사업 아이디어 검증", "데이터 기반 서비스 전략 수립", "사용자 경험(UX) 기반 서비스 구조 설계", "서비스 운영 및 확장을 고려한 기획 설계"] },
    { num: "02", title: "웹 · 플랫폼 개발", slogan: "운영과 확장을 고려한 안정적인 디지털 서비스를 구축합니다", desc: "브랜드 아이덴티티와 사용자 중심 설계를 바탕으로 기업 맞춤형 웹사이트부터 대규모 플랫폼까지 확장 가능한 시스템 아키텍처 위에 구현합니다.", items: ["기업 맞춤형 웹사이트 및 플랫폼 구축", "교육 및 지식 콘텐츠 플랫폼 개발", "데이터 기반 의사결정 지원 시스템 구축", "SEO 최적화를 고려한 홈페이지 설계"] },
    { num: "03", title: "업무 자동화 시스템", slogan: "반복 업무는 시스템이, 사람은 핵심 업무에 집중합니다", desc: "AI 기술과 자동화 워크플로우를 결합하여 조직 내 반복·수동 업무를 자동화하고 팀 전체의 운영 효율과 생산성을 향상시킵니다.", items: ["내부 업무 자동화 도구 개발 및 구축", "콘텐츠 제작·관리 자동화 파이프라인 구축", "반복 업무 제거를 위한 프로세스 재설계", "업무 효율 모니터링 대시보드 개발"] },
    { num: "04", title: "데이터 기반 서비스", slogan: "데이터가 말하는 인사이트로 더 나은 의사결정을 지원합니다", desc: "서비스 운영 데이터를 수집·분석·시각화하여 비즈니스 의사결정을 데이터 기반으로 전환하고 성과 측정과 서비스 개선의 선순환 구조를 만듭니다.", items: ["서비스 운영 데이터 수집 및 분석 체계 구축", "비즈니스 KPI 기반 데이터 시각화 대시보드 개발", "사용자 행동 데이터 분석 및 인사이트 리포팅", "A/B 테스트 설계 및 성과 분석 시스템 구현", "데이터 기반 서비스 개선 전략 수립"] },
    { num: "05", title: "콘텐츠 플랫폼 구축", slogan: "콘텐츠 자산을 체계적으로 운영하는 플랫폼을 설계합니다", desc: "교육·지식·미디어 등 다양한 콘텐츠를 효율적으로 생산·유통·관리할 수 있는 콘텐츠 중심 플랫폼 인프라를 기획하고 구축합니다.", items: ["교육·강의 콘텐츠 플랫폼 기획 및 개발", "지식 콘텐츠 아카이브 및 검색 시스템 구축", "콘텐츠 구독·멤버십 서비스 플랫폼 설계", "콘텐츠 성과 분석 및 운영 관리 시스템 구현"] },
];

const processSteps = [
    { num: "01", label: "Research", desc: "최신 기술 및 시장 트렌드 분석" },
    { num: "02", label: "Planning", desc: "서비스 구조, 사용자 흐름, 핵심 기능 설계" },
    { num: "03", label: "Development", desc: "핵심 기능 중심 MVP 빠르게 개발" },
    { num: "04", label: "Validation", desc: "사용 데이터와 피드백 기반 서비스 개선" },
    { num: "05", label: "Scale", desc: "검증된 서비스 기반 기능 확장 및 고도화" },
];

const summaryRows = [
    { area: "서비스 기획 & MVP", badge: "#f59e0b", value: "실행 가능한 서비스 설계", services: "신규 서비스 기획 · 아이디어 검증 · MVP 설계" },
    { area: "웹 · 플랫폼 개발", badge: "#fbbf24", value: "안정적·확장 가능한 시스템", services: "기업 맞춤 웹사이트 · 플랫폼 · SEO 최적화" },
    { area: "업무 자동화 시스템", badge: "#10b981", value: "업무 효율 및 생산성 향상", services: "내부 자동화 도구 · 워크플로우" },
    { area: "데이터 기반 서비스", badge: "#3b82f6", value: "데이터 기반 의사결정 지원", services: "데이터 분석 · 대시보드 · KPI 리포팅" },
    { area: "콘텐츠 플랫폼", badge: "#8b5cf6", value: "콘텐츠 자산의 체계적 운영", services: "교육 플랫폼 · 지식 아카이브 · 구독 서비스" },
];

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } };

export default function PlanningPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true });
    const sectionRef = useRef<HTMLDivElement>(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <main className={styles.servicesPage}>
            <GNB />
            <section ref={headerRef} className={styles.heroSection} style={{ paddingBottom: "2rem" }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: easeOut }}>
                    <p className={styles.heroTagline} style={{ color: COLOR }}>AI PLANNING & DEV TEAM</p>
                    <h1 className={styles.heroTitle}><span style={{ color: COLOR }}>AI 기획개발팀</span> 서비스 상세내용</h1>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} style={{ position: "absolute", top: "clamp(70px, 15vw, 120px)", left: "1rem" }}>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "0.8rem 1.5rem", borderRadius: "30px", cursor: "pointer", fontSize: "1rem", fontWeight: 600, transition: "all 0.3s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = COLOR; e.currentTarget.style.color = COLOR; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}>
                            <ArrowLeft size={20} /> 홈으로 돌아가기
                        </button>
                    </Link>
                </motion.div>
            </section>

            <section ref={sectionRef} className={styles.teamSection} style={{ paddingTop: "2rem", paddingBottom: "8rem" }}>
                <motion.div className={styles.teamHeader} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={fadUp} style={{ justifyContent: "center", textAlign: "center", flexDirection: "column" }}>
                    <div className={styles.artisticImageWrapper}>
                        <div className={styles.artisticImageFrame}><Image src="/images/services/planning_team_startup_1772161911523.png" alt="기획개발팀 이미지" fill style={{ objectFit: "cover" }} /></div>
                        <div className={styles.polaroidMargin}><span className={styles.polaroidText}>PLANNING & DEV TEAM</span></div>
                    </div>
                    <div className={styles.teamTitleGroup}>
                        <h2 className={styles.teamName} style={{ fontSize: "2rem" }}>AI Planning & Development Division</h2>
                        <span className={styles.teamSubtitle} style={{ marginTop: "0.5rem" }}>기술로 콘텐츠 비즈니스를 설계하고, 실행하는 기획개발팀</span>
                    </div>
                </motion.div>

                <div className={styles.contentGrid}>
                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1", backgroundColor: "transparent", border: "none", padding: "1rem 0" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.1 } } }}>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <span className={styles.cardLabel} style={{ color: COLOR }}>WHY US</span>
                            <h3 className={styles.cardTitle} style={{ fontSize: "2.2rem", marginBottom: "2rem" }}>왜 함께봄 AI 기획개발팀인가?</h3>
                            <HorizontalMarqueeParallax highlightColor={COLOR} />
                        </div>
                        <div className={styles.performanceStatsGrid}>
                            <div className={styles.performanceCard}><div className={styles.performanceNumberWrapper}><span className={styles.performanceNumber} style={{ color: COLOR }}><CountUp end={150} duration={2.5} enableScrollSpy scrollSpyOnce /></span><span className={styles.performanceSuffix} style={{ color: COLOR }}>+</span></div><span className={styles.performanceLabel}>연간 목표 출시 프로덕트</span></div>
                            <div className={styles.performanceCard}><div className={styles.performanceNumberWrapper}><span className={styles.performanceNumber} style={{ color: COLOR, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}>One Flow</span></div><span className={styles.performanceLabel}>기획·개발·운영</span></div>
                            <div className={styles.performanceCard}><div className={styles.performanceNumberWrapper}><span className={styles.performanceNumber} style={{ color: COLOR }}><span style={{ fontSize: "1.1em" }}>∞</span></span></div><span className={styles.performanceLabel}>확장 설계</span></div>
                        </div>
                    </motion.div>

                    <motion.div className={styles.contentCard} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.2 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>OUR VISION</span>
                        <h3 className={styles.cardTitle}>기술로 콘텐츠 비즈니스를 설계하고, 실행합니다</h3>
                        <div className={styles.cardBody}>
                            <p>기획개발팀은 함께봄이 기술 기반 콘텐츠 기업으로 성장하기 위한 핵심 조직입니다. 최신 기술과 디지털 트렌드를 지속적으로 탐색하고, 이를 실제 업무와 서비스에 적용할 수 있는 플랫폼과 자동화 시스템을 기획·개발합니다.</p>
                            <p>단순한 시스템 구축을 넘어 조직의 생산성을 높이고 새로운 서비스와 비즈니스 모델을 실험하고 구현하는 역할을 수행합니다. 또한 내부 업무 자동화 도구와 고객 대상 서비스를 지속적으로 개발하여 효율적인 콘텐츠 제작 환경과 안정적인 플랫폼 운영 기반을 만들어갑니다.</p>
                        </div>
                    </motion.div>

                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.3 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>SERVICES</span>
                        <h3 className={styles.cardTitle}>서비스 구성</h3>
                        <div className={styles.serviceCategoriesGrid}>
                            {serviceCategories.map((cat) => (
                                <div key={cat.num} className={styles.serviceCategoryCard} style={{ "--card-accent": COLOR } as React.CSSProperties}>
                                    <div className={styles.serviceCategoryNumber} style={{ color: COLOR }}>{cat.num}</div>
                                    <h4 className={styles.serviceCategoryTitle}>{cat.title}</h4>
                                    <p className={styles.serviceCategorySlogan}>&ldquo;{cat.slogan}&rdquo;</p>
                                    <p className={styles.serviceCategoryDesc}>{cat.desc}</p>
                                    <ul className={styles.serviceCategoryItems}>{cat.items.map((item, i) => (<li key={i} className={styles.serviceCategoryItem}><span className={styles.serviceCategoryItemDot} style={{ backgroundColor: COLOR }} /><span>{item}</span></li>))}</ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.4 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>PROCESS</span>
                        <h3 className={styles.cardTitle}>기획개발 프로세스</h3>
                        <div className={styles.processTimeline}>
                            {processSteps.map((step) => (<div key={step.num} className={styles.processTimelineStep}><div className={styles.processTimelineNum} style={{ backgroundColor: COLOR }}>{step.num}</div><div><div className={styles.processTimelineLabel}>{step.label}</div><div className={styles.processTimelineDesc}>{step.desc}</div></div></div>))}
                        </div>
                    </motion.div>

                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.5 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>OVERVIEW</span>
                        <h3 className={styles.cardTitle}>한눈에 보는 서비스 요약</h3>
                        <table className={styles.summaryTable}>
                            <thead><tr><th>서비스 영역</th><th>핵심 가치</th><th>주요 서비스</th></tr></thead>
                            <tbody>{summaryRows.map((row, i) => (<tr key={i}><td><span className={styles.summaryTableBadge} style={{ backgroundColor: `${row.badge}20`, color: row.badge }}>{row.area}</span></td><td>{row.value}</td><td>{row.services}</td></tr>))}</tbody>
                        </table>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
