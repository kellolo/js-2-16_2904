<template>
  <div :class="computedWrappingClass">
    <template v-if="type=='catalog'">
      <div class="desc">
        <img :src="item.img" :alt="item.product_name" />
        <h1>{{item.product_name}}</h1>
        <p>{{item.price}}</p>
        <button
          class="buy-btn"
          name="buy-btn"
          @click="$parent.$parent.$refs.basket.add(item)"
        >Купить</button>
      </div>
    </template>
    <template v-if="type=='basket'">
      <div>
        <img src="https://placehold.it/100x80" :alt="item.product_name" />
      </div>

      <div class="product-desc">
        <p class="product-title">{{item.product_name}}</p>
        <p class="product-quantity">{{item.quantity}}</p>
        <p class="product-single-price">{{item.price}}</p>
      </div>
      <div class="right-block">
        <button
          name="del-btn"
          @click="$parent.$parent.$refs.basket.deleteFromBasket(item)"
          class="del-btn"
        >&times;</button>
      </div>
    </template>
  </div>
</template>


<script>
export default {
  props: {
    type: {
      type: String,
      default: "catalog"
    },
    item: {
      type: Object
    }
  },
  computed: {
    computedWrappingClass() {
      return `${this.type == "catalog" ? "poduct-item" : "cart-item"}`;
    }
  }
};
</script>

<style>
</style>