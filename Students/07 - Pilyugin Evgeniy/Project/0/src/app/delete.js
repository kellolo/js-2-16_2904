'use strict';

import {productsList as list} from './listener';
import {products} from './products';
import counter from './counter';
import cart from './cart';

/**
 * удаление товаров из корзины
 * @param e {Event}
 */
export default (e) => {

    if (list[e.target.dataset.id] === 1) {
        delete list[e.target.dataset.id];
    } else {
        list[e.target.dataset.id] -= 1;
    }

    cart(list, products);
    counter(list);
}