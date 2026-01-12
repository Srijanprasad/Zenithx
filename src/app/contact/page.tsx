'use client';

import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function FloatingShape() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="#333" wireframe />
        </mesh>
    );
}

export default function ContactPage() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row relative">

                {/* Left: 3D Aesthetic */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent z-10 pointer-events-none" />
                    <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} intensity={1} />
                        <Environment preset="studio" />
                        <Suspense fallback={null}>
                            <FloatingShape />
                        </Suspense>
                    </Canvas>
                    <div className="absolute bottom-12 left-8 md:left-12 z-20">
                        <AnimatedText tag="h1" text="GET IN TOUCH" className="text-4xl md:text-6xl font-bold tracking-tighter" />
                        <p className="text-gray-400 mt-4 max-w-xs text-sm md:text-base">
                            Join the revolution. Experience the future of sound before anyone else.
                        </p>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="w-full md:w-1/2 min-h-[60vh] md:h-screen flex items-center justify-center p-8 md:p-12 bg-[#080808] relative z-10">
                    <form className="w-full max-w-md space-y-6 md:space-y-8">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
                            <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-lg md:text-xl focus:border-white focus:outline-none transition-colors placeholder-white/10" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                            <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 text-lg md:text-xl focus:border-white focus:outline-none transition-colors placeholder-white/10" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
                            <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-2 text-lg md:text-xl focus:border-white focus:outline-none transition-colors placeholder-white/10 resize-none" placeholder="Tell us everything..." />
                        </div>

                        <button type="submit" className="group relative px-8 py-4 bg-white text-black text-xs md:text-sm font-bold tracking-widest uppercase overflow-hidden mt-8 hover:bg-gray-200 transition-colors">
                            <span className="relative z-10">Send Transmission</span>
                        </button>
                    </form>
                </div>

            </div>
        </PageTransition>
    );
}
