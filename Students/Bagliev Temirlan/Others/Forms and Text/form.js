
class Name {
    constructor() {
        this.inputName = document.querySelector('.input_name');
        this.regName = /\d/;
        this.iName = this.inputName.value;
    }
    errorInput(){
        this.inputName.style.border = '1px solid red';  
    }
    verName() {
        if(this.regName.test(this.iName)||(this.iName == "")) {
            this.inputName.insertAdjacentHTML("afterend", `<p class ="error">Введите корректное ФИО</p>`);
            this.errorInput();      
        } else {
            this.inputName.style.border = '1px solid black';
            clearError();
        }
    }
        
}

class Telefon {
    constructor() {
        this.inputTel = document.querySelector('.input_number');
        this.regTel = /\+7\(\d{3}\)\d{3}-\d{4}/;
        this.iTel = this.inputTel.value;
        }
        errorInput(){
            this.inputTel.style.border = '1px solid red';  
        }
        verTel(){
            if (!(this.regTel.test(this.iTel))) {
                this.inputTel.insertAdjacentHTML("afterend", `<p class ="error">Введите корректный телефон в формате +7(000)000-0000</p>`);
                this.errorInput();
            }
            else {
                this.inputTel.style.border = '1px solid black';
                clearError();
            }
        }
        
}
class Email {
    constructor() {
        this.inputEmail = document.querySelector('.input_email');
        this.regEmail = /\w{2}(\.|-|)\w{4}@mail\.ru/;
        this.iEmail = this.inputEmail.value;
    }
    errorInput(){
        this.inputEmail.style.border = '1px solid red';  
    }
    verEmail() {
        if (!(this.regEmail.test(this.iEmail))) {
            this.inputEmail.insertAdjacentHTML("afterend", `<p class ="error">Введите корректный E-mail в формате mymail@mail.ru my.mail@mail.ru или my-mail@mail.ru</p>`);
            this.errorInput();  
        } else   {
            this.inputEmail.style.border = '1px solid black';
            clearError();
        }
    }    
    
}

class Textarea {
    constructor() {
        this.inputTextarea = document.querySelector('.textarea_text');
        this.regTextarea =/./;
        this.iTextarea = this.inputTextarea.value;
    }
    errorInput(){
        this.inputTextarea.style.border = '1px solid red';  
    }
    verTextArea() {
        if (!(this.regTextarea.test(this.iTextarea))) {
            this.inputTextarea.insertAdjacentHTML("afterend", `<p class ="error">В этом поле необходимо ввести текст</p>`);
            this.errorInput();  
        } else {
            this.inputTextarea.style.border = '1px solid black';
            clearError();
        }
    }
}
function clearError() {
    let eError = document.querySelectorAll('.error');
    for(let i = 0; i < eError.length; i++) {
        eError[i].style.display = 'none';
    }
}
document.querySelector('.form_send').addEventListener('click', function(){
    let name = new Name();
    let telefon = new Telefon();
    let email = new Email();
    let textarea = new Textarea();

    name.verName();
    telefon.verTel();
    email.verEmail();
    textarea.verTextArea();

    })