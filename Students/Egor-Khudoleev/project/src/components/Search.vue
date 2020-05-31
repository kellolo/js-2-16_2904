<template>
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="searchLine" @keydown.enter.prevent="makeSearch(searchLine)">
        <button type="button" class="btn-search" @click.prevent="makeSearch(searchLine)">
            <i class="fas fa-search"></i>
        </button>
    </form>
</template>

<script>
    export default {
        data() {
          return {
              searchLine: ''
            }
        },
        methods: {
            makeSearch(str) {
                this.$emit('search-elem-in-catalog', str);
            }
        }
    }
</script>

<style scoped>

</style>