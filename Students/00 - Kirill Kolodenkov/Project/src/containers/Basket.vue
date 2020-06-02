<template>
  <div class="cart-block">
    <div class="d-flex">
      <strong class="d-block">Всего товаров: {{ checkQuantity }}</strong>
      <div id="quantity">{{ }}</div>
    </div>
    <hr />
    <div class="cart-items">
      <item
        v-for="(item, index) in items"
        :key="item.id_product + index"
        :type="'basket'"
        :item="item"
      />
    </div>
    <hr />
    <div class="d-flex">
      <strong class="d-block">Общая стоимость: {{ checkSum }}</strong>
      <div id="price"></div>
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
        "https://raw.githubusercontent.com/teitumx/static/master/GeekBrains/Shop/getBasket.json"
    };
  },
  mounted() {
    this.$parent.get(this.url).then(data => {
      this.items = data.contents;
    });
  },
  methods: {
    add(item) {
      let id = item.id_product;
      let find = this.items.find(function(prod) {
        return prod.id_product == id;
      });
      console.log(find);

      if (find) {
        find.quantity++;
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
  },
  computed: {
    checkQuantity() {
      let q = 0;
      this.items.forEach(item => {
        q += item.quantity;
      });
      return q;
    },

    checkSum() {
      this.totalSum = 0;
      this.items.forEach(item => {
        this.totalSum += item.price * item.quantity;
      });
      return this.totalSum;
    }
  }
};
</script>

<style>
</style>