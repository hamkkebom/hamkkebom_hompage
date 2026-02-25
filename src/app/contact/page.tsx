"use client";

import { useState, useRef, useEffect } from "react";
import GNB from "@/components/GNB";
import Link from "next/link";
import styles from "./contact.module.css";
import gsap from "gsap";

interface FormData {
    name: string;
    company: string;
    phone: string;
    email: string;
    projectType: string;
    budget: string;
    deadline: string;
    reference: string;
    message: string;
    privacyConsent: boolean;
    honeypot: string;
}

const initialForm: FormData = {
    name: "", company: "", phone: "", email: "",
    projectType: "", budget: "", deadline: "", reference: "",
    message: "", privacyConsent: false, honeypot: "",
};

export default function ContactPage() {
    const [form, setForm] = useState<FormData>(initialForm);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const formLoadedAt = useRef(Date.now());

    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // GSAP 입장 애니메이션
    useEffect(() => {
        formLoadedAt.current = Date.now();

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 왼쪽 텍스트 애니메이션
            tl.fromTo(".anim-text",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
            );

            // 폼 컨테이너 글래스 효과 페이드인
            tl.fromTo("." + styles.formContainer,
                { y: 40, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2 },
                "-=0.6"
            );

            // 폼 필드 순차적 등장
            tl.fromTo(".anim-field",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                "-=0.8"
            );
        }, containerRef);

        return () => ctx.revert();
    }, [status]); // status가 'idle'로 돌아올 때도 다시 실행될 수 있게 처리

    // GSAP 성공 화면 파티클 & 등장 애니메이션
    useEffect(() => {
        if (status === "success") {
            let ctx = gsap.context(() => {
                gsap.fromTo(".success-anim",
                    { scale: 0.8, opacity: 0, y: 30 },
                    { scale: 1, opacity: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.5)", stagger: 0.2 }
                );
            });
            return () => ctx.revert();
        }
    }, [status]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 제출 버튼 클릭 애니메이션 (GSAP 펄스)
        gsap.to(".submit-btn", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, formLoadedAt: formLoadedAt.current }),
            });
            const data = await res.json();

            if (!res.ok) {
                setStatus("error");
                setErrorMsg(data.error || "문의 접수에 실패했습니다.");
                return;
            }

            // 성공 시 페이드아웃 후 상태 변경
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    setStatus("success");
                    setForm(initialForm);
                    gsap.to(containerRef.current, { opacity: 1, duration: 0.5 });
                }
            });

        } catch {
            setStatus("error");
            setErrorMsg("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    /* ─── 성공 화면 (엔드크레딧 스크린) ─── */
    if (status === "success") {
        return (
            <div className={styles.container} ref={containerRef}>
                <div className={styles.noiseOverlay}></div>
                <div className={styles.spotlight}></div>
                <GNB />
                <main className={styles.successContainer}>
                    <div className={`${styles.successIcon} success-anim`}>
                        <svg viewBox="0 0 50 50">
                            <path d="M14 27l8 8 16-16" />
                        </svg>
                    </div>
                    <h1 className={`${styles.successTitle} success-anim`}>접수 완료</h1>
                    <p className={`${styles.successDesc} success-anim`}>
                        성공적으로 프로젝트 문의가 전달되었습니다.<br />
                        감독의 시선으로 검토 후, 24시간 이내에 회신드리겠습니다.
                    </p>
                    <Link href="/" className={`${styles.submitBtn} success-anim`} style={{ textDecoration: "none", display: "inline-block" }}>
                        메인으로 돌아가기
                    </Link>
                </main>
            </div>
        );
    }

    /* ─── 메인 폼 화면 (영화관 감성 UI) ─── */
    return (
        <div className={styles.container} ref={containerRef}>
            {/* 시네마틱 배경 효과 */}
            <div className={styles.noiseOverlay}></div>
            <div className={styles.spotlight}></div>
            <GNB />

            <main className={styles.contentWrapper}>

                {/* ── 왼쪽: 영화 타이틀 아트웍 ── */}
                <div className={styles.leftSection}>
                    <div className={`anim-text ${styles.directorTag}`}>Director's Cut</div>
                    <h1 className={`anim-text ${styles.mainTitle}`}>
                        당신의 브랜드를<br />
                        <span className={styles.highlight}>영화로 만들다</span>
                    </h1>
                    <p className={`anim-text ${styles.description}`}>
                        단순한 홍보 영상을 넘어, 관객의 마음을 움직이는 100년 가는 작품을 제작합니다.<br /><br />
                        압도적인 퀄리티와 예술적 감각으로 당신의 이야기를 스크린에 올리겠습니다. 아래 폼을 통해 프로젝트의 큐사인을 보내주세요.
                    </p>
                </div>

                {/* ── 오른쪽: 글래스모피즘 폼 ── */}
                <div className={styles.formContainer}>
                    <h2 className={`anim-text ${styles.formTitle}`}>PROJECT INQUIRY</h2>

                    {status === "error" && (
                        <div className={styles.errorMsg}>
                            ⚠️ {errorMsg}
                        </div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} className={styles.formGrid}>
                        {/* 허니팟 (숨김) */}
                        <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", opacity: 0 }} />

                        <div className="anim-field">
                            <FloatingInput name="name" label="이름 / 직급 *" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="anim-field">
                            <FloatingInput name="company" label="회사명 / 브랜드명 *" value={form.company} onChange={handleChange} required />
                        </div>

                        <div className={`${styles.formRow} anim-field`}>
                            <FloatingInput name="phone" type="tel" label="연락처 *" value={form.phone} onChange={handleChange} required />
                            <FloatingInput name="email" type="email" label="이메일 *" value={form.email} onChange={handleChange} required />
                        </div>

                        <div className="anim-field">
                            <FloatingSelect name="projectType" label="관심 있는 제작 분야 *" value={form.projectType} onChange={handleChange} required
                                options={[
                                    { value: "youtube", label: "유튜브 마케팅 (ROAS 연계)" },
                                    { value: "cf", label: "TV/온라인 CF (실사 촬영)" },
                                    { value: "corporate", label: "기업/브랜드 홍보영상" },
                                    { value: "3d", label: "3D/2D 애니메이션" },
                                    { value: "other", label: "기타" }
                                ]}
                            />
                        </div>

                        <div className={`${styles.formRow} anim-field`}>
                            <FloatingSelect name="budget" label="예상 가용 예산 *" value={form.budget} onChange={handleChange} required
                                options={[
                                    { value: "500", label: "500만 원 이하" },
                                    { value: "1000", label: "500만 원 ~ 1,000만 원" },
                                    { value: "3000", label: "1,000만 원 ~ 3,000만 원" },
                                    { value: "5000+", label: "3,000만 원 이상 (대형 프로젝트)" },
                                    { value: "undecided", label: "아직 미정 (상담 후 결정)" }
                                ]}
                            />
                            <FloatingInput name="deadline" type="date" label="희망 납품일" value={form.deadline} onChange={handleChange} />
                        </div>

                        <div className="anim-field">
                            <FloatingInput name="reference" type="url" label="원하시는 느낌의 레퍼런스 링크" value={form.reference} onChange={handleChange} />
                        </div>

                        <div className="anim-field">
                            <FloatingTextarea name="message" label="기타 상세 문의 내용 *" value={form.message} onChange={handleChange} required />
                        </div>

                        <label className={`${styles.checkboxGroup} anim-field`}>
                            <input type="checkbox" name="privacyConsent" checked={form.privacyConsent} onChange={handleChange} required className={styles.checkboxInput} />
                            <div className={styles.checkboxCustom}>
                                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                            </div>
                            <span className={styles.checkboxText}>
                                개인정보 수집 및 이용에 동의합니다.<br />
                                <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>수집된 정보는 프로젝트 상담 목적으로만 사용되며, 상담 완료 후 파기됩니다.</span>
                            </span>
                        </label>

                        <button type="submit" disabled={status === "loading"} className={`anim-field ${styles.submitBtn} submit-btn`}>
                            {status === "loading" ? (
                                <><span className={styles.spinner}></span> 문의 접수 중...</>
                            ) : "문의 접수하기"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

/* ─── 재사용 컴포넌트 ─── */
function FloatingInput({ name, label, type = "text", value, onChange, required }: any) {
    const hasValue = value.length > 0;

    const dateStyle = type === 'date' ? {
        color: hasValue ? '#fff' : 'transparent',
        colorScheme: 'dark',
    } : {};

    return (
        <div className={styles.inputGroup}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`${styles.inputField} ${hasValue ? styles.hasValue : ""}`}
                placeholder=" "
                style={dateStyle}
            />
            <label className={styles.inputLabel}>{label}</label>
        </div>
    );
}

function FloatingTextarea({ name, label, value, onChange, required }: any) {
    const hasValue = value.length > 0;
    return (
        <div className={styles.inputGroup}>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`${styles.inputField} ${styles.textareaField} ${hasValue ? styles.hasValue : ""}`}
                placeholder=" "
            />
            <label className={styles.inputLabel}>{label}</label>
        </div>
    );
}

function FloatingSelect({ name, label, value, onChange, required, options }: any) {
    const hasValue = value !== "";
    return (
        <div className={styles.inputGroup}>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`${styles.inputField} ${styles.selectField} ${hasValue ? styles.hasValue : ""}`}
                style={!hasValue ? { color: 'transparent' } : {}}
            >
                <option value="" disabled style={{ display: 'none' }}></option>
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <label className={styles.inputLabel}>{label}</label>
        </div>
    );
}
