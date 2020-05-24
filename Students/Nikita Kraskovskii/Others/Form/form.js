class Form{
    constructor(form){
        this.form = form,
        this.errorClass = 'red',
        this.regExp = {
            name: /^[a-zа-яё]+$/i,
            tel: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            mail: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,
            word: /\w/
        },
        this.err = {
            name:'Имя содержит только буквы',
            tel: 'Телефон имеет вид +7(000)000-0000',
            mail: 'E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
            word: 'Текст произвольный'
        },
        this._check()
    }

    _check(){
        let formCheck = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let item of formCheck){
            if(this.regExp[item.name]){
                if(!this.regExp[item.name].test(item.value)){
                    item.classList.add('erro');
                    this._openBlock(item);
                    this._some(item);
                }
            }
        }
    }

    _openBlock(item){
        let str = `<div class="${this.errorClass}">${this.err[item.name]}</div>`;
        item.parentNode.insertAdjacentHTML('beforeend', str);
    }

    _some(item){
        item.addEventListener('keydown', () => {
            let str = item.parentNode.querySelector(`.${this.errorClass}`);
            if(this.regExp[item.name].test(item.value)){
                item.classList.remove('erro');
                item.classList.add('noerro');
                if(str){
                    str.remove();
                }
            } else {
                item.classList.remove('noerro');
                item.classList.add('erro');
                if(!str){
                    this._openBlock(item);
                }
            }
        })
    }
};

document.getElementById('btn').addEventListener('click', () => {
    let a = new Form('form');
})