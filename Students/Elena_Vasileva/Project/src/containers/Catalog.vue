<template>
    <div class="products">
        <!--catalog-item v-for="item of items" :key="item.id_product" /-->
        <item v-for="item of filtered" :key="item.id_product" :item="item"/>
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
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        }
    },

    methods: {
        searchGoods(search) {
            if (search != ''){
                let tmp_items = [];
                this.items.forEach(el=>{
                    if (el.product_name == search)
                        tmp_items.push(el);
                });
                this.filtered =  tmp_items;
            }
            else
            {
                this.filtered = this.items;
            }
            console.log(search);
        }
    },


    mounted() {
    // async mounted() {
        this.$parent.get(this.url).then(d => {
            this.items = d;
            this.filtered = JSON.parse(JSON.stringify(this.items));
        })
        // try {
        //     this.items = await this.$parent.get(this.url); //get => {}/[]
        //     this.filtered = JSON.parse(JSON.stringify(this.items)); // get() => {}/[]
        // }
        // catch(err) {
        //     console.log(err);
        // }
        // finally {
        //     console.log('cat loaded')
        // }
    }
}
</script>

<style>

</style>