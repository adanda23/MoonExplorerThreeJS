import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import './App.css'
import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { CubeTextureLoader } from 'three'
import { useThree } from '@react-three/fiber'
import { Leva, useControls } from 'leva'

const Sphere = ({ position, size, color, wire, rotate, displacement, speed }) => {
  const ref= useRef()
  //Setting displacement map and color map
  const heightmap = useLoader(TextureLoader, "maindisplacement.jpg")
  const colormap = useLoader(TextureLoader, "maincolor.jpg")

  //updates rotation based off time between frame
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * speed * rotate
  })
  
  return (
    <mesh 
      position={position} 
      ref={ref} 
    >
      <sphereGeometry args={size}/>
      <meshStandardMaterial wireframe={wire} color={color} map={colormap} displacementMap={heightmap} displacementScale={displacement}/>
    </mesh>
  )
}


function Skybox() {
  //loads a skybox, which is a cube with 6 textures
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png"
  ]);
  scene.background = texture;
  return null;
}

function App() {
  //Leva menu options
  const { intensity, wireframe, color, rotate, displacement, speed, light_position } = useControls({   
  light_position: [-1, -1, 0.6],
  intensity: {
    value: 1,
    min: 0,
    max: 2,
    step: 0.1,
  },
  wireframe: false,
  color: '#fff',
  rotate: {
    value: 1.0,
    min: 0,
    max: 1,
    step: 1,
  },
  displacement: {
    value: 3,
    min: 0,
    max: 5,
    step: 0.1,
  },
  speed: {
    value: 0.5,
    min: 0,
    max: 2,
    step: 0.1,
  }})
  return (
    // Creating the Canvas and the moon Object
    <>
      <Leva oneLineLabels={true}></Leva>
      <Canvas camera={{position: [0,0,100]}}>
        <OrbitControls></OrbitControls>
        <directionalLight position={light_position} intensity={intensity}/>
        <ambientLight intensity={0}/>
        <Sphere position={[0, 0, 0]} size={[50, 100, 50]} color={color} wire={wireframe} rotate={rotate} displacement={displacement} speed={speed}/>
        <Skybox/>
      </Canvas>
    </>
  )
}

export default App
