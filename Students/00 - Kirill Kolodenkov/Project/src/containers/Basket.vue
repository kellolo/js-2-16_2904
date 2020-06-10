<template>
  <div class="cart-block">
    <div class="d-flex">
      <strong class="d-block">Всего товаров: {{ checkQuantity }}</strong>
      <div id="quantity">{{ }}</div>
    </div>
    <hr />
    <div class="cart-items">
      <item v-for="item of items" :key="item.id_product" :type="'basket'" :item="item" />
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
      url: "/api/basket"
    };
  },
  mounted() {
    this.$parent.get(this.url).then(data => {
      this.items = data.contents;
    });
  },
  methods: {
    add(item) {
      let find = this.items.find(el => el.id_product == item.id_product);

      if (!find) {
        let newItem = Object.assign({}, item, { quantity: 1 });
        this.$parent.post("/api/basket/", newItem).then(res => {
          if (res.status) {
            this.items.push(newItem);
          }
        });
      } else {
        this.$parent
          .put(`/api/basket/${item.id_product}`, { amount: 1 })
          .then(res => {
            if (res.status) {
              find.quantity++;
            }
          });
      }
    },
    remove(item) {
      let find = this.items.find(el => el.id_product == item.id_product);

      if (find.quantity == 1) {
        this.$parent.delete(`/api/basket/${item.id_product}`).then(res => {
          if (res.status) {
            this.items.splice(this.items.indexOf(find), 1);
          }
        });
      } else {
        this.$parent
          .put(`/api/basket/${item.id_product}`, { amount: -1 })
          .then(res => {
            if (res.status) {
              find.quantity--;
            }
          });
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