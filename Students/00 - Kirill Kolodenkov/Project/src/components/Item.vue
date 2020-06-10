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
    <template v-else-if="type=='newproduct'">
      <div class="desc">
        <img placeholder=" Ссылка на изображение" :src="newProduct.img" />
        <input placeholder="Имя товара" v-model="newProduct.product_name" type="text" />
        <br />
        <input placeholder="Цена товара" v-model="newProduct.price" type="text" />
        <br />
        <input placeholder="Ссылка на изображение" v-model="newProduct.img" type="text" />
        <br />
        <button class="buy-btn" name="buy-btn" @click="createNew(newProduct)">Добавить в Каталог</button>
      </div>
    </template>
    <template v-else-if="type=='basket'">
      <div>
        <img src="https://placehold.it/100x80" :alt="item.product_name" />
      </div>

      <div class="product-desc">
        <p class="product-title">{{item.product_name}}</p>
        <p class="product-quantity">{{item.quantity}}</p>
        <p class="product-single-price">{{item.price}}</p>
      </div>
      <div class="right-block">
        <button name="del-btn" @click="$parent.remove(item)" class="del-btn">&times;</button>
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
      type: Object,
      default: () => ({
        product_name: "Default",
        img: "http://placehold.it/200x150.jpg"
      })
    }
  },
  data() {
    return {
      newProduct: {
        product_name: "",
        price: 0,
        img: "http://placehold.it/200x150.jpg"
      }
    };
  },
  methods: {
    createNew(item) {
      if (item.product_name && item.price) {
        this.$emit("createnew", item);
        this.newProduct.product_name = "";
        this.newProduct.price = 0;
        this.newProduct.img = "http://placehold.it/200x150.jpg";
      }
    }
  },
  computed: {
    computedWrappingClass() {
      return this.type.match(/catalog|newproduct/)
        ? "product-item"
        : "cart-item";
    }
  }
};
</script>

<style>
</style>