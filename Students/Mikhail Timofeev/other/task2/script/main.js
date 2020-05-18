document.querySelector('.button').addEventListener('click', cookBurger);

function cookBurger() {
    const burger = new Burger();
    burger._price();
};

class Burger {
    constructor() {
        this.size = this._createMass('size');
        this.filling = this._createMass('filling');
        this.sause = this._createMass('sause');
        this.price = 0;
        this.kkal = 0;
    }

    _createMass(param) {
        let summ = [];
        let inputs = document.querySelectorAll(`input[name=${param}]:checked`)
        for (let input of inputs) {
            summ.push({price: +input.dataset.price, kkal: +input.dataset.kkal});
        }
        return summ
    }

    _price() {
        this.order = [...this.size, ...this.filling, ...this.sause];
        this._calcPrice(this.order);
        this._calcKkal(this.order);
        alert(`Цена: ${this.price} рублей. Калории: ${this.kkal}`)
    }

    _calcPrice(mass) {
        for (let item of mass) {
            this.price += item.price;
        }
    }

    _calcKkal(mass) {
        for (let item of mass) {
            this.kkal += item.kkal;
        }
    }
}