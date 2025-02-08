import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"

let mouseX = 0
let mouseY = 0
let dampening = 10

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const loader = new GLTFLoader();

const renderScene = new RenderPass(scene, camera)
const composer = new EffectComposer(renderer)
composer.addPass(renderScene)

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1,
    1,
    0.1
)
composer.addPass(bloomPass)

let model

loader.load("text/text.gltf", function (gltf) {
    gltf.scene.rotation.x = THREE.MathUtils.degToRad(90)
    model = gltf.scene
	scene.add(gltf.scene)
}, undefined, function (error) {
	console.error(error)
})

camera.position.z += 4

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
scene.add( directionalLight );
scene.add(directionalLight.target)
directionalLight.target.position.z -= 2

document.body.onmousemove = function(event) {
    mouseX = event.clientX / window.innerWidth
    mouseY = event.clientY / window.innerHeight
}

function animate() {
    if (model) {
        model.rotation.x = Math.atan((mouseY - 0.5) / dampening) + THREE.MathUtils.degToRad(90)
        model.rotation.z = Math.atan(-(mouseX - 0.5) / dampening)
    }
    composer.render()
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

renderer.setAnimationLoop(animate)