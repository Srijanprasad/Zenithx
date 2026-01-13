'use client';

import { motion } from 'framer-motion';

export default function SplitText({ text, className }: { text: string; className?: string }) {
    const letters = text.split('');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: 'spring' as const,
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: 90,
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap overflow-hidden ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {letters.map((letter, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="inline-block"
                    style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.div>
    );
}
