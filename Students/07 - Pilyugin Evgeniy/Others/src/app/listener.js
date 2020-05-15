'use strict';
import count from './counter';
import cart from './cart';
let products = require('./products');

export let productsList = {};

export const addItemToObj = (event) => {
    let id = +event.target.dataset.id;
    if (!isNaN(id)) {
        if (productsList.hasOwnProperty(id)) {
            productsList[id] += 1;
        } else {
            productsList[id] = 1;
        }
    }

    count(productsList);
    cart(productsList, products.products);
}
