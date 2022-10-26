const express = require("express")
const njk = require("nunjucks")

const app = express()

njk.configure(
    "views",
    {
        express: app
    }
)

app.get("/", (req, res) => res.render("index.njk"))

app.get(
    "/:word",
    (req, res) => res.render(
        "word.njk",
        {
            word: req.params.word,
            wordLength: req.params.word.length,
            // letters: req.params.word.split("")
        }
    )
)

app.listen(12345, () => console.log("I have started!"))