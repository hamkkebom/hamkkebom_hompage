export interface MediaPost {
  id: string;
  title: string;
  description: string;
  category: "exhibition" | "press" | "review" | "event";
  source: string;
  sourceUrl: string;
  thumbnail?: string;
  publishedAt: string;
  sourceColor: string;
}

export const MEDIA_POSTS: MediaPost[] = [
  // ── 언론보도 (최신순) ──
  {
    id: "koreareport-hulbert",
    title: "헐버트 아리랑 채보 130주년 기념 전시, 서촌 한옥에서 개최",
    description:
      "헐버트기념사업회가 아리랑 채보 130주년을 기념해 서울 종로구 서촌 한옥 함께봄에서 특별 전시를 개최한다.",
    category: "press",
    source: "코리아리포트",
    sourceUrl: "https://www.koreareport.co.kr/news/articleView.html?idxno=50050",
    publishedAt: "2026-03-20",
    sourceColor: "#2563eb",
  },
  {
    id: "yna-hulbert",
    title: "아리랑 채보 130주년 기념 전시 서촌 한옥서 개최",
    description:
      "연합뉴스가 보도한 헐버트 아리랑 채보 130주년 기념 전시 소식. 서울 종로구 서촌 한옥 함께봄에서 역사와 AI가 만나는 특별 전시.",
    category: "press",
    source: "연합뉴스",
    sourceUrl: "https://www.yna.co.kr/view/AKR20260318040400371",
    publishedAt: "2026-03-18",
    sourceColor: "#0033A0",
  },
  {
    id: "nate-hulbert",
    title: "아리랑 채보 130주년 기념 전시 서촌 한옥서 개최",
    description:
      "네이트 뉴스를 통해 보도된 헐버트 아리랑 채보 130주년 기념 전시 소식.",
    category: "press",
    source: "네이트 뉴스",
    sourceUrl: "https://news.nate.com/view/20260318n09373",
    publishedAt: "2026-03-18",
    sourceColor: "#EC2028",
  },
  {
    id: "thessen-hulbert",
    title: "헐버트가 남긴 아리랑, 130년 만에 재해석 — 함께봄 전시회 개최",
    description:
      "헐버트기념사업회가 아리랑 채보 130주년을 기념해 '아리랑, 한국의 보물을 찾다' 전시를 개최. AI 기반 영상·음악 재해석 선보여.",
    category: "press",
    source: "더쎈뉴스",
    sourceUrl: "https://www.mhns.co.kr/news/articleView.html?idxno=741872",
    publishedAt: "2026-03-18",
    sourceColor: "#E53E3E",
  },
  {
    id: "kukak-hulbert",
    title: "'푸른 눈의 한국인'이 기록한 아리랑, AI의 선율로 부활하다",
    description:
      "국악신문이 조명한 헐버트 아리랑 채보 130주년 전시. 한옥 함께봄에서 전통과 AI 기술이 어우러진 새로운 문화 경험.",
    category: "press",
    source: "국악신문",
    sourceUrl: "https://kukak21.com/news/42366",
    publishedAt: "2026-03-18",
    sourceColor: "#8B5CF6",
  },
  {
    id: "newstong-hulbert",
    title: "아리랑 채보 130주년, 서촌 한옥 함께봄 전시 소식",
    description:
      "뉴스통이 전한 헐버트 아리랑 채보 130주년 기념 전시 소식.",
    category: "press",
    source: "뉴스통",
    sourceUrl: "https://www.newstong.co.kr/view3.aspx?seq=14289291",
    publishedAt: "2026-03-18",
    sourceColor: "#4A90D9",
  },
  {
    id: "donga-hulbert",
    title: "헐버트 아리랑 채보 130주년 기념 전시, 서촌 한옥서 개막",
    description:
      "동아일보가 보도한 헐버트 아리랑 채보 130주년 기념 전시. 서울 종로구 서촌 한옥 함께봄에서 역사와 AI의 만남.",
    category: "press",
    source: "동아일보",
    sourceUrl: "https://www.donga.com/news/article/all/20260317/133549125/1",
    publishedAt: "2026-03-17",
    sourceColor: "#003A7D",
  },
  {
    id: "dongponews-hulbert",
    title: "아리랑, 한 미국인의 펜이 지켰습니다",
    description:
      "재외동포신문이 보도한 헐버트의 아리랑 채보 이야기. 130년 전 한 미국인이 기록한 한국의 소리가 다시 빛을 발한다.",
    category: "press",
    source: "재외동포신문",
    sourceUrl: "https://www.dongponews.net/news/articleView.html?idxno=56838",
    publishedAt: "2026-03-17",
    sourceColor: "#1D4ED8",
  },
  {
    id: "chosun-monthly-hulbert",
    title: "아리랑 채보 130주년, 헐버트와 한국 문화의 재조명",
    description:
      "월간조선이 심층 보도한 헐버트 아리랑 채보 130주년 기념 전시. 역사적 의미와 현대적 재해석을 다뤘다.",
    category: "press",
    source: "월간조선",
    sourceUrl: "https://monthly.chosun.com/client/mdaily/daily_view.asp?idx=23985&Newsnumb=20260323985",
    publishedAt: "2026-03-17",
    sourceColor: "#1E3A5F",
  },
  {
    id: "munhwa-hulbert",
    title: "BTS 아리랑 테마공연 출발은, 아리랑에 음계 붙여 K-컬처 확산시킨 헐버트",
    description:
      "문화일보가 조명한 헐버트의 아리랑 채보 130주년. BTS 아리랑 공연의 출발점이 된 헐버트의 업적을 재조명하는 전시.",
    category: "press",
    source: "문화일보",
    sourceUrl: "https://www.munhwa.com/article/11574958",
    publishedAt: "2026-03-16",
    sourceColor: "#B91C1C",
  },
  {
    id: "beyondpost-hulbert",
    title: "헐버트, 아리랑 채보 130주년 전시회 — 역사와 AI가 한옥에서 만나다",
    description:
      "아리랑 채보 130주년을 기념하는 특별 전시가 서울 종로구 서촌 한옥 함께봄에서 개최. 역사 자료와 AI 기반 영상·음악 재해석을 선보인다.",
    category: "press",
    source: "비욘드포스트",
    sourceUrl: "https://www.beyondpost.co.kr/view.php?ud=20260313160431806146a9e4dd7f_30",
    publishedAt: "2026-03-13",
    sourceColor: "#F59E0B",
  },

  // ── 포털/재배포 ──
  {
    id: "korean-net-hulbert",
    title: "아리랑 채보 130주년 기념 전시 — 재외동포뉴스",
    description:
      "재외동포청 공식 뉴스 채널에서 보도된 헐버트 아리랑 전시 소식.",
    category: "press",
    source: "재외동포뉴스",
    sourceUrl: "https://www.korean.net/web/main/bbs/pg_news_ok/27552",
    publishedAt: "2026-03-18",
    sourceColor: "#0E7490",
  },
  {
    id: "wowtoday-hulbert",
    title: "'아리랑 130주년' 기념 전시 서울 종로서 개최, AI 콘텐츠로 재해석",
    description:
      "와우투데이가 전한 아리랑 채보 130주년 전시 소식. AI 콘텐츠를 통한 역사의 현대적 재해석을 소개.",
    category: "press",
    source: "와우투데이",
    sourceUrl: "https://wowtoday.co.kr/View.aspx?No=4009089",
    publishedAt: "2026-03-18",
    sourceColor: "#0284C7",
  },

  // ── 블로그 리뷰 ──
  {
    id: "naver-blog-hlp5476",
    title: "주인장과나그네 — 헐버트 전시회 관람 후기",
    description:
      "서촌 한옥 함께봄에서 열린 헐버트 아리랑 채보 130주년 전시를 다녀온 블로그 관람 후기.",
    category: "review",
    source: "Naver Blog",
    sourceUrl: "https://blog.naver.com/hlp5476/224224861328",
    publishedAt: "2026-03-18",
    sourceColor: "#03C75A",
  },
  {
    id: "naver-blog-hamkkebom-review",
    title: "서촌 한옥 함께봄 — 전통과 현대가 만나는 문화 공간 탐방",
    description:
      "서울 종로구 서촌에 위치한 한옥 문화 공간 함께봄을 방문한 블로그 리뷰. 한옥의 고즈넉한 멋과 현대적 감각이 어우러진 공간에서의 특별한 경험.",
    category: "review",
    source: "Naver Blog",
    sourceUrl: "https://m.blog.naver.com/vuswl57/224231174733",
    publishedAt: "2026-03-15",
    sourceColor: "#03C75A",
  },

  // ── 전시회 ──
  {
    id: "ariang-130-exhibition",
    title: "아리랑 130년, 전 한국의 보물을 찾다 — 서울 종로구 서촌 한옥 함께봄 전시",
    description:
      "130여 년 전 한국의 문화를 세계에 알린 아리랑의 역사를 되짚는 전시. 서촌 한옥 함께봄에서 열린 특별 전시 관람 후기.",
    category: "review",
    source: "Facebook",
    sourceUrl:
      "https://www.facebook.com/mingyeong.o.599534/posts/2026-210%EC%84%9C%EC%9A%B8-%EC%A2%85%EB%A1%9C%EA%B5%AC-%EC%84%9C%EC%B4%8C-%ED%95%9C%EC%98%A5%ED%95%A8%EA%BB%98%EB%B4%84%EC%97%90%EC%84%9C-%EC%95%84%EB%A6%AC%EB%9E%91-130%EB%85%84-%EC%A0%84-%ED%95%9C%EA%B5%AD%EC%9D%98-%EB%B3%B4%EB%AC%BC%EC%9D%84-%EC%B0%BE%EB%8B%A4%EB%A5%BC-%EA%B4%80%EB%9E%8C%EC%9D%B4%EB%B2%88-%EC%A0%84%EC%8B%9C%EB%8A%94-130%EC%97%AC-%EB%85%84-%EC%A0%84-%ED%95%9C%EA%B5%AD%EC%9D%98-%EB%AC%B8%ED%99%94%EB%A5%BC-%EC%84%B8%EA%B3%84%EC%97%90-%EC%95%8C/3848874948755468/",
    publishedAt: "2026-02-10",
    sourceColor: "#1877F2",
  },
];

export function getMediaPostById(id: string): MediaPost | undefined {
  return MEDIA_POSTS.find((post) => post.id === id);
}
