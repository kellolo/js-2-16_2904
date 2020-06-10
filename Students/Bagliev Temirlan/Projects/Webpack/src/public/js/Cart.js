import List from './List.js'

export default class Cart extends List{
    constructor(url, container) {
        super(url = '/getBasket.json', container = '.cart-items');
        this.total = 0;
        this.sum = 0;
        this.quantityBlock = document.querySelector ('#quantity');
        this.priceBlock = document.querySelector ('#price');
    }

    /**
     *Обработчик события - нажатие на кнопку удалить продукта в корзине
     *
     */
    _handleEvents () {
        this.container.addEventListener ('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct (evt.target)
            }
        })
    }

    handlerCatalogClick(evt){
        if (evt.target.name === 'buy-btn') {
            this.addProduct(evt.target)
        }
    }


    /**
     *Создаем каталог
     */
    _init () { 
        this.getData(this.url)
            .then(data => {this.items = data.contents})
            .then(() => {this.changeCart()})
            .finally(() => {
                this._handleEvents()
            })
    }

    /**
     *Удаляет выбранный продукт
     */
    deleteProduct (product) {
        let id = +product.dataset['id'];
        let find = this.items.find(product => product.id_product === id);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice (this.items.indexOf(find), 1);
        }
        this.changeCart() 
        
    }

    changeCart(){
        this._checkTotalAndSum ();
        this.render ();
        this.quantityBlock.innerText = this.total
        this.priceBlock.innerText = this.sum
    }

    
    
    /**
     *Считает общую сумму товаров
     */
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

    /**
     *Добавляет товар в корзину
     */
    addProduct (product) {
        let id = +product.dataset['id'];
        let find = this.items.find (product => product.id_product === id);
        if (find) {
            find.quantity++;
        } else {


            let prod = this._createNewProduct (product);
            this.items.push (prod);
        }      
        this.changeCart() 
    }

    /**
     *Возвращает массив с параметрами товара
     *$root.$children[0].$refs.cart.addToCart(item)
     */
    _createNewProduct (prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    }
}

