'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p + uMouse * 0.1);
    float wave = sin(d * 10.0 - uTime * 2.0) * 0.5 + 0.5;
    float mask = smoothstep(0.8, 0.0, d);
    
    vec3 color = mix(vec3(0.02, 0.02, 0.05), vec3(0.2, 0.4, 1.0), wave * 0.1);
    gl_FragColor = vec4(color * mask, mask * 0.2);
  }
`;

export default function EnergyWaves() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) }
    }), []);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            materialRef.current.uniforms.uMouse.value.lerp(state.mouse, 0.05);
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -5]} scale={[25, 15, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}
