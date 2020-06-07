API ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        items: [],
    itemsCart: [],
    API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
    JSONS: ['catalogData.json', 'cartData.json'],
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
              } else if (json === 'cartData.json') {
                this.itemsCart = res;
                console.log(this.itemsCart);
              }
            })
        })
    
      },
      methods: {
        get(url) {
          return fetch(this.API + url).then(d => d.json())
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
        checkquantity() {
          this.quantity = 0;
          this.itemsCart.forEach(item => {
            this.quantity += item.quantity;
          });
          return this.quantity;
        },
        checksum() {
          this.sum = 0;
          this.itemsCart.forEach(item => {
            this.sum += item.price * item.quantity;
          });
          return this.sum;
        }
      }
    
    });

