'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows, Float } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import ProductModel from './ProductModel';
import Atmosphere from './Atmosphere';
import EnergyWaves from './EnergyWaves';
import * as THREE from 'three';

function CameraRig() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!groupRef.current) return;
        // Subtle mouse parallax for the whole scene content
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.mouse.x * 0.5, 0.05);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.mouse.y * 0.5, 0.05);
    });
    return <group ref={groupRef}><ProductModel /></group>;
}

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0 w-full h-screen bg-[#020205] pointer-events-none">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />

                {/* Cinematic Lighting Setup */}
                <ambientLight intensity={0.2} />

                {/* Main Key Light */}
                <spotLight
                    position={[5, 5, 5]}
                    angle={0.15}
                    penumbra={1}
                    intensity={2}
                    castShadow
                />

                {/* Rim Light (Back) */}
                <spotLight
                    position={[-5, 5, -5]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1.5}
                    color="#4a9eff"
                />

                {/* Fill Light */}
                <pointLight position={[-5, -2, 2]} intensity={0.5} />

                <Atmosphere />
                <EnergyWaves />

                <Environment preset="night" />

                <Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <CameraRig />
                    </Float>
                </Suspense>

                <ContactShadows
                    resolution={1024}
                    scale={10}
                    blur={2}
                    opacity={0.15}
                    far={10}
                    color="#000000"
                />
            </Canvas>
        </div>
    );
}
