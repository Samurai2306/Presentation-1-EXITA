import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import { COLOR_PALETTES, generateNeuralNetwork } from "./networkGraph";
import {
  CONNECTION_FRAGMENT_SHADER,
  CONNECTION_VERTEX_SHADER,
  NODE_FRAGMENT_SHADER,
  NODE_VERTEX_SHADER,
  STARFIELD_FRAGMENT_SHADER,
  STARFIELD_VERTEX_SHADER,
} from "./shaders";
import type { QuantumNeuralFormationIndex, QuantumNeuralRuntimeOptions } from "./types";

type MountParams = QuantumNeuralRuntimeOptions & {
  canvas: HTMLCanvasElement;
};

export type QuantumNeuralHandle = {
  dispose: () => void;
  resize: (width: number, height: number) => void;
};

function createPulseUniforms() {
  return {
    uTime: { value: 0.0 },
    uPulsePositions: {
      value: [new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3)],
    },
    uPulseTimes: { value: [-1e3, -1e3, -1e3] },
    uPulseColors: {
      value: [new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1)],
    },
    uPulseSpeed: { value: 18.0 },
    uBaseNodeSize: { value: 0.6 },
  };
}

function createStarfield(count: number) {
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];
  for (let i = 0; i < count; i++) {
    const r = THREE.MathUtils.randFloat(50, 150);
    const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
    const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
    positions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    );
    const colorChoice = Math.random();
    if (colorChoice < 0.7) {
      colors.push(1, 1, 1);
    } else if (colorChoice < 0.85) {
      colors.push(0.7, 0.8, 1);
    } else {
      colors.push(1, 0.9, 0.8);
    }
    sizes.push(THREE.MathUtils.randFloat(0.1, 0.3));
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: STARFIELD_VERTEX_SHADER,
    fragmentShader: STARFIELD_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geo, mat);
}

export function mountQuantumNeuralCanvas(params: MountParams): QuantumNeuralHandle {
  const {
    canvas,
    perfTier,
    transparentCanvas = false,
    interactive = false,
    paletteIndex = 0,
    formationIndex = 0,
    densityFactor = 1,
  } = params;

  const dprCap = perfTier === "full" ? 1.5 : 1;
  const segmentCount = perfTier === "full" ? 16 : 10;
  const starCount = perfTier === "full" ? 5200 : 1600;
  const useBloom = perfTier === "full";

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.002);

  const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
  camera.position.set(0, 8, 28);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: perfTier === "full",
    powerPreference: "high-performance",
    alpha: transparentCanvas,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, transparentCanvas ? 0 : 1);

  const composer = useBloom ? new EffectComposer(renderer) : null;
  let bloomPass: UnrealBloomPass | null = null;
  if (composer) {
    const rp = new RenderPass(scene, camera);
    composer.addPass(rp);
    bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.35, 0.55, 0.72);
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());
  }

  const starField = createStarfield(starCount);
  scene.add(starField);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.6;
  controls.minDistance = 8;
  controls.maxDistance = 80;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.2;
  controls.enablePan = false;
  controls.enableRotate = interactive;
  controls.enableZoom = interactive;

  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const interactionPoint = new THREE.Vector3();

  const pulseUniforms = createPulseUniforms();
  let nodesMesh: THREE.Points | null = null;
  let connectionsMesh: THREE.LineSegments | null = null;
  let lastPulseIndex = 0;
  let docHidden = false;
  let rafId = 0;

  const activePaletteIndex = paletteIndex as number;

  function disposeNetworkMeshes() {
    if (nodesMesh) {
      scene.remove(nodesMesh);
      nodesMesh.geometry.dispose();
      (nodesMesh.material as THREE.Material).dispose();
      nodesMesh = null;
    }
    if (connectionsMesh) {
      scene.remove(connectionsMesh);
      connectionsMesh.geometry.dispose();
      (connectionsMesh.material as THREE.Material).dispose();
      connectionsMesh = null;
    }
  }

  function buildNetwork(fIdx: QuantumNeuralFormationIndex, density: number) {
    disposeNetworkMeshes();
    const neuralNetwork = generateNeuralNetwork(fIdx, density);
    if (!neuralNetwork.nodes.length) return;

    const palette = COLOR_PALETTES[activePaletteIndex % COLOR_PALETTES.length];
    const nodesGeometry = new THREE.BufferGeometry();
    const nodePositions: number[] = [];
    const nodeTypes: number[] = [];
    const nodeSizes: number[] = [];
    const nodeColors: number[] = [];
    const distancesFromRoot: number[] = [];

    neuralNetwork.nodes.forEach((node) => {
      nodePositions.push(node.position.x, node.position.y, node.position.z);
      nodeTypes.push(node.type);
      nodeSizes.push(node.size);
      distancesFromRoot.push(node.distanceFromRoot);
      const colorIndex = Math.min(node.level, palette.length - 1);
      const baseColor = palette[colorIndex % palette.length].clone();
      baseColor.offsetHSL(
        THREE.MathUtils.randFloatSpread(0.03),
        THREE.MathUtils.randFloatSpread(0.08),
        THREE.MathUtils.randFloatSpread(0.08),
      );
      nodeColors.push(baseColor.r, baseColor.g, baseColor.b);
    });

    nodesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(nodePositions, 3));
    nodesGeometry.setAttribute("nodeType", new THREE.Float32BufferAttribute(nodeTypes, 1));
    nodesGeometry.setAttribute("nodeSize", new THREE.Float32BufferAttribute(nodeSizes, 1));
    nodesGeometry.setAttribute("nodeColor", new THREE.Float32BufferAttribute(nodeColors, 3));
    nodesGeometry.setAttribute("distanceFromRoot", new THREE.Float32BufferAttribute(distancesFromRoot, 1));

    const nodesMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(pulseUniforms),
      vertexShader: NODE_VERTEX_SHADER,
      fragmentShader: NODE_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
    scene.add(nodesMesh);

    const connectionsGeometry = new THREE.BufferGeometry();
    const connectionColors: number[] = [];
    const connectionStrengths: number[] = [];
    const connectionPositions: number[] = [];
    const startPoints: number[] = [];
    const endPoints: number[] = [];
    const pathIndices: number[] = [];
    const processedConnections = new Set<string>();
    let pathIndex = 0;

    neuralNetwork.nodes.forEach((node, nodeIndex) => {
      node.connections.forEach((connection) => {
        const connectedNode = connection.node;
        const connectedIndex = neuralNetwork!.nodes.indexOf(connectedNode);
        if (connectedIndex === -1) return;
        const key = `${Math.min(nodeIndex, connectedIndex)}-${Math.max(nodeIndex, connectedIndex)}`;
        if (!processedConnections.has(key)) {
          processedConnections.add(key);
          const startPoint = node.position;
          const endPoint = connectedNode.position;
          const numSegments = segmentCount;
          for (let i = 0; i < numSegments; i++) {
            const t = numSegments > 1 ? i / (numSegments - 1) : 0;
            connectionPositions.push(t, 0, 0);
            startPoints.push(startPoint.x, startPoint.y, startPoint.z);
            endPoints.push(endPoint.x, endPoint.y, endPoint.z);
            pathIndices.push(pathIndex);
            connectionStrengths.push(connection.strength);
            const avgLevel = Math.min(Math.floor((node.level + connectedNode.level) / 2), palette.length - 1);
            const baseColor = palette[avgLevel % palette.length].clone();
            baseColor.offsetHSL(
              THREE.MathUtils.randFloatSpread(0.03),
              THREE.MathUtils.randFloatSpread(0.08),
              THREE.MathUtils.randFloatSpread(0.08),
            );
            connectionColors.push(baseColor.r, baseColor.g, baseColor.b);
          }
          pathIndex++;
        }
      });
    });

    connectionsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(connectionPositions, 3));
    connectionsGeometry.setAttribute("startPoint", new THREE.Float32BufferAttribute(startPoints, 3));
    connectionsGeometry.setAttribute("endPoint", new THREE.Float32BufferAttribute(endPoints, 3));
    connectionsGeometry.setAttribute("connectionStrength", new THREE.Float32BufferAttribute(connectionStrengths, 1));
    connectionsGeometry.setAttribute("connectionColor", new THREE.Float32BufferAttribute(connectionColors, 3));
    connectionsGeometry.setAttribute("pathIndex", new THREE.Float32BufferAttribute(pathIndices, 1));

    const connectionsMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(pulseUniforms),
      vertexShader: CONNECTION_VERTEX_SHADER,
      fragmentShader: CONNECTION_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    connectionsMesh = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
    scene.add(connectionsMesh);

    palette.forEach((color, i) => {
      if (i < 3) {
        connectionsMaterial.uniforms.uPulseColors.value[i].copy(color);
        nodesMaterial.uniforms.uPulseColors.value[i].copy(color);
      }
    });
  }

  buildNetwork(formationIndex, densityFactor);

  function setSize(width: number, height: number) {
    const w = Math.max(1, Math.floor(width));
    const h = Math.max(1, Math.floor(height));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, dprCap);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    if (composer) {
      composer.setSize(w, h);
      bloomPass?.resolution.set(w, h);
    }
  }

  function triggerPulse(clientX: number, clientY: number, width: number, height: number) {
    pointer.x = (clientX / width) * 2 - 1;
    pointer.y = -(clientY / height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    interactionPlane.normal.copy(camera.position).normalize();
    interactionPlane.constant =
      -interactionPlane.normal.dot(camera.position) + camera.position.length() * 0.5;
    if (raycaster.ray.intersectPlane(interactionPlane, interactionPoint)) {
      const time = clock.getElapsedTime();
      if (nodesMesh && connectionsMesh) {
        const nm = nodesMesh.material as THREE.ShaderMaterial;
        const cm = connectionsMesh.material as THREE.ShaderMaterial;
        lastPulseIndex = (lastPulseIndex + 1) % 3;
        nm.uniforms.uPulsePositions.value[lastPulseIndex].copy(interactionPoint);
        nm.uniforms.uPulseTimes.value[lastPulseIndex] = time;
        cm.uniforms.uPulsePositions.value[lastPulseIndex].copy(interactionPoint);
        cm.uniforms.uPulseTimes.value[lastPulseIndex] = time;
        const palette = COLOR_PALETTES[activePaletteIndex % COLOR_PALETTES.length];
        const randomColor = palette[Math.floor(Math.random() * palette.length)];
        nm.uniforms.uPulseColors.value[lastPulseIndex].copy(randomColor);
        cm.uniforms.uPulseColors.value[lastPulseIndex].copy(randomColor);
      }
    }
  }

  function onClick(e: MouseEvent) {
    if (!interactive) return;
    const rect = canvas.getBoundingClientRect();
    triggerPulse(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
  }

  function onTouchStart(e: TouchEvent) {
    if (!interactive) return;
    e.preventDefault();
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      triggerPulse(t.clientX - rect.left, t.clientY - rect.top, rect.width, rect.height);
    }
  }

  if (interactive) {
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
  }

  const onVisibility = () => {
    docHidden = document.hidden;
  };
  document.addEventListener("visibilitychange", onVisibility);
  onVisibility();

  function tick() {
    rafId = requestAnimationFrame(tick);
    if (docHidden) return;

    const t = clock.getElapsedTime();
    if (nodesMesh) {
      const m = nodesMesh.material as THREE.ShaderMaterial;
      m.uniforms.uTime.value = t;
      nodesMesh.rotation.y = Math.sin(t * 0.04) * 0.05;
    }
    if (connectionsMesh) {
      const m = connectionsMesh.material as THREE.ShaderMaterial;
      m.uniforms.uTime.value = t;
      connectionsMesh.rotation.y = Math.sin(t * 0.04) * 0.05;
    }
    starField.rotation.y += 0.0002;
    (starField.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    controls.update();

    if (composer) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }
  }

  rafId = requestAnimationFrame(tick);

  function dispose() {
    cancelAnimationFrame(rafId);
    document.removeEventListener("visibilitychange", onVisibility);
    if (interactive) {
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchstart", onTouchStart);
    }
    controls.dispose();
    disposeNetworkMeshes();
    scene.remove(starField);
    starField.geometry.dispose();
    (starField.material as THREE.Material).dispose();
    if (composer) {
      composer.dispose();
    }
    renderer.dispose();
  }

  return {
    dispose,
    resize: setSize,
  };
}
