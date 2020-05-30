let reqUrl = '../test-repo/for-tests/goods.json';










let app = new Vue({
    el: '#app',
    data: {
        items: [{
                name: "keyboard",
                price: '1200',
                id: '1',
                img: '...',
            },
            {
                name: "mouse",
                price: '700',
                id: '2',
                img: '...',
            }, {
                name: "processor",
                price: '4300',
                id: '3',
                img: '...',
            }, {
                name: "computer",
                price: '35000',
                id: '4',
                img: '...',
            },
        ],

        inBasket: [],
        totalSum: 0,
        totalItemsInBasket: 0,
        reqUrl: 'https://github.com/Dmitry-Veles/for-tests/blob/master/goods.json',
        items2: this.getData,

    },

    methods: {

        addToBasket(name, price, id, img) {
            console.log(this.items2)
            let item = {}
            item.name = name
            item.price = price
            item.id = id
            item.img = img
            item.qtty = 1

            let find = this.inBasket.find(i => i.id == item.id)
            if (find) {

                find.qtty++
                //console.log('их теперь ' + find.qtty)
            } else {
                this.inBasket.push(item)
                //console.dir(this.inBasket)

            };
            this.calcTotal()

        },

        calcTotal() {
            let qua = 0
            let pr = 0
            this.inBasket.forEach(i => {
                qua += i.qtty
                pr += i.price * i.qtty
                //i.sum = pr
            })
            this.totalSum = pr,
                this.totalItemsInBasket = qua

        },

        deleteFromBasket(id) {
            let find = this.inBasket.find(i => i.id == id)
            if (find.qtty > 1) {
                find.qtty--
            } else {
                this.inBasket.splice(this.items.indexOf(find), 1)
            }
            this.calcTotal()
        },

        hide(objClass) {
            let obj = document.querySelector('.' + objClass)
            if (obj.classList.contains('hide')) {
                obj.classList.remove('hide')
            } else {
                obj.classList.add('hide')
            }
        },





    },

    mounted: function (){
            fetch(this.reqUrl, {method: 'POST'})
                .then(result => result.json)
                .then(res => this.items2 = res.data);
                console.log(this.items2);
        }




    


})