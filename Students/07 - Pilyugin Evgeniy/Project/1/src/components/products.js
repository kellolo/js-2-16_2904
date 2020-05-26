'use strict';

// супер класс родитель
export class Product {
    /**
     * конструктор получаем строку-сласс блока и если надо список товаров
     * @param container {string}
     * @param items {Object}
     */
    constructor(container, items = []) {
        this.container = container;
        this.str = '';
        this.items = items;
    }

    /**
     * метод пишет в документ строку
     * @param str {string}
     * @param container {string}
     * @private
     */
    _writeInDocument(str, container) {
        document.querySelector(container).innerHTML = str;
    }
}

// наследуем и расширяем для работы с рендером
export class ProductsRender extends Product {
    /**
     * передаем в родитель контейнер и строку
     * @param container {string}
     * @param items {Object}
     */
    constructor(container, items) {
        super(container, items);
        this.items = items;
        this._init();
    }

    /**
     * создаем карточки и записываем в документ
     * @private
     */
    _init() {
        this._render();
        this._writeInDocument(this.str, this.container);
    }

    /**
     * получаем массив с данными товаров и создаем в цикле строку с карточками
     * @private
     */
    _render() {
        for (let item in this.items) {
            this.str += `
                <div class="product-item">
                    <img src="${this.items[item].img}" width="300" height="200" alt="${this.items[item].name}">
                    <div class="desc">
                        <h1>${this.items[item].name}</h1>
                        <p>${this.items[item].price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-img="${this.items[item].img}"
                        data-name="${this.items[item].name}"
                        data-price="${this.items[item].price}"
                        data-id="${this.items[item].id}"
                        >Купить</button>
                    </div>
                </div>`;
        }
    }
}

// логика блока товаров
export class Products extends Product {
    constructor(container, cart) {
        super(container);
        this.cart = cart;
        this._addHandlerEvent();
    }

    /**
     * вешаем обработчик на кнопки "купить"
     * @private
     */
    _addHandlerEvent() {
        document.querySelector(this.container).addEventListener('click', (e) => {
            if (e.target.name === 'buy-btn') {
                this.cart.addProduct(e.target);
            }
        });
    }
}

