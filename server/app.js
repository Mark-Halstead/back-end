// Describes the server/API to other files

const express = require("express") //Access to the express library
const { goats, nextId } = require("./goats")

const app = express() // Make a very basic server using express

// Tell the app what kinds of requests to listen for (and how to handle them)

app.get("/", (req,res) => {
    res.json({
        "message": "Hello World!"
    })
})

app.get("/goats", (req, res) => {
    res.status(503).json(goats)
})

module.exports = app //Make server available to other files
