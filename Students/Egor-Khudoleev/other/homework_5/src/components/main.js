let app = new Vue({
    el: '#app',
    data: {
        API: 'https://raw.githubusercontent.com/egorkhu/online-store-api/master/responses/',
        JSONS: ['catalogData.json', 'getBasket.json'],
        catalogItems: {
            img:'https://placehold.it/300x200',
            contents: []
        },
        filteredItems: {},
        cartItems: {
            img: 'https://placehold.it/100x80',
            contents: []
        },
        isVisibleCart: true,
        totalQuantity: 0,
        totalSum: 0,
        searchLine: ''
    },
    beforeMount() {
        this.JSONS.forEach(JSON => {
            this.fetchData(JSON)
                .then(result => {
                    if (JSON === 'catalogData.json') {
                        this.catalogItems.contents = result;
                        this.filteredItems = Object.assign({}, this.catalogItems);
                    } else if (JSON === 'getBasket.json') {
                        this.cartItems = Object.assign({}, this.cartItems, result);
                    }
                })
                .catch(err => {
                    alert(`Произошла ошибка ${err}`)
                })
        })
    },
    methods: {
        fetchData(url) {
            return fetch(this.API + url)
                .then(respond => respond.json());
        },
        showHideCart() {
            this.isVisibleCart !== true ? this.isVisibleCart = true : this.isVisibleCart = false;
        },
        filterItems() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredItems.contents = this.catalogItems.contents.filter(item => {
                return regexp.test(item.product_name);
            })
        },
        addItemToCart(e) {
            this.fetchData('addToBasket.json')
                .then(result => {
                    let id = e.target.dataset['id'];
                    let find = this.cartItems.contents.find(product => product.id_product === id);
                    if (find) {
                        find.quantity++;
                    } else {
                        let prod = this.createNewProduct(e.target);
                        this.cartItems.contents.push(prod);
                    }
                })
        },
        createNewProduct(prod) {
            return {
                product_name: prod.dataset['name'],
                price: prod.dataset['price'],
                id_product: prod.dataset['id'],
                quantity: 1
            }
        },
        deleteFromCart(e) {
            this.fetchData('deleteFromBasket.json')
                .then(result => {
                    let id = e.target.dataset['id'];
                    let find = this.cartItems.contents.find(product => product.id_product === id);
                    if (find.quantity > 1) {
                        find.quantity--;
                    } else {
                        this.cartItems.contents.splice(this.cartItems.contents.indexOf(find), 1);
                    }
                })
        },

    },
    computed: {
        checkQuantity() {
            this.totalQuantity = 0;
            this.cartItems.contents.forEach(item => {
                this.totalQuantity += item.quantity;
            })
            return this.totalQuantity;
        },
        checkSum() {
            this.totalSum = 0;
            this.cartItems.contents.forEach(item => {
                this.totalSum += item.price * item.quantity;
            })
            return this.totalSum;
        }
    }
})

