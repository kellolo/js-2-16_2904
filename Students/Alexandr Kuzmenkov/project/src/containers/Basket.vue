<template>
    <div class="cart-block" v-show="show">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity"></div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product" :type="'basket'" :item="item" />
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
            <div id="price"></div>
        </div>
    </div>
</template>

<script>
    import item from "../components/Item.vue"
    export default {
        comments: { item },
        data() {
            return {
                items: [],
                url: "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json",
            }
        },
        mounted() {
            this.$parent.get(this.url).then(d => {
                this.items = d.contents;
            })
        },
        methods: {
            add(item) {
                console.log('add' + item.product_name)
            }
        }
    }
</script>

<style>

</style>
