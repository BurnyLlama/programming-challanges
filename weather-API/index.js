import bodyParser from "body-parser"
import express from "express"
import fetch from "node-fetch"
import njk from "nunjucks"
import dotenv from "dotenv"

// Load my .env file
dotenv.config()
const { API_KEY_OPENWEATHER } = process.env

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
njk.configure(
    "views",
    { express: app }
)

app.get("/", (req, res) => {
    const { city } = req.query

    if (!city)
        return res.render("weather.njk")

    const units = "metric"

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY_OPENWEATHER}#`)
        .then(response => response.json())
        .then(weatherData => {
            const city = weatherData.name
            const { temp } = weatherData.main
            const description = weatherData.weather[0].description

            console.dir({ city, temp, description })

            res.render("weather.njk", { city, temp, description })
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Sorry, encountered an error!")
        })
})

app.listen(12345, () => console.log("I am listening on port 12345."))