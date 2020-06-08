<template>
    <div class="products">
        <item v-for="item of items" :key="item.id_product" :item="item"/>
    </div>
</template>

<script>
    import item from '../components/Item.vue'

    export default {
        components: {item},
        data() {
            return {
                items: [],
                filtered: [],
                url: '/api/catalog'
//                url: "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json",
            }
        },
        mounted() {
            this.$parent.get(this.url).then(d => {
                this.items = d;
                this.filtered = d;
            })
        },

        methods: {
            addNewCatalogItem(item) {
                let newItem = JSON.parse(JSON.stringify(item));
                this.$parent.post('/api/catalog/', newItem)
                    .then(res => {
                        if (res.id) {
                            this.items.push(Object.assign({}, newItem, {id_product: res.id}));
                        }
                    });
            }
        }
    }
</script>

<style>
</style>