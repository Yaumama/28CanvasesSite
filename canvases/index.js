let allContainers = document.querySelectorAll(".cardContainer")
let hoverableAndScrollable = true

setTimeout(function() {
    document.body.style.opacity = "100"
}, 20)

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.scrollY,
        right: box.right + window.scrollX,
        bottom: box.bottom + window.scrollY,
        left: box.left + window.scrollX
    };
}

for (let i = 0; i < allContainers.length; i++) {
    for (let k = 0; k < 12; k++) {
        let randNum = getRandomInt(-500, 500) / 100
        
        let cardWrapper = document.createElement("div")
        cardWrapper.classList.add("cardWrapper")
        cardWrapper.id = randNum
        cardWrapper.style.transform = `rotate(${randNum}deg)`
        cardWrapper.style.cursor = "pointer"

        let card = document.createElement("div")
        card.classList.add("card")
        card.style.transform = "rotate3d(0, 0, 0, 0deg)"

        cardWrapper.appendChild(card)

        let cardContents = document.createElement("div")
        cardContents.classList.add("cardContents")
        cardContents.style.overflowY = "hidden"
        cardContents.style.height = "100%"

        card.appendChild(cardContents)

        let img = document.createElement("img")
        img.src = "./media/iguana.jpg"
        cardContents.appendChild(img)

        if (img.tagName == "IMG") {
            img.onload = function() {
                if (img.naturalWidth > img.naturalHeight) {
                    img.style.width = "75%"
                } else {
                    img.style.height = "75%"
                }
            }
        }

        let description = document.createElement("p")
        description.innerHTML = 'Description:<br><span class="description"><br></span>'
        description.children[1].innerText = "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start."

        cardContents.appendChild(description)

        let backButton = document.createElement("button")
        backButton.innerText = "Back"

        card.appendChild(backButton)

        allContainers[i].appendChild(cardWrapper)
    }
}

let allWrappers = document.querySelectorAll(".cardWrapper")
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
            location.href = location.origin + "/28CanvasesSite/" + v.id
        }, 250)
    }
}

for (let i = 0; i < allWrappers.length; i++) {
    allWrappers[i].onmouseover = function() {
        if (hoverableAndScrollable) {
            for (let child of allWrappers[i].children) {
                child.style.transform = "rotate3d(0.1, 1, 0.1, 360deg)"
            }
        }
    }
    allWrappers[i].onmouseout = function() {
        if (hoverableAndScrollable) {
            for (let child of allWrappers[i].children) {
                child.style.transform = "rotate3d(0, 0, 0, 0deg)"
            }
        }
    }
    allWrappers[i].onclick = function() {
        document.querySelector(".topBar").style.opacity = "0"
        hoverableAndScrollable = false
        for (let k = 0; k < allWrappers.length; k++) {
            let v = allWrappers[k]
            v.style.cursor = "default"
            for (let child of v.children) {
                child.style.transform = "rotate3d(0, 0, 0, 0deg)"
            }
            if (v != allWrappers[i]) {
                v.style.opacity = "0"
            } else {
                v.style.visibility = "hidden"
            }
        }
        allWrappers[i].style.transform = "rotate(0deg)"
        let rect = getCoords(allWrappers[i])
        let clone = allWrappers[i].cloneNode(true)
        clone.style.transform = `rotate(0deg) translate(${rect.left}px, ${rect.top}px) scale(1, 1)`
        clone.style.visibility = "visible"
        clone.style.transition = "opacity 500ms, transform 500ms"
        clone.style.margin = "0"
        clone.children[0].children[0].style.transition = "height 500ms"
        setTimeout(function() {
            clone.style.transform = `rotate(0deg)
                translate(44.5vw, calc(50vh - 5.5vw))
                scale(4.5)`
            for (let child of clone.children[0].children[0].children) {
                if (child.tagName != "P" && child.tagName != "BUTTON") {
                    child.style.transform = "scale(0.4) translate(0, -25%)"
                } else {
                    if (child.tagName == "P") {
                        child.style.transform = "translate(0, 5em)"
                    }
                }
            }
            clone.children[0].children[0].style.height = "80%"
            let child = clone.children[0].children[1]
            child.style.transform = "translate(117%, 20em)"

            setTimeout(function() {
                clone.children[0].children[0].style.overflowY = "scroll"
            }, 500)
            child.onclick = function() {
                document.querySelector(".topBar").style.opacity = "100"
                clone.children[0].children[0].style.height = "100%"
                clone.children[0].children[0].scrollTop = 0
                clone.children[0].children[0].style.overflowY = "hidden"
                clone.style.transform = `rotate(0deg) translate(${rect.left}px, ${rect.top}px) scale(1, 1)`
                child.style.transform = "translate(117%, 49.7vh)"
                for (let child of clone.children[0].children[0].children) {
                    if (child.tagName != "P" && child.tagName != "BUTTON") {
                        child.style.transform = "scale(1) translate(0, 0)"
                    } else {
                        if (child.tagName == "P") {
                            child.style.transform = "translate(0, 40vh)"
                        }
                    }
                }
                setTimeout(function() {
                    clone.remove()
                    for (let k = 0; k < allWrappers.length; k++) {
                        let v = allWrappers[k]
                        v.style.cursor = "pointer"
                        if (v != allWrappers[i]) {
                            v.style.opacity = "100"
                        } else {
                            v.style.visibility = "visible"
                            v.style.transform = `rotate(${v.id}deg)`
                        }
                    }
                    hoverableAndScrollable = true;
                }, 500)
            }
        }, 1)
        allWrappers[i].parentElement.parentElement.parentElement.append(clone)
    }
}

function scrollThroughPages(deltaY) {
    if (!hoverableAndScrollable) {return}
    let tip = document.querySelector(".tip")
    if (tip && tip.style.opacity != "0") {
        tip.style.opacity = "0"
        setTimeout(function() {
            tip.remove()
        }, 500)
    }
    let allPages = document.querySelectorAll(".page")

    if (deltaY > 0) {
        let firstChild = allPages[0]
        if (Number(firstChild.style.top.replace("vh", "").replace("px", "")) - 100 >= -(allPages.length - 1) * 100) {
            for (let i = 0; i < allPages.length; i++) {
                let v = allPages[i]
                v.style.top = Number(v.style.top.replace("vh", "").replace("px", "")) - 100 + "vh";
            }
        }
    } else if (deltaY < 0) {
        let firstChild = allPages[0]
        if (Number(firstChild.style.top.replace("vh", "").replace("px", "")) <= -100) {
            for (let i = 0; i < allPages.length; i++) {
                let v = allPages[i]
                v.style.top = Number(v.style.top.replace("vh", "").replace("px", "")) + 100 + "vh";
            }
        }
    }
}

let debounce = false

window.onwheel = function(e) {
    if (e.deltaY == 100 || e.deltaY == -100) {
        scrollThroughPages(e.deltaY)
    } else {
        if (debounce) {return}
        if (e.deltaY > 35 || e.deltaY < -35) {
            debounce = true
            scrollThroughPages(e.deltaY)
            setTimeout(() => {
                debounce = false
            }, 250);
        }
    }
}

window.onkeydown = function(e) {
    if (e.key == "ArrowDown") {
        scrollThroughPages(100)
    } else if (e.key == "ArrowUp") {
        scrollThroughPages(-100)
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
    }
})