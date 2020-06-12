module.exports = {
    add(basket, goods){
        basket.push(goods);
        return { newBasket: basket };
    },
    change(basket, id, amount){
        let find = this._find(basket, id);
        find.product_quantity += amount;
        return { newBasket: basket, name: find.product_name };
    },
    delete(basket, id){
        let find = this._find(basket, id);
        basket.splice(basket.indexOf(find), 1);
        return { newBasket: basket, name: find.product_name};
    },
    _find(arr, id){
        return arr.find(el => +el.id_product == +id);
    }
}