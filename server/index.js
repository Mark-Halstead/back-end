//Run the server/API

const app = require("./app")


// Set the app off listening with a callback function
const port = 3000

app.listen(3000, () => {
    console.log(`App listening in port ${port}`)
}) // On a numbered port
