let API = 'https://raw.githubusercontent.com/teitumx/static/master/GeekBrains/Shop/';


function makeGETRequest(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}



class Catalog {
    constructor(cart) {
        this.container = '.products';
        this.cart = cart;
        this._init();

    }

    _init() {
        this._handleEvents();
        this.fetchGoods();
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                makeGETRequest('GET', `${API}addToBasket.json`).then(data => {
                    let dataItem = JSON.parse(data);
                    if (dataItem.result === 1) {
                        this.cart.addProduct(evt.target);
                    }
                });
            }
        });
    }

    fetchGoods() {
        makeGETRequest('GET', `${API}catalogData.json`).then(data => {
            this.goods = JSON.parse(data);
            this.render();
        })
    }

    render() {
        let str = '';
        this.goods.forEach(item => {
            str += `
                <div class="product-item">
                    
                    <div class="desc">
                    <img src="${item.img}" alt="${item.product_name}">
                        <h1>${item.product_name}</h1>
                        <p>${item.price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${item.product_name}"
                        data-price="${item.price}"
                        data-id="${item.id_product}"
                        >Купить</button>
                    </div>
                </div>
            `
        })
        document.querySelector(this.container).innerHTML = str;
    }
}


class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.sum = 0;
        this.container = '.cart-block';
        this.quantityBlock = document.querySelector('#quantity');
        this.priceBlock = document.querySelector('#price');
        this._init();
    }
    _init() {
        this.fetchGoods();
        this._handleEvents();
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                makeGETRequest('GET', `${API}deleteFromBasket.json`).then(data => {
                    let basketItem = JSON.parse(data);
                    if (basketItem.result === 1) {
                        this.deleteProduct(evt.target);
                    }
                });
            }
        });
    }

    fetchGoods() {
        makeGETRequest('GET', `${API}getBasket.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            this.sum = this.goods.amount;
            this.total = this.goods.countGoods;
            this.items = this.goods.contents;

            this.render();
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

        this._checkTotalAndSum();
        this.render();
    }

    _createNewProduct(prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        };
    }

    deleteProduct(product) {
        let id = product.dataset['id'];
        let find = this.items.find(product => product.id_product === id);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice(this.items.indexOf(find), 1);
        }

        this._checkTotalAndSum();
        this.render();
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

    render() {
        let itemsBlock = document.querySelector(this.container).querySelector('.cart-items');
        let str = '';
        this.items.forEach(item => {
            str += `<div class="cart-item" data-id="${item.id_product}">
                    <img src="https://placehold.it/100x80" alt="">
                    <div class="product-desc">
                        <p class="product-title">${item.product_name}</p>
                        <p class="product-quantity">${item.quantity}</p>
                        <p class="product-single-price">${item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
                    </div>
                </div>`
        })
        itemsBlock.innerHTML = str;
        this.quantityBlock.innerText = this.total;
        this.priceBlock.innerText = this.sum;
    }
};

new Catalog(new Cart());