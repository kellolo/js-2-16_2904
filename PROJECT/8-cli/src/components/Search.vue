<template>
    <form action="#" class="search-form" @submit.prevent="$emit('search', searchStr)">
        <input type="text" class="search-field" v-model="searchStr">
        <button class="btn-search">
            <i class="fas fa-search"></i>
        </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            searchStr: ''
        }
    },
}
</script>

<style>

</style>