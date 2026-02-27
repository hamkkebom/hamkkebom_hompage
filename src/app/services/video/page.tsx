"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
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

    // 방향에 따른 X축 이동, 화면 안에 유지되도록 이동 폭을 기존 절반 이하로 줄임
    const xRight = useTransform(scrollYProgress, [0, 1], ["-5%", "3%"]);
    const xLeft = useTransform(scrollYProgress, [0, 1], ["5%", "-3%"]);

    // 블록 스케일 애니메이션
    const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    return (
        <motion.div
            ref={targetRef}
            style={{
                width: "100%",
                maxWidth: "1200px", // 화면 밖으로 크게 나가지 않게 최대 너비 설정
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
                        whiteSpace: "normal", // 모바일 환경 대비 자동 줄바꿈
                        wordBreak: "keep-all",
                        color: "rgba(255,255,255,0.2)",
                        WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1.2,
                        willChange: "transform"
                    }}
                >
                    AI 작곡 기술과의 시너지를 통해,
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
                    기존 영상 제작사와는 차원이 다른
                </motion.h2>

                <motion.h2
                    style={{
                        x: xRight,
                        fontSize: "clamp(2rem, 4.5vw, 4.5rem)", // 핵심 문구는 약간 더 크게
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
                    &apos;노래 광고 영상&apos;이라는 <br className={styles.mobileBreak} />독보적인 포맷을 완성했습니다.
                </motion.h2>
            </div>
        </motion.div>
    );
};


const team = {
    id: "video",
    title: "영상제작팀",
    subtitle: "Visual Production Division",
    tag: "VIDEO PRODUCTION TEAM",
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.12)",
    vision: {
        title: "디지털 시대의 시각적 언어를 재정의합니다",
        body: "함께봄 영상제작팀은 단순히 '보기 좋은 영상'을 만드는 팀이 아닙니다. 브랜드의 핵심 가치를 가장 강력한 시각적 서사로 번역하는 전문가 집단입니다. AI 작곡 기술로 제작된 맞춤형 음원과 시네마틱 영상미의 융합을 통해, 한 번 보면 잊히지 않는 압도적인 브랜드 콘텐츠를 만들어냅니다.",
    },
    services: {
        title: "핵심 서비스 영역",
        items: [
            "AI 음원 기반 브랜드 뮤직비디오 제작",
            "유튜브 채널 콘텐츠 기획 및 시리즈 제작",
            "기업 홍보 영상 / CF / 바이럴 영상 제작",
            "숏폼 콘텐츠 (릴스 · 쇼츠 · 틱톡) 제작",
            "라이브 커머스 기획 · 촬영 · 송출",
            "모션 그래픽 / 3D 시각효과 제작",
            "드론 촬영 및 항공 영상 제작",
            "제품 상세페이지 영상 촬영",
        ],
    },
    workflow: {
        title: "제작 프로세스",
        steps: [
            { num: "01", text: "브랜드 분석 & 기획 미팅" },
            { num: "02", text: "AI 음원 작곡 & 콘셉트 시안" },
            { num: "03", text: "촬영 & 모션 그래픽 제작" },
            { num: "04", text: "편집 & 컬러 그레이딩 · 최종 납품" },
        ],
    },
    strength: {
        title: "왜 함께봄 영상제작팀인가?",
        body: "10년 이상의 실무 경력을 갖춘 PD, 촬영감독, 편집 디렉터, 모션 그래퍼들이 하나의 팀으로 움직입니다. 외주 없이 기획부터 촬영, 편집, 최종 납품까지 원스톱으로 진행하기 때문에 일관된 퀄리티와 빠른 커뮤니케이션이 가능합니다. 특히 AI 작곡 기술과의 시너지를 통해, 기존 영상 제작사와는 차원이 다른 '노래 광고 영상'이라는 독보적인 포맷을 완성했습니다.",
    },
    stats: [
        { number: "40%", label: "업계 대비 제작 비용 절감" },
        { number: "400+", label: "누적 제작 영상" },
        { number: "48h", label: "숏폼 납기 속도" },
    ],
};

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
                            <Image src="/images/services/video_team_startup_1772161861134.png" alt="영상제작팀 이미지" fill style={{ objectFit: "cover" }} />
                        </div>
                        <div className={styles.polaroidMargin}>
                            <span className={styles.polaroidText}>VIDEO PRODUCTION TEAM</span>
                        </div>
                    </div>
                    <div className={styles.teamTitleGroup}>
                        <h2 className={styles.teamName} style={{ fontSize: "2rem" }}>{team.subtitle}</h2>
                        <span className={styles.teamSubtitle} style={{ marginTop: "0.5rem" }}>압도적인 퀄리티의 영상 콘텐츠를 제작합니다.</span>
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
                            <h3 className={styles.cardTitle} style={{ fontSize: "2.2rem", marginBottom: "2rem" }}>왜 함께봄 영상제작팀인가?</h3>
                            <HorizontalMarqueeParallax highlightColor={team.color} />
                        </div>

                        <div className={styles.performanceStatsGrid}>
                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={40} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>%</span>
                                </div>
                                <span className={styles.performanceLabel}>업계 대비 제작 비용 절감</span>
                            </div>

                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={400} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>+</span>
                                </div>
                                <span className={styles.performanceLabel}>누적 제작 영상</span>
                            </div>

                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={48} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>h</span>
                                </div>
                                <span className={styles.performanceLabel}>숏폼 납기 속도</span>
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
