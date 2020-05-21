let
	calc = document.getElementById('calc'),
	fullPrice = document.getElementById('full-price'),
	fullCalories = document.getElementById('full-calories'),
	mainBasketList = document.querySelector('main-basket__list')

let 
	calories = null, 
	price = null


const buttonItems = document.querySelectorAll('[data-price]');
for (let buttonItem of buttonItems) {
	buttonItem.addEventListener('click', (event) => {
		calculateGenerator(event.target)
  	})		
}

function calculateGenerator(item) {
	item.classList.toggle('checked-button')
	calories += +item.dataset.cals
	price += +item.dataset.price
	if (!item.classList.contains('checked-button')) {
		calories -= +item.dataset.cals * 2
		price -= +item.dataset.price * 2
	}
}

function basket(item) {
	//----
}

calc.onclick = () => {
		if (price > 0) {
			fullPrice.textContent = "цена: " + price
			fullCalories.textContent = "калорий: " + calories
		} else {
			fullPrice.textContent = "выберите товар"
			fullCalories.textContent = ""
		}

}