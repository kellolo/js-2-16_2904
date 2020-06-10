API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
    el: '#app',
    data: {
      items: [],
      itemsCart: [],
      API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/',
      JSONS: ['catalogData.json', 'getBasket.json'],
      isVisibleCart: false,
      quantity: 0,
      sum: 0,
    },
    mounted() {
        this.JSONS.forEach(json => {
          this.get(json)
            .then(res => {
              if (json === 'catalogData.json') {
                this.items = res;
              } else if (json === 'getBasket.json') {
                this.itemsCart = res;
                console.log(this.itemsCart);
              }
            })
        })
    
      },
      methods: {
        get(url) {
          return fetch(this.API + url).then(d => d.json());
        },
        add(item) {
          this.get(`${API}/addToBasket.json`)
            .then(res => {
              if (res.result) {
                this.addProduct(item.target);
              } else {
                throw new Error('Wrong');
            }
          })
        },
        remove(item) {
          this.get(`${API}/deleteFromBasket.json`)
          .then(res => {
            if (res.result) {
              this.deleteProduct(item.target);
            } else {
              throw new Error('Wrong');
            }
          })
              },
      addProductToCart(e) {
        let id = e.target.dataset['id'];
        let find = this.itemsCart.find(product => product.id_product == id);
          if (find) {
            find.quantity++;
          } else {
            let prod = this.createNewProduct(e.target);
            this.itemsCart.push(prod);
            console.log(this.itemsCart);
          }
        },
        createNewProduct(prod) {
          return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
          }
        },
        deleteProductFromCart(e) {
          let id = e.target.dataset['id'];
          let find = this.itemsCart.find(product => product.id_product == id);
          if (find.quantity > 1) {
            find.quantity--
          } else {
            this.itemsCart.splice(this.items.indexOf(find), 1)
          }
        }
      },
      computed: {
        totalSum: function() {
          total = null;
          this.itemsCart.forEach(element => total += (element.price * element.product_quantity));
          return total;
          },
          
        totalCount: function() {
          total = null;
          this.itemsCart.forEach(element => total += element.product_quantity);
          return total;
        }
      }
});