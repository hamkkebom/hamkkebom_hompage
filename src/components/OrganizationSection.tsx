"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Video, Megaphone, Lightbulb, MonitorPlay, X } from "lucide-react";
import styles from "./OrganizationSection.module.css";

const orgData = [
    {
        id: "video",
        title: "영상제작팀",
        desc: "고품질 콘텐츠 기획\n트렌디한 영상 제작",
        details: "디지털 트렌드를 선도하는 영상 전문가 그룹입니다.\n10년 이상의 실무 경력을 갖춘 PD, 촬영감독, 모션그래퍼들이 모여 브랜드의 메시지를 가장 효과적인 시각적 언어로 번역합니다.\n\n주요 업무:\n- 유튜브 콘텐츠 기획 및 제작\n- 기업 홍보 영상 및 CF 제작\n- 숏폼 영상(릴스, 쇼츠, 틱톡) 트렌드 분석 및 제작\n- 라이브 커머스 기획 및 송출",
        icon: Video,
        color: "#8b5cf6", // Purple
        bgColor: "rgba(139, 92, 246, 0.1)",
        borderClass: styles.borderPurple,
    },
    {
        id: "marketing",
        title: "마케팅팀",
        desc: "브랜드 성장 전략\n실전 광고 성과 분석",
        details: "데이터에 기반한 정확하고 예리한 마케팅 솔루션을 제공합니다.\n단순한 노출을 넘어 실제 구매 전환과 브랜드 인지도 상승을 이끌어내는 퍼포먼스 브랜딩 전략을 수립하고 실행합니다.\n\n주요 업무:\n- 퍼스널 브랜드 포지셔닝 전략 수립\n- 메타, 구글, 네이버 퍼포먼스 마케팅\n- 데이터 분석 및 A/B 테스트 최적화\n- 트렌드 기반 바이럴 캠페인 기획",
        icon: Megaphone,
        color: "#3b82f6", // Blue
        bgColor: "rgba(59, 130, 246, 0.1)",
        borderClass: styles.borderBlue,
    },
    {
        id: "education",
        title: "교육팀",
        desc: "전문 크리에이터 양성\n실무 중심 커리큘럼",
        details: "현업에서 바로 쓸 수 있는 실무 밀착형 교육을 지향합니다.\n이론에 머물지 않고, 실제 수익을 창출할 수 있는 콘텐츠 기획력과 제작 기술, 마케팅 스킬을 전수하여 압도적인 전문가를 육성합니다.\n\n주요 업무:\n- 온/오프라인 교육 커리큘럼 개발 및 진행\n- 영상 제작 기초~심화 멘토링\n- 수강생 포트폴리오 디벨롭 및 수익화 컨설팅\n- 자격증 발급 및 실무 투입 연계",
        icon: MonitorPlay,
        color: "#10b981", // Green
        bgColor: "rgba(16, 185, 129, 0.1)",
        borderClass: styles.borderGreen,
    },
    {
        id: "planning",
        title: "기획개발팀",
        desc: "AI활용 개발기획\n매주마다 하나씩 개발",
        details: "가장 앞선 기술로 업무의 비효율을 깨고 새로운 가치를 창출합니다.\n최신 AI 기술을 모니터링하고 실제 업무에 적용할 수 있는 워크플로우와 프로덕트를 기획, 개발하여 조직 전체의 생산성을 극대화합니다.\n\n주요 업무:\n- AI 기반 자동화 툴 기획 및 개발\n- 업무 효율화 시스템 구축 및 보급\n- 신규 비즈니스 인사이트 및 기술 트렌드 리포트\n- 플랫폼 및 웹 서비스 설계",
        icon: Lightbulb,
        color: "#f59e0b", // Orange/Yellow
        bgColor: "rgba(245, 158, 11, 0.1)",
        borderClass: styles.borderOrange,
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function OrganizationSection() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedId]);

    const selectedItem = orgData.find((item) => item.id === selectedId);

    return (
        <section className={styles.orgSection}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.accentBar}></div>
                        <h2 className={styles.title}>
                            함께봄의 <span className={styles.highlight}>조직 구성</span>
                        </h2>
                    </div>
                    <div className={styles.tagLabel}>ORGANIZATION</div>
                </div>

                {/* Tree Container */}
                <div className={styles.treeWrapper}>
                    {/* Top Level CEO/Company Node */}
                    <div className={styles.topLevel}>
                        <motion.div
                            className={styles.ceoNode}
                            initial={{ y: -30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <span className={styles.ceoTitle}>HAMKKEBOM</span>
                            <span className={styles.ceoSubtitle}>함께봄 대표</span>
                        </motion.div>
                    </div>

                    {/* Connecting Trunk */}
                    <motion.div
                        className={styles.trunkLine}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    ></motion.div>

                    {/* Second Level Teams */}
                    <div className={styles.branchesContainer}>
                        {/* Horizontal connecting line across teams */}
                        <motion.div
                            className={styles.horizontalLine}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                        ></motion.div>

                        <motion.div
                            className={styles.teamsRow}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {orgData.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div className={styles.teamCol} key={item.id}>
                                        <motion.div
                                            className={styles.verticalLine}
                                            initial={{ scaleY: 0 }}
                                            whileInView={{ scaleY: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 1 }}
                                        ></motion.div>
                                        <motion.div
                                            layoutId={`card-${item.id}`}
                                            variants={itemVariants}
                                            className={`${styles.card} ${item.borderClass}`}
                                            onClick={() => setSelectedId(item.id)}
                                            whileHover={{
                                                y: -5,
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                                transition: { duration: 0.2 },
                                            }}
                                        >
                                            <div className={styles.cardContent}>
                                                <motion.div
                                                    className={styles.iconCircle}
                                                    style={{ backgroundColor: item.bgColor }}
                                                    layoutId={`icon-${item.id}`}
                                                >
                                                    <Icon size={32} color={item.color} strokeWidth={2.5} />
                                                </motion.div>
                                                <div className={styles.textContent}>
                                                    <motion.h3 className={styles.itemTitle} layoutId={`title-${item.id}`}>{item.title}</motion.h3>
                                                    <motion.p className={styles.itemDesc} layoutId={`desc-${item.id}`}>{item.desc}</motion.p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* Modal Overlay */}
                <AnimatePresence>
                    {selectedId && selectedItem && (
                        <div className={styles.modalOverlay}>
                            <motion.div
                                className={styles.modalBg}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                            />
                            <div className={styles.modalContainer}>
                                <motion.div
                                    className={`${styles.modalCard} ${selectedItem.borderClass}`}
                                    layoutId={`card-${selectedItem.id}`}
                                >
                                    {/* Close Button */}
                                    <button
                                        className={styles.closeBtn}
                                        onClick={() => setSelectedId(null)}
                                    >
                                        <X size={24} color="#666" />
                                    </button>

                                    <div className={styles.modalHeader}>
                                        <motion.div
                                            className={styles.modalIcon}
                                            style={{ backgroundColor: selectedItem.bgColor }}
                                            layoutId={`icon-${selectedItem.id}`}
                                        >
                                            <selectedItem.icon size={48} color={selectedItem.color} strokeWidth={2} />
                                        </motion.div>
                                        <div className={styles.modalTitleGroup}>
                                            <motion.div
                                                className={styles.modalTag}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                TEAM PROFILE
                                            </motion.div>
                                            <motion.h3 className={styles.modalTitle} layoutId={`title-${selectedItem.id}`}>
                                                {selectedItem.title}
                                            </motion.h3>
                                        </div>
                                    </div>

                                    <motion.div
                                        className={styles.modalBody}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        <motion.p className={styles.modalSubtitle} layoutId={`desc-${selectedItem.id}`}>
                                            {selectedItem.desc.split('\n').join(' - ')}
                                        </motion.p>
                                        <div className={styles.modalDivider}></div>
                                        <div className={styles.modalContentText}>
                                            {selectedItem.details.split('\n').map((line, i) => (
                                                <p key={i} style={{ marginBottom: line === '' ? '1rem' : '0.5rem', fontWeight: line.startsWith('-') ? 400 : (line.endsWith(':') ? 800 : 500) }}>
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
