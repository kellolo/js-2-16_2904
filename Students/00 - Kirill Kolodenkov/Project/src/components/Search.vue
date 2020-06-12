<template>
  <form action="#" class="search-form" @submit.prevent="$emit('search', searchText)">
    <input type="text" class="search-field" v-model="searchText" />
    <button class="btn-search">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchText: ""
    };
  }
};
</script>

<style>
</style>