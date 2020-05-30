<template>
    <div class="products">
        <Item v-for="item of items" :key="item.id_product" :type="'catalog'" :item="item"/>
    </div>
</template>


<script>
    import Item from '../components/Item.vue';
    export default {
        components: { Item },
        data() {
            return {
                items: [],
                filtered: [],
                url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
            }
        },
        async mounted() {
            try {
                this.items = await this.$parent.get(this.url);
                //this.filtered = await this.$parent.get(this.url);
                this.filtered = JSON.parse(JSON.stringify(this.items));
            }
            catch(err) {
                console.log(err);
            }
            finally {
                console.log('catalog loaded');
            }
        }
    }
</script>


<style>

</style>