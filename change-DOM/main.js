const myButton = document.querySelector("#my-button")
const myH1     = document.querySelector("#my-h1")

let counter = 0

myButton.addEventListener(
    "click",
    () => {
        counter += 1
        myH1.innerText = counter % 2 === 1 ? "Unexpected error on line 32." : "But no flower is as beautiful as you"
    }
)