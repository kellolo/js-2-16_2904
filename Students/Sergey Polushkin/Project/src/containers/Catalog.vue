<template>
    <div class="products">
        <item v-for="item of items" :key="item.id_product" :item="item" :type="'catalog'"></item>        
    </div>
</template>

<script>
import item from '../componets/Item.vue'

export default {
    components: {item},
    data() {
        return {
            items: [],
            filtered: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
        }
    },
    methods: {
        
        
    },
    mounted() {
        this.$parent.get(this.url + '/catalogData.json').then(data => {
            this.items = data;
            this.filtered = data;
        });        
        
    },
    
}
</script>

<style>

</style>