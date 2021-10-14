import * as THREE from "three"
import React, { Suspense, useLayoutEffect, useMemo, useRef } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { useTexture, Shadow } from "@react-three/drei"
import { a } from "@react-spring/three"
import DistortionMaterial from "../Material/DistortionMaterial"

const torus = new THREE.TorusBufferGeometry(5, 1.2, 128, 128)
const material1 = new DistortionMaterial()



function Shape({ geometry, material, textures, opacity, color, shadowScale = [9, 1.5, 1], ...props }) {

    const ref = useRef()
    const { mouse, clock } = useThree()

    const [ao, normal, height, roughness] = textures
    const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])

    useFrame(() => {
        if (ref.current) {
            rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 7, 0)
            ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
            ref.current.material.time = clock.getElapsedTime() * 3
        }
    })

    return (
        <group {...props}>
            <a.mesh
                ref={ref}
                geometry={geometry}
                material={material}
                material-color={color}
                material-aoMap={ao}
                material-normalMap={normal}
                material-displacementMap={height}
                material-roughnessMap={roughness}
                material-opacity={opacity}>
                <Shadow opacity={0.4} scale={shadowScale} position={[0, -8.5, 0]} />
            </a.mesh>
        </group>
    )
}



export function Toroide() {


    const textures = useTexture(["/img/ao.jpg", "/img/normal.jpg", "/img/height.png", "/img/roughness.jpg"])

    useLayoutEffect(() => {
        textures.forEach(texture => {
            texture.wrapT = texture.wrapS = THREE.RepeatWrapping 
            texture.repeat.set(4, 4)
        })
    }, [textures])


    return (
        <>
            <Canvas className="container" camera={{ position: [0, 0, 20], fov: 50 }} >
                <spotLight position={[0, 30, 40]} />
                <spotLight position={[-50, 30, 40]} />
                <Suspense fallback={null}>
                    <Shape geometry={torus} material={material1} textures={textures} color="white" opacity={1} />
                </Suspense>
            </Canvas>
        </>
    )
}
