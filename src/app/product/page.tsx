'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import ProductModel from '@/components/ProductModel';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import * as THREE from 'three';
import { BREAKPOINTS } from '@/lib/constants';

export default function ProductPage() {
    const [explosionProgress, setExplosionProgress] = useState(0.5); // Start halfway exploded
    const [cameraPos, setCameraPos] = useState<[number, number, number]>([0, 0, 6]);

    useEffect(() => {
        const updateCamera = () => {
            if (window.innerWidth < BREAKPOINTS.mobile) {
                setCameraPos([0, 0, 9]); // Move back for mobile
            } else {
                setCameraPos([0, 0, 6]);
            }
        };

        updateCamera();
        window.addEventListener('resize', updateCamera);
        return () => window.removeEventListener('resize', updateCamera);
    }, []);

    return (
        <PageTransition>
            <div className="w-full h-screen bg-[#050505] text-white overflow-hidden relative">

                {/* Header UI */}
                <div className="absolute top-0 left-0 w-full p-8 z-10 flex justify-between items-start pointer-events-none">
                    <div className="mt-20 md:mt-0">
                        <AnimatedText tag="h1" text="ANATOMY" className="text-4xl md:text-6xl font-bold tracking-tighter" />
                        <p className="text-gray-400 mt-2 tracking-widest uppercase text-xs md:text-sm">Exploded View Analysis</p>
                    </div>
                </div>

                {/* 3D Viewport */}
                <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
                    <Canvas
                        className="w-full h-full"
                        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                        camera={{ position: cameraPos, fov: 45 }}
                        dpr={[1, 2]}
                    >
                        <color attach="background" args={['#050505']} />
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} intensity={1} castShadow />
                        <Environment preset="city" />

                        <Suspense fallback={null}>
                            <ProductModel customProgress={explosionProgress} />
                            <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
                        </Suspense>

                        <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
                    </Canvas>
                </div>

                {/* Controls UI */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xs md:max-w-md z-10 text-center px-8">
                    <label className="block text-xs uppercase tracking-widest mb-4 text-gray-500">Explosion Control</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={explosionProgress}
                        onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
                        className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2 font-mono">
                        <span>ASSEMBLED</span>
                        <span>EXPLODED</span>
                    </div>
                </div>

            </div>
        </PageTransition>
    );
}
