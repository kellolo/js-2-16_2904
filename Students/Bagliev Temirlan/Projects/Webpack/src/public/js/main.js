//import Cart from './Cart.js'
//import Catalog from './Catalog.js'
 window.addEventListener('load', function () {
   //let cart = new Cart ();
   //let catalog = new Catalog(cart);
})

let Catalog = new Vue({
  el: '#catalog',
  data: {
    url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
    items: [],
    img:'https://placehold.it/300x200'
  },
  methods: {
    async getData() {
      this.items = await fetch(this.url)
        .then(d => d.json()) 
    }
  },
  mounted() {
      this.getData()
  },
})

let Cart = new Vue({
  el: '#cart',
  data: {
    url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
    items: [],
    img:'https://placehold.it/100x80',
    show: false
  },
  methods: {
    async getData() {
      this.items = await fetch(this.url)
        .then(d => d.json())
        .then(data => data.contents) 
    }
  },
  mounted() {
      this.getData()
  },
})


