'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Atmosphere() {
    const meshRef = useRef<THREE.Points>(null);
    const count = 3000;

    const [positions, sizes] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15; // X
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // Y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z
            sizes[i] = Math.random();
        }

        return [positions, sizes];
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.y = time * 0.05;
        meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

        // Subtle mouse movement interaction
        const targetX = state.mouse.x * 0.2;
        const targetY = state.mouse.y * 0.2;
        meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
        meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#ffffff"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
