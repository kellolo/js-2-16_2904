<template>
    <div :class="computedWrapperClassName">
    <img :src="computedImageSrc" :alt="goods.product_name">
        <template v-if="type=='catalog'">        
            <div class="desc">
                <h1>{{ goods.product_name }}</h1>
                <p>{{ goods.price }}</p>
                <button 
                    class="buy-btn" 
                    name="buy-btn" 
                    @click="$parent.$parent.$refs.basket.add(goods)"
                >Купить</button>
            </div>
        </template>
        <template v-if="type=='basket'">
            <div class="product-desc">
                <p class="product-title">{{ goods.product_name }}</p>
                <p class="product-quantity">{{ goods.product_quantity }}</p>
                <p class="product-single-price">{{ goods.price }}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" @click="$parent.$parent.$refs.basket.remove(goods)">&times;</button>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String
            },
            goods: {
                type: Object
            }
        },
        computed: {
            computedWrapperClassName() {
                return `${this.type == 'catalog' ? 'product-item goods-item' : 'cart-item'}`
            },
            computedImageSrc() {
                return `https://placehold.it/${this.type == 'catalog' ? '200x150' : '100x80'}`
            }
        }
    }
</script>

<style>

</style>