'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import SplitText from './SplitText';

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

    return (
        <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-32">

            <div className="container-zenith relative z-10">
                <motion.div
                    style={{ y, opacity, scale }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="mb-6">
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: '0.8em' }}
                            animate={{ opacity: 1, letterSpacing: '0.3em' }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="text-[10px] md:text-xs font-mono text-white/40 uppercase pl-[0.3em]"
                        >
                            The Future of Acoustic Purity
                        </motion.span>
                    </div>

                    <div className="relative mb-12">
                        <h1 className="flex flex-col items-center">
                            <SplitText
                                text="ZENITH X"
                                className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none text-white text-gradient"
                            />
                        </h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="max-w-xl text-sm md:text-lg text-white/50 font-light mb-16 px-4 text-balance leading-relaxed"
                    >
                        Engineered with aerospace-grade titanium drivers and advanced spatial intelligence. Experience audio without compromise.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-12"
                    >
                        <Link href="/product">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-16 py-6 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-none hover:bg-gray-200 transition-colors"
                            >
                                Pre-Order Alpha
                            </motion.button>
                        </Link>

                        <button className="text-[10px] tracking-[0.4em] uppercase text-white/40 border-b border-white/10 pb-2 hover:text-white hover:border-white transition-all">
                            Technical Whitepaper
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Cinematic Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 flex flex-col items-center gap-6"
            >
                <span className="text-[9px] font-mono tracking-[0.6em] text-white/20 uppercase pl-[0.6em]">System Online</span>
                <div className="w-[1px] h-24 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-white/40"
                    />
                </div>
            </motion.div>
        </section>
    );
}
