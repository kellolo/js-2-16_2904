<template>
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="search">
        <button class="btn-search" @click="searchGoods">
            <i class="fas fa-search"></i>
        </button>
    </form>
</template>

<script>
    export default {
        //name: "Search"
        data() {
            return {
                search: ''
            }
        },

        methods: {
            searchGoods() {
                console.log(this.search);
            }
        }
    }


</script>

<style scoped>

</style>