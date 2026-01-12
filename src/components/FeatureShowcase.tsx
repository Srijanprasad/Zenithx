'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const features = [
    {
        id: 1,
        title: 'Graphene Drivers',
        description: '50mm custom-tuned graphene drivers deliver unparalleled clarity across the entire frequency spectrum.',
        stat: '50mm',
        color: '#ff4d4d'
    },
    {
        id: 2,
        title: 'Spatial Audio',
        description: '360-degree soundstage mapping creates an immersive listening experience that adapts to your environment.',
        stat: '360°',
        color: '#4d79ff'
    },
    {
        id: 3,
        title: 'Active Cooling',
        description: 'Hydro-gel earcups with active temperature regulation ensure comfort during extended listening sessions.',
        stat: '24hrs',
        color: '#4dffb8'
    },
    {
        id: 4,
        title: 'Zero Latency',
        description: 'Professional-grade wireless transmission with sub-1ms latency for gaming and studio monitoring.',
        stat: '<1ms',
        color: '#ff9d4d'
    }
];

function Feature3D({ color }: { color: string }) {
    return (
        <Canvas camera={{ position: [0, 0, 3] }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Sphere args={[1, 64, 64]}>
                <MeshDistortMaterial color={color} attach="material" distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
            </Sphere>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
    );
}

export default function FeatureShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} className="py-32 px-8 bg-[#050505]">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        Engineered for Perfection
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Every component meticulously crafted to deliver the ultimate audio experience.
                    </p>
                </motion.div>

                <div className="space-y-32">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-16`}
                        >

                            {/* 3D Visual */}
                            <div className="w-full md:w-1/2 h-[400px] relative">
                                <div className="w-full h-full border border-white/10 rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm">
                                    <Feature3D color={feature.color} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="inline-block px-4 py-2 border border-white/20 rounded-full">
                                    <span className="text-sm font-mono text-gray-400">FEATURE {String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">{feature.title}</h3>
                                <p className="text-lg md:text-xl text-gray-400 leading-relaxed">{feature.description}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-bold" style={{ color: feature.color }}>{feature.stat}</span>
                                    <span className="text-gray-500 text-sm uppercase tracking-widest">Precision</span>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
