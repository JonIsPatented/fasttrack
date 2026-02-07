import {Suspense} from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {OrbitControls, Bounds, Environment} from '@react-three/drei'

import Coaster from './Coaster.tsx'
import '../styles/Landing.css'


function Landing(){
  return(
    <section className="landingPage">
      <Canvas 
        className="canvas" 
        camera={{near: 0.1, far: 1000, position: [20, 20, 4] }}
      >
        <Suspense fallback={null}>
         
          <Bounds fit clip observe margin='.3'>
            <Coaster/>
          </Bounds>

          <Environment preset="dawn"/>
        </Suspense>

      </Canvas>
    </section>
  )
}
export default Landing;
