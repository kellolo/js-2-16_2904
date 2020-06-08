<template>
    <div id="app">
        <header class="header">
            <Modal ref="modal" />
            <h1 class="logo">{{ logo }}</h1>
            <div class="header-container">
                <Search @filtering="filterItems"/>
                <i class="fas fa-shopping-cart" @click="showBasket = !showBasket"></i>
                <Basket v-show="showBasket" ref="basket"/>
            </div>
        </header>
        <main class="main">
            <Catalog ref="catalog"/>
        </main>
    </div>
</template>

<script>
    import Search from "./components/Search";
    import Catalog from "./containers/Catalog";
    import Basket from "./containers/Basket";
    import Modal from "./components/Error";

    export default {
        name: 'App',
        components: {Search, Catalog, Basket, Modal},
        data() {
            return {
                logo: 'E-SHOP',
                showBasket: false
            }
        },
        methods: {
            get(url) {
                return fetch(url)
                    .then(d => d.json())
                    .catch(e => {
                        console.log(e);
                        this.showModal(e.message);
                    });
            },
            post(url, item) {
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(item)
                })
                    .then(d => d.json())
                    .catch(e => {
                        console.log(e);
                        this.showModal(e.message);
                    });
            },
            delete(url, item) {
                return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(item)
                })
                    .then(d => d.json())
                    .catch(e => {
                        console.log(e);
                        this.showModal(e.message);
                    });
            },
            filterItems(searchString) {
                this.$refs.catalog.changeFilterString(searchString);
            },
            showModal(text) {
                this.$refs.modal.receiveMsg(text);
            }
        }
    }
</script>

<style lang="scss">
    $primary-color: #e7e7e7;
    $secondary-color: #2c3e50;
    $bg-color: #0e5295;

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    .header {
        background-color: $bg-color;
        padding: 0 calc(50% - 600px);
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $primary-color;
        text-transform: uppercase;
    }

    .logo {
        letter-spacing: 4px;
    }

    .header-container {
        position: relative;
        display: flex;
    }

    .fa-shopping-cart {
        font-size: 30px;
        margin-left: 40px;
        color: #8ff2ff;
        cursor: pointer;
        position: relative;

        &:hover {
            color: #befff1;
        }
    }

    .main {
        padding: 0 calc(50% - 600px);
        background-color: #c1e4ff;
    }
</style>
