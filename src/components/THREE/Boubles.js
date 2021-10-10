import * as THREE from "three"
import { useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, usePlane, useCompoundBody, useSphere } from "@react-three/cannon"
import { EffectComposer, SSAO } from "@react-three/postprocessing"

const baubleMaterial = new THREE.MeshLambertMaterial({ color: "#9b4de4", emissive: "#401d61" })
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)
const baubles = [...Array(40)].map(() => ({
    args: [0.6, 0.6, 0.8, 0.8, 1][Math.floor(Math.random() * 5)],
    mass: 1,
    angularDamping: 0.3,
    linearDamping: 0.95
}))

const Bauble = ({ vector = new THREE.Vector3(), ...props }) => {
  
    const [ref, api] = useCompoundBody(() => ({
        ...props,
        shapes: [
            {
                type: "Box",
                position: [0, 0, 1.2 * props.args],
                args: new THREE.Vector3().setScalar(props.args * 0.4).toArray()
            },
            { type: "Sphere", args: props.args },
        ]
    }))

    useEffect(() => {

        api.position.subscribe(p => {
            api.applyForce(vector.set(...p)
                .normalize()
                .multiplyScalar(-props.args * 35)
                .toArray(), [0, 0, 0])
        })
    }, [api, vector, props.args])

    return (
        <group ref={ref} dispose={null}>
            <mesh castShadow receiveShadow scale={props.args} geometry={sphereGeometry} material={baubleMaterial} />
        </group>
    )
}

const Collisions = () => {

    const viewport = useThree((state) => state.viewport)

    usePlane(() => ({ position: [0, 0, 0], rotation: [0, 0, 0] }))
    usePlane(() => ({ position: [0, 0, 8], rotation: [0, -Math.PI, 0] }))
    usePlane(() => ({ position: [0, -4, 0], rotation: [-Math.PI / 2, 0, 0] }))
    usePlane(() => ({ position: [0, 4, 0], rotation: [Math.PI / 2, 0, 0] }))
    
    const [, api] = useSphere(() => ([]))

    return useFrame(state => {
        api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 2.5)
    })
}

export const Boubles = () => {

    return (
        <Canvas
            className="container"
            camera={ { position: [0, 0, 20], fov: 35, near: 10, far: 40 } }
        >
            <ambientLight intensity={0.5} />
            <spotLight position={ [20, 20, 25] } penumbra={1} angle={ 0.2 } color="#b380e2" />
            <directionalLight position={ [0, 5, -4] } intensity={4} />
            <directionalLight position={ [0, -15, -0] } intensity={4} color="#9b4de4" />

            <Physics gravity={[0, 0, 0]} iterations={1} >
                <Collisions />
                { baubles.map( (props, i) => <Bauble key={i} {...props} /> ) }
            </Physics>

            <EffectComposer multisampling={0}>
                <SSAO samples={11} radius={30} intensity={20} luminanceInfluence={0.6} color="crimson" />
                <SSAO samples={21} radius={5} intensity={30} luminanceInfluence={0.6} color="crimson" />
            </EffectComposer>
        </Canvas>
    )
}