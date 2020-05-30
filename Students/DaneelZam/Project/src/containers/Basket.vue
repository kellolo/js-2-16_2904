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
                url: 'https://raw.githubusercontent.com/daneelzam/Static/master/GB/eShop/API/getBasket.json'
            }
        },
        mounted() {
            this.$parent.get(this.url).then(dataJson => {
                this.goodsInBasket = dataJson.contents;
            })
        },

        computed: {
            totalSum() {
                let total = null;
                this.goodsInBasket.forEach(element => total += (element.price * element.product_quantity));
                return total
            },

            totalCount() {
                let total = null;
                this.goodsInBasket.forEach(element => total += element.product_quantity);
                return total
            }
        },
        methods: {
            add(goods) {
                this.$parent.get('https://raw.githubusercontent.com/daneelzam/Static/master/GB/eShop/API/addToBasket.json')
                    .then(res => {
                        if (res.result) {
                            this.addProduct(goods);
                        } else {
                            throw new Error('Lol error');
                        }
                    })
            },

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

            addProduct(product) {
                let id = product.id_product
                let find = this.goodsInBasket.find(element => +element.id_product === +id)
                if (find) {
                    find.product_quantity++
                } else {
                    let prod = this._createNewProduct(product)
                    this.goodsInBasket.push(prod)
                }
            },

            _createNewProduct(prod) {
                return {
                    product_name: prod.product_name,
                    price: prod.price,
                    id_product: prod.id_product,
                    product_quantity: 1
                }
            },

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