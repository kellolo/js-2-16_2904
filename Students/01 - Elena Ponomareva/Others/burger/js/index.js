'use strict';

let Name = ['mini', 'big', 'cheese', 'salad', 'potatoes', 'curry', 'mayonnaise'];
let Price = [50, 100, 10, 20, 15, 15, 20];
let Calories = [20, 40, 20, 5, 10, 0, 5];


class Burger {
    constructor () {
        this.size = this.get('size'),
        this.stuffing =this.get('stuffing'),
        this.topping = this.getToppings('additive'),
        this.price = this.calculatePrice(),
        this.calories = this.calculateCalories()
    }

     get(attrName) {
         let attr = document.querySelector (`input[name=${attrName}]:checked`)
         return attr.value
    }

     getToppings(attrName) {
        let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)]
        let arr = []
        objArr.forEach (el => {
            arr.push (el.value)
        })
        return arr
    }

    calculatePrice() {
        let price = 0;
        Name.forEach((el, index)  => {
            if (el === this.size || el === this.stuffing || 
                el === this.topping[0] || el === this.topping[1] ) {
            price += Price[index]}})
        return price;    
    }

    calculateCalories() {
    let calories = 0;
    Name.forEach((el, index)  => {
        if (el === this.size || el === this.stuffing || 
            el === this.topping[0] || el === this.topping[1] ) {
        calories += Calories[index]}})
    return calories;
    }

    render() {
        document.querySelector('.price-calories').innerHTML = 
        `<p>Стоимость Вашего заказа - ${this.price} рублей</p>
        <p>Количество калорий в Вашем бургере - ${this.calories}`
    }
}
function init(){
let burger = new Burger();
burger.render();
}

window.onload = init;
let form = document.querySelectorAll('input');
// for (let i = 0; i < form.length; i++) {
//   form[i].addEventListener('click', init)}
form.forEach(el => el.addEventListener('click', init));
