<template>
    <div>
        <form>
        <input type="text" class="search" v-model="searchText" @blur="filterItems" placeholder=" " id="search">
        <label class="placeholder" for="search">search product</label>
        <button class="btn" @click.prevent="filterItems"><i class="fas fa-search"></i></button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return {
                searchText: ''
            }
        },
        methods: {
            filterItems() {
                this.$emit('filtering', this.searchText);
            }
        }
    }
</script>

<style lang="scss" scoped>
    $primary-color: #e7e7e7;
    $color-style: #60fcf7;

    .search {
        position: relative;
        z-index: 2;
        width: 200px;
        height: 30px;
        padding: 6px 30px 6px 10px;
        border: none;
        outline: none;
        background-color: inherit;
        font-size: 16px;
        color: $primary-color;
        border-bottom: 2px solid $color-style;

        &:focus + .placeholder,
        &:not(:placeholder-shown) + .placeholder {
            transform: translate(-30px, -20px) scale(.6);
        }
    }

    .placeholder {
        position: absolute;
        left: 6px;
        top: 8px;
        text-transform: capitalize;
        opacity: .6;
        transition: transform .3s;
        z-index: 1;
    }

    .fa-search {
        position: absolute;
        left: 180px;
        top: 6px;
        z-index: 3;
        color: $color-style;
        cursor: pointer;
    }

    .btn {
        border: none;
    }
</style>