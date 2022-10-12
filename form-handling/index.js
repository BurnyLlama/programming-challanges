const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => res.sendFile(`${__dirname}/form.html`))

app.post(
    "/process",
    (req, res) => {
        const colour = req.body.colour
        const rawInvColour = (parseInt(colour.replace("#", ""), 16) ^ 0xFFFFFF).toString(16)
        const invColour = "#" +
            new Array(6 - rawInvColour.length)
                .fill(0)
                .join("") +
            rawInvColour

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

app.listen(3000, () => console.log("I AM READY!!!"))