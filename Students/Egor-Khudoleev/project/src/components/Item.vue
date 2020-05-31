<template>
    <div :class="computedClass">
        <template v-if="type === 'catalog'">
            <img :src="computedImg" :alt="item.product_name">
            <div class="desc">
                <h1>{{ item.product_name }}</h1>
                <p>{{ item.price }}</p>
                <button class="buy-btn"
                        name="buy-btn"
                        @click="$emit('add-item', item)">Купить</button>
            </div>
        </template>
        <template v-else-if="type === 'cart'" >
            <img :src="computedImg" :alt="item.product_name">
            <div class="product-desc">
                <p class="product-title">{{ item.product_name }}</p>
                <p class="product-quantity">{{ item.quantity }}</p>
                <p class="product-single-price">{{ item.price }}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" @click="$emit('delete-item', item.id_product)">&times;</button>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'catalog'
            },
            item: {
                type: Object,
            },
        },
        computed: {
            computedClass() {
                return {
                    'product-item': this.type === 'catalog',
                    'cart-item': this.type === 'cart'
                }
            },
            computedImg() {
                return `https://placehold.it/${this.type === 'catalog' ? '300x200' : '100x80'}`
            }
        },
        methods: {
            // addItem(item) {
            //     eventBus.$emit('add-item', item);
            // },
        }
    };
</script>

<style>

</style>