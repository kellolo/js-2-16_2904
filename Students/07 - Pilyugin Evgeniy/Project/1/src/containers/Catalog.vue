<template>
    <div class="products">
        <item v-for="item of filtered" :key="item.id" :item="item"/>
    </div>
</template>

<script>
import item from '../components/Item.vue';

export default {
    components: { item },
    data() {
        return {
            items: [],
            filtered: [],
            url: '/api/catalog'
        }
    },
    mounted() {
        this.$parent.get(this.url).then(d => {
            this.items = d;
            this.filtered = d;
        });
    },
    methods: {
        searching: function (text) {
            if (text !== '') {
                let regText = new RegExp(`^(${text})[a-z]*$`, `i`);
                this.filtered = this.items.filter(elem => {
                    return !elem.name.search(regText);
                });
            } else {
                this.filtered = this.items;
            }
        }
    }
}
</script>

<style>

</style>