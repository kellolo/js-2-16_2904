<template>
  <div class="products">
    <item v-for="item of items" :key="item.id_product" :item="item" />
  </div>
</template>

<script>
import item from "../components/Item.vue";
export default {
  components: { item },
  data() {
    return {
      items: [],
      filtered: [],
      url:
        "https://raw.githubusercontent.com/teitumx/static/master/GeekBrains/Shop/catalogData.json"
    };
  },
  mounted() {
    this.$parent.get(this.url).then(data => {
      this.items = data;
    });
  }
};
</script>

<style>
</style>