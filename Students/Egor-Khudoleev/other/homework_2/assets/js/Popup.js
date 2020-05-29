export default class Popup {
    constructor() {
        this.handler = this.checkClick.bind(this)
    }
    showPopup(price, cal) {
        document.querySelector('.popup-content').classList.remove('bounceOut');
        document.querySelector('.popup-container').style.display = 'flex';
        document.querySelector('.popup-content').classList.add('animated', 'bounceIn');
        document.querySelector('.popup-close').addEventListener('click', this.closePopup);
        window.addEventListener('click', this.handler);
        document.querySelector('.popup-text').innerHTML = `Сумма: ${price}, каллории: ${cal}`
    }

    closePopup() {
        document.querySelector('.popup-content').classList.remove('bounceIn');
        document.querySelector('.popup-content').classList.add('bounceOut');
        window.removeEventListener('click', this.handler);
        setTimeout(() => document.querySelector('.popup-container').style.display = 'none', 720);
    }

    checkClick(event) {
        if (event.target === document.querySelector('.popup-container')) {
            this.closePopup();
        }
    }
}