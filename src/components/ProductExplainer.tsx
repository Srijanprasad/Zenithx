'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useState } from 'react';
import ProductModel from './ProductModel';
import Link from 'next/link';

const specs = [
    { label: 'Driver Size', value: '50mm Graphene' },
    { label: 'Frequency Response', value: '5Hz - 40kHz' },
    { label: 'Impedance', value: '32Ω' },
    { label: 'Battery Life', value: '24 Hours ANC' },
    { label: 'Connectivity', value: 'Bluetooth 5.3 + USB-C' },
    { label: 'Weight', value: '285g' }
];

export default function ProductExplainer() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="relative py-32 px-8 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="text-sm font-mono text-gray-500 uppercase tracking-widest">Technical Excellence</span>
                            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mt-4 mb-6">
                                Precision Engineering
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                Every component is meticulously designed and tested to deliver uncompromising audio fidelity.
                                From the graphene drivers to the titanium frame, Zenith X represents the pinnacle of acoustic engineering.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {specs.map((spec, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-l-2 border-white/20 pl-4"
                                >
                                    <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
                                    <div className="text-lg font-semibold">{spec.value}</div>
                                </motion.div>
                            ))}
                        </div>

                        <Link href="/product">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-full hover:bg-gray-200 transition-colors"
                            >
                                View Full Specs
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Right: 3D Model */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-[600px] relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="w-full h-full border border-white/10 rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm">
                            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                                <color attach="background" args={['#000000']} />
                                <ambientLight intensity={0.3} />
                                <spotLight position={[10, 10, 10]} intensity={1} castShadow />
                                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a9eff" />
                                <Environment preset="studio" />

                                <Suspense fallback={null}>
                                    <ProductModel customProgress={isHovered ? 0.5 : 0} />
                                    <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
                                </Suspense>

                                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={isHovered ? 2 : 0.5} />
                            </Canvas>
                        </div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 uppercase tracking-widest">
                            Hover to Interact
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
