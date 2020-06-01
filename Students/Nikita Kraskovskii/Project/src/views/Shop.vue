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
            <Catalog />
        </main>  
    </div> 
</template>

<script>
import Cart from '../container/Cart.vue'
import Catalog from '../container/Catalog.vue'
export default {
    components: { Cart, Catalog },
    data(){
        return {showCart: false}
    },
    methods: {
        get(url){
            return fetch(url).then(data => data.json())
        }
    },
}
</script>

<style>

</style>