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
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "2rem 1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                scale,
                opacity,
                willChange: "transform, opacity",
                marginBottom: "2rem"
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%", textAlign: "center" }}>
                <motion.h2
                    style={{
                        x: xRight,
                        fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)",
                        fontWeight: 900,
                        whiteSpace: "normal",
                        wordBreak: "keep-all",
                        color: "rgba(255,255,255,0.2)",
                        WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1.2,
                        willChange: "transform"
                    }}
                >
                    &apos;주 1회 이상의 제품 출시&apos;라는
                </motion.h2>

                <motion.h2
                    style={{
                        x: xLeft,
                        fontSize: "clamp(1.8rem, 4vw, 4rem)",
                        fontWeight: 900,
                        whiteSpace: "normal",
                        wordBreak: "keep-all",
                        color: "#ffffff",
                        letterSpacing: "-0.04em",
                        lineHeight: 1.2,
                        willChange: "transform"
                    }}
                >
                    파괴적인 개발 속도
                </motion.h2>

                <motion.h2
                    style={{
                        x: xRight,
                        fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
                        fontWeight: 900,
                        whiteSpace: "normal",
                        wordBreak: "keep-all",
                        color: "transparent",
                        WebkitTextStroke: `1.5px ${highlightColor}`,
                        textShadow: `0 0 30px ${highlightColor}60`,
                        letterSpacing: "-0.04em",
                        lineHeight: 1.2,
                        willChange: "transform"
                    }}
                >
                    내부 툴과 고객향 프로덕트를 아우르는 <br className={styles.mobileBreak} />기획개발 조직.
                </motion.h2>
            </div>
        </motion.div>
    );
};

const team = {
    id: "planning",
    title: "기획개발팀",
    subtitle: "Planning & Development Division",
    tag: "PLANNING & DEV TEAM",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.12)",
    vision: {
        title: "가장 앞선 기술로 새로운 가치를 만듭니다",
        body: "기획개발팀은 함께봄이 기술 기반 콘텐츠 기업으로 도약하는 핵심 엔진입니다. 최신 AI 기술을 모니터링하고 실제 업무에 적용할 수 있는 자동화 워크플로우와 프로덕트를 기획·개발하여, 조직 전체의 생산성을 극대화하고 새로운 비즈니스 모델을 창출합니다. 매주 하나 이상의 내부 자동화 도구 또는 고객향 서비스를 개발·배포합니다.",
    },
    services: {
        title: "핵심 서비스 영역",
        items: [
            "AI 기반 업무 자동화 툴 기획 및 개발",
            "웹/앱 서비스 설계 및 풀스택 개발",
            "AI 영상 자동 편집 시스템 구축",
            "딥페이크 / AI 모델 활용 콘텐츠 파이프라인",
            "데이터 대시보드 및 분석 시스템 개발",
            "신규 비즈니스 모델 리서치 및 프로토타이핑",
            "클라우드 인프라 설계 및 운영",
            "사내 교육 콘텐츠 플랫폼 개발",
        ],
    },
    workflow: {
        title: "개발 프로세스",
        steps: [
            { num: "01", text: "기술 트렌드 리서치 & 기획" },
            { num: "02", text: "프로토타이핑 & 내부 테스트" },
            { num: "03", text: "개발 & QA 검증" },
            { num: "04", text: "배포 & 성과 분석 · 개선" },
        ],
    },
    strength: {
        title: "왜 함께봄 기획개발팀인가?",
        body: "'주 1회 이상의 제품 출시'라는 파괴적인 개발 속도가 특징입니다. 이는 AI 코딩 도구와 자동화 파이프라인을 적극 활용한 결과입니다. 기획개발팀이 만든 도구들은 영상제작팀의 편집 시간을 50% 이상 단축시키고, 마케팅팀의 리포트 자동화를 실현시키며, 교육팀의 온라인 플랫폼을 고도화시킵니다. 기술이 비즈니스 전체에 녹아드는 유기적인 구조를 통해 함께봄은 콘텐츠 업계에서 독보적인 기술 경쟁력을 확보하고 있습니다.",
    },
    stats: [
        { number: "52+", label: "연간 출시 프로덕트" },
        { number: "50%↓", label: "업무 자동화 효율" },
        { number: "∞", label: "확장 가능성" },
    ],
};


const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function PlanningPage() {
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
                    <p className={styles.heroTagline} style={{ color: team.color }}>{team.tag}</p>
                    <h1 className={styles.heroTitle}>
                        <span style={{ color: team.color }}>{team.title}</span> 서비스 상세내용
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={headerInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{ position: "absolute", top: "120px", left: "2rem" }}
                >
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <button
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                background: "rgba(0,0,0,0.5)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "#fff",
                                padding: "0.8rem 1.5rem",
                                borderRadius: "30px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                fontWeight: 600,
                                transition: "all 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                                e.currentTarget.style.borderColor = team.color;
                                e.currentTarget.style.color = team.color;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(0,0,0,0.5)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                                e.currentTarget.style.color = "#fff";
                            }}
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
                            <Image src="/images/services/planning_team_startup_1772161911523.png" alt="기획개발팀 이미지" fill style={{ objectFit: "cover" }} />
                        </div>
                        <div className={styles.polaroidMargin}>
                            <span className={styles.polaroidText}>PLANNING & DEV TEAM</span>
                        </div>
                    </div>
                    <div className={styles.teamTitleGroup}>
                        <h2 className={styles.teamName} style={{ fontSize: "2rem" }}>{team.subtitle}</h2>
                        <span className={styles.teamSubtitle} style={{ marginTop: "0.5rem" }}>내부 툴과 고객향 프로덕트를 아우르는 기획개발 조직.</span>
                    </div>
                </motion.div>

                <div className={styles.contentGrid}>
                    {/* Performance Stats Section (WHY US) */}
                    <motion.div
                        className={styles.contentCard}
                        style={{ gridColumn: "1 / -1", backgroundColor: "transparent", border: "none", padding: "1rem 0" }}
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.1 } } }}
                    >
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <span className={styles.cardLabel} style={{ color: team.color }}>WHY US</span>
                            <h3 className={styles.cardTitle} style={{ fontSize: "2.2rem", marginBottom: "2rem" }}>왜 함께봄 기획개발팀인가?</h3>
                            <HorizontalMarqueeParallax highlightColor={team.color} />
                        </div>

                        <div className={styles.performanceStatsGrid}>
                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={52} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>+</span>
                                </div>
                                <span className={styles.performanceLabel}>연간 출시 프로덕트</span>
                            </div>

                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={50} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>%↓</span>
                                </div>
                                <span className={styles.performanceLabel}>업무 자동화 효율</span>
                            </div>

                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <span style={{ fontSize: "1.1em" }}>∞</span>
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}></span>
                                </div>
                                <span className={styles.performanceLabel}>무한 확장성</span>
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
                        <span className={styles.cardLabel} style={{ color: team.color }}>OUR VISION</span>
                        <h3 className={styles.cardTitle}>{team.vision.title}</h3>
                        <div className={styles.cardBody}>
                            <p>{team.vision.body}</p>
                        </div>
                    </motion.div>

                    {/* SERVICES */}
                    <motion.div
                        className={styles.contentCard}
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.3 } } }}
                    >
                        <span className={styles.cardLabel} style={{ color: team.color }}>SERVICES</span>
                        <h3 className={styles.cardTitle}>{team.services.title}</h3>
                        <ul className={styles.serviceList}>
                            {team.services.items.map((item, i) => (
                                <li key={i} className={styles.serviceItem}>
                                    <span className={styles.serviceDot} style={{ backgroundColor: team.color }} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
