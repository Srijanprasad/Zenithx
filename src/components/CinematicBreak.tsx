'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CinematicBreak() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen bg-[#020205] overflow-hidden flex items-center justify-center">

            {/* Abstract Lighting */}
            <motion.div
                style={{ scale, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white/[0.03]" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ scale, opacity }}
                className="relative z-10 text-center px-6"
            >
                <div className="space-y-4">
                    <motion.div
                        initial={{ letterSpacing: '2em', opacity: 0 }}
                        whileInView={{ letterSpacing: '1em', opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="text-[10px] md:text-xs font-mono text-white/40 uppercase pl-[1em]"
                    >
                        Silence is the Canvas
                    </motion.div>

                    <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none text-white italic">
                        TOTAL <br /> FOCUS.
                    </h2>
                </div>
            </motion.div>

            {/* Decorative Grid Trace */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }} />
            </div>
        </section>
    );
}
