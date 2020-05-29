<template>
  <div class="cart-block">
    <div class="d-flex">
      <strong class="d-block">Всего товаров</strong>
      <div id="quantity"></div>
    </div>
    <hr />
    <div class="cart-items"></div>
    <item
      v-for="(item, index) in items"
      :key="item.id_product + index"
      :type="'basket'"
      :item="item"
    />
    <hr />
    <div class="d-flex">
      <strong class="d-block">Общая ст-ть:</strong>
      <div id="price">8888888</div>
    </div>
  </div>
</template>

<script>
import item from "../components/Item.vue";
export default {
  components: { item },
  data() {
    return {
      items: [],
      url:
        "https://raw.githubusercontent.com/BenBatton/online-store-api/master/basket.json"
    };
  },
  mounted() {
    this.$parent.get(this.url).then(d => {
      this.items = d.contents;
    });
  },
  methods: {
    add(item) {
      let id = item.id_product;
      let price = item.price;
      let totalPrice;

      let find = this.items.find(function(prod) {
        return prod.id_product === id;
      });

      if (find) {
        find.quantity++;
        find.price = find.price + price;
      } else {
        let prod = this.createNewProduct(item);
        this.items.push(prod);
      }
    },
    createNewProduct(prod) {
      return {
        product_name: prod.product_name,
        price: prod.price,
        id_product: prod.id_product,
        quantity: 1
      };
    },
    deleteFromBasket(item) {
      let id = item.id_product;
      let find = this.items.find(item => item.id_product === id);
      if (find.quantity > 1) {
        find.quantity--;
      } else {
        this.items.splice(this.items.indexOf(find), 1);
      }
    }
  }
};
</script>

<style></style>



