'use strict';

 class Catalog  {

    constructor(cart) {
        this.items = [];
        this.url = 'https://raw.githubusercontent.com/Nev5ya/online-store-api/master/responses/catalogData.json';
        this.container = '.products';
        this.cart = cart;
        this._init();
    }
    _init() {
        this._fetchData();
        this._handleEvents();
    }
    _handleEvents() {
        document.querySelector (this.container).addEventListener ('click', (evt) => {
            if(evt.target.name === 'buy-btn') {
                this.cart.addProduct (evt.target);
            }
        })
    }

     _fetchData() {
         this._makeGetRequest(this.url, jsonData =>{
             this.items = JSON.parse(jsonData);
             this.render();
         });
     }

     _makeGetRequest(url, callback){

         let xhr = new XMLHttpRequest();

         xhr.onreadystatechange = () => {
             if (xhr.readyState === 4) {
                 if (xhr.status === 200){
                     callback(xhr.responseText);
                 }
             }
         }

         xhr.open('GET', url, true);
         xhr.send();
     }

    render() {
        let str = '';
        this.items.forEach (item => {
            str += `
                <div class="product-item">
                    <img src="https://placehold.it/300x200" alt="${item.product_name}">
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
            `;
        });
        document.querySelector(this.container).innerHTML = str;
     }
 }


 class Cart {

    constructor() {
        this.items = [];
        this.total = 0;
        this.sum = 0;
        this.container = '.cart-block';
        this.quantityBlock = document.querySelector ('#quantity');
        this.priceBlock = document.querySelector ('#price');
        this._init();
    }

    _init() {
        this._handleEvents();
    }
    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct(evt.target);
            }
        })
    }
    addProduct(product) {
        let id = product.dataset['id'];
        let find = this.items.find (product => product.id_product === id);
        if(find) {
            find.quantity++;
        } else {
            let prod = this._createNewProduct (product);
            this.items.push (prod);
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
        let find = this.items.find (product => product.id_product === id);
        if(find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice (this.items.indexOf(find), 1);
        }

        this._checkTotalAndSum();
        this.render();
    }
    _checkTotalAndSum() {
        let qua = 0;
        let pr = 0;
        this.items.forEach (item => {
            qua += item.quantity;
            pr += item.price * item.quantity;
        });
        this.total = qua;
        this.sum = pr;
    }
    render() {
        let itemsBlock = document.querySelector (this.container).querySelector ('.cart-items');
        let str = '';
        this.items.forEach (item => {
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
                </div>`;
        });
        itemsBlock.innerHTML = str;
        this.quantityBlock.innerText = this.total;
        this.priceBlock.innerText = this.sum;
    }
 }

 export default function(){
     let cart = new Cart();
     let catalog = new Catalog(cart);
 }
