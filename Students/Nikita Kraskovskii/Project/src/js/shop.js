
const api = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class Catalog {
    constructor(){
        this.items = [],
        this.container = '.products',
        this._fetchProducts().then(data => {
            this.items = [...data];            
            this.render();
        })       
    }

    _fetchProducts(){
        return fetch(`${api}/catalogData.json`).then(result => result.json())
        .catch(error => {
            console.log(error);
            
        })
    }
    render(){
        let block = document.querySelector(this.container);
        for (let item of this.items){
            let prodObj = new Product(item)
            block.insertAdjacentHTML('beforeend', prodObj.render())
       }
   }
    
};
class Product{
    constructor(item, img = "https://placehold.it/100x80"){
        this.product_name = item.product_name;
        this.price = item.price
        this.img = img
    }
    render(){
        return `<div class="product-item">
                    <img src="https://placehold.it/300x200" alt="${this.product_name}">
                    <!--img src="${this.img}" width="300" height="200" alt="${this.product_name}"-->
                    <div class="desc">
                        <h1>${this.product_name}</h1>
                        <p>${this.price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${this.product_name}"
                        data-price="${this.price}"
                        data-id="${this.id_product}"
                        >Купить</button>
                    </div>
                </div>`
    }
        
    
}
class Cart {
    constructor(){
        this.container = '.cart-block',
        this.items = [],
        this.total = 0,
        this.sum = 0,
        this.quantityBlock = document.querySelector ('#quantity'),
        this.priceBlock = document.querySelector ('#price'),
        this._handleEvents()
    }
    _handleEvents(){
        document.body.addEventListener('click', (event) => {
            if (event.target.name === 'del-btn'){
                this.deleteProduct(event.target)
            } else if (event.target.name === 'buy-btn'){
                this.addProduct(event.target)
            }
        })
    }
    addProduct(product){
        let id = product.dataset['id'];
        let find = this.items.find(product => product.id_product === id);
        if (find){
            find.quantity++;
        } else {
            let prod = this._createNewProduct(product);
            this.items.push(prod);
        }
        this._checkTotalAndSum();
        this.render();
    }
    _createNewProduct (prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    }
    deleteProduct (product) {
        let id = product.dataset['id'];
        let find = this.items.find (product => product.id_product === id);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice (this.items.indexOf(find), 1);
        }
         
        this._checkTotalAndSum();
        this.render();
    }
    _checkTotalAndSum () {
        let qua = 0;
        let pr = 0;
        this.items.forEach (item => {
            qua += item.quantity;
            pr += item.price * item.quantity;
        })
        this.total = qua;
        this.sum = pr;
    }
    render () {
        let itemsBlock = document.querySelector (this.container).querySelector ('.cart-items');
        let str = '';
        this.items.forEach (item => {
            str += `<div class="cart-item" data-id="${item.id_product}">
                    <img src="https://placehold.it/100x80" alt="">
                    <div class="product-desc">
                        <p class="product-title">${item.product_name}</p>
                        <p class="product-quantity">${item.quantity}</p>
                        <p class="product-single-price">${item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
                    </div>
                </div>`
        });
        itemsBlock.innerHTML = str;
        this.quantityBlock.innerText = this.total;
        this.priceBlock.innerText = this.sum;
    }
};



export default function(){
    new Catalog()
    new Cart()
};
