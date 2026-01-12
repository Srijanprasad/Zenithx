'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    tag?: 'h1' | 'h2' | 'h3' | 'p';
}

export default function AnimatedText({ text, className = '', delay = 0, tag = 'h2' }: AnimatedTextProps) {
    const elementRef = useRef<any>(null);
    const Tag = tag;

    useEffect(() => {
        if (!elementRef.current) return;

        const chars = elementRef.current.innerText.split('');
        elementRef.current.innerHTML = chars
            .map((char: string) => `<span class="inline-block opacity-0 translate-y-4">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');

        const targets = elementRef.current.querySelectorAll('span');

        gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.02,
            ease: 'power4.out',
            delay,
            scrollTrigger: {
                trigger: elementRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        });
    }, [text, delay]);

    return (
        <Tag ref={elementRef} className={`will-change-transform ${className}`}>
            {text}
        </Tag>
    );
}
