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
                <button class="btn-cart">Cart</button>
                <basket />
            </div>
        </header>
        <main>
            <Catalog />
        </main>
    </div>
</template>

<script>
    import Basket from '../containers/Basket.vue'
    import Catalog from "../containers/Catalog.vue"
    export default {
        components: { Catalog, Basket }
    }
</script>

<style scoped>

</style>