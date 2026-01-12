'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import * as THREE from 'three';

function RotatingTech({ position, color }: { position: [number, number, number], color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5;
            meshRef.current.rotation.y += delta * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} wireframe />
        </mesh>
    );
}

const specs = [
    { id: 1, title: ' graphene drivers', desc: '50mm custom-tuned drivers.', color: '#ff4d4d' },
    { id: 2, title: 'spatial audio', desc: '360-degree soundstage mapping.', color: '#4d79ff' },
    { id: 3, title: 'active cooling', desc: 'Hydro-gel earcups.', color: '#4dffb8' },
];

export default function TechnologyPage() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

                {/* Header */}
                <div className="pt-32 px-8 md:px-24 mb-16 md:mb-24">
                    <AnimatedText tag="h1" text="CORE TECHNOLOGY" className="text-4xl md:text-9xl font-bold tracking-tighter opacity-10 break-words" />
                </div>

                {/* Specs Scroll */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 pb-32">
                    {specs.map((spec, index) => (
                        <div key={spec.id} className={`flex flex-col md:flex-row items-center py-12 md:py-24 gap-8 md:gap-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                            {/* Visual Side */}
                            <div className="w-full md:w-1/2 h-[300px] md:h-[400px]">
                                <div className="w-full h-full relative border border-white/10 rounded-xl overflow-hidden bg-black/50">
                                    <Canvas camera={{ position: [0, 0, 3] }} dpr={[1, 2]}>
                                        <ambientLight intensity={0.5} />
                                        <pointLight position={[10, 10, 10]} />
                                        <RotatingTech position={[0, 0, 0]} color={spec.color} />
                                    </Canvas>
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="w-full md:w-1/2 md:p-12">
                                <div className="border-l-2 border-white/20 pl-6 md:pl-8">
                                    <span className="block text-xs md:text-sm text-gray-500 font-mono mb-2 md:mb-4">SPEC 0{spec.id}</span>
                                    <AnimatedText tag="h2" text={spec.title.toUpperCase()} className="text-2xl md:text-4xl font-bold mb-2 md:mb-4" />
                                    <p className="text-gray-400 text-base md:text-lg">{spec.desc}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </PageTransition>
    );
}
