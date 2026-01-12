'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from './AnimatedText';

interface ScrollSectionsProps {
    content: any[];
}

export default function ScrollSections({ content }: ScrollSectionsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Calculate safe opacity ranges to avoid overlap
    // Total sections: 3
    // Section 1: 0 - 0.3
    // Section 2: 0.35 - 0.65
    // Section 3: 0.7 - 1.0

    const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.95], [0, 1, 1]);
    const y3 = useTransform(scrollYProgress, [0.65, 0.8], [50, 0]);

    return (
        <div ref={containerRef} className="relative z-10 w-full">

            {/* Spacer to give height for scrolling */}
            <div className="h-[350vh] w-full invisible pointer-events-none" />

            {/* Fixed Overlay Container for Text */}
            <div className="fixed inset-0 w-full h-full pointer-events-none flex flex-col justify-center">

                {/* Section 1: Hero */}
                <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mix-blend-exclusion text-white">ZENITH X</h1>
                    <p className="text-xl md:text-2xl mt-4 font-light text-gray-400">Audio Redefined</p>
                </motion.div>

                {/* Section 2: Sound (Left Aligned on Desktop) */}
                <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center p-8 md:pl-32">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white">PURE IMMERSION</h2>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                            Active Noise Cancellation tailored to your environment. Dive into silence.
                        </p>
                    </div>
                </motion.div>

                {/* Section 3: Specs (Right Aligned on Desktop) */}
                <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute top-0 left-0 w-full h-full flex flex-col items-end justify-center p-8 md:pr-32 text-right">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white">ZERO LATENCY</h2>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                            Professional grade wireless transmission for gaming and monitoring.
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
