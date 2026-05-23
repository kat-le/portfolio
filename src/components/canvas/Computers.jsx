import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = () => {
  const computer = useGLTF('./pc_desk/scene.gltf')
  return (
    <mesh>
      <hemisphereLight intensity={2} groundColor='black' />
      <pointLight position={[0, -0.6, 0]} intensity={2.6} />
      <spotLight
        position={[-10, 50, 10]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <directionalLight position={[7, 5, 5]} intensity={8} />
      <primitive
        object={computer.scene}
        rotation={[0.10, 0, 0]}
        scale={0.05}
        position={[0, -7.4, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  return (
     <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 40], fov:11 }}
    >
      <Suspense>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}
export default ComputersCanvas; 
