<template>
    <div :class="type === 'catalog' ? 'product-item' : 'cart-item'">
        <template v-if="type === 'catalog'">
            <img :src="imgCompute" width = "${300}" height= "${200}" :alt="item.product_name">
            <div class="desc">
                <h1>{{ item.product_name }}</h1>
                <p>{{ item.price }}</p>
                <button class="buy-btn" @click="$root.$children[0].$refs.cart.addProduct(item)" >Купить</button>
            </div>
        </template>
        
        <template v-if="type === 'cart'">
            <img :src="imgCompute" width = "${100}" height= "${200}" :alt="item.product_name">
            <div class="product-desc">
                <p class="product-title">{{item.product_name}}</p>
                <p class="product-quantity">{{item.quantity}}</p>
                <p class="product-single-price">{{item.price}}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" data-id="item.id_product"  @click="$emit('delete', item)">&times;</button>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: "item"
        }
        
    },
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
        imgCompute() {
            return `https://placehold.it/${this.type === 'catalog' ? '300x200' : '100x80'}`
        }
    },
}
</script>