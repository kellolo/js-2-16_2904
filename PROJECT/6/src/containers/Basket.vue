<template>
    <div class="cart-block ">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity"></div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product" :type="'basket'" :item="item"/>
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
            <div id="price"></div>
        </div>
    </div>
</template>

<script>
import item from '../components/Item.vue'

export default {
    components: { item },
    data() {
        return {
            items: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
        }
    },
    mounted() {
    // async mounted() {
        this.$parent.get(this.url).then(d => {
            this.items = d.contents;
        })
        // try {
        //     let res = await this.$parent.get(this.url); 
        //     this.items = res.contents;
        // }
        // catch(err) {
        //     console.log(err);
        // }
        // finally {
        //     console.log('cat loaded')
        // }
    },
    methods: {
        add(item) {
            console.log('added ' + item.product_name)
        }
    }
}
</script>

<style>

</style>