export default class Catalog {
    constructor(items) {
        this.items = items;
        this.container = '.products';
        this.cart = null;
    }

    construct(cart) {
        this.cart = cart;
        this._init();
    }

    _init() {
        this.render();
        this._handleEvents();
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.cart.addProduct(evt.target);
            }
        })
    }

    render() {
        let str = '';
        this.items.forEach(item => {
            str += `
                <div class="product-item">
                    <img src="https://placehold.it/300x200" alt="${item.product_name}">
                    <!--img src="${item.img}" width="300" height="200" alt="${item.product_name}"-->
                    <div class="desc">
                        <h1>${item.product_name}</h1>
                        <p>${item.price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${item.product_name}"
                        data-price="${item.price}"
                        data-id="${item.id_product}"
                        >Купить</button>
                    </div>
                </div>
            `
        })
        document.querySelector(this.container).innerHTML = str;
    }
}



    

    



