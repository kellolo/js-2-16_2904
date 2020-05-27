// const catalogImage = 'https://raw.githubusercontent.com/flopyk/project/master/keyboard_mini.jpg';
// const basketImage = 'https://placehold.it/100x80';
const API = 'https://raw.githubusercontent.com/flopyk/project/master';

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
            let newItem = new classes[this.constructor.name](item)
            htmlStr += newItem.render()
        });
        document.querySelector(this.container).innerHTML = htmlStr;
    }
}

class ListItem {
    constructor(item/*, img = catalogImage*/) {
        this.item = item;
        // this.img = img;
    }
    render() {
        return `
        <div class="product-item">
             <img src=${API}/${this.item.id_product}.jpg  alt="${this.item.product_name}">
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

class Catalog extends List{
    constructor(basket, url = '/CatalogData.json', container = '.products') {
        super(url, container);
        this.basket = basket;
    }
    _handleEvents() {
        document.querySelector(this.container).addEventListener ('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.basket.add(evt.target);
            }
        })
    }

}

class Basket extends List{
    constructor(url = '/getBasket.json', container = '.cart-block') {
        super(url, container);
    }
    _handleEvents () {
        document.querySelector(this.container).addEventListener ('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.remove (evt.target);
            }
        })

        document.querySelector('.btn-cart').addEventListener ('click', (evt) => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        })
    }
    add(item) {
        this.get('/addToBasket.json')
            .then(res => {
                if (res.result) {
                    let find = this.items.find(el => el.id_product == item.dataset.id)
                    if (find) {
                        find.quantity++
                    } else {
                        let prod = this._createNewProduct (item);
                        this.items.push (prod);
                        this.render ();
                    }

                    this._checkTotalAndSum ();
                    this.render();
                } else {
                    throw new Error('Lol error');
                }
            })
    }
    _checkTotalAndSum() {
        let qua = 0;
        let pr = 0;
        this.items.forEach (item => {
            qua += item.quantity
            pr += item.price * item.quantity
        });
        this.total = qua;
        this.sum = pr;
    }

    _createNewProduct (prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
}

    remove(item) {
        let find = this.items.find(el => el.id_product == item.dataset.id)
        let id = item.dataset['id']
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice (this.items.indexOf(find), 1)
        }

        this._checkTotalAndSum ();
        this.render ();

    }
    renderSum() {
        let itemsBlock = document.querySelector (this.container).querySelector ('.cart-items')
        let str = ''
        this.items.forEach (item => {
            str += new BasketItem(item).render();
        });
        itemsBlock.innerHTML = str;
        this.quantityBlock.innerText = this.total;
        this.priceBlock.innerText = this.sum;
    }

}

class CatalogItem extends ListItem{}

class BasketItem extends ListItem{
    constructor(item/*, img = basketImage*/) {
        super(item/*, img*/);
    }
    render() {

        return `
        <div class="cart-item" data-id="${this.item.id_product}">
            <img src=${API}/${this.item.id_product}_mini.jpg  alt="${this.item.product_name}">
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

export default function() {
    let basket = new Basket();
    let catalog = new Catalog(basket);
}


//ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА
//  'use strict';
//  let PRODUCTS_NAMES = ['processor', 'monitor', 'notebook', 'mouse', 'keyboard']
//  let PRICES = [100, 120, 1000, 15, 18]
//  let IDS = [0, 1, 2, 3, 4]
//  let IMGS = []
//  const API_URL = 'https://github.com/flopyk/project/blob/master';

 /*function makeGETRequest(url, callback) {
     let xhr = new XMLHttpRequest();

     xhr.onreadystatechange = () => {
         if (xhr.readyState === 4) {
             if (xhr.status === 200) {
                 callback(xhr.responseText);
             }
         }
     }

     xhr.open('GET', url, true);
     xhr.send();
 }*/


// class Catalog {
//     constructor(cart, container) {
//         this.items = [];
//         this.container = container;
//         this.cart = cart;
//         this._init();
//     }
//     _init () {
//         this._handleData ();
//         this.render ();
//         this._handleEvents ();
//     }
//     _handleEvents() {
//         document.querySelector (this.container).addEventListener ('click', (evt) => {
//             if (evt.target.name === 'buy-btn') {
//                 this.cart.addProduct (evt.target);
//             }
//         });
//     }
//     _handleData () {
//         for (let i = 0; i < IDS.length; i++) {
//             this.items.push (this._createNewProduct (i));
//         }
//     }
//     _createNewProduct (index) {
//         /*makeGETRequest(`${API_URL}/CatalogData.json`, items => {
//             this.items = JSON.parse(items);
//             cb();
//         })*/
//
//         return {
//             product_name: PRODUCTS_NAMES [index],
//             price: PRICES [index],
//             id_product: IDS [index],
//             img: IMGS [index]
//         }
//     }
//
//     render () {
//         let str = '';
//         this.items.forEach (item => {
//             const catalogItem = new CatalogItems(item.product_name, item.price);
//             str += new CatalogItems(item).render();
//
//         });
//         document.querySelector(this.container).innerHTML = str;
//      }
//  }
//
//
//
//  class CatalogItems {
//      constructor(item) {
//          this.item = item;
//      }
//      render () {
//          return `
//                 <div class="product-item">
//                     <img src="https://raw.githubusercontent.com/flopyk/project/master/${this.item.product_name}.jpg" alt="${this.item.product_name}">
//                     <!--img src="${this.item.img}" width="300" height="200" alt="${this.item.product_name}"-->
//                     <div class="desc">
//                         <h1>${this.item.product_name}</h1>
//                         <p>${this.item.price}</p>
//                         <button
//                         class="buy-btn"
//                         name="buy-btn"
//                         data-name="${this.item.product_name}"
//                         data-price="${this.item.price}"
//                         data-id="${this.item.id_product}"
//                         >Купить</button>
//                     </div>
//                 </div>
//             `
//          }
//
//  }
//
// class Cart {
//     constructor(container) {
//         this.items = [];
//         this.total = 0;
//         this.sum = 0;
//         this.container = container;
//         this.quantityBlock = document.querySelector ('#quantity');
//         this.priceBlock = document.querySelector ('#price');
//         this._init();
//     }
//     _init () {
//         this._handleEvents ();
//     }
//     _handleEvents() {
//         document.querySelector (this.container).addEventListener ('click', (evt) => {
//             if (evt.target.name === 'del-btn') {
//                 this.deleteProduct (evt.target)
//             }
//         });
//     }
//     _createNewProduct (prod) {
//         return {
//             product_name: prod.dataset['name'],
//             price: prod.dataset['price'],
//             id_product: prod.dataset['id'],
//             quantity: 1
//         }
//     }
//     addProduct (product) {
//         let id = product.dataset['id']
//         let find = this.items.find (product => product.id_product === id)
//         if (find) {
//             find.quantity++
//         } else {
//             let prod = this._createNewProduct (product);
//             this.items.push (prod);
//         }
//
//         this._checkTotalAndSum ();
//         this.render ();
//     }
//      deleteProduct (product) {
//         let id = product.dataset['id']
//         let find = this.items.find (product => product.id_product === id)
//         if (find.quantity > 1) {
//             find.quantity--
//         } else {
//             this.items.splice (this.items.indexOf(find), 1)
//         }
//
//         this._checkTotalAndSum ();
//         this.render ();
//     }
//
//     _checkTotalAndSum() {
//         let qua = 0;
//         let pr = 0;
//         this.items.forEach (item => {
//             qua += item.quantity
//             pr += item.price * item.quantity
//         });
//         this.total = qua;
//         this.sum = pr;
//     }
//     render() {
//         let itemsBlock = document.querySelector (this.container).querySelector ('.cart-items')
//         let str = ''
//         this.items.forEach (item => {
//             str += new CartItem(item).render();
//         });
//         itemsBlock.innerHTML = str;
//         this.quantityBlock.innerText = this.total;
//         this.priceBlock.innerText = this.sum;
//     }
//  }
//
//  class CartItem {
//      constructor(item) {
//          this.item = item;
//      }
//
//      render () {
//          return `
//                 <div class="cart-item" data-id="${this.item.id_product}">
//                     <img src="https://raw.githubusercontent.com/flopyk/project/master/${this.item.product_name}_mini.jpg" alt="">
//                     <div class="product-desc">
//                         <p class="product-title">${this.item.product_name}</p>
//                         <p class="product-quantity">${this.item.quantity}</p>
//                         <p class="product-single-price">${this.item.price}</p>
//                     </div>
//                     <div class="right-block">
//                         <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
//                     </div>
//                 </div>
//                 `
//     }
//  }
//
//
//
//  export default function () {
//      let cart = new Cart('.cart-block');
//      new Catalog(cart, '.products');
//  }