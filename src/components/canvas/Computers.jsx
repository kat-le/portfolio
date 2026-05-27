import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./computer_desk/scene.gltf')
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
        rotation={[0.1, 0, 0]}
        scale={isMobile ? 0.03 : 0.05}
        position={isMobile ? [0, -3.5, 0] : [0, -6, 0]}
      />
    </mesh>
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
      camera={{ position: [20, 3, 40], fov:11 }}
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
