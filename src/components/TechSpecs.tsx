'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
    { label: 'Frequency Range', value: 40000, suffix: 'Hz', prefix: '' },
    { label: 'Battery Life', value: 24, suffix: 'hrs', prefix: '' },
    { label: 'Driver Size', value: 50, suffix: 'mm', prefix: '' },
    { label: 'Latency', value: 1, suffix: 'ms', prefix: '<' }
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 2000 });
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, motionValue, value]);

    useEffect(() => {
        springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = prefix + Math.floor(latest).toLocaleString();
            }
        });
    }, [springValue, prefix]);

    return (
        <div className="flex items-baseline gap-2">
            <span ref={ref} className="text-6xl md:text-7xl font-bold">0</span>
            <span className="text-2xl text-gray-500">{suffix}</span>
        </div>
    );
}

export default function TechSpecs() {
    return (
        <section className="py-32 px-8 bg-[#050505]">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        By The Numbers
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Specifications that speak for themselves
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="text-center space-y-4"
                        >
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                            <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block px-6 py-3 border border-white/20 rounded-full">
                        <span className="text-sm text-gray-400">Professional-grade performance in every metric</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
