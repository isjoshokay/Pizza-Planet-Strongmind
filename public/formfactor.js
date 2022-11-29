const changeLabel = () => {
    document.querySelector("#js-test").innerHTML = document.querySelector("#js-input").value
}
const adminControlKey = () => {
    let option_val = document.querySelector("#select-type").value
    if (option_val == 'Owner'){
        document.querySelector('#admin-key').style.display = "inline"
        document.querySelector('#admin-key').required = true;
    }
    else {
        document.querySelector('#admin-key').style.display = "none"
        document.querySelector('#admin-key').removeAttribute('required')

    }
}
// This is for editing a topping only, on the dashboard for the OWNER
const displayModal = (e) => {
    document.querySelector("#update-topping-name").value = e.children[2].value
    document.querySelector("#update-topping-type").value = e.children[3].value
    document.querySelector("#update-topping-price").value = e.children[4].value
    document.querySelector("#update-topping-id").value = e.children[1].innerHTML
    document.querySelector(".modal-container").style.display = "inline"
}
//This closes the modal
const closeModal = () => {
    document.querySelector(".modal-container").style.display = "none"
}
// This is for editing a pizza only
const displayUpdatePizza = (e) => {
    // Set the other two displays to none and display Update Pizza view. 
    document.querySelector("#pizza-update-wrapper").style.display = "inline"
    document.querySelector("#initial-pizza-message-container").style.display = "none"
    document.querySelector("#pizza-new-wrapper").style.display = "none"
    document.querySelector("#delete-button").disabled = false

    // populate the fields of the view based on which pizza was clicked
    document.querySelector("#update-pizza-name").value = e.children[1].children[0].children[0].innerHTML
    document.querySelector("#update-pizza-description").value = e.children[1].children[1].innerHTML
    document.querySelector("#pizza-header-form").children[0].value = e.children[2].value
    // for separation of concerns (and because it's a more complex issue), the logic for the preestablished toppings 'tags' is moved to the below function.)
    populateToppings(e)
}
const populateToppings = e => {
    //unselect everything from the previously clicked element
    document.querySelectorAll(".selected").forEach(topping => {
        topping.classList.toggle("selected")
    })
    let toppingsList = [] // This will be populated with all of the toppings the pizza has by name
    // the array will be appended to a hidden input for the form. 
    // parse through and remove 
    let val = (e.children[1].children[2].value)
    val = val.split(',')
    val.map(e => {
        let word = ''
        for (let i = 0; i< e.length; i++){
            if (e[i].toLowerCase() !== e[i].toUpperCase()) {
                word += e[i]
            }
        }
        toppingsList.push(word)
    })
    document.querySelectorAll(".available-topping-update").forEach(topping => {
        let found = toppingsList.find(j => j == topping.children[0].value)
        if (found) {
            topping.classList.toggle("selected")
        }
    })
}

// This is for adding and removing toppings from a *new* pizza.
let newToppingsList = [] 
const addOrRemoveTopping = e => {
    //if it's selected, remove the topping name from newToppingsList and remove the 'selected' class
    if (e.classList.contains("selected")){
        e.classList.toggle("selected")
        let itemIdx = newToppingsList.indexOf(e.children[0].value)
        if (itemIdx !== -1) {
            newToppingsList.splice(itemIdx, 1);
        }
        document.querySelector("#new-toppings-on-pizza").value = newToppingsList
        console.log(newToppingsList)
        console.log(e.children[0].value, 'was removed from the pizza')
    } else {
        e.classList.toggle("selected")
        newToppingsList.push(e.children[0].value)
        document.querySelector("#new-toppings-on-pizza").value = newToppingsList
        console.log(newToppingsList)
        console.log(e.children[0].value, 'was added to the pizza')
    }
}
// This is for creating a new pizza 
const displayNewPizza = () => {
    // Set the other two displays to none and display Create Pizza view. 
    document.querySelector("#pizza-update-wrapper").style.display = "none"
    document.querySelector("#initial-pizza-message-container").style.display = "none"
    document.querySelector("#pizza-new-wrapper").style.display = "inline" 
    document.querySelector("#delete-button").disabled = "true"

}




