<template>
  <div>
    <header>
      <div class="logo">E-shop</div>
      <div class="cart">
        <Search @search="filterCatalog" />
        <button @click="showBasket=!showBasket" class="btn-cart">Cart</button>
        <Basket ref="basket" v-show="showBasket" />
      </div>
    </header>
    <main>
      <Catalog ref="catalog" @add="addItem" />
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
    filterCatalog(str) {
      this.$refs.catalog.filter(str);
    },
    get(url) {
      return fetch(url).then(d => d.json());
    },
    post(url, item) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      }).then(d => d.json());
    },
    put(url, dir) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dir)
      }).then(d => d.json());
    },

    delete(url) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(d => d.json());
    },

    search(text) {
      this.$refs.catalog.searching(text);
    },

    addItem(pl) {
      this.$refs.basket.add(pl);
    }
  }
};
</script>

<style>
</style>