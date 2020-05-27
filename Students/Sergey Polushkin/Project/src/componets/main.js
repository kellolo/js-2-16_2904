'use strict';

const catalogImage = 'https://placehold.it/200x150';
const basketImage = 'https://placehold.it/100x80';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor(url, container) {
        this.url = url;
        this.container = container;
        this.items = [];
        this._init();
    }

    _init() {
        this.get(this.url)
            .then(data => {
                if (this.constructor.name === 'Basket') {
                    this.items = data.contents;
                    this._checkTotalAndSum();
                } else {
                    this.items = data;
                }
                this.render();
                this._handleEvents();
            })
    }

    get(url) {
        url = API + url;

        return fetch(url).then(dataJson => dataJson.json());

        // return new Promise((resolve, reject) => {

        //     let xhr = new XMLHttpRequest();

        //     xhr.onreadystatechange = () => {
        //         if (xhr.readyState === 4) {
        //             if (xhr.status == 200) {
        //                 resolve(JSON.parse(xhr.responseText));
        //             } else {
        //                 reject('Error');
        //             }
        //         }
        //     }

        //     xhr.open('GET', url, true);
        //     xhr.send();
        // })

    }

    render() {
        let htmlStr = '';

        this.items.forEach(item => {
            let newItem = new classes[this.constructor.name](item);
            htmlStr += newItem.render();
        })

        if (this.constructor.name === 'Basket') {
            let itemsBlock = document.querySelector(this.container).querySelector('.cart-items');

            itemsBlock.innerHTML = htmlStr;
            this.quantityBlock.innerText = this.total;
            this.priceBlock.innerText = this.sum;
        } else {
            document.querySelector(this.container).innerHTML = htmlStr;
        }

    }
}

class ListItem {
    constructor(item, img = catalogImage) {
        this.item = item;
        this.img = img;
    }

    render() {
        return `
                <div class="product-item">
                    <img src="https://placehold.it/300x200" alt="${this.item.product_name}">
                    <!--img src="${this.img}" width="300" height="200" alt="${this.item.product_name}"-->
                    <div class="desc">
                        <h1>${this.item.product_name}</h1>
                        <p>${this.item.price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${this.item.product_name}"
                        data-price="${this.item.price}"
                        data-id="${this.item.id_product}"
                        >Купить</button>
                    </div>
                </div>
                `
    }
}

class Catalog extends List {
    constructor(basket, url = '/catalogData.json', container = '.products') {
        super(url, container);
        this.basket = basket;
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.basket.addProduct(evt.target);
            }
        })
    }
}

class Basket extends List {
    constructor(url = '/getBasket.json', container = '.cart-block') {
        super(url, container);
        this.total = 0;
        this.sum = 0;
        this.quantityBlock = document.querySelector('#quantity');
        this.priceBlock = document.querySelector('#price');
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.removeProduct(evt.target)
            }
        })

        document.querySelector('.btn-cart').addEventListener('click', (evt) => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        })
    }

    _createNewProduct(prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    }

    addProduct(item) {

        this.get('/addToBasket.json')
            .then(data => {
                if (data.result === 1) {

                    let id = item.dataset['id'];
                    let find = this.items.find(product => product.id_product == id);

                    if (find) {
                        find.quantity++;
                    } else {
                        let prod = this._createNewProduct(item);
                        this.items.push(prod);
                    }

                    this._checkTotalAndSum();
                    this.render();

                } else {
                    throw new Error('No permission to add product to Basket')
                }
            });
    }

    removeProduct(item) {

        this.get('/deleteFromBasket.json')
            .then(data => {
                if (data.result === 1) {
                    let id = item.dataset['id'];
                    let find = this.items.find(product => product.id_product == id);
                    if (find.quantity > 1) {
                        find.quantity--;
                    } else {
                        this.items.splice(this.items.indexOf(find), 1);
                    }

                    this._checkTotalAndSum();
                    this.render();
                } else {
                    throw new Error('No permission to remove product from Basket')
                }
            });
    }

    _checkTotalAndSum() {
        let qua = 0;
        let pr = 0;
        this.items.forEach(item => {
            qua += item.quantity;
            pr += item.price * item.quantity;
        })
        this.total = qua;
        this.sum = pr;
    }
}

class CatalogItem extends ListItem { }

class BasketItem extends ListItem {
    constructor(item, img = basketImage) {
        super(item, img);
    }

    render() {
        return `<div class="cart-item" data-id="${this.item.id_product}">
                    <img src="https://placehold.it/100x80" alt="">
                    <div class="product-desc">
                        <p class="product-title">${this.item.product_name}</p>
                        <p class="product-quantity">${this.item.quantity}</p>
                        <p class="product-single-price">${this.item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
                    </div>
                </div>`
    }
}

let classes = {
    Catalog: CatalogItem,
    Basket: BasketItem
}


export default function () {
    let basket = new Basket();
    let catalog = new Catalog(basket);
}


