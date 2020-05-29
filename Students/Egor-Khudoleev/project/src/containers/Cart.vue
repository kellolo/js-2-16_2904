<template>
    <div class="cart-block">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong><div id="quantity">{{ computedQuantity }}</div>
        </div>
        <hr>
        <empty v-if="items.length === 0" :type="'cart'">В корзине пусто</empty>
        <item v-for="item of items"
              :key="item.id_product"
              :type="'cart'"
              :item="item"
              @delete-item="getAnswer" />
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong><div id="price">{{ computedSum }}</div>
        </div>
    </div>
</template>

<script>
    import item from '../components/Item.vue';
    import empty from '../components/Empty.vue';
    export default {
        components: {item, empty},
        props: {
            cartData: {
              type: Promise
            },
            addItem: {
                type: Object
            },
            addAnswer: {
                type: Promise | null
            },
            deleteAnswer: {
                type: Promise | null
            }
        },
        data() {
            return {
                items: [],
                url: 'getBasket.json',
                idToDelete: null
            }
        },
        mounted() {
            this.$emit('get-cart-data', this.url);
        },
        methods: {
            createNewProduct(item) {
                return {
                    product_name: item.product_name,
                    price: item.price,
                    id_product: item.id_product,
                    quantity: 1
                }
            },
            getAnswer(id) {
                this.$emit('delete-item', 'deleteFromBasket.json');
                this.idToDelete = id;
            },
        },
        computed: {
            computedQuantity() {
                let quantity = 0;
                this.items.forEach(item => {
                    quantity += item.quantity;
                })
                return quantity;
            },
            computedSum() {
                let sum = 0;
                this.items.forEach(item => {
                    sum += item.price * item.quantity;
                })
                return sum;
            }
        },
        watch: {
            cartData() {
                this.cartData.then(result => {
                    if (result !== undefined) {
                        this.items = result.contents;
                    }
                })
            },
            addAnswer() {
                this.addAnswer.then(data => {
                    if (data.result === 1) {
                        let find = this.items.find(product => product.id_product === this.addItem.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            this.items.push(this.createNewProduct(this.addItem));
                        }
                    }
                })
            },
            deleteAnswer() {
                this.deleteAnswer.then(data => {
                    if (data.result === 1) {
                        let find = this.items.find(product => product.id_product === this.idToDelete);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.items.splice(this.items.indexOf(find), 1);
                        }
                    }
                })
            }
        }
    }
</script>

<style>

</style>