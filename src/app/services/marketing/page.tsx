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
                    국내 10대 기획사 컨설턴트와
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
                    삼성 출신 마케터가 주도하는
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
                    데이터 드리븐 <br className={styles.mobileBreak} />퍼포먼스 마케팅의 정점.
                </motion.h2>
            </div>
        </motion.div>
    );
};

const team = {
    id: "marketing",
    title: "마케팅팀",
    subtitle: "Performance Marketing Division",
    tag: "MARKETING TEAM",
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.12)",
    vision: {
        title: "데이터로 증명하는 진짜 퍼포먼스 마케팅",
        body: "함께봄 마케팅팀은 감에 의존하지 않고 데이터에 기반한 정밀 타겟팅과 실시간 최적화로 실질적인 매출 성장을 이끌어냅니다. 특히 내부 영상제작팀과의 유기적인 통합 운영을 통해 실시간 성과 데이터를 즉각적으로 광고 소재에 반영하며 최적의 크리에이티브를 빠르게 도출합니다. 콘텐츠 제작과 퍼포먼스 마케팅이 완벽한 '원팀'으로 작동하는 이 독보적인 구조가 ROAS 2000%라는 압도적인 성과를 만들어냅니다.",
    },
    services: {
        title: "핵심 서비스 영역",
        items: [
            "퍼스널 브랜드 포지셔닝 전략 수립",
            "메타 / 구글 / 네이버 퍼포먼스 광고 운영",
            "데이터 분석 기반 A/B 테스트 최적화",
            "트렌드 기반 바이럴 / 인플루언서 캠페인",
            "SEO 최적화 및 검색 마케팅 전략",
            "SNS 채널 브랜딩 및 운영 대행",
            "CRM 마케팅 및 리텐션 전략 설계",
            "광고 소재 기획 및 크리에이티브 테스팅",
        ],
    },
    workflow: {
        title: "마케팅 프로세스",
        steps: [
            { num: "01", text: "시장 조사 & 타겟 분석" },
            { num: "02", text: "전략 수립 & 채널 설정" },
            { num: "03", text: "캠페인 런칭 & A/B 테스트" },
            { num: "04", text: "성과 분석 & 스케일링" },
        ],
    },
    strength: {
        title: "왜 함께봄 마케팅팀인가?",
        body: "영상 제작팀과의 긴밀한 협업이 가장 큰 강점입니다. 광고 성과 데이터를 실시간 파악하여 영상 소재의 방향을 즉각 수정하고, 최적의 크리에이티브를 빠르게 도출합니다. 일반 마케팅 대행사가 외부 영상을 수급받아 일하는 것과 달리, 함께봄은 콘텐츠 제작과 퍼포먼스 마케팅이 완전히 통합된 원팀으로 작동합니다. 이 구조가 ROAS 2000%라는 압도적인 성과를 만들어냅니다.",
    },
    stats: [
        { number: "400+", label: "관리 광고 캠페인" },
        { number: "1억+", label: "월평균 광고 집행액" },
        { number: "2000%", label: "캠페인 달성 ROAS" },
    ],
};

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function MarketingPage() {
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
                            <Image src="/images/services/marketing_team_startup_1772161875871.png" alt="마케팅팀 이미지" fill style={{ objectFit: "cover" }} />
                        </div>
                        <div className={styles.polaroidMargin}>
                            <span className={styles.polaroidText}>MARKETING TEAM</span>
                        </div>
                    </div>
                    <div className={styles.teamTitleGroup}>
                        <h2 className={styles.teamName} style={{ fontSize: "2rem" }}>{team.subtitle}</h2>
                        <span className={styles.teamSubtitle} style={{ marginTop: "0.5rem" }}>데이터로 증명하는 진짜 퍼포먼스 마케팅.</span>
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
                            <h3 className={styles.cardTitle} style={{ fontSize: "2.2rem", marginBottom: "2rem" }}>왜 함께봄 마케팅팀인가?</h3>
                            <HorizontalMarqueeParallax highlightColor={team.color} />
                        </div>

                        <div className={styles.performanceStatsGrid}>
                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={400} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>+</span>
                                </div>
                                <span className={styles.performanceLabel}>관리 광고 캠페인</span>
                            </div>

                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={1} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>억+</span>
                                </div>
                                <span className={styles.performanceLabel}>월평균 광고 집행액</span>
                            </div>

                            <div className={styles.performanceCard}>
                                <div className={styles.performanceNumberWrapper}>
                                    <span className={styles.performanceNumber} style={{ color: team.color }}>
                                        <CountUp end={2000} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className={styles.performanceSuffix} style={{ color: team.color }}>%</span>
                                </div>
                                <span className={styles.performanceLabel}>캠페인 달성 ROAS</span>
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
