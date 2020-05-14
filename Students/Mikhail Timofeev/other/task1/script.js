const goods = [{
        title: 'Shirt',
        price: 150
    },
    {
        title: 'Socks',
        price: 50
    },
    {
        title: 'Jacket',
        price: 350
    },
    {
        title: 'Shoes',
        price: 250
    },
];

const renderGoodsItem = (title, price) => {
    return `<div class="product">
                <div class="product__name">${title}</div>
                <img src="#" class="img" alt="product-img">
                <div class=""><span>${price}</span> $</div>
                <button class="cartButton" data-id="1" data-price="30" data-name="Товар 1">Купить</button>
            </div>
            `;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    goodsList.forEach(element => document.querySelector('.goods-list').innerHTML += element);
}

renderGoodsList(goods);