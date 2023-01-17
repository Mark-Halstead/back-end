// Describes the server/API to other files

const express = require("express") //Access to the express library

const app = express() // Make a very basic server using express

// Tell the app what kinds of requests to listen for (and how to handle them)

app.get("/", (req,res) => {
    res.send("Hello World!")
})

module.exports = app //Make server available to other files
