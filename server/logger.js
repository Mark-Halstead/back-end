// Describes a middleware that logs any attempt to talk to the API.
// req -> [Middleware (logger - console.log key details)] -> [app] -> response


function logger(req, res, next) {
    // req - the clients request
    // res - the response that will be sent to the client
    // next - the next step down in the API
    
    //Log key details
    console.log(req.method, req.originalUrl)
    
    // Pass down to the next layer
    next()
}

module.exports = logger
