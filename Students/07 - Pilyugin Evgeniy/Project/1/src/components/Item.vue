<template>
    <div :class="computedWrapperClassName">
        <img :src="computedImgSrc" :alt="item.name">

        <template v-if="type=='catalog'">
            <div class="desc">
                <h1>{{ item.name }}</h1>
                <p>{{ item.price }}</p>
                <button
                        class="buy-btn"
                        name="buy-btn"
                        @click="$parent.$parent.$refs.basket.add(item)"
                >Купить
                </button>
            </div>
        </template>

        <template v-if="type=='basket'">
            <div class="product-desc">
                <p class="product-title">{{ item.name }}</p>
                <p class="product-quantity">{{ item.counter }}</p>
                <p class="product-single-price">{{ item.price * item.counter }}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn"
                        @click="$parent.$parent.$refs.basket.del(item)"
                >&times;
                </button>
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
                type: Object
            }
        },
        computed: {
            computedWrapperClassName() {
                return `${this.type === 'catalog' ? 'product-item' : 'cart-item'}`;
            },
            computedImgSrc() {
                return `https://placehold.it/${this.type === 'catalog' ? '200x150' : '100x80'}`;
            }
        },
    }
</script>

<style>

</style>