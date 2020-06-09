<template>
    <div :class="computedWrapperClassName">
        <!--img :src="computedImgSrc" :alt="calcAlt"-->
        <img :src="computedImgSrc" :alt="item.product_name">

        <template v-if="type=='catalog'">
            <div class="desc">
                <h1>{{ item.product_name }}</h1>
                <p>{{ item.price }}</p>
                <button 
                    class="buy-btn" 
                    name="buy-btn"
                    @click="$parent.$emit('add', item)"
                >Купить</button>
            </div>
        </template>

        <template v-if="type=='basket'">
            <div class="product-desc">
                <p class="product-title">{{ item.product_name }}</p>
                <p class="product-quantity">{{ item.quantity }}</p>
                <p class="product-single-price">{{ item.price }}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" @click="$parent.remove(item)">&times;</button>
            </div>
        </template>

        <template v-else-if="type === 'temp'">
            <div class="desc w-75">
                <label >
                    <input type="text" placeholder="Item name" v-model="newProduct.product_name" class="w-50">
                </label>
                <label >
                    <input type="number" placeholder="Item price" v-model="newProduct.price" class="w-50">
                </label>
                <button class="buy-btn" 
                    name="buy-btn"
                    @click="createNew(newProduct)"
                >Добавить</button>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newProduct: {
                product_name: '',
                price: 0
            }
        }
    },
    props: {
        type: {
            type: String,
            default: 'catalog'
        },
        item: {
            type: Object,
            default: () => ({ product_name: 'Default' })
        }
    },
    computed: {
        computedWrapperClassName() {
            return `${this.type == 'catalog' ? 'product-item' : 'cart-item'}`
        },
        computedImgSrc() {
            return `https://placehold.it/${this.type == 'catalog' ? '200x150' : '100x80'}`
        },
        // calcAlt() {
        //     return this.item ? this.item.product_name : 'template';
        // }
    },
    methods: {
        createNew(item) {
            if(item.product_name && item.price) {
                this.$emit('createnew', item); //new custom event generated
                this.newProduct.product_name = '';
                this.newProduct.price = 0;
            }
        }
    }
}
</script>

<style>

</style>