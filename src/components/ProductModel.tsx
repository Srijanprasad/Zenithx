'use client';

import { useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import gsap from 'gsap';
import { Cylinder, Torus } from '@react-three/drei';
import { BREAKPOINTS } from '@/lib/constants';

interface ProductModelProps {
    customProgress?: number | null; // If provided, overrides scroll
}

export default function ProductModel({ customProgress = null }: ProductModelProps) {
    const groupRef = useRef<Group>(null);
    const tl = useRef<gsap.core.Timeline>();
    const { viewport, size } = useThree();

    // Parts refs
    const leftCupRef = useRef<Group>(null);
    const rightCupRef = useRef<Group>(null);
    const bandRef = useRef<Mesh>(null);
    const leftPadRef = useRef<Mesh>(null);
    const rightPadRef = useRef<Mesh>(null);

    // Responsive Scaling
    useEffect(() => {
        if (groupRef.current) {
            const isMobile = size.width < BREAKPOINTS.mobile;
            const scale = isMobile ? 0.6 : 1;
            groupRef.current.scale.set(scale, scale, scale);
        }
    }, [size.width]);

    useLayoutEffect(() => {
        if (!leftCupRef.current || !rightCupRef.current || !bandRef.current) return;

        tl.current = gsap.timeline({
            paused: true,
            defaults: { ease: "power2.inOut", duration: 1 }
        });

        const ctx = gsap.context(() => {
            // Explode Logic
            tl.current
                ?.to(leftCupRef.current!.position, { x: -2 }, 0)
                ?.to(rightCupRef.current!.position, { x: 2 }, 0)
                ?.to(leftPadRef.current!.position, { x: -0.5 }, 0)
                ?.to(rightPadRef.current!.position, { x: 0.5 }, 0)
                ?.to(bandRef.current!.position, { y: 1 }, 0.2)
                ?.to(groupRef.current!.rotation, { y: Math.PI * 2, x: 0.5 }, 0);
        }, groupRef);

        return () => ctx.revert();
    }, []);

    useFrame(() => {
        let progress = 0;

        if (customProgress !== null) {
            progress = customProgress;
        } else {
            // Default scroll behavior for Home Page
            if (typeof window !== 'undefined') {
                const scrollMax = document.body.scrollHeight - window.innerHeight;
                progress = scrollMax > 0 ? Math.min(Math.max(window.scrollY / scrollMax, 0), 1) : 0;
            }
        }

        if (tl.current) {
            tl.current.progress(progress);
        }
    });

    const materialProps = {
        color: "#111",
        roughness: 0.4,
        metalness: 0.8,
    };

    const padMaterialProps = {
        color: "#050505",
        roughness: 0.9,
        metalness: 0.1,
    };

    return (
        <group ref={groupRef} rotation={[0, 0, 0]}>
            {/* Headband */}
            <mesh ref={bandRef} position={[0, 1.2, 0]}>
                <torusGeometry args={[1.2, 0.15, 16, 64, Math.PI]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>

            {/* Left Earcup */}
            <group ref={leftCupRef} position={[-1.25, 0, 0]}>
                <Cylinder args={[0.5, 0.5, 0.5, 32]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial {...materialProps} />
                </Cylinder>
                <mesh ref={leftPadRef} position={[0.3, 0, 0]}>
                    <Cylinder args={[0.5, 0.5, 0.2, 32]} rotation={[0, 0, Math.PI / 2]}>
                        <meshStandardMaterial {...padMaterialProps} />
                    </Cylinder>
                </mesh>
            </group>

            {/* Right Earcup */}
            <group ref={rightCupRef} position={[1.25, 0, 0]}>
                <Cylinder args={[0.5, 0.5, 0.5, 32]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial {...materialProps} />
                </Cylinder>
                <mesh ref={rightPadRef} position={[-0.3, 0, 0]}>
                    <Cylinder args={[0.5, 0.5, 0.2, 32]} rotation={[0, 0, Math.PI / 2]}>
                        <meshStandardMaterial {...padMaterialProps} />
                    </Cylinder>
                </mesh>
            </group>
        </group>
    );
}
