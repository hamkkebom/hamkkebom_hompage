import GNB from "@/components/GNB";
import ContactAndFooter from "@/components/ContactAndFooter";

export const metadata = {
    title: "프로젝트 문의 - 함께봄",
    description: "함께봄과 함께 압도적인 비주얼의 영상을 만들어보세요.",
};

export default function ContactPage() {
    return (
        <>
            <GNB />
            <main style={{
                position: "relative",
                backgroundColor: "var(--bg-color)",
                minHeight: "100vh",
                paddingTop: "120px", // GNB 여백
            }}>
                <div style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "4rem 2rem",
                    display: "grid",
                    gridTemplateColumns: "1fr 1.2fr",
                    gap: "8rem",
                }}>
                    {/* Left Column: Info & Greeting */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                        <div>
                            <h1 style={{
                                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: "-0.04em",
                                marginBottom: "1.5rem"
                            }}>
                                새로운 시각,<br />
                                <span style={{ color: "var(--accent-color)" }}>압도적 결과물.</span>
                            </h1>
                            <p style={{
                                fontSize: "1.2rem",
                                color: "var(--text-secondary)",
                                lineHeight: 1.6,
                                maxWidth: "500px"
                            }}>
                                유튜브 광고부터 기업 홍보영상, 3D 애니메이션까지.
                                함깨봄과 함께 불가능을 현실로 만드세요.
                                아래 폼을 작성해 주시면 24시간 내에 회신해 드립니다.
                            </p>
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                            paddingTop: "3rem"
                        }}>
                            <div>
                                <h3 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                                    운영 시간
                                </h3>
                                <p style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                                    평일 10:00 - 19:00<br />
                                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>(주말 및 공휴일 휴무)</span>
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                                    다이렉트 컨택
                                </h3>
                                <p style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                                    hello@hamkkebom.com<br />
                                    02-1234-5678
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                                    오피스 위치
                                </h3>
                                <p style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                                    서울특별시 크리에이티브구<br />이노베이션대로 100, 15층
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Elaborate Form */}
                    <div>
                        <div style={{
                            background: "var(--surface-dark)",
                            padding: "4rem",
                            borderRadius: "16px",
                            border: "1px solid var(--border-color)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                        }}>
                            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2.5rem" }}>프로젝트 문의 작성</h2>

                            <form style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                {/* 기본 정보 */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>이름 / 직급 *</label>
                                        <input required type="text" placeholder="홍길동 대리" style={inputStyle} />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>회사명 / 브랜드명 *</label>
                                        <input required type="text" placeholder="(주)함께봄" style={inputStyle} />
                                    </div>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>연락처 *</label>
                                        <input required type="tel" placeholder="010-0000-0000" style={inputStyle} />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>이메일 *</label>
                                        <input required type="email" placeholder="hello@example.com" style={inputStyle} />
                                    </div>
                                </div>

                                {/* 프로젝트 상세 */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                                    <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>관심 있는 제작 분야 *</label>
                                    <select required defaultValue="" style={{ ...inputStyle, WebkitAppearance: "none", MozAppearance: "none", appearance: "none", background: "url(\"data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\") no-repeat right 10px center" }}>
                                        <option value="" disabled>선택해주세요</option>
                                        <option value="youtube">유튜브 마케팅 (ROAS 연계)</option>
                                        <option value="cf">TV/온라인 CF (실사 촬영)</option>
                                        <option value="corporate">기업/브랜드 홍보영상</option>
                                        <option value="3d">3D/2D 애니메이션</option>
                                        <option value="other">기타</option>
                                    </select>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>예상 가용 예산 *</label>
                                        <select required defaultValue="" style={{ ...inputStyle, WebkitAppearance: "none", MozAppearance: "none", appearance: "none", background: "url(\"data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\") no-repeat right 10px center" }}>
                                            <option value="" disabled>선택해주세요</option>
                                            <option value="500">500만 원 이하</option>
                                            <option value="1000">500만 원 ~ 1,000만 원</option>
                                            <option value="3000">1,000만 원 ~ 3,000만 원</option>
                                            <option value="5000+">3,000만 원 이상 (대형 프로젝트)</option>
                                            <option value="undecided">아직 미정 (상담 후 결정)</option>
                                        </select>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>희망 납품일</label>
                                        <input type="date" style={{ ...inputStyle, colorScheme: "dark" }} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>원하시는 느낌의 레퍼런스 링크 (유튜브/비메오 등)</label>
                                    <input type="url" placeholder="https://..." style={inputStyle} />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>기타 상세 문의 내용 *</label>
                                    <textarea required rows={4} placeholder="프로젝트의 목적, 타겟, 특별히 강조하고 싶은 부분 등을 편하게 적어주세요." style={{ ...inputStyle, resize: "vertical" }} />
                                </div>

                                <button
                                    type="submit"
                                    className="contact-submit-btn"
                                    style={{
                                        background: "var(--accent-color)", // 파란 포인트 컬러
                                        color: "#000",
                                        border: "none",
                                        padding: "1.2rem",
                                        fontSize: "1.1rem",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        marginTop: "1.5rem",
                                        borderRadius: "4px",
                                        transition: "all 0.3s ease",
                                        boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)"
                                    }}
                                >
                                    문의 접수 안내받기
                                </button>
                                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textAlign: "center", marginTop: "-1rem" }}>
                                    개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* 재사용 가능한 Footer 연결 */}
            {/* 주의: ContactAndFooter 에는 현재 Footer와 기존 문의폼이 합쳐져 있음. 
                차후 작업에서 분리할 예정이므로 일단 기존 컴포넌트를 사용하고 CSS로 문의폼을 가리거나 곧 Refactor 진행 */}
        </>
    );
}

// 스타일 객체
const inputStyle = {
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    padding: "1rem",
    color: "#fff",
    outline: "none",
    fontSize: "1rem",
    transition: "border-color 0.3s"
};
