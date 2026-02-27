"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Video, Megaphone, MonitorPlay, Lightbulb, ArrowLeft } from "lucide-react";
import Link from "next/link";
import GNB from "@/components/GNB";
import styles from "./services.module.css";

/* ─── 팀 데이터 (A4 1장 분량) ─── */
const teamsData = [
    {
        id: "video",
        title: "영상제작팀",
        subtitle: "Visual Production Division",
        tag: "VIDEO PRODUCTION TEAM",
        icon: Video,
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
            { number: "400+", label: "누적 제작 영상" },
            { number: "845%", label: "평균 ROAS" },
            { number: "48h", label: "숏폼 납기 속도" },
        ],
    },
    {
        id: "marketing",
        title: "마케팅팀",
        subtitle: "Performance Marketing Division",
        tag: "MARKETING TEAM",
        icon: Megaphone,
        color: "#3b82f6",
        bgColor: "rgba(59, 130, 246, 0.12)",
        vision: {
            title: "데이터로 증명하는 진짜 퍼포먼스 마케팅",
            body: "함께봄 마케팅팀은 감에 의존하는 마케팅이 아닌, 데이터에 기반한 정밀 타겟팅과 실시간 최적화로 실질적인 매출 성장을 이끌어냅니다. 단순한 노출이 아니라 실제 구매 전환과 브랜드 인지도 상승을 동시에 달성하는 '퍼포먼스 브랜딩' 전략을 수립하고 실행합니다.",
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
            body: "영상 제작팀과의 긴밀한 협업이 가장 큰 강점입니다. 광고 성과 데이터를 실시간으로 분석하여 영상 소재의 방향을 즉각 수정하고, 최적의 크리에이티브를 빠르게 도출합니다. 일반 마케팅 대행사가 외부 영상을 수급받아 일하는 것과 달리, 함께봄은 콘텐츠 제작과 퍼포먼스 마케팅이 완전히 통합된 원팀으로 작동합니다. 이 구조가 ROAS 845%라는 압도적인 성과를 만들어냅니다.",
        },
        stats: [
            { number: "150+", label: "관리 광고 캠페인" },
            { number: "3.2x", label: "평균 전환율 향상" },
            { number: "24/7", label: "실시간 모니터링" },
        ],
    },
    {
        id: "education",
        title: "교육팀",
        subtitle: "Creator Education Division",
        tag: "EDUCATION TEAM",
        icon: MonitorPlay,
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
    },
    {
        id: "planning",
        title: "기획개발팀",
        subtitle: "Planning & Development Division",
        tag: "PLANNING & DEV TEAM",
        icon: Lightbulb,
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
    },
];

/* ─── 애니메이션 variants ─── */
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

/* ─── 팀 섹션 컴포넌트 ─── */
function TeamSection({ team, index }: { team: typeof teamsData[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const Icon = team.icon;

    return (
        <>
            {index > 0 && <div className={styles.sectionDivider} />}
            <section ref={ref} className={styles.teamSection}>
                {/* Team Header */}
                <motion.div
                    className={styles.teamHeader}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={fadUp}
                >
                    <div className={styles.teamIconLarge} style={{ backgroundColor: team.bgColor }}>
                        <Icon size={40} color={team.color} strokeWidth={2} />
                    </div>
                    <div className={styles.teamTitleGroup}>
                        <span className={styles.teamTag} style={{ color: team.color }}>{team.tag}</span>
                        <h2 className={styles.teamName}>{team.title}</h2>
                        <span className={styles.teamSubtitle}>{team.subtitle}</span>
                    </div>
                </motion.div>

                <div className={styles.contentGrid}>
                    {/* Vision Card */}
                    <motion.div
                        className={styles.contentCard}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.1 } } }}
                    >
                        <span className={styles.cardLabel} style={{ color: team.color }}>OUR VISION</span>
                        <h3 className={styles.cardTitle}>{team.vision.title}</h3>
                        <div className={styles.cardBody}>
                            <p>{team.vision.body}</p>
                        </div>
                    </motion.div>

                    {/* Services Card */}
                    <motion.div
                        className={styles.contentCard}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.2 } } }}
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

                    {/* Two-col: Workflow + Strength */}
                    <div className={styles.twoCol}>
                        {/* Workflow */}
                        <motion.div
                            className={styles.contentCard}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.3 } } }}
                        >
                            <span className={styles.cardLabel} style={{ color: team.color }}>WORKFLOW</span>
                            <h3 className={styles.cardTitle}>{team.workflow.title}</h3>
                            <div className={styles.processSteps} style={{ flexDirection: "column" }}>
                                {team.workflow.steps.map((step, i) => (
                                    <div key={i} className={styles.processStep}>
                                        <span className={styles.stepNumber} style={{ backgroundColor: team.color }}>{step.num}</span>
                                        <span className={styles.stepText}>{step.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Strength + Stats */}
                        <motion.div
                            className={styles.contentCard}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={{ ...fadUp, visible: { ...fadUp.visible, transition: { ...fadUp.visible.transition, delay: 0.4 } } }}
                        >
                            <span className={styles.cardLabel} style={{ color: team.color }}>WHY US</span>
                            <h3 className={styles.cardTitle}>{team.strength.title}</h3>
                            <div className={styles.cardBody}>
                                <p>{team.strength.body}</p>
                            </div>
                            <div className={styles.statsRow}>
                                {team.stats.map((stat, i) => (
                                    <div key={i} className={styles.statItem}>
                                        <span className={styles.statNumber} style={{ color: team.color }}>{stat.number}</span>
                                        <span className={styles.statLabel}>{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}

/* ─── Main ─── */
export default function ServicesPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true });

    return (
        <main className={styles.servicesPage}>
            <GNB />

            {/* Hero Header */}
            <section ref={headerRef} className={styles.heroSection}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: easeOut }}
                >
                    <p className={styles.heroTagline}>OUR SERVICES</p>
                    <h1 className={styles.heroTitle}>
                        AI 영상 브랜딩의 선두주자,<br />
                        <span style={{ color: "var(--accent-color)" }}>함께봄</span>이 제공하는 서비스
                    </h1>
                    <p className={styles.heroSubtitle}>
                        영상 제작부터 퍼포먼스 마케팅, 실무 교육, 그리고 AI 기반 기술 혁신까지.
                        4개 전문 팀이 하나의 유기적인 조직으로 움직여 브랜드의 성장을 완성합니다.
                    </p>
                </motion.div>

                {/* Back Button */}
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
                                e.currentTarget.style.borderColor = "var(--accent-color)";
                                e.currentTarget.style.color = "var(--accent-color)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(0,0,0,0.5)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                                e.currentTarget.style.color = "#fff";
                            }}
                        >
                            <ArrowLeft size={20} />
                            돌아가기
                        </button>
                    </Link>
                </motion.div>
            </section>

            {/* Team Sections */}
            {teamsData.map((team, idx) => (
                <TeamSection key={team.id} team={team} index={idx} />
            ))}

            {/* Bottom CTA */}
            <section style={{
                padding: "6rem 2rem",
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto",
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 style={{
                        fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                        fontWeight: 900,
                        color: "#fff",
                        marginBottom: "1.5rem",
                        wordBreak: "keep-all",
                    }}>
                        브랜드의 다음 단계,<br />
                        <span style={{ color: "var(--accent-color)" }}>함께봄</span>과 시작하세요.
                    </h2>
                    <p style={{
                        fontSize: "1.1rem",
                        color: "rgba(255,255,255,0.6)",
                        marginBottom: "3rem",
                        lineHeight: 1.8,
                        wordBreak: "keep-all",
                    }}>
                        4개 전문 팀의 시너지가 만들어내는 차원이 다른 결과를 경험해 보세요.
                    </p>
                    <Link href="/contact">
                        <button style={{
                            padding: "1rem 3rem",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "#000",
                            backgroundColor: "var(--accent-color)",
                            border: "none",
                            borderRadius: "50px",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            boxShadow: "0 4px 24px rgba(0, 240, 255, 0.3)",
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 240, 255, 0.5)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 240, 255, 0.3)";
                            }}
                        >
                            견적 요청하기
                        </button>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
