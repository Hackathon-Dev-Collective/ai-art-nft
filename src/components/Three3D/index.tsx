"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useRef } from "react";
import { Mesh } from "three";

// Box component that rotates
const RotatingBox = () => {
  const meshRef = useRef<Mesh>(null!);

  // Rotate the cube every frame
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
};
// demo 3D
const Water = () => {
  return (
    <div className="w-full h-[300px]">
      <Canvas>
        {/* Lighting in the scene */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Rotating 3D cube */}
        <RotatingBox />

        {/* Controls to allow orbiting around */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Water;
