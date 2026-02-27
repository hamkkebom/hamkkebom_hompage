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
                    단순한 툴 교육을 넘어선,
                </motion.h2>

                <motion.h2
                    style={{
                        x: xLeft,
                        fontSize: "clamp(1.6rem, 3.8vw, 3.8rem)",
                        fontWeight: 900,
                        whiteSpace: "normal",
                        wordBreak: "keep-all",
                        color: "#ffffff",
                        letterSpacing: "-0.04em",
                        lineHeight: 1.2,
                        willChange: "transform"
                    }}
                >
                    AI 기술 기반의 콘텐츠 제작 파이프라인,
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
                    함께봄만의 독보적인 <br className={styles.mobileBreak} />실무 커리큘럼.
                </motion.h2>
            </div>
        </motion.div>
    );
};

const team = {
    id: "education",
    title: "교육팀",
    subtitle: "Creator Education Division",
    tag: "EDUCATION TEAM",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.12)",
    vision: {
        title: "이론이 아닌, 실무를 가르칩니다",
        body: "함께봄 교육팀은 현업에서 바로 쓸 수 있는 실무 밀착형 교육을 지향합니다. 이론에 머물지 않고, 실제 수익을 창출할 수 있는 콘텐츠 기획력과 제작 기술, 마케팅 스킬을 전수합니다. 수강생이 교육 이수 후 독립적으로 프로젝트를 수행하고 수익화할 수 있는 수준까지 도달하는 것을 목표로 합니다.",
    },
    services: {
        title: "핵심 서비스 영역",
        items: [
            "온라인/오프라인 영상 제작 실무 교육",
            "기초 ~ 심화 영상 편집 과정 (프리미어 · 에펙)",
            "AI 활용 콘텐츠 제작 마스터 클래스",
            "1:1 멘토링 및 포트폴리오 디벨롭",
            "수강생 수익화 컨설팅 & 사업화 지원",
            "기업 대상 사내 교육 / 워크숍 기획",
            "크리에이터 양성 부트캠프",
            "자격증 발급 및 실무 연계 프로그램",
        ],
    },
    workflow: {
        title: "교육 프로세스",
        steps: [
            { num: "01", text: "수준 진단 & 맞춤 커리큘럼" },
            { num: "02", text: "실습 중심 집중 교육" },
            { num: "03", text: "포트폴리오 제작 & 피드백" },
            { num: "04", text: "수익화 / 취업 연계 컨설팅" },
        ],
    },
    strength: {
        title: "왜 함께봄 교육팀인가?",
        body: "현업에서 실제로 영상을 제작하고 마케팅을 집행하는 실무자들이 직접 교육을 진행합니다. 교과서적인 이론이 아니라, 클라이언트 요청에 대응하고 성과를 내는 실전 노하우를 전수합니다. 특히 AI 작곡, 딥페이크 활용, 자동화 편집 등 최신 AI 기술을 접목한 콘텐츠 제작 교육은 함께봄만의 독보적인 강점입니다. 교육 이수자의 대다수가 실제 프리랜서로 활동하거나 자체 브랜드를 런칭하고 있습니다.",
    },
    stats: [
        { number: "200+", label: "교육 수료생" },
        { number: "92%", label: "수료 후 실무 진출률" },
        { number: "4.9/5", label: "수강생 만족도" },
    ],
};

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function EducationPage() {
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
                            <Image src="/images/services/education_team_startup_1772161896880.png" alt="교육팀 이미지" fill style={{ objectFit: "cover" }} />
                        </div>
                        <div className={styles.polaroidMargin}>
                            <span className={styles.polaroidText}>EDUCATION TEAM</span>
                        </div>
                    </div>
                    <div className={styles.teamTitleGroup}>
                        <h2 className={styles.teamName} style={{ fontSize: "2rem" }}>{team.subtitle}</h2>
                        <span className={styles.teamSubtitle} style={{ marginTop: "0.5rem" }}>크리에이터를 육성하는 교육 솔루션.</span>
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
                            <h3 className={styles.cardTitle} style={{ fontSize: "2.2rem", marginBottom: "2rem" }}>왜 함께봄 교육팀인가?</h3>
                            <HorizontalMarqueeParallax highlightColor={team.color} />
                        </div>

                        <div className={styles.performanceStatsGrid}>
                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={200} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>+</span>
                                </div>
                                <span className={styles.performanceLabel}>교육 수료생</span>
                            </div>

                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={92} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>%</span>
                                </div>
                                <span className={styles.performanceLabel}>수료 후 실무 진출률</span>
                            </div>

                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={4.9} decimals={1} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>/5</span>
                                </div>
                                <span className={styles.performanceLabel}>수강생 만족도</span>
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
