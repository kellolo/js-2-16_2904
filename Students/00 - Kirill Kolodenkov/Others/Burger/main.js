class Burger {
    constructor() {
        this.size = this._makeBurger('size');
        this.stuffing = this._makeBurger('filling');
        this.topping = this._makeBurger('optional');
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
        return arr;
    }

    _getTotal() {
        this.order = [...this.size, ...this.stuffing, ...this.topping];

        this._calcPrice(this.order);
        this._calcCal(this.order);
    }

    _calcPrice(arr) {
        let pr = document.querySelector('.price')
        for (let item of arr) {
            pr.innerText = `Общая стоимость: ${this.price += item.price}`;
        }
    }

    _calcCal(arr) {
        for (let item of arr) {
            let clc = document.querySelector('.calc')
            clc.innerText = `Количество калорий: ${this.cal += item.cal}`
        }
    }
}

let orderBtn = document.querySelector('.brgrBtn');
orderBtn.addEventListener('click', function () {
    new Burger()
});