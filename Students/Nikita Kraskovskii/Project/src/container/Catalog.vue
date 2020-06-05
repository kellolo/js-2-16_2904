<template>
    <div class="products">
        <item v-for="item of items" :key="item.id_product" :item="item" />
    </div>
</template>

<script>
import Item from '../components/Item.vue'; 


export default {
    components: { Item },
    data() {
        return {
            items: [],
            filtered: [],
            url: '/api/catalog',
        }
    },
    // filter(){
    //     let userSearch = '';
    //     let regExp = new RegExp(this.userSearch, i);
    //     this.filtered = this.items.filter(elem => regExp.test(elem.product_name))
    // },
    mounted() {
        this.$parent.get(this.url).then(data => {
            this.items = data;
            this.filtered = data;
        })
    }
}
</script>

<style>

</style>