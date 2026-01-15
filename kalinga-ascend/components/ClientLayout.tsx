import { ThemeProvider } from '@/components/ThemeProvider';
import { MissionProvider, useMission } from '@/context/MissionContext';
import Splash from './Splash';
import { AnimatePresence } from 'framer-motion';

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { hasEntered } = useMission();

    return (
        <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) transition-colors duration-500">
            <AnimatePresence mode='wait'>
                {!hasEntered && <Splash key="splash" />}
            </AnimatePresence>
            <div className={`${!hasEntered ? 'h-0 overflow-hidden' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MissionProvider>
                <LayoutContent>{children}</LayoutContent>
            </MissionProvider>
        </ThemeProvider>
    );
}
