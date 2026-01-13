'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import SplitText from './SplitText';

const stats = [
    { label: 'Freq. Range', value: 40000, suffix: 'Hz' },
    { label: 'Battery', value: 24, suffix: 'h' },
    { label: 'Driver', value: 50, suffix: 'mm' },
    { label: 'Latency', value: 1, suffix: 'ms', prefix: '<' }
];

function AnimatedCounter({ value, suffix, prefix = '' }: { value: number; suffix: string; prefix?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) motionValue.set(value);
    }, [isInView, motionValue, value]);

    useEffect(() => {
        return springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = prefix + Math.floor(latest).toLocaleString();
            }
        });
    }, [springValue, prefix]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1">
                <span ref={ref} className="text-6xl md:text-8xl font-black tracking-tighter">0</span>
                <span className="text-xl md:text-2xl font-mono text-white/30">{suffix}</span>
            </div>
        </div>
    );
}

export default function TechSpecs() {
    return (
        <section className="py-48 px-6 bg-[#020205]">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col items-center text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em]">The Metric of Excellence</span>
                    </motion.div>

                    <SplitText
                        text="PURE NUMBERS"
                        className="text-6xl md:text-9xl font-black tracking-tighter text-white"
                    />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center space-y-4"
                        >
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                            <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">{stat.label}</div>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                                className="h-px w-12 bg-white/10"
                            />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
