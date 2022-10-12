const header = document.createElement("h1")
header.innerText = "My favourite games!"

const div = document.createElement("div")
const list = document.createElement("ol")

const favouriteGames = [
    ["Evoland II", "https://evoland.shirogames.com/home/evoland-2/"],
    ["DDNet", "https://ddnet.tw/"],
    ["Minecraft", "https://minecraft.net"]
]

favouriteGames
    // Create elements
    .map(game => {
        const element = document.createElement("li")
        const link = document.createElement("a")
        link.innerText = game[0]
        link.href = game[1]
        element.appendChild(link)
        return element
    })
    // Add all the elements
    .forEach(
        listItem => list.appendChild(listItem)
    )

div.appendChild(list)

document.body.appendChild(header)
document.body.appendChild(div)

// ---
// Funny:
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randomColor() {
    const chars = "0123456789ABCDEF".split("")
    const color = new Array(6)
        .fill(0)
        .map(() => randomChoice(chars))
        .join("")
    return `#${color}`
}

function getRandomElement() {
    return randomChoice(document.querySelectorAll("body, body *"))
}

function randomisePage() {
    getRandomElement().style.color      = randomColor()
    getRandomElement().style.background = randomColor()
    getRandomElement().style.border     = `${randomChoice([0,1,2,3])}px solid ${randomColor()}`
    getRandomElement().style.outline    = `${randomChoice([0,1,2,3])}px solid ${randomColor()}`
    getRandomElement().style.margin     = `${Math.random() / 2}rem`
    getRandomElement().style.padding    = `${Math.random() / 2}rem`
    getRandomElement().style.fontFamily = randomChoice(["sans-serif", "serif", "monospace", "cursive", "system-ui"])
    getRandomElement().style.fontSize   = `${Math.random() * 18}pt`
    getRandomElement().style.textAlign  = randomChoice(["left", "center", "right", "justify"])
    getRandomElement().style.fontStyle  = randomChoice(["normal", "italic"])
    getRandomElement().style.fontWeight = randomChoice(["normal", "bold"])
}

const button = document.createElement("button")
button.innerText = "Funny!"

button.addEventListener("click", randomisePage)

document.body.appendChild(button)

setInterval(
    () => {
        if (Math.random() < 0.1)
            randomisePage()
    }, 100
)