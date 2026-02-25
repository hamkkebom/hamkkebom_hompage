"use client";

import GNB from "@/components/GNB";
import OrganizationSection from "@/components/OrganizationSection";

export default function OrganizationPage() {
    return (
        <main style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
            <GNB />

            <div style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "calc(100vh - 10vh)" }}>
                <OrganizationSection />
            </div>

            {/* Footer Padding */}
            <div style={{ height: "10vh", backgroundColor: "transparent" }}></div>
        </main>
    );
}
