"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { LIQUID_FRAGMENT_SHADER, LIQUID_VERTEX_SHADER } from "@/components/three/liquid/liquidGradientShaders";
import type { TouchTexture } from "@/components/three/liquid/touchTexture";

/** Согласована с `.concierge-atmosphere`: индиго / фиолет / янтарь / бирюза / пери на тёплом «paper». */
function exitaUniforms() {
  return {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uColor1: new THREE.Vector3(0.38, 0.36, 0.86),
    uColor2: new THREE.Vector3(0.82, 0.55, 0.35),
    uColor3: new THREE.Vector3(0.48, 0.28, 0.78),
    uColor4: new THREE.Vector3(0.94, 0.75, 0.52),
    uColor5: new THREE.Vector3(0.18, 0.55, 0.52),
    uColor6: new THREE.Vector3(0.56, 0.6, 0.92),
    uSpeed: 0.36,
    uIntensity: 0.86,
    uGrainIntensity: 0.006,
    uDarkNavy: new THREE.Vector3(0.95, 0.93, 0.88),
    uGradientSize: 0.46,
    uGradientCount: 12.0,
    uColor1Weight: 0.58,
    uColor2Weight: 1.0,
  };
}

function LiquidMesh({ touch }: { touch: TouchTexture }) {
  const matRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const resRef = React.useRef({ w: 0, h: 0 });
  const { viewport, size } = useThree();

  const uniforms = React.useMemo(() => {
    const p = exitaUniforms();
    return {
      uTime: { value: p.uTime },
      uResolution: { value: p.uResolution },
      uColor1: { value: p.uColor1 },
      uColor2: { value: p.uColor2 },
      uColor3: { value: p.uColor3 },
      uColor4: { value: p.uColor4 },
      uColor5: { value: p.uColor5 },
      uColor6: { value: p.uColor6 },
      uSpeed: { value: p.uSpeed },
      uIntensity: { value: p.uIntensity },
      uTouchTexture: { value: touch.texture },
      uGrainIntensity: { value: p.uGrainIntensity },
      uDarkNavy: { value: p.uDarkNavy },
      uGradientSize: { value: p.uGradientSize },
      uGradientCount: { value: p.uGradientCount },
      uColor1Weight: { value: p.uColor1Weight },
      uColor2Weight: { value: p.uColor2Weight },
    };
  }, [touch]);

  useFrame((_, delta) => {
    touch.update();
    const m = matRef.current;
    if (m) {
      m.uniforms.uTime.value += delta;
      const w = size.width;
      const h = size.height;
      if (resRef.current.w !== w || resRef.current.h !== h) {
        resRef.current = { w, h };
        m.uniforms.uResolution.value.set(w, h);
      }
    }
  });

  return (
    <mesh
      frustumCulled={false}
      position={[0, 0, 0]}
      renderOrder={-20}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        fragmentShader={LIQUID_FRAGMENT_SHADER}
        vertexShader={LIQUID_VERTEX_SHADER}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

type Props = {
  touch: TouchTexture;
  className?: string;
};

/**
 * WebGL-фон: интерактивный «жидкий» градиент (Three.js + шейдеры из референса в SPECIAL).
 */
export function LiquidGradientScene({ touch, className }: Props) {
  const [docVisible, setDocVisible] = React.useState(true);
  const dprMax = React.useMemo(() => {
    if (typeof window === "undefined") return 1;
    return Math.min(1.25, window.devicePixelRatio || 1);
  }, []);

  React.useEffect(() => {
    const onVis = () => setDocVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className={className} aria-hidden>
      <Canvas
        className="block! h-full w-full"
        camera={{ fov: 50, position: [0, 0, 5], near: 0.1, far: 200 }}
        dpr={[1, dprMax]}
        frameloop={docVisible ? "always" : "never"}
        gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0xf6f0e6), 1);
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <LiquidMesh touch={touch} />
      </Canvas>
    </div>
  );
}
