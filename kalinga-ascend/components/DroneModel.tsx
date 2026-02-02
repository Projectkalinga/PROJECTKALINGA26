"use client";

import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface DroneModelProps {
    url?: string;
    slope?: number;
    setHoveredComponent?: (s: string | null) => void;
}

export default function DroneModel({
    url = "/models/quadcopter.glb",
    slope = 0,
    setHoveredComponent = () => { }
}: DroneModelProps) {
    const { scene } = useGLTF(url);
    const ref = useRef<THREE.Group>(null);

    useFrame(() => {
        if (ref.current) {
            // Apply slope rotation for terrain simulation
            ref.current.rotation.x = THREE.MathUtils.degToRad(slope);
        }
    });

    return (
        <group ref={ref}>
            <primitive
                object={scene}
                onPointerOver={(e: any) => {
                    e.stopPropagation();
                    setHoveredComponent("SYSTEM_CORE");
                }}
                onPointerOut={(e: any) => setHoveredComponent(null)}
            />

            {/* Interactive Hotspots */}
            <Html position={[0, 0.5, 0]}>
                <div
                    className="w-4 h-4 bg-[#00FF7F] rounded-full animate-ping cursor-pointer opacity-50 hover:opacity-100"
                    onMouseEnter={() => setHoveredComponent("LiDAR SENOR ARRAY")}
                    onMouseLeave={() => setHoveredComponent(null)}
                ></div>
            </Html>
            <Html position={[0.5, 0, 0]}>
                <div
                    className="w-4 h-4 bg-[#FF4500] rounded-full animate-ping cursor-pointer opacity-50 hover:opacity-100"
                    onMouseEnter={() => setHoveredComponent("T-MOTOR MN4006 ACTUATOR")}
                    onMouseLeave={() => setHoveredComponent(null)}
                ></div>
            </Html>
        </group>
    );
}
