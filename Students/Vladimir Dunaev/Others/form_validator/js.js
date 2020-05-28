class Form {
    constructor() {
        this.inputs = document.querySelectorAll('input');
        this.patterns = {
            name: /^[a-zёа-я]+$/,
            email: /^[\-\.a-z0-9]+@[\-\.a-z0-9]+\.\w{2,4}$/,
            phone: /^\+\d\(\d{3}\)\d{3}-\d{4}$/
        };
        this.submit = document.querySelector('button');
        this._setHandlers();
    }

    _setHandlers() {
        this.submit.addEventListener('click', () => {
            this._checkForm();
        });
        this.inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInput(input);
            });
        });
    }

    _checkForm() {
        this.inputs.forEach(input => {
            this._checkInput(input);
        })
        this._checkTotalSuccess();
    }

    _checkInput(input) {
        this._getValue(input);
    }

    _getValue(input) {
        let elem = new Input(input, this.patterns[input.name]);
        this._check(elem);
    }

    _check(elem) {
        let regexp = new RegExp(elem.check, 'gui')
        elem.status = regexp.test(elem.value);
        this._showResult(elem)
    }

    _showResult(elem) {
        if (elem.status === false) {
            this._showInputError(elem);
        } else {
            this._showInputSuccess(elem);
        }
    }

    _showInputError(elem) {
        if (!document.querySelector(`input[name="${elem.name}"]`).classList.contains('error')) {
            document.querySelector(`input[name="${elem.name}"]`).classList.remove('valid');
            document.querySelector(`input[name="${elem.name}"]`).classList.add('error');
            document.querySelector(`input[name="${elem.name}"]`).insertAdjacentHTML('afterend', this.createErrorText());
        }
    }

    createErrorText() {
        return `<p class="errorText">Введены некорректные данные!</p>`
    }

    _showInputSuccess(elem) {
        if (document.querySelector(`input[name="${elem.name}"]`).classList.contains('error')) {
            document.querySelector(`input[name="${elem.name}"]`).classList.remove('error');
            document.querySelector(`input[name="${elem.name}"]`).nextSibling.remove();
            document.querySelector(`input[name="${elem.name}"]`).classList.add('valid');
        } else {
            document.querySelector(`input[name="${elem.name}"]`).classList.add('valid');
        }
    }

    _checkTotalSuccess() {
        for (let input of this.inputs) {
            if (!input.classList.contains('valid')) {
                return;
            }
        }

    }

}

class Input {
    constructor(input, check) {
        this.name = input.getAttribute('name')
        this.value = input.value;
        this.check = check;
    }
}

let form = new Form();