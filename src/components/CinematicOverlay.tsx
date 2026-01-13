'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CinematicOverlay() {
    const { scrollYProgress } = useScroll();
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const vignetteOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.4]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[80]">
            {/* Film Grain */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Dynamic Vignette */}
            <motion.div
                style={{ opacity: vignetteOpacity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]"
            />

            {/* Mouse Tracking Light Leak */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-[0.03] bg-white pointer-events-none"
                animate={{
                    left: mousePos.x * 100 + '%',
                    top: mousePos.y * 100 + '%',
                }}
                transition={{ type: 'spring', damping: 50, stiffness: 200 }}
                style={{ transform: 'translate(-50%, -50%)' }}
            />

            {/* Horizontal Scanlines (Subtle) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.01] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </div>
    );
}
