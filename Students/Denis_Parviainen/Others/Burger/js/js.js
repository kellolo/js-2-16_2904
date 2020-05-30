'use strict';
let form = document.querySelector ('#uForm')
let btn = document.querySelector ('#okBtn')
let big = [100, 40]
let small = [50, 20]
let cheese = [10, 20]
let salad = [20, 5]
let potato = [15, 10]
let spice = [15, 0]
let mayo = [20, 5]
//let price = []
//let calories = []
btn.addEventListener ('click', result)

function result () {
    let newBurger = new Burger ('Size', 'Topping', 'Bonus')


}

class Burger {
    constructor (size, topping, bonus) {
        this.Size = this._choice (size)
        this.Topping = this._choice (topping)
        this.Bonus = this._getArray (bonus)
        //this.canBeMother = this._checkMom (gender)
    }
    _choice (attrName) {
        let obj = document.querySelector (`input[name=${attrName}]:checked`)
        if (obj.value === "big") {
            return big;
        } else if (obj.value === "small"){
            return small;
        } else if (obj.value === "cheese"){
            return cheese;
        } else if (obj.value === "salad"){
            return salad;
        } else if (obj.value === "potato"){
            return potato
        }
    }
    /*_check (attrName) {
        let obj = document.querySelector (`input[name=${attrName}]:checked`)
        return obj.value
    }*/
    _getArray (attrName) {
        let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)]
        let arr = []
        objArr.forEach (el => {
            arr.push (el.value)
        })
        return arr
    }
    /*_checkMom (attrName) {
        let obj = document.querySelector (`input[name=${attrName}]:checked`)
        console.dir (obj)
        return +obj.dataset['mother'] ? true : false
    }*/
}