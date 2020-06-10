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
import Basket from "../containers/Basket.vue";
import Catalog from "../containers/Catalog.vue";
import Search from "../components/Search.vue";
export default {
  components: { Basket, Catalog, Search },
  data() {
    return {
      showBasket: true,
      searchFailed: false
    };
  },
  methods: {
    get(url) {
      return fetch(url).then(data => data.json());
    },
    post(url, item) {
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content_Type": "application/json"
                    },
                    body: JSON.stringify(item)
                });
            },
            put(url, items) {
               return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(items)
                });
            },
            delete(pl) {
              this.$refs.basket.remove(pl)
            },
            addItem(pl) {
                this.$refs.basket.add(pl)
            }
        }
  };
</script>

<style>
</style>