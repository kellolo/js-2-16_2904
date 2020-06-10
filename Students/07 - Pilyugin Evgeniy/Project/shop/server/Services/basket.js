module.exports = {
    add(basket, item) {
        let find = this._find(basket, item);
        if (find) {
            find.counter = +find.counter + 1 + '';
        } else {
            item.counter = "1";
            basket.push(item);
        }
        return {newBasket: basket};
    },

    delete(basket, item) {
        let find = this._find(basket, item);
        if (+find.counter > 1) {
            find.counter = +find.counter - 1 + '';
        } else {
            basket.splice(basket.indexOf(find), 1);
        }
        return {newBasket: basket};
    },

    _find(arr, item) {
        return arr.find(el => el.id === item.id);
    }
}