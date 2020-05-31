<template>
  <div>
    <header>
        <Modal ref="showModal"/>
        <div class="logo">E-shop</div>
        <div class="cart">
            <search v-on:search="search"/>
            <button class="btn-cart" @click="showBasket = !showBasket">Cart</button>
            <Basket ref="basket" v-show="showBasket" v-on:errorMsg="showModal"/>
        </div>
    </header>
    <main>
        <Catalog ref="catalog"/>
    </main>
  </div>
</template>

<script>
import Modal from '../components/Error.vue';
import Basket from '../containers/Basket.vue';
import Catalog from '../containers/Catalog.vue';
import Search from "../components/Search.vue";

export default {
    components: { Basket, Catalog, Search, Modal },
    data() {
        return {
            showBasket: false
        }
    },
    methods: {
        get(url) {
            return fetch(url).then(d => {
                if(d.status === 200) {
                    return d.json();
                } else {
                    throw new Error('Запрос не удался');
                }
            })
                .catch(e => {
                    this.showModal(e.message);
                });
        },
        search(text) {
            this.$refs.catalog.searching(text);
        },
        showModal(text) {
            this.$refs.showModal.receiveMsg(text);
        }
    }
}
</script>

<style scoped>
    header {
        display: flex;
    }
</style>
