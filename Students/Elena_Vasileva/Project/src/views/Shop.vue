<template>
  <div>
    <header>
        <div class="logo">E-shop</div>
        <div class="cart">
            <search />
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
import Basket from '../containers/Basket.vue';
import Catalog from '../containers/Catalog.vue';
import Search from "../components/Search.vue";

export default {
    components: { Basket, Catalog, Search },
    data() {
        return {
            showBasket: false
        }
    },
    methods: {
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
            });

        },
        put() {

        },
        delete() {

        },
        addItem(pl) {
            this.$refs.basket.add(pl);
        }
    }
}
</script>
