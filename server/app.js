// Describes the server/API to other files

const express = require("express") //Access to the express library
const cors = require("cors")
let { goats, nextId } = require("./goats")


const app = express() // Make a very basic server using express
const logger = require("./logger")

// Middleware

// req -> [middleware] -> [endpoint A, endpoint B] -> response
// req -> [cors (add header to response)] -> [API] -> response
// req -> [auth (checks the req headers for a key)] -> [API] -> response

app.use(express.json()) // Layer to read body of posts
app.use(cors()) // Layer to add CORS headers
app.use(logger) // Layer to log access

//Endpoints

// Tell the app what kinds of requests to listen for (and how to handle them)
app.get("/", (req,res) => {
    res.json({
        "message": "Welcome to the goat api!"
    })
})

app.get("/goats", (req, res) => {

    //Extract maxAge query params
    const { maxAge } = req.query
    if (maxAge) {
        res.json(goats.filter(g => g["age"] <= maxAge))
    } else {
        res.json(goats)
    }
})

app.post("/goats", (req, res) => {

    // Extract the information
    const newGoat = req.body
    
    // Add the id to the goats data
    newGoat["id"] = nextId

    // Increase the nextId for next time
    nextId += 1

    // Add the goat to the goat list
    goats.push(newGoat)

    // Report our success
    res.status(201).json(newGoat)
})

// Getting individual goats
app.get("/goats/:id", (req,res) => {

    const id = req.params["id"]

    // Filter the goat list for the relevant goat
    const goat = goats.filter(g => g["id"] == id)[0]

    if (goat) {
        res.json(goat)
    } else {
        //Send a status of 404 with a message if no goat at the link
        res.status(404).json({
            error: "No such goat!"
        })
    }
    res.json(goat)
})

app.delete("/goats/:id", (req, res) => {

    // Pull out the id from the URL
    const id = req.params["id"]

    // Check if that goat is real
    const exists = goats.filter(g => g["id"] == id).length == 1

    // If it is,
    if (exists) {
        // Delete goat / create a new version of goats that dosen't contain it
        goats = goats.filter(g => g["id"] != id)
        // Return a relevant status and message
        res.sendStatus(204)
    } else {
        res.status(404).json({
            error: "No such goat!"
        })
    }
})

module.exports = app //Make server available to other files
