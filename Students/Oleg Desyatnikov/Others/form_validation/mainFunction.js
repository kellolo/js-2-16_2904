const 
	form = document.getElementById('form')

	nameInput = document.getElementById('nameInput')
	nameInputHelp = document.getElementById('nameInputHelp')
	nameDanger = "только английские буквы"
	
	telInput = document.getElementById('telInput')
	telInputHelp = document.getElementById('telInputHelp')
	telDanger = "только цифры"

	mailInput = document.getElementById('mailInput')
	mailInputHelp = document.getElementById('mailInputHelp')
	mailDanger = "неверный формат почты"

	infoInput = document.getElementById('infoInput')
	infoInputHelp = document.getElementById('infoInputHelp')
	infoDanger = "используется запрещенный символ"
	

	regexPatterns = {
		nameRegex : /^[a-z]{3,10}$/i,
		numRegex  : /^[0-9]{0,10}$/,
		mailRegex : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		infoRegex : /^[а-яёa-z0-9,.!\s\n]{0,100}$/iu
	}


checkFields(nameInput, nameInputHelp, regexPatterns.nameRegex, nameDanger)
checkFields(telInput, telInputHelp, regexPatterns.numRegex, telDanger)
checkFields(mailInput, mailInputHelp, regexPatterns.mailRegex, mailDanger, 0, 30)
checkFields(infoInput, infoInputHelp, regexPatterns.infoRegex, infoDanger, 0, 100)

checkFormSubmit()


function checkFields(inputName, inputHelpName, regexRule, dangerMessage, min = 3, max = 10) {
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


			fieldLength(min, max)

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

function checkFormSubmit() {

	const 
		fields = document.querySelectorAll('#form input, textarea')
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