<template>
  <div>
    <header>
      <div class="logo">E-shop</div>
      <div class="cart">
        <search />
        <button @click="showBasket=!showBasket" class="btn-cart">Cart</button>
        <Basket ref="basket" v-show="showBasket" />
      </div>
    </header>
    <main>
      <catalog />
    </main>
  </div>
</template>

<script>
import Basket from "../containers/Basket.vue";
import Catalog from "../containers/Catalog.vue";
import Search from "../components/Search.vue";
export default {
  components: { Basket, Catalog, Search },
  data() {
    return {
      showBasket: true
    };
  },
  methods: {
    get(url) {
      return fetch(url).then(data => data.json());
    }
  }
};
</script>

<style>
</style>