<template>
  <form action="#" class="search-form">
    <input type="text" class="search-field" />
    <button class="btn-search" @click="searchItems(item)">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<script>
import catalog from "../containers/Catalog.vue";
export default {
  components: { catalog },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    searchItems() {
      const regexp = new RegExp(this.search, "i");
      this.filtered.contents = this.items.filter(item => {
        return regexp.test(item.product_name);
      });
    }
  }
};
</script>

<style>
</style>