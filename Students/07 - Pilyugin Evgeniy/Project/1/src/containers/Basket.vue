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
                url: 'https://raw.githubusercontent.com/evgeny89/rest/master/',
                responseFile: {
                    get: 'getBasket.json',
                    add: 'addToBasket.json',
                    del: 'deleteFromBasket.json'
                }
            }
        },
        mounted() {
            this.$parent.get(this.url + this.responseFile.get).then(d => {
                this.items = d.data;
            });
        },
        methods: {
            add(item) {
                this.$parent.get(this.url + this.responseFile.add).then(d => {
                    if (d.result === 1) {
                        let res = this.items.find(elem => elem.id === item.id);
                        if (res !== undefined) {
                            res.counter += 1;
                        } else {
                            this.items.push(item);
                        }
                    } else {
                        throw new Error('Ошибка! Невозможно добавить товар в корзину.');
                    }
                })
                    .catch(e => {
                        this.$emit('errorMsg', e.message);
                    });
            },
            del(item) {
                this.$parent.get(this.url + this.responseFile.del).then(d => {
                    if (d.result === 1) {
                        let index = this.items.indexOf(item);
                        if (this.items[index].counter > 1) {
                            this.items[index].counter -= 1;
                        } else {
                            this.items = this.items.filter(e => e !== item);
                        }
                    } else {
                        throw new Error('Ошибка! Невозможно удалить товар с корзины.');
                    }
                })
                    .catch(e => {
                        this.$emit('errorMsg', e.message);
                    });
            }
        },
        computed: {
            getTotalCount() {
                if(this.items.length) {
                    let count = 0;
                    this.items.forEach((i) => count += i.counter);
                    return count;
                } else {
                    return 0;
                }
            },
            getTotalSum() {
                if(this.items.length) {
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