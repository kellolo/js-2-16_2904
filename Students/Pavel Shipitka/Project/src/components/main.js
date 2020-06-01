
API ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
    el: '#app',
    data: {
        items: [],
    itemsCart: [],
    API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
    JSONS: ['catalogData.json', 'cartData.json'],
    isVisibleCart: false,
    quantity: 0,
    sum: 0,
    },
    mounted() {
        this.JSONS.forEach(json => {
          this.get(json)
            .then(res => {
              if (json === 'catalogData.json') {
                this.items = res;
              } else if (json === 'cartData.json') {
                this.itemsCart = res;
                console.log(this.itemsCart);
              }
            })
        })
    
      },
      methods: {
        get(url) {
          return fetch(this.API + url).then(d => d.json())
        },
        showHideCart() {
          this.isVisibleCart !== true ? this.isVisibleCart = true : this.isVisibleCart = false;
        },
        addProductToCart(e) {
          let id = e.target.dataset['id'];
          let find = this.itemsCart.find(product => product.id_product == id);
          if (find) {
            find.quantity++;
          } else {
            let prod = this.createNewProduct(e.target);
            this.itemsCart.push(prod);
            console.log(this.itemsCart);
          }
        },
        createNewProduct(prod) {
          return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
          }
        },
        deleteProductFromCart(e) {
          let id = e.target.dataset['id'];
          let find = this.itemsCart.find(product => product.id_product == id);
          if (find.quantity > 1) {
            find.quantity--
          } else {
            this.itemsCart.splice(this.items.indexOf(find), 1)
          }
        }
    
      },
      computed: {
        checkquantity() {
          this.quantity = 0;
          this.itemsCart.forEach(item => {
            this.quantity += item.quantity;
          });
          return this.quantity;
        },
        checksum() {
          this.sum = 0;
          this.itemsCart.forEach(item => {
            this.sum += item.price * item.quantity;
          });
          return this.sum;
        }
      }
    
    });

export default app;
/*class List {
    constructor(url, container) {
        this.items = [];
        this.container = container;
        this.url = url;
        this._init()
    }

    _init() {
        this.get(this.url)
            .then(data => {
                this.items = (this.constructor.name === 'Basket') ? data.contents : data;
                this.render();
                this._handleEvents(data)
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
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.remove(evt.target);
            }
        })

        document.querySelector('.btn-cart').addEventListener ('click', (evt) => {
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
                        let product = this._createNewProduct(item);
                        this.items.push(product);
                    }
                this._checkTotalAndSum();
                this.render();
                } else {
                    throw new Error('Wrong');
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
                    throw new Error('Wrong');
                }
            });

    }
    _checkTotalAndSum() {
        let quant = 0;
        let price = 0;
        this.items.forEach(item => {
            quant += item.quantity;
            price += item.price * item.quantity;
        })
        this.total = quant;
        this.sum = price;
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
            <img src="https://placehold.it/100x80" alt=""">
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
}*/