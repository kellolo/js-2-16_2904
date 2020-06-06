<template>
  <div class="cart-block" v-show="$parent.show">
        <div class="d-flex">
            <strong class="d-block">Всего товаров {{ totalCount }}</strong>
        </div>
        <hr>
        <div class="cart-items">
            <goods v-for="items in itemsCart" :key="items.id_product" :type="'basket'" :items="items" />
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть: {{ totalSum }}</strong>
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
      url:'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
    };
  },
  mounted() {
    this.$parent.get(this.url).then(data => {
      this.items = data.contents;
    });
  },
   computed: {
    totalSum() {
      let total = 0;
      this.itemsCart.forEach(element => total += (element.price * element.product_quantity));
      return total;
      },
   totalCount() {
      let total = 0;
      this.itemsCart.forEach(element => total += element.product_quantity);
      return total;
      }
  },
  methods: {
    add(item) {
      let find = this.items.find(el => el.id_product == item.id_product);
      if (!find) {
        his.$parent.post('url', item).then(res => {
          if (res) {
            this.items.push(Object.assign({}, item, {quantity: 1}));
                }
              });
          } else {
            this.$parent.put({}).then(res => {
              if (res) {
                  find.quantity++
                  }
                });
              }
            }
        },
    deleteFromBasket(items) {
      let id = item.id_product;
      let find = this.items.find(item => item.id_product === id);
      if (find.quantity > 1) {
        find.quantity--;
      } else {
        this.items.splice(this.items.indexOf(find), 1);
      }
    },
};
</script>

<style>
</style>