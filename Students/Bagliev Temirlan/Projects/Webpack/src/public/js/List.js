let API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'; 

import CatalogItems from './CatalogItems.js'
import CartItems from './CartItems.js'

let lists = {
    Catalog: CatalogItems,
    Cart: CartItems
}

export default class List{
    constructor(url, container){
        this.url = url;
        this.container = document.querySelector(container);
        this.items = [];
        this._init();
    }

    _init(){
        return false;
    }

    async getData(){
        const res = await fetch(API + this.url);
        return await res.json();
    }

    /**
     *Вставляет HTML- разметку товара каталога
     */
    render(){
        let str = '';
        this.items.forEach (item => {
            str += new lists[this.constructor.name](item).getProductHTML();
        })  
        this.container.innerHTML = str;
    }
}