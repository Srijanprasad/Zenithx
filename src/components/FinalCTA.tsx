'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SplitText from './SplitText';

export default function FinalCTA() {
    return (
        <section className="relative py-48 px-6 bg-[#020205] overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 max-w-5xl mx-auto text-center">

                <div className="mb-8 overflow-hidden inline-block">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em]"
                    >
                        Secure Your Legacy
                    </motion.span>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 flex flex-col items-center">
                        <SplitText text="READY TO" className="leading-none text-white/90" />
                        <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent italic">
                            EVOLVE?
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-white/40 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        The next chapter of audio engineering is here. Limited primary production units available for early adopters.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col md:flex-row gap-8 justify-center items-center"
                    >
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-16 py-6 bg-white text-black font-bold text-[10px] tracking-[0.4em] uppercase rounded-sm hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500"
                            >
                                Pre-Order Alpha
                            </motion.button>
                        </Link>
                        <Link href="/technology">
                            <motion.button
                                whileHover={{ opacity: 0.7 }}
                                className="text-[10px] tracking-[0.3em] uppercase text-white/60 border-b border-white/20 pb-1"
                            >
                                Technical Briefing
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]"
                >
                    <div className="space-y-2">
                        <div className="text-white/40">Logistics</div>
                        <div>Global Distribution</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-white/40">Integrity</div>
                        <div>24-Month Guarantee</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-white/40">Support</div>
                        <div>Priority Channel</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-white/40">Status</div>
                        <div>Operational</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
