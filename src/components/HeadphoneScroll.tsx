'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FRAME_COUNT = 120;

export default function HeadphoneScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loading, setLoading] = useState(true);

    // Scroll progress for the entire 400vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map 0-1 scroll progress to 0-(FRAME_COUNT-1)
    const currentIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    const paddedIndex = String(i).padStart(3, '0');
                    img.src = `/frames/frame_${paddedIndex}_delay-0.04s.webp`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = reject;
                });
                promises.push(promise);
            }

            try {
                await Promise.all(promises);
                setImages(loadedImages);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load images", error);
                setLoading(false); // Show whatever we have or fail gracefully
            }
        };

        loadImages();
    }, []);

    // Render to canvas
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // High DPI Canvas Setup
        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            // Use window inner dimensions for full screen canvas
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const render = () => {
            // Get the current frame index from the transformed motion value
            const index = Math.min(
                Math.max(Math.round(currentIndex.get()), 0),
                FRAME_COUNT - 1
            );

            const img = images[index];
            if (!img) return;

            // Calculate 'cover' fit or 'contain' fit as requested. 
            // User asked for "contain fit" for mobile, but usually "cover" looks better for backgrounds.
            // However, instruction says: "Ensure the canvas scales correctly on mobile (contain fit)."
            // Let's do Contain Fit.

            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio < imgRatio) {
                // Canvas is narrower than image (mobile portrait usually) -> fit width
                drawWidth = canvasWidth;
                drawHeight = drawWidth / imgRatio;
                offsetX = 0;
                offsetY = (canvasHeight - drawHeight) / 2;
            } else {
                // Canvas is wider than image -> fit height
                drawHeight = canvasHeight;
                drawWidth = drawHeight * imgRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            // Fill background to ensure seamless blending if image doesn't cover
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Render loop synced with motion value changes
        const unsubscribe = currentIndex.on("change", render);

        // Initial render
        render();

        return () => {
            unsubscribe();
            window.removeEventListener('resize', setCanvasSize);
        };
    }, [currentIndex, images]);

    // Opacity Transforms for Text
    // 0% -> Zenith X
    // 30% -> Precision Engineering
    // 60% -> Titanium Drivers
    // 90% -> Hear Everything

    // We'll use small ranges around the target points for fade in/out
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
    const opacity4 = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#050505] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white/90 rounded-full animate-spin" />
                    <span className="text-white/60 tracking-wider text-sm uppercase">Loading Experience</span>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full object-contain" />

                {/* Text Overlays - Pointer events none to allow scrolling through */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {/* Slide 1: Zenith X (Centered) */}
                    <motion.div style={{ opacity: opacity1 }} className="absolute text-center">
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white/90 mb-4">
                            ZENITH X
                        </h1>
                        <p className="text-xl text-white/60 font-light tracking-wide">
                            Pure Sound.
                        </p>
                    </motion.div>

                    {/* Slide 2: Precision Engineering (Left) */}
                    <motion.div style={{ opacity: opacity2 }} className="absolute w-full px-8 md:px-24 flex justify-start">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 mb-4">
                                Precision<br />Engineering
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed">
                                Every component meticulously crafted for acoustic perfection.
                            </p>
                        </div>
                    </motion.div>

                    {/* Slide 3: Titanium Drivers (Right) */}
                    <motion.div style={{ opacity: opacity3 }} className="absolute w-full px-8 md:px-24 flex justify-end text-right">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 mb-4">
                                Titanium<br />Drivers
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed">
                                Unmatched clarity and response across the entire frequency range.
                            </p>
                        </div>
                    </motion.div>

                    {/* Slide 4: CTA (Centered) */}
                    <motion.div style={{ opacity: opacity4 }} className="absolute text-center">
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white/90 mb-8">
                            Hear Everything.
                        </h2>
                        <button className="pointer-events-auto px-8 py-4 bg-white text-black text-lg font-medium tracking-wide rounded-full hover:bg-white/90 transition-colors">
                            Pre-order Now
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
