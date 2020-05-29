class ValidForm {
    constructor(form) {
        this.form = form;
        this.fl = false;
        this.regexp = {
            name: /^[a-zA-Zа-яА-Я]+$/i,
            phone: /^(\+7\(\d{3}\))\d{3}-\d{4}/gi,
            email: /^[\w.-]+@\w+\.[a-z]{2,6}$/
        };
        this._validate()
    }

    _validate() {
        let block = document.querySelector(this.form);
        let items = [...block.querySelectorAll('input')];
        items.forEach(el => {
            this._validateItem(el)
        });
        if (![...block.querySelectorAll('.incorrect')].length) {
            this.fl = true
        }
    }

    _validateItem(item) {
        if (this.regexp [item.name]) {
            if (!this.regexp [item.name].test(item.value)) {
                item.classList.add('incorrect');
            } else {
                item.classList.remove('incorrect');
                item.classList.add('correct')
            }
        }
    }
}

document.querySelector('.form').addEventListener('submit', event => {
    let form = new ValidForm('.form');
    if (!form.fl) {
        event.preventDefault();
    }
});