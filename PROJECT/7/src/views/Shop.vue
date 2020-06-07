<template>
  <div>
    <header>
        <div class="logo">E-shop</div>
        <div class="cart">
            <form action="#" class="search-form">
                <input type="text" class="search-field">
                <button class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <button class="btn-cart" @click="showBasket = !showBasket">Cart</button>
            <Basket ref="basket" v-show="showBasket"/>
        </div>
    </header>
    <main>
        <Catalog @add="addItem"/>
    </main>
  </div>
</template>

<script>
import Basket from '../containers/Basket.vue'
import Catalog from '../containers/Catalog.vue'

export default {
    components: { Basket, Catalog },
    data() {
        return {
            showBasket: false
        }
    },
    methods: {
        // REST 
        // CRUD - Create Read Update Delete
        get(url) {
            return fetch(url).then(d => d.json());
        },
        post(url, item) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }).then(d => d.json());
        },
        put(url, dir) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dir)
            }).then(d => d.json());
        },
        delete(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(d => d.json());
        },
        addItem(pl) {
            this.$refs.basket.add(pl);
        }
    }
}
</script>
