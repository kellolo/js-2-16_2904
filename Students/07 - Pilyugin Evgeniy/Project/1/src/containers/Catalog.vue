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
            url: 'https://raw.githubusercontent.com/evgeny89/rest/master/data.json'
        }
    },
    mounted() {
        this.$parent.get(this.url).then(d => {
            this.items = d.data;
            this.filtered = d.data;
        });
    },
    methods: {
        searching: function (text) {
            if (text !== '') {
                let regText = new RegExp(`^(${text.toLowerCase()})[a-z]*$`);
                this.filtered = this.items.filter(elem => {
                    return !elem.name.toLowerCase().search(regText);
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