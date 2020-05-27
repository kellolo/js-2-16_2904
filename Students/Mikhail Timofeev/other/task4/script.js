//сначала вводим данные в формы. Далее нажимаем кнопку. После этого проводится проверка и назначаются слушатели на формы


class CheckInput {
    constructor() {
        this._init();
    }

    _init() {
        this._checkInput();
        this._initEventHandlers();
        
    }
    
    _initEventHandlers() {
        
        document.querySelectorAll('input').forEach ((e) => {
            e.oninput = () => {
                this._checkInput();
            }
        })
        
    }

    _checkInput() {
        this._checkName();
        this._checkPhone();
        this._checkEmail();
        this._checkText();
    }

    _checkName() {
        let name = document.querySelector('.name__input').value;
        let chckName = new RegExp(/^[а-яА-Яa-zA-Z][а-яА-Яa-zA-Z]*$/gi);
        if (chckName.test(name)) {
            document.querySelector('.name__input').classList.remove('error');
        } else {
            document.querySelector('.name__input').classList.add('error');
        }

    }

    _checkPhone() {
        let phone = document.querySelector('.phone__input').value;
        let chck = new RegExp(/^(\+\d\(\d{3}\))\d{3}-\d{4}$/);
        if (chck.test(phone)) {
            document.querySelector('.phone__input').classList.remove('error');
        } else {
            document.querySelector('.phone__input').classList.add('error');
        }
    }


    _checkEmail() {
        let email = document.querySelector('.email__input').value;
        let chck = new RegExp(/([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{1,})$/gi);
        if (chck.test(email)) {
            document.querySelector('.email__input').classList.remove('error');
        } else {
            document.querySelector('.email__input').classList.add('error');
        }
    }

    _checkText() {
        let text = document.querySelector('.text__input').value;
        let chck = new RegExp(/\w+/);
        if (chck.test(text)) {
            document.querySelector('.text__input').classList.remove('error');
        } else {
            document.querySelector('.text__input').classList.add('error');
        }
    }
}


document.querySelector('.sbmt__btn').addEventListener('click', (evt) => {
    let checkInput = new CheckInput();
});




