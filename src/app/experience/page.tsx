'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import * as THREE from 'three';

const COUNT = 1000;

function InteractiveParticles() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const tempObject = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        return new Array(COUNT).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 20,
            rotation: Math.random() * Math.PI,
            speed: Math.random() * 0.02
        }));
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        particles.forEach((particle, i) => {
            // Gentle floating motion
            const y = particle.y + Math.sin(time + particle.x) * 0.5;

            // Mouse interaction repulsion
            const mouse = state.pointer; // -1 to 1
            const dist = Math.sqrt(Math.pow(mouse.x * 10 - particle.x, 2) + Math.pow(mouse.y * 10 - y, 2));

            let x = particle.x;
            let z = particle.z;

            if (dist < 3) {
                const angle = Math.atan2(y - mouse.y * 10, particle.x - mouse.x * 10);
                x += Math.cos(angle) * (3 - dist) * 0.2;
                // y += Math.sin(angle) * (3 - dist) * 0.2;
            }

            tempObject.position.set(x, y, z);
            tempObject.rotation.x = particle.rotation + time * particle.speed;
            tempObject.rotation.y = particle.rotation + time * particle.speed;
            tempObject.scale.setScalar(0.1 + Math.sin(time + i) * 0.05);

            tempObject.updateMatrix();
            meshRef.current!.setMatrixAt(i, tempObject.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
            <boxGeometry />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
        </instancedMesh>
    );
}

export default function ExperiencePage() {
    return (
        <PageTransition>
            <div className="w-full h-screen bg-[#050505] text-white relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full p-8 z-10 pointer-events-none mt-20 md:mt-0">
                    <AnimatedText tag="h1" text="SOUNDSCAPE" className="text-4xl md:text-6xl font-bold tracking-tighter" />
                    <p className="text-gray-400 mt-2 text-sm md:text-base">Interactive Audio Visualization Playground</p>
                </div>

                <div className="absolute bottom-12 left-8 md:left-12 z-10 pointer-events-none max-w-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-widest leading-loose">
                        Move your cursor.<br />
                        This represents our adaptive noise cancellation algorithm reacting variables in real-time.
                    </p>
                </div>

                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 15], fov: 50 }} dpr={[1, 2]}>
                        <color attach="background" args={['#050505']} />
                        <fog attach="fog" args={['#050505', 10, 25]} />
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                        <pointLight position={[-10, -10, -10]} intensity={1} color="#4a9eff" />

                        <Suspense fallback={null}>
                            <InteractiveParticles />
                            <Environment preset="night" />
                        </Suspense>

                        <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
                    </Canvas>
                </div>

            </div>
        </PageTransition>
    );
}
