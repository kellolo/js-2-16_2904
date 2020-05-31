export default function () {
    let API = 'https://raw.githubusercontent.com/teitumx/static/master/GeekBrains/Shop/getBasket.json';

    let api = new Vue({
        el: '#app',
        data: {
            catalogItems: [],
            basketItems: [],
            catalogUrl: API + 'catalogData.json',
            basketUrl: API + 'getBasket.json',
            // totalQuantity: 0,
            // totalSum: 0,
            show: true
        },
        mounted() {
            this.get(this.catalogUrl)
                .then(data => {
                    this.catalogItems = data;
                })
            this.get(this.basketUrl)
                .then(data => {
                    this.basketItems = data;
                })
        },
        methods: {
            get: function (url) {
                return fetch(url).then(data => data.json())
            },

            add(item) {
                let id = item.id_product;
                let find = this.basketItems.contents.find(product => product.id_product === id);
                if (find) {
                    find.quantity++;
                } else {
                    let prod = this.createNewProduct(item);
                    this.basketItems.contents.push(prod);
                }
            },

            createNewProduct(prod) {
                return {
                    product_name: prod.product_name,
                    price: prod.price,
                    id_product: prod.id_product,
                    quantity: 1
                }
            },

            deleteFromBasket(prod) {
                let id = prod.id_product;
                let find = this.basketItems.contents.find(item => item.id_product === id);
                if (find.quantity > 1) {
                    find.quantity--;
                } else {
                    this.basketItems.contents.splice(this.basketItems.contents.indexOf(find), 1)
                }
            }

        },

        computed: {
            // checkQuantity() {
            //     let q = 0;
            //     this.basketItems.contents.forEach(item => {
            //         q += item.quantity;
            //     })
            //     return q;
            // },

            // checkSum() {
            //     this.totalSum = 0;
            //     this.basketItems.contents.forEach(item => {
            //         this.totalSum += item.price * item.quantity;
            //     })
            //     return this.totalSum;
            // }
        },
    });
}