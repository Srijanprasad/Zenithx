'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import ProductModel from '@/components/ProductModel';
import PageTransition from '@/components/PageTransition';
import SplitText from '@/components/SplitText';
import * as THREE from 'three';

export default function ProductPage() {
    const [explosionProgress, setExplosionProgress] = useState(0.5);

    return (
        <PageTransition>
            <div className="relative min-h-screen bg-[#020205] text-white flex flex-col">

                {/* Header UI */}
                <div className="relative z-10 pt-48 pb-12">
                    <div className="container-zenith">
                        <div className="max-w-xl">
                            <span className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase mb-4 block">Engine 01</span>
                            <SplitText text="ANATOMY" className="text-7xl md:text-9xl font-black tracking-tighter text-gradient" />
                            <p className="text-white/40 mt-6 text-sm md:text-lg font-light leading-relaxed">
                                Deconstruct the architecture of pure sound. Adjust the disassembly state to inspect the titanium driver array and precision-milled internals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3D Viewport - Takes remaining space */}
                <div className="flex-grow relative min-h-[50vh] cursor-grab active:cursor-grabbing">
                    <Canvas
                        shadows
                        dpr={[1, 2]}
                        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                    >
                        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />

                        <ambientLight intensity={0.2} />
                        <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={2} castShadow />
                        <spotLight position={[-5, 5, -5]} angle={0.3} penumbra={1} intensity={1} color="#4a9eff" />

                        <Environment preset="night" />

                        <Suspense fallback={null}>
                            <ProductModel customProgress={explosionProgress} />
                            <ContactShadows resolution={1024} scale={10} blur={3} opacity={0.15} far={10} color="#000000" />
                        </Suspense>

                        <OrbitControls
                            enableZoom={false}
                            minPolarAngle={Math.PI / 4}
                            maxPolarAngle={Math.PI / 1.5}
                        />
                    </Canvas>
                </div>

                {/* Controls UI - Sticky at bottom */}
                <div className="relative z-10 pb-24 pt-12">
                    <div className="container-zenith">
                        <div className="max-w-md mx-auto">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-[10px] font-mono tracking-[0.2em] text-white/20">0% ASSEMBLED</span>
                                <span className="text-[10px] font-mono tracking-[0.2em] text-white/20">100% EXPLODED</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.001"
                                value={explosionProgress}
                                onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
                                className="w-full h-[1px] bg-white/10 appearance-none cursor-pointer accent-white transition-all hover:bg-white/20"
                            />
                            <div className="mt-8 text-center">
                                <span className="text-[9px] font-black tracking-[0.5em] text-white uppercase opacity-40">System Diagnostics: Active</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </PageTransition>
    );
}
