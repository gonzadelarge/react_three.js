import React, { useRef, useState } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export const Toroide = () => {

    function Box(props) {

        const ref = useRef()

        const [hovered, setHover] = useState(false)
        const [active, setActive] = useState(false)

        useFrame(() => {
            ref.current.rotation.x = ref.current.rotation.y += 0.01
          })

        return (
            <mesh
                {...props}
                ref={ref}
                scale={active ? 1.5 : 1}
                onClick={(e) => setActive(!active)}
                onPointerOver={(e) => setHover(true)}
                onPointerOut={(e) => setHover(false)}>
                <torusGeometry args={[10, 3, 20, 80]} />
                <meshStandardMaterial color={ hovered ? 'crimson' : '#15e991' } />
            </mesh>
        )
    }

    return (
        <Canvas 
            className="container bg-0"
            camera={{ position: [0, 10, 65], fov: 40 }} 
            performance={{ min: 0.1 }}
        >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[0, 0, 0]} />
            <OrbitControls autoRotate={false} autoRotateSpeed={1} enableDamping />
        </Canvas>
    )
}
