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

// This is for editing a pizza only
const displayPizzaModal = (e) => {

}

const displayNewPizza = () => {
    // Set the other two displays to none and display Create Pizza view. 
    document.querySelector("#pizza-update-wrapper").style.display = "none"
    document.querySelector("#initial-pizza-message-container").style.display = "none"
    document.querySelector("#pizza-new-wrapper").style.display = "inline" 
}

//This closes both modals on either 'dashboard' page
const closeModal = () => {
    document.querySelector(".modal-container").style.display = "none"
}