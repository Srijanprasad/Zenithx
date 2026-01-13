'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, MeshWobbleMaterial, Environment } from '@react-three/drei';
import SplitText from './SplitText';

interface InteractiveFeatureProps {
    title: string;
    description: string;
    index: number;
    visualType: 'sound' | 'precision' | 'immersion';
}

function FeatureVisual({ type }: { type: InteractiveFeatureProps['visualType'] }) {
    return (
        <Canvas>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#4a9eff" />
            <Environment preset="night" />
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                {type === 'sound' && (
                    <Sphere args={[1.5, 64, 64]}>
                        <MeshDistortMaterial color="#ffffff" speed={4} distort={0.5} radius={1} wireframe />
                    </Sphere>
                )}
                {type === 'precision' && (
                    <mesh>
                        <octahedronGeometry args={[2, 0]} />
                        <meshPhysicalMaterial
                            color="#fff"
                            metalness={1}
                            roughness={0.1}
                            transmission={0.5}
                            thickness={1}
                        />
                    </mesh>
                )}
                {type === 'immersion' && (
                    <Sphere args={[1.5, 64, 64]}>
                        <MeshDistortMaterial color="#4a9eff" speed={2} distort={0.3} radius={1} />
                    </Sphere>
                )}
            </Float>
        </Canvas>
    );
}

export default function InteractiveFeature({ title, description, index, visualType }: InteractiveFeatureProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [50, 0, 0, -50]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, y }}
            className={`min-h-screen py-32 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-12 md:gap-24 overflow-hidden`}
        >
            <div className="w-full md:w-1/2 space-y-8 z-10">
                <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-[0.6em] text-white/30 uppercase pl-[0.6em]">Module 0{index + 1}</span>
                    <SplitText
                        text={title}
                        className="text-6xl md:text-9xl font-black tracking-tighter leading-none"
                    />
                </div>
                <p className="text-lg md:text-xl text-white/40 max-w-md leading-relaxed font-light">{description}</p>
                <motion.div
                    className="h-[2px] bg-white/20 w-32 origin-left"
                    style={{ scaleX: scrollYProgress }}
                />
            </div>

            <div className="w-full md:w-1/2 h-[400px] md:h-[600px] pointer-events-none relative">
                <div className="absolute inset-0 bg-white/[0.01] border border-white/5" />
                <Suspense fallback={null}>
                    <FeatureVisual type={visualType} />
                </Suspense>
            </div>
        </motion.div>
    );
}
