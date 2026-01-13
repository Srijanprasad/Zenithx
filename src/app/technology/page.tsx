'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Float } from '@react-three/drei';
import PageTransition from '@/components/PageTransition';
import SplitText from '@/components/SplitText';
import * as THREE from 'three';

const specs = [
    {
        id: '01',
        title: 'TITANIUM DRIVER',
        desc: 'Advanced 50mm dual-layer titanium diaphragms for distortion-free response up to 40kHz.',
        color: '#ffffff'
    },
    {
        id: '02',
        title: 'SPATIAL ENGINE',
        desc: 'Real-time 360-degree acoustic mapping with sub-millisecond head tracking latency.',
        color: '#4a9eff'
    },
    {
        id: '03',
        title: 'HYDRO-COOLING',
        desc: 'Active thermal management via hydro-gel memory foam earcups for consistent comfort.',
        color: '#4dffb8'
    },
];

export default function TechnologyPage() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-[#020205] text-white overflow-x-hidden">

                {/* Header */}
                <header className="pt-48 pb-24">
                    <div className="container-zenith">
                        <span className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase mb-4 block">The Blueprint</span>
                        <SplitText text="CORE TECH" className="text-7xl md:text-[10rem] font-black tracking-tighter text-gradient" />
                    </div>
                </header>

                {/* Specs List */}
                <div className="pb-48">
                    <div className="container-zenith">
                        <div className="space-y-32 md:space-y-64">
                            {specs.map((spec, index) => (
                                <div
                                    key={spec.id}
                                    className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Visual Side */}
                                    <div className="w-full md:w-1/2 aspect-square md:aspect-video relative bg-white/[0.02] border border-white/5 overflow-hidden">
                                        <Canvas shadows dpr={[1, 2]}>
                                            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={35} />
                                            <ambientLight intensity={0.5} />
                                            <pointLight position={[5, 5, 5]} intensity={1} />
                                            <Environment preset="night" />
                                            <Suspense fallback={null}>
                                                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                                                    <mesh>
                                                        <octahedronGeometry args={[1, 0]} />
                                                        <meshPhysicalMaterial
                                                            color={spec.color}
                                                            wireframe
                                                            emissive={spec.color}
                                                            emissiveIntensity={0.5}
                                                        />
                                                    </mesh>
                                                </Float>
                                            </Suspense>
                                        </Canvas>
                                    </div>

                                    {/* Text Side */}
                                    <div className="w-full md:w-1/2 space-y-6">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-mono text-white/30 tracking-[0.3em]">SPECIFICATION {spec.id}</span>
                                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">{spec.title}</h2>
                                        </div>
                                        <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-md">
                                            {spec.desc}
                                        </p>
                                        <div className="h-px w-24 bg-white/10 mt-12" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </PageTransition>
    );
}
