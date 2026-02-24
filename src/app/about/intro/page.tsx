"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./about.module.css";
import GNB from "@/components/GNB";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutIntroPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const contrastRef = useRef<HTMLDivElement>(null);
    const philosophyRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const orgRef = useRef<HTMLDivElement>(null);
    const eduRef = useRef<HTMLDivElement>(null);
    const roadmapRef = useRef<HTMLDivElement>(null);
    const goalsRef = useRef<HTMLDivElement>(null);
    const newsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from(heroTitleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2
            });

            gsap.to(".heroBg", {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                y: 200,
                opacity: 0.2
            });

            // Section 1: Yesterday & Today
            gsap.from(".pastCol", {
                scrollTrigger: { trigger: contrastRef.current, start: "top 70%" },
                x: -50, opacity: 0, duration: 1, ease: "power3.out"
            });
            gsap.from(".nowCol", {
                scrollTrigger: { trigger: contrastRef.current, start: "top 70%" },
                x: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2
            });

            // Section 2: Philosophy
            gsap.from(".philCard", {
                scrollTrigger: { trigger: philosophyRef.current, start: "top 75%" },
                y: 80, opacity: 0, duration: 1, stagger: 0.2, ease: "back.out(1.2)"
            });

            // Section 3: Mission
            gsap.from(".missCard", {
                scrollTrigger: { trigger: missionRef.current, start: "top 80%" },
                scale: 0.95, opacity: 0, duration: 1.2, stagger: 0.3, ease: "power3.out"
            });

            // Section 4: Organization
            gsap.from(".oCard", {
                scrollTrigger: { trigger: orgRef.current, start: "top 75%" },
                y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
            });

            // Section 5: Education & Benefits
            gsap.from(".bCard", {
                scrollTrigger: { trigger: eduRef.current, start: "top 80%" },
                y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
            });

            // Section 6: Roadmap Animation
            const roadmapTl = gsap.timeline({
                scrollTrigger: {
                    trigger: roadmapRef.current,
                    start: "top 60%",
                }
            });

            roadmapTl.to(".roadProgress", { width: "100%", duration: 2, ease: "power2.inOut" }, 0);

            const steps = gsap.utils.toArray('.roadStep');
            steps.forEach((step: any, i) => {
                roadmapTl.to(step, {
                    onStart: () => { step.classList.add(styles.active); }
                }, i * (2 / steps.length));
            });

            // Section 7: Core Goals Counters
            gsap.from(".goalCardItem", {
                scrollTrigger: { trigger: goalsRef.current, start: "top 75%" },
                y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
            });

            gsap.utils.toArray('.gCount').forEach((el: any) => {
                const targetVal = parseFloat(el.getAttribute('data-target') || '0');
                gsap.to(el, {
                    scrollTrigger: { trigger: goalsRef.current, start: "top 75%" },
                    innerText: targetVal,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    onUpdate: function () {
                        // Apply commas
                        el.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString();
                    }
                });
            });

            // Section 8: National Startup Era (News)
            gsap.from(".newsFrame", {
                scrollTrigger: { trigger: newsRef.current, start: "top 70%" },
                scale: 0.9, opacity: 0, duration: 1.2, ease: "power3.out"
            });
            gsap.from(".newsTts", {
                scrollTrigger: { trigger: newsRef.current, start: "top 60%" },
                y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out"
            });

            // Section 9: Schedule & CTA
            gsap.from(".schCard", {
                scrollTrigger: { trigger: ctaRef.current, start: "top 80%" },
                y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.introContainer} ref={containerRef}>
            <GNB />

            {/* HERO SECTION */}
            <section className={styles.heroSection} ref={heroRef}>
                <div className={`${styles.heroBg} heroBg`}></div>
                <div className={styles.heroContent}>
                    <p className={styles.heroSubtitle}>변화의 시작</p>
                    <h1 className={styles.heroTitle} ref={heroTitleRef}>
                        <span style={{ color: "var(--accent-color, #d4af37)" }}>우리의 어제</span>와 오늘
                    </h1>
                </div>
                <div className={styles.heroScrollHint}>
                    <span style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>SCROLL</span>
                    <div className={styles.scrollLine}></div>
                </div>
            </section>

            {/* SECTION 1: YESTERDAY & TODAY */}
            <section className={styles.contrastSection} ref={contrastRef}>
                <div className={styles.contrastGrid}>
                    {/* PAST */}
                    <div className={`${styles.pastColumn} pastCol`}>
                        <div className={styles.pastTag}>PAST</div>
                        <h2 className={styles.columnTitle}>어제</h2>
                        <p className={styles.columnSubtitle}>성장에 집중하느라 놓쳤던 아쉬움</p>
                        <div className={styles.itemList}>
                            <div className={styles.itemCard}>
                                <div className={styles.iconWrap}>⚠️</div>
                                <div className={styles.itemText}>비슷한 영상 주제 지겨우시죠?</div>
                            </div>
                            <div className={styles.itemCard}>
                                <div className={styles.iconWrap}>❓</div>
                                <div className={styles.itemText}>느리고 애매한 피드백 답답하시죠?</div>
                            </div>
                            <div className={styles.itemCard}>
                                <div className={styles.iconWrap}>🚫</div>
                                <div className={styles.itemText}>이러다 시간 낭비할까 걱정되시죠?</div>
                            </div>
                        </div>
                    </div>

                    {/* NOW */}
                    <div className={`${styles.nowColumn} nowCol`}>
                        <div className={styles.nowTag}>NOW</div>
                        <h2 className={styles.columnTitle}>오늘</h2>
                        <p className={styles.columnSubtitle}>시스템 혁신으로 맞이하는 도약</p>
                        <div className={styles.itemList}>
                            <div className={styles.itemCard}>
                                <div className={styles.iconWrap}>📚</div>
                                <div className={styles.itemText}>퍼스널브랜딩, 다양한 주제 영상 의뢰, 외부업체 의뢰</div>
                            </div>
                            <div className={styles.itemCard}>
                                <div className={styles.iconWrap}>💬</div>
                                <div className={styles.itemText}>현장 스터디 운영, 마케팅+영상팀 합동 피드백</div>
                            </div>
                            <div className={styles.itemCard}>
                                <div className={styles.iconWrap}>🎓</div>
                                <div className={styles.itemText}>제작비 인상과 영상, 마케팅 전문실력 향상 실무자격 교육</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: PHILOSOPHY */}
            <section className={styles.philosophySection} ref={philosophyRef}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        (주)함께봄의 <span>탄생과 철학</span>
                    </h2>
                    <p style={{ letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}>OUR PHILOSOPHY</p>
                </div>

                <div className={styles.philosophyGrid}>
                    <div className={`${styles.philosophyCard} philCard`}>
                        <div className={styles.philIcon}>🤝</div>
                        <h3 className={styles.philTitle}>함께 바라봄</h3>
                        <p className={styles.philSubtitle}>자유와 나눔의 가치</p>
                        <p className={styles.philDesc}>
                            같은 꿈을 향해 서로를 응원하며<br />함께 나아갑니다.
                        </p>
                    </div>
                    <div className={`${styles.philosophyCard} philCard`}>
                        <div className={styles.philIcon}>🔨</div>
                        <h3 className={styles.philTitle}>함 깨부수어 봄!</h3>
                        <p className={styles.philSubtitle}>혁신과 도전</p>
                        <p className={styles.philDesc}>
                            수동적인 마인드와 5일근무제,<br />경쟁의식을 깨고 새롭게 혁신합니다.
                        </p>
                    </div>
                    <div className={`${styles.philosophyCard} philCard`}>
                        <div className={styles.philIcon}>🌱</div>
                        <h3 className={styles.philTitle}>함께 맞이하는 봄!</h3>
                        <p className={styles.philSubtitle}>희망과 결실</p>
                        <p className={styles.philDesc}>
                            혼자가 아닌 우리로서<br />따뜻하고 희망찬 결실을 맞이합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 3: VISION & MISSION */}
            <section className={styles.missionSection} ref={missionRef}>
                <div className={`${styles.missionCard} ${styles.vision} missCard`}>
                    <span className={styles.missionLabel}>VISION</span>
                    <p className={styles.missionText}>
                        꿈을 이어주어 더 큰 꿈에 이르도록<br />
                        서로의 꿈을 돕는 사회
                    </p>
                </div>
                <div className={`${styles.missionCard} missCard`}>
                    <span className={styles.missionLabel}>MISSION</span>
                    <p className={styles.missionText}>
                        AI 활용 감성 퍼스널 브랜딩으로<br />
                        브랜드와 사람을 세상에 기억시킴
                    </p>
                </div>
            </section>

            {/* SECTION 4: ORGANIZATION */}
            <section className={styles.orgSection} ref={orgRef}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        함께봄의 <span>조직 구성</span>
                    </h2>
                    <p style={{ letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}>ORGANIZATION</p>
                </div>

                <div className={styles.orgGrid}>
                    <div className={`${styles.orgCard} oCard`}>
                        <div className={styles.orgIconBox} style={{ color: "#a855f7", background: "rgba(168, 85, 247, 0.1)" }}>🎥</div>
                        <div className={styles.orgInfo}>
                            <h3 className={styles.orgName}>영상제작팀</h3>
                            <p className={styles.orgDesc}>고품질 콘텐츠 기획{'\n'}트렌디한 영상 제작</p>
                        </div>
                    </div>
                    <div className={`${styles.orgCard} oCard`}>
                        <div className={styles.orgIconBox} style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)" }}>📣</div>
                        <div className={styles.orgInfo}>
                            <h3 className={styles.orgName}>마케팅팀</h3>
                            <p className={styles.orgDesc}>브랜드 성장 전략{'\n'}실전 광고 성과 분석</p>
                        </div>
                    </div>
                    <div className={`${styles.orgCard} oCard`}>
                        <div className={styles.orgIconBox} style={{ color: "#10b981", background: "rgba(16, 185, 129, 0.1)" }}>🧑‍🏫</div>
                        <div className={styles.orgInfo}>
                            <h3 className={styles.orgName}>교육팀</h3>
                            <p className={styles.orgDesc}>전문 크리에이터 양성{'\n'}실무 중심 커리큘럼</p>
                        </div>
                    </div>
                    <div className={`${styles.orgCard} oCard`}>
                        <div className={styles.orgIconBox} style={{ color: "#fbbf24", background: "rgba(251, 191, 36, 0.1)" }}>💡</div>
                        <div className={styles.orgInfo}>
                            <h3 className={styles.orgName}>기획개발팀</h3>
                            <p className={styles.orgDesc}>AI활용 개발기획{'\n'}매주마다 하나씩 개발</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: BENEFITS & EDUCATION */}
            <section className={styles.benefitsSection} ref={eduRef}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        차별화된 <span>교육과 압도적 혜택</span>
                    </h2>
                    <p style={{ letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}>BENEFITS & EDUCATION</p>
                </div>

                <div className={styles.benefitsGrid}>
                    <div className={`${styles.benefitCard} bCard`}>
                        <div className={styles.benefitIcon}>💰</div>
                        <h3 className={styles.benefitTitle}>즉각적 수익화</h3>
                        <p className={styles.benefitDesc}>
                            교육 수료 즉시 실전 투입<br />
                            제작 단가 인상 (초보 가능)
                        </p>
                    </div>
                    <div className={`${styles.benefitCard} bCard`}>
                        <div className={styles.benefitIcon}>📈</div>
                        <h3 className={styles.benefitTitle}>실전 마케팅 경험</h3>
                        <p className={styles.benefitDesc}>
                            내 영상의 광고비/효율 확인<br />
                            광고 세팅 실무 역량 강화
                        </p>
                    </div>
                    <div className={`${styles.benefitCard} bCard`}>
                        <div className={styles.benefitIcon}>🤝</div>
                        <h3 className={styles.benefitTitle}>협력 창업 "나투사"</h3>
                        <p className={styles.benefitDesc}>
                            1 + 1 + 1 = ∞ (무한대)<br />
                            공동체 기반 협력 창업 모델
                        </p>
                    </div>
                </div>

                <div className={styles.eduPrograms}>
                    <h3>실전 교육 프로그램</h3>
                    <div className={styles.eduRow}>
                        <span className={styles.eduName}>초급 과정</span>
                        <span className={styles.eduPrice}>269,000원</span>
                    </div>
                    <div className={styles.eduRow}>
                        <span className={styles.eduName}>중급 과정</span>
                        <span className={styles.eduPrice}>369,000원</span>
                    </div>
                    <div className={styles.eduNotice}>
                        기존 별님혜택 : 자격증 발급비 10만원 지원
                    </div>
                </div>
            </section>

            {/* SECTION 6: ROADMAP */}
            <section className={styles.roadmapSection} ref={roadmapRef}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <span>성장</span> 가능
                    </h2>
                    <p style={{ letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}>3가지 제작 + 5가지별 평가 기준</p>
                </div>

                <div className={styles.roadmapContainer}>
                    <div className={styles.roadmapLine}></div>
                    <div className={`${styles.roadmapProgress} roadProgress`}></div>

                    <div className={`${styles.stepNode} roadStep`}>
                        <span className={styles.stepLevel}>기본</span>
                        <span className={styles.stepValue}>6만원</span>
                        <div className={styles.stepDot}></div>
                    </div>
                    <div className={`${styles.stepNode} roadStep`}>
                        <span className={styles.stepLevel}>1단계 UP</span>
                        <span className={styles.stepValue}>7만원</span>
                        <div className={styles.stepDot}></div>
                    </div>
                    <div className={`${styles.stepNode} roadStep`}>
                        <span className={styles.stepLevel}>2단계 UP</span>
                        <span className={styles.stepValue}>8만원</span>
                        <div className={styles.stepDot}></div>
                    </div>
                    <div className={`${styles.stepNode} roadStep`}>
                        <span className={styles.stepLevel}>3단계 UP</span>
                        <span className={styles.stepValue}>9만원</span>
                        <div className={styles.stepDot}></div>
                    </div>
                    <div className={`${styles.stepNode} roadStep`}>
                        <span className={styles.stepLevel}>최종 <span style={{ color: "#ef4444", fontSize: "0.6rem", verticalAlign: "top", fontWeight: "bold" }}>GOAL</span></span>
                        <span className={styles.stepValue}>10만원</span>
                        <div className={styles.stepDot}></div>
                    </div>
                </div>
            </section>

            {/* SECTION 7: CORE GOALS & VISION */}
            <section className={styles.goalsSection} ref={goalsRef}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        함께봄이 <span>나아갈 미래</span>
                    </h2>
                    <p style={{ letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}>CORE GOALS & VISION</p>
                    <p style={{ marginTop: "1rem", fontSize: "1.2rem", fontWeight: 300 }}>
                        우리는 <span style={{ fontWeight: 700, borderBottom: "2px solid var(--accent-color)" }}>데이터와 성과</span>로 증명하는 콘텐츠 그룹이 될 것입니다.
                    </p>
                </div>

                <div className={styles.goalsGrid}>
                    <div className={`${styles.goalCard} goalCardItem`}>
                        <div className={styles.goalLabel}>인적 인프라</div>
                        <div className={styles.goalValueWrap}>
                            <div className={`${styles.goalValue} gCount`} data-target="100">0</div>
                            <div className={styles.goalUnit}>명+</div>
                        </div>
                        <div className={styles.goalDesc}>전문 크리에이터 100인 이상 양성 및 다이나믹 네트워크 구축</div>
                    </div>

                    <div className={`${styles.goalCard} goalCardItem`}>
                        <div className={styles.goalLabel}>콘텐츠 경쟁력</div>
                        <div className={styles.goalValueWrap}>
                            <div className={`${styles.goalValue} gCount`} data-target="10000">0</div>
                            <div className={styles.goalUnit}>건</div>
                        </div>
                        <div className={styles.goalDesc}>연간 3,000~10,000건 이상의 고품질 영상 제작 데이터 확보</div>
                    </div>

                    <div className={`${styles.goalCard} goalCardItem`}>
                        <div className={styles.goalLabel}>비즈니스 확장</div>
                        <div className={styles.goalValueWrap}>
                            <div className={`${styles.goalValue} gCount`} data-target="30">0</div>
                            <div className={styles.goalUnit}>곳+</div>
                        </div>
                        <div className={styles.goalDesc}>30개 이상의 전략적 파트너사(외주 업체) 확보 및 협업</div>
                    </div>

                    <div className={`${styles.goalCard} goalCardItem`}>
                        <div className={styles.goalLabel}>사회적 확산</div>
                        <div className={styles.goalValueWrap}>
                            <div className={`${styles.goalValue} gCount`} data-target="1">0</div>
                            <div className={styles.goalUnit}>억원</div>
                        </div>
                        <div className={styles.goalDesc}>대형 영상 공모전 개최를 통한 창작 생태계 및 나눔가치 활성화</div>
                    </div>
                </div>
            </section>

            {/* SECTION 8: NATIONAL STARTUP ERA (NEWS) */}
            <section className={styles.newsSection} ref={newsRef}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle} style={{ color: "#ef4444" }}>
                        지금은 <span>국가 창업 시대</span>
                    </h2>
                </div>

                <div className={`${styles.newsContainer} newsFrame`}>
                    <div className={styles.newsBg}>
                        <div className={styles.newsImagePlaceholder}></div>
                        <div className={styles.newsChannelTag}>MBC NEWS</div>

                        <div className={styles.newsLowerThirds}>
                            <h3 className={`${styles.newsHeadline} newsTts`}>"월급쟁이 시대는 끝났습니다"</h3>
                            <p className={`${styles.newsSubhead} newsTts`}>이재명 대통령이 던진 해법</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 9: SCHEDULE & CTA */}
            <section className={styles.scheduleSection} ref={ctaRef}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        향후 <span>일정 안내</span>
                    </h2>
                    <p style={{ letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", marginBottom: "3rem" }}>SCHEDULE & CTA</p>
                    <h3 style={{ fontSize: "2.5rem", fontWeight: 800 }}>"함께라면 <span style={{ color: "var(--accent-color)" }}>현실</span>이 됩니다"</h3>
                </div>

                <div className={styles.scheduleGrid}>
                    <div className={`${styles.scheduleCard} schCard`}>
                        <div className={styles.schIcon}>🤝</div>
                        <div className={styles.schTitle} style={{ color: "#3b82f6" }}>개별/그룹 미팅</div>
                        <div className={styles.schDesc}>영상 제작과 교육에 대한<br />구체적 논의</div>
                    </div>
                    <div className={`${styles.scheduleCard} schCard`}>
                        <div className={styles.schIcon}>📢</div>
                        <div className={styles.schTitle} style={{ color: "#a855f7" }}>공식 공지</div>
                        <div className={styles.schDesc}>상세 일정 및 프로그램<br />곧 안내 예정</div>
                    </div>
                    <div className={`${styles.scheduleCard} schCard`}>
                        <div className={styles.schIcon}>📩</div>
                        <div className={styles.schTitle} style={{ color: "#ef4444" }}>사전 문의</div>
                        <div className={styles.schDesc}>저녁시간 언제든지<br />개별 문의 환영</div>
                    </div>
                </div>

                <div className={styles.ctaBanner} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <div className={styles.ctaText}>
                        ARE YOU READY FOR SPRING?<br />
                        <span>함께봄과 함께, 여러분의 진정한 봄을 만듭시다.</span>
                    </div>
                    <div className={styles.ctaArrow}>→</div>
                </div>
            </section>

            {/* FOOTER PADDING */}
            <div style={{ height: "10vh", background: "#000" }}></div>
        </div>
    );
}
