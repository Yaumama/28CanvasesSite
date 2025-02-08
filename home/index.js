setTimeout(function() {
    document.body.style.opacity = "100"
}, 20)
let allBarButtons = document.querySelectorAll(".topBar button")
let allCards = document.querySelectorAll(".card")

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
            location.href = location.origin + "/" + v.id
        }, 250)
    }
}

window.onwheel = function(e) {
    let tip = document.querySelector(".tip")
    if (tip && tip.style.opacity != "0") {
        tip.style.opacity = "0"
        setTimeout(function() {
            tip.remove()
        }, 500)
    }
    if (e.deltaY < 0) {
        if (allCards[0].zoomFactor + 1000 > (allCards.length - 1) * 1000) {return}
        for (let i = 0; i < allCards.length; i++) {
            let v = allCards[i]
            v.zoomFactor += 1000
            v.style.transform = `perspective(500px) translate3d(${v.xValue}vw, 0, ${v.zoomFactor}px)`
        }
    } else if (e.deltaY > 0) {
        if (allCards[0].zoomFactor - 1000 < 0) {return}
        for (let i = 0; i < allCards.length; i++) {
            let v = allCards[i]
            v.zoomFactor -= 1000
            v.style.transform = `perspective(500px) translate3d(${v.xValue}vw, 0, ${v.zoomFactor}px)`
        }
    }
}

for (let i = 0; i < allCards.length; i++) {
    let v = allCards[i]
    let x = 20
    if (i % 2 == 0) {
        x *= -1
    }
    v.zoomFactor = -i * 1000
    v.xValue = x
    v.style.transform = `perspective(500px) translate3d(${x}vw, 0, ${-i * 1000}px)`
    v.style.transition = "transform 500ms"
    v.style.zIndex = allCards.length - i
}