'use strict';
let cartCounter = document.querySelector('.icon-cart');

/**
 * функция отвечает за подсчет и вывод количества товаров в корзине.
 * @param counter {Object}
 */
export default (counter) => {
    if (Object.keys(counter).length !== 0) {
        cartCounter.dataset.count = Object.values(counter).reduce((sum, val) => sum + val) + '';
    } else {
        cartCounter.dataset.count = '0';
    }
}
