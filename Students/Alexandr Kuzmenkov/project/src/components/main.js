const catalogImage = "https://placehold.it/200x150";
const basketImage = "https://placehold.it/100x80";
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



let app = new Vue({
    el: "#app",
    data: {
        items: [],
        cartItems: [],
        url: "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json",
        show: false,
        sum: 0,
        quantity: 1,
        search: "",
    },
    mounted() {
        this.get(this.url)
            .then(data => {
                this.items = data;
                this.cartItems = data;
            })
            .finally(() => {
                console.log(this.items);
                console.log(this.cartItems);
            })
    },
    methods: {
        get(url) {
            return fetch(this.url).then(d => d.json())
        },
        addProduct() {
            this.quantity = this.quantity + 1;
        }

    },
    /*    
            computed: {
                items_n() {
                    let array = this.items;
                    let newArray = [];
                    const serach = this.search.toLowerCase();
                    for (key of array) {
                        el = array[key]
                        if (el.name.toLowerCase().indexOf(serach) != -1) newArray.push(el);
                    }
                    return newArray;
                }
            }
*/
    computed: {
        sumPriseCalc() {
            let sumPrise = 0;
            for (let i = 0; i < this.cartItems.length; i++) {
                sumPrise += this.cartItems[i].price;
            }
            console.log(sumPrise)
            return sumPrise;
        },

    }

})
