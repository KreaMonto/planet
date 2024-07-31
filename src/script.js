import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import WorldMap from "../static/WorldMap.png"
import MoonMap from "../static/Moonmap.png"
import Background from "../static/stars.jpg"

console.log('Working!')

// Main configuration
// ---------------------------------


// ----------------------------------------------------------------
// Renderer
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000)

// creating the DOM element
document.body.appendChild(renderer.domElement)

// creating the scene
const scene = new THREE.Scene()


// creating a camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)


// setting up controls
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;
// controls.update()

// a grid helper ---- (should be commented later)
// const gridHelper = new THREE.GridHelper(140)
// scene.add(gridHelper)


// camera initial position
camera.position.set(0, 80, 300)


// GUI
// ------------------
const params = {
    sunIntensity: 2.0,
    ambientLight: 0.5
}

const gui = new dat.GUI()
gui.add(params, "sunIntensity", 0.0, 5.0, 0.1).onChange((val) => {
    directionalLight.intensity = val
}).name("Sun Intensity")

gui.add(params, "ambientLight", 0.0, 5.0, 0.1).onChange((val) => {
    ambientLight.intensity = val
}).name("Ambient Light")


// Textures
// ----------------------------


// -------------------------------------

// Loaders
const loader = new THREE.TextureLoader()
// const cubeLoader = new THREE.CubeTextureLoader()

// loading the earth texture --- they are not working idn why!!!
const earthTexture = loader.load(WorldMap, texture => {
    console.log(texture)
})
const moonTexture = loader.load(MoonMap, texture => {
    console.log(texture)
})

const starsBackground = loader.load(Background)

scene.background = starsBackground

// Update background position based on camera movement
// function updateBackgroundPosition() {
//     starsBackground.offset.x = -camera.position.x / 100;
//     starsBackground.offset.y = -camera.position.y / 100;
// }

// // Call updateBackgroundPosition on camera change
// controls.addEventListener('change', updateBackgroundPosition);

// -------------------------------------

// Earth
const earthGeometry = new THREE.SphereGeometry(20, 32, 32)
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture })
const earth = new THREE.Mesh(earthGeometry, earthMaterial)
scene.add(earth)
earth.castShadow = true
earth.receiveShadow = true

// setting cammera to always look at earth
camera.lookAt(earth.position)

// Moon
const moonGeometry = new THREE.SphereGeometry(5, 32, 32)
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture })
const moon = new THREE.Mesh(moonGeometry, moonMaterial)
scene.add(moon)
moon.position.set(100, 0, 0)
moon.castShadow = true
moon.receiveShadow = true

// Movement
let earthRotation = 0
let moonRotation = 0
let moonOrbit = 0
let moonOrbitSpeed = 0.001
let earthRotationSpeed = -0.01
let moonRotationSpeed = 0.01

// Earth Rotation
// -------------------------
function earthMovement() {
    earthRotation += earthRotationSpeed
    earth.rotation.y = earthRotation
}

// Moon Orbit
// -------------------------
function moonOrbitMovement() {
    moonOrbit += moonOrbitSpeed
    const a = 120 // max radius
    const b = 70 // min radius
    const theta = Math.PI / 4 // inclination angle
    const t = moonOrbit
    moon.position.x = a * Math.cos(t) * Math.cos(theta) - b * Math.sin(t) * Math.sin(theta) + earth.position.x
    moon.position.z = a * Math.cos(t) * Math.sin(theta) + b * Math.sin(t) * Math.cos(theta) + earth.position.z
}



// Lights
// -------------------------

// ----------------------------------------
// soft ambient light
const ambientLight = new THREE.AmbientLight(0x333333, 1)
scene.add(ambientLight)

// directional light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
scene.add(directionalLight)
directionalLight.position.set(150, 12, 60)
directionalLight.castShadow = true

// Configure the shadow camera
directionalLight.shadow.camera.left = -40;
directionalLight.shadow.camera.right = 40;
directionalLight.shadow.camera.top = 40;
directionalLight.shadow.camera.bottom = -40;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.mapSize.width = 400;
directionalLight.shadow.mapSize.height = 400;

directionalLight.lookAt(earth.position)

// directional lighet helper
// const helper = new THREE.DirectionalLightHelper(directionalLight, 10)
// scene.add(helper)

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dLightShadowHelper)


// animation and render
// -------------------------

// -------------------------------------
function animate() {
    earthMovement()
    moonOrbitMovement()
    moonRotation += moonRotationSpeed
    moon.rotation.y = moonRotation
    earth.rotation.y = earthRotation

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)