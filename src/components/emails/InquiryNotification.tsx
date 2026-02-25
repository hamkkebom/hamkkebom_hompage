interface InquiryNotificationProps {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  budget: string;
  deadline?: string;
  reference?: string;
  message: string;
}

const projectTypeLabels: Record<string, string> = {
  youtube: "유튜브 마케팅 (ROAS 연계)",
  cf: "TV/온라인 CF (실사 촬영)",
  corporate: "기업/브랜드 홍보영상",
  "3d": "3D/2D 애니메이션",
  other: "기타",
};

const budgetLabels: Record<string, string> = {
  "500": "500만 원 이하",
  "1000": "500만 원 ~ 1,000만 원",
  "3000": "1,000만 원 ~ 3,000만 원",
  "5000+": "3,000만 원 이상 (대형 프로젝트)",
  undecided: "아직 미정 (상담 후 결정)",
};

export default function InquiryNotification({
  name,
  company,
  phone,
  email,
  projectType,
  budget,
  deadline,
  reference,
  message,
}: InquiryNotificationProps) {
  const projectTypeLabel = projectTypeLabels[projectType] || projectType;
  const budgetLabel = budgetLabels[budget] || budget;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
        padding: "0",
        margin: "0",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333333",
              margin: "0",
            }}
          >
            📬 새 문의가 접수되었습니다
          </h1>
        </div>

        {/* Contact Information Table */}
        <div style={{ marginBottom: "30px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <tbody>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#666666",
                    width: "30%",
                  }}
                >
                  이름
                </td>
                <td style={{ padding: "12px 0", color: "#333333" }}>{name}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#666666",
                  }}
                >
                  회사명
                </td>
                <td style={{ padding: "12px 0", color: "#333333" }}>
                  {company}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#666666",
                  }}
                >
                  전화번호
                </td>
                <td style={{ padding: "12px 0", color: "#333333" }}>{phone}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#666666",
                  }}
                >
                  이메일
                </td>
                <td style={{ padding: "12px 0", color: "#333333" }}>{email}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#666666",
                  }}
                >
                  프로젝트 유형
                </td>
                <td style={{ padding: "12px 0", color: "#333333" }}>
                  {projectTypeLabel}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#666666",
                  }}
                >
                  예상 예산
                </td>
                <td style={{ padding: "12px 0", color: "#333333" }}>
                  {budgetLabel}
                </td>
              </tr>
              {deadline && (
                <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td
                    style={{
                      padding: "12px 0",
                      fontWeight: "bold",
                      color: "#666666",
                    }}
                  >
                    예상 일정
                  </td>
                  <td style={{ padding: "12px 0", color: "#333333" }}>
                    {deadline}
                  </td>
                </tr>
              )}
              {reference && (
                <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td
                    style={{
                      padding: "12px 0",
                      fontWeight: "bold",
                      color: "#666666",
                    }}
                  >
                    참고 자료
                  </td>
                  <td style={{ padding: "12px 0", color: "#333333" }}>
                    {reference}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Message Section */}
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333333",
              marginBottom: "12px",
              marginTop: "0",
            }}
          >
            상세 문의 내용
          </h2>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "15px",
              borderRadius: "4px",
              color: "#333333",
              fontSize: "14px",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {message}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            borderTop: "2px solid #f0f0f0",
            paddingTop: "20px",
            color: "#999999",
            fontSize: "12px",
          }}
        >
          <p style={{ margin: "0" }}>함께봄 문의 알림 시스템</p>
        </div>
      </div>
    </div>
  );
}
