const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title, price) => {
    return `<div class="product-item">
                <div class="product-img">
                    <img src="http://placehold.it/30x35" alt="cloth">
                </div>
                <div class="product-list">
                    <h3>${title}</h3>
                    <div class="stars"></div>
                    <span class="price">₽ ${price}</span>
                    <div class="actions">
                        <div class="add-to-cart">
                        <a href="" class="cart-button">В корзину</a>
                    </div>
                </div>
              </div>
            </div>`;
};

const renderGoodsList = (list = "В данной категории товаров не найдено") => {
    if (typeof list === 'string') {
        document.querySelector('.goods-list').innerHTML = list;
    }

    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    goodsList.forEach(element => document.querySelector('.goods-list').innerHTML += element);
}

renderGoodsList(goods);