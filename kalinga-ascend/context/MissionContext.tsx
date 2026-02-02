"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface MissionContextType {
    hasEntered: boolean;
    enterMission: () => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
    const [hasEntered, setHasEntered] = useState(false);

    const enterMission = () => {
        setHasEntered(true);
    };

    return (
        <MissionContext.Provider value={{ hasEntered, enterMission }}>
            {children}
        </MissionContext.Provider>
    );
}

export function useMission() {
    const context = useContext(MissionContext);
    if (context === undefined) {
        throw new Error('useMission must be used within a MissionProvider');
    }
    return context;
}
