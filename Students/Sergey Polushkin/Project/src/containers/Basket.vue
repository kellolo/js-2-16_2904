<template>
    <div class="cart-block">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity">{{ total }}</div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product" :type="'basket'" :item="item"></item>            
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
            <div id="price">{{ sum }}</div>
        </div>
    </div>  
</template>

<script>
import item from '../componets/Item.vue'

export default {
    components: {item},
    data() {
        return {
            items: [],
            total: 0,
            sum: 0,
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
        }
    },
    mounted() {
        this.$parent.get(this.url + '/getBasket.json').then(data => {
            this.items = data.contents;
            this.checkTotalAndSum();       
        }); 
    },
    methods: {
        addProduct(item) {

            this.$parent.get(this.url + '/addToBasket.json')
                .then(data => {
                    if (data.result === 1) {

                        let id = item.id_product;
                        let find = this.items.find(product => product.id_product == id);

                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = this.createNewProduct(item);
                            this.items.push(prod);
                        }

                        this.checkTotalAndSum();
                    } else {
                        throw new Error('No permission to add product to Basket')
                    }
                });
        },        
        removeProduct(item) {

            this.$parent.get(this.url + '/deleteFromBasket.json')
                .then(data => {
                    if (data.result === 1) {
                        let id = item.id_product;
                        let find = this.items.find(product => product.id_product == id);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.items.splice(this.items.indexOf(find), 1);
                        }
                        this.checkTotalAndSum();                        
                    } else {
                        throw new Error('No permission to remove product from Basket')
                    }
                });
        },
        createNewProduct(prod) {
            return {
                product_name: prod.product_name,
                price: prod.price,
                id_product: prod.id_product,
                quantity: 1
            }
        },
        checkTotalAndSum() {
            let qua = 0;
            let pr = 0;
            this.items.forEach(item => {
                qua += item.quantity;
                pr += item.price * item.quantity;
            })
            this.total = qua;
            this.sum = pr;            
        },

    },
    computed: {
        
    }
}
</script>

<style>

</style>