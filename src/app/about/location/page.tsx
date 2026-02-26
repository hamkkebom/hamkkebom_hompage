import { Metadata } from 'next';
import GNB from '@/components/GNB';
import LocationMapWrapper from '@/components/map/LocationMapWrapper';

export const metadata: Metadata = {
    title: '오시는 길 | 함께봄',
    description: '함께봄 오시는 길 안내',
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
