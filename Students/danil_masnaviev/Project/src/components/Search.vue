<template>
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="search">
        <button class="btn-search" @click="$parent.$refs.catalog.searchItems(search)">
            <i class="fas fa-search"></i>
        </button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                search: ''
            }
        },
    }
</script>

<style scoped>
</style>