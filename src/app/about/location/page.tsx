import { Metadata } from 'next';
import LocationMap from '@/components/map/LocationMap';

export const metadata: Metadata = {
    title: '오시는 길 | 함께봄',
    description: '함께봄 오시는 길 안내',
};

export default function LocationPage() {
    return (
        <main style={{ backgroundColor: "#05080f", minHeight: "100vh" }}>
            <LocationMap />
        </main>
    );
}
