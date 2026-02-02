"use client";

import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

function Model({ url, scale = 1 }: { url: string; scale?: number }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={scale} />;
}

export default function ModelViewer({ modelUrl }: { modelUrl: string }) {
    return (
        <div className="w-full h-full min-h-[500px] relative">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        <Model url={modelUrl} />
                    </Stage>
                    <OrbitControls
                        autoRotate
                        autoRotateSpeed={0.5}
                        makeDefault
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Suspense>
            </Canvas>
            <div className="absolute bottom-4 left-4 text-xs text-martian-red font-rajdhani border border-martian-red px-2 py-1 bg-black/50">
                INTERACTIVE 3D VIEW // DRAG TO ROTATE
            </div>
        </div>
    );
}
