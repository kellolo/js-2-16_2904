class CheckForm {
	constructor() {
		this.form = document.getElementById('form')

		this.nameInput = document.getElementById('nameInput')
		this.nameInputHelp = document.getElementById('nameInputHelp')
		this.nameDanger = "только английские буквы"
		
		this.telInput = document.getElementById('telInput')
		this.telInputHelp = document.getElementById('telInputHelp')
		this.telDanger = "только цифры"

		this.mailInput = document.getElementById('mailInput')
		this.mailInputHelp = document.getElementById('mailInputHelp')
		this.mailDanger = "неверный формат почты"

		this.infoInput = document.getElementById('infoInput')
		this.infoInputHelp = document.getElementById('infoInputHelp')
		this.infoDanger = "используется запрещенный символ"
		

		this.regexPatterns = {
			nameRegex : /^[a-z]{3,10}$/i,
			numRegex  : /^[0-9]{5,10}$/,
			mailRegex : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			infoRegex : /^[а-яёa-z0-9,.!\s\n]{0,100}$/iu
		}

		this.checkFields(this.nameInput, this.nameInputHelp, this.regexPatterns.nameRegex, this.nameDanger)

		//почему без this работает так же как и с this? даже если закомментирую
		//this.nameInput = document.getElementById('nameInput') все равно переменная доступна :)
		//не пойму почему так происходит?
		this.checkFields(telInput, telInputHelp, this.regexPatterns.numRegex, this.telDanger, 5, 10)
		this.checkFields(mailInput, mailInputHelp, this.regexPatterns.mailRegex, this.mailDanger, 0, 30)
		this.checkFields(infoInput, infoInputHelp, this.regexPatterns.infoRegex, this.infoDanger, 0, 100)

		this.checkFormSubmit()

	}



	checkFields(inputName, inputHelpName, regexRule, dangerMessage, min = 3, max = 10) {
		inputName.addEventListener('keyup', evt => {

			if (regexRule.test(inputName.value)) {
				inputHelpName.classList.add('invisible')
				inputName.classList.remove('is-invalid')
				inputName.classList.add('is-valid')
				console.log(inputName.value)
			} else {
				inputHelpName.classList.remove('invisible')
				inputName.classList.add('is-invalid')
				inputName.classList.remove('is-valid')
				inputHelpName.innerHTML = dangerMessage
				console.log(inputName.value)



				fieldLength(min, max) //как тут сделать IIFE 
				function fieldLength(min, max) {
					if (inputName.value.length < min) {
						inputHelpName.innerHTML = `длина от ${min} символов`
						console.log(inputName.value.length)
					}

					if (inputName.value.length > max) {
						inputHelpName.innerHTML = `длина до ${max} символов`
						console.log(inputName.value.length)
					}
				}	
			}
		})
	}


	checkFormSubmit() {
		const 
			fields = document.querySelectorAll('#form input, textarea'),
			danger = document.querySelectorAll('small')

		form.addEventListener('submit', evt => { 
			evt.preventDefault()
			
			for (let value of fields.values()) {
				if (value.value.length < 1) {
					value.classList.add('is-invalid')
					value.classList.remove('invisible')
				} else {
					value.classList.remove('is-invalid')
				}
			}	
		})
	}
}

let checkForm = new CheckForm()