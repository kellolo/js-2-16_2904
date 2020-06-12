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
                url: '/api/basket/'
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
                let id = goods.id_product;
                let find = this.goodsInBasket.find(element => +element.id_product === +id);
                if (find) {
                    this.$parent.put(`/api/basket/${id}`, { amount: 1 })
                    .then(res => {
                        if (res) {
                            find.product_quantity++
                        }
                    });
                } else {
                    let newGoods = Object.assign({}, goods, { product_quantity: 1 });
                    this.$parent.post(this.url, newGoods)
                    .then(res => {
                        if (res.status) {
                            this.goodsInBasket.push(newGoods);
                        }
                    });
                }
            },

            remove(goods) {
                let find = this.goodsInBasket.find(el => +el.id_product == +goods.id_product);

                if (find.product_quantity == 1){
                    this.$parent.delete(`/api/basket/${goods.id_product}`)
                        .then(res => {
                            if (res.status) {
                                this.goodsInBasket.splice(this.goodsInBasket.indexOf(find), 1);
                            }
                        });
                } else {
                    this.$parent.put(`/api/basket/${goods.id_product}`, { amount: -1 })
                        .then(res => {
                            if (res.status) {
                                find.product_quantity--
                            }
                        })
                }
            }
        }
    }
</script>

<style>

</style>