"use strict";

let button = document.querySelector('.calc-btn');

button.addEventListener ('click', () => burgerCount());

let myBurger = '';

function burgerCount () {
    let order = new burger ('Size', 'Filling', 'Dressing');
    myBurger = `<div class="cost-kcal">Приготовьте к оплате: ${order.cost} рублей<br>Калорийность составит: ${order.energy} калорий</div>`;
    document.querySelector('.result').innerHTML = `${myBurger}`;
}

class burger {
    constructor (size, fill, dress) {
        this.size = this._check(size);
        this.filling = this._check(fill);
        this.dressing = this._getArray(dress);
        this.cost = this._cost();
        this.energy = this._energy();
    }
    _check(attrName) {
        let choice = document.querySelector(`input[name=${attrName}]:checked`);
        let prop = {value: choice.value, cost: +choice.dataset['cost'], kcal: +choice.dataset['calories']};
        return prop;
    }
    _getArray(attrName) {
        let arr = [...document.querySelectorAll(`input[name=${attrName}]:checked`)];
        let choiceArr = [];
        arr.forEach (choice => {
            choiceArr.push({value: choice.value, cost: +choice.dataset['cost'], kcal: +choice.dataset['calories']})
        });
        return choiceArr;
    }
    _cost() {
        let cost = this.size.cost + this.filling.cost;
        if (this.dressing.length > 0) {
            this.dressing.forEach (el => {cost += el.cost});
            return cost;
        } else return cost;
    }
    _energy() {
        let kcal = this.size.kcal + this.filling.kcal;
        if (this.dressing.length > 0) {
            this.dressing.forEach (el => {kcal += el.kcal});
            return kcal;
        } else return kcal;
    }
}