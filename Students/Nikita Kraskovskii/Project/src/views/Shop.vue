<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <div class="cart">
                <form action="#" class="search-form" >
                    <input type="text" class="search-field" >
                    <button class="btn-search">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
                <button class="btn-cart" type="button" @click="showCart = !showCart">Cart</button>
                <Cart ref="cart" v-show="showCart"/>
            </div>
        </header>
        <main>
            <Catalog @addProduct="addItem"/>
        </main>  
    </div> 
</template>

<script>
import Cart from '../container/Cart.vue'
import Catalog from '../container/Catalog.vue'
export default {
    components: { Cart, Catalog },
    data() {
        return {showCart: false}
    },
    methods: {
        get(url) {
            return fetch(url).then(data => data.json())
        },
        post(url, item) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(item)
            })
        },
        put() {

        },
        delete() {

        },
        addItem(pl) {
            this.$refs.cart.addProduct(pl);
        }
    },
}
</script>

<style>

</style>