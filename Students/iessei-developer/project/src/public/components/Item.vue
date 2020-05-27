<template>
    <div :class="type === 'catalog' ? 'product-item' : 'cart-item'">
        <template v-if="type === 'catalog'">
            <img :src="imgCompute" :alt="item.product_name">
            <div class="desc">
                <h1>{{ item.product_name }}</h1>
                <p>{{ item.price }}</p>
                <button class="buy-btn">Купить</button>
            </div>
        </template>

        <template v-if="type === 'cart'">
        <!-- self -->
        </template>
    </div>
</template>

<script>
export default {
    //props: ['type']
    props: {
        type: {
            type: String,
            default: 'catalog'
            //default: () => 'catalog'
        },
        item: {
            type: Object
        }
    },
    computed: {
        imgCompute() {
            return `https://placehold.it/${this.type === 'catalog' ? '300x200' : '100x80'}`
        }
    }
}
</script>
