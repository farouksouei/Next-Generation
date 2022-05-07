import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import bootstrap from 'bootstrap'
import { Camera } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null
/**
 * Phones And Stands
 */
 gltfLoader.load(
    '/models/rostore_sign.glb',
    (storesign) =>
    {
        storesign.scene.scale.set(0.06, 0.06, 0.06)
        storesign.scene.position.set(2.6, 1.9,-3)
        //storesign.scene.rotateZ(-(Math.PI / 16))
        scene.add(storesign.scene)

        // Animation
        mixer = new THREE.AnimationMixer(storesign.scene)
        const action = mixer.clipAction(storesign.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/store3dcomplete.glb',
    (store) =>
    {
        store.scene.scale.set(0.1, 0.1, 0.1)
        store.scene.position.set(1, 0, 0)
        store.scene.castShadow = true;
        store.scene.receiveShadow = true;
        scene.add(store.scene)

        // Animation
        mixer = new THREE.AnimationMixer(store.scene)
        const action = mixer.clipAction(store.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/s22ultra5g.glb',
    (samsung) =>
    {
        samsung.scene.scale.set(0.25, 0.25, 0.25)
        samsung.scene.position.set(3.65, 1.22,2.2)
        samsung.scene.rotateZ(-(Math.PI / 16))
        scene.add(samsung.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsung.scene)
        const action = mixer.clipAction(samsung.animations[2])
        action.play()
    }
)
gltfLoader.load(
    '/models/stando2.glb',
    (samsungStand) =>
    {
        samsungStand.scene.scale.set(0.75, 0.75, 0.5)
        samsungStand.scene.position.set(3.65, 1, 2.2)
        samsungStand.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand.scene)
        const action = mixer.clipAction(samsungStand.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/s22ultrawhite.glb',
    (samsung1) =>
    {
        samsung1.scene.scale.set(0.25, 0.25, 0.25)
        samsung1.scene.position.set(3.65, 1.22,1.9)
        samsung1.scene.rotateZ(-(Math.PI / 16))
        scene.add(samsung1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsung1.scene)
        const action = mixer.clipAction(samsung1.animations[2])
        action.play()
    }
)
gltfLoader.load(
    '/models/stando2.glb',
    (samsungStand1) =>
    {
        samsungStand1.scene.scale.set(0.75, 0.75, 0.5)
        samsungStand1.scene.position.set(3.65, 1, 1.9)
        samsungStand1.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand1.scene)
        const action = mixer.clipAction(samsungStand1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/s22ultragreen.glb',
    (samsung2) =>
    {
        samsung2.scene.scale.set(0.25, 0.25, 0.25)
        samsung2.scene.position.set(3.65, 1.22,1.6)
        samsung2.scene.rotateZ(-(Math.PI / 16))
        scene.add(samsung2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsung2.scene)
        const action = mixer.clipAction(samsung2.animations[2])
        action.play()
    }
)
gltfLoader.load(
    '/models/stando2.glb',
    (samsungStand2) =>
    {
        samsungStand2.scene.scale.set(0.75, 0.75, 0.5)
        samsungStand2.scene.position.set(3.65, 1, 1.6)
        samsungStand2.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand2.scene)
        const action = mixer.clipAction(samsungStand2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNs22ultra.glb',
    (samsungSigne) =>
    {
        samsungSigne.scene.scale.set(1.5, 1.5, 1.5)
        samsungSigne.scene.position.set(3.7, 1.125,  1.9)
        //samsungSigne.scene.rotateY(-(Math.PI ))
        scene.add(samsungSigne.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungSigne.scene)
        const action = mixer.clipAction(samsungSigne.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNs22ultra_price.glb',
    (samsungSignePrice) =>
    {
        samsungSignePrice.scene.scale.set(1.5, 1.5, 1.5)
        samsungSignePrice.scene.position.set(3.9, 1.225,  0)
        samsungSignePrice.scene.rotateY(-(Math.PI ))
        scene.add(samsungSignePrice.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungSignePrice.scene)
        const action = mixer.clipAction(samsungSignePrice.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/13ProMax.glb',
    (iphone13) =>
    {
        iphone13.scene.scale.set(0.25, 0.25, 0.25)
        iphone13.scene.position.set(3.69, 1.22, 4)
        iphone13.scene.rotateZ(-(Math.PI / 10))
        scene.add(iphone13.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphone13.scene)
        const action = mixer.clipAction(iphone13.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/stando2.glb',
    (iphoneStand) =>
    {
        iphoneStand.scene.scale.set(0.75, 0.75, 0.75)
        iphoneStand.scene.position.set(3.65, 1, 4)
        iphoneStand.scene.rotateY(-(Math.PI )/2)
        scene.add(iphoneStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneStand.scene)
        const action = mixer.clipAction(iphoneStand.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/13pro3d2.glb',
    (iphone132) =>
    {
        iphone132.scene.scale.set(0.25, 0.25, 0.25)
        iphone132.scene.position.set(3.69, 1.22, 3.5)
        iphone132.scene.rotateZ(-(Math.PI / 10))
        scene.add(iphone132.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphone132.scene)
        const action = mixer.clipAction(iphone132.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/stando2.glb',
    (iphoneStand2) =>
    {
        iphoneStand2.scene.scale.set(0.75, 0.75, 0.75)
        iphoneStand2.scene.position.set(3.65, 1, 3.5)
        iphoneStand2.scene.rotateY(-(Math.PI )/2)
        scene.add(iphoneStand2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneStand2.scene)
        const action = mixer.clipAction(iphoneStand2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/13pro3d3.glb',
    (iphone133) =>
    {
        iphone133.scene.scale.set(0.25, 0.25, 0.25)
        iphone133.scene.position.set(3.69, 1.22, 3.75)
        iphone133.scene.rotateZ(-(Math.PI / 10))
        scene.add(iphone133.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphone133.scene)
        const action = mixer.clipAction(iphone133.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/stando2.glb',
    (iphoneStand3) =>
    {
        iphoneStand3.scene.scale.set(0.75, 0.75, 0.75)
        iphoneStand3.scene.position.set(3.65, 1, 3.75)
        iphoneStand3.scene.rotateY(-(Math.PI )/2)
        scene.add(iphoneStand3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneStand3.scene)
        const action = mixer.clipAction(iphoneStand3.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGN13pro.glb',
    (iphoneSigne) =>
    {
        iphoneSigne.scene.scale.set(1.5, 1.5, 1.5)
        iphoneSigne.scene.position.set(3.7, 1.2,  4)
        //samsungSigne.scene.rotateY(-(Math.PI ))
        scene.add(iphoneSigne.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneSigne.scene)
        const action = mixer.clipAction(iphoneSigne.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/fixed-price-13-pro.glb',
    (iphoneSignePrice) =>
    {
        iphoneSignePrice.scene.scale.set(0.2, 0.2, 0.2)
        iphoneSignePrice.scene.position.set(3.85, 1.1, 2.5)
        iphoneSignePrice.scene.rotateY(-(Math.PI ))
        scene.add(iphoneSignePrice.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneSignePrice.scene)
        const action = mixer.clipAction(iphoneSignePrice.animations[2])
        action.play()
    }
)

//Create a new sphere in three js
const sphere = new THREE.SphereGeometry(0.5, 32, 32)
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xf4ff55 })
const sphereMesh = new THREE.Mesh(sphere, sphereMaterial)
sphereMesh.position.set(-0.5, 0, 0)
scene.add(sphereMesh)




/**
 * PCs
 */

 gltfLoader.load(
    '/models/tv2.glb',
    (tv) =>
    {
        tv.scene.scale.set(0.75, 0.75, 0.75)
        tv.scene.position.set(-2, 1.15, 0.25)
        tv.scene.rotateY((Math.PI )/2)
        scene.add(tv.scene)

        // Animation
        mixer = new THREE.AnimationMixer(tv.scene)
        const action = mixer.clipAction(tv.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/macbookpro.glb',
    (macbook) =>
    {
        macbook.scene.scale.set(0.15, 0.15, 0.15)
        macbook.scene.position.set(1.35, 1, 0.1)
        macbook.scene.rotateY(-(Math.PI ))
        macbook.scene.castShadow = true;
        scene.add(macbook.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook.scene)
        const action = mixer.clipAction(macbook.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/MacBookProblend.glb',
    (macbook3) =>
    {
        macbook3.scene.scale.set(0.15, 0.15, 0.15)
        macbook3.scene.position.set(1.218, 0.87, 1.6)
        macbook3.scene.rotateY(-(Math.PI )/2)
        macbook3.scene.castShadow = true;
        scene.add(macbook3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook3.scene)
        const action = mixer.clipAction(macbook3.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/MacBookProblend.glb',
    (macbook5) =>
    {
        macbook5.scene.scale.set(0.175, 0.175, 0.175)
        macbook5.scene.position.set(1.1, 0.87, 3.7)
        macbook5.scene.rotateY(-(Math.PI )/2)
        macbook5.scene.castShadow = true;
        scene.add(macbook5.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook5.scene)
        const action = mixer.clipAction(macbook5.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/macbookpro.glb',
    (macbook2) =>
    {
        macbook2.scene.scale.set(0.125, 0.125, 0.125)
        macbook2.scene.position.set(0.65, 1, 0.6)
        macbook2.scene.castShadow = true;
        //macbook2.scene.rotateY((Math.PI )/2)
        scene.add(macbook2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook2.scene)
        const action = mixer.clipAction(macbook2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/macbookpro.glb',
    (macbook4) =>
    {
        macbook4.scene.scale.set(0.175, 0.175, 0.175)
        macbook4.scene.position.set(0.65, 1, 2.2)
        //macbook2.scene.rotateY((Math.PI )/2)
        scene.add(macbook4.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook4.scene)
        const action = mixer.clipAction(macbook4.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNMACBOOK.glb',
    (signemacbook) =>
    {
        signemacbook.scene.scale.set(1.2, 1.2, 1.2)
        signemacbook.scene.position.set(0.65, 1, 1.5)
        //macbook2.scene.rotateY((Math.PI )/2)
        scene.add(signemacbook.scene)

        // Animation
        mixer = new THREE.AnimationMixer(signemacbook.scene)
        const action = mixer.clipAction(signemacbook.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNMACBOOK.glb',
    (signemacbook1) =>
    {
        signemacbook1.scene.scale.set(1.2, 1.2, 1.2)
        signemacbook1.scene.position.set(1.4, 1.1, 2.2)
        signemacbook1.scene.rotateY(-(Math.PI ))
        scene.add(signemacbook1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(signemacbook1.scene)
        const action = mixer.clipAction(signemacbook1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNmacbook-pro_price.glb',
    (signemacbook1) =>
    {
        signemacbook1.scene.scale.set(1.5, 1.5, 1.5)
        signemacbook1.scene.position.set(1.3, 1.2, 4.215)
        
        scene.add(signemacbook1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(signemacbook1.scene)
        const action = mixer.clipAction(signemacbook1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNmacbook-pro_price.glb',
    (signemacbook12) =>
    {
        signemacbook12.scene.scale.set(1.5, 1.5, 1.5)
        signemacbook12.scene.position.set(1.4, 1.2, 1.5)
        signemacbook12.scene.rotateY((Math.PI ))
        scene.add(signemacbook12.scene)

        // Animation
        mixer = new THREE.AnimationMixer(signemacbook12.scene)
        const action = mixer.clipAction(signemacbook12.animations[2])
        action.play()
    }
)


//Speaker 1
gltfLoader.load(
    '/models/speaker1.glb',
    (speaker1) =>
    {
        speaker1.scene.scale.set(0.25, 0.25, 0.25)
        speaker1.scene.position.set(0.5, 2.9, 13.2)
        speaker1.scene.rotateY(-(Math.PI ))
        scene.add(speaker1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker1.scene)
        const action = mixer.clipAction(speaker1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker111) =>
    {
        speaker111.scene.scale.set(0.25, 0.25, 0.25)
        speaker111.scene.position.set(0.2 ,2.9, 13.2)
        speaker111.scene.rotateY((Math.PI )/2)
        scene.add(speaker111.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker111.scene)
        const action = mixer.clipAction(speaker111.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker12) =>
    {
        speaker12.scene.scale.set(0.3, 0.3, 0.3)
        speaker12.scene.position.set(- 0.7, 2.98, 13.2)
        speaker12.scene.rotateY(-(Math.PI ))
        scene.add(speaker12.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker12.scene)
        const action = mixer.clipAction(speaker12.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker17) =>
    {
        speaker17.scene.scale.set(0.3, 0.3, 0.3)
        speaker17.scene.position.set(-1.1, 2.98, 13.2)
        speaker17.scene.rotateY((Math.PI ) /2)
        scene.add(speaker17.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker17.scene)
        const action = mixer.clipAction(speaker17.animations[2])
        action.play()
    }
)

// Speaker 1 Group


gltfLoader.load(
    '/models/speaker1.glb',
    (speaker132) =>
    {
        speaker132.scene.scale.set(0.25, 0.25, 0.25)
        speaker132.scene.position.set(2.2 , 2.98, 13.2)
        speaker132.scene.rotateY((Math.PI ) /2)
        scene.add(speaker132.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker132.scene)
        const action = mixer.clipAction(speaker132.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker133) =>
    {
        speaker133.scene.scale.set(0.3, 0.3, 0.3)
        speaker133.scene.position.set(1.9, 2.98, 13.2)
        speaker133.scene.rotateY((Math.PI ) /2)
        scene.add(speaker133.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker133.scene)
        const action = mixer.clipAction(speaker133.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker134) =>
    {
        speaker134.scene.scale.set(0.25, 0.25, 0.25)
        speaker134.scene.position.set(2.7 , 2.98, 13.2)
        speaker134.scene.rotateY((Math.PI )/2)
        scene.add(speaker134.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker134.scene)
        const action = mixer.clipAction(speaker134.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker333) =>
    {
        speaker333.scene.scale.set(0.3, 0.3, 0.3)
        speaker333.scene.position.set(3, 2.98, 13.2)
        speaker333.scene.rotateY((Math.PI )/2)
        scene.add(speaker333.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker333.scene)
        const action = mixer.clipAction(speaker333.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/speaker3.glb',
    (speaker321) =>
    {
        speaker321.scene.scale.set(0.45, 0.45, 0.45)
        speaker321.scene.position.set(- 1.1, 1.14, 13.2)
        speaker321.scene.rotateY((Math.PI ) / 2)
        scene.add(speaker321.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker321.scene)
        const action = mixer.clipAction(speaker321.animations[2])
        action.play()
    }
)

//Speaker 2

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker2) =>
    {
        speaker2.scene.scale.set(0.2, 0.2, 0.2)
        speaker2.scene.position.set(0.5, 1.75, 13.2)
        speaker2.scene.rotateY(-(Math.PI ))
        scene.add(speaker2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker2.scene)
        const action = mixer.clipAction(speaker2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker211) =>
    {
        speaker211.scene.scale.set(0.2, 0.2, 0.2)
        speaker211.scene.position.set(0.2 , 1.75, 13.2)
        speaker211.scene.rotateY((Math.PI )/2)
        scene.add(speaker211.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker211.scene)
        const action = mixer.clipAction(speaker211.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker22) =>
    {
        speaker22.scene.scale.set(0.25, 0.2, 0.25)
        speaker22.scene.position.set(- 0.7, 1.74, 13.2)
        speaker22.scene.rotateY(-(Math.PI ))
        scene.add(speaker22.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker22.scene)
        const action = mixer.clipAction(speaker22.animations[2])
        action.play()
    }
)

// Speaker 2 Group
gltfLoader.load(
    '/models/speaker2.glb',
    (speaker211) =>
    {
        speaker211.scene.scale.set(0.2, 0.2, 0.2)
        speaker211.scene.position.set(2.2 , 1.75, 13.2)
        speaker211.scene.rotateY((Math.PI )/2)
        scene.add(speaker211.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker211.scene)
        const action = mixer.clipAction(speaker211.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker231) =>
    {
        speaker231.scene.scale.set(0.25, 0.2, 0.25)
        speaker231.scene.position.set(1.9, 1.75, 13.2)
        speaker231.scene.rotateY((Math.PI )/2)
        scene.add(speaker231.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker231.scene)
        const action = mixer.clipAction(speaker231.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker232) =>
    {
        speaker232.scene.scale.set(0.2, 0.2, 0.2)
        speaker232.scene.position.set(2.7 , 1.75, 13.2)
        speaker232.scene.rotateY( (Math.PI )/2)
        scene.add(speaker232.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker232.scene)
        const action = mixer.clipAction(speaker232.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker233) =>
    {
        speaker233.scene.scale.set(0.25, 0.2, 0.2)
        speaker233.scene.position.set(3, 1.75, 13.2)
        speaker233.scene.rotateY((Math.PI )/2)
        scene.add(speaker233.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker233.scene)
        const action = mixer.clipAction(speaker233.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/speaker2.glb',
    (speaker221) =>
    {
        speaker221.scene.scale.set(0.25, 0.2, 0.25)
        speaker221.scene.position.set(- 1.1, 1.75, 13.2)
        speaker221.scene.rotateY((Math.PI ) / 2)
        scene.add(speaker221.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker221.scene)
        const action = mixer.clipAction(speaker221.animations[2])
        action.play()
    }
)
//Speaker 3

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker3) =>
    {
        speaker3.scene.scale.set(0.35, 0.35, 0.35)
        speaker3.scene.position.set(0.5, 1.09, 13.2)
        speaker3.scene.rotateY(-(Math.PI ))
        scene.add(speaker3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker3.scene)
        const action = mixer.clipAction(speaker3.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker311) =>
    {
        speaker311.scene.scale.set(0.35, 0.35, 0.35)
        speaker311.scene.position.set(0.2 , 1.09, 13.2)
        speaker311.scene.rotateY((Math.PI )/2)
        scene.add(speaker311.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker311.scene)
        const action = mixer.clipAction(speaker311.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker32) =>
    {
        speaker32.scene.scale.set(0.45, 0.45, 0.45)
        speaker32.scene.position.set(- 0.7, 1.14, 13.2)
        speaker32.scene.rotateY(-(Math.PI ))
        scene.add(speaker32.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker32.scene)
        const action = mixer.clipAction(speaker32.animations[2])
        action.play()
    }
)

// Speaker 3 Group
gltfLoader.load(
    '/models/speaker3.glb',
    (speaker311) =>
    {
        speaker311.scene.scale.set(0.35, 0.35, 0.35)
        speaker311.scene.position.set(2.2 , 1.09, 13.2)
        speaker311.scene.rotateY(- (Math.PI ))
        scene.add(speaker311.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker311.scene)
        const action = mixer.clipAction(speaker311.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker331) =>
    {
        speaker331.scene.scale.set(0.45, 0.45, 0.45)
        speaker331.scene.position.set(1.9, 1.14, 13.2)
        speaker331.scene.rotateY(-(Math.PI ))
        scene.add(speaker331.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker331.scene)
        const action = mixer.clipAction(speaker331.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker332) =>
    {
        speaker332.scene.scale.set(0.35, 0.35, 0.35)
        speaker332.scene.position.set(2.7 , 1.09, 13.2)
        speaker332.scene.rotateY(- (Math.PI ))
        scene.add(speaker332.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker332.scene)
        const action = mixer.clipAction(speaker332.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker333) =>
    {
        speaker333.scene.scale.set(0.45, 0.45, 0.45)
        speaker333.scene.position.set(3, 1.14, 13.2)
        speaker333.scene.rotateY(-(Math.PI ))
        scene.add(speaker333.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker333.scene)
        const action = mixer.clipAction(speaker333.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/speaker3.glb',
    (speaker321) =>
    {
        speaker321.scene.scale.set(0.45, 0.45, 0.45)
        speaker321.scene.position.set(- 1.1, 1.14, 13.2)
        speaker321.scene.rotateY((Math.PI ) / 2)
        scene.add(speaker321.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker321.scene)
        const action = mixer.clipAction(speaker321.animations[2])
        action.play()
    }
)


//Flash disks
gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk) =>
    {
        flashdisk.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk.scene.position.set(- 1.6, 2, -3.1)
        flashdisk.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk1) =>
    {
        flashdisk1.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk1.scene.position.set(- 1.6, 2, -3)
        flashdisk1.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk1.scene)
        const action = mixer.clipAction(flashdisk1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk11) =>
    {
        flashdisk11.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk11.scene.position.set(- 1.6, 2, -2.9)
        flashdisk11.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk11.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

//SET 2

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk) =>
    {
        flashdisk.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk.scene.position.set(0.4, 2, -3.1)
        flashdisk.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk1) =>
    {
        flashdisk1.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk1.scene.position.set(0.4, 2, -3)
        flashdisk1.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk1.scene)
        const action = mixer.clipAction(flashdisk1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk11) =>
    {
        flashdisk11.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk11.scene.position.set(0.4, 2, -2.9)
        flashdisk11.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk11.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk2) =>
    {
        flashdisk2.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk2.scene.position.set(-1.1, 2, -3.1)
        flashdisk2.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk2.scene)
        const action = mixer.clipAction(flashdisk2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk21) =>
    {
        flashdisk21.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk21.scene.position.set(-1.1, 2, -3)
        flashdisk21.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk21.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk21.scene)
        const action = mixer.clipAction(flashdisk21.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk211) =>
    {
        flashdisk211.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk211.scene.position.set(-1.1, 2, -2.9)
        flashdisk211.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk211.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk211.scene)
        const action = mixer.clipAction(flashdisk211.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk2) =>
    {
        flashdisk2.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk2.scene.position.set(-0.1, 2, -3.1)
        flashdisk2.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk2.scene)
        const action = mixer.clipAction(flashdisk2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk21) =>
    {
        flashdisk21.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk21.scene.position.set(-0.1, 2, -3)
        flashdisk21.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk21.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk21.scene)
        const action = mixer.clipAction(flashdisk21.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk211) =>
    {
        flashdisk211.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk211.scene.position.set(-0.1, 2, -2.9)
        flashdisk211.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk211.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk211.scene)
        const action = mixer.clipAction(flashdisk211.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk3.glb',
    (flashdisk31) =>
    {
        flashdisk31.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk31.scene.position.set(-0.6, 2, -3)
        flashdisk31.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk31.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk31.scene)
        const action = mixer.clipAction(flashdisk31.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk3.glb',
    (flashdisk311) =>
    {
        flashdisk311.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk311.scene.position.set(-0.6, 2, -2.9)
        flashdisk311.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk311.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk311.scene)
        const action = mixer.clipAction(flashdisk311.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk3.glb',
    (flashdisk3) =>
    {
        flashdisk3.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk3.scene.position.set(-0.6, 2, -3.1)
        flashdisk3.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

//Random electronic objects

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 0)
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight1.castShadow = true
directionalLight1.shadow.mapSize.set(1024, 1024)
directionalLight1.shadow.camera.far = 15
directionalLight1.shadow.camera.left = 7
directionalLight1.shadow.camera.top = - 7
directionalLight1.shadow.camera.right = - 7
directionalLight1.shadow.camera.bottom = 7
directionalLight1.position.set(5,5, 0)
scene.add(directionalLight)
scene.add(directionalLight1)
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500
directionalLight1.shadow.mapSize.width = 512; // default
directionalLight1.shadow.mapSize.height = 512; // default
directionalLight1.shadow.camera.near = 0.5; // default
directionalLight1.shadow.camera.far = 500


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
camera.position.set(10, 4, 9)
camera.position.set(0, 1.5, 5)
scene.add(camera)
//camera.lookAt(0, 0, 0)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.set(1, 0, 14)
controls.target.set(0, 0, 0)
//controls.maxDistance = 10

controls.enableDamping = true
/*
controls.maxPolarAngle = Math.PI /2.2
*/
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'

})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding
//renderer.physicallyCorrectLights = true

/**
 * Animate
 */

const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation
    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()