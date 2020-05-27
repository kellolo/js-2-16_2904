'use strict';

let app = {
    el: '#app',
    data: {
        catalogImage: 'https://placehold.it/200x150',
        basketImage: 'https://placehold.it/100x80',
        API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        showCart: false,
        cartItems: [],
        catalogItems: [],
        urlCatalog: '/catalogData.json',
        containerCatalog: '.products',        
        urlBasket: '/getBasket.json',
        containerBasket: '.cart-block',
        total: 0,
        sum: 0,
        quantityBlock: null,
        priceBlock: null,
    },
    methods: {

        get(url) {
            url = this.API + url;

            return fetch(url).then(dataJson => dataJson.json());
        },

        renderList() {
            let htmlStr = '';

            this.items.forEach(item => {
                let newItem = new classes[this.constructor.name](item);
                htmlStr += newItem.render();
            })

            if (this.constructor.name === 'Basket') {
                let itemsBlock = document.querySelector(this.container).querySelector('.cart-items');

                itemsBlock.innerHTML = htmlStr;
                this.quantityBlock.innerText = this.total;
                this.priceBlock.innerText = this.sum;
            } else {
                document.querySelector(this.container).innerHTML = htmlStr;
            }

        },
        
        addProduct(item) {

            this.get('/addToBasket.json')
                .then(data => {
                    if (data.result === 1) {

                        let id = item.id_product;
                        let find = this.cartItems.find(product => product.id_product == id);

                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = this._createNewProduct(item);
                            this.cartItems.push(prod);
                        }

                        this._checkTotalAndSum();
                    } else {
                        throw new Error('No permission to add product to Basket')
                    }
                });
        },

        _createNewProduct(prod) {
            return {
                product_name: prod.product_name,
                price: prod.price,
                id_product: prod.id_product,
                quantity: 1
            }
        },


        removeProduct(item) {

            this.get('/deleteFromBasket.json')
                .then(data => {
                    if (data.result === 1) {
                        let id = item.id_product;
                        let find = this.cartItems.find(product => product.id_product == id);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }

                        this._checkTotalAndSum();                        
                    } else {
                        throw new Error('No permission to remove product from Basket')
                    }
                });
        },

        _checkTotalAndSum() {
            let qua = 0;
            let pr = 0;
            this.cartItems.forEach(item => {
                qua += item.quantity;
                pr += item.price * item.quantity;
            })
            this.total = qua;
            this.sum = pr;
        },

    },
    computed: {

    },
    created: function() {

        this.quantityBlock = document.querySelector('#quantity');
        this.priceBlock = document.querySelector('#price');
        
        this.get(this.urlCatalog)
            .then(data => {
                this.catalogItems = data;                              
            });
        
        this.get(this.urlBasket)
            .then(data => {
                this.cartItems = data.contents;
                this._checkTotalAndSum();
            });

    }
}

export default function () {
    let vm = new Vue(app);
}


