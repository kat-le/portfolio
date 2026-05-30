import { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./computer_desk/scene.gltf')
  const lightRef = useRef();

  computer.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  return (
   <>
    <ambientLight intensity={0.35} />

    <directionalLight
      position={[5, 8, 5]}
      intensity={10}
      color="#ffd6b0"
      castShadow
    />

    { <spotLight
      ref={lightRef}
      target-position={[-5, 10, 5]}
      angle={0.2}
      penumbra={0}
      intensity={500}
      distance={15} 
      color="#fff2dd"
      castShadow
    /> }

    <primitive
      object={computer.scene}
      rotation={[0.1, 0, 0]}
      scale={isMobile ? 0.03 : 0.05}
      position={isMobile ? [0, -3.5, 0] : [0, 0, 0]}
      castShadow
      receiveShadow
    />

    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3.7, 0]}
      receiveShadow
    >
      <planeGeometry args={[50, 50]} />
      <shadowMaterial opacity={0.35} />
    </mesh>
  </>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
   console.log(window.innerWidth);
  console.log(isMobile);

useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 500px)");

  setIsMobile(mediaQuery.matches);

  const handleMediaQueryChange = (e) => {
    setIsMobile(e.matches);
  };

  mediaQuery.addEventListener("change", handleMediaQueryChange);

  return () => {
    mediaQuery.removeEventListener("change", handleMediaQueryChange);
  };
}, []);

  return (
     <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [1, 3, 18], fov:30 }}
    >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}
export default ComputersCanvas; 
