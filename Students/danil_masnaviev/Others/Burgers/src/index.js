"use strict";

let price = document.querySelector(".price");
let calories = document.querySelector(".calories");
const calcBtn = document.querySelector("#calcButton");
calcBtn.addEventListener("click", calc);

class Order {
    constructor(price, calories, size, filling, extra) {
        this.price = price;
        this.calories = calories;
        this.size = this._radioChecked(size);
        this.filling = this._radioChecked(filling);
        this.extra = this._check(extra);
    };
    _radioChecked(radioName) {
        let obj = document.querySelector(`input[name=${radioName}]:checked`);
        this.price += +obj.dataset.cost;
        this.calories += +obj.dataset.calories;
        return obj.value;
    }
    _check(checkboxName) {
        let objArr = [...document.querySelectorAll(`input[name=${checkboxName}]:checked`)];
        objArr.forEach(el => {
            this.price += +el.dataset.cost;
            this.calories += +el.dataset.calories;
        });
        return objArr;
    }
}

function calc() {
    let order = new Order(0, 0, "size", "filling", "extra");
    price.textContent = `Цена: ${order.price} руб.`;
    calories.textContent = `Каллории: ${order.calories} калорий.`;
}