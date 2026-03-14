import { Metadata } from 'next';
import GNB from '@/components/GNB';
import LocationMapWrapper from '@/components/map/LocationMapWrapper';

export const metadata: Metadata = {
  title: { absolute: "오시는 길 | 함께봄" },
  description:
    "서울 종로구 서촌에 위치한 함께봄 스튜디오 오시는 길을 안내해 드립니다. 평일 10:00-19:00 운영.",
  alternates: { canonical: "https://hamkkebom.com/about/location" },
  openGraph: {
    title: "오시는 길 | 함께봄",
    description: "서울 종로구 서촌에 위치한 함께봄 스튜디오 오시는 길 안내",
    url: "https://hamkkebom.com/about/location",
  },
};

export default function LocationPage() {
    return (
        <>
            <GNB />
            <main style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}>
                <LocationMapWrapper />
            </main>
        </>
    );
}
