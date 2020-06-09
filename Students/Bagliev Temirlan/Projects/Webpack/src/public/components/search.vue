<template>
    <div>
        <form action="#" class="search-form" @input="$parent.$refs.catalog.setShowItems(search)">
            <input type="text" class="search-field" v-model="search">
            <button class="btn-search">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            search: ""
        }  
    }
}
</script>