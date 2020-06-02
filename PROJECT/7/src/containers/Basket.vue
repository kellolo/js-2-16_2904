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
    // async mounted() {
        this.$parent.get(this.url).then(d => {
            this.items = d.contents;
        })
        // try {
        //     let res = await this.$parent.get(this.url); 
        //     this.items = res.contents;
        // }
        // catch(err) {
        //     console.log(err);
        // }
        // finally {
        //     console.log('cat loaded')
        // }
    },
    methods: {
        add(item) {
            let find = this.items.find(el => el.id_product == item.id_product);

            if (!find) {
                this.$parent.post('url', item)
                    .then(res => {
                        if (res) {
                            this.items.push(Object.assign({}, item, { quantity: 1 }));
                        }
                    });
            } else {
                this.$parent.put({})
                    .then(res => {
                        if (res) {
                            find.quantity++
                        }
                    });
            }
        },
        remove(item) {
            let find = this.items.find(el => el.id_product == item.id_product);

            if (find.quantity == 1) {
                this.$parent.delete(item)
                    .then(res => {
                        if (res) {
                            this.items.splice(this.items.indexOf(find), 1);
                        }
                    });
            } else {
                this.$parent.put({})
                    .then(res => {
                        if (res) {
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