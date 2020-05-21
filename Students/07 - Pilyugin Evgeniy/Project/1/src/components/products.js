'use strict';

class Product {
    constructor(container) {
        this.container = container;
    }
}

export class ProductsRender extends Product {
    constructor(items, container) {
        super(container);
        this.items = items;
        this.str = '';
        this._render();
    }

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
                        data-name="${this.items[item].name}"
                        data-price="${this.items[item].price}"
                        data-id="${this.items[item].id}"
                        >Купить</button>
                    </div>
                </div>
            `;
        }

        this._writeInDocument(this.str);
    }

    _writeInDocument(str) {
        document.querySelector(this.container).innerHTML = str;
    }
}

export class Products extends Product {
    constructor(container) {
        super(container);
    }

    _addHandlerEvent() {
        document.querySelector(this.container).addEventListener('click', (e) => {
            if (e.target.name === 'buy-btn') {
                this.cart.addProduct(e.target);
            }
        });
    }
}

