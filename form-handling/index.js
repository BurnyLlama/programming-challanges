const express = require("express")
const bodyParser = require("body-parser")

function invertColour(colour) {
    const rawInvColour = (parseInt(colour.replace("#", ""), 16) ^ 0xFFFFFF).toString(16)
    const invColour = "#" +
        (rawInvColour.length < 6
            ? new Array(6 - rawInvColour.length)
                .fill(0)
                .join("")
            : ""
        ) + rawInvColour

    return invColour
}

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => res.sendFile(`${__dirname}/form.html`))

app.post(
    "/process",
    (req, res) => {
        const colour = req.body.colour
        const invColour = invertColour(colour)

        res.send(`
            <html>
            <head>
                <title>${colour}</title>
                <style>
                * {
                    margin: 0; padding: 0;
                    box-sizing: border-box;
                }

                body {
                    background: ${colour};
                    display: grid;
                    place-items: center;
                    width: 100vw;
                    height: 100vh;
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr;
                }

                .clr-container {
                    color: ${invColour};
                    font-family: 'Fira Code', monospace;
                    font-size: 3vmin;
                    text-align: center;
                    text-shadow: 0 .05vmax .2vmax #0008;
                }

                .clr {
                    font-size: 15vmin;
                    text-transform: uppercase;
                    text-shadow: 0 .1vmax .5vmax #0008;
                }
                </style>
            </head>
            <body>
                <div class="clr-container">
                    <p>Your favourite colour is:</p>
                    <p class="clr">${colour}</p>
                </div>
            </body>
            </html>
        `)
    }
)

app.post(
    "/process-brain-damage1",
    (req, res) => {
        const { clr1, clr2 } = req.body
        const clrAsNum = [ parseInt(clr1.replace("#", ""), 16), parseInt(clr2.replace("#", ""), 16)]
        const newClrHexString =
            parseInt((clrAsNum[0] + clrAsNum[1]) / 2).toString(16)
        const newClr = "#" +
            (newClrHexString.length < 6
                ? new Array(6 - newClrHexString.length)
                    .fill(0)
                    .join("")
                : ""
            ) + newClrHexString

        res.send(`
            <html>
            <head>
                <title>${newClr}</title>
                <style>
                * {
                    margin: 0; padding: 0;
                    box-sizing: border-box;
                }

                body, .clr {
                    display: grid;
                    place-items: center;
                    width: 100vw;
                    height: 100vh;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-rows: 1fr;
                }

                .clr {
                    grid-template-columns: 1fr;
                    font-size: 10vmin;
                    text-transform: uppercase;
                    text-shadow: 0 .1vmax .5vmax #0008;
                    width: 100%;
                    height: 100%;
                    font-family: 'Fira Code', monospace;
                }
                </style>
            </head>
            <body>
                <div class="clr" style="color: ${invertColour(clr1)}; background-color: ${clr1};">
                    <p>${clr1}</p>
                </div>
                <div class="clr" style="color: ${invertColour(newClr)}; background-color: ${newClr};">
                    <p>${newClr}</p>
                </div>
                <div class="clr" style="color: ${invertColour(clr2)}; background-color: ${clr2};">
                    <p>${clr2}</p>
                </div>
            </body>
            </html>
        `)
    }
)

app.post(
    "/process-brain-damage2",
    (req, res) => {
        const { clr1, clr2 } = req.body
        const partR =  parseInt((parseInt(clr1.substring(1, 3), 16) + parseInt(clr2.substring(1, 3), 16)) / 2).toString(16)
        const partG =  parseInt((parseInt(clr1.substring(3, 5), 16) + parseInt(clr2.substring(3, 5), 16)) / 2).toString(16)
        const partB =  parseInt((parseInt(clr1.substring(5, 7), 16) + parseInt(clr2.substring(5, 7), 16)) / 2).toString(16)

        console.log({ partR, partG, partB })
        const newPartR =
            (partR.length < 2
                ? new Array(2 - partR.length)
                    .fill(0)
                    .join("")
                : ""
            ) + partR
        const newPartG =
            (partG.length < 2
                ? new Array(2 - partG.length)
                    .fill(0)
                    .join("")
                : ""
            ) + partG
        const newPartB =
            (partB.length < 2
                ? new Array(2 - partB.length)
                    .fill(0)
                    .join("")
                : ""
            ) + partB

        const newClr = "#" +
            newPartR +
            newPartG +
            newPartB

        res.send(`
            <html>
            <head>
                <title>${newClr}</title>
                <style>
                * {
                    margin: 0; padding: 0;
                    box-sizing: border-box;
                }

                body, .clr {
                    display: grid;
                    place-items: center;
                    width: 100vw;
                    height: 100vh;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-rows: 1fr;
                }

                .clr {
                    grid-template-columns: 1fr;
                    font-size: 10vmin;
                    text-transform: uppercase;
                    text-shadow: 0 .1vmax .5vmax #0008;
                    width: 100%;
                    height: 100%;
                    font-family: 'Fira Code', monospace;
                }
                </style>
            </head>
            <body>
                <div class="clr" style="color: ${invertColour(clr1)}; background-color: ${clr1};">
                    <p>${clr1}</p>
                </div>
                <div class="clr" style="color: ${invertColour(newClr)}; background-color: ${newClr};">
                    <p>${newClr}</p>
                </div>
                <div class="clr" style="color: ${invertColour(clr2)}; background-color: ${clr2};">
                    <p>${clr2}</p>
                </div>
            </body>
            </html>
        `)
    }
)

app.listen(3000, () => console.log("I AM READY!!!"))