'use strict';
class Construct{
    constructor(elem){
        this.price = +elem.dataset['price'];
        this.cal = +elem.dataset['cal'];
        this.name = elem.value;
    }
}
class Burger{
        constructor(size, topping){
            this.size = new Construct(this.check(size));
            this.topping = this.getTopping(topping);
            this.showSum()

        }
    
        check(name){
            return document.querySelector(`input[name=${name}]:checked`);
        }
    
        getTopping(name){
            let result = [];
            this.checkAll(name).forEach(elem => result.push(new Construct(elem)));
            return result;            
        }
    
        checkAll(name){
            return [...document.querySelectorAll(`input[name=${name}]:checked`)]
        }
        
        showSum(){
            let price = this.sumPrice();
            let calor = this.sumCalories();
            document.getElementById('result').insertAdjacentHTML('afterbegin', `
                <p>Общая стоимость: ${price} p</p>
                <p>Калорийность: ${calor}</p>`)
        }
    
        sumPrice(){
            let result = this.size.price
            this.topping.forEach(topping => result += topping.price);
            return result;
        }
    
        sumCalories(){
            let result = this.size.cal
            this.topping.forEach(topping => result += topping.cal);
            return result;
        }
    
};   

document.getElementById('btn').addEventListener('click', () => new Burger('size', 'topping'))               
       
    



