
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List{
    constructor(url, container, dictionary = classes){
        this.url = url;
        this.container = container;
        this.items = [];
        this.dictionary = dictionary;
        this.allItems = [];
        this._handleEvents();
    }
   
    get(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    render(){
        let block = document.querySelector(this.container);
        for (let item of this.items){
            let prodObj = new this.dictionary[this.constructor.name](item);
            this.allItems.push(prodObj);
            block.insertAdjacentHTML('beforeend', prodObj.render());
        }
    }
    
    update(data){
        this.items = [...data];
        this.render();
    }
    
    _handleEvents(){
        return false
    }
};

class ListItem{
    constructor(item, img = 'https://placehold.it/200x150'){
        this.product_name = item.product_name;
        this.price = item.price
        this.img = img
        this.id_product = item.id_product;
    }

    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.product_name}">
                    <div class="desc">
                        <h1>${this.product_name}</h1>
                        <p>${this.price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${this.product_name}"
                        data-price="${this.price}"
                        data-id="${this.id_product}"
                        >Купить</button>
                    </div>
                </div>`
    }
};

class Catalog extends List{
    constructor(cart, url = '/catalogData.json', container = '.products'){
        super(url, container);
        this.cart = cart;
        this.get().then(data => this.update(data));   
    }

    _handleEvents(){
        document.querySelector(this.container).addEventListener ('click', (event) => {
            if (event.target.name === 'buy-btn') {
                this.cart.addProduct(event.target);
            }
        })
    }    
};

class Cart extends List {
    constructor(url = '/getBasket.json', container = '.cart-block'){
        super(url, container);
        this.get().then(data => {
            this.update(data.contents);
        });
    }

    _handleEvents(){
        document.querySelector(this.container).addEventListener('click', (event) => {
            if (event.target.name === 'del-btn'){
                this.deleteProduct(event.target)
            } 
        })
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible')
        })
    }
    
    addProduct(item){
        this.get(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let itemId = +item.dataset['id'];
                    let find = this.allItems.find(elem => elem.id_product === itemId);
                    if(find){
                        find.quantity++;
                        this._cartQuantity(find);
                    } else {
                        let item1 ={
                            id_product: itemId,
                            price: +item.dataset['price'],
                            product_name: item.dataset['name'],
                            quantity: 1
                        };
                        this.items = [item1];
                        this.render();
                    }
                } else {
                    throw new Error ('Error')
                }
            })
    }

    deleteProduct (item) {
        this.get(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let itemId = +item.dataset['id'];
                    let find = this.allItems.find(elem => elem.id_product === itemId)
                    if(find.quantity > 1){
                        find.quantity--;
                        this._cartQuantity(find);
                        

                    } else {
                        this.allItems.splice(this.allItems.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${itemId}"]`).remove()
                    }
                } else {
                    throw new Error('Error');
                    
                }
            })
    }

    _cartQuantity(item){
        let block = document.querySelector(`.cart-item[data-id="${item.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `${item.quantity}`;
    }
    
};

class CatalogItem extends ListItem {};

class CartItem extends ListItem{
    constructor(item, img = 'https://placehold.it/100x80'){
        super(item, img);
        this.quantity = item.quantity;
    }

    render () {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="${this.product_name}">
                    <div class="product-desc">
                        <p class="product-title">${this.product_name}</p>
                        <p class="product-quantity">${this.quantity}</p>
                        <p class="product-single-price">${this.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`
    }
};

const classes = {
    Catalog: CatalogItem,
    Cart: CartItem
}

export default function(){
    let basket = new Cart();
    let cat = new Catalog(basket)
};
