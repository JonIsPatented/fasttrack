import {Suspense} from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {OrbitControls, Bounds} from '@react-three/drei'

import Loader from './Loader.tsx'
import Coaster from './Coaster.tsx'


function Landing(){
  return(
    <div className="landingPage">
      <Canvas 
        className="canvas" 
        camera={{near: 0.1, far: 1000, position: [20, 20, 0]}}
      >
        <Suspense fallback={<Loader/>}>
          <ambientLight color='#FFFFFF' intensity={5}/>
          <Bounds fit clip observe margin='.3'>
            <Coaster/>
          </Bounds>
        </Suspense>

      </Canvas>

    </div>
  )
}
export default Landing;
