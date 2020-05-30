<template>
  <div>
    <header>
      <div class="logo">E-shop</div>
      <div class="cart">
        <form action="#" class="search-form">
          <input type="text" class="search-field" />
          <button class="btn-search">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button class="btn-cart" @click="showBasket = !showBasket">Cart</button>
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
export default {
  components: { Basket, Catalog },
  data() {
    return {
      showBasket: false
    };
  },
  methods: {
    get(url) {
      return fetch(url).then(d => d.json());
    }
  }
};
</script>

<style></style>
