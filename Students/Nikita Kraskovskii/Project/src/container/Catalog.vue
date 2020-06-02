<template>
    <div class="products">
        <item v-for="item of items" :key="item.id_product" :item="item" />
    </div>
</template>

<script>
import Item from '../components/Item.vue'; 


export default {
    components: { Item },
    data(){
        return{
            items: [],
            filtered: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        }
    },
    // filter(){
    //     let userSearch = '';
    //     let regExp = new RegExp(this.userSearch, i);
    //     this.filtered = this.items.filter(elem => regExp.test(elem.product_name))
    // },
    //async mounted(){
    mounted(){
        this.$parent.get(this.url).then(data => {
            this.items = [...data];
            this.filtered = [...data];
        })
        // try {
        //     this.items = await this.$parent.get(this.url);
        //     this.filtered = JSON.parse(JSON.stringify(this.items));
        // }
        // catch(error){
        //     console.log(error);
        // }
        // finally{
        //     console.log('Catalog loaded');
        // }
    }
}
</script>

<style>

</style>