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
                <motion.h2 style={{ x: xRight, fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)", fontWeight: 900, whiteSpace: "normal", wordBreak: "keep-all", color: "rgba(255,255,255,0.2)", WebkitTextStroke: "1px rgba(255,255,255,0.4)", letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform" }}>AI 시대, 사람과 기업이</motion.h2>
                <motion.h2 style={{ x: xLeft, fontSize: "clamp(1.6rem, 3.8vw, 3.8rem)", fontWeight: 900, whiteSpace: "normal", wordBreak: "keep-all", color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform" }}>함께 성장하는 교육과 전략</motion.h2>
                <motion.h2 style={{ x: xRight, fontSize: "clamp(2rem, 4.5vw, 4.5rem)", fontWeight: 900, whiteSpace: "normal", wordBreak: "keep-all", color: "transparent", WebkitTextStroke: `1.5px ${highlightColor}`, textShadow: `0 0 30px ${highlightColor}60`, letterSpacing: "-0.04em", lineHeight: 1.2, willChange: "transform" }}>실무 중심 <br className={styles.mobileBreak} />맞춤형 AI 교육 & 컨설팅.</motion.h2>
            </div>
        </motion.div>
    );
};

const COLOR = "#10b981";

const serviceCategories = [
    { num: "01", title: "기업 맞춤형 AI 교육", slogan: "이제 AI는 선택이 아닌 필수, 실무에 바로 쓰는 AI 교육", desc: "직무·직급·산업별로 설계된 맞춤형 AI 교육 프로그램으로 임직원의 AI 활용 역량을 체계적으로 향상시킵니다. 이론이 아닌 실무 중심 커리큘럼으로 교육 효과를 극대화합니다.", items: ["생성형 AI(ChatGPT · Gemini · Claude 등) 실무 활용 교육", "직무별 맞춤형 AI 활용 커리큘럼 설계 및 운영", "AI 리터러시 기초 과정 (AI 입문·개념 이해)", "온라인 · 오프라인 · 혼합형(블렌디드) 교육 운영"], subItems: ["마케팅팀: AI 콘텐츠 기획·카피라이팅·이미지 생성", "기획팀: AI 리서치·보고서 작성·데이터 분석", "영업팀: AI 제안서·고객 응대·CRM 활용", "경영진: AI 트렌드·전략적 의사결정 활용"] },
    { num: "02", title: "AI 툴 실습 교육", slogan: "직접 써봐야 압니다, 손으로 익히는 AI 툴 실전 교육", desc: "ChatGPT·이미지 생성 AI·영상 제작 AI·업무 자동화 툴까지 현장에서 바로 쓸 수 있는 AI 도구 활용법을 실습 중심으로 교육합니다.", items: ["ChatGPT · Claude · Gemini 프롬프트 엔지니어링 실습", "AI 이미지 생성 도구 활용 (Midjourney · DALL-E · Stable Diffusion)", "AI 영상 제작 툴 교육 (Sora · Runway · Kling 등)", "AI 업무 자동화 툴 교육 (Zapier · Notion AI · Make 등)", "AI 발표 자료 · 문서 작성 자동화 실습"] },
    { num: "03", title: "창업 & 비즈니스 성장 컨설팅", slogan: "사업의 처음부터 끝까지, 든든한 AI 성장 파트너", desc: "예비 창업자·소상공인·스타트업을 위한 AI 기반 비즈니스 전략 컨설팅으로 사업 모델 수립부터 브랜딩, 마케팅 전략까지 종합적으로 지원합니다.", items: ["사업 아이디어 검증 및 비즈니스 모델 설계", "AI 활용 브랜드 전략 수립 및 네이밍·슬로건 개발", "창업 초기 단계별 성장 로드맵 수립", "소상공인·스타트업 대상 온라인 진출 전략 컨설팅", "사업계획서 작성 지원 (AI 활용 문서 고도화)", "영상제작자 별님 교육, 지원, 관리"] },
    { num: "04", title: "정부지원사업 연계 · 자격 인증 컨설팅", slogan: "받을 수 있는 지원금, 놓치지 않도록 함께 챙깁니다", desc: "정부·지자체의 다양한 지원사업과 AI 관련 자격 과정을 연계하여 교육비 부담을 줄이고 사업 성장 기회를 극대화합니다.", items: ["정부·지자체 지원사업 탐색 및 신청 컨설팅", "내일배움카드 · HRD 기업 훈련 연계 교육 운영", "K-디지털 · AI 바우처 지원사업 연계 컨설팅", "AI 관련 자격증 취득 과정 (AIP · AI+X 자격 등)", "공모전 · 경진대회 참가 기획 및 출품 지원"], subItems: ["창업 지원금 · 소상공인 지원사업 · R&D 지원사업 등"] },
];

const processSteps = [
    { num: "01", label: "현황 진단", desc: "니즈 파악" },
    { num: "02", label: "맞춤 설계", desc: "커리큘럼·전략" },
    { num: "03", label: "교육·컨설팅", desc: "실습·실행" },
    { num: "04", label: "사후 관리", desc: "성과 측정·개선" },
];

const summaryRows = [
    { area: "기업 맞춤 AI 교육", badge: "#10b981", target: "기업 임직원", services: "직무별 AI 활용·생성형 AI·리터러시" },
    { area: "AI 툴 실습 교육", badge: "#34d399", target: "개인·팀", services: "ChatGPT·이미지·영상·자동화 툴" },
    { area: "창업 & 비즈니스 컨설팅", badge: "#f59e0b", target: "창업자·소상공인·영상제작자", services: "사업모델·브랜딩·온라인 진출 전략" },
    { area: "정부지원사업 연계", badge: "#8b5cf6", target: "기업·개인", services: "지원금·바우처·자격증·공모전" },
];

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } };

export default function EducationPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true });
    const sectionRef = useRef<HTMLDivElement>(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <main className={styles.servicesPage}>
            <GNB />
            <section ref={headerRef} className={styles.heroSection} style={{ paddingBottom: "2rem" }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: easeOut }}>
                    <p className={styles.heroTagline} style={{ color: COLOR }}>AI EDUCATION & CONSULTING TEAM</p>
                    <h1 className={styles.heroTitle}><span style={{ color: COLOR }}>AI 교육 & 컨설팅팀</span> 서비스 상세내용</h1>
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
                        <div className={styles.artisticImageFrame}><Image src="/images/services/education_team_startup_1772161896880.png" alt="교육팀 이미지" fill style={{ objectFit: "cover" }} /></div>
                        <div className={styles.polaroidMargin}><span className={styles.polaroidText}>EDUCATION TEAM</span></div>
                    </div>
                    <div className={styles.teamTitleGroup}>
                        <h2 className={styles.teamName} style={{ fontSize: "2rem" }}>AI Education & Consulting Division</h2>
                        <span className={styles.teamSubtitle} style={{ marginTop: "0.5rem" }}>AI 시대, 사람과 기업이 함께 성장하는 교육과 전략</span>
                    </div>
                </motion.div>

                <div className={styles.contentGrid}>
                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1", backgroundColor: "transparent", border: "none", padding: "1rem 0" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.1 } } }}>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <span className={styles.cardLabel} style={{ color: COLOR }}>WHY US</span>
                            <h3 className={styles.cardTitle} style={{ fontSize: "2.2rem", marginBottom: "2rem" }}>왜 함께봄 AI 교육 & 컨설팅팀인가?</h3>
                            <HorizontalMarqueeParallax highlightColor={COLOR} />
                        </div>
                        <div className={styles.performanceStatsGrid}>
                            <div className={styles.performanceCard}><div className={styles.performanceNumberWrapper}><span className={styles.performanceNumber} style={{ color: COLOR }}><CountUp end={200} duration={2.5} enableScrollSpy scrollSpyOnce /></span><span className={styles.performanceSuffix} style={{ color: COLOR }}>+</span></div><span className={styles.performanceLabel}>교육 수료생</span></div>
                            <div className={styles.performanceCard}><div className={styles.performanceNumberWrapper}><span className={styles.performanceNumber} style={{ color: COLOR }}><CountUp end={92} duration={2.5} enableScrollSpy scrollSpyOnce /></span><span className={styles.performanceSuffix} style={{ color: COLOR }}>%</span></div><span className={styles.performanceLabel}>수료 후 실무 진출률</span></div>
                            <div className={styles.performanceCard}><div className={styles.performanceNumberWrapper}><span className={styles.performanceNumber} style={{ color: COLOR }}><CountUp end={4.9} decimals={1} duration={2.5} enableScrollSpy scrollSpyOnce /></span><span className={styles.performanceSuffix} style={{ color: COLOR }}>/5</span></div><span className={styles.performanceLabel}>수강생 만족도</span></div>
                        </div>
                    </motion.div>

                    <motion.div className={styles.contentCard} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.2 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>OUR VISION</span>
                        <h3 className={styles.cardTitle}>AI 시대, 사람과 기업이 함께 성장하는 교육과 전략</h3>
                        <div className={styles.cardBody}><p>함께봄 AI 교육&컨설팅팀은 기업 임직원 AI 교육부터 창업 컨설팅, 정부지원사업 연계까지 실무 중심의 맞춤형 프로그램을 제공합니다. AI를 두려워하지 않고 업무에 바로 활용할 수 있는 역량을 갖출 수 있도록, 개인·기업·기관 모두에게 최적화된 솔루션을 설계합니다.</p></div>
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
                                    <ul className={styles.serviceCategoryItems}>
                                        {cat.items.map((item, i) => (<li key={i} className={styles.serviceCategoryItem}><span className={styles.serviceCategoryItemDot} style={{ backgroundColor: COLOR }} /><span>{item}</span></li>))}
                                        {cat.subItems && (<ul className={styles.serviceSubItems}>{cat.subItems.map((sub, j) => (<li key={j} className={styles.serviceSubItem}><span className={styles.serviceSubItemDash}>—</span><span>{sub}</span></li>))}</ul>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.4 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>PROCESS</span>
                        <h3 className={styles.cardTitle}>교육 & 컨설팅 프로세스</h3>
                        <div className={styles.processTimeline}>
                            {processSteps.map((step) => (<div key={step.num} className={styles.processTimelineStep}><div className={styles.processTimelineNum} style={{ backgroundColor: COLOR }}>{step.num}</div><div><div className={styles.processTimelineLabel}>{step.label}</div><div className={styles.processTimelineDesc}>{step.desc}</div></div></div>))}
                        </div>
                        <div className={styles.sectionNote}>온라인 · 오프라인 · 방문 교육 모두 가능 &nbsp;|&nbsp; 기업 맞춤 커리큘럼 100% 설계</div>
                    </motion.div>

                    <motion.div className={styles.contentCard} style={{ gridColumn: "1 / -1" }} initial="hidden" animate={sectionInView ? "visible" : "hidden"} variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.5 } } }}>
                        <span className={styles.cardLabel} style={{ color: COLOR }}>OVERVIEW</span>
                        <h3 className={styles.cardTitle}>한눈에 보는 서비스 요약</h3>
                        <table className={styles.summaryTable}>
                            <thead><tr><th>서비스 영역</th><th>대상</th><th>주요 서비스</th></tr></thead>
                            <tbody>{summaryRows.map((row, i) => (<tr key={i}><td><span className={styles.summaryTableBadge} style={{ backgroundColor: `${row.badge}20`, color: row.badge }}>{row.area}</span></td><td>{row.target}</td><td>{row.services}</td></tr>))}</tbody>
                        </table>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
