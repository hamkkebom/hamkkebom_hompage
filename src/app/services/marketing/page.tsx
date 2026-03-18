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
                <motion.h2 style={{ x: xRight, fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)", fontWeight: 900, whiteSpace: "normal", wordBreak: "keep-all", color: "rgba(255,255,255,0.2)", WebkitTextStroke: "1px rgba(255,255,255,0.4)", letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform" }}>
                    AI를 활용한 마케팅,
                </motion.h2>
                <motion.h2 style={{ x: xLeft, fontSize: "clamp(1.8rem, 4vw, 4rem)", fontWeight: 900, whiteSpace: "normal", wordBreak: "keep-all", color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform" }}>
                    데이터가 증명하는
                </motion.h2>
                <motion.h2 style={{ x: xRight, fontSize: "clamp(2rem, 4.5vw, 4.5rem)", fontWeight: 900, whiteSpace: "normal", wordBreak: "keep-all", color: "transparent", WebkitTextStroke: `1.5px ${highlightColor}`, textShadow: `0 0 30px ${highlightColor}60`, letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform" }}>
                    성과 중심 <br className={styles.mobileBreak} />통합 마케팅 솔루션.
                </motion.h2>
            </div>
        </motion.div>
    );
};

const COLOR = "#3b82f6";

const serviceCategories = [
    {
        num: "01", title: "AI 기반 브랜드 마케팅 & 홍보",
        slogan: "브랜드를 더 넓은 시장에, 더 빠르게 알립니다",
        desc: "AI 분석 도구를 활용하여 타깃 소비자에게 최적화된 브랜드 메시지를 전달하고, 다양한 채널을 통해 브랜드 인지도와 신뢰도를 효과적으로 확장합니다.",
        items: ["디지털 마케팅 전략 수립 (SEO · 키워드 광고 · 검색 노출 최적화)", "네이버 플레이스 및 당근마켓 기반 로컬(지역) 타겟팅 마케팅 기획", "오프라인 옥외광고(OOH)와 연계한 O2O 통합 온라인 광고 캠페인 기획", "전문 상담사(사주/타로 등) 맞춤형 퍼스널 브랜딩 및 홍보 컨설팅", "틱톡, 메타, 구글, 유튜브, 인플루언서 마케팅 기획 및 운영", "블로그 · 카페 체험단 콘텐츠 확산 및 보도자료 미디어 홍보"],
    },
    {
        num: "02", title: "AI 기반 콘텐츠 크리에이션",
        slogan: "소비자와의 접점을 만드는 'Only One' 콘텐츠",
        desc: "최신 트렌드와 AI 콘텐츠 전략 분석을 통해 브랜드에 최적화된 콘텐츠를 제작합니다. SNS부터 영상, 웹사이트까지 채널별 맞춤 콘텐츠로 소비자와의 연결을 강화합니다.",
        items: ["SNS 채널 운영 · 콘텐츠 제작 (인스타그램 · 유튜브 · 블로그 · 틱톡 · 메타 · 구글)", "틱톡(TikTok) 등 플랫폼 트렌드에 최적화된 숏폼 영상 광고 소재 기획 및 제작", "브랜드 필름 및 숏폼 영상 기획 (릴스 · 쇼츠)", "상세페이지 디자인 (전환율 중심 기획)", "인플루언서 바이럴 콘텐츠 캠페인 기획"],
    },
    {
        num: "03", title: "AI 데이터 분석 기반 퍼포먼스 마케팅",
        slogan: "데이터가 증명하는 광고, 성과로 이어지는 전략",
        desc: "소비자 구매 여정 전반에 걸친 데이터 분석을 기반으로 브랜드 맞춤 광고 전략을 수립하고, 전환 효과를 지속적으로 최적화합니다.",
        items: ["매체별(네이버, 당근마켓, 틱톡, Meta, Google 등) 맞춤형 광고 매체 선정 및 운영 전략 수립", "미디어 믹스 설계 및 다채널 광고 집행", "퍼널(Funnel)별 전환 최적화", "광고 소재 A/B 테스트 및 성과 기반 최적화", "소비자 행동 데이터 분석 · 리포팅"],
    },
    {
        num: "04", title: "AI 기반 이커머스 솔루션",
        slogan: "온라인 판매 및 홍보 채널 확장을 통해 안정적인 판로를 개척합니다",
        desc: "시장 조사부터 플랫폼 및 이커머스 전 과정을 함께봄만의 AI 분석 역량으로 체계적으로 지원합니다.",
        items: ["시장 조사 및 AI 기반 브랜드 포지셔닝 전략 수립", "상세페이지 기획, 제작", "오픈마켓 · 플랫폼 입점 및 유통망 확장", "온 · 오프라인 통합 판로 개척", "이커머스 운영 관련 컨설팅 및 성과 분석"],
    },
];

const processSteps = [
    { num: "01", label: "시장 조사", desc: "타겟 분석" },
    { num: "02", label: "전략 수립", desc: "채널 설정" },
    { num: "03", label: "캠페인 런칭", desc: "A/B 테스트" },
    { num: "04", label: "성과 분석", desc: "스케일링" },
];

const summaryRows = [
    { area: "브랜드 마케팅 & 홍보", badge: "#3b82f6", value: "인지도 확장", services: "SEO · 로컬/O2O 마케팅 · 퍼스널 브랜딩 · PR" },
    { area: "콘텐츠 크리에이션", badge: "#22c55e", value: "소비자 접점 강화", services: "SNS · 틱톡/숏폼 영상 제작 · 상세페이지" },
    { area: "퍼포먼스 마케팅", badge: "#f59e0b", value: "전환 · 매출 극대화", services: "타겟 광고 운영 · 미디어믹스 · 데이터 분석" },
    { area: "이커머스 솔루션", badge: "#8b5cf6", value: "판로 개척", services: "플랫폼 입점 · 통합 유통 확장 · 컨설팅" },
];

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } };

export default function MarketingPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true });
    const sectionRef = useRef<HTMLDivElement>(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <main className={styles.servicesPage}>
            <GNB />
            <section ref={headerRef} className={styles.heroSection} style={{ paddingBottom: "2rem" }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: easeOut }}>
                    <p className={styles.heroTagline} style={{ color: COLOR }}>MARKETING SOLUTION TEAM</p>
                    <h1 className={styles.heroTitle}><span style={{ color: COLOR }}>마케팅 솔루션팀</span> 서비스 상세내용</h1>
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
                        <div className={styles.artisticImageFrame}><Image src="/images/services/marketing_team_startup_1772161875871.png" alt="마케팅팀 이미지" fill style={{ objectFit: "cover" }} /></div>
                        <div className={styles.polaroidMargin}><span className={styles.polaroidText}>MARKETING TEAM</span></div>
                    </div>
                    <div className={styles.teamTitleGroup}>
                        <h2 className={styles.teamName} style={{ fontSize: "2rem" }}>Marketing Solution Division</h2>
                        <span className={styles.teamSubtitle} style={{ marginTop: "0.5rem" }}>AI를 활용한 마케팅, 데이터가 증명하는 성과 중심</span>
                    </div>
                </motion.div>

                <div className={styles.contentGrid}>
                    {/* WHY US + Stats */}
                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1", backgroundColor: "transparent", border: "none", padding: "1rem 0" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.1 } } }}>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <span className={styles.cardLabel} style={{ color: COLOR }}>WHY US</span>
                            <h3 className={styles.cardTitle} style={{ fontSize: "2.2rem", marginBottom: "2rem" }}>왜 함께봄 마케팅 솔루션팀인가?</h3>
                            <HorizontalMarqueeParallax highlightColor={COLOR} />
                        </div>
                        <div className={styles.performanceStatsGrid}>
                            <div className={styles.performanceCard}><div className={styles.performanceNumberWrapper}><span className={styles.performanceNumber} style={{ color: COLOR }}><CountUp end={400} duration={2.5} separator="," enableScrollSpy scrollSpyOnce /></span><span className={styles.performanceSuffix} style={{ color: COLOR }}>+</span></div><span className={styles.performanceLabel}>관리 광고 캠페인</span></div>
                            <div className={styles.performanceCard}><div className={styles.performanceNumberWrapper}><span className={styles.performanceNumber} style={{ color: COLOR }}><CountUp end={1} duration={2.5} enableScrollSpy scrollSpyOnce /></span><span className={styles.performanceSuffix} style={{ color: COLOR }}>억+</span></div><span className={styles.performanceLabel}>월평균 광고 집행액</span></div>
                            <div className={styles.performanceCard}><div className={styles.performanceNumberWrapper}><span className={styles.performanceNumber} style={{ color: COLOR }}><CountUp end={2000} duration={2.5} separator="," enableScrollSpy scrollSpyOnce /></span><span className={styles.performanceSuffix} style={{ color: COLOR }}>%</span></div><span className={styles.performanceLabel}>캠페인 달성 ROAS</span></div>
                        </div>
                    </motion.div>

                    {/* OUR VISION */}
                    <motion.div className={styles.contentCard} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.2 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>OUR VISION</span>
                        <h3 className={styles.cardTitle}>AI를 활용한 마케팅, 데이터가 증명하는 성과 중심</h3>
                        <div className={styles.cardBody}>
                            <p>함께봄 마케팅 솔루션팀은 AI 기술과 데이터 인사이트를 결합한 통합 마케팅 솔루션을 제공합니다. 브랜드 인지도 확장부터 통합 마케팅 기획, 콘텐츠 제작, 퍼포먼스 마케팅, 이커머스 판로 개척까지 고객의 비즈니스 목표 달성을 위한 맞춤형 전략을 함께 설계합니다.</p>
                        </div>
                    </motion.div>

                    {/* SERVICES */}
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
                                     <ul className={styles.serviceCategoryItems}>
                                         {cat.items.map((item, i) => (<li key={i} className={styles.serviceCategoryItem}><span className={styles.serviceCategoryItemDot} style={{ backgroundColor: COLOR }} /><span>{item}</span></li>))}
                                     </ul>
                                 </div>
                             ))}
                         </div>
                    </motion.div>

                    {/* PROCESS */}
                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.4 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>PROCESS</span>
                        <h3 className={styles.cardTitle}>마케팅 프로세스</h3>
                        <div className={styles.processTimeline}>
                            {processSteps.map((step) => (
                                <div key={step.num} className={styles.processTimelineStep}>
                                    <div className={styles.processTimelineNum} style={{ backgroundColor: COLOR }}>{step.num}</div>
                                    <div><div className={styles.processTimelineLabel}>{step.label}</div><div className={styles.processTimelineDesc}>{step.desc}</div></div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* SUMMARY TABLE */}
                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.5 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>OVERVIEW</span>
                        <h3 className={styles.cardTitle}>한눈에 보는 서비스 요약</h3>
                        <table className={styles.summaryTable}>
                            <thead><tr><th>서비스 영역</th><th>핵심 가치</th><th>주요 서비스</th></tr></thead>
                            <tbody>
                                {summaryRows.map((row, i) => (<tr key={i}><td><span className={styles.summaryTableBadge} style={{ backgroundColor: `${row.badge}20`, color: row.badge }}>{row.area}</span></td><td>{row.value}</td><td>{row.services}</td></tr>))}
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
