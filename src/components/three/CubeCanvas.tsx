"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

type Props = {
  mode: "navigator" | "chat";
  cursorHint?: { x: number; y: number } | null;
  pulse?: number;
};

function Scene({ mode, cursorHint, pulse = 0 }: Props) {
  const ref = React.useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const target = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!cursorHint) return;
    target.current = {
      x: THREE.MathUtils.clamp(cursorHint.x, -1, 1),
      y: THREE.MathUtils.clamp(cursorHint.y, -1, 1),
    };
  }, [cursorHint]);

  useFrame((_state, dt) => {
    const mesh = ref.current;
    if (!mesh) return;

    mesh.rotation.x += dt * 0.25;
    mesh.rotation.y += dt * 0.32;

    const tx = target.current.y * 0.35;
    const ty = target.current.x * 0.45;
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, tx, 1 - Math.pow(0.0006, dt));
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, ty, 1 - Math.pow(0.0006, dt));

    const mat = mesh.material as THREE.MeshPhysicalMaterial;
    const base = mode === "chat" ? 0.55 : 0.28;
    mat.emissiveIntensity = THREE.MathUtils.lerp(
      mat.emissiveIntensity,
      base + pulse * 0.45,
      1 - Math.pow(0.0006, dt),
    );
  });

  const scale = Math.min(1.1, viewport.width / 6);

  return (
    <mesh ref={ref} scale={scale}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshPhysicalMaterial
        color="#0b0b10"
        roughness={0.22}
        metalness={0.55}
        transmission={0.08}
        thickness={0.6}
        ior={1.3}
        clearcoat={1}
        clearcoatRoughness={0.15}
        emissive={new THREE.Color("white")}
        emissiveIntensity={0.28}
      />
    </mesh>
  );
}

export function CubeCanvas(props: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 4]} intensity={1.0} />
      <directionalLight position={[-4, -2, 2]} intensity={0.45} />
      <Scene {...props} />
    </Canvas>
  );
}

