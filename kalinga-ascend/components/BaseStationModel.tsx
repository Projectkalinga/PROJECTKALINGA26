"use client";

import { useGLTF, Html } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface BaseStationModelProps {
    url?: string;
    setHoveredComponent?: (s: string | null) => void;
}

export default function BaseStationModel({
    url = "/models/base-station.glb",
    setHoveredComponent = () => { }
}: BaseStationModelProps) {
    const { scene } = useGLTF(url);
    const ref = useRef<THREE.Group>(null);

    return (
        <group ref={ref}>
            <primitive
                object={scene}
                onPointerOver={(e: any) => {
                    e.stopPropagation();
                    setHoveredComponent("BASE CHASSIS FRAME");
                }}
                onPointerOut={(e: any) => setHoveredComponent(null)}
            />

            {/* Interactive Hotspots */}
            <Html position={[0, 1, 0]}>
                <div
                    className="w-4 h-4 bg-yellow-500 rounded-full animate-ping cursor-pointer opacity-50 hover:opacity-100"
                    onMouseEnter={() => setHoveredComponent("HIGH-EFFICIENCY SOLAR ARRAY")}
                    onMouseLeave={() => setHoveredComponent(null)}
                ></div>
            </Html>
            <Html position={[0.5, 0.2, 0.5]}>
                <div
                    className="w-4 h-4 bg-green-500 rounded-full animate-ping cursor-pointer opacity-50 hover:opacity-100"
                    onMouseEnter={() => setHoveredComponent("POGO CHARGING INTERFACE")}
                    onMouseLeave={() => setHoveredComponent(null)}
                ></div>
            </Html>
        </group>
    );
}
