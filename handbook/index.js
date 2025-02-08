setTimeout(function() {
    document.body.style.opacity = "100"
}, 20)
let allBarButtons = document.querySelectorAll(".topBar button")

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