'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState } from 'react';
import ProductModel from './ProductModel';
import Link from 'next/link';
import SplitText from './SplitText';

const specs = [
    { label: 'Architecture', value: 'Aerospace Titanium' },
    { label: 'Frequency Scale', value: '5Hz - 44kHz' },
    { label: 'Processing', value: 'Dual-H2 Neural' },
    { label: 'Interface', value: 'Zero-Lag 2.4GHz' },
];

export default function ProductExplainer() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="relative py-48 bg-[#020205] overflow-hidden">
            <div className="container-zenith">
                <div className="grid lg:grid-cols-2 gap-24 items-center">

                    {/* Left: Content */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.6em] block pl-[0.6em]">Technical Blueprint</span>
                            <SplitText
                                text="PRECISION"
                                className="text-6xl md:text-9xl font-black tracking-tighter text-gradient"
                            />
                        </div>

                        <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                            Every curve is calculated. Every material is chosen for its acoustic properties. Zenith X represents the absolute peak of audio engineering.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {specs.map((spec, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="space-y-2 border-l border-white/5 pl-6"
                                >
                                    <div className="text-[9px] text-white/20 uppercase tracking-[0.3em]">{spec.label}</div>
                                    <div className="text-xl font-light text-white/70">{spec.value}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-12">
                            <Link href="/product">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-6 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase hover:bg-neutral-200 transition-colors"
                                >
                                    Investigate Build
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: 3D Model Visual */}
                    <motion.div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="relative aspect-square md:aspect-[4/5] bg-white/[0.01] border border-white/5 cursor-crosshair overflow-hidden group"
                    >
                        {/* Decorative HUD Elements */}
                        <div className="absolute top-8 left-8 text-[8px] font-mono text-white/20 uppercase tracking-widest z-10 transition-opacity group-hover:opacity-100 opacity-50">
                            Status: Scanning // [Alpha_01]
                        </div>
                        <div className="absolute bottom-8 right-8 text-[8px] font-mono text-white/20 uppercase tracking-widest z-10 transition-opacity group-hover:opacity-100 opacity-50">
                            Mode: Interactive_Deconstruct
                        </div>

                        <Canvas shadows dpr={[1, 2]}>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
                            <ambientLight intensity={0.2} />
                            <spotLight position={[5, 10, 5]} intensity={2} angle={0.15} penumbra={1} castShadow />
                            <Environment preset="night" />

                            <Suspense fallback={null}>
                                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                                    <ProductModel customProgress={isHovered ? 0.6 : 0} />
                                </Float>
                                <ContactShadows resolution={1024} scale={10} blur={3} opacity={0.2} far={10} color="#000000" />
                            </Suspense>

                            <OrbitControls enableZoom={false} autoRotate={!isHovered} autoRotateSpeed={1} />
                        </Canvas>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
