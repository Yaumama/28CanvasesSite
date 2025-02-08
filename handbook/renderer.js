import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

let positions = [
    new THREE.Vector3(50, 0, 0),
    new THREE.Vector3(10, 17.5, 30),
    new THREE.Vector3(10, 13.5, 13),
    new THREE.Vector3(10, -1.5, 24),
    new THREE.Vector3(10, 15, -23),
    new THREE.Vector3(10, -3.4, -4.8),
    new THREE.Vector3(10, -15.2, -23),
    new THREE.Vector3(10, -17.3, 14.4),
    new THREE.Vector3(10, 16, -5),
]

let currentPosition = 0
let canScroll = true
let animProgress = 1
let currentCamPos = new THREE.Vector3(positions[0].x, positions[0].y, positions[0].z)
let oldTime = Date.now()

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const loader = new GLTFLoader();

loader.load("bulletinBoardModel/board.gltf", function (gltf) {
	scene.add(gltf.scene)
}, undefined, function (error) {
	console.error(error)
})

const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

camera.rotation.y = THREE.MathUtils.degToRad(90)

function clamp(num, min, max) {
    if (num > max) {return max}
    if (num < min) {return min}
    return num
}

window.onwheel = function(e) {
    let tip = document.querySelector(".tip")
    if (tip && tip.style.opacity != "0") {
        tip.style.opacity = "0"
        setTimeout(function() {
            tip.remove()
        }, 500)
    }
    if (e.deltaY > 0) {
        if (currentPosition + 1 > positions.length - 1) {return}
        animProgress = 0
        currentPosition += 1
        currentPosition = clamp(currentPosition, 0, positions.length - 1)
    } else if (e.deltaY < 0) {
        if (currentPosition - 1 < 0) {return}
        animProgress = 0
        currentPosition -= 1
        currentPosition = clamp(currentPosition, 0, positions.length - 1)
    }
}

function animate() {
    let deltaTime = (Date.now() - oldTime) / 1000
    oldTime = Date.now()
    if (animProgress < 1) {
        animProgress += 2 * deltaTime
        animProgress = clamp(animProgress, 0, 1)
        currentCamPos.lerp(positions[currentPosition], THREE.MathUtils.smoothstep(animProgress, 0, 1))
    }
    camera.position.x = currentCamPos.x
    camera.position.y = currentCamPos.y
    camera.position.z = currentCamPos.z
	renderer.render(scene, camera)
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

renderer.setAnimationLoop(animate)