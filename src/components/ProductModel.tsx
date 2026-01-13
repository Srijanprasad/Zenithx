'use client';

import { useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshPhysicalMaterial, Color } from 'three';
import gsap from 'gsap';
import { Cylinder, Torus, Sphere } from '@react-three/drei';
import { BREAKPOINTS } from '@/lib/constants';

export default function ProductModel({ customProgress = null }: { customProgress?: number | null }) {
    const groupRef = useRef<Group>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const { size } = useThree();

    // Parts refs
    const parts = {
        leftCup: useRef<Group>(null),
        rightCup: useRef<Group>(null),
        band: useRef<Group>(null),
        leftDriver: useRef<Mesh>(null),
        rightDriver: useRef<Mesh>(null),
        leftPad: useRef<Mesh>(null),
        rightPad: useRef<Mesh>(null),
    };

    const isMobile = size.width < BREAKPOINTS.mobile;

    useLayoutEffect(() => {
        if (!groupRef.current) return;

        tl.current = gsap.timeline({
            paused: true,
            defaults: { ease: "expo.inOut", duration: 1 }
        });

        const ctx = gsap.context(() => {
            tl.current
                ?.to(parts.leftCup.current!.position, { x: -2.5, z: 0.5, rotateY: -0.5 }, 0)
                ?.to(parts.rightCup.current!.position, { x: 2.5, z: 0.5, rotateY: 0.5 }, 0)
                ?.to(parts.leftPad.current!.position, { x: 0.8 }, 0.1)
                ?.to(parts.rightPad.current!.position, { x: -0.8 }, 0.1)
                ?.to(parts.leftDriver.current!.position, { x: 0.4 }, 0.2)
                ?.to(parts.rightDriver.current!.position, { x: -0.4 }, 0.2)
                ?.to(parts.band.current!.position, { y: 2, rotateX: 0.2 }, 0)
                ?.to(groupRef.current!.rotation, { y: Math.PI * 2, x: 0.2 }, 0);
        }, groupRef);

        return () => ctx.revert();
    }, []);

    useFrame((state) => {
        let progress = 0;
        if (customProgress !== null) {
            progress = customProgress;
        } else {
            const scroll = typeof window !== 'undefined' ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0;
            progress = Math.min(Math.max(scroll, 0), 1);
        }

        if (tl.current) tl.current.progress(progress);

        // Gentle float
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    const mat = useMemo(() => new MeshPhysicalMaterial({
        color: new Color('#0a0a0a'),
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
    }), []);

    const padMat = useMemo(() => new MeshPhysicalMaterial({
        color: new Color('#050505'),
        metalness: 0.0,
        roughness: 1.0,
    }), []);

    const driverMat = useMemo(() => new MeshPhysicalMaterial({
        color: new Color('#333'),
        metalness: 1.0,
        roughness: 0.3,
        wireframe: true,
    }), []);

    return (
        <group ref={groupRef} scale={isMobile ? 0.5 : 0.8}>
            {/* Main Headband */}
            <group ref={parts.band} position={[0, 1.4, 0]}>
                <mesh material={mat}>
                    <torusGeometry args={[1.3, 0.12, 16, 128, Math.PI]} />
                </mesh>
                {/* Inner Cushion */}
                <mesh position={[0, -0.05, 0]} rotation={[0, 0, 0]}>
                    <torusGeometry args={[1.25, 0.08, 16, 128, Math.PI]} />
                    <meshPhysicalMaterial color="#050505" roughness={0.8} />
                </mesh>
            </group>

            {/* Left Earcup Construction */}
            <group ref={parts.leftCup} position={[-1.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                {/* Outer Shell */}
                <mesh material={mat}>
                    <cylinderGeometry args={[0.6, 0.65, 0.6, 64]} />
                </mesh>
                {/* Yoke/Connector Detail */}
                <mesh position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
                    <meshPhysicalMaterial color="#222" metalness={1} roughness={0.2} />
                </mesh>
                {/* Driver */}
                <mesh ref={parts.leftDriver} position={[0.2, 0, 0]}>
                    <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
                    <primitive object={driverMat} attach="material" />
                </mesh>
                {/* Ear Pad */}
                <mesh ref={parts.leftPad} position={[0.4, 0, 0]} material={padMat}>
                    <cylinderGeometry args={[0.62, 0.62, 0.3, 64]} />
                </mesh>
            </group>

            {/* Right Earcup Construction */}
            <group ref={parts.rightCup} position={[1.35, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <mesh material={mat}>
                    <cylinderGeometry args={[0.6, 0.65, 0.6, 64]} />
                </mesh>
                <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
                    <meshPhysicalMaterial color="#222" metalness={1} roughness={0.2} />
                </mesh>
                <mesh ref={parts.rightDriver} position={[-0.2, 0, 0]}>
                    <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
                    <primitive object={driverMat} attach="material" />
                </mesh>
                <mesh ref={parts.rightPad} position={[-0.4, 0, 0]} material={padMat}>
                    <cylinderGeometry args={[0.62, 0.62, 0.3, 64]} />
                </mesh>
            </group>

            {/* Subtle center detail */}
            <mesh position={[0, -2, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color="white" opacity={0.1} transparent />
            </mesh>
        </group>
    );
}
