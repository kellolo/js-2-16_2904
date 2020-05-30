class Form{
    constructor(form){
        this.form = form,
        this.errorClass = 'text',
        this.regExp = {
            name: /^[a-zа-я]+$/i,
            tel: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            mail: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,
            word: /\w/
        },
        this.err = {
            name:'Имя должно содержать только буквы',
            tel: 'Телефон должен иметь вид +7(000)000-0000',
            mail: 'E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
            word: 'Текст'
        },
        this._check()
    }

    _check(){
        let formCheck = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let item of formCheck){
            if(this.regExp[item.name]){
                if(!this.regExp[item.name].test(item.value)){
                    item.classList.add('wrong');
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
                item.classList.remove('wrong');
                item.classList.add('right');
                if(str){
                    str.remove();
                }
            } else {
                item.classList.remove('right');
                item.classList.add('wrong');
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