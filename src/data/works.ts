export interface WorkItem {
    id: string;             // URL 슬러그로 사용될 고유 ID
    cloudflareVideoId: string; // Cloudflare Stream 비디오 ID
    title: string;          // 프로젝트 제목
    client: string;         // 클라이언트명
    category: string;       // 제작 카테고리
    thumbnailUrl?: string;  // 커스텀 썸네일 (없을 경우 Cloudflare 자동 썸네일 사용)
}

// 실제 Cloudflare 비디오 ID로 교체해서 사용하세요.
export const WORKS_DATA: WorkItem[] = [
    {
        id: "project-alpha",
        cloudflareVideoId: "YOUR_VIDEO_ID_1", // 여기에 예: "5d5bc37ffcf54c9b82e996823bffbb81"
        title: "압도적인 시작, 알파 프로젝트",
        client: "Alpha Corp",
        category: "TV CF",
    },
    {
        id: "project-beta",
        cloudflareVideoId: "YOUR_VIDEO_ID_2",
        title: "세상을 바꾸는 혁신, 베타 캠페인",
        client: "Beta Solutions",
        category: "홍보영상",
    },
    {
        id: "project-gamma",
        cloudflareVideoId: "YOUR_VIDEO_ID_3",
        title: "시선을 사로잡는 3D 아나몰픽",
        client: "Gamma Entertainment",
        category: "3D 애니메이션",
    },
    {
        id: "project-delta",
        cloudflareVideoId: "YOUR_VIDEO_ID_4",
        title: "Z세대를 타겟팅한 숏폼 콘텐츠",
        client: "Delta Brand",
        category: "유튜브 마케팅",
    },
    {
        id: "project-epsilon",
        cloudflareVideoId: "YOUR_VIDEO_ID_5",
        title: "Next.js와 Cloudflare의 만남",
        client: "Epsilon Tech",
        category: "기타",
    },
    {
        id: "project-zeta",
        cloudflareVideoId: "YOUR_VIDEO_ID_6",
        title: "글로벌 패션 브랜드 런칭 필름",
        client: "Zeta Fashion",
        category: "TV CF",
    }
];

// 헬퍼 함수: ID로 특정 영상 찾기
export const getWorkById = (id: string) => {
    return WORKS_DATA.find((work) => work.id === id);
};
