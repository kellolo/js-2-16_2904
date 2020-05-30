// const API = 'https://raw.githubusercontent.com/daneelzam/Static/master/GB/eShop/API';

// const app = new Vue({
//     el: '#app',
//     data: {
//         goods: [],
//         filteredGoods: [],
//         searchLine: [],
//         goodsInBasket: [],
//         show: true,
//         searchFailed: false
//     },
//     computed: {
//         totalSum: function () {
//             total = null;
//             this.goodsInBasket.forEach(element => total += (element.price * element.product_quantity));
//             return total
//         },

//         totalCount: function () {
//             total = null;
//             this.goodsInBasket.forEach(element => total += element.product_quantity);
//             return total
//         }
//     },
//     methods: {
//         get(url) {
//             return fetch(url).then(dataJson => dataJson.json());
//         },

//         add(item) {
//             this.get(`${API}/addToBasket.json`)
//                 .then(res => {
//                     if (res.result) {
//                         this.addProduct(item.target);
//                     } else {
//                         throw new Error('Lol error');
//                     }
//                 })
//         },

//         remove(item) {
//             this.get(`${API}/deleteFromBasket.json`)
//                 .then(res => {
//                     if (res.result) {
//                         this.deleteProduct(item.target);
//                     } else {
//                         throw new Error('Lol error');
//                     }
//                 })
//         },

//         addProduct(product) {
//             let id = product.dataset['id']
//             let find = this.goodsInBasket.find(element => +element.id_product === +id)
//             if (find) {
//                 find.product_quantity++
//             } else {
//                 let prod = this._createNewProduct(product)
//                 this.goodsInBasket.push(prod)
//             }
//         },

//         _createNewProduct(prod) {
//             return {
//                 product_name: prod.dataset['name'],
//                 price: prod.dataset['price'],
//                 id_product: prod.dataset['id'],
//                 product_quantity: 1
//             }
//         },

//         deleteProduct(product) {
//             let id = product.dataset['id']
//             let find = this.goodsInBasket.find(element => +element.id_product === +id)
//             if (find.product_quantity > 1) {
//                 find.product_quantity--
//             } else {
//                 this.goodsInBasket.splice(this.goodsInBasket.indexOf(find), 1)
//             }
//         },

        // searchGoods(product) {
        //     request = document.querySelector(".search-field").value
        //     if (request === '') {
        //         this.filteredGoods = this.goods;
        //         this.searchFailed = false;
        //     } else {
        //         this.filteredGoods = this.goods.filter(good => good.product_name == request);
        //         if (this.filteredGoods.length == 0) {
        //             this.searchFailed = true;
        //         } else {
        //             this.searchFailed = false;
        //         }
        //     };
        // }
//     },
//     mounted() {
//         this.get(`${API}/catalogData.json`)
//             .then(goods => {
//                 this.goods = goods;
//                 this.filteredGoods = goods;
//             });
//         this.get(`${API}/getBasket.json`)
//             .then(goods => {
//                 this.goodsInBasket = goods.contents;
//             });
//     }
// });