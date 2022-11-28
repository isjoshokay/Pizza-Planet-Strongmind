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

// This is for editing a topping only
const displayModal = (e) => {
    document.querySelector("#update-topping-name").value = e.children[2].value
    document.querySelector("#update-topping-type").value = e.children[3].value
    document.querySelector("#update-topping-price").value = e.children[4].value
    document.querySelector("#update-topping-id").value = e.children[1].innerHTML
    document.querySelector(".modal-container").style.display = "inline"
}
//This closes both modals on either 'dashboard' page
const closeModal = () => {
    document.querySelector(".modal-container").style.display = "none"
}

// This is for editing a pizza only
let toppingsList = [] // This will be populated with all of the toppings the pizza has by name
// the array will be appended to a hidden input for the form. 
const displayUpdatePizza = () => {
    // Set the other two displays to none and display Create Pizza view. 
    document.querySelector("#pizza-update-wrapper").style.display = "inline"
    document.querySelector("#initial-pizza-message-container").style.display = "none"
    document.querySelector("#pizza-new-wrapper").style.display = "none" 
}

// This is for creating a new pizza 
const displayNewPizza = () => {
    // Set the other two displays to none and display Create Pizza view. 
    document.querySelector("#pizza-update-wrapper").style.display = "none"
    document.querySelector("#initial-pizza-message-container").style.display = "none"
    document.querySelector("#pizza-new-wrapper").style.display = "inline" 
}

// This is for adding and removing toppings from a pizza. (see above toppingsList var for more details)
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



