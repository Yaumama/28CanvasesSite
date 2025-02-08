import { createScene } from "./renderer.js"

setTimeout(function() {
    document.body.style.opacity = "100"
}, 20)
let allBarButtons = document.querySelectorAll(".topBar button")
let allCards = document.querySelectorAll(".card")

function getCoords(elem) {
    let box = elem.getBoundingClientRect()

    return {
        top: box.top + window.scrollY,
        right: box.right + window.scrollX,
        bottom: box.bottom + window.scrollY,
        left: box.left + window.scrollX
    }
}

for (let i = 0; i < allBarButtons.length; i++) {
    let v = allBarButtons[i]

    v.onmouseover = function() {
        v.style.transform = "scale(1.1)"
    }
    v.onmouseout = function() {
        v.style.transform = "scale(1)"
    }
    v.onmousedown = function() {
        v.style.transform = "scale(1)"
    }
    v.onmouseup = function() {
        v.style.transform = "scale(1.1)"
        document.body.style.opacity = "0"
        setTimeout(function() {
            location.href = location.origin + "/28CanvasesSite/" + v.id
        }, 250)
    }
}

for (let i = 0; i < allCards.length; i++) {
    let v = allCards[i]

    v.onclick = function() {
        let clone = v.cloneNode(true)
        let coords = getCoords(v)
        clone.style.position = "absolute"
        clone.style.transformOrigin = "center"
        clone.style.marginRight = "0"
        clone.style.marginLeft = "0"
        clone.style.transform = `translate(${coords.left}px, ${coords.top}px) rotateX(0deg)`
        clone.style.transition = "transform 500ms"
        clone.style.cursor = "default"
        v.style.visibility = "hidden"
        document.body.appendChild(clone)
        for (let k = 0; k < allCards.length; k++) {
            let o = allCards[k]
            o.style.opacity = "0"
        }
        setTimeout(function() {
            clone.style.transform = `translate(calc(50vw - 9vmax), calc(50vh - 12.3034682081vmax)) rotateX(0deg)`
            setTimeout(function() {
                    let scene = createScene(clone, clone.id)
                    scene.style.opacity = "0"
                    clone.style.transform = `translate(calc(50vw - 9vmax), calc(50vh - 12.3034682081vmax)) rotateX(180deg)`
                    setTimeout(function() {
                        // clone.innerText = ""
                        scene.style.opacity = "1"
                    }, 150)
            }, 500)
        }, 1)
    }
}