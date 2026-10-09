import SiteHeader from "@/components/renewal/SiteHeader";
import SiteFooter from "@/components/renewal/SiteFooter";
import ApplyForm, { type SessionOption } from "@/components/join/ApplyForm";
import styles from "@/components/join/join.module.css";
import { createPublicClient } from "@/lib/supabase/public";
import { formatSessionDate, todayInSeoul } from "@/lib/briefing";

// 공개 일정은 5분마다 다시 불러온다
export const revalidate = 300;

async function getOpenSessions(): Promise<SessionOption[]> {
  try {
    const { data, error } = await createPublicClient()
      .from("briefing_sessions")
      .select("id, starts_on, label, capacity")
      .eq("is_open", true)
      .gte("starts_on", todayInSeoul())
      .order("starts_on", { ascending: true });
    if (error || !data) return [];
    return data.map((s) => ({ id: s.id, startsOn: s.starts_on, label: s.label, capacity: s.capacity }));
  } catch {
    return [];
  }
}

const TOPICS = {
  basic: ["상담사 소개 영상", "사주천궁 브랜딩", "상담 스타일 소개"],
  extra: ["상담 사례", "상담사 인생 스토리", "추억송"],
};

const VIDEO_SET = [
  { length: "6초", count: 4 },
  { length: "15초", count: 4 },
  { length: "30초", count: 1 },
  { length: "세로형 10~30초", count: 3 },
];

const PROCESS = [
  {
    title: "영상상담사로 등록",
    period: "시작",
    desc: "상담 플랫폼에 영상상담사로 등록합니다. 전화상담을 통해 영상 의뢰를 받는 구조예요. 처음이라 막막하지 않도록 함께봄이 먼저 등록해 예시로 보여 드립니다.",
  },
  {
    title: "1차 매칭 · 1차 제작",
    period: "2주 이내 · 3편",
    desc: "상담사와 매칭되면 2주 안에 영상 3편을 먼저 만듭니다. 이 결과물을 보고 상담사가 최종 결정해요.",
  },
  {
    title: "2차 제작",
    period: "3주 이내 · 5~9편",
    desc: "상담사가 확정되면 본격적으로 제작합니다. 3주 안에 5~9편을 완성해요.",
  },
  {
    title: "3차 제작",
    period: "4주 이내 · 4편",
    desc: "마지막으로 4주 안에 4편을 더해 상담사의 영상 구성을 마무리합니다.",
  },
];

const INCOME = [
  {
    no: "01",
    title: "영상 제작료",
    desc: "상담사 브랜딩 영상을 제작하고 받는 제작료입니다. 소득 구조의 기본이 되는 부분이에요.",
  },
  {
    no: "02",
    title: "영상상담사 상담 수익",
    desc: "상담 플랫폼에 영상상담사로 등록해, 전화상담으로 들어오는 영상 의뢰를 직접 받으며 생기는 수익입니다.",
  },
  {
    no: "03",
    title: "성과 인센티브 도전",
    desc: "만든 영상이 성과를 내면 함께 나눕니다.",
    points: [
      "유튜브 광고 집행 지원",
      "상담 목표시간 향상에 따른 인센티브",
      "조회수 성과 수익은 함께봄과 5:5 분배",
    ],
  },
];

const EXTRA_INCOME = [
  "헐버트 인물 해설사",
  "헐버트 한옥 파트타이머 (잡화점·카페)",
  "AI 스튜디오 현장 제작",
  "한옥 수리·보수 현장 파트타임",
  "협력 기업 아르바이트·계약직·정규직 연계",
  "영상제작 공동 사무실 참여",
  "공모전 상금 도전 · 기획 운영 참여",
  "추가 영상 제작 (기도송 등)",
];

const LADDER = [
  { step: "1단계", title: "영상 제작", desc: "상담사와 매칭해 숏폼·광고 영상을 제작합니다." },
  { step: "2단계", title: "인센티브 도전", desc: "광고와 조회수, 상담 성과에 따른 인센티브에 도전합니다." },
  {
    step: "3단계",
    title: "나투사",
    desc: "함께봄의 인적 인프라와 노하우로, 안전하게 내 일자리를 만들어 보는 창업 체험입니다.",
  },
  { step: "4단계", title: "꿈투사", desc: "체험을 넘어 실제 창업에 도전할 기회를 엽니다." },
  {
    step: "5단계",
    title: "또 하나의 함께봄",
    desc: "새 법인·사단법인을 세우고, 7일경제연구소에 함께 참여합니다.",
  },
];

const VALUES = [
  {
    title: "내 삶과 꿈을 위한 시간",
    desc: "주 4~3일 근무를 지향합니다. 일하는 시간만큼 나를 위한 시간도 소중하니까요.",
  },
  {
    title: "옆 코너도 밀어주는 상생주의",
    desc: "내 코너가 잘되면 옆 코너도 함께 밀어줍니다. 혼자 앞서기보다 같이 오래 가는 길을 택합니다.",
  },
  {
    title: "느슨하지만 강력한 연대",
    desc: "언제든 와도 좋고, 떠나도 괜찮습니다. 묶어 두지 않아도 서로를 믿고 돕는 관계를 만듭니다.",
  },
];

const VISION = [
  {
    title: "고민톡톡",
    desc: "상담사들이 모여 온라인 1:1 전화상담으로 고민을 나누는 사람과 연결됩니다.",
  },
  {
    title: "AI 콘텐츠 회사",
    desc: "모인 제작자들과 함께 AI 드라마·AI 영화를 만들고, AI 스타를 발굴하고 키웁니다.",
  },
  {
    title: "일자리를 지키는 동반자",
    desc: "AI 저작권 시대에 우리가 만든 것의 권한과, 사람의 진짜 일자리를 함께 지킵니다.",
  },
];

const FAQ = [
  {
    q: "제작자와 상담사는 어떻게 소통하나요?",
    a: "상담사와 상담을 마친 뒤, 상담 내용을 별도 사이트에 기록합니다. 이 기록은 함께봄도 함께 확인하기 때문에 제작 방향이 어긋나지 않도록 중간에서 도와드려요.",
  },
  {
    q: "영상 수정은 어떻게 하나요?",
    a: "별님(제작자)이 영상을 만들면 함께봄과 프로젝트 리더가 먼저 확인합니다. 확인 과정에서 나온 수정 사항을 반영한 뒤 상담사에게 전달해요.",
  },
  {
    q: "매칭이 안 되면요?",
    a: "다음 매칭설명회에 다시 참여하실 수 있어요. 기다리는 동안 사주천궁 브랜딩 영상부터 먼저 시작할 수도 있습니다.",
  },
  {
    q: "경험이 없어도 되나요?",
    a: "함께봄이 AI 영상 교육을 함께 제공합니다. 설명회에서 진행 방식과 필요한 준비를 충분히 확인하신 뒤 참여 여부를 정하시면 돼요.",
  },
  {
    q: "근무 방식은요?",
    a: "함께봄은 주 4~3일 근무를 지향합니다. 구체적인 일정과 방식은 매칭설명회에서 함께 이야기해요.",
  },
  {
    q: "설명회 시간과 장소는 어떻게 알 수 있나요?",
    a: "신청해 주신 연락처로 개별 안내해 드립니다. 일정이 아직 정해지지 않았다면 '일정 미정'을 골라 주세요. 다음 설명회가 열릴 때 먼저 알려 드릴게요.",
  },
];

const AGENDA = ["진행 과정과 제작 일정", "영상 구성과 제작 방식", "소득 구조와 구체적인 조건", "상담사 매칭 방식", "질의응답"];

export default async function JoinPage() {
  const sessions = await getOpenSessions();

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main id="main-content">
        {/* a. 히어로 */}
        <section className={styles.hero} aria-labelledby="join-hero-title">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <p className={styles.eyebrow}>크리에이터 모집 · 매칭설명회</p>
              <h1 id="join-hero-title" className={styles.heroTitle}>
                내 손으로 만드는 소득,
                <br />
                <span className={styles.accent}>함께 만드는 일자리</span>
              </h1>
              <p className={styles.heroLead}>
                한 번 하고 끝나는 일이 아니라, 계속 이어지는 소득 구조를 함께 만듭니다. 함께봄 매칭설명회는 AI 영상으로
                직접 소득을 만들고, 지속 가능한 일자리를 함께 일궈 갈 사람들이 모이는 자리입니다.
              </p>
              <div className={styles.heroCtas}>
                <a href="#apply" className={styles.btnPrimary}>
                  매칭설명회 신청하기
                </a>
                <a href="#process" className={styles.btnGhost}>
                  어떻게 진행되나요?
                </a>
              </div>
            </div>

            <aside className={styles.heroCard} aria-label="매칭설명회 일정">
              <p className={styles.heroCardHead}>다가오는 매칭설명회</p>
              {sessions.length > 0 ? (
                <ul className={styles.heroSessions}>
                  {sessions.map((s) => (
                    <li key={s.id}>
                      <strong>{formatSessionDate(s.startsOn)}</strong>
                      <span>{s.label}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.heroEmpty}>다음 일정을 준비하고 있어요. 신청해 두시면 가장 먼저 알려 드릴게요.</p>
              )}
              <p className={styles.heroCardNote}>시간·장소는 신청 후 개별 안내</p>
            </aside>
          </div>
        </section>

        {/* b. 함께봄은 */}
        <section className={styles.section} aria-labelledby="join-about-title">
          <div className={styles.container}>
            <p className={styles.eyebrow}>함께봄은</p>
            <h2 id="join-about-title" className={styles.statement}>
              취업은 어렵고 창업은 두려운 크리에이터에게,
              <br className={styles.brDesktop} /> <span className={styles.accent}>안전한 일자리와 창업의 기회</span>를
              만드는 플랫폼입니다.
            </h2>
            <ul className={styles.aboutPoints}>
              <li>
                <strong>혼자가 아니게</strong>
                <span>함께 제작하고, 함께 확인하고, 함께 성장하는 동료가 있습니다.</span>
              </li>
              <li>
                <strong>안전하게</strong>
                <span>함께봄의 인프라와 노하우 위에서 부담을 줄이고 시작합니다.</span>
              </li>
              <li>
                <strong>오래가게</strong>
                <span>한 번의 일감이 아니라 이어지는 일과 소득을 만듭니다.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* c. 무엇을 만드나요 */}
        <section className={`${styles.section} ${styles.sectionTint}`} aria-labelledby="join-make-title">
          <div className={styles.container}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>무엇을 만드나요</p>
              <h2 id="join-make-title" className={styles.sectionTitle}>
                AI 영상으로
                <br />
                상담사의 브랜드를 만듭니다
              </h2>
              <p className={styles.sectionLead}>
                상담 플랫폼 &lsquo;사주천궁&rsquo;에서 활동하는 상담사의 브랜딩 영상을 AI로 제작합니다. 상담사가 어떤
                사람인지, 어떻게 상담하는지가 영상으로 전해지도록 만들어요.
              </p>
            </header>

            <div className={styles.makeGrid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>영상 주제</h3>
                <p className={styles.topicHead}>기본 주제</p>
                <ul className={styles.chips}>
                  {TOPICS.basic.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className={styles.topicHead}>추가 주제</p>
                <ul className={`${styles.chips} ${styles.chipsSoft}`}>
                  {TOPICS.extra.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.card}>
                <h3 className={styles.cardTitle}>상담사 1명당 영상 구성</h3>
                <ul className={styles.videoSet}>
                  {VIDEO_SET.map((v) => (
                    <li key={v.length}>
                      <span>{v.length}</span>
                      <strong>{v.count}편</strong>
                    </li>
                  ))}
                </ul>
                <p className={styles.videoTotal}>
                  <span>합계</span>
                  <strong>총 12편</strong>
                </p>
                <p className={styles.cardNote}>역량에 따라 상담사 3~5명을 추가로 매칭하는 것도 협의할 수 있어요.</p>
              </div>
            </div>
          </div>
        </section>

        {/* d. 진행 과정 */}
        <section id="process" className={`${styles.section} ${styles.anchor}`} aria-labelledby="join-process-title">
          <div className={styles.container}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>진행 과정</p>
              <h2 id="join-process-title" className={styles.sectionTitle}>
                등록부터 마지막 영상까지,
                <br />
                이렇게 진행돼요
              </h2>
            </header>

            <ol className={styles.timeline}>
              {PROCESS.map((p, i) => (
                <li key={p.title} className={styles.timelineItem}>
                  <span className={styles.timelineNo} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className={styles.timelineBody}>
                    <p className={styles.timelinePeriod}>{p.period}</p>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className={styles.callout}>
              <strong>매칭이 되지 않아도 괜찮아요.</strong> 다음 설명회에 다시 참여하거나, 사주천궁 브랜딩 영상부터 먼저
              시작할 수 있어요.
            </p>
          </div>
        </section>

        {/* e. 소득 구조 */}
        <section className={`${styles.section} ${styles.sectionTint}`} aria-labelledby="join-income-title">
          <div className={styles.container}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>소득 구조</p>
              <h2 id="join-income-title" className={styles.sectionTitle}>
                소득은
                <br />
                이렇게 만들어집니다
              </h2>
              <p className={styles.sectionLead}>
                제작료 하나에만 기대지 않도록, 여러 갈래의 소득을 함께 만들어 갈 수 있게 구조를 설계했어요.
              </p>
            </header>

            <div className={styles.incomeGrid}>
              {INCOME.map((item) => (
                <article key={item.no} className={styles.card}>
                  <span className={styles.cardNo}>{item.no}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.desc}</p>
                  {item.points && (
                    <ul className={styles.checkList}>
                      {item.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}

              <article className={`${styles.card} ${styles.incomeWide}`}>
                <span className={styles.cardNo}>04</span>
                <h3 className={styles.cardTitle}>추가 소득 기회</h3>
                <p className={styles.cardText}>영상 밖에서도, 함께봄이 여는 현장과 프로젝트에 참여할 수 있어요.</p>
                <ul className={styles.chips}>
                  {EXTRA_INCOME.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            </div>

            <p className={styles.notice} role="note">
              소득은 개인의 제작량과 성과에 따라 달라지며 보장되지 않습니다. 구체적인 조건은 매칭설명회에서 안내합니다.
            </p>
          </div>
        </section>

        {/* f. 상생 성장 5단계 */}
        <section className={styles.section} aria-labelledby="join-ladder-title">
          <div className={styles.container}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>성장 단계</p>
              <h2 id="join-ladder-title" className={styles.sectionTitle}>
                단순 외주가 아닌,
                <br />
                상생 성장
              </h2>
              <p className={styles.sectionLead}>
                영상을 납품하고 끝나는 관계가 아닙니다. 한 단계씩 올라가며 내 일자리, 그리고 내 회사를 함께 만들어 갑니다.
              </p>
            </header>

            <ol className={styles.ladder}>
              {LADDER.map((l) => (
                <li key={l.step} className={styles.ladderStep}>
                  <p className={styles.ladderNo}>{l.step}</p>
                  <h3>{l.title}</h3>
                  <p>{l.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* g. 가치 */}
        <section className={`${styles.section} ${styles.sectionSpring}`} aria-labelledby="join-values-title">
          <div className={styles.container}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>우리가 추구하는 가치</p>
              <h2 id="join-values-title" className={styles.sectionTitle}>
                경쟁을 넘어
                <br />
                상생으로
              </h2>
            </header>
            <div className={styles.valueGrid}>
              {VALUES.map((v, i) => (
                <article key={v.title} className={styles.valueCard}>
                  <span className={styles.cardNo}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* h. 비전 */}
        <section className={styles.vision} aria-labelledby="join-vision-title">
          <div className={styles.container}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>비전</p>
              <h2 id="join-vision-title" className={styles.sectionTitle}>
                AI 시대의 일자리를 지키는
                <br />
                콘텐츠 제국
              </h2>
            </header>
            <div className={styles.visionGrid}>
              {VISION.map((v) => (
                <article key={v.title} className={styles.visionItem}>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* i. FAQ */}
        <section className={styles.section} aria-labelledby="join-faq-title">
          <div className={`${styles.container} ${styles.faqWrap}`}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>자주 묻는 질문</p>
              <h2 id="join-faq-title" className={styles.sectionTitle}>
                궁금한 점을
                <br />
                모았어요
              </h2>
            </header>
            <div className={styles.faqList}>
              {FAQ.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary>
                    <span>{f.q}</span>
                    <span className={styles.faqIcon} aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* j. 일정 + 신청 */}
        <section
          id="apply"
          className={`${styles.section} ${styles.sectionTint} ${styles.anchor}`}
          aria-labelledby="join-apply-title"
        >
          <div className={`${styles.container} ${styles.applyGrid}`}>
            <div>
              <p className={styles.eyebrow}>일정 · 신청</p>
              <h2 id="join-apply-title" className={styles.sectionTitle}>
                매칭설명회
                <br />
                신청하기
              </h2>
              <p className={styles.sectionLead}>
                원하는 날짜를 골라 신청해 주세요. 시간과 장소는 신청 후 남겨 주신 연락처로 개별 안내해 드립니다.
              </p>
              <div className={styles.agenda}>
                <p className={styles.agendaHead}>설명회에서 안내하는 내용</p>
                <ul className={styles.checkList}>
                  {AGENDA.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <p className={styles.applyContact}>
                문의 <a href="mailto:info@hamkkebom.com">info@hamkkebom.com</a>
              </p>
            </div>

            <div className={styles.formCard}>
              <ApplyForm sessions={sessions} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
