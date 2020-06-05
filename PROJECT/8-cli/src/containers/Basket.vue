<template>
    <div class="cart-block ">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity"></div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product" :type="'basket'" :item="item"/>
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
            <div id="price"></div>
        </div>
    </div>
</template>

<script>
import item from '../components/Item.vue'

export default {
    components: { item },
    data() {
        return {
            items: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
        }
    },
    mounted() {
        this.$parent.get('/api/basket/').then(d => {
            this.items = d.contents;
        })
    },
    methods: {
        add(item) {
            let find = this.items.find(el => el.id_product == item.id_product);

            if (!find) {
                let newItem = Object.assign({}, item, { quantity: 1 });
                this.$parent.post('/api/basket/', newItem)
                    .then(res => {
                        if (res.status) {
                            this.items.push(newItem);
                        }
                    });
            } else {
                this.$parent.put(`/api/basket/${item.id_product}`, { amount: 1 })
                    .then(res => {
                        if (res.status) {
                            find.quantity++
                        }
                    });
            }
        },
        remove(item) {
            let find = this.items.find(el => el.id_product == item.id_product);

            if (find.quantity == 1) {
                this.$parent.delete(`/api/basket/${item.id_product}`)
                    .then(res => {
                        if (res.status) {
                            this.items.splice(this.items.indexOf(find), 1);
                        }
                    });
            } else {
                this.$parent.put(`/api/basket/${item.id_product}`, { amount: -1 })
                    .then(res => {
                        if (res.status) {
                            find.quantity--
                        }
                    });
            }
        }
    }
}
</script>

<style>

</style>