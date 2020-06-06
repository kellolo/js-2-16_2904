<template>
  <div :class="computedWrappingClass">
    <template v-if="type=='catalog'">
      <div class="desc">
        <img :src="item.img" :alt="items.product_name" />
        <h1>{{items.product_name}}</h1>
        <p>{{items.price}}</p>
        <button
          class="buy-btn"
          name="buy-btn"
          @click="$parent.$parent.$refs.basket.add(items)">Купить</button>
      </div>
    </template>
    <template v-if="type=='basket'">
      <div>
        <img src="https://placehold.it/100x80" :alt="items.product_name" />
      </div>

      <div class="product-desc">
        <p class="product-title">{{items.product_name}}</p>
        <p class="product-quantity">{{items.quantity}}</p>
        <p class="product-single-price">{{items.price}}</p>
      </div>
      <div class="right-block">
        <button
          name="del-btn"
          @click="$parent.$parent.$refs.basket.deleteFromBasket(item)"
          class="del-btn">&times;</button>
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
    items: {
      type: Object
    }
  },
  computed: {
    computedWrappingClass() {
      return `${this.type == "catalog" ? "product-item" : "cart-item"}`;
    },
    computedImgSrc() {
      return `https://placehold.it/${this.type == 'catalog' ? '200x150' : '100x80'}`
    }
  }
};
</script>

<style>
</style>