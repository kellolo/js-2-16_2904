/**
 * Характеристика товара
 */
class Product{
    constructor(element){
        this.id_product =  element.hasOwnProperty('id_product')? +element.id_product: 0;
        this.product_name =  element.hasOwnProperty('product_name')? element.product_name: "";
        this.price =  element.hasOwnProperty('price')? +element.price: 0;
        this.img = element.hasOwnProperty('img')? element.img: "";
    }
}

class Catalog {
    constructor() {
        this.items = [];
        this.container = '.products';
        this.cart = null;
        this.API_URL = 'https://raw.githubusercontent.com/Kleossa/static/master/json/products.json';
    }

    construct (cart) {
        this.cart = cart;
        this._init () //_ - это обозначение инкапсулированного метода
    }

    _init () {

        this._getProducts(this.API_URL);

    }

    _handleEvents () {
        document.querySelector (this.container).addEventListener ('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.cart.addProduct (evt.target);
            }
        })
    }

    _handleData (products) {
        //let products =  this._getProducts(this.API_URL);
        products.forEach(e => {
                this.items.push (e);
            });
        }

    _makeGETRequest(url) {
        return new Promise((res, rej) => {
            //res - это когда промис выполняется со статусом "Хорошо"
            //rej - это когда промис НЕ выполняется со статусом "Хорошо"
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        res(xhr.responseText);
                    } else {
                        rej(`Ошибка получения данных из url ${url}`);
                    }
                }
            };

            xhr.open('GET', url, true);
            xhr.send();
        });
    }
    _getProducts(API_URL) {
        let products = [];
        this._makeGETRequest(API_URL)
            .then(resolveData => {
                let renewObj = JSON.parse(resolveData); // JSON >> Obj
                renewObj.products.forEach(elem => {
                    products.push(new Product(elem));
                });
                this._handleData (products);
                this.render ();
                this._handleEvents ();
            })
            .catch(rejectData => {
                console.log(rejectData);
            });
    }

    render () {
        let str = ''
        this.items.forEach (item => {
            str += `
                <div class="product-item">
                    <img src="${item.img}" alt="${item.product_name}">
                    <!--img src="${item.img}" width="300" height="200" alt="${item.product_name}"-->
                    <div class="desc">
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
        document.querySelector(this.container).innerHTML = str
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
    }

    construct () {
        this._init ();
    }

    _init () {
        this._handleEvents ();
    }

    _handleEvents () {
        document.querySelector (this.container).addEventListener ('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct (evt.target);
            }
        })
    }

    addProduct (product) {
        let id = product.dataset['id'];
        let find = this.items.find (product => product.id_product === id);
        if (find) {
            find.quantity++
        } else {
            let prod = this._createNewProduct (product);
            this.items.push (prod)
        }

        this._checkTotalAndSum ();
        this.render ();
    }

    _createNewProduct (prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    }

    deleteProduct (product) {
        let id = product.dataset['id'];
        let find = this.items.find (product => product.id_product === id);
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice (this.items.indexOf(find), 1)
        }

        this._checkTotalAndSum ();
        this.render ();
    }

    _checkTotalAndSum () {
        let qua = 0;
        let pr = 0;
        this.items.forEach (item => {
            qua += item.quantity;
            pr += item.price * item.quantity
        });
        this.total = qua;
        this.sum = pr;
    }

    render () {
        let itemsBlock = document.querySelector(this.container).querySelector('.cart-items');
        let str = '';
        this.items.forEach (item => {
            str += `<div class="cart-item" data-id="${item.id_product}">
                    <img src="${item.img}" alt="">
                    <div class="product-desc">
                        <p class="product-title">${item.product_name}</p>
                        <p class="product-quantity">${item.quantity}</p>
                        <p class="product-single-price">${item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
                    </div>
                </div>`
        });
        itemsBlock.innerHTML = str;
        this.quantityBlock.innerText = this.total;
        this.priceBlock.innerText = this.sum;
    }
}

 export default function() {
     let catalog = new Catalog();
     let cart = new Cart();

     cart.construct();
     catalog.construct(cart);

 }