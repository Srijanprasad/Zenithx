'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="relative py-32 px-8 bg-gradient-to-b from-[#050505] to-black overflow-hidden">

            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                        Ready to Experience
                        <br />
                        <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                            Pure Sound?
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Join the waitlist for exclusive early access and special launch pricing.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-6 justify-center flex-wrap"
                    >
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Pre-Order Now
                            </motion.button>
                        </Link>
                        <Link href="/technology">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 border-2 border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded-full hover:border-white/40 transition-colors"
                            >
                                Learn More
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 pt-12 border-t border-white/10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-500">
                        <div>
                            <div className="font-semibold text-white mb-2">Free Shipping</div>
                            <div>Worldwide delivery on all orders</div>
                        </div>
                        <div>
                            <div className="font-semibold text-white mb-2">2-Year Warranty</div>
                            <div>Comprehensive coverage included</div>
                        </div>
                        <div>
                            <div className="font-semibold text-white mb-2">30-Day Returns</div>
                            <div>No questions asked guarantee</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
