<template>
    <div class="products">
        <!--catalog-item v-for="item of items" :key="item.id_product" /-->
        <item v-for="item of items" :key="item.id_product" :item="item"/>
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
            // url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        }
    },
    mounted() {
    // async mounted() {
        this.$parent.get(this.url).then(d => {
            this.items = d;
            this.filtered = d;
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