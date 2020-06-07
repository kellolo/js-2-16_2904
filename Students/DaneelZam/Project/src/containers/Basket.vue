<template>
    <div class="cart-block" v-show="$parent.show">
        <div class="d-flex">
            <strong class="d-block">Всего товаров {{ totalCount }}</strong>
        </div>
        <hr>
        <div class="cart-items">
            <goods v-for="goods in goodsInBasket" :key="goods.id_product" :type="'basket'" :goods="goods" />
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть: {{ totalSum }}</strong>
        </div>
    </div>
</template>

<script>
    import goods from '../components/Goods.vue'
    export default {
        components: {
            goods
        },
        data() {
            return {
                goodsInBasket: [],
                url: '/api/basket'
            }
        },
        mounted() {
            this.$parent.get(this.url).then(dataJson => {
                this.goodsInBasket = dataJson;
            })
        },

        computed: {
            totalSum() {
                let total = 0;
                this.goodsInBasket.forEach(element => total += (element.price * element.product_quantity));
                return total
            },

            totalCount() {
                let total = 0;
                this.goodsInBasket.forEach(element => total += element.product_quantity);
                return total
            }
        },
        methods: {
            add(goods) {
                let id = goods.id_product
                let find = this.goodsInBasket.find(element => +element.id_product === +id)
                
                if (find) {
                    this.$parent.put({})
                    .then(res => {
                        if (res) {
                            find.quantity++
                        }
                    });
                } else {
                    this.$parent.post(this.url, goods)
                    .then(res => {
                        if (res) {
                            this.goodsInBasket.push(Object.assign({}, goods, { product_quantity: 1 }));
                        }
                    });
                }
            },
            // add(goods) {
            //     this.$parent.get('https://raw.githubusercontent.com/daneelzam/Static/master/GB/eShop/API/addToBasket.json')
            //         .then(res => {
            //             if (res.result) {
            //                 this.addProduct(goods);
            //             } else {
            //                 throw new Error('Lol error');
            //             }
            //         })
            // },

            remove(goods) {
                
                this.$parent.get('https://raw.githubusercontent.com/daneelzam/Static/master/GB/eShop/API/deleteFromBasket.json')
                    .then(res => {
                        if (res.result) {
                            this.deleteProduct(goods);
                        } else {
                            throw new Error('Lol error');
                        }
                    })
            },

            // addProduct(product) {
            //     let id = product.id_product
            //     let find = this.goodsInBasket.find(element => +element.id_product === +id)
            //     if (find) {
            //         find.product_quantity++
            //     } else {
            //         let prod = Object.assign({}, product, {product_quantity: 1})
            //         this.goodsInBasket.push(prod)
            //     }
            // },

            // _createNewProduct(prod) {
            //     return 
            // },

            deleteProduct(product) {
                let id = product.id_product
                let find = this.goodsInBasket.find(element => +element.id_product === +id)
                if (find.product_quantity > 1) {
                    find.product_quantity--
                } else {
                    this.goodsInBasket.splice(this.goodsInBasket.indexOf(find), 1)
                }
            }
        }
    }
</script>

<style>

</style>