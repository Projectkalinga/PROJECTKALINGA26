import OverviewContent from '@/components/OverviewContent';

// --- Static Site Generation Config ---
export const revalidate = 3600; // Revalidate every hour

export default function OverviewPage() {
    return <OverviewContent />;
}
