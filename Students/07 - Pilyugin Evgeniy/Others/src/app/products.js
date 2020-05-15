'use strict';

// получаем блок длявставки карточек товаров
export let productsBlock = document.querySelector('.products');

// объект с товарами
export let products = {
    1: {
      name: 'ноутбук',
      price: 15000,
      img: 'https://unsplash.it/320/240?random1'
    },
    2: {
        name: 'монитор',
        price: 8700,
        img: 'https://unsplash.it/320/240?random2'
    },
    3: {
        name: 'системный блок',
        price: 37500,
        img: 'https://unsplash.it/320/240?random3'
    },
    4: {
        name: 'клавиатура',
        price: 950,
        img: 'https://unsplash.it/320/240?random4'
    }
}

/**
 * функция перебирает все товары, создает из них карточки и добавляет в блок для товаров
 */
export const addElementsToBlock = (obj) => {
    let str = '';

    for(let id in obj) {
        str += `
            <div class="product">
                <h4 class="product-name">${obj[id].name}</h4>
                <img class="product-img" src="${obj[id].img}" alt="">
                <div class="product_footer">
                    <div class="product-price">${obj[id].price}$</div>
                    <button class="product-btn" data-id="${id}">купить</button>
                </div>
            </div>`;
    }

    productsBlock.insertAdjacentHTML('afterbegin', str);
}
