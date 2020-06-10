<template>
    <div class="goods-list products">
        <goods v-for="goods in filteredGoods" :key="goods.id_product" :type="'catalog'" :goods="goods" />
        <goods :type="'temp'" @createnew="addNewCatalogItem" />
    </div>
</template>

<script>
    import goods from '../components/Goods.vue'
    export default {
        components: {
            goods
        },
        data() {
            return {
                unfilteredGoods: [],
                filteredGoods: [],
                url: '/api/catalog'
            }
        },
        mounted() {
            this.$parent.get(this.url).then(dataJson => {
                this.unfilteredGoods = dataJson;
                this.filteredGoods = dataJson;
            })
        },
        methods: {
            addNewCatalogItem(goods) {
                let newProduct = JSON.parse(JSON.stringify(goods));
                this.$parent.post('/api/catalog/', newProduct)
                    .then(res => {
                        if (res.id) {
                            this.filteredGoods.push(Object.assign({}, newProduct, {
                                id_product: res.id
                            }));
                        }
                    });
            }
        }
    }
</script>

<style>

</style>