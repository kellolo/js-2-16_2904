const catalogImage = 'https://placehold.it/200x150';
const basketImage = 'https://placehold.it/100x80';
const API = 'https://raw.githubusercontent.com/daneelzam/Static/master/GB/eShop/API';

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
                this.items = (this.constructor.name === 'Basket') ? data.contents : data;
                this.render();
                this._handleEvents();
            })
    }

    get(url) {
        url = API + url;
        return fetch(url).then(dataJson => dataJson.json());
    }

    render() {
        let htmlStr = '';
        this.items.forEach(item => {
            let newItem = new classes[this.constructor.name](item) // class Basket => class BasketItem ; class Catalog => class CatalogItem
            htmlStr += newItem.render()
        });
        document.querySelector(this.container).innerHTML = htmlStr;
        if (this.constructor.name == 'Basket') {
            this.quantityBlock.innerText = this.total
            this.priceBlock.innerText = this.sum
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
                this.basket.add(evt.target);
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
                this.remove(evt.target);
            }
        })

        document.querySelector('.btn-cart').addEventListener('click', (evt) => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        })
    }

    add(item) {
        this.get('/addToBasket.json')
            .then(res => {
                if (res.result) {
                    this.addProduct(item);
                } else {
                    throw new Error('Lol error');
                }
            })

    }

    remove(item) {
        this.get('/deleteFromBasket.json')
            .then(res => {
                if (res.result) {
                    this.deleteProduct(item);
                } else {
                    throw new Error('Lol error');
                }
            })
    }
    addProduct(product) {
        let id = product.dataset['id']
        let find = this.items.find(product => product.id_product === id)
        if (find) {
            find.quantity++
        } else {
            let prod = this._createNewProduct(product)
            this.items.push(prod)
        }

        this._checkTotalAndSum()
        this.render()
    };
    _createNewProduct(prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    };
    deleteProduct(product) {
        let id = product.dataset['id']
        let find = this.items.find(product => product.id_product === id)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice(this.items.indexOf(find), 1)
        }

        this._checkTotalAndSum()
        this.render()
    };

    _checkTotalAndSum() {
        let qua = 0
        let pr = 0
        this.items.forEach(item => {
            qua += item.quantity
            pr += item.price * item.quantity
        })
        this.total = qua
        this.sum = pr
    };
}

class CatalogItem extends ListItem {}

class BasketItem extends ListItem {
    constructor(item, img = basketImage) {
        super(item, img)
    }

    render() {
        return `
        <div class="cart-item" data-id="${this.item.id_product}">
            <img src="https://placehold.it/100x80" alt="">
            <div class="product-desc">
                <p class="product-title">${this.item.product_name}</p>
                <p class="product-quantity">${this.item.quantity}</p>
                <p class="product-single-price">${this.item.price}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
            </div>
        </div>
        `
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