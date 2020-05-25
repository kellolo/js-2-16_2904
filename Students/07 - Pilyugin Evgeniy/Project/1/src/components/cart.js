'use strict';

// импортируем родителя
import {Product as CartParent} from "./products";

// экспортный класс для рендера
export class CartRender extends CartParent {
    /**
     * получаем блок корзины и находим нем блок для отрисовки товаров
     * @param container {string} селектор css
     */
    constructor(container) {
        super(container);
        this.quantityBlock = document.querySelector('#quantity');
        this.priceBlock = document.querySelector('#price');
        this.itemsBlock = document.querySelector(this.container).querySelector('.cart-items');
    }

    /**
     * собираем строку из добавленных товаров, вызываем метод для записи
     * и очищаем строку, чтобы была готова к следующему рендеру
     * @param items {Array} массив товаров в корзине
     */
    render(items) {
        for (let item of items) {
            this.str += `<div class="cart-item" data-id="${item.id}">
                    <img src="${item.img}" width="120" alt="${item.name}">
                    <div class="product-desc">
                        <p class="product-title">${item.name}</p>
                        <p class="product-quantity">${item.quantity}</p>
                        <p class="product-single-price">${item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${item.id}">&times;</button>
                    </div>
                </div>`;
        }
        // ниже - унаследовали от родителя.
        this._writeInDocument(this.str, '.cart-items');
        this.str = '';
    }

    /**
     * обновляем значения на экране
     * @param total {number}
     * @param sum {number}
     * @private
     */
    _writeCount(total, sum) {
        this.quantityBlock.innerText = total;
        this.priceBlock.innerText = sum;
    }
}

// класс для работы с товарами в корзине
export class Cart extends CartParent {

    /**
     * получаем блок и объект для работы, создаем пустой массив товаров в корзине,
     * а также свойства для подсчета количества и суммы, и блоки для отображения этих св-тв
     * запускаем отслеживание нажатия кнопки удаления товара из корзины
     * @param container {String}
     * @param cart {Object}
     */
    constructor(container, cart) {
        super(container);
        this.cart = cart;
        this.items = [];
        this.total = 0;
        this.sum = 0;
        this.API = 'https://raw.githubusercontent.com/evgeny89/rest/master/';
        this.addReqest = 'addToBasket.json';
        this.deleteReqest = 'deleteFromBasket.json';
        this._handleEvents();
    }

    /**
     * внутренний метод для перерисовки корзины
     * @private
     */
    _render() {
        // актуалим счетчики
        this._checkTotalAndSum();
        // рисуем карточки товара
        this.cart.render(this.items);
        // перерисовываем счетчики
        this.cart._writeCount(this.total, this.sum);
    }

    /**
     * вешаем обработчик на кнопку удаления
     * @private
     */
    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct(evt.target);
            }
        });
        document.querySelector('.btn-cart').addEventListener('click', (e) => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        });
    }

    /**
     * обновляем показания счетчиков
     * @private
     */
    _checkTotalAndSum() {
        let qua = 0;
        let pr = 0;
        for (let item in this.items) {
            qua += this.items[item].quantity;
            pr += this.items[item].price * this.items[item].quantity;
        }
        this.total = qua;
        this.sum = pr;
    }

    /**
     * добавляем товар в корзину
     * @param product {target}
     */
    addProduct(product) {
        let url = this.API + this.addReqest;
        fetch(url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('ответ не получен');
            })
            .then(res => {
                if (res.result === 1) {
                    let id = product.dataset.id;
                    let find = this.items.find(prod => prod.id === id);
                    if (find) {
                        find.quantity++;
                    } else {
                        let prod = this._createNewProduct(product);
                        this.items.push(prod);
                    }

                    this._render();
                } else {
                    throw new Error('добавление товара отклонено сервером');
                }
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    /**
     * удаляем товар из корзины
     * @param product {target}
     */
    deleteProduct(product) {
        let url = this.API + this.deleteReqest;
        fetch(url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('ответ не получен');
            })
            .then(res => {
                if (res.result === 1) {
                    let id = product.dataset.id;
                    let find = this.items.find(prod => prod.id === id);
                    if (find.quantity > 1) {
                        find.quantity--;
                    } else {
                        this.items.splice(this.items.indexOf(find), 1);
                    }

                    this._render();
                } else {
                    throw new Error('удаление товара отклонено сервером');
                }
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    /**
     * из таргета создаем элемент массива
     * @param prod {event.target}
     * @returns {{img: string, quantity: number, price: string, name: string, id: string}}
     * @private
     */
    _createNewProduct(prod) {
        return {
            name: prod.dataset.name,
            price: prod.dataset.price,
            id: prod.dataset.id,
            img: prod.dataset.img,
            quantity: 1
        }
    }
}