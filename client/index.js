
const herd = document.getElementById("herd")


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

    // Customise classes
    card.classList.add(goat["age"] < 5 ? "young" : "old")

    // Append the content to card
    
    // Create header and append to container
    herd.appendChild(card)
}


async function callTheHerd() {
    
    // Request all the goats from the API
    const res = await fetch("http://localhost:3000/goats")

    // Extracting the json data from the response
    const data = await res.json()

    // For each goat, create an HTML element (or collection of elements) and add it to the herd container
    data.forEach(g => createGoatCard(g))
}

callTheHerd()
