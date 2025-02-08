import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"

export function createScene(elem, link) {
    let screenWidth = elem.clientWidth
    let screenHeight = elem.clientHeight
    let oldTime = Date.now()
    let canClick = true
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000)
    
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0xffffff)
    renderer.setSize(screenWidth, screenHeight)
    renderer.domElement.classList.add("Scene3d")
    elem.appendChild(renderer.domElement)
    
    const renderScene = new RenderPass(scene, camera)
    const composer = new EffectComposer(renderer)
    composer.addPass(renderScene)
    
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(screenWidth, screenHeight),
        0.5,
        0.1,
        0.99
    )
    composer.addPass(bloomPass)

    let model
    let modelRotation = 0
    let rotationSpeed = 0
    let camAnimProgress = 1
    let finished = false

    const loader = new GLTFLoader();

    loader.load("doorModel/door.gltf", function (gltf) {
        model = gltf.scene
        model.position.x = 0.979
        scene.add(gltf.scene)
    }, undefined, function (error) {
        console.error(error)
    })

    camera.position.z = 1.854
    camera.position.y = 0.25
    
    const light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    setTimeout(function() {
        rotationSpeed = 1
    }, 1000)
    
    function animate() {
        let deltaTime = (Date.now() - oldTime) / 1000
        oldTime = Date.now()

        if (model) {
            modelRotation += rotationSpeed * deltaTime
            if (modelRotation > 1) {
                modelRotation = 1
                if (!finished) {
                    finished = true
                    renderer.domElement.style.cursor = "pointer"
                    renderer.domElement.onclick = function() {
                        if (!canClick) {return}
                        canClick = false
                        camAnimProgress = 0
                        let whiteScreen = document.createElement("div")
                        whiteScreen.style.position = "absolute"
                        whiteScreen.style.top = "0"
                        whiteScreen.style.left = "0"
                        whiteScreen.style.width = "100vw"
                        whiteScreen.style.height = "100vh"
                        whiteScreen.style.backgroundColor = "#fff"
                        whiteScreen.style.opacity = "0"
                        whiteScreen.style.transition = "opacity 500ms"
                        whiteScreen.style.zIndex = "5001"
                        document.body.appendChild(whiteScreen)
                        setTimeout(function() {
                            whiteScreen.style.opacity = "1"
                            setTimeout(function() {
                                location.href = link
                            }, 500)
                        }, 250)
                    }
                }
            }
            if (camAnimProgress < 1) {
                camAnimProgress += 1 * deltaTime
                camera.position.z = THREE.MathUtils.lerp(1.854, -1, THREE.MathUtils.smoothstep(camAnimProgress, 0, 1))
            }
            model.rotation.y = THREE.MathUtils.lerp(0, THREE.MathUtils.degToRad(-90), THREE.MathUtils.smootherstep(modelRotation, 0, 1))
        }
        composer.render()
    }

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize(){
        screenWidth = elem.clientWidth
        screenHeight = elem.clientHeight
        camera.aspect = screenWidth / screenHeight
        camera.updateProjectionMatrix()

        renderer.setSize(screenWidth, screenHeight)
    }

    renderer.setAnimationLoop(animate)
    return renderer.domElement
}

// createScene(document.querySelector(".door"), "https://tinyurl.com/SUBMIT28CANVASES")