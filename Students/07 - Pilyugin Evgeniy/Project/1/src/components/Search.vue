<template>
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model.trim="searchText" @blur="emptyCheck">
        <button class="btn-search" @click.prevent="sendValue">
            <i class="fas fa-search"></i>
        </button>
    </form>

</template>

<script>
    export default {
        data() {
            return {
                searchText: ''
            }
        },
        methods: {
            sendValue() {
                this.$emit('search', this.searchText);
            },
            emptyCheck() {
                !this.searchText ? this.sendValue() : false;
            }
        }
    }
</script>

<style scoped>

</style>