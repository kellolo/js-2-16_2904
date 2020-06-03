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
        document.querySelector(this.container).addEventListener ('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.basket.add(evt.target);
            }
        })
    }
}
class Basket extends List {
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
                    console.log(item.dataset.name + ' added');
                    this.render();
                } else {
                    throw new Error('Lol error');
                }
            })
        
    }

    remove(item) {
        let find = this.items.find(el => el.id_product == item.dataset.id)
        console.log(find.product_name + ' removed');
    }
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

export default function() {
    let basket = new Basket();
    let catalog = new Catalog(basket);
}
//  //ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА

// HW3
// class Catalog {
//     constructor() {

//     }

//     _init() {
        //     this.get(this.url, (json) => {
        //         this.items = JSON.parse(json)
        //     })
        // }
    
        // get(url, callback) {
        //     let URL = API + url;
        //     let xhr = new XMLHttpRequest();
    
        //     xhr.onreadystatechange = () => {
        //         if (xhr.readyState === 4) {
        //             if (xhr.status === 200) {
        //                 callback(xhr.responseText);
        //             }
        //         }
        //     }
    
        //     xhr.open('GET', URL, true);
        //     xhr.send();
        // }
// }

//  let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard']
//  let PRICES = [100, 120, 1000, 15, 18]
//  let IDS = [0, 1, 2, 3, 4]
//  let IMGS = ['https://cs8.pikabu.ru/post_img/big/2017/12/25/5/1514188160141511997.jpg', 
//  'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/HMUB2?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1563827752399',
//  'https://zeon18.ru/files/item/Xiaomi-Mi-Notebook-Air-4G-Officially-Announced-Weboo-co-2%20(1)_1.jpg',
//  'https://files.sandberg.it/products/images/lg/640-05_lg.jpg',
//  'https://images-na.ssl-images-amazon.com/images/I/81PLqxtrJ3L._SX466_.jpg']

//  //let products = [] //массив объектов
 
//  let catalog = {
//     items: [],
//     container: '.products',
//     cart: null,
//     construct (cart) {
//         this.cart = cart
//         this._init () //_ - это обозначение инкапсулированного метода
//     },
//     _init () {
//         this._handleData ()
//         this.render ()
//         this._handleEvents ()
//     },
    // _handleEvents () {
    //     document.querySelector (this.container).addEventListener ('click', (evt) => {
    //         if (evt.target.name === 'buy-btn') {
    //             this.cart.addProduct (evt.target)
    //         }
    //     })
    // },
//     _handleData () {
//         for (let i = 0; i < IDS.length; i++) {
//             this.items.push (this._createNewProduct (i))
//         }
//     },
//     _createNewProduct (index) {
//         return {
//             product_name: PRODUCTS_NAMES [index],
//             price: PRICES [index],
//             id_product: IDS [index],
//             img: IMGS [index]
//         }
//     },
//     render () {
//         let str = ''
//         this.items.forEach (item => {
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
//      }
//  }

//  let cart = {
//     items: [],
//     total: 0,
//     sum: 0,
//     container: '.cart-block',
//     quantityBlock: document.querySelector ('#quantity'),
//     priceBlock: document.querySelector ('#price'),
//     construct () {
//         this._init ()
//     },
//     _init () {
//         this._handleEvents ()
//     },
    // _handleEvents () {
    //     document.querySelector (this.container).addEventListener ('click', (evt) => {
    //         if (evt.target.name === 'del-btn') {
    //             this.deleteProduct (evt.target)
    //         }
    //     })
    // },
//     addProduct (product) {
//         let id = product.dataset['id']
//         let find = this.items.find (product => product.id_product === id)
//         if (find) {
//             find.quantity++
//         } else {
//             let prod = this._createNewProduct (product)
//             this.items.push (prod)
//         }
         
//         this._checkTotalAndSum ()
//         this.render ()
//     },
//     _createNewProduct (prod) {
//         return {
//             product_name: prod.dataset['name'],
//             price: prod.dataset['price'],
//             id_product: prod.dataset['id'],
//             quantity: 1
//         }
//     },
//     deleteProduct (product) {
//         let id = product.dataset['id']
//         let find = this.items.find (product => product.id_product === id)
//         if (find.quantity > 1) {
//             find.quantity--
//         } else {
//             this.items.splice (this.items.indexOf(find), 1)
//         }
         
//         this._checkTotalAndSum ()
//         this.render ()
//     },
    
//     _checkTotalAndSum () {
//         let qua = 0
//         let pr = 0
//         this.items.forEach (item => {
//             qua += item.quantity
//             pr += item.price * item.quantity
//         })
//         this.total = qua
//         this.sum = pr
//     },
//     render () {
//         let itemsBlock = document.querySelector (this.container).querySelector ('.cart-items')
//         let str = ''
//         this.items.forEach (item => {
            // str += `<div class="cart-item" data-id="${item.id_product}">
            //         <img src="https://placehold.it/100x80" alt="">
            //         <div class="product-desc">
            //             <p class="product-title">${item.product_name}</p>
            //             <p class="product-quantity">${item.quantity}</p>
            //             <p class="product-single-price">${item.price}</p>
            //         </div>
            //         <div class="right-block">
            //             <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
            //         </div>
            //     </div>`
//         })
//         itemsBlock.innerHTML = str
//         this.quantityBlock.innerText = this.total
//         this.priceBlock.innerText = this.sum
//     }
//  }

 

//  export default function() {
//     catalog.construct(cart);
//     cart.construct();
// }