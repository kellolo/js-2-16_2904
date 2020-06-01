<template>
    <p :class="chooseClass"><slot></slot></p>
</template>

<script>
    export default {
        props: {
            type: {
                type: String
            }
        },
        computed: {
            chooseClass() {
                return {
                    'empty-catalog': this.type === 'catalog',
                    'empty-cart': this.type === 'cart'
                }
            }
        }
    }
</script>

<style>

</style>