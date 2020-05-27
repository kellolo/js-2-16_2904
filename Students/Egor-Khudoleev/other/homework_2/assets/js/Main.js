import Burger from './Burger.js'
import Popup from './Popup.js'

function makeOrder() {
    const burger = new Burger()
    const popup = new Popup()
    popup.showPopup(burger.price, burger.cal)
}

document.querySelector('.order').addEventListener('click', makeOrder);