console.log('text');

class Verification{
    constructor() {
        this.yNameInput = document.getElementById('yName');
        this.errorYName = document.getElementById('errorYName');
        this.yNameRegExe =  new RegExp('^[а-яa-z][а-яa-z]{1,60}$');

        this.emailInput = document.getElementById('email');
        this.errorEmail = document.getElementById('errorEmail');
        this.emailRegExe =  new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$');

        this._init();
    }

    _init(){

        this.yNameInput.addEventListener ('input', (evt) => {
            let text = evt.path[0].value;
            this.errorYName.innerHTML = (!this.yNameRegExe.test(text))
                ? 'Должны быть только буквы!'
                : '';
        });

        this.emailInput.addEventListener ('input', (evt) => {
            let text = evt.path[0].value;
            this.errorEmail.innerHTML = (!this.emailRegExe.test(text))
                ? 'Введите корректрый E-mail'
                : '';
        });
    }
}

let verf = new Verification();