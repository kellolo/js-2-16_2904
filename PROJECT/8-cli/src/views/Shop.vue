<template>
  <div>
    <header>
        <div class="logo">E-shop</div>
        <div class="cart">
            <FormSearch @search="filterCatalog" />
            <button class="btn-cart" @click="showBasket = !showBasket">Cart</button>
            <Basket ref="basket" v-show="showBasket"/>
        </div>
    </header>
    <main>
        <Catalog @add="addItem" ref="catalog"/>
    </main>
  </div>
</template>

<script>
import Basket from '../containers/Basket.vue'
import Catalog from '../containers/Catalog.vue'
import FormSearch from '../components/Search'

export default {
    components: { Basket, Catalog, FormSearch },
    data() {
        return {
            showBasket: false
        }
    },
    methods: {
        // REST 
        // CRUD - Create Read Update Delete
        filterCatalog(str) {
            this.$refs.catalog.filter(str);
        },
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
