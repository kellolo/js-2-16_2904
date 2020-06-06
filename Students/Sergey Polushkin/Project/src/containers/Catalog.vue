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
            url: '/api/catalog'
        }
    },
    methods: {
        
        
    },
    mounted() {
        this.$parent.get(this.url).then(data => {
            this.items = data;
            this.filtered = data;
        });        
        
    },
    
}
</script>

<style>

</style>