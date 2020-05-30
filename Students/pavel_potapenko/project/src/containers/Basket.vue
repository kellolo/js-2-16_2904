<template>
    <div class="cart-block">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity"></div>
        </div>
        <hr>
        <div class="cart-items">
            <Item v-for="item of items" :key="item.id_product" :type="'basket'" :item="item"/>
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
            <div id="price"></div>
        </div>
    </div>
</template>


<script>
    import Item from '../components/Item.vue';
    export default {
        components: { Item },
        data() {
            return {
                items: [],
                url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'
            }
        },
        async mounted() {
            try {
                //this.items = await this.$parent.get(this.url);
                let res = await this.$parent.get(this.url);
                this.items = res.contents;
            }
            catch(err) {
                console.log(err);
            }
            finally {
                console.log('basket loaded');
            }
        },
        methods: {
            add(item) {
                console.log('added' + item.product_name)
            }
        }
    }
</script>


<style>

</style>