<template>
    <div :class="computedClassName">
    <img :src="computedImgSrc" :alt="item.product_name">
      <template v-if="type=='catalog'">
            <div class="desc">
                <h1>{{ item.product_name }}</h1>
                <p>{{ item.price }}</p>
                <button class="buy-btn" type="button" @click="$parent.$parent.$refs.cart.addProduct(item)">Купить</button>
            </div>
      </template>
      <template v-if="type=='cart'">
                <div class="product-desc">
                    <p class="product-title">{{ item.product_name }}</p>
                    <p class="product-quantity">{{ item.quantity }}</p>
                    <p class="product-single-price">{{ item.price }}</p>
                </div>
                <div class="right-block">
                    <button class="del-btn" @click="$parent.$parent.$refs.cart.deleteProduct(item)">&times;</button>
                </div>
      </template>
    </div>
</template>

<script>
export default {
    //props: ['type'],
    props: {
        type: {
            type: String,
            default: 'catalog'
        },
        item: {
            type: Object
        }
    },
    computed: {
        computedClassName(){
            return `${this.type == 'catalog' ? 'product-item' : 'cart-item'}`;
        },
        computedImgSrc(){
            return `https://placehold.it/${this.type == 'catalog' ? '200x150' : '100x80'}`;
        },
    }
}
</script>

<style>

</style>