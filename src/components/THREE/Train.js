import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei'


function Model() {

    const group = useRef()
    const { nodes } = useGLTF('/trainReact.glb')

    console.log(nodes)

    useFrame(() => {
        group.current.rotation.x = 5.09;
    })

    // material={ nodes.Train.material }
    
    return (
        <group ref={ group } position={ [0, 0, 0 ] } >
            <mesh visible position={ [0, 0, 0] }  geometry={ nodes.Train.geometry }>
                <meshStandardMaterial />
            </mesh>
        </group>
    )
}

export const Train = () => {

    return (
        <Canvas className="container" camera={ { position: [0, 0, 20], fov: 50 } } >
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    )
}
useGLTF.preload('/trainReact.glb')
