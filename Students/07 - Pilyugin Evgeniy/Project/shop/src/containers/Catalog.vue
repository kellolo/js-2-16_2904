<template>
    <div class="catalog">
        <Item v-for="item in filtered" :key="item.id" :item="item" v-on:additem="addItemInBasket"/>
        <Item type="newItem" v-if="!filterString" v-on:addnewitem="addNewItem"/>
    </div>
</template>

<script>
    import Item from '../components/Item';

    export default {
        components: {Item},
        data() {
            return {
                items: [],
                filterString: '',
                url: '/api/catalog'
            }
        },
        mounted() {
            this.getItems();
        },
        computed: {
            filtered() {
                return this.filterString ? this.items.filter(el => el.name.search(this.regExpString) !== -1) : this.items;
            },
            regExpString() {
                return new RegExp(this.filterString, 'gi');
            },
        },
        methods: {
            getItems() {
                this.$parent.get(this.url)
                    .then(d => this.items = JSON.parse(d))
                    .catch(e => this.$parent.showModal(e));
            },
            changeFilterString(text) {
                this.filterString = text;
            },
            addNewItem(item) {
                this.$parent.post(this.url, item)
                    .then(() => {
                        this.getItems();
                    })
                    .catch(e => this.$parent.showModal(e));
            },
            addItemInBasket(item) {
                this.$parent.post('/api/basket', item)
                    .then(() => {
                        this.$parent.$refs.basket.getItems();
                    })
                    .catch(e => this.$parent.showModal(e));
            }
        }
    }
</script>

<style scoped>
    .catalog {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>