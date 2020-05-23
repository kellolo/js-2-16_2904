class Common {
    constructor(container, url, btn) {
        this.items = [];
        this.container = container;
        this.API = 'https://raw.githubusercontent.com/egorkhu/online-store-api/master/responses/';
        this.url = url;
        this.action_btn = btn;
        this.constructor_list = {
            Catalog: CatalogElem,
            Cart: CartElem
        }
        this._init();
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
        if (this.constructor.name === 'Cart') {
            document.querySelector('.btn-cart').addEventListener('click', () => {
                document.querySelector('.cart-block').classList.toggle('invisible');
            })
        } else if (this.constructor.name === 'Catalog') {
            document.querySelector('.btn-search').addEventListener('click', () => {
                const value = document.querySelector('.search-field').value;
                this.filterItems(value);
            })
        }
    }

    _checkActionBtn(btn) {
        return btn === 'buy-btn' ? 'addToBasket.json' : 'deleteFromBasket.json'
    }

    render() {
        let str = '';
        if (this.constructor.name === 'Catalog') {
            this.filteredItems.forEach(item => {
                str += new this.constructor_list[this.constructor.name](item).render();
            })
        }
        if (this.constructor.name === 'Cart') {
            this.items.forEach(item => {
                str += new this.constructor_list[this.constructor.name](item).render();
            })
            this.quantityBlock.innerText = this.quantity;
            this.priceBlock.innerText = this.sum;
        }
        document.querySelector(this.container).innerHTML = str;
    }
}

class Catalog extends Common {
    constructor(container, url, btn) {
        super(container = '.products', url = 'catalogData.json', btn = 'buy-btn');
        this.filteredItems = [];
    }

    _handleData() {
        this._fetchData()
            .then(result => {
                this.filteredItems = this.items = result;
                this.render();
            })
            .catch(err => {alert(`Произошла ошибка ${err}`)})
    }

    filterItems(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredItems = this.items.filter(good => {
            return regexp.test(good.product_name);
        })

        this.render();
    }
}

class Cart extends Common {
    constructor(container, url, btn) {
        super(container = '.cart-items', url = 'getBasket.json', btn = 'del-btn');
        this.quantity = 0;
        this.sum = 0;
        this.quantityBlock = document.querySelector('#quantity');
        this.priceBlock = document.querySelector('#price');
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