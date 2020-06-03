<template>
    <div class="products">
        <!--catalog-item v-for="item of items" :key="item.id_product" /-->
        <item v-for="item of items" :key="item.id_product" :item="item"/>
    </div>
</template>

<script>
//    import catalogItem from "../components/Item.vue"
    import item from "../components/Item.vue"
    export default {
        comments: { item },
        data() {
            return {
                items: [],
                filtered: [],
                url: "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json",
            }
        },
        mounted() {
            this.$parent.get(this.url).then(d => {
                this.items = d;
                this.filtered = d;
            })
//            try {
//                this.items = await this.$parent.get(this.url);
//                this.filtered = await this.$parent.get(this.url);
//                this.filtered = JSON.parse(JSON.stringify(this.items));
//            }
//            catch(err) {
//
//            }
//            finally {
//                console.log("cat loaded")
//            }
        }
    }
</script>

<style>

</style>