// Describes the server/API to other files

const express = require("express") //Access to the express library
const { goats, nextId } = require("./goats")

const app = express() // Make a very basic server using express

// Tell the app what kinds of requests to listen for (and how to handle them)

app.get("/", (req,res) => {
    res.json({
        "message": "Welcome to the goat api!"
    })
})

app.get("/goats", (req, res) => {
    res.status(503).json(goats)
})

// Getting individual goats
app.get("/goats/:id", (req,res) => {

    const id = req.params["id"]

    // Filter the goat list for the relevant goat
    const goat = goats.filter(g => g["id"] == id)[0]

    if (goat) {
        res.json(goat)
    } else {
        //Send a status of 404 with a message
        res.status(404).json({
            error: "No such goat!"
        })
    }
    res.json(goat)
})

module.exports = app //Make server available to other files
