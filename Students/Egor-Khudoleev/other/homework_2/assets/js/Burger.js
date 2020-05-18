export default class Burger {
    constructor() {
        this.size = this._getConsist('size');
        this.stuffing = this._getConsist('stuffing');
        this.topping = this._getConsist('topping');
        this.price = 0;
        this.cal = 0;
        this.order = this._makeOrder();
    }

    _getConsist(param) {
        let arr = [];
        let inputs = document.querySelectorAll(`input[name=${param}`)
        for (let input of inputs) {
            if (input.checked) {
                arr.push({name: input.name, value: input.value, price: +input.dataset.price, cal: +input.dataset.cal});
            }
        }
        return arr;
    }

    _makeOrder() {
        this.order = [...this.size, ...this.stuffing, ...this.topping];

        this._calculatePrice(this.order);
        this._calculateCal(this.order);
    }

    _calculatePrice(arr) {
        for (let item of arr) {
            this.price += item.price
        }
    }

    _calculateCal(arr) {
        for (let item of arr) {
            this.cal += item.cal
        }
    }
}