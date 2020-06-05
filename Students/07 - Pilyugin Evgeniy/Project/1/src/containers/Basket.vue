<template>
    <div class="cart-block ">
        <div class="d-flex">
            <strong class="d-block">Всего товаров {{ getTotalCount }}</strong>
            <div id="quantity"></div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id" :type="'basket'" :item="item"/>
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть: {{ getTotalSum }}</strong>
            <div id="price"></div>
        </div>
    </div>
</template>

<script>
    import item from '../components/Item.vue';

    export default {
        components: {item},
        data() {
            return {
                items: [],
                url: '/api/basket'
            }
        },
        mounted() {
            this.request();
        },
        methods: {
            request() {
                this.$parent.get(this.url).then(d => {
                    this.items = d;
                });
            },
            req(item, reqMethod) {
                this.$parent.getRequest(this.url, item, reqMethod).then(d => {
                    if (d.result === 1) {
                        this.request();
                    } else {
                        throw new Error(d.result);
                    }
                })
                    .catch(e => {
                        this.$emit('errorMsg', e.message);
                    });
            },
            add(item) {
                this.req(item, 'POST');
            },
            del(item) {
                this.req(item, 'DELETE');
            }
        },
        computed: {
            getTotalCount() {
                if (this.items.length) {
                    let count = 0;
                    this.items.forEach((i) => count += i.counter);
                    return count;
                } else {
                    return 0;
                }
            },
            getTotalSum() {
                if (this.items.length) {
                    let count = 0;
                    this.items.forEach((i) => count += i.counter * i.price);
                    return count;
                } else {
                    return 0;
                }
            }
        }
    }
</script>

<style>

</style>