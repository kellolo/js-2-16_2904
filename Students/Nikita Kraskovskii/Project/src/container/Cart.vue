<template>
    <div class="cart-block ">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity"></div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product" :type="'cart'" :item="item"/>
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
            <div id="price"></div>
        </div>
    </div>
</template>

<script>
import Item from '../components/Item.vue';
export default {
    components: { Item },
    data(){
        return{
            items: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
        }
    },
    //async mounted(){
    mounted(){
        this.$parent.get(this.url).then(data => {
            this.items = data.contents;
        })
        // try {
        //     this.items = await this.$parent.get(this.url).contents;
        // }
        // catch(error){
        //     console.log(error);
        // }
        // finally{
        //     console.log('Catalog loaded');
        // }
    },
    methods: {
        addProduct(item){
            let find = this.items.find(elem => elem.id_product === item.id_product);
            if(find){
                find.quantity++;
                } else {
                let item1 = Object.assign({quantity: 1}, item);
                this.items.push(item1);
            }
        },
        deleteProduct(item) {
            if(item.quantity > 1){
                item.quantity--;           
            } else {
                this.items.splice(this.items.indexOf(item), 1);
            }
        },
    }
}
</script>

<style>

</style>