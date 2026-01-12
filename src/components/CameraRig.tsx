'use client';

import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';
import { useRef } from 'react';

interface CameraRigProps {
    children: React.ReactNode;
}

export default function CameraRig({ children }: CameraRigProps) {
    const group = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        // Smooth mouse look
        easing.dampE(
            group.current!.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        );

        // Subtle breathing motion
        const t = state.clock.getElapsedTime();
        group.current!.position.y = (Math.sin(t / 4) * 0.1);
    });

    return (
        <group ref={group}>
            {children}
        </group>
    );
}
