"use client";

import dynamic from 'next/dynamic';

const LocationMap = dynamic(() => import('@/components/map/LocationMap'), {
    ssr: false,
});

export default function LocationMapWrapper() {
    return <LocationMap />;
}
