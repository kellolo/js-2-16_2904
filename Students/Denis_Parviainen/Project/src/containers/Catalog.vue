<template>
    <div class="products"></div>
</template>

<script>
    import item from '../components/Item.vue'
    export default {
        components: { item },
        data() {
            return {
                items: [],
                url: '',
            }
        }
    }
</script>

<style scoped>

</style>