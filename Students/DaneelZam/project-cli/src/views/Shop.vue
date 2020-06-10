<template>
    <div>
        <header id="header">
            <div class="logo">E-shop</div>
            <div class="cart">
                <search />
                <button class="btn-cart" @click="show=!show">Cart</button>
                <Basket ref="basket" @remove='delGoods' />
            </div>
        </header>
        <main>
            <div class="searchFailed" v-if="searchFailed">Поиск не дал результатов</div>
            <catalog ref="catalog" @add="addGoods" />
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
                return fetch(url).then(d => d.json());
            },
            post(url, goods) {
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(goods)
                });
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
            addGoods(pl) {
                this.$refs.basket.add(pl)
            },
            delGoods(pl) {
                this.$refs.basket.remove(pl)
            }
        }
    }
</script>

<style>

</style>