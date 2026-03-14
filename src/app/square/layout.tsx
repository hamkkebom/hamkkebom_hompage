import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "광장",
  description: "함께봄의 창의적인 인터랙티브 경험 공간",
  alternates: { canonical: "https://hamkkebom.com/square" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SquareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
