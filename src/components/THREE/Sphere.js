import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { FlakesTexture } from 'three-stdlib'

function Box(props) {

        const ref = useRef();
        const [hovered, setHover] = useState(false)
        const [active, setActive] = useState(false)


        useFrame(() => {
            ref.current.rotation.x = ref.current.rotation.y += 0.001
        })

        let texture = new THREE.CanvasTexture(new FlakesTexture(), THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping)
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      
        texture.repeat.x = 20;
        texture.repeat.y = 10;


        return (
            <mesh
                {...props}
                ref={ref}
                scale={active ? 1.5 : 1}
                onClick={(e) => setActive(!active)}
                onPointerOver={(e) => setHover(true)}
                onPointerOut={(e) => setHover(false)}>
                <sphereGeometry args={[3.5, 50, 50]} attach="geometry" />
                <meshPhysicalMaterial
                    attach="material"
                    clearcoat={1.0}
                    clearcoatRoughness={0.1}
                    metalness={0.9}
                    roughness={0.5}
                    color={hovered ? '#8418ca' : '#15e991'}
                    normalMap={texture}
                />
            </mesh>
        )
    }

export const Sphere = () => {


    return (
        <Canvas className="container bg-0" camera={{ position: [0, 0, 20], fov: 50 }} performance={{ min: 0.1 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[5, -0.5, 1.5]} />
            <Box position={[-5, 1, -1.5]} />
            <OrbitControls autoRotate={false} autoRotateSpeed={1} enableDamping />
        </Canvas>
    )
}
