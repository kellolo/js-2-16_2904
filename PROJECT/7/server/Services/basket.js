module.exports = {
    add(basket, item) {
        basket.contents.push(item);
        return { newBasket: basket };
    },
    change(basket, id, amount) {
        let find = this._find(basket.contents, id);
        find.quantity += amount;
        return { newBasket: basket, name: find.product_name };
    },
    delete(basket, id) {
        let find = this._find(basket.contents, id);
        basket.contents.splice(basket.contents.indexOf(find), 1);
        return { newBasket: basket, name: find.product_name };
    },
    _find(arr, id) {
        return arr.find(el => el.id_product == id);
    }
}