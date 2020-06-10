<template>
    <div class="basket">
        <div class="empty" v-if="items.length > 0">
            <h4 class="empty-title">Total items: {{ totalCountItems }}</h4>
            <hr>
            <div class="cart-items">
                <Item v-for="item in items" :key="item.id" :item="item" :type="'basket'"
                      v-on:deleteitem="deleteFromBasket"/>
            </div>
            <hr>
            <h4 class="empty-title">Total sum: ${{ totalSumItems }}</h4>
        </div>
        <div class="empty" v-else>
            <h4 class="empty-title">Empty Basket</h4>
        </div>
    </div>
</template>

<script>
    import Item from '../components/Item';

    export default {
        components: {Item},
        data() {
            return {
                items: [],
                url: '/api/basket'
            }
        },
        mounted() {
            this.getItems();
        },
        computed: {
            totalCountItems() {
                if (this.items.length) {
                    let count = 0;
                    this.items.forEach((i) => count += +i.counter);
                    return count;
                } else {
                    return 0;
                }
            },
            totalSumItems() {
                if (this.items.length) {
                    let count = 0;
                    this.items.forEach((i) => count += i.counter * i.price);
                    return count;
                } else {
                    return 0;
                }
            }
        },
        methods: {
            getItems() {
                this.$parent.get(this.url)
                    .then(d => this.items = JSON.parse(d))
                    .catch(e => this.$parent.showModal(e));
            },
            deleteFromBasket(item) {
                this.$parent.delete(this.url, item)
                    .then(() => {
                        this.getItems();
                    })
                .catch(e => this.$parent.showModal(e));
            }
        }
    }
</script>

<style scoped>

    .basket {
        max-height: 420px;
        background-color: #61789a;
        position: absolute;
        top: 40px;
        right: 0;
        padding: 20px;
        border-radius: 5px;
        z-index: 1;
        text-align: right;
    }

    .cart-items {
        max-height: 350px;
        overflow: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    ::-webkit-scrollbar {
        width: 4px;
    }

    ::-webkit-scrollbar-track {
        background-color: #afdbff;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #00d3db;
        box-shadow: 0 0 3px #00ffe4;
    }

    ::-webkit-scrollbar-corner {
        background-color: rgba(255, 255, 255, 0);
    }
</style>