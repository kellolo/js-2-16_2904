<template>
  <div class="products">
    <item v-for="item of items" :key="item.id_product" :items="items" />
  </div>
</template>

<script>
import items from "../components/Item.vue";
export default {
  components: { items },
  data() {
    return {
      items: [],
      filtered: [],
      url:'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
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