<template>
    <div>
        <error v-if="isErrorOnPage"
               :errorText="errorText"
               @close-popup="isErrorOnPage = !isErrorOnPage"/>
        <header>
            <div class="logo">E-shop</div>
            <div class="cart">
                <search @search-elem-in-catalog="updateSearchLine" />
                <button class="btn-cart" @click="isCartVisible = !isCartVisible">Cart</button>
                <cart v-show="isCartVisible"
                      :cartData="cartData"
                      :addItem="addItem"
                      :addAnswer="addAnswer"
                      :deleteAnswer="deleteAnswer"
                      @delete-item="deleteFromCart"
                      @get-cart-data="getCartData" />
            </div>
        </header>
        <main>
            <catalog :searchLine="searchLine"
                     :catalogData="catalogData"
                     @add-item="addToCart"
                     @get-catalog-data="getCatalogData" />
        </main>
    </div>
</template>

<script>
    import catalog from '../containers/Catalog.vue';
    import cart from '../containers/Cart.vue';
    import search from '../components/Search.vue';
    import error from '../components/Error.vue'
    export default {
        components: {catalog, cart, search, error},
        data() {
            return {
                searchLine: '',
                catalogData: null,
                cartData: null,
                addItem: null,
                addAnswer: null,
                deleteAnswer: null,
                API: 'https://raw.githubusercontent.com/egorkhu/online-store-api/master/responses/',
                isCartVisible: true,
                isErrorOnPage: false,
                errorText: null
            }
        },
        methods: {
            getData(url) {
                return fetch(this.API + url)
                    .then(respond => respond.json())
                    .catch(err => {
                        this.errorText = err.message;
                        this.isErrorOnPage = true;
                    })
            },
            getCatalogData(url) {
                this.catalogData = this.getData(url);
            },
            getCartData(url) {
                this.cartData = this.getData(url);
            },
            updateSearchLine(str) {
                this.searchLine = str;
            },
            addToCart(url, item) {
                this.addAnswer = this.getData(url);
                this.addItem = item;
            },
            deleteFromCart(url) {
                this.deleteAnswer = this.getData(url);
            }
        },
    }
</script>

<style>

</style>