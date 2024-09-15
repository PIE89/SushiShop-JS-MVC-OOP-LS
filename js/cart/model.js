export default class Model {
  constructor() {
    this.cart = [];
    this.loadFromLS();
  }

  loadFromLS() {
    let res = localStorage.getItem("cart");
    if (res) {
      this.cart = JSON.parse(res);
    }
    console.log(this.cart);
  }

  addToCart(product) {
    let productInCart = this.cart.find(function (elem) {
      return elem.id === product.id;
    });

    if (productInCart) {
      productInCart.count += product.count;
    } else {
      let duplicateProduct = Object.assign({}, product);
      this.cart.push(duplicateProduct);
    }

    this.saveToLS();
  }

  deleteFromCart(product) {
    let productInCart = this.cart.find(function (elem) {
      return elem.id === product.id;
    });

    if (productInCart.count === 1) {
      this.cart = this.cart.filter((elem) => elem !== product);
    } else {
      productInCart.count -= 1;
    }

    this.saveToLS();
  }

  plus(product) {
    product.count += 1;

    this.saveToLS();
  }

  countTotal() {
    if (this.cart.length === 0) {
      return 0;
    } else {
      return this.cart
        .map((item) => item.price * item.count)
        .reduce((a, b) => a + b);
    }
  }

  findProduct(id) {
    let res = this.cart.find((elem) => elem.id === id);
    return res;
  }

  saveToLS() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}
