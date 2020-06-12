<template>
  <div class="products">
    <item v-for="item of filtered" :key="item.id" :item="item" />
    <item :type="'newproduct'" @createnew="addNewCatalogItem" />
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
      url: "/api/catalog"
    };
  },
  mounted() {
    this.$parent.get(this.url).then(d => {
      this.items = d;
      this.filtered = d;
    });
  },
  methods: {
    filter(str) {
      let reg = new RegExp(str, "i");
      this.filtered = this.items.filter(el => reg.test(el.product_name));
    },
    addNewCatalogItem(item) {
      let newItem = JSON.parse(JSON.stringify(item));
      this.$parent.post("/api/catalog", newItem).then(res => {
        if (res.id) {
          this.items.push(Object.assign({}, newItem, { id_product: res.id }));
        }
      });
    },

    searching(text) {
      if (text !== "") {
        let regText = new RegExp(`^(${text})[a-z]*$`, "ig");
        this.filtered = this.items.filter(elem => {
          return !elem.product_name.search(regText);
        });
      } else {
        this.filtered = this.items;
      }
    }
  }
};
</script>

<style>
</style>