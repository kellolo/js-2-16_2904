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
        <Catalog ref="catalog" />
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
        }
    }
}
</script>
