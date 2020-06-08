module.exports = {
	add(basket, item) {
		basket.contents.push(item)
		return { newBasket: basket }
	},

	change(basket, id, amount) {
		let find = this._find(basket.contents)
		find.quantity += amount
		return { newBasket: basket }
	},

	delete(basket, id) {
		let find = this._find(basket.contents, id)
		basket.contents.splice(basket.contents.indexOf(find), 1)
		return { newBasket: basket }
	},

	_find(basket, item) {
		return Array.find(el => el.id_product == id)
	}
}