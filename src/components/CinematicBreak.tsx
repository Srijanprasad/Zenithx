'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function CinematicBreak() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden">

            {/* Parallax Background */}
            <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
                <Image
                    src="/images/cinematic-bg.png"
                    alt="Cinematic Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 h-full flex items-center justify-center text-center px-8"
            >
                <div className="max-w-4xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
                    >
                        Hear Everything
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-2xl md:text-3xl text-gray-300 font-light"
                    >
                        Experience audio in its purest, most immersive form
                    </motion.p>
                </div>
            </motion.div>

        </section>
    );
}
