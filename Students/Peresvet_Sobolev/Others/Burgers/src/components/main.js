"use strict"

let form = document.querySelector('#form_burgers');
let btn = document.querySelector('#runBurger');
let users = [];

btn.addEventListener('click', addUser);

function addUser() {
    let newUser = new User('size', 'inside', 'strew');
    users.push(newUser); // Добавляем созданый элемент в конец массива users
}

class User {
    constructor() {
        this.size = this._makeBurger('size');
        this.inside = this._makeBurger('inside');
        this.strew = this._makeBurger('strew');
        this.price = 0;
        this.cal = 0;
        this.order = this._getTotal();
    }

    _makeBurger(param) {
        let arr = [];
        let items = document.querySelectorAll(`input[name=${param}`);
        for (let item of items) {
            if (item.checked) {
                arr.push({
                    price: +item.dataset.price,
                    cal: +item.dataset.cal
                });
            }
        }
        console.log(arr)
        return arr;
    }

    _getTotal() {
        this.order = [...this.size, ...this.inside, ...this.strew]; // Добавляем созданый элемент в конец массива order
        this._calcPrice(this.order);
        this._calcCal(this.order);
    }
    //Считаем прайс
    _calcPrice(arr) {
        let pr = document.querySelector('.price')
        for (let item of arr) {
            pr.innerText = `Общая стоимость: ${this.price += item.price}`;
        }
    }
    //Считаем каллории
    _calcCal(arr) {
        for (let item of arr) {
            let clc = document.querySelector('.calc')
            clc.innerText = `Количество калорий: ${this.cal += item.cal}`
        }
    }
}