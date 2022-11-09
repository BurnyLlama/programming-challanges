const bodyParser   = require("body-parser")
const cookieParser = require("cookie-parser")
const express      = require("express")

const app = express()

const TENN_MINS_IN_MILLIS = 10 * 60 * 1000
const cookieOpts = () => ({ expires: new Date(Date.now() + TENN_MINS_IN_MILLIS)})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (_, res) => res.sendFile(`${__dirname}/index.html`))

app.post(
    "/set-cookie",
    (req, res) => {
        const { cookieName, cookieValue } = req.body
        console.log(`Cookie '${cookieName}' is set to '${cookieValue}'.`)
        res.cookie(cookieName, cookieValue, cookieOpts())
            .redirect("localhost:12345")
    }
)

app.post(
    "/view-cookies",
    (req, res) => {
        const { cookies } = req
        console.table(cookies)
        res.redirect("localhost:12345")
    }
)

app.post(
    "/delete-cookie",
    (req, res) => {
        const { cookieName } = req.body
        console.log(`Deleted cookie '${cookieName}'!`)
        res.clearCookie(cookieName)
            .redirect("localhost:12345")
    }
)

app.listen(12345, () => console.log("Listening on port 12345"))