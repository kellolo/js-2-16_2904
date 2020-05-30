class Form {
    constructor() {
        this.name = document.querySelector('#name');
        this.email = document.querySelector('#email');
        this.phone = document.querySelector('#phone');
        this.init();
    }

    init() {
        this.checkName();
        this.checkEmail();
        this.checkPhone();
    }

    checkName() {

        if (/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/.test(this.name.value)) {
            this.name.classList.add("right");
        } else {
            this.name.classList.add("wrong");
        }
    }

    checkEmail() {
        if (/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(this.email.value)) {
            this.email.classList.add("right");
        } else {
            this.email.classList.add("wrong");
        }
    }

    checkPhone() {
        if (/^([+]?[0-9\s-\(\)]{3,25})*$/i.test(this.phone.value)) {
            this.phone.classList.add("right");
        } else {
            this.phone.classList.add("wrong");
        }
    }
}


document.querySelector('.btn').addEventListener('click', () => {
    new Form();
})