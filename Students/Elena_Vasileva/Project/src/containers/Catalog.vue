<template>
    <div class="products">
        <!--catalog-item v-for="item of items" :key="item.id_product" /-->
        <item v-for="item of filtered" :key="item.id_product" :item="item"/>
        <item :type="'temp'" @createnew="addNewCatalogItem"/>
    </div>
</template>

<script>
import item from '../components/Item.vue'
// import catalogItem from '../components/Item.vue'

export default {
    components: { item },
    // components: { catalogItem },
    data() {
        return {
            items: [],
            filtered: [],
            url: '/api/catalog'
            //url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        }
    },

    mounted() {
    // async mounted() {
        this.$parent.get(this.url).then(d => {
            this.items = d;
            this.filtered = JSON.parse(JSON.stringify(this.items));
        })
    },
    methods: {
        // searchGoods(search) {
        //     if (search != ''){
        //         let tmp_items = this.items.map(el => el.product_name == search);
        //         this.filtered =  tmp_items;
        //     }
        //     else
        //     {
        //         this.filtered = this.items;
        //     }
        //     console.log(search);
        // },
        addNewCatalogItem(item) {
            let newItem = JSON.parse(JSON.stringify(item));
            this.$parent.post('/api/catalog/', newItem)
                .then(res => {
                    if (res.id) {
                        this.items.push(Object.assign({}, newItem, { id_product: res.id }));
                    }
                });

        }
    },

}
</script>

<style>

</style>