let API = 'https://raw.githubusercontent.com/teitumx/static/master/GeekBrains/Shop/';


class List {
    constructor(url, container) {
        this.url = url;
        this.container = container;
        this.items = [];
        this._init();
        this._handleEvents();
    }

    _init() {
        this.get(this.url)
            .then(data => {
                this.items = (this.constructor.name === 'Basket') ? data.contents : data;
                this.render();
            })
    }

    get(url) {
        url = API + this.url;

        return fetch(url).then(dataJson => dataJson.json())
    }

    render() {
        let htmlStr = '';
        this.items.forEach(item => {
            let newItem = new classes[this.constructor.name](item)
            htmlStr += newItem.render();
        })
        document.querySelector(this.container).innerHTML = htmlStr;

    }
}
class ListItem {
    constructor(item, img) {
        this.item = item;
        this.img = img;
    }

    render() {
        return ` <div class="product-item">
                    
                    <div class="desc">
                    <img src="${this.item.img}" alt="${this.item.product_name}">
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
                </div> `
    }
}

class Catalog extends List {
    constructor(basket, url = '/catalogData.json', container = '.products') {
        super(url, container)
        this.basket = basket;
    }
    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.basket.add(evt.target);
            }
        })
    }
}

class Basket extends List {
    constructor(url = 'getBasket.json', container = '.cart-block') {
        super(url, container)
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.remove(evt.target);
            }
        })

        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        })
    }

    add(item) {

        this.url = '/addToBasket.json'
        this.get(this.url)
            .then(res => {
                if (res.result === 1) {
                    let id = item.dataset['id'];
                    let find = this.items.find(product => product.id_product === id);
                    if (find) {
                        find.quantity++;
                    } else {
                        let prod = this._createNewProduct(item);
                        this.items.push(prod);
                    }

                    this._checkTotalAndSum();
                    this.render();
                } else {
                    throw new Error('Error');
                }
            });
    }

    _createNewProduct(prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        };
    }

    remove(item) {



        this.url = '/deleteFromBasket.json';
        this.get(this.url)
            .then(res => {
                if (res.result === 1) {
                    let id = item.dataset['id'];
                    let find = this.items.find(item => item.id_product === id);
                    if (find.quantity > 1) {
                        find.quantity--;
                    } else {
                        this.items.splice(this.items.indexOf(find), 1);
                    }

                    this._checkTotalAndSum();
                    this.render();
                } else {
                    throw new Error('Error');
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

class CatalogItem extends ListItem {}

class BasketItem extends ListItem {
    constructor(item, img) {
        super(item, img)
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

new Catalog(new Basket());