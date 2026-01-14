"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { MissionProvider, useMission } from '@/context/MissionContext';
import Splash from './Splash';
import { AnimatePresence } from 'framer-motion';

type Theme = 'day' | 'night';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'night',
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

function LayoutContent({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('night');
    const { hasEntered } = useMission();

    useEffect(() => {
        // Apply theme to body
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'day' ? 'night' : 'day');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`min-h-screen ${theme === 'night' ? 'bg-[#0e100f]' : 'bg-martian-red'} transition-colors duration-500`}>
                <AnimatePresence mode='wait'>
                    {!hasEntered && <Splash key="splash" />}
                </AnimatePresence>
                <div className={`${!hasEntered ? 'h-0 overflow-hidden' : ''}`}>
                    {children}
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <MissionProvider>
            <LayoutContent>{children}</LayoutContent>
        </MissionProvider>
    );
}
