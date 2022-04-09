import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

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
    '/models/store3d44.glb',
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
        samsung.scene.scale.set(0.5, 0.5, 0.5)
        samsung.scene.position.set(3.7, 1.457,- 0.5)
        samsung.scene.rotateZ(-(Math.PI / 8))
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
        samsungStand.scene.scale.set(1.5, 1.5, 1.5)
        samsungStand.scene.position.set(3.65, 1, - 0.5)
        samsungStand.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand.scene)
        const action = mixer.clipAction(samsungStand.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/13ProMax.glb',
    (iphone13) =>
    {
        iphone13.scene.scale.set(0.5, 0.5, 0.5)
        iphone13.scene.position.set(3.75, 1.4, 4)
        iphone13.scene.rotateZ(-(Math.PI / 8))
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
        iphoneStand.scene.scale.set(1.5, 1.5, 1.5)
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
        iphone132.scene.scale.set(0.5, 0.5, 0.5)
        iphone132.scene.position.set(3.75, 1.4, 3.5)
        iphone132.scene.rotateZ(-(Math.PI / 8))
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
        iphoneStand2.scene.scale.set(1.5, 1.5, 1.5)
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
        iphone133.scene.scale.set(0.5, 0.5, 0.5)
        iphone133.scene.position.set(3.75, 1.4, 3)
        iphone133.scene.rotateZ(-(Math.PI / 8))
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
        iphoneStand3.scene.scale.set(1.5, 1.5, 1.5)
        iphoneStand3.scene.position.set(3.65, 1, 3)
        iphoneStand3.scene.rotateY(-(Math.PI )/2)
        scene.add(iphoneStand3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneStand3.scene)
        const action = mixer.clipAction(iphoneStand3.animations[2])
        action.play()
    }
)

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
        macbook3.scene.position.set(1.15, 0.87, 1)
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
    '/models/macbookpro.glb',
    (macbook2) =>
    {
        macbook2.scene.scale.set(0.15, 0.15, 0.15)
        macbook2.scene.position.set(0.65, 1, -0.188)
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
        macbook4.scene.scale.set(0.15, 0.15, 0.15)
        macbook4.scene.position.set(0.65, 1, 0.718)
        //macbook2.scene.rotateY((Math.PI )/2)
        scene.add(macbook4.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook4.scene)
        const action = mixer.clipAction(macbook4.animations[2])
        action.play()
    }
)

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
camera.position.set(10, 4, 5)
camera.position.set(0, 1.5, 5)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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