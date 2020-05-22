
window.onload = () => {
	document.querySelector ('#okBtn'). addEventListener ('click', function () {
		let burger = new Burger ('volume', 'insides', 'seasoning');
		burger.showSum('#price', '#calories');
		let audio = new Audio
		audio.src = "Sound_19349.mp3"
		audio.play()

	})
}

class Param {
	constructor(element){
		this.price = +element.dataset['price'];
		this.calories = +element.dataset['calories'];
	}
}

class Burger {
	constructor (volume, insides, seasoning) {
		this.volume = new Param (this._select (volume))
		this.insides = new Param (this._select (insides))
		this.seasoning = this._selectAll (seasoning)
	}
	_select (Name) {
		return document.querySelector (`input[name="${Name}"]:checked`);

	}
	_selectAll (Name) {
		return [...document.querySelectorAll (`input[name="${Name}"]:checked`)]
	}

	_sumPrice(){
		let result = this.volume.price + this.insides.price;
		this.seasoning.forEach(el => result += +el.dataset['price']);
		return result;
	}
	_sumCalories(){
		let result = this.volume.calories + this.insides.calories;
		this.seasoning.forEach(el => result += +el.dataset['calories']);
		return result;
	}
	showSum(price, calories){
		document.querySelector(price).textContent = this._sumPrice();
		document.querySelector(calories).textContent = this._sumCalories();
	}
}
