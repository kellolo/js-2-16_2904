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
        "https://raw.githubusercontent.com/BenBatton/online-store-api/master/catalog.json",
    };
  },
  //   async mounted() {
  //     try {
  //       this.items = await this.$parent.get(this.url);
  //       this.filtered = JSON.parse(JSON.stringify(this.items));
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       console.log("loaded");
  //     }
  //   }
  mounted() {
    this.$parent.get(this.url).then((d) => {
      this.items = d;
      this.filtered = d;
    });
  },
};
</script>

<style></style>
