<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <div class="cart">
                <search />
                <button class="btn-cart" @click="show=!show">Cart</button>
                <Basket ref="basket" />
            </div>
        </header>
        <main>
            <div class="searchFailed" v-if="searchFailed">Поиск не дал результатов</div>
            <catalog ref="catalog"/>
        </main>
    </div>
</template>

<script>
    import Basket from '../containers/Basket.vue'
    import Catalog from '../containers/Catalog.vue'
    import Search from '../components/Search.vue'

    export default {
        components: {
            Basket,
            Catalog,
            Search
        },
        data() {
            return {
                show: true,
                searchFailed: false
            }
        },
        methods: {
            get(url) {
                return fetch(url).then(dataJson => dataJson.json());
            },
        }
    }
</script>

<style>

</style>