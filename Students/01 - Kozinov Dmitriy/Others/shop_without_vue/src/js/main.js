const catalogImage = "https://placehold.it/200x150";
const basketImage = "https://placehold.it/100x80";
const API =
  "https://raw.githubusercontent.com/BenBatton/online-store-api/master";

class List {
  constructor(url, container) {
    this.url = url;
    this.container = container;
    this.items = [];
    this._init();
  }

  _init() {
    this.get(this.url).then((data) => {
      if (this.constructor.name === "Basket") {
        this.items = data.contents;
      } else {
        this.items = data;
      }
      this.render();
      this._handleEvents();
    });
  }

  get(url) {
    url = API + url;
    // return fetch(url).then((dataJson) => dataJson.json());
    return new Promise((res, rej) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            res(JSON.parse(xhr.responseText));
          } else {
            rej("ERROR!!!!!!!!!!");
          }
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    });
  }

  render() {
    let htmlStr = "";
    this.items.forEach((item) => {
      let newItem = new classes[this.constructor.name](item);
      htmlStr += newItem.render();
    });
    document.querySelector(this.container).innerHTML = htmlStr;
  }

  // _init() {
  //   this.get(this.url, (json) => {
  //     this.items = (JSON.parse(json));
  //   });
  // get(url, callback) {
  //   let URL = API + url;
  //   let xhr = new XMLHttpRequest();
  //   xhr.onreadystatechange = () => {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         callback(xhr.responseText);
  //       }
  //     }
  //   };
  //   xhr.open("GET", URL, true);
  //   xhr.send();
  // }
}
class ListItem {
  constructor(item, img = catalogImage) {
    this.item = item;
    this.img = img;
  }
  render() {
    return `
    <div class="product-item">
        <img src="https://placehold.it/300x200" alt="${this.item.product_name}">
        <!--img src="${this.img}" width="300" height="200" alt="${this.item.product_name}"-->
        <div class="desc">
            <h1>${this.item.product_name}</h1>
            <p>${this.item.price}</p>
            <button
            class="buy-btn"
            name="buy-btn"
            data-name="${this.item.product_name}"
            data-price="${this.item.price}"
            data-id="${this.item.id_product}"
            >Купить</button>
        </div>
    </div>`;
  }
}

class Catalog extends List {
  constructor(basket, url = "/catalog.json", container = ".products") {
    super(url, container);
    this.basket = basket;
  }

  _handleEvents() {
    document.querySelector(this.container).addEventListener("click", (evt) => {
      if (evt.target.name === "buy-btn") {
        this.basket.add(evt.target);
      }
    });
  }
}
class Basket extends List {
  constructor(url = "/basket.json", container = ".cart-block") {
    super(url, container);
  }

  _handleEvents() {
    document.querySelector(this.container).addEventListener("click", (evt) => {
      if (evt.target.name === "del-btn") {
        this.remove(evt.target);
      }
    });
    document.querySelector(".btn-cart").addEventListener("click", (evt) => {
      document.querySelector(".cart-block").classList.toggle("invisible");
    });
  }
  add(item) {
    this.get("/addToBasket.json").then((res) => {
      if (res.result) {
        console.log(item.dataset.name + " добавлено");
        this.render();
      } else {
        throw new Error("Товара нет на складе");
      }
    });
  }
  remove(item) {
    this.get("/removeFromBasket.json").then((res) => {
      if (res.result) {
        let find = this.items.find((el) => el.id_product == item.dataset.id);
        console.log(find.product_name + " removed");
        this.render();
      } else {
        throw new Error(
          "Даже не представляю, что может запретить удалить товар из корзины"
        );
      }
    });
  }
}

class CatalogItem extends ListItem {}

class BasketItem extends ListItem {
  constructor(item, img = basketImage) {
    super(item, img);
  }
  render() {
    return `
      <div class="cart-item" data-id="${this.item.id_product}">
        <img src="https://placehold.it/100x80" alt="">
        <div class="product-desc">
            <p class="product-title">${this.item.product_name}</p>
            <p class="product-quantity">${this.item.quantity}</p>
            <p class="product-single-price">${this.item.price}</p>
        </div>
        <div class="right-block">
            <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
        </div>
      </div>`;
  }
}

let classes = {
  Catalog: CatalogItem,
  Basket: BasketItem,
};

export default function () {
  let basket = new Basket();
  let catalog = new Catalog(basket);
}