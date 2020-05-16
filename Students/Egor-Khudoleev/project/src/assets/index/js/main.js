class Common {
    constructor(container, url, btn) {
        this.items = [];
        this.container = container;
        this.API = 'https://raw.githubusercontent.com/egorkhu/online-store-api/master/responses/';
        this.url = url;
        this.action_btn = btn;
        this._init();
        this.constructor_list = {
            Catalog: CatalogElem,
            Cart: CartElem
        }
    }

    _init() {
        this._handleData();
        this._handleEvents()
    }

    _fetchData() {
         return fetch(this.API + this.url)
            .then(respond => respond.json());
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === this.action_btn) {
                fetch(this.API + this._checkActionBtn(this.action_btn))
                    .then(respond => respond.json())
                    .then(data => {
                        if (data.result === 1 && this.action_btn === 'buy-btn') {
                            this.cart.addProduct(evt.target)
                        } else {
                            this.deleteProduct(evt.target);
                        }
                    })
            }
        })
    }

    _checkActionBtn(btn) {
        return btn === 'buy-btn' ? 'addToBasket.json' : 'deleteFromBasket.json'
    }

    render() {
        let str = '';
        this.items.forEach(item => {
            str += new this.constructor_list[this.constructor.name](item).render();
        })
        document.querySelector(this.container).innerHTML = str;
        if (this.constructor.name === 'Cart') {
            this.quantityBlock.innerText = this.quantity;
            this.priceBlock.innerText = this.sum;
        }
    }
}

class Catalog extends Common {
    constructor(container, url, btn) {
        super(container = '.products', url = 'catalogData.json', btn = 'buy-btn');
    }

    _handleData() {
        this._fetchData()
            .then(result => {
                this.items = result;
                this.render();
            })
            .catch(err => {alert(`Произошла ошибка ${err}`)})
    }
}

class Cart extends Common {
    constructor(container, url, btn) {
        super(container = '.cart-items', url = 'getBasket.json', btn = 'del-btn');
        this.quantity = 0;
        this.sum = 0;
        this.quantityBlock = document.querySelector('#quantity');
        this.priceBlock = document.querySelector('#price');
        this._handleShowHideCart();
    }

    _handleData() {
        this._fetchData()
            .then(result => {
                this.items = result.contents;
                this._checkQuantityAndSum();
                this.render();
            })
            .catch(err => {alert(`Произошла ошибка ${err}`)})
    }

    _handleShowHideCart() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        })
    }

    addProduct(product) {
        let id = product.dataset['id'];
        let find = this.items.find(product => product.id_product === id);
        if (find) {
            find.quantity++;
        } else {
            let prod = this._createNewProduct(product);
            this.items.push(prod);
        }
        this._checkQuantityAndSum();
        this.render();
    }

    deleteProduct(product) {
        let id = product.dataset['id'];
        let find = this.items.find(product => product.id_product === id);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice(this.items.indexOf(find), 1);
        }
        this._checkQuantityAndSum();
        this.render();
    }

    _createNewProduct(prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    }

    _checkQuantityAndSum() {
        this.quantity = 0;
        this.sum = 0;
        this.items.forEach(item => {
            this.quantity += item.quantity;
            this.sum += item.price * item.quantity;
        })
    }
}

class Elem {
    constructor(item) {
        this.item = item;
        this.img = 'https://placehold.it/300x200';
    }

    render() {
        return `<div class="product-item">
            <img src="${this.img}" alt="${this.item.product_name}">
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
        </div>`
    }
}

class CatalogElem extends Elem {
    constructor(item) {
        super(item);
    }
}

class CartElem extends Elem {
    constructor(item) {
        super(item);
        this.item = item;
        this.img = 'https://placehold.it/100x80';
    }

    render() {
        return `<div class="cart-item" data-id="${this.item.id_product}">
            <img src="${this.img}" alt="${this.item.product_name}">
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

export default function() {
    let catalog = new Catalog;
    let cart = new Cart;

    catalog.cart = cart;
}

// const API_URL = 'https://raw.githubusercontent.com/egorkhu/online-store-api/master/responses';
//
// function makeRequest(type, url) {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//
//         xhr.open(type, url, true);
//         xhr.send();
//
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 resolve(JSON.parse(xhr.responseText));
//             } else {
//                 reject(new Error('Что-то пошло не так'));
//             }
//         }
//         xhr.onerror = function() {
//             reject(new Error('Нет соединения с интернетом'));
//         }
//     })
// }
//
// let catalog = {
//     items: [],
//     container: '.products',
//     cart: null,
//     construct(cart) {
//         this.cart = cart
//         this._init() //_ - это обозначение инкапсулированного метода
//     },
//     _init() {
//         this._handleData()
//         this._handleEvents()
//     },
//     _handleEvents() {
//         document.querySelector(this.container).addEventListener('click', (evt) => {
//             if (evt.target.name === 'buy-btn') {
//                 makeRequest('GET', `${API_URL}/addToBasket.json`).then(data => {
//                     if(data.result === 1) {
//                         this.cart.addProduct(evt.target)
//                     }
//                 })
//             }
//         })
//     },
//     _handleData() {
//         this.items = makeRequest('GET', `${API_URL}/catalogData.json`);
//         this.items
//             .then(result => {
//                 this.items = result;
//                 this.render();
//             })
//             .catch(err => {
//                 alert(`Произошла ошибка ${err}`);
//             })
//     },
//     render() {
//         let str = ''
//         this.items.forEach(item => {
//             str += `
//                 <div class="product-item">
//                     <img src="https://placehold.it/300x200" alt="${item.product_name}">
//                     <!--img src="${item.img}" width="300" height="200" alt="${item.product_name}"-->
//                     <div class="desc">
//                         <h1>${item.product_name}</h1>
//                         <p>${item.price}</p>
//                         <button
//                         class="buy-btn"
//                         name="buy-btn"
//                         data-name="${item.product_name}"
//                         data-price="${item.price}"
//                         data-id="${item.id_product}"
//                         >Купить</button>
//                     </div>
//                 </div>
//             `
//         })
//         document.querySelector(this.container).innerHTML = str
//     }
// }
//
// let cart = {
//     items: [],
//     total: 0,
//     sum: 0,
//     container: '.cart-block',
//     btn: document.querySelector('.btn-cart'),
//     quantityBlock: document.querySelector('#quantity'),
//     priceBlock: document.querySelector('#price'),
//     construct() {
//         this._init()
//     },
//     _init() {
//         this._handleData();
//         this._handleEvents()
//     },
//     _handleData() {
//         this.items = makeRequest('GET', `${API_URL}/getBasket.json`);
//         this.items
//             .then(result => {
//                 this.items = result;
//                 this._checkTotalAndSum()
//                 this.render();
//             })
//             .catch(err => {
//                 alert(`Произошла ошибка ${err}`);
//             })
//     },
//     _handleEvents() {
//         this.btn.addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         })
//         document.querySelector(this.container).addEventListener('click', (evt) => {
//             if (evt.target.name === 'del-btn') {
//                 makeRequest('GET', `${API_URL}/deleteFromBasket.json`).then(data => {
//                     if(data.result === 1) {
//                         this.deleteProduct(evt.target)
//                     }
//                 })
//             }
//         })
//     },
//     addProduct(product) {
//         let id = product.dataset['id']
//         let find = this.items.contents.find(product => product.id_product === id)
//         if (find) {
//             find.quantity++
//         } else {
//             let prod = this._createNewProduct(product)
//             this.items.contents.push(prod)
//         }
//
//         this._checkTotalAndSum()
//         this.render()
//     },
//     _createNewProduct(prod) {
//         return {
//             product_name: prod.dataset['name'],
//             price: prod.dataset['price'],
//             id_product: prod.dataset['id'],
//             quantity: 1
//         }
//     },
//     deleteProduct(product) {
//         let id = product.dataset['id']
//         let find = this.items.contents.find(product => product.id_product === id)
//         if (find.quantity > 1) {
//             find.quantity--
//         } else {
//             this.items.contents.splice(this.items.contents.indexOf(find), 1)
//         }
//
//         this._checkTotalAndSum()
//         this.render()
//     },
//
//     _checkTotalAndSum() {
//         let qua = 0
//         let pr = 0
//         this.items.contents.forEach(item => {
//             qua += item.quantity
//             pr += item.price * item.quantity
//         })
//         this.total = qua
//         this.sum = pr
//     },
//     render() {
//         let itemsBlock = document.querySelector(this.container).querySelector('.cart-items')
//         let str = ''
//         this.items.contents.forEach(item => {
//             str += `<div class="cart-item" data-id="${item.id_product}">
//                     <img src="https://placehold.it/100x80" alt="">
//                     <div class="product-desc">
//                         <p class="product-title">${item.product_name}</p>
//                         <p class="product-quantity">${item.quantity}</p>
//                         <p class="product-single-price">${item.price}</p>
//                     </div>
//                     <div class="right-block">
//                         <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
//                     </div>
//                 </div>`
//         })
//         itemsBlock.innerHTML = str
//         this.quantityBlock.innerText = this.total
//         this.priceBlock.innerText = this.sum
//     }
// }
//
// export default function app() {
//     catalog.construct(cart) //тут происходит создание объекта и вся прочая магия
//     cart.construct()
// }