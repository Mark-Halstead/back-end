
const herd = document.getElementById("herd")


// Create delete button using javascript
function createDeleteButton() {
    const button = document.createElement("button")
    button.innerText = "Remove"
    button.classList.add("button")
    button.addEventListener("click", (e) => {
        e.preventDefault()
        e.target.parentElement.remove()
        const id = e.target.parentElement.getAttribute("id")
        fetch(`http://localhost:3000/goats/${id}`, { method: "DELETE" })
    })
    return button
}


// Create goat card template + where Json data is put through
function createGoatCard(goat) {

    // Create card
    const card = document.createElement("div")

    // Add a relevant card
    card.classList.add("goat")

    // Add some content //
    // Add a header
    const header = document.createElement("h2")
    header.textContent = goat["name"]
    card.appendChild(header)

    //Create an element to display a favorite color
    const colorBox = document.createElement("p")
    colorBox.textContent = `${goat["name"]}'s favorite color is `
    const colorName = document.createElement("span")
    colorName.textContent = goat["favoriteColor"]
    colorName.style.color = goat["favoriteColor"]
    colorBox.appendChild(colorName)
    card.appendChild(colorBox)

    // Customize classes
    card.classList.add(goat["age"] < 5 ? "young" : "old")

    // Append delete button to the card then to parent container and give button id
    card.setAttribute("id", `${goat["id"]}`)
    const delButton = createDeleteButton()
    card.appendChild(delButton)
    
    // Create header and append to container
    herd.appendChild(card)
}

//Gets goats API from server
async function callTheHerd() {
    
    // Request all the goats from the API
    const res = await fetch("http://localhost:3000/goats")

    // Extracting the json data from the response
    const data = await res.json()

    // For each goat, create an HTML element (or collection of elements) and add it to the herd container
    data.forEach(g => createGoatCard(g))
}

// Grab the stuff entered in HTML form
document.querySelector("form").addEventListener("submit", (e) => {

    e.preventDefault()

    const goat = {
        name: e.target.name.value,
        age: e.target.age.value,
        sex: e.target.sex.value,
        favoriteColor: e.target.color.value,
    } // Get all of its data

    // Make an options object for fetch to make POST request to server's goats
    const options = {
        method: "POST",
        body: JSON.stringify(goat),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    }

// Parsing JSON data through the creating card function + logging error if no success
fetch("http://localhost:3000/goats", options) // Fetch with options
.then(res => {
    if(res.ok) {
        return res.json()
    } else {
        throw new Error(res.statusText)
    }
})
.then(data => createGoatCard(data)) // Make a goat card with the data
.catch(err => {
    console.log(err)
    alert("Error status 400: Missing required properties. Goat must have a name, age, sex, and favorite color.")
})

})
callTheHerd()


// Old json passing data through function
// fetch("http://localhost:3000/goats", options) // Fetch with options
//     .then(res => res.json()) // Extract the data
//     .then(data => createGoatCard(data)) // Make a goat card with the data
//     .catch(err => {
//         console.log(err)
//         alert("One of our goats is missing")
//     }) // Alternatively, panic
