'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);

        document.body.classList.add('custom-cursor-active');

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.classList.remove('custom-cursor-active');
        };
    }, [isVisible]);

    if (typeof window === 'undefined') return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block overflow-hidden">
            {/* Main Cursor Ring */}
            <motion.div
                className="absolute w-12 h-12 border-[0.5px] border-white/40 rounded-full -ml-6 -mt-6 mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    scale: isHovering ? 2 : 1,
                    opacity: isVisible ? 1 : 0,
                    backgroundColor: isHovering ? 'white' : 'transparent',
                }}
            />

            {/* Trailing Soft Glow */}
            <motion.div
                className="absolute w-40 h-40 bg-white/[0.03] rounded-full -ml-20 -mt-20 blur-xl"
                style={{
                    x: springX,
                    y: springY,
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Precision Dot */}
            <motion.div
                className="absolute w-1 h-1 bg-white rounded-full -ml-0.5 -mt-0.5 mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0
                }}
            />
        </div>
    );
}
