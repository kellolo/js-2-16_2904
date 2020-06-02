<template>
    <div class="products">
        <empty v-if="this.items.length === 0"
               :type="'catalog'">Список товаров пуст</empty>
        <item v-for="item of computedFilteredItems"
              :key="item.id_product"
              :type="'catalog'"
              :item="item"
              @add-item="addItem" />
    </div>
</template>

<script>
    import item from '../components/Item.vue';
    import empty from '../components/Empty.vue';
    export default {
        components: {item, empty},
        props: {
            catalogData: {
                type: Promise
            },
            searchLine: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                items: [],
                filtered: [],
                url: 'catalogData.json'
            }
        },
        mounted() {
            this.$emit('get-catalog-data', this.url);
        },
        methods: {
            addItem(item) {
                this.$emit('add-item', 'addToBasket.json', item);
            }
        },
        computed: {
            computedFilteredItems() {
                const regexp = new RegExp(this.searchLine, 'i');
                return this.items.filter(item => {
                    return regexp.test(item.product_name);
                })
            },
        },
        watch: {
            catalogData() {
                this.catalogData.then(result => {
                    if (result !== undefined) {
                        this.items = result;
                    }
                })
            }
        }
    };
</script>

<style>

</style>