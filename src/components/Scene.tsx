'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import ProductModel from './ProductModel';
import * as THREE from 'three';
import { CAMERA_POSITIONS, BREAKPOINTS } from '@/lib/constants';

interface SceneProps {
    content?: any[];
}

export default function Scene({ content }: SceneProps) {
    const [cameraPos, setCameraPos] = useState<[number, number, number]>([0, 0, 5]);

    useEffect(() => {
        const updateCamera = () => {
            if (window.innerWidth < BREAKPOINTS.mobile) {
                setCameraPos([0, 0, 7]); // Move back for mobile
            } else {
                setCameraPos([0, 0, 5]);
            }
        };

        updateCamera();
        window.addEventListener('resize', updateCamera);
        return () => window.removeEventListener('resize', updateCamera);
    }, []);

    return (
        <div className="fixed inset-0 z-0 w-full h-screen bg-[#050505] pointer-events-none">
            <Canvas
                className="w-full h-full"
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                shadows
                dpr={[1, 2]} // Quality scaling
            >
                <PerspectiveCamera makeDefault position={cameraPos} fov={45} />

                {/* Cinematic Lighting */}
                <ambientLight intensity={0.2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a9eff" />

                {/* Environment Reflections */}
                <Environment preset="studio" />

                <Suspense fallback={null}>
                    <ProductModel />
                </Suspense>

                <ContactShadows
                    resolution={1024}
                    scale={10}
                    blur={1.5}
                    opacity={0.25}
                    far={10}
                    color="#000000"
                />
            </Canvas>
        </div>
    );
}
