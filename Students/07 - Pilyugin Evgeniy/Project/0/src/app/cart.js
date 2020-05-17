'use strict';

// получаем блок для товаров корзины
let cartBlock = document.querySelector('.item-list');
let total = document.querySelector('.sum');

/**
 * отрисовка карточек в корзине
 * @param obj {Object} productList - товары добаленные в корзину
 * @param prod {Object} products - объект со всей информацией о товарах
 */
export default (obj, prod) => {
    let str = '';
    let sum = 0;

    for (let id in obj) {
        str += `<div class="cart-product">
                    <img class="cart-img" src="${prod[id].img}" alt="">
                    <div class="cart_box">
                        <h4 class="cart-name">${prod[id].name}</h4>
                        <div class="cart-total"><span>${prod[id].price * obj[id]}</span>$</div>
                        <div class="cart-sum">
                            <div class="cart-count"><span>${obj[id]}</span>шт</div>
                            <i class="fas fa-times cart-del" data-id="${id}"></i>
                        </div>
                    </div>
                </div>`;

        sum += prod[id].price * obj[id];
    }

    cartBlock.innerHTML = str;
    total.textContent = sum + '$';
}


