class Order {
    constructor(){
        this.orderEl = document.querySelector('.total__order');
        this.priceEl = document.querySelector('.total__price');
        this.coloriesEl = document.querySelector('.total__colories');
        this.price = 0;
        this.colories = 0;
        this.burgerSize = null;
        this.filling = [];
        this.additive = [];
    }

    /**
     *Обработчик события - нажатие на любой продукт на странице
     *
     */
    handlerClickEvent(){
        this.removeOrder();
        this.changeOrder(this.getAllCheckoutEl());
        this.renderOrder();
    }

    /**
     *Очищаем заказ
     */
    removeOrder(){
        this.price = 0;
        this.colories = 0;
        this.burgerSize = null;
        this.filling = [];
        this.additive = [];
        this.orderEl.innerHTML = "";
    }

    /**
     *Возвращает коллекцию выбранных элементов
     * @returns
     */
    getAllCheckoutEl(){
        return document.querySelectorAll('input:checked');
    }


    /**
     *Возвращает значение запрашиваемого параметра прродукта - размер, цену или калорийность
     *
     * @param {*} el - выбанный чекбок или радиокнопка
     * @param {String} text - какой именно параметр хотим узнать
     * @returns {String} 
     */
    getValueEl(el, text){
        return el.parentNode.querySelector(`.burger__${text}`).innerText;
    }

    /**
     *Изменяет параметры заказа - итоговую цену, 
     *итоговую калорийность, размер и списки добавок
     * @param {NodeList} allCheckoutEl - колекция выбранных элементов
     */
    changeOrder(allCheckoutEl){
        allCheckoutEl.forEach(el => {
            this.price += +this.getValueEl(el, "price");
            this.colories += +this.getValueEl(el, "colories");
            if(el.name == "size"){
                this.burgerSize = this.getValueEl(el, "name");
            }
            if(el.name == "filling"){
                this.filling.push(this.getValueEl(el, "name"));
            }
            if(el.name == "additive"){
                this.additive.push(this.getValueEl(el, "name"));
            }
        });
    }

    /**
     *Отрисовывает заказ на странице
     */
    renderOrder(){
        this.priceEl.innerText = this.price;
        this.coloriesEl.innerText = this.colories;      
        this.orderEl.insertAdjacentHTML("beforeend", this.getOrderHTML());
    }

    /**
     *Возвращает HTML разметку заказа
     *
     * @returns
     */
    getOrderHTML(){
        let orderHTML = '';
        if(this.burgerSize != null){
            orderHTML = `<h4>Размер:</h4>
                        <p>${this.burgerSize}</p>`;
        } 
        if(this.filling.length > 0){
            orderHTML += `<h4>Начинка:</h4>`
            this.filling.forEach(product => 
                orderHTML += `<p>${product}</p>`
            );
        }
        if(this.additive.length > 0){
            orderHTML += `<h4>Добавка:</h4>`
            this.additive.forEach(product => 
                orderHTML += `<p>${product}</p>`
            );
        }
        return orderHTML;
    }
}