class ValidForm {
    constructor(form){
        this.form = form;
        this.fl = false;
        this.regexp = {
            name: /^[a-zA-Zа-яА-Я]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w.-]+@\w+\.[a-z]{2,6}$/
        };
        this.rules = {
            name: 'Имя может содержать только буквы.',
            phone: 'Формат: +7 (999) 123-45-67',
            email: 'Формат: mymail@mail.ru, my.mail@mail.ru, my-mail@mail.ru'
        };
        this._validate()
    }
    _validate(){
        let block = document.querySelector(this.form);
        let items = [... block.querySelectorAll('input')];
        items.forEach (el => {this._validateItem(el)});
        if (![... block.querySelectorAll ('.incorrect')].length) {
            this.fl = true
        }
    }
    _validateItem(item){
        let err = item.parentNode.querySelector (`.error`);
        let str = `<span class="error">${this.rules [item.name]}</span>`;
        if (this.regexp [item.name]) {
            if (!this.regexp [item.name].test(item.value)) {
                item.classList.add ('incorrect');
                if (!err) item.parentNode.insertAdjacentHTML ('beforeend', str)
            } else {
                if (err) err.remove();
                item.classList.remove ('incorrect');
                item.classList.add('correct')
            }
        }
    }
}

document.querySelector('.form').addEventListener('submit', event => {
    let Valform = new ValidForm('.form');
    if(!Valform.fl){
        event.preventDefault();
    }
});