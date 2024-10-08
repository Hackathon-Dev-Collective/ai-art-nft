"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Detailed, OrbitControls, Environment, BakeShadows } from "@react-three/drei";

// Create 800 objects with random position and rotation data
const positions = [...Array(800)].map(() => ({
  position: [40 - Math.random() * 80, 40 - Math.random() * 80, 40 - Math.random() * 80],
  rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2],
}));

export default function Art3D() {
  return (
    <Suspense fallback={<span>loading...</span>}>
      <div className="w-full h-[60vh] min-h-[700px] z-10 absolute top-0 left-0">
        <Canvas
          // Quick shortcut for setting up shadow maps
          shadows
          // Only render on changes and movement
          frameloop="demand"
          camera={{ position: [0, 0, 40] }}
        >
          {/* Let's render 800 Bust components with the data above */}
          {positions.map((props, i) => (
            <Bust key={i} {...props} />
          ))}
          <OrbitControls zoomSpeed={0.075} />
          <pointLight position={[0, 0, 0]} intensity={0.5} />
          <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
          <Environment preset="city" />
          <BakeShadows />
        </Canvas>
      </div>
    </Suspense>
  );
}

function Bust(props: any) {
  // This will load 4 GLTF in parallel using React Suspense
  const levels = useGLTF(["/bust-1-d.glb", "/bust-2-d.glb", "/bust-3-d.glb", "/bust-4-d.glb"]);
  // By the time we're here these GLTFs exist, they're loaded
  // There are 800 instances of this component, but the GLTF data is cached and will be re-used ootb
  return (
    <Detailed distances={[0, 15, 25, 35, 100]} {...props}>
      {/* All we need to do is dump them into the Detailed component and define some distances
          Since we use a JSX mesh to represent each bust the geometry is being re-used w/o cloning */}
      {levels.map(({ nodes, materials }, index) => (
        <mesh
          receiveShadow
          castShadow
          key={index}
          geometry={nodes.Mesh_0001?.geometry}
          material={materials.default}
          material-envMapIntensity={0.25}
        />
      ))}
      <group />
    </Detailed>
  );
}
